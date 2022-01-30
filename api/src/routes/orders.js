const express = require('express');
const { DateTime, Interval } = require('luxon');

const axios = require('../helpers/axios.js');
const db = require('../helpers/database.js');
const { checkRequiredPOST } = require('../helpers/middleware.js');

const router = express();

function isValidParcelSize(orderSize, pickupLocationSize) {
    const sizes = ['S', 'M', 'L'];
    return sizes.indexOf(pickupLocationSize) >= sizes.indexOf(orderSize);
}

function getNumberOfRequiredEmployees(order) {
    switch (order.parcelSize) {
        case 'S':
        case 'M':
            return 1;
        case 'L':
            return 2;
        default:
            return 0;
    }
}

router.get('/', async (req, res) => {
    const orders = await axios.get('/orders');
    res.json(orders.data);
});

router.get('/by-email/:email', (req, res) => {
    axios.get('/orders/byEmail', { params: { email: req.params.email } })
        .then(orders => res.json(orders.data))
        .catch(() => res.json([]));
});

router.get('/:id', (req, res) => {
    axios.get(`/orders/${req.params.id}`)
        .then(orders => res.json(orders.data))
        .catch(() => res.json([]));
});

router.post('/:order_id/schedule-pickup', checkRequiredPOST('store_id', 'start_time'), async (req, res) => {

    const { order_id } = req.params;
    const { store_id, start_time } = req.body;

    // Check order exists
    let order;
    try {
        order = (await axios.get(`/orders/${order_id}`)).data;
    } catch (_) {
        return res.status(HTTP_BAD_REQUEST).send('no_such_order');
    }

    // Check store exists
    let store;
    try {
        store = (await axios.get(`/stores/${store_id}`)).data;
        store.openingHours = JSON.parse(store.openingHours);
    } catch (_) {
        return res.status(HTTP_BAD_REQUEST).send('no_such_order');
    }

    // Check start time + preparation time is within store hours
    const start = DateTime.fromISO(start_time);
    const end = start.plus({ minutes: order.preparationTime });
    const weekday = start.toFormat('EEEE');
    const openingHours = store.openingHours.find(h => h.hasOwnProperty(weekday));
    const openingStart = start.startOf('day').plus({
        hours: DateTime.fromFormat(openingHours[weekday].Start, 'HHmm').hour,
        minutes: DateTime.fromFormat(openingHours[weekday].Start, 'HHmm').minute
    });
    const openingEnd = start.startOf('day').plus({
        hours: DateTime.fromFormat(openingHours[weekday].Finish, 'HHmm').hour,
        minutes: DateTime.fromFormat(openingHours[weekday].Finish, 'HHmm').minute
    });
    const openingInterval = Interval.fromDateTimes(openingStart, openingEnd);
    if (!openingInterval.contains(start) || !openingInterval.contains(end))
        return res.status(HTTP_BAD_REQUEST).send('outside_opening_hours');

    // Retrieve all the employee bookings
    const employeeBookings = await db('bopip.order_pickup_employees as ope')
        .innerJoin('bopip.order_pickup as op', 'op.id', 'ope.order_pickup_id')
        .select('ope.employee_id', 'op.start_time', 'op.end_time')
        .whereIn('employee_id', store.employees.map(e => e.id))
        .where('start_time', '>', start.startOf('day').toJSDate())
        .where('end_time', '<', end.endOf('day').toJSDate());

    // Compute employee availabilities
    store.employees.forEach(e => e.availability = [openingInterval]);
    employeeBookings.forEach(b => {
        const bookingInterval = Interval.fromDateTimes(
            DateTime.fromISO(b.start_time).minus({ minutes: 5 }),
            DateTime.fromISO(b.end_time).plus({ minutes: 5 })
        );
        const employee = store.employees.find(e => e.id === b.employee_id);
        employee.availability = employee.availability.map(a => a.difference(bookingInterval)).reduce((acc, value) => [...acc, ...value], []);
    });

    // Find all available employees
    const numRequiredEmployees = getNumberOfRequiredEmployees(order);
    let employees = store.employees.filter(e => e.availability.some(a => a.contains(start)) && e.availability.some(a => a.contains(end)));
    if (employees.length < numRequiredEmployees)
        return res.status(HTTP_BAD_REQUEST).send('not_enough_available_employees');

    employees = employees.slice(0, numRequiredEmployees);

    // Check available pickup locations
    let locations = store.pickupLocations.filter(l => isValidParcelSize(order.parcelSize, l.parcelSize));
    const conflictingPickups = await db('bopip.order_pickup')
        .where('store_id', store_id)
        .whereIn('pickup_location_id', locations)
        .where(function() {
            this.whereBetween('start_time', [start.toJSDate(), end.toJSDate()])
            .orWhereBetween('end_time', [start.toJSDate(), end.toJSDate()])
            .orWhere(function() {
                this.where('start_time', '<', start.toJSDate())
                    .where('end_time', '>', end.toJSDate());
            });
        });
    locations = locations.filter(l => !conflictingPickups.find(p => p.pickup_location_id === l.id));
    if (locations.length <= 0)
        return res.status(HTTP_BAD_REQUEST).send('no_available_locations');

    // Insert new order pickup entry
    const [orderPickup] = await db('bopip.order_pickup')
        .insert({
            order_id,
            store_id,
            pickup_location_id: locations[0].id,
            start_time: start.toJSDate(),
            end_time: end.toJSDate()
        })
        .returning('*');

    // Link employees serving the order
    await db('bopip.order_pickup_employees')
        .insert(employees.map(e => ({
            order_pickup_id: orderPickup.id,
            employee_id: e.id
        })));

    // Return order pickup object
    employees.forEach(e => delete e.availability);
    orderPickup.employees = employees;
    res.json(orderPickup);
});

module.exports = router;

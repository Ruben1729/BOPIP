const express = require('express');
const axios = require('../helpers/axios.js');

const router = express();

router.get('/', async (req, res) => {
    const stores = await axios.get('/stores');
    res.json(stores.data);
});

router.get('/:id', (req, res) => {
    axios.get(`/stores/${req.params.id}`)
        .then(orders => res.json(orders.data))
        .catch(() => res.json([]));
});

module.exports = router;

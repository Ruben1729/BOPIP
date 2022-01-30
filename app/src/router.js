import Vue from 'vue';
import Store from '@/store';
import Router from 'vue-router';
import login from '@/views/login';
import orderDetails from '@/views/order-details';
import dashboard from '@/views/dashboard.vue';
import orders from '@/views/orders.vue';

Vue.use(Router);

function ifAuthenticated(to, from, next) {
    if (Store.state.user.email) {
        next();
    } else {
        next(`/login`);
    }

}

function ifNotAuthenticated(to, from, next) {
    if (Store.state.user.email) {
        next(`/login`);
    } else {
        next();
    }
}

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: login,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/order-details/:orderId',
            component: orderDetails,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/orders',
            component: orders,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/dashboard',
            component: dashboard,
            beforeEnter: ifAuthenticated
        }
    ]
});

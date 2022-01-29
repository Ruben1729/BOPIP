import Vue from 'vue';
import Router from 'vue-router';
import login from '@/views/login';

Vue.use(Router);

// function ifAuthenticated(to, from, next) {
//
// }

// function ifNotAuthenticated(to, from, next) {
//
// }

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login', component: login
        }

    ]
});

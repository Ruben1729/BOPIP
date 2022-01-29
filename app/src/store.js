import Vue from 'vue';
import Vuex from 'vuex';

import user from '@/modules/user.js';
import cart from '@/modules/cart.js';
import layout from '@/modules/layout.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        user,
        cart,
        layout
    }
});

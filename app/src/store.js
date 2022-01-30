import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import user from '@/modules/user.js';
import cart from '@/modules/cart.js';
import layout from '@/modules/layout.js';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        cart,
        layout
    },
    plugins: [vuexLocal.plugin]
});

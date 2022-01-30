import Vue from 'vue';
import Vuex from 'vuex';

import user from '@/modules/user.js';
import layout from '@/modules/layout.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        layout
    }
});

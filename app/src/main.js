import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify.js';
import router from './router';
import store from './store';
import './mixins'

Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app');

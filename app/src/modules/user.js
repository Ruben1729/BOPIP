import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';

export default {
    state: {
        email: null,
        device: null
    },
    mutations: {
        setEmail(state, email) {
            state.email = email;
        },
        setDevice(state, device) {
            state.device = device;
        },

    },
    actions: {
        async logout({ commit }) {
            commit('setEmail', null);

        },

        async getDeviceInfo({ commit }) {
            let info = await Device.getInfo();
            if (info.platform !== 'web')
                info = { ...info, ...await App.getInfo() };
            commit('setDevice', info);
            return Promise.resolve();
        }
    }
};

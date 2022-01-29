import Network from '@/helpers/Network.js';

import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';

export default {
    state: {
        account: null,
        device: null
    },
    mutations: {
        setAccount(state, account) {
            state.account = account;
        },
        setDevice(state, device) {
            state.device = device;
        },
        authSuccess(state, user) {
            state.account = user;
        }
    },
    actions: {
        async logout({ commit }) {
            const token = Network.getRefreshToken();

            commit('setAccount', null);

            if (token) {
                await Network.post('/users/revoke-token', {
                    refresh_token: token
                }).catch(err => console.error(err.response.data));
            }

            Network.removeTokens();
        },
        getCurrentUser({ commit }) {
            return Network.get('/users/current-user')
                .then(res => commit('authSuccess', res.data))
                .catch(err => console.error(err));
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

import Network from '@/helpers/Network.js';

export default {
    state: {
        account: null,
    },
    mutations: {
        setAccount(state, account) {
            state.account = account;
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
        }
    }
};

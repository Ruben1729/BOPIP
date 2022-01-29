import axios from 'axios';
import store from '../store.js';

// Add base URL to network requests
const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

// Automatically refresh access token
axiosInstance.interceptors.response.use(undefined, err => {
    const response = err.response;
    if (response && response.status === 401 && response.config && !response.config.__isRetryRequest) {
        const refreshToken = Network.getRefreshToken();

        // In case refresh token is cleared from localStorage
        if (!refreshToken)
            return store.dispatch('logout');

        return Network.post('/users/refresh-token', { refresh_token: refreshToken })
            .then(res => {
                response.config.__isRetryRequest = true;
                response.config.headers['Authorization'] = `Bearer ${res.data.access_token}`;
                Network.setTokens(res.data.access_token, res.data.refresh_token);
                return axiosInstance(response.config);
            })
            .catch(err => {
                console.error(err.response.data);
                return store.dispatch('logout').then(() => Promise.reject(err));
            });
    }
    return Promise.reject(err);
});

// Set auth token
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

export default class Network {

    static axios = axiosInstance;

    static get(url, params) {
        return this.axios.get(url, params);
    }

    static post(url, data) {
        return this.axios.post(url, data);
    }

    static put(url, data) {
        return this.axios.put(url, data);
    }

    static patch(url, data) {
        return this.axios.patch(url, data);
    }

    static setTokens(accessToken, refreshToken) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
    }

    static removeTokens() {
        delete this.axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        delete axiosInstance.defaults.headers.common['Authorization'];
    }

    static getRefreshToken() {
        return localStorage.getItem('refresh_token');
    }

    static getAccessToken() {
        return localStorage.getItem('access_token');
    }

}

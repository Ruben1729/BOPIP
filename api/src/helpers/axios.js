const axios = require('axios');

const env = require('../../config/environment.js');


module.exports = axios.create({
    baseURL: env.config.SAP.api
});

const supertest = require('supertest');
const defaults = require('superagent-defaults');

const app = require('../src/app.js');

module.exports = defaults(supertest(app));

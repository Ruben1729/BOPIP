const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('express-async-errors');
const cors = require('cors');

require('./helpers/constants.js');
const logger = require('./helpers/logger.js');
const errorHandler = require('./helpers/error.js');

const port = Number(process.env.PORT || 3001);
const indexRoutes = require('./routes/index.js');
const ordersRoutes = require('./routes/orders.js');
const storesRoutes = require('./routes/stores.js');

const app = express();

app.use(logger);
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());

app.use('/', indexRoutes);
app.use('/orders', ordersRoutes);
app.use('/stores', storesRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}\n`));

module.exports = app;

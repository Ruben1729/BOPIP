const express = require('express');
require('express-async-errors');
const cors = require('cors');

require('./helpers/constants.js');
const logger = require('./helpers/logger.js');
const errorHandler = require('./helpers/error.js');

const port = Number(process.env.PORT || 3001);
const indexRoutes = require('./routes/index.js');

const app = express();

app.use(logger);
app.use(cors());

// TODO: Add routes here
app.use('/', indexRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}\n`));

module.exports = app;

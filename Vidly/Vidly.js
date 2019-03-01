const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    // console.log(`Listening on port ${PORT}\n`);
    winston.info(`Listening on port ${PORT}\n`);
});

module.exports = server;
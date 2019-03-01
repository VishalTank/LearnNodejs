const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    mongoose.connect(config.get('db'))
        .then(() => {
            // console.log('Connected to vidly...');
            winston.info(`Conncected to ${config.get('db')}...`);
        })
        .catch((error) => {
            console.log(`Could not connect to ${config.get('db')}...` + error.message);
        });
};
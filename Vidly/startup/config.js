const config = require('config');

module.exports = function() {
    // make sure that env variable is set everytime project is run.
    if (!config.get('myPrivateKey')) {
        console.error('FATAL ERROR: myPrivateKey is not defined...');
        process.exit(1);
    }
};
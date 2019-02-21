const startupDebugger = require('debug')('app:startup');
const express = require('express');
const logger = require('./middlewares/logger');
const authenticator = require('./middlewares/authenticator');
const morgan = require('morgan');
const courses = require('./routes/courses');
const home = require('./routes/home');


//Starting Web Server
const app = express();

//Calling Middleware Functions :
//Inbuilt middleware
app.use(express.json());
//User defined middlewares
app.use(logger);
// app.use(function(req, res, next) {
//     console.log('Logging');
//     next();
// }); 
app.use(authenticator);
// app.use(function(req, res, next) {
//     console.log('Authenticating');
//     next();
// });
//Third party Middlewares
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    //console.log('Morgan Enabled...');
    startupDebugger('Morgan Enabled...');
}
//Check Environments
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);


//Using Routers
app.use('/api/courses', courses);
app.use('/', home);


//Templating Engine, NOT imp rn.
app.set('view engine', 'pug');




const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on port: ${port}\n`); });
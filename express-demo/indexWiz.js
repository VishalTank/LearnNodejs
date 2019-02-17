/*jshint esversion: 6*/
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const Joi = require('joi');
const express = require('express');
const logger = require('./logger');
const authenticator = require('./authenticator');
const morgan = require('morgan');


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

//Templating Engine, NOT imp rn.
app.set('view engine', 'pug');




const courses = [{
        id: 1,
        name: 'course1',
    },
    {
        id: 2,
        name: 'course2',
    },
    {
        id: 3,
        name: 'course3',
    },
    {
        id: 4,
        name: 'course4 ',
    },
];

//GET
app.get('/', (req, res) => {
    //res.send('Hello World!');
    res.render('index', {
        title: "myTitle",
        message: "myMessage",
    });
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => (c.id === parseInt(req.params.id)));
    if (!course)
        return res.status(404).send('The course is not in the Database.');

    res.send(course);
});


//POST
app.post('/api/courses', (req, res) => {
    const result = validateCourse(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    /* OBJECT DESTRUCTURING 
    const { error } = validateCourse(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    } */

    // if (!req.body.name || req.body.name < 4) {
    //     res.status(400).send('Name is required OR Name is too short.');
    //     return;
    // }

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };

    courses.push(course);
    res.send(course);
});


//PUT
app.put('/api/courses/:id', (req, res) => {
    //check if course already exists or not.
    const course = courses.find(c => (c.id === parseInt(req.params.id)));
    if (!course)
        return res.status(404).send('The course is not in the Database.');

    //validate the course name
    const result = validateCourse(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);

    /* OBJECT DESTRUCTURING 
    const { error } = validateCourse(req.body);
    if(error)
        return res.status(400).send(error.details[0].message); */

    //update course
    course.name = req.body.name;
    res.send(course);
});


//DELETE
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => (c.id === parseInt(req.params.id)));
    if (!course)
        return res.status(404).send('The course is not in the Database.');

    const i = courses.indexOf(course);
    courses.splice(i, 1);

    res.send(course);
});

//Main()
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}\n`);
});




//UTILITY FUNCTIONS
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required(),
    };

    return Joi.validate(course, schema);
}
/*jshint esversion: 6*/
const Joi = require('joi');
const express = require('express');

const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: 'course1', },
    { id: 2, name: 'course2', },
    { id: 3, name: 'course3', }, 
    { id: 4, name: 'course4 ', },
];


//GET
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( c => (c.id === parseInt(req.params.id)));
    if(!course)
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
    if(result.error)
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
    const course = courses.find(c => (c.id === parseInt(req.params.id)));
    if (!course)
        return res.status(404).send('The course is not in the Database.');

    const i = courses.indexOf(course);
    courses.splice(i, 1);

    res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Listening on port: ${port}\n`); });



//UTILITY FUNCTIONS
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required(),
    };

    return Joi.validate(course, schema);
}
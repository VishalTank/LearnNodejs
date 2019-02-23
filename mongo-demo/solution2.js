const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/excercises')
    .then(() => {
            console.log('Connected to excercises...');
        })
        .catch((error) => {
            console.log('Error connecting to excercises ->' + error);
        });

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number,
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
    .find({isPublished: true, tags: {$in: ['backend', 'frontend']}})
    .sort('-price')
    .select('name author price');
}

async function getCoursesSolution3() {
    return await Course
    .find({isPublished: true})
    .or([
        {price: {$gte: 15}},
        {name: /.*by.*/i}
    ])
    .sort({name: -1})
    .select('name author price');
}

async function displayCourses() {
    const courses = await getCourses();
    const courses3 = await getCoursesSolution3();

    console.log(courses + '\n----------\n' + courses3);
}

displayCourses();
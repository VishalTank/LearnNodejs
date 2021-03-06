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
    .find({isPublished: true, tags: 'backend'})
    .sort({name: -1})
    // .sort('-name')
    // .select('name author')
    .select({name: 1, author: 1});
}

async function displayCourses() {
    const courses = await getCourses();
    console.log(courses);
}

displayCourses();
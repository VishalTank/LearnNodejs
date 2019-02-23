const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((error) => {
        console.log('Could not connect to MongoDB... ' + error);
    });


const schema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now,
    },
    isPublished: Boolean,
});

const Course = mongoose.model('course', schema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Tutorial',
        author: 'Vishal',
        tags: ['angular', 'frontend'],
        isPublished: true,
    });

    const result = await course.save();
    console.log(result);
}

//query first method
async function updateCourses(id) {
    const course = await Course.findById(id);
    if(!course)
        return;

    course.set({
        isPublished: true,
        author: 'Vishal1',
    });

    const result = await course.save();
    console.log(result);
}

//update first method
async function updateCourseDirectly(id) {
    // const result = await Course
    // .update(
    //     {_id: id},
    //     {$set: { author: 'VISHAL', isPublished: true,}}
    // );

    // console.log(result);

    const result = await Course
    .findByIdAndUpdate(id, {$set: { author: 'VISHAL1', isPublished: false,}}, {new: true});

    console.log(result);
}

async function getCourses() {
    const courses = await Course
    .find({author: 'Vishal', isPublished: 'true'})
    // .select({tags: 1, name: 1})
    .sort({name: 1});
    
    //const temp = await Course.findOneAndUpdate({name: 'My Tutorial'}, {tags: ['my', 'tutorial']});
    
    console.log(courses);
}

// createCourse();
// updateCourses('5c7117b837531470280af60f');
updateCourseDirectly('5c7117b837531470280af60f');
// getCourses();

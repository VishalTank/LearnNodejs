const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((error) => {
        console.log('Could not connect to MongoDB... ' + error);
    });


const schema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'network'],
    },
    author: String,
    // tags: [String],
    tags: {
        type: Array,
        validate: {
            // async validators for example data read from db etc..
            isAsync: true,
            validator: function(value, callback) {
                // some async wor
                setTimeout(() => {
                    const result = value & value.length > 0; 
                    callback(result);
                }, 5000);
            },
            message: 'A course should have atleast one tag.',
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isPublished: Boolean,
    price: {
        type: Number,
        min: 10,
        max: 200,
        required: function() {
            return this.isPublished;
        }
    },
});

const Course = mongoose.model('Course', schema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Tutorial',
        category: 'web',
        author: 'Vishal',
        tags: [],
        isPublished: true,
        price: 15,
    });

    try {
        const result = await course.save();
        console.log(result);
    }
    catch(error) {
        console.log(error.message);
    }
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

createCourse();
// updateCourses('5c7117b837531470280af60f');
// updateCourseDirectly('5c7117b837531470280af60f');
// getCourses();

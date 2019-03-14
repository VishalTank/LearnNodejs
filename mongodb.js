// CRUD create read update delete

const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const  databaseName = 'task-manager';


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);
    


    /* ---CREATE--- */



    // db.collection('users').insertOne({
    //     name: 'Vishal2',
    //     age: 21
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Clean the house',
    //         completed: true
    //     },{
    //         description: 'Renew inspection',
    //         completed: false
    //     },{
    //         description: 'Pot plants',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks!')
    //     }

    //     console.log(result.ops)
    // })



    /* ---READ--- */



    // //using callback
    // db.collection('users').findOne({ _id: new ObjectID('5c89e6e1563f02236405aead') }, (error, user) => {
    //     if(error)
    //         return console.log('Unable to fetch data from users.');

    //     console.log(user);
    // });

    // //using promise
    // db.collection('users').find({ name: 'Vishal2'}).toArray().then((users) => {
    //     console.log(users);
    // }).catch((error) => {
    //     console.log(error.message);
    // });


    // db.collection('tasks').findOne({ _id: new ObjectID('5c89e0504c839120ccd8b06c') }).then((task) => {
    //     console.log(task);
    // }).catch((error) => {
    //     console.log(error.message);
    // });

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     if(error)
    //         return console.log('Unable to fetch incompleted tasks from tasks.');

    //     console.log(tasks);
    // });



    /* ---UPDATE--- */



    // db.collection('users').updateOne({ 
    //     _id: new ObjectID('5c89e6e1563f02236405aead')
    // }, {
    //     $set: {
    //         name: 'Vishal2',
    //     },
    //     $inc: {
    //         age: +2,
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // db.collection('tasks').updateMany({
    //     completed: false
    // },{
    //     $set: {
    //         description: 'Description',
    //     },
    // }).then((result) => {
    //     console.log(result);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });



    /* ---DELETE--- */


    
    // db.collection('users').deleteMany({name: 'Jen'}).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // db.collection('tasks').deleteOne({ _id: new ObjectID('5c89de7010e47e1ee72a2b77')}).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })
});
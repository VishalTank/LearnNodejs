// Promise.resolve( {id: 1, name: 'Vishal' })
// .then((result) => console.log(result));

// Promise.reject(new Error(''))
// .catch((error) => console.log(error));

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('async operation 1');
        //reject(new Error('failed'));
        resolve(1);
    }, 3000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('async operation 2');
        resolve(2);
    }, 6000);
});

Promise.all([p1, p2])
    .then((result) => console.log(result))
    .catch((error) => console.log('Error: ', error.message));

// Promise.race([p1, p2])
//     .then((result) => console.log(result))
//     .catch((error) => console.log('Error: ', error.message));
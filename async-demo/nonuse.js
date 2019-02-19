function ex() {
    console.log('hello');
}
ex();

setTimeout(function ex1() {
    console.log('hello1');
}, 2000);

setTimeout(function() {
    console.log('hello2');
}, 2000);

function getUser(id) {
    setTimeout(() => {
        console.log('hello3');
        return { id: id, uName: 'Vishal' };
    }, 2000);
}

console.log(getUser(1));

setTimeout(ex, 2000);

ex();
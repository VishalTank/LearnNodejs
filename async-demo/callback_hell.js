function ex() {
    console.log('hello');
}
ex();


//promise
function getUser1(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('fetching user1...');
            resolve({
                id: id,
                uName: 'Chirag'
            });
        }, 5000);
    });
}

function getRepos1(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('fetching repos1...');
            resolve(['repos1', 'repos2', 'repos3', 'repos4']);
        }, 5000);
    });
}

function getCommits1(repos1) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('fetching commits1...');
            resolve(['commmit1', 'commit2']);
        }, 5000);
    });
}

getUser1(1).then((user1) => {
    console.log('User: ', user1);
    return getRepos1(user1.uName);
}).then((repos1) => {
    console.log(repos1);
    return getCommits1(repos1[0]);
}).then((commits1) => {
    console.log(commits1);
}).catch((error) => {
    console.log(error.message);
});



// callback
getUser(0, (user) => {
    console.log('User: ', user);

    getRepos(user.uName, (repos) => {
        console.log(repos);

        getCommits(repos[0], (commits) => {
            console.log(commits);
        });
    });
});

function getUser(id, callback) {
    setTimeout(() => {
        console.log('fetching user...');
        //result
        callback({
            id: id,
            uName: 'Vishal'
        });
    }, 5000);
}

function getRepos(uName, callback) {
    setTimeout(() => {
        console.log('fetching repos...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 5000);
}

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log('fetching commits...');
        callback(['commit1', 'commit2', 'commit3', 'commit4']);
    }, 5000);
}


setTimeout(ex, 3000);


ex();
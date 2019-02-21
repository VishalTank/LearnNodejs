// import { resolve } from "url";

//Callback based approach
console.log('Before');
// getUser(1, (user) => {
//     getRepositories(user.gitHubUsername, (repos) => {
//         getCommits(repos[0], (commits) => {
//             console.log(commits);
//         });
//     });
// });

// //Promise based approach
// getUser(123)
//     .then((user) => getRepositories(user.gitHubUsername))
//     .then((repos) => getCommits(repos[0])) 
//     .then((commits) => console.log('commits: ', commits))
//     .catch((error) => console.log('Error: ', error));

//Async and Await based approach
async function displayCommits() {
    try {
        const user = await getUser(123);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log('commits: ', commits);
    }
    catch(error) {
        console.log('error:: ', error);
    }
}
displayCommits();

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    });
    
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting repos...');
            // resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('Could not get repos.'));  
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting commits...');
            resolve(['commit1', 'commit2', 'commit3']);
        }, 2000);
    });
}









function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script);
}

function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = function() {
        callback();
    }
    document.head.append(script);
}
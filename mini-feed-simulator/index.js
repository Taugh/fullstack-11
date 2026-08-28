// Data

const feed = [];
let nextID = 1;

//Functions
function createPost(username, content) {
    const post = {
        id: nextID++,
        username: username,
        content: content,
        likes: 0,
        timestamp: new Date()
    };
    feed.push(post);
    return post;
}

function likePost(postID) {
    const post = feed.find(p => p.id === postID);
    if (post) {
        post.likes++;
    }
    return post;
}

function getFeed() {
    return feed;
}

function sortByNewest() {
    return [...feed].sort((a, b) => b.timestamp - a.timestamp);
}

function sortByLikes() {
    return [...feed].sort((a, b) => b.likes - a.likes);
}

function getPostByUser(username) {
    return feed.filter(p => p.username === username);
}

function deletePost(postID) {
    const index = feed.findIndex(p => p.id === postID);
    if (index !== -1) {
        return feed.splice(index, 1)[0];
    }
    return null;
}

module.exports = {
    createPost,
    likePost,
    getFeed,
    sortByNewest,
    sortByLikes,
    getPostByUser,  
    deletePost
};

// TEST DATA
createPost("alex", "Hello World");
createPost("paul", "Learning JavaScript");

likePost(1);
likePost(1);
likePost(2);

// TEST OUTPUTS
console.log(getFeed());
console.log(sortByLikes());
console.log(sortByNewest());
console.log(getPostByUser("alex"));
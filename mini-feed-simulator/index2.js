// Mini Feed Simulator using classes

class feedsimulator {
    constructor() {
        this.feed = [];
        this.nextId = 1;
    }

    createPost(username, content) {
        const post = {
            id: this.nextId,
            username: username,
            content: content,
            likes: 0,
            timestamp: Date.now()
        };
        
        this.feed.push(post);
        this.nextId++;
        
        return post;
    };

    likePost(postId) {
        const post = this.feed.find(p => p.id === postId);
        if (post) {
            post.likes++;
        }
        
    }

    getFeed() {
        return this.feed;
    }

    sortByNewest() {
        return [...this.feed].sort((a, b) => b.timestamp - a.timestamp);
    }

    sortByLikes() {
        return [...this.feed].sort((a, b) => b.likes - a.likes);
    }

    getPostByUser(username) {
        return this.feed.filter(p => p.username === username);
    }
}

// Test the feed simulator
const socialFeed = new feedsimulator();

socialFeed.createPost(
    "alex",
    "Hello World"
);

socialFeed.createPost(
    "paul",
    "Learning JavaScript is fun"
);

socialFeed.createPost(
    "alex",
    "Classes are awesome"
);

socialFeed.likePost(1);
socialFeed.likePost(1);
socialFeed.likePost(2);

console.log("All Posts:");
console.log(socialFeed.getFeed());

console.log("\nSorted By Likes:");
console.log(socialFeed.sortByLikes());

console.log("\nSorted By Newest:");
console.log(socialFeed.sortByNewest());

console.log("\nAlex's Posts:");
console.log(
    socialFeed.getPostByUser("alex")
);
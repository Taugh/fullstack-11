// =========================
// Feed Simulator Class
// =========================

class FeedSimulator {
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
    }

    likePost(postId) {
        const post = this.feed.find(
            p => p.id === postId
        );

        if (post) {
            post.likes++;
        }
    }

    getFeed() {
        return this.feed;
    }

    sortByNewest() {
        return [...this.feed].sort(
            (a, b) => b.timestamp - a.timestamp
        );
    }

    sortByLikes() {
        return [...this.feed].sort(
            (a, b) => b.likes - a.likes
        );
    }

    getPostByUser(username) {
        return this.feed.filter(
            p => p.username === username
        );
    }
}

// =========================
// Create Feed Instance
// =========================

const socialFeed = new FeedSimulator();

// =========================
// DOM Elements
// =========================

const usernameInput =
    document.getElementById("username");

const postContentInput =
    document.getElementById("post-content");

const postButton =
    document.getElementById("post-button");

const feedContainer =
    document.getElementById("feed-container");

// =========================
// Render Feed
// =========================

function renderFeed() {
    feedContainer.innerHTML = "";

    const posts = socialFeed.getFeed();

    if (posts.length === 0) {
        feedContainer.innerHTML =
            '<p class="empty-state">No posts yet. Create one!</p>';
        return;
    }

    posts.forEach(post => {
        const postCard =
            document.createElement("div");

        postCard.classList.add("post");

        const usernameInitial =
            post.username.charAt(0).toUpperCase();

        const formattedTime = new Date(post.timestamp)
            .toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit"
            });

        postCard.innerHTML = `
            <div class="post-header">
                <div class="post-user">
                    <span class="user-avatar">${usernameInitial}</span>
                    <h3>${post.username}</h3>
                </div>
                <span class="post-time">${formattedTime}</span>
            </div>
            <p>${post.content}</p>
            <div class="post-actions">
                <span class="likes">${post.likes} like${post.likes === 1 ? "" : "s"}</span>
                <button class="like-btn">
                    Like
                </button>
            </div>
        `;

        const likeButton =
            postCard.querySelector(".like-btn");

        likeButton.addEventListener("click", () => {
            socialFeed.likePost(post.id);
            renderFeed();
        });

        feedContainer.appendChild(postCard);
    });
}

// =========================
// Create Post Event Listener
// =========================

postButton.addEventListener("click", () => {
    const username =
        usernameInput.value.trim();

    const content =
        postContentInput.value.trim();

    if (!username || !content) {
        alert(
            "Please enter a username and post content."
        );
        return;
    }

    socialFeed.createPost(
        username,
        content
    );

    renderFeed();

    usernameInput.value = "";
    postContentInput.value = "";
});

// =========================
// Sample Posts
// =========================

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

// =========================
// Initial Render
// =========================

renderFeed();
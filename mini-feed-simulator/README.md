# Mini Feed Simulator

## Description

A Node.js application that simulates the backend logic of a social media feed. Users can create posts, like posts, sort the feed, and filter posts by username using core JavaScript.

## Features

- Create posts
- Like posts
- View all posts in the feed
- Sort posts by newest
- Sort posts by likes
- Filter posts by username

## Technologies

- JavaScript
- Node.js

## Project Structure

```text
mini-feed-simulator/
│
├── index.js
└── README.md
```

## How to Run

1. Open a terminal.
2. Navigate to the project folder.
3. Run the following command:

```bash
node index.js
```

## Example Usage

```javascript
createPost("alex", "Hello world");
createPost("paul", "Learning JavaScript is fun");

likePost(1);
likePost(1);

console.log(sortByLikes());
console.log(getPostsByUser("alex"));
```

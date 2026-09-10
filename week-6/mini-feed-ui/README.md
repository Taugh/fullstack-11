# Mini Feed UI

## Description

Mini Feed UI is a browser-based social feed application built with HTML, CSS, and JavaScript. It extends the Mini Feed Simulator by adding a user interface that allows users to create posts, view posts, and like posts directly in the browser.

This project demonstrates the use of DOM manipulation, event listeners, arrays, objects, classes, and rendering dynamic content to a web page.

---

## Features

- Create new posts
- Display all posts in the feed
- Like existing posts
- Automatically update the UI after changes
- Display usernames, post content, and like counts
- Clean and responsive interface
- Object-oriented design using JavaScript classes

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)

---

## Project Structure

```text
mini-feed-ui/
│
├── index.html
├── style.css
└── script.js
```

---

## How It Works

### Create a Post

Users enter:

- A username
- A post message

When the **Create Post** button is clicked:

1. The form values are collected.
2. A new post is created using the `createPost()` method.
3. The feed is re-rendered.
4. The input fields are cleared.

### Like a Post

Each post contains a **Like** button.

When clicked:

1. The post is identified by its unique ID.
2. The `likePost()` method increases the post's like count.
3. The feed is re-rendered to display the updated number of likes.

---

## JavaScript Class

The application uses a `FeedSimulator` class to manage posts.

### Methods

| Method | Description |
|----------|-------------|
| `createPost()` | Creates a new post and adds it to the feed |
| `likePost()` | Increases the like count of a selected post |
| `getFeed()` | Returns all posts currently in the feed |
| `sortByNewest()` | Returns posts sorted by newest first |
| `sortByLikes()` | Returns posts sorted by most likes |
| `getPostByUser()` | Returns all posts by a specific user |

---

## Learning Objectives

This project reinforces:

- DOM selection and manipulation
- Event listeners
- Rendering JavaScript data to HTML
- Arrays and objects
- Classes and methods
- User interaction in the browser
- Separation of application logic and UI logic

---

## Future Improvements

Possible enhancements include:

- Delete post functionality
- Filter posts by username
- Sort by newest posts
- Sort by most liked posts
- Edit existing posts
- Store posts in Local Storage
- Add timestamps to post cards

---

## Getting Started

1. Download or clone the project.
2. Open the project folder.
3. Open `index.html` in a web browser.
4. Create posts and interact with the feed.

---

## Author

Created as part of a JavaScript DOM Manipulation and Event Handling project.
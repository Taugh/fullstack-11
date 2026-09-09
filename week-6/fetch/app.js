/* 
	? Application Programming Interface (API)
	* a way for us to communicate with a server
	* client (front-end)
		* browser, curl command, Postman request
	* server (back-end)
		* a computer that has a listener setup that listens for requests
		* it serves up responses
	* enables a RESTful architecture request/response lifecycle
		* REST - representational state transfer
			* a way to communicate in req/res form
			* JSON specific
			* stateless
		* SOAP - simple object access protocol
			* a way to communicate in req/res form
			* XML specific
			* stateful
		* request - data we send (as the client)
			* headers (metadata)
			* query parameters (GET)
			* body (POST)
		* response - data we receive (as the server)
			* headers
			* payload
			* status code
		
	* REST & SOAP work via CRUD
		* create (POST, GET)
		* read (GET)
		* update (PUT)
		* delete (DELETE)
	
	* correspond to the following HTTP Methods or HTTP Verbs
		* POST
		* GET
		* PUT
		* DELETE
*/

/* 
	? Asynchronous Programming
	* a way for us to continue running our application without waiting
	* synchronous code runs in order, top to bottom, left to right
	* any asynchronous code waits until it's execution succeeded
	* can be solved with:
		* Promises
		* async/await
		* fetch (for API's)
*/

console.log("First")
setTimeout(() => {
	console.log("Second")
}, 2000)
// JS doesn't stop for setTimeout; it executes the code and lets timeout finish
console.log("Third")

function getUser() {
	setTimeout(() => {
		return [{ name: "Paul", email: "paul@code.com", password: "dbLocal" }]
	}, 2000);
}

let user = getUser()
console.log("The result of user", user)
// console.log("The result of user", user.forEach(u => console.log(u)))

/* 
	? Promise
	* allows us to handle the following states:
	* pending state (nothing happened yet)
	* fulfillment state (success)
	* reject state (error)
*/

let promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve({ name: "Paul", email: "paul@code.com", password: "dbLocal" })
	}, 2000);
})
console.log(promise)

function GetUserUsingPromise(success) {
	return new Promise((resolve, reject) => {
		if (success) {
			setTimeout(() => {
				resolve([{ name: "Paul", email: "paul@code.com", password: "dbLocal" }])
			}, 2000);
		} else {
			reject({ status: 500, message: "Failed" })
		}
	})
}

let promiseResult = GetUserUsingPromise(true)
console.log(promiseResult)

/* 
	? Promise Resolvers
	* a method which can be used on a Promise
	* it extracts the data once a Promise has settled from its pending state
	* .then() handles success and catches resolve
	* .catch() handles failures and catches rejects
	* both take a callback function where param holds resolve/reject argument
*/

GetUserUsingPromise(true).then((user) => user.forEach(u => console.log(u)))

GetUserUsingPromise(false)
	.then((user) => user.forEach(u => console.log(u)))
	.catch((err) => console.log(err))

/* 
	? Async Await
	* async - type of function allowing you to return a promise
	* have access to:
	* await - resolves a promise
	* await replaces .then()
	! catch await only works inside asynchronous functions
*/

function regularFx() {
	return
}

console.log("regular function", regularFx())

async function asyncFx() {
	return
}

console.log("async function", asyncFx())

/* 
	? Try Catch
	* a way to handle success AND rejection inside async (or regular) functions
	* try takes all of the "happy code"
	* catch takes a parameter which will "catch" the error
	* the code block within catch handles your error state logic
*/


async function start() {
	try {
		let userResultWithoutAwait = GetUserUsingPromise(true)
		console.log("NO AWAIT RESULT", userResultWithoutAwait)
		// above still returns a promise
	
		let userResult = await GetUserUsingPromise(false)
		console.log("RESULT", userResult)
		// this one returns the data
	} catch(error) {
		console.log("This is the error", error)
	}
}

console.log("start fx return", start())

/* 
	? Challenge
	* you have two functions
	* one returns an individual based on username
	* the other returns all of their posts
	* create a function (or use resolvers)
	* first get the username of a person of your choice
	* then get all of their posts
	* the function should return all of their posts
	* notice these need to run in order
*/

let db = [
	{ username: "paul", password: "potato"},
	{ username: "shreya", password: "password123"},
	{ username: "chris", password: "imkool123"}
]

let posts = [
	{ user: "paul", post: "i'm so cool"},
	{ user: "shreya", post: "i love coding"},
	{ user: "paul", post: "i'm tired"},
	{ user: "chris", post: "i'm gonna go racing this week"},
	{ user: "chris", post: "i need to sleep more"},
]

async function getUsername(username) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const user = db.find(u => u.username === username)
			if (user) {
				resolve(user)
			} else {
				reject(new Error(`User "${username}" not found`))
			}
		}, 3000)
	})
}

async function getPosts(user) {
	return posts.filter(p => p.user === user)
}

async function getUserPosts(username) {
	try {
		const user = await getUsername(username)
		return await getPosts(user.username)
	} catch (error) {
		console.log("Error getting user posts:", error)
		return []
	}
}

async function challenge() {
	let db = [
		{ username: "paul", password: "potato"},
		{ username: "shreya", password: "password123"},
		{ username: "chris", password: "imkool123"}
	]

	let posts = [
		{ user: "paul", post: "i'm so cool"},
		{ user: "shreya", post: "i love coding"},
		{ user: "paul", post: "i'm tired"},
		{ user: "chris", post: "i'm gonna go racing this week"},
		{ user: "chris", post: "i need to sleep more"},
	]

	const result = await getUserPosts("paul")
	console.log("Posts for paul:", result)
}

challenge()

console.log(challenge())

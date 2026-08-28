/* 
	? Objects
	* reference data type
	* denoted by { }
	* unlike array, no indexes
	* has keys or properties
	* properties are denoted by . (ex: .length)
	* has methods denoted by () (ex: toUpperCase())
	* has .this keyword
	* used for when data has to be recalled by some name
*/

// Object literal

let obj = {}
console.log(Boolean(obj), obj, obj.length)
// empty is truthy; has no length

let bentley = {
	// property: value
	// key: value pairs
	species: "dog",
	color: "black and white",
	name: "Bentley",
	spayedNeutered: true,
	breed: "olde english bulldoggee",
	weight: 78,
	favoriteActivity: ["farting", "fetching", "sleeping"]
}

console.log(bentley)

// ? Accessing object properties

// using dot notation and array notation
console.log(bentley.breed, bentley["breed"])

// not indexable
console.log(bentley[0])

// ? Assigning property

bentley.owner = "Paul"
console.log(bentley)

// ? Reassining property

bentley.color = "spotted"
console.log(bentley)

// ? We can convert object into an array (kinda)

let objProperties = Object.keys(bentley)
console.log(objProperties)

let objValues = Object.values(bentley)
console.log(objValues)



let favoriteActivityValuesIfExist = Object.keys(bentley)

favoriteActivityValuesIfExist.forEach(i => {
	if (i === "favoriteActivity") {
		console.log(bentley[i])
	}
})

// ? Challenge - what's the length of Bentley object?

console.log(Object.keys(bentley).length)

let request = {
	email: "paul@codecademy.com",
	password: "dbLocal"
}

let db = [
	{ email: "paul@codecademy.com", password: "dbLocal"},
	{ email: "chris@gmail.com", password: "coolStuff123"},
	{ email: "shreya@ceo.com", password: "iLikeCoolSTuff"},
]

// ? How would I list all emails in my database?

db.forEach(i => console.log(i.email))


console.log("Starting authentication test...")
/* 
	? Challenge
	* create an authentication service
	* it should take an incoming request and parse it
	* it should then check if the individual exists
	* if they don't, console log user not found
	* if they do exist, check if their password matches
	* if it doesn't, console log invalid password
	* if it does, console log user logged in
	
	! SPICEY MODE
	* handle malformed request (what if email or password is missing?)
	* what if someone types in Paul@codecademy.com
	* how would you ensure successful username search?
*/

function authenticate(request) {
	if (!request.email || !request.password) {
		console.log("Malformed request")
		return
	}

	let user = db.find(i => i.email.toLowerCase() === request.email.toLowerCase())

	if (!user) {
		console.log("User not found")
		return
	}

	if (user.password !== request.password) {
		console.log("Invalid password")
		return
	}

	console.log("User logged in")
}
authenticate(request)

// class solution for authentication service
let authService = (req, database) => {
	console.log(req)
	console.log(database)

	console.log(req.email)

	let foundUser = database.filter(u => u.email === req.email)
	console.log(foundUser)

	if (foundUser.length) {
		if (foundUser[0].password === req.password) {
			console.log("user logged in")
		} else {
			console.log("invalid password")
		}
	}
}

authService(request, db)

// ? Auth Service But More Elegant

function searchUser(req, db) {
	return db.filter(u => req.email === u.email)
}

function validatePassword(requestPassword, dbPwd) {
	if (requestPassword === dbPwd) {
		return { success: true, message: "User Logged In" }
	}

	return { success: false, message: "Invalid Password"}
}

function render(obj) {
	if (obj.success) {
		return "Logged In"
	}

	return "Invalid Password"
}

function newAuthService(req, db) {
	let foundUser = searchUser(req, db)

	if (foundUser.length) {
		let result = validatePassword(req.password, foundUser[0].password)
		
		return render(result)
	}
}

console.log(newAuthService(request, db))
/* 
	? Middleware
	* a function that can do anything
	* has access to request & can modify it
	* has access to response & can modify it
	* has access to the next function in the call stack
	* if we don't next(), we're stopped
*/

// ? Better Middleware Function Example (not built in)
function timestamp(req, res, next) {
	res.date = new Date().toLocaleTimeString()
	console.log(res.date, req.method, req.originalUrl)
	// next() - allows us to continue down the call stack
	next()
}

/* 
	? Mini Challenge
	* create a folder named helpers
	* move timestamp to a file in helpers called timestamp.js
	* bring it in via import
	* back from break :16 and done by :21
*/

module.exports = timestamp
/* 
	? Conditionals & Logic Gates
	* conditional is a statement checking if an expression is truthy
	* the expression must always resolve to true
	* if an expression is false, nothing happens
	* if an expression is true, a code block executes
*/

/* 
	? If Statement
	* checks is something is true and executes
*/

let lightSwitch = "off"

// keyword; expression; code block
if (lightSwitch === "on") {
	console.log("The light is on")
}

// let hasTurbo = "no" // resolves to true because of string Boolean value

let hasTurbo = false

if (hasTurbo) {
	console.log("The car has turbo")
}

/* 
	? Else Statement
	* if all else fails, execute the code
*/

if (hasTurbo) {
	console.log("The car has a turbo")
} else {
	console.log("No turbo")
}

console.log("Code executing after our conditional")

/* 
	? Else If Statement
	* allows us to add extra expressions to check against
*/

let temp = 82

if (temp >= 80) {
	console.log("Summer")
} else if (temp >= 60) {
	console.log("Spring")
} else {
	console.log("Cold")
}

if (temp >= 80) {
	console.log("The summer")
}

if (temp >= 60) {
	console.log("The Spring")
}

console.log("Cold")

// ! example of a LOGIC ERROR

/* 
	? Logic Operators NOT AND OR
	* OR Operator (||)
		* true if one of the conditions is true
		* ex: happy if i get dinner or have a beer
		* beer + dinner == true
		* no beer + dinner == true
		* beer + no dinner == true
		* no beer + no dinner == false
	* AND Operator (&&)
		* true if both conditions are true
		* ex: happy if i get dinner and have a beer
		* dinner + beer == true
		* no dinner + beer == false
		* dinner + no beer == false
		* no dinner + no beer == false
	* NOT Operator (! or != or !==)
		* flips the condition
		* falsey 
		* !false resolves to true
*/

let hasBeer = false
let hasDinner = true

if (hasBeer || hasDinner) {
	console.log("OR Happy")
}

if (hasBeer && hasDinner) {
	console.log("AND Happy")
}

if (!hasBeer) {
	console.log("NOT I'm happy because I have no beer (weird)")
}

if (hasBeer !== true) {
	console.log("NOT I'm happy because I have no beer (weird)")
}

/* 
	? Challenge
	* answer in Discord in #project-showcase
	* create an age variable
	* create a country variable
	* if a user is > 21 and country is US, they can drink
	* if a user is > 18 an country is Germany, they can drink
	* if a user is > 16 and country is US, they can drive
	* if a user is > 18 and the country is Germany, they can drive
	* if a user is < 18 the user is underage
	! Spicey Mode: what if the value of a variable is something wrong? How will you handle it?
*/

let myNumber = 30

if (myNumber % 3 === 0 && myNumber % 5 === 0) {
	console.log("FizzBuzz")
} else if (myNumber % 3 === 0) {
	console.log("Fizz")
} else if (myNumber % 5 === 0) {
	console.log("Buzz")
} else {
	console.log(`My number is ${myNumber}`)
}

myNumber % 3 === 0 && myNumber % 5 === 0
	? console.log("FizzBuzz")
: myNumber % 3 === 0
	? console.log("Fizz")
: myNumber % 5 === 0
	? console.log("Buzz")
: console.log(`My number is ${myNumber}`)

switch (true) {
	case myNumber % 3 === 0 && myNumber % 5 === 0:
		console.log("FizzBuzz")
		break
	case myNumber % 3 === 0:
		console.log("Fizz")
		break
	case myNumber % 5 === 0:
		console.log("Buzz")
		break
	default:
		console.log(`My number is ${myNumber}`)
}
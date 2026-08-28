/* 
	? Array Methods
	* method is a function
	* it lives on the object type (in this instance, Array constructor)
	* it's accessible by each instance of your object
	* dennoted by .nameOfMethod()
*/

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]

/* 
	.push()
	* appends argument to the end of the array
	* returns new length of the array
*/

let pushResult = months.push("Oct")
console.log(months, "push() return:", pushResult)

/* 
	.pop()
	* removed last elements from an array
	* returns said element
*/

let popResult = months.pop()
console.log(months, "pop() return:", popResult)

/* 
	.unshift()
	* adds argument to the beginning of the array
	* returns the new lenth of the array
*/

let unshiftResult = months.unshift("months")
console.log(months, "unshift() return:", unshiftResult)

/* 
	.shift()
	* removes first element from an array
	* returns the removed element
*/

let shiftResult = months.shift()
console.log(months, "shift() return:", shiftResult)

/* 
	? Challenge
	* iterate thru our array and clear it out
	* while you clear it out, if the item is current month, console log it
	* console log the array once completed
*/

console.log("=====================================")

while (months.length > 0) {
	let removedMonth = months.pop()
	if (removedMonth === "Aug") {
		console.log("Current month:", removedMonth)
	}
}
console.log("Array after clearing:", months)

/* 
	? Advanced Array Methods
	* .forEach
	* .filter
	* .map
	* .reduce
	* allow us to parse thru data efficiently
*/

let states = [
    "Illinois",
    "Wisconsin",
    "Alabama",
    "New York",
    "Vermont",
    "Indiana", 
    "Massachussets",
    "Ohio",
    "Virginia",
    "West Virginia",
    "Pennsylvania",
    "North Dakota",
    "South Dakota",
    "Oregon",
    "California",
    "Nevada",
    "Arizona",
    "New Mexico",
    "Florida",
    "Louisiana",
    "Texas",
    "New Hampshire",
    "Maine",
    "Rhode Island",
    "Alaska",
    "Connecticut",
    "Montana",
    "Nebraska",
    "Delaware",
    "Washington",
    "Iowa",
    "Kansas",
    "Oklahoma",
    "Michigan",
    "Minnesotta",
    "Kentucky",
    "Tennessee",
    "Idaho",
    "Utah",
    "Georgia",
    "Mississippi",
    "Missouri",
    "Colorado",
    "Delaware",
    "Hawaii",
    "Maryland",
    "North Carolina",
    "South Carolina",
    "New Jersey",
    "Wyoming"
]

/* 
	? .forEach
	* a loop
	* takes your iterator, index, and original iterable array
	* fires a callback function for every single iteration
		* callback fx - a function that runs each time
	* forEach does NOT return anything
*/

let forEachResult = states.forEach((value, index, origArray) => {
	console.log(`Iterable: ${value} - Index: ${index}`)
	// console.log(origArray)
	return "forcing it to return something"
})

console.log(forEachResult)

/* 
	? Challenge
	* create a new array
	* utilize forEach on the states
	* if the state starts with a letter M, add it to the new array
*/

let statesStartingWithM = []
states.forEach((state) => {
	if (state.startsWith("M")) {
		statesStartingWithM.push(state)
	}
})

console.log(statesStartingWithM)

let grades = [56, 25, 100, 98, 77, 3, 103]

/* 
	? Challenge
	* utilize forEach on grades
	* check if a value is divisible by 2
	* if it is, add it to a new divByTwo array
*/
let divByTwo = []
grades.forEach((grade) => {
	if (grade % 2 === 0) {
		divByTwo.push(grade)
	}
})

console.log(divByTwo)


/* 
	* run another forEach
	* round up everyone's grade by 10 points (tricky!!)
	* if someone's grade is over 90, do nothing
*/
grades.forEach((grade, index, origArray) => {
	if (grade <= 90) {
		origArray[index] = grade + 10
	}
})

console.log(grades) 


let divByTwo2 = []
console.log(divByTwo)
grades.forEach(function(val) {
	if (val % 2 === 0) {
		divByTwo2.push(val)
		console.log(divByTwo2)
	}
})

function handleGrades(val, index, origArr) {
	if (val < 90) {
		origArr[index] = val + 10
	}
}

// ? Callback functions need to be passed by reference (no parents at the end() )
grades.forEach(handleGrades)

console.log(grades)

// ? Goal
// * Use the map() method to create a new array of usernames.

// ? Rules
// * Convert each name to lowercase.
// * Remove all spaces.
// * Add "@" to the beginning.

// ?Restrictions
// * Do not use a for loop or forEach().
// * You must use map().
// * Do not modify the original students array.

// ? Bonus
// * Instead of removing spaces, replace them with underscores (_).

users = [
	"Alice Johnson",
	"Bob Smith",
	"Charlie Brown",
	"Diana Prince",
	"Ethan Hunt",
	"Fiona Green"
]

let usernames = users.map(user => 
	`@${user.toLowerCase().replace(/ /g, '')}`)
console.log(usernames)	

// let usernames = students.map(s => {
// 	return `@${s.toLowerCase().replace(" ", "_")}`
// })

// console.log(usernames)

// class solution for creating usernames with underscores instead of spaces
// let usernames2 = students.map(s => {
// 	let name = "@"
// 	for (i of s.toLowerCase()) {
// 		if (i !== " ") {
// 			name += i
// 		}

// 		if (i === " ") {
// 			name += "_"
// 		}
// 	}
// 	return name
// })

// console.log(usernames2)


/* 
	? Challenge
	* given our array of grades
	* find passing scores using filter method
	* passing should be 60 and above
*/
let passingGrades = grades.filter(grade => grade >= 60)
console.log(passingGrades)
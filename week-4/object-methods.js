/* 
	? Object Methods
	* functions working on specific object
	* deal with scope
		* global (outside) (default)
		* this (inside) (allows access to the correct scope)
	* this - defines the scope of the object in which a method resides
		* think of it as "look here"
*/

let name = "Andrew"

let student = {
	name: "Dave",
	class: "fullstack-11",
	isEnrolled: true,

	// method as a function call
	showName() {
		return this.name
	},

	// method as property and function declaration
	modifyEnrollment: function(enrolled) {
		return this.isEnrolled = enrolled
	},

	// method as arrow function
	modifyClass: (newClass) => {
		this.class = newClass
	},

	// ? arrow functions do not bind to this or super()
	// ! DO NOT USE ARROW FUNCTION INSIDE OBJECT!

	seeThis() {
		return this
		// when console logged, points right back to this object (pun intended)
	}
};

console.log(student);

// ? Function that performs a task

function updateName(obj, name) {
	let result = obj;
	result.name = name;
	return result;
}

// ? This is funtional programming
student = updateName(student, "Paul")
console.log(student)

// ? Object Oriented Programming - requires methods to modify objects

// ? This outside function pollutes your scope

let cookies = ["chocolate chip", "walnut", "snickers"]

updateName(cookies, "cookie") // ? lol wut??

console.log(student.showName())

let resultOfMethod = student.modifyEnrollment(false)
console.log(student, "Catch of result method", resultOfMethod)

student.modifyClass("potato")
console.log(student)

console.log("HERE", student.seeThis())

console.log("=====================================================")

/* 
	? Challenge
	* create an object called toDoList
	* give it the following properties:
		* urgent
		* todo
		* completed
	* all three should be assigned a value of an empty array
	* create a method called add
		* add will take one parameter
		* it will add said parameter to the todo list
	* create a method called checked
		* it will take one param
		* it needs to check if that param exists in todo array
		* if it does, move it to completed
	* create a method called removeToDo
		* it will take one param
		* it will check if the param exists inside todo array
		* if it does, it will remove it
		* EXTRA: return the removed item
		* assign it to a variable called removedItem
	* create a method called prioritize
		* it will take one param
		* it will check if todo array has said item
		* if it does, move it to urgent
	* create a method called clearAll
		* this method will clear all three of the arrays
*/
let toDoList = {
	urgent: [],
	todo: [],
	completed: [],

	add(item) {
		this.todo.push(item)
	},

	checked(item) {
		let index = this.todo.indexOf(item)
		if (index !== -1) {
			this.todo.splice(index, 1)
			this.completed.push(item)
		}
	},

	removeToDo(item) {
		let index = this.todo.indexOf(item)
		if (index !== -1) {
			let removedItem = this.todo.splice(index, 1)[0]
			return removedItem
		}
	},

	prioritize(item) {
		let index = this.todo.indexOf(item)
		if (index !== -1) {
			this.todo.splice(index, 1)
			this.urgent.push(item)
		}
	},

	clearAll() {
		this.urgent = []
		this.todo = []
		this.completed = []
	}
}

// ? Testing the toDoList object
toDoList.add("Buy groceries")
toDoList.add("Clean the house")
toDoList.add("Pay bills")
console.log(toDoList)

toDoList.checked("Clean the house")
console.log(toDoList)

let removedItem = toDoList.removeToDo("Pay bills")
console.log("Removed item:", removedItem)
console.log(toDoList)

toDoList.prioritize("Buy groceries")
console.log(toDoList)

toDoList.clearAll()
console.log(toDoList)


// class solution for toDoList

let toDoList = {
	urgent: [],
	todo: [],
	completed: [],

	add(item) {
		this.todo.push(item)
	},

	foundItem(item, toDoList) {
		let result = null
		
		let exists = this[toDoList].filter(i => i === item)

		if (exists.length) {
			result = exists
		}

		return result
	},

	checked(item) {
		let exists = this.foundItem(item, "todo")
		if (exists.length) {
			this.completed.push(item)
			this.todo = this.todo.filter(i => i !== item)
		}
	},
	
	removeToDo(item) {
		let result = null
		
		let getIndexOfItem = this.todo.indexOf(item)
		
		if (getIndexOfItem !== -1) {
			result = this.todo.splice(getIndexOfItem, 1)[0]
		}
		
		return result
	},
	
	prioritize(item) {
		let exists = this.foundItem(item, "todo")

		if (exists) {
			this.urgent.push(item)
			this.todo = this.todo.filter(i => i !== exists[0])
		}
	},

	clearAll() {
		this.urgent = []
		this.todo = []
		this.completed = []
	}
}

toDoList.add("milk")
toDoList.add("pay credit card")
toDoList.add("be mean to my manager")

console.log(toDoList)

toDoList.checked("milk")

console.log(toDoList)

let removedItem = toDoList.removeToDo("pay credit card")
console.log(removedItem)
console.log(toDoList)

toDoList.foundItem("", "todo")

toDoList.prioritize("be mean to my manager")
console.log(toDoList)

toDoList.clearAll()

console.log(toDoList)

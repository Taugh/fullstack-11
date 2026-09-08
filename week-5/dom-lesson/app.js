console.log("This JS runs from within app.js")

/* 
	? Document Object Model (DOM)
	* object style representation of what's on the screen
	* allows you to access any element, attribute, comment
	* it allows you to create new elements
	* it allows you to modify or remove existing elements
	* it is structured inside of an object
	* it has methods specifically designed to manipulate the DOM nodes
*/

// ? Accessing an object
console.log(document)
console.dir(document)

// ? Accessing a window
console.dir(window)

// ? Accessing navigator

console.dir(navigation)

// ? can also be accessed using:
console.dir(window.history)

/* 
	? Accessing elements in DOM
	* getElementById()
	* getElementsByClassName() [HTMLCollection]
	* getElementsByTagName() [HTMLCollection]
	* querySelector()
	* querySelectorAll() [NodeList]
*/

let toDoItems = document.getElementsByClassName("todo-items")

// ? Changing element's atrributes using document object values

console.log(toDoItems)

// ! array LIKE object, so can't use array methods on this "array"
// toDoItems.forEach(i => console.log(i))

for (item of toDoItems) {
	console.log("Individual list item", item)
	item.style.color = "blue"
}

let aboutMe = document.getElementById("about-me-section")
console.dir(aboutMe)

aboutMe.textContent = "We updated this paragraph tag using DOM and JavaScript"

// ? We can access elements without the use of these properties
console.log(document.body.children[1])

let header = document.getElementsByTagName("h1")
console.dir(header)

/* 
	* HTML Collection
		* array-like (cannot use array methods)
		* can use loops
		* is live
		* any changes are tracked
	* NodeList
		* acts like an array
		* can use array methods (forEach, map, filter)
		* is not live, changes are lost
*/

let navbar = document.querySelector(".navigation")
console.dir(navbar)

// ? Assigning objects into document object

Object.assign(navbar.style, {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	gap: "1em"
})

let navLinks = document.querySelectorAll(".nav-link")
console.log(navLinks)

navLinks.forEach(el => el.childNodes[0].style.color = "black")

// ? querySelectorAll can use compound selectors

let navAnchors = document.querySelectorAll(".nav-link > a")
console.log(navAnchors)

navAnchors.forEach(el => el.style.fontSize = "18pt")

/* 
	? Creating HTML Elements
	* create an element using .createElement() method
	* adjust your element
	* append the element to the DOM using .append() or .appendChild()
*/

// create element
let footer = document.createElement("footer")
console.log(footer)

// create another element
let p = document.createElement("p")
// adjusted new element's properties
p.className = "copyright-text"
p.textContent = "Copyright 2026"

// added new p element to the footer element
footer.appendChild(p)

// added footer to our body
document.body.appendChild(footer)

/* 
	? Challenge
	* hardcode a main element
	* hardcode a div inside with class img-container
	* create an img element
	* pass the url below to its src attribute
	* adjust its width, height, and object fit (set last to cover)
	* append it to the img-container div
	! SPICEY MODE - create five of those pictures and then make sure they look good using flexbox
*/

let imgUrl = "https://plus.unsplash.com/premium_photo-1661962699932-1948aa1dde16?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

let imgContainer = document.querySelector(".img-container")

for (let i = 0; i < 5; i++) {
	let img = document.createElement("img")
	img.src = imgUrl
	
	let imgStyle = {
		width: "200px",
		height: "200px",
		objectFit: "cover"
	}
	
	Object.assign(img.style, imgStyle)
	console.dir(img)
	
	
	imgContainer.appendChild(img)
}

Object.assign(imgContainer.style, {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	gap: "1em"
})

/* 
	? NodeList vs HTMLCollection
	* not live vs live
*/



let htmlCollection = document.getElementsByClassName("todo-items")
let nodeList = document.querySelectorAll(".todo-items")

let ul = document.querySelector("ul")
let li = document.createElement("li")
li.textContent = "New To Do Item"
li.className = "todo-items"
ul.appendChild(li)

console.log("HTML COLLECTION", htmlCollection)
console.log("NODE LIST", nodeList)

/* 
	* HTMLCollection updates the color of the newly created element
	* NodeList will not update the color of the newly created element
*/

for (i of htmlCollection) {
	// i.style.color = "red"
}

for (i of nodeList) {
	i.style.color = "red"
}
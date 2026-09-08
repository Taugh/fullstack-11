/* 
	? Event Listeners
	* document methods that listen for an event
	* when an event occurs, a callback fx fires
	* .addEventListner("event", callbackfx)
	
	? Callback Function
	* a function that fires when an event occurs
	* the event is not under our control
*/

let modeBtn = document.getElementsByClassName("screen-mode")[0]
console.log(modeBtn, modeBtn instanceof HTMLElement)

let darkMode = false


modeBtn.addEventListener("click", (evt) => {
	// ? Evt holds event that was triggered by the listener
	console.log(evt)

	if (darkMode) {
		document.body.className = "dark-mode"
		
	} else {
		document.body.className = "light-mode"
	}
	
	darkMode = !darkMode
	
	darkMode ? evt.target.textContent = "Light Mode" : evt.target.textContent = "Dark Mode"
})



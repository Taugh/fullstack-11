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

let age = 18;
let country = "US";

if ((typeof age !== "number") || (typeof country !== "string")) {
    console.log("Invalid input");
} else if (country === "US") {
    if (age >= 21) {
        console.log("You can drink in the US");
    } else if (age >= 16) {
        console.log("You can drive in the US");
    } else {
        console.log("You are underage");
    }
} else if (country === "Germany") {
    if (age > 18) {
        console.log("You can drive and drink in Germany");
    } else {
        console.log("You are underage");
    }
} else {
    console.log("Country not supported");
}
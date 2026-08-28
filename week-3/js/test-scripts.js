// Check for uppercase

let letter = "w";

if (letter >="A" && letter <= "Z") {
    console.log(letter + " is an uppercase letter.");
} else {
    console.log(letter + " is not an uppercase letter.");
}

// Check for number in a string and count how 
// many numbers are in the string

let character = "5kl2";
let count = 0;

for (let i = 0; i < character.length; i++) {
    if (character[i] >= "0" && character[i] <= "9") {
        console.log(character[i] + " is a number.");
        count++;
        console.log("Total numbers counted: " + count);
    } else {
        console.log(character[i] + " is not a number.");
    }
}

// Check for special characters in a string and count how
// many special characters are in the string

let specialCharacter = "@";
let specialCount = 0;

if ((specialCharacter >= "!" && specialCharacter <= "/") ||
    (specialCharacter >= ":" && specialCharacter <= "@") ||
    (specialCharacter >= "[" && specialCharacter <= "`") ||
    (specialCharacter >= "{" && specialCharacter <= "~")) {
    console.log(specialCharacter + " is a special character.");
    specialCount++;
    console.log("Total special characters counted: " + specialCount);
} else {
    console.log(specialCharacter + " is not a special character.");
}
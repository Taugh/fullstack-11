myName = "TrOy Brannon";
voweless = "";

// for (let i = myName.length - 1; i >= 0; i--) {
//     console.log(myName[i]);
// }

vowels = ["a", "e", "i", "o", "u"];

for (let i = 0; i < myName.length; ) {
    if (vowels.includes(myName[i].toLowerCase())) {
        i++;
        continue;
    }
    voweless += myName[i];
    i++;
}
console.log(voweless);

countdown = 10;
while (countdown >= 0) {
    console.log(countdown);
    countdown--;
}
console.log("Blast off!");
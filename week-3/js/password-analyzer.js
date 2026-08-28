// Part 1
function checkLength(password) {
    if (password.length < 8) {
        return "too short";
    } else if (password.length <= 15) {
        return "good";
    } else {
        return "long";
    }
}

// Part 2
function countNumbers(password) {
    let count = 0;

    for (let i = 0; i < password.length; i++) {
        let character = password[i];

        if (character >= "0" && character <= "9") {
            count++;
        }
    }

    return count;
}

// Part 3
function countUppercase(password) {
    let count = 0;

    for (let i = 0; i < password.length; i++) {
        let character = password[i];

        if (
            character >= "A" &&
            character <= "Z" &&
            character === character.toUpperCase()
        ) {
            count++;
        }
    }

    return count;
}

// Part 4
function countSpecialCharacters(password) {
    let count = 0;

    for (let i = 0; i < password.length; i++) {
        let character = password[i];

        if (
            character === "!" ||
            character === "@" ||
            character === "#" ||
            character === "$" ||
            character === "%" ||
            character === "&" ||
            character === "*"
        ) {
            count++;
        }
    }

    return count;
}

// Part 5
function hasGoodLength(password) {
    let result = checkLength(password);

    return result === "good" || result === "long";
}

// Part 6
function hasNumber(password) {
    return countNumbers(password) > 0;
}

// Part 7
function hasUppercase(password) {
    return countUppercase(password) > 0;
}

// Part 8
function hasSpecialCharacter(password) {
    return countSpecialCharacters(password) > 0;
}

// Part 12 (Spicy Mode)
function hidePassword(password) {
    let hidden = "";

    for (let i = 0; i < password.length; i++) {
        hidden += "*";
    }

    return hidden;
}

// Part 13 (Spicy Mode)
function hasRepeatedCharacters(password) {
    for (let i = 0; i < password.length - 2; i++) {
        if (
            password[i] === password[i + 1] &&
            password[i] === password[i + 2]
        ) {
            return true;
        }
    }

    return false;
}

// Part 9
function calculateScore(password) {
    let score = 0;

    if (hasGoodLength(password)) {
        score++;
    }

    if (hasNumber(password)) {
        score++;
    }

    if (hasUppercase(password)) {
        score++;
    }

    if (hasSpecialCharacter(password)) {
        score++;
    }

    if (checkLength(password) === "long") {
        score++;
    }

    // Spicy Mode penalty
    if (hasRepeatedCharacters(password)) {
        score--;
    }

    if (score < 0) {
        score = 0;
    }

    return score;
}

// Part 10
function getPasswordStrength(password) {
    let score = calculateScore(password);

    if (score <= 1) {
        return "Weak";
    } else if (score <= 3) {
        return "Medium";
    } else if (score === 4) {
        return "Strong";
    } else {
        return "Very Strong";
    }
}

// Part 11
function analyzePassword(password) {
    console.log("PASSWORD SECURITY REPORT");
    console.log("------------------------");
    console.log("Password:", hidePassword(password));
    console.log("Password length:", password.length);
    console.log("Length rating:", checkLength(password));
    console.log("Numbers:", countNumbers(password));
    console.log("Uppercase letters:", countUppercase(password));
    console.log("Special characters:", countSpecialCharacters(password));
    console.log("Security score:", calculateScore(password), "/ 5");
    console.log("Strength:", getPasswordStrength(password));
    console.log("Repeated characters:", hasRepeatedCharacters(password));
    console.log("");
}

// Testing
analyzePassword("hello");

analyzePassword("hello123");

analyzePassword("Hello123");

analyzePassword("Hello123!");

analyzePassword("SuperSecure123!");

analyzePassword("Hellooo123!");

analyzePassword("SUPERSecure123!!");
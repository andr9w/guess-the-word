const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
}; // Display circle symbols as placeholders for the chosen word's letters

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Empty message paragraph
    message.innerText = "";
    // Let's grab what was entered in the input
    const guess = letterInput.value;
    // Let's make sure that it is a single letter
    const goodGuess = inputValidate(guess);

    if (goodGuess) {
        // We've got a letter! Let's guess!
        makeGuess(guess);
    }
    letterInput.value = "";
});

const inputValidate = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        // Is the input empty?
        message.innerText = "Please input a letter.";
    } else if (input.length > 1) {
        // Did you type more than one letter?
        message.innerText = "Please input only 1 letter.";
    } else if (!input.match(acceptedLetter)) {
        // Did you type a number, a special character, or non letter?
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    };
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        guessedLettersSection();
        wordUpdate(guessedLetters);
    }
};

const guessedLettersSection = function () {
    // Clear the list first
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    } // Create a new list item for each letter insice your guessedLetters array
};

const wordUpdate = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    // console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};
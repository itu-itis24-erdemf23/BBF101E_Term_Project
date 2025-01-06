// Game Variables
let word = "STOCK"; // The word to guess
let revealedLetters = Array(word.length).fill("_"); // ["_", "_", "_", "_", "_"]
let score = 0;
let lives = 3;

// HTML Elements
const revealedWordElement = document.getElementById("revealed-word");
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const inputElement = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-button");
const resetButton = document.getElementById("reset-button");

// Update UI
function updateUI() {
    revealedWordElement.textContent = revealedLetters.join(" ");
    scoreElement.textContent = `Score: ${score}`;
    livesElement.textContent = `Lives: ${lives}`;
}

// Handle Guess
function handleGuess() {
    const guess = inputElement.value.toUpperCase();
    inputElement.value = ""; // Clear the input field

    if (guess.length === 1) {
        // Single letter guess
        if (word.includes(guess)) {
            // Reveal the letter(s) in the word
            for (let i = 0; i < word.length; i++) {
                if (word[i] === guess) {
                    revealedLetters[i] = guess;
                }
            }
            score += 20; // Add points
        } else {
            lives -= 1; // Deduct a life
        }
    } else if (guess.length === word.length) {
        // Whole word guess
        if (guess === word) {
            score += 100; // Win bonus
            alert("You win!"); // Game over - win
            submitButton.disabled = true; // Disable further guesses
        } else {
            lives = 0; // Lose immediately
        }
    }

    // Check for game over
    if (lives <= 0) {
        alert("Game over! You lost!");
        submitButton.disabled = true;
    } else if (!revealedLetters.includes("_")) {
        alert("You win!");
        submitButton.disabled = true;
    }

    updateUI();
}

// Reset Game
function resetGame() {
    revealedLetters = Array(word.length).fill("_");
    score = 0;
    lives = 3;
    submitButton.disabled = false; // Enable guesses
    updateUI();
}

// Event Listeners
submitButton.addEventListener("click", handleGuess);
resetButton.addEventListener("click", resetGame);

// Initialize Game
updateUI();

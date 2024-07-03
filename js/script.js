// Generate a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Selecting DOM elements
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const startOver = document.querySelector('.resultParas');
const lowOrHi = document.querySelector('.lowOrHi');
const newGameButton = document.querySelector('#newGame');
const timerDisplay = document.getElementById('timer');

// Variables to track game state
let previousGuesses = [];
let numGuesses = 0;
let timeRemaining = 30; // Set initial time to 60 seconds
let timerInterval;

// Function to display messages
function displayMessage(message) {
    lowOrHi.textContent = message;
}

// Function to update the timer
function updateTimer() {
    timeRemaining--;
    timerDisplay.textContent = `${timeRemaining} seconds remaining`;

    if (timeRemaining === 0) {
        endGame();
        displayMessage(`Time's up! Number was ${randomNumber}`);
    }
}

// Function to handle the game logic
function validateGuess(guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
        displayMessage('Please enter a valid number between 1 and 100.');
        return;
    }

    numGuesses++;
    previousGuesses.push(guess);
    displayGuesses(guess);

    if (guess === randomNumber) {
        displayMessage('Congratulations! You guessed the correct number!');
        endGame();
    } else if (numGuesses === 5) {
        displayMessage(`Game over! The number was ${randomNumber}.`);
        endGame();
    } else {
        const message = guess < randomNumber ? 'Too low! Try again!' : 'Too high! Try again!';
        displayMessage(message);
        if (guess < randomNumber) {
            lowOrHi.classList.remove('too-high');
            lowOrHi.classList.add('too-low');
        } else {
            lowOrHi.classList.remove('too-low');
            lowOrHi.classList.add('too-high');
        }
    }
}


// Function to display guesses and remaining attempts
function displayGuesses(guess) {
    guessSlot.textContent += `${guess} `;
    remaining.textContent = `${5 - numGuesses} attempts remaining`;
}

// Function to start a new game
function startNewGame() {
    // Reset variables and UI
    randomNumber = Math.floor(Math.random() * 100) + 1;
    previousGuesses = [];
    numGuesses = 0;
    timeRemaining = 30;
    guessSlot.textContent = '';
    remaining.textContent = '5 attempts remaining';
    lowOrHi.textContent = '';
    timerDisplay.textContent = '30 seconds remaining';

    // Enable input and start timer
    userInput.removeAttribute('disabled');
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

// Function to end the game
function endGame() {
    // Disable input and stop timer
    userInput.setAttribute('disabled', '');
    clearInterval(timerInterval);

    // Show "Start New Game" button
    const button = document.createElement('button');
    button.textContent = 'Start New Game';
    button.addEventListener('click', startNewGame);
    startOver.appendChild(button);
}

// Event listener for the submit button
submit.addEventListener('click', function(e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
    userInput.value = ''; // Clear input field after submission
});

// Start new game when the page loads
startNewGame();
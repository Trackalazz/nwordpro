const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let sequence = [];
let n = 2;
let score = 0;
let attempts = 0;
let currentIndex = 0;
let interval;

const letterDisplay = document.getElementById("letterDisplay");
const scoreDisplay = document.getElementById("score");
const attemptsDisplay = document.getElementById("attempts");
const nLevelDisplay = document.getElementById("nLevel");

function randomLetter() {
    return letters[Math.floor(Math.random() * letters.length)];
}

function nextTurn() {
    const letter = randomLetter();
    sequence.push(letter);
    letterDisplay.textContent = letter;
    currentIndex++;
}

function checkAnswer(isMatch) {
    if (currentIndex <= n) return;

    attempts++;

    const correct =
        sequence[currentIndex - 1] === sequence[currentIndex - 1 - n];

    if ((isMatch && correct) || (!isMatch && !correct)) {
        score++;
    }

    scoreDisplay.textContent = score;
    attemptsDisplay.textContent = attempts;
}

function startGame() {
    sequence = [];
    score = 0;
    attempts = 0;
    currentIndex = 0;

    scoreDisplay.textContent = 0;
    attemptsDisplay.textContent = 0;

    clearInterval(interval);
    interval = setInterval(nextTurn, 2000);
}

document.getElementById("matchBtn")
    .addEventListener("click", () => checkAnswer(true));

document.getElementById("noMatchBtn")
    .addEventListener("click", () => checkAnswer(false));

document.getElementById("startBtn")
    .addEventListener("click", startGame);

fetch("/save_score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score: score })
});

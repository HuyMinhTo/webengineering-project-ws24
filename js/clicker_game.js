let score = 0;
let timer = 10;
let interval;
const highscoreList = [];
let timerStarted = false;

function startGame() {
    // Reset score, timer und Timer-Status
    score = 0;
    timer = 10;
    timerStarted = false;

    // UI aktualisieren
    document.getElementById("score").textContent = score;
    document.getElementById("timer").textContent = timer;
    document.getElementById("click-button").disabled = false;
    document.getElementById("restart-button").style.display = "none";
}

function startTimer() {
    timerStarted = true; // Timer-Status setzen
    interval = setInterval(() => {
        timer--;
        document.getElementById("timer").textContent = timer;

        if (timer === 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(interval);
    document.getElementById("click-button").disabled = true;
    document.getElementById("restart-button").style.display = "inline-block";

    // Add current score to the highscore list
    highscoreList.push(score);
    highscoreList.sort((a, b) => b - a);

    // Update highscore table
    const highscoreElement = document.getElementById("highscore-list");
    highscoreElement.innerHTML = "";
    highscoreList.forEach((entry, index) => {
        const li = document.createElement("li");
        li.textContent = `Platz ${index + 1}: ${entry} Punkte`;
        highscoreElement.appendChild(li);
    });

}

document.getElementById("click-button").addEventListener("click", () => {
    score++;
    document.getElementById("score").textContent = score;

    // Timer erst beim ersten Klick starten
    if (!timerStarted) {
        startTimer();
    }
});

document.getElementById("restart-button").addEventListener("click", startGame);


window.onload = startGame;

// Interaktive Effekte für Buttons
    document.querySelector('.rotate-button').addEventListener('click', () => {
    alert('Du hast den Dreh-Button gedrückt!');
});



//Progress Bar
let progress = 0;
let progressInterval;

function startProgress() {
    progress = 0;
    clearInterval(progressInterval);
    const progressBar = document.getElementById("progress-bar");
    const progressPercentage = document.getElementById("progress-percentage");

    progressBar.style.width = "0%";
    progressPercentage.textContent = "0%";

    progressInterval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(progressInterval);
        } else {
            progress++;
            progressBar.style.width = progress + "%";
            progressPercentage.textContent = progress + "%";
        }
    }, 50); // Geschwindigkeit: 50ms für jedes Prozent
}

// Fortschrittsbalken automatisch beim Laden starten
window.onload = startProgress;

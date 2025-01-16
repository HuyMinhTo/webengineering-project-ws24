// Fetch API for Weather
async function fetchWeather() {
    const weatherOutput = document.getElementById('weather-output');
    weatherOutput.textContent = "Wetter wird geladen...";

    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Sankt%20Augustin&appid=b308b8b1f7a5ab36cedeea02e6171862&units=metric&lang=de');
        if (!response.ok) throw new Error('Fehler beim Abrufen der Wetterdaten');

        const data = await response.json();
        const weatherInfo = `
            Ort: ${data.name}
            Temperatur: ${data.main.temp} °C
            Wetter: ${data.weather[0].description}
            Luftfeuchtigkeit: ${data.main.humidity} %
        `;
        weatherOutput.textContent = weatherInfo;
    } catch (error) {
        weatherOutput.textContent = `Fehler: ${error.message}`;
    }
}

// File Upload API
function handleFileUpload() {
    const fileInput = document.getElementById('file-input');
    const fileOutput = document.getElementById('file-output');

    if (fileInput.files.length === 0) {
        fileOutput.textContent = "Bitte wähle eine Datei aus.";
        return;
    }

    const file = fileInput.files[0];
    const fileInfo = `
        Dateiname: ${file.name}
        Dateityp: ${file.type || 'Unbekannt'}
        Dateigröße: ${(file.size / 1024).toFixed(2)} KB
        Letzte Änderung: ${file.lastModifiedDate || 'Unbekannt'}
    `;

    fileOutput.textContent = fileInfo;
}

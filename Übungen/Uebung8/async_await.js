async function fetchAndCombineFiles() {
    try {
        // Dateien parallel laden
        const [responseA, responseB] = await Promise.all([
            fetch("A.txt"),
            fetch("B.txt")
        ]);

        // Fehlerüberprüfung
        if (!responseA.ok) throw new Error("A.txt konnte nicht geladen werden!");
        if (!responseB.ok) throw new Error("B.txt konnte nicht geladen werden!");

        // Inhalte extrahieren
        const dataA = await responseA.text();
        const dataB = await responseB.text();

        console.log("A.txt:", dataA);
        console.log("B.txt:", dataB);

        // Zeilenweise Verarbeitung
        const linesA = dataA.split("\n");
        const linesB = dataB.split("\n");
        const combinedLines = linesA.map((line, index) => `${line} ${linesB[index] || ""}`);

        console.log("Result:");
        console.log(combinedLines.join("\n"));
    } catch (error) {
        console.log("Fehler beim Laden:", error.message);
    }
}

// Funktion ausführen
fetchAndCombineFiles();

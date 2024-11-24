Promise.all([
    fetch("A.txt").then(response => {
        if (!response.ok) throw new Error("A.txt konnte nicht geladen werden!");
        return response.text();
    }),
    fetch("B.txt").then(response => {
        if (!response.ok) throw new Error("B.txt konnte nicht geladen werden!");
        return response.text();
    })
])
    .then(([dataA, dataB]) => {
        console.log("A.txt:", dataA);
        console.log("B.txt:", dataB);

        // Zeilenweise Verarbeitung:
        const linesA = dataA.split("\n");
        const linesB = dataB.split("\n");
        const combinedLines = linesA.map((line, index) => `${line} ${linesB[index] || ""}`);
        console.log("Result:");
        console.log(combinedLines.join("\n"));
    })
    .catch(error => {
        console.log("Fehler beim Laden:", error.message);
    });

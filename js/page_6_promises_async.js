// Promise-Methode
function runPromiseExample() {
    Promise.all([
        fetch('../assets/txt/A.txt').then(res => {
            if (!res.ok) throw new Error("A.txt konnte nicht geladen werden!");
            return res.text();
        }),
        fetch('../assets/txt/B.txt').then(res => {
            if (!res.ok) throw new Error("B.txt konnte nicht geladen werden!");
            return res.text();
        })
    ])
        .then(([dataA, dataB]) => {
            const linesA = dataA.split("\n");
            const linesB = dataB.split("\n");
            const combined = linesA.map((line, i) => line + (linesB[i] ? " " + linesB[i] : ""));
            document.getElementById("promise-output").textContent = combined.join("\n");
        })
        .catch(error => console.error(error));
}

// Async/Await-Methode
async function runAsyncExample() {
    try {
        const [responseA, responseB] = await Promise.all([
            fetch('../assets/txt/A.txt'),
            fetch('../assets/txt/B.txt')
        ]);
        if (!responseA.ok) throw new Error("A.txt konnte nicht geladen werden!");
        if (!responseB.ok) throw new Error("B.txt konnte nicht geladen werden!");

        const dataA = await responseA.text();
        const dataB = await responseB.text();

        const linesA = dataA.split("\n");
        const linesB = dataB.split("\n");
        const combined = linesA.map((line, i) => line + (linesB[i] ? " " + linesB[i] : ""));
        document.getElementById("async-output").textContent = combined.join("\n");
    } catch (error) {
        console.error(error);
    }
}

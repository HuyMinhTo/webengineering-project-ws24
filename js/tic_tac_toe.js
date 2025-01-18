const cells = document.querySelectorAll(".cell");
const status = document.querySelector("#status");
const restartButton = document.querySelector("#restart-button");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let gameOptions = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameStarted = true;

function createGame() {
    cells.forEach(cell => cell.addEventListener("click", clickCell));
    restartButton.addEventListener("click", restartGame);
    updateStatus();
}

function clickCell() {
    const cellIndex = this.getAttribute("cellIndex");
    if (gameOptions[cellIndex] !== "" || !gameStarted) return;

    setCell(this, cellIndex);
    validateWinner();
}

function setCell(cell, index) {
    gameOptions[index] = currentPlayer;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");

    if (currentPlayer === "X") {
        const line1 = createLine("10", "10", "90", "90");
        const line2 = createLine("90", "10", "10", "90");
        svg.append(line1, line2);
    } else {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        circle.setAttribute("r", "40");
        circle.setAttribute("stroke", "#6baed6");
        circle.setAttribute("stroke-width", "10");
        circle.setAttribute("fill", "transparent");
        svg.appendChild(circle);
    }

    cell.innerHTML = "";
    cell.appendChild(svg);
}

function createLine(x1, y1, x2, y2) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "#6baed6");
    line.setAttribute("stroke-width", "10");
    return line;
}

function validateWinner() {
    let roundWon = false;

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (gameOptions[a] && gameOptions[a] === gameOptions[b] && gameOptions[a] === gameOptions[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        status.textContent = `${currentPlayer} hat gewonnen!`;
        gameStarted = false;
    } else if (!gameOptions.includes("")) {
        status.textContent = "Unentschieden!";
        gameStarted = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus();
    }
}

function updateStatus() {
    status.textContent = `${currentPlayer} ist dran`;
}

function restartGame() {
    gameOptions = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameStarted = true;
    status.textContent = `${currentPlayer} ist dran`;
    cells.forEach(cell => (cell.innerHTML = ""));
}

createGame();

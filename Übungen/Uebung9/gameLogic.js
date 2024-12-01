const cells = document.querySelectorAll(".cell");
const status = document.querySelector("#status");
const restartbutton = document.querySelector("#restartbutton");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameOptions = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameStarted = false;

createGame()

function createGame() {
    cells.forEach(cell => cell.addEventListener("click", clickCell))
    restartbutton.addEventListener("click", restartGame);
    status.textContent = `${currentPlayer}' ist dran`;
    gameStarted = true;
}

function clickCell() {
    const cellIndex = this.getAttribute("cellIndex");

    //Prüfe ob cell schon angeklickt wurde
    if (gameOptions[cellIndex] != "" || !gameStarted) {
        return;
    }

    setCell(this, cellIndex);
    validateWinner();
}

function setCell(cell, index) {

    // Erstelle ein SVG-Element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");

    if (currentPlayer === "X") {
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", "10");
        line1.setAttribute("y1", "10");
        line1.setAttribute("x2", "90");
        line1.setAttribute("y2", "90");
        line1.setAttribute("stroke", "black");
        line1.setAttribute("stroke-width", "10");

        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute("x1", "90");
        line2.setAttribute("y1", "10");
        line2.setAttribute("x2", "10");
        line2.setAttribute("y2", "90");
        line2.setAttribute("stroke", "black");
        line2.setAttribute("stroke-width", "10");

        svg.appendChild(line1);
        svg.appendChild(line2);
    } else {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        circle.setAttribute("r", "40");
        circle.setAttribute("stroke", "black");
        circle.setAttribute("stroke-width", "10");
        circle.setAttribute("fill", "transparent");

        svg.appendChild(circle);
    }

    // Füge das SVG-Element dem Zellen-Element hinzu
    cell.innerHTML = "";
    cell.appendChild(svg);
    gameOptions[index] = currentPlayer;
}



function changePlayerTurn() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    status.textContent = `${currentPlayer}' ist dran`;
}

function validateWinner() {
    let gameWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellX = gameOptions[condition[0]];
        const cellY = gameOptions[condition[1]];
        const cellZ = gameOptions[condition[2]];

        if (cellX == "" || cellY == "" || cellZ == "") {
            continue;
        }
        if (cellX == cellY && cellY == cellZ) {
            gameWon = true;
            break;
        }
    }
    if (gameWon) {
        status.textContent = `${currentPlayer}' hat gewonnen `;
        gameStarted = false;
    } else if (!gameOptions.includes("")) { //Alle Felder belegt aber gameWon auf false
        status.textContent = "Unentschieden!";
        gameStarted = false;
    }//Es gibt noch offene Felder
    else {
        changePlayerTurn();
    }
}

function restartGame() {
    currentPlayer = "X";
    gameOptions = ["", "", "", "", "", "", "", "", ""];
    status.textContent = `${currentPlayer}' ist dran`;
    cells.forEach(cell => cell.textContent = "");
    gameStarted = true;
}

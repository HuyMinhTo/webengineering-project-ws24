let flippedCards = [];
let matchedPairs = 0;



function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    const grid = document.getElementById("memory-grid");
    const symbols = ["🍎", "🍊", "🍌", "🍉", "🍇", "🍓", "🍒", "🍍"];
    grid.innerHTML = "";
    matchedPairs = 0;
    flippedCards = [];

    // Karten neu shuffeln
    const shuffledSymbols = shuffle([...symbols, ...symbols]);
    shuffledSymbols.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("memory-card");
        card.dataset.symbol = symbol;

        card.addEventListener("click", () => flipCard(card));
        grid.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        card.textContent = card.dataset.symbol;
        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedPairs++;
        flippedCards = [];

    } else {
        setTimeout(() => {
            card1.textContent = "";
            card2.textContent = "";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}


window.onload = startGame;

let cells = document.querySelectorAll(".cell");
let newGameButton = document.querySelector("#new-game");
let currentPlayer = "player-1";
const gameBoard = [[], [], []];

function play(e) {
    let piece = "";
    let nextPlayer = "";

    if (currentPlayer === "player-1") {
        piece = "X";
        nextPlayer = "player-2";
    } else {
        piece = "O";
        nextPlayer = "player-1";
    }

    this.innerText = piece;
    this.classList.add("cell-text");
    currentPlayer = nextPlayer;
    e.target.removeEventListener(e.type, arguments.callee);
}

function startNewGame() {
    currentPlayer = "player-1";
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].classList.remove("cell-text");
    }
    addCellEventListeners();
}

function addCellEventListeners() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", play);
    }
}

newGameButton.addEventListener("click", startNewGame);

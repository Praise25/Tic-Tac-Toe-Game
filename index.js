let cells = Array.from(document.querySelectorAll(".cell"));
let newGameButton = document.querySelector("#new-game");
let selectModeBtn = document.querySelector("#select-mode");
let turnDisplay = document.querySelector("#turn-display");
let displayText = document.querySelector("#display-text");
let modes = document.querySelector("#modes");
let modeButtons = document.querySelectorAll(".col-sm-12.btn");

let currentPlayer = "player-1";
let player1 = "";
let player2 = "";
const gameBoard = [[], [], []];

function play(e) {
  let piece = "";
  let nextPlayer = "";
  let cellIndex = 0;

  if (currentPlayer === "player-1") {
    piece = "X";
    nextPlayer = player2;
  }

  if (currentPlayer === "player-2") {
    piece = "O";
    nextPlayer = player1;
  }

  if (currentPlayer === "cpu-1") {
    piece = "X";
    nextPlayer = player2;
  }

  if (currentPlayer === "cpu-2") {
    piece = "O";
    nextPlayer = player1;
  }

  this.innerText = piece;
  this.classList.add("cell-text");
  currentPlayer = nextPlayer;
  e.target.removeEventListener(e.type, arguments.callee);
  cellIndex = cells.indexOf(this);
  recordMove(cellIndex, piece);
  passTurn();
}

function passTurn() {
  if (currentPlayer === "player-1") {
    turnDisplay.innerText = "Player 1's Turn...";
  }

  if (currentPlayer === "player-2") {
    turnDisplay.innerText = "Player 2's Turn...";
  }

  if (currentPlayer === "cpu-1") {
    turnDisplay.innerText = "CPU 1's Turn...";
  }

  if (currentPlayer === "cpu-2") {
    if (player1 === "player-1") {
      turnDisplay.innerText = "CPU's Turn...";
    } else {
      turnDisplay.innerText = "CPU 2's Turn...";
    }
  }

  displayText.style.display = "flex";
  turnDisplay.classList.add("overlay-content");
  setTimeout(() => {
    closeOverlay(displayText);
  }, 1500);
}

function recordMove(cellIndex, piece) {
  let position;
  if (cellIndex <= 2) {
    gameBoard[0][cellIndex] = piece;
  } else if (cellIndex > 2 && cellIndex <= 5) {
    position = cellIndex % 3;
    gameBoard[1][position] = piece;
  } else {
    position = cellIndex % 3;
    gameBoard[2][position] = piece;
  }
  console.log(gameBoard);
}

function clearGameBoard() {
  for (let cell of gameBoard) {
      cell.length = 0;
  }
}

function startNewGame() {
  currentPlayer = player1;
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].classList.remove("cell-text");
  }
  addCellEventListeners();
  clearGameBoard();
}

function addCellEventListeners() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", play);
  }
}

function selectMode() {
  modes.style.display = "flex";
  for (let btn of modeButtons) {
    btn.classList.add("overlay-content");
  }
}

function closeOverlay(element) {
  element.style.display = "none";
}

newGameButton.addEventListener("click", startNewGame);
selectModeBtn.addEventListener("click", selectMode);
modeButtons[0].addEventListener("click", function () {
  player1 = "player-1";
  player2 = "player-2";
  closeOverlay(modes);
  startNewGame();
});

modeButtons[1].addEventListener("click", function () {
  player1 = "player-1";
  player2 = "cpu-2";
  closeOverlay(modes);
  startNewGame();
});

modeButtons[2].addEventListener("click", function () {
  player1 = "cpu-1";
  player2 = "cpu-2";
  closeOverlay(modes);
  startNewGame();
});

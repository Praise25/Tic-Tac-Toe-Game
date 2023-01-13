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
const gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

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
  let previousPlayer = currentPlayer;
  currentPlayer = nextPlayer;
  e.target.removeEventListener(e.type, arguments.callee);
  cellIndex = cells.indexOf(this);
  recordMove(cellIndex, piece);
  modifyCellsEventListener("remove")
  setTimeout(() => {
    passTurn(previousPlayer);
  }, 300);
}

function passTurn(player) {
  let hasWinner = checkForWinner();
  let hasStalemate = checkForStalemate();
  let delay = 0;

  if (hasWinner) {
    delay = 3000;
    modifyCellsEventListener("remove");

    if (player === "player-1") {
      if (player2 === "cpu-2") {
        turnDisplay.innerText = "Player Wins!!!";
      } else {
        turnDisplay.innerText = "Player 1 Wins!!!";
      }
    }

    if (player === "player-2") {
      turnDisplay.innerText = "Player 2 Wins!!!";
    }

    if (player === "cpu-1") {
      turnDisplay.innerText = "CPU 1 Wins!!!";
    }

    if (player === "cpu-2") {
      if (player1 === "player-1") {
        turnDisplay.innerText = "CPU Wins!!!";
      } else {
        turnDisplay.innerText = "CPU 2 Wins!!!";
      }
    }
  } else if(hasStalemate) {
    delay = 3000;
    turnDisplay.innerText = "Stalemate!!!";
  } else {
    delay = 500;
    modifyCellsEventListener("add")

    if (currentPlayer === "player-1") {
      if (player2 === "cpu-2") {
        turnDisplay.innerText = "Player's Turn...";
      } else {
        turnDisplay.innerText = "Player 1's Turn...";
      }
    }

    if (currentPlayer === "player-2") {
      turnDisplay.innerText = "Player 2's Turn...";
    }

    if (currentPlayer === "cpu-1") {
      turnDisplay.innerText = "CPU 1's Turn...";
      aiMove();
    }

    if (currentPlayer === "cpu-2") {
      if (player1 === "player-1") {
        turnDisplay.innerText = "CPU's Turn...";
      } else {
        turnDisplay.innerText = "CPU 2's Turn...";
      }
      aiMove();
    }
  }

  displayText.style.display = "flex";
  turnDisplay.classList.add("overlay-content");
  setTimeout(() => {
    closeOverlay(displayText);
  }, delay);
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
  // console.log(gameBoard);
}

function checkForWinner() {
  if (
    // check if any row contains 3 of the same piece
    (gameBoard[0][0] !== "" &&
      gameBoard[0][0] === gameBoard[0][1] &&
      gameBoard[0][0] === gameBoard[0][2]) ||
    (gameBoard[1][0] !== "" &&
      gameBoard[1][0] === gameBoard[1][1] &&
      gameBoard[1][0] === gameBoard[1][2]) ||
    (gameBoard[2][0] !== "" &&
      gameBoard[2][0] === gameBoard[2][1] &&
      gameBoard[2][0] === gameBoard[2][2]) ||
    // check if any column contains 3 of the same piece
    (gameBoard[0][0] !== "" &&
      gameBoard[0][0] === gameBoard[1][0] &&
      gameBoard[0][0] === gameBoard[2][0]) ||
    (gameBoard[0][1] !== "" &&
      gameBoard[0][1] === gameBoard[1][1] &&
      gameBoard[0][1] === gameBoard[2][1]) ||
    (gameBoard[0][2] !== "" &&
      gameBoard[0][2] === gameBoard[1][2] &&
      gameBoard[0][2] === gameBoard[2][2]) ||
    // check if any diagonal contains 3 of the same piece
    (gameBoard[0][0] !== "" &&
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[0][0] === gameBoard[2][2]) ||
    (gameBoard[0][2] !== "" &&
      gameBoard[0][2] === gameBoard[1][1] &&
      gameBoard[0][2] === gameBoard[2][0])
  ) {
    return true;
  } else {
    return false;
  }
}

function checkForStalemate() {
  let freeCells = getFreeCells();
  console.log(freeCells);
  if (freeCells.length === 0) {
    return true;
  }
  return false;
}

function getFreeCells() {
  let freeCells = [];
  for (let cell of cells) {
    if (cell.innerText === "") {
      freeCells.push(cell);
    }
  }
  return freeCells;
}

function aiMove() {
  let freeCells = getFreeCells();
  // console.log(freeCells);
  let targetCellIndex = Math.floor(Math.random() * (freeCells.length - 1));
  setTimeout(() => {
    freeCells[targetCellIndex].click();
  }, 3000);
}

function clearGameBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameBoard[i][j] = "";
    }
  }
}

function startNewGame() {
  currentPlayer = player1;
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].classList.remove("cell-text");
  }
  modifyCellsEventListener("add");
  clearGameBoard();

  if (currentPlayer === "cpu-1") {
    aiMove();
  }
}

function modifyCellsEventListener(command) {
  if (command === "add") {
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener("click", play);
    }
  } else if (command === "remove") {
    for (let i = 0; i < cells.length; i++) {
      cells[i].removeEventListener("click", play);
    }
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

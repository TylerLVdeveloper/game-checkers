class PieceCl {
  constructor(startingPosition, assignedPlayer) {
    this.startingPosition = startingPosition;
    this.currentPosition = startingPosition;
    this.assignedPlayer = assignedPlayer;
    this.captured = false;
    this.kingMe = false;
    assignedPlayer === "player1"
      ? (this.enemyPlayer = "player2")
      : (this.enemyPlayer = "player1");
  }

  movePosition(newPosition) {
    console.log(newPosition);
  }
}

// Player 1 Pieces
const playerPiece1 = new PieceCl("1-2", "player1");
const playerPiece2 = new PieceCl("1-4", "player1");
const playerPiece3 = new PieceCl("1-6", "player1");
const playerPiece4 = new PieceCl("1-8", "player1");
const playerPiece5 = new PieceCl("2-1", "player1");
const playerPiece6 = new PieceCl("2-3", "player1");
const playerPiece7 = new PieceCl("2-5", "player1");
const playerPiece8 = new PieceCl("2-7", "player1");
const playerPiece9 = new PieceCl("3-2", "player1");
const playerPiece10 = new PieceCl("3-4", "player1");
const playerPiece11 = new PieceCl("3-6", "player1");
const playerPiece12 = new PieceCl("3-8", "player1");

// Player 2 Pieces
const playerPiece13 = new PieceCl("8-1", "player2");
const playerPiece14 = new PieceCl("8-3", "player2");
const playerPiece15 = new PieceCl("8-5", "player2");
const playerPiece16 = new PieceCl("8-7", "player2");
const playerPiece17 = new PieceCl("7-2", "player2");
const playerPiece18 = new PieceCl("7-4", "player2");
const playerPiece19 = new PieceCl("7-6", "player2");
const playerPiece20 = new PieceCl("7-8", "player2");
const playerPiece21 = new PieceCl("6-1", "player2");
const playerPiece22 = new PieceCl("6-3", "player2");
const playerPiece23 = new PieceCl("6-5", "player2");
const playerPiece24 = new PieceCl("6-7", "player2");

// All Pieces Array
const playerPiecesArray = [
  playerPiece1,
  playerPiece2,
  playerPiece3,
  playerPiece4,
  playerPiece5,
  playerPiece6,
  playerPiece7,
  playerPiece8,
  playerPiece9,
  playerPiece10,
  playerPiece11,
  playerPiece12,
  playerPiece13,
  playerPiece14,
  playerPiece15,
  playerPiece16,
  playerPiece17,
  playerPiece18,
  playerPiece19,
  playerPiece20,
  playerPiece21,
  playerPiece22,
  playerPiece23,
  playerPiece24,
];

console.log(playerPiecesArray);

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
let potentialMove = null;
let potentialMove2 = null;
let takeOpponentPiece,
  takeOpponentPiece2,
  opponentPieceJumped,
  opponentPieceJumped2;
const turnIndicator =
  document.querySelector("#turn_indicator").firstElementChild;
const playerOneIndicator = "X";
const playerTwoIndicator = "O";
let player1Score = 12;
let player2Score = 12;

const boardSpaces = [
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
];

// Generate Game Board
boardSpaces.forEach(function (row, rowIndex) {
  row.forEach(function (space) {
    spaceHTML = `<div class="space" id="${rowIndex + 1}-${space}"></div>`;

    document
      .getElementById(`row${rowIndex + 1}`)
      .insertAdjacentHTML("beforeend", spaceHTML);
    if (
      (space % 2 === 0 && (rowIndex + 1) % 2 !== 0) ||
      (space % 2 !== 0 && (rowIndex + 1) % 2 === 0)
    ) {
      document.getElementById(
        `${rowIndex + 1}-${space}`
      ).style.backgroundColor = "red";
      document
        .getElementById(`${rowIndex + 1}-${space}`)
        .classList.add("active");
    } else {
      document
        .getElementById(`${rowIndex + 1}-${space}`)
        .classList.add("inactive");
    }
  });
});

// Identify all active spaces
const activeSpaces = document.querySelectorAll(".active");

// Identify all starter spaces
activeSpaces.forEach(function (space) {
  const idCopy = space.id.slice().split("");
  if (+idCopy[0] >= 6 || +idCopy[0] <= 3) space.classList.add("starter_space");
});
const starterSpaces = document.querySelectorAll(".starter_space");

// Separate starter spaces into Player 1 or Player 2 classification
starterSpaces.forEach((space) => {
  const idCopy = space.id.slice().split("");
  if (+idCopy[0] >= 6) {
    space.classList.add("player1");
    space.textContent = playerOneIndicator;
  } else if (+idCopy[0] <= 3) {
    space.classList.add("player2");
    space.textContent = playerTwoIndicator;
  }
});

// Set the active player
let activePlayer = "player1";
let enemyPlayer = "player2";
turnIndicator.textContent = `${activePlayer} Go!`;

const board = document.getElementById("board");

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// Game Play Functions
/////////////////////////////////////////////////////////

const resetGlobalData = function () {
  potentialMove = null;
  potentialMove2 = null;
  takeOpponentPiece = false;
  takeOpponentPiece2 = false;
  opponentPieceJumped = null;
  opponentPieceJumped2 = null;
};

const calcMoveSpace = function (enemyPlayer, moveSpace, moveSpaceNextRow) {
  if (
    !moveSpace.classList.contains(activePlayer) &&
    !moveSpace.classList.contains(enemyPlayer)
  ) {
    potentialMove = moveSpace;
    takeOpponentPiece = false;
  } else if (
    !moveSpace.classList.contains(activePlayer) &&
    moveSpace.classList.contains(enemyPlayer) &&
    !moveSpaceNextRow?.classList.contains(activePlayer) &&
    !moveSpaceNextRow?.classList.contains(enemyPlayer)
  ) {
    potentialMove = moveSpaceNextRow;
    takeOpponentPiece = true;
    opponentPieceJumped = moveSpace;
  }
};

const calcMoveSpace2 = function (enemyPlayer, moveSpace2, moveSpace2NextRow) {
  if (
    !moveSpace2.classList.contains(activePlayer) &&
    !moveSpace2.classList.contains(enemyPlayer)
  ) {
    potentialMove2 = moveSpace2;
    takeOpponentPiece2 = false;
  } else if (
    !moveSpace2.classList.contains(activePlayer) &&
    moveSpace2.classList.contains(enemyPlayer) &&
    !moveSpace2NextRow?.classList.contains(activePlayer) &&
    !moveSpace2NextRow?.classList.contains(enemyPlayer)
  ) {
    potentialMove2 = moveSpace2NextRow;
    takeOpponentPiece2 = true;
    opponentPieceJumped2 = moveSpace2;
  }
};

const removeEnemyPiece = function (enemyPlayer) {
  opponentPieceJumped.textContent = "";
  opponentPieceJumped.classList.remove(enemyPlayer);

  if (enemyPlayer === "player1") player1Score--;
  if (enemyPlayer === "player2") player2Score--;
  console.log(player1Score, player2Score);
};

const removeEnemyPiece2 = function (enemyPlayer) {
  opponentPieceJumped2.textContent = "";
  opponentPieceJumped2.classList.remove(enemyPlayer);

  if (enemyPlayer === "player1") player1Score--;
  if (enemyPlayer === "player2") player2Score--;
  console.log(player1Score, player2Score);
};

// Start Game
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
const gamePlayListener = function (event) {
  let idCopy = null;
  let moveSpace = null;
  let moveSpace2 = null;
  let moveSpaceNextRow = null;
  let moveSpace2NextRow = null;
  // Reset Global Variables
  resetGlobalData();

  // Turn indicator
  turnIndicator.textContent = `${activePlayer} Go!`;

  // Store piece selected into variable
  const pieceSelected = event.target;
  console.log(pieceSelected);

  //////////////////////////////////////////////Calculate move spaces
  if (activePlayer === "player2") {
    enemyPlayer = "player1";

    if (pieceSelected.classList.contains(activePlayer)) {
      // Take ID of piece selected and split up into two numbers (Row & Collumn)
      idCopy = pieceSelected.id.slice().split("");

      // 1 Row up Spaces - Normal Move
      moveSpace = document.getElementById(
        `${+idCopy[0] + 1}-${+idCopy[2] - 1}`
      );
      moveSpace2 = document.getElementById(
        `${+idCopy[0] + 1}-${+idCopy[2] + 1}`
      );

      // 2 Rows up Spaces - JUMPING OPPONENT PIECE
      moveSpaceNextRow = document.getElementById(
        `${+idCopy[0] + 2}-${+idCopy[2] - 2}`
      );
      moveSpace2NextRow = document.getElementById(
        `${+idCopy[0] + 2}-${+idCopy[2] + 2}`
      );
    }
  } else if (activePlayer === "player1") {
    enemyPlayer = "player2";

    if (pieceSelected.classList.contains(activePlayer)) {
      // Take ID of piece selected and split up into two numbers (Row & Collumn)
      idCopy = pieceSelected.id.slice().split("");

      // 1 Row up Spaces - Normal Move
      moveSpace = document.getElementById(
        `${+idCopy[0] - 1}-${+idCopy[2] - 1}`
      );
      moveSpace2 = document.getElementById(
        `${+idCopy[0] - 1}-${+idCopy[2] + 1}`
      );

      // 2 Rows up Spaces - JUMPING OPPONENT PIECE
      moveSpaceNextRow = document.getElementById(
        `${+idCopy[0] - 2}-${+idCopy[2] - 2}`
      );
      moveSpace2NextRow = document.getElementById(
        `${+idCopy[0] - 2}-${+idCopy[2] + 2}`
      );
    }
  }

  // Calculate Move Spaces
  if (moveSpace) calcMoveSpace(enemyPlayer, moveSpace, moveSpaceNextRow);
  if (moveSpace2) calcMoveSpace2(enemyPlayer, moveSpace2, moveSpace2NextRow);

  // If there's atleast one possible move, continue...if not, player can redo selection
  if (potentialMove || potentialMove2) {
    pieceSelected.style.border = "1px solid yellow";
  } else {
    return;
  }

  if (potentialMove) potentialMove.style.backgroundColor = "yellow";

  if (potentialMove2) potentialMove2.style.backgroundColor = "yellow";

  ///////////////////////////////////////////////////////////////////////////////////////
  const potentialListener = () => {
    if (activePlayer === "player1")
      potentialMove.textContent = playerOneIndicator;
    if (activePlayer === "player2")
      potentialMove.textContent = playerTwoIndicator;
    potentialMove.classList.add(activePlayer);
    pieceSelected.textContent = "";
    pieceSelected.style.border = "1px solid black";
    pieceSelected.classList.remove(activePlayer);

    potentialMove.style.backgroundColor = "red";

    if (potentialMove2) potentialMove2.style.backgroundColor = "red";

    if (takeOpponentPiece) removeEnemyPiece(enemyPlayer);

    potentialMove?.removeEventListener("click", potentialListener);
    potentialMove2?.removeEventListener("click", potentialListener2);

    activePlayer = enemyPlayer;

    if (player1Score < 1) {
      turnIndicator.textContent = `Player 2 WINS!!!`;
    } else if (player2Score < 1) {
      turnIndicator.textContent = `Player 1 WINS!!!`;
    } else {
      gamePlay();
    }
  };
  potentialMove?.addEventListener("click", potentialListener);
  ///////////////////////////////////////////////////////////////////////////////////////
  const potentialListener2 = () => {
    if (activePlayer === "player1")
      potentialMove2.textContent = playerOneIndicator;
    if (activePlayer === "player2")
      potentialMove2.textContent = playerTwoIndicator;
    potentialMove2.classList.add(activePlayer);
    pieceSelected.textContent = "";
    pieceSelected.style.border = "1px solid black";
    pieceSelected.classList.remove(activePlayer);

    potentialMove2.style.backgroundColor = "red";

    if (potentialMove) potentialMove.style.backgroundColor = "red";

    if (takeOpponentPiece2) removeEnemyPiece2(enemyPlayer);

    potentialMove?.removeEventListener("click", potentialListener);
    potentialMove2?.removeEventListener("click", potentialListener2);

    activePlayer = enemyPlayer;

    if (player1Score < 1) {
      turnIndicator.textContent = `Player 2 WINS!!!`;
    } else if (player2Score < 1) {
      turnIndicator.textContent = `Player 1 WINS!!!`;
    } else {
      gamePlay();
    }
  };
  potentialMove2?.addEventListener("click", potentialListener2);
  ///////////////////////////////////////////////////////////////////////////////////////
  board.removeEventListener("click", gamePlayListener);
};

// Start game
const gamePlay = function () {
  board.addEventListener("click", gamePlayListener);
};

gamePlay();

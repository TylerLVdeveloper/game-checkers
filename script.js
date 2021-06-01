let potentialMove = null;
let potentialMove2 = null;
let takeOpponentPiece,
  takeOpponentPiece2,
  opponentPieceJumped,
  opponentPieceJumped2,
  potentialMoveId,
  potentialMove2Id,
  moveSpaceId,
  moveSpace2Id,
  identifiedPiece,
  capturedPieceId,
  capturedPiece2Id,
  pieceSelected;
let idCopy = null;
let moveSpace = null;
let moveSpace2 = null;
let moveSpaceNextRow = null;
let moveSpace2NextRow = null;
let moveSpaceNextRowId = null;
let moveSpace2NextRowId = null;

const resetGlobalData = function () {
  potentialMove = null;
  potentialMove2 = null;
  takeOpponentPiece = false;
  takeOpponentPiece2 = false;
  opponentPieceJumped = null;
  opponentPieceJumped2 = null;
  potentialMoveId = "";
  potentialMove2Id = "";
  moveSpaceId = "";
  moveSpace2Id = "";
  idCopy = null;
  moveSpace = null;
  moveSpace2 = null;
  moveSpaceNextRow = null;
  moveSpace2NextRow = null;
  moveSpaceNextRowId = null;
  moveSpace2NextRowId = null;
};

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

class PieceCl {
  constructor(startingPosition, assignedPlayer) {
    this.startingPosition = startingPosition;
    this.currentPosition = startingPosition;
    this.assignedPlayer = assignedPlayer;
    this.captured = false;
    this.kingMe = false;
  }

  kingMeIdentifyMoveSpaces() {
    console.log("test");
  }

  calcMoveSpace() {
    if (
      // Check move space for matching ID to any player pieces
      !playerPiecesArray.some((piece) => piece.currentPosition === moveSpaceId)
    ) {
      potentialMoveId = moveSpaceId;
      potentialMove = moveSpace;
      takeOpponentPiece = false;
    } else if (
      playerPiecesArray.some((piece) => {
        return (
          piece.currentPosition === moveSpaceId &&
          piece.assignedPlayer === identifiedPiece.enemyPlayer
        );
      }) &&
      !playerPiecesArray.some(
        (piece) => piece.currentPosition === moveSpaceNextRowId
      )
    ) {
      potentialMoveId = moveSpaceNextRowId;
      potentialMove = moveSpaceNextRow;
      takeOpponentPiece = true;
      capturedPieceId = moveSpaceId;
      opponentPieceJumped = moveSpace;
    }
  }

  calcMoveSpace2() {
    if (
      // Check move space for matching ID to any player pieces
      !playerPiecesArray.some((piece) => piece.currentPosition === moveSpace2Id)
    ) {
      potentialMove2Id = moveSpace2Id;
      potentialMove2 = moveSpace2;
      takeOpponentPiece2 = false;
    } else if (
      playerPiecesArray.some((piece) => {
        return (
          piece.currentPosition === moveSpace2Id &&
          piece.assignedPlayer === identifiedPiece.enemyPlayer
        );
      }) &&
      !playerPiecesArray.some(
        (piece) => piece.currentPosition === moveSpace2NextRowId
      )
    ) {
      potentialMove2Id = moveSpace2NextRowId;
      potentialMove2 = moveSpace2NextRow;
      takeOpponentPiece2 = true;
      capturedPiece2Id = moveSpace2Id;
      opponentPieceJumped2 = moveSpace2;
    }
  }

  moveToSpace() {
    // Change piece's current position to new position
    identifiedPiece.currentPosition = potentialMoveId;

    // Move Piece image to new position
    potentialMove.textContent = identifiedPiece.pieceImg;

    // Remove piece image from previous location
    pieceSelected.textContent = "";

    // Change styles back to original state
    pieceSelected.style.border = "1px solid black";
    potentialMove.style.backgroundColor = "red";

    // If there was a 2nd move option, change style back to original state
    if (potentialMove2) potentialMove2.style.backgroundColor = "red";

    if (takeOpponentPiece) removeEnemyPiece(enemyPlayer);

    // Remove event listeners from both move options
    potentialMove?.removeEventListener("click", identifiedPiece.moveToSpace);
    potentialMove2?.removeEventListener("click", identifiedPiece.moveToSpace2);

    // Switch active player - NEXT PLAYER'S TURN
    activePlayer = identifiedPiece.enemyPlayer;

    // Check for winner (does either player have no more game pieces?)
    checkForWinner();
  }

  moveToSpace2() {
    // Change piece's current position to new position
    identifiedPiece.currentPosition = potentialMove2Id;

    // Move Piece image to new position
    potentialMove2.textContent = identifiedPiece.pieceImg;

    // Remove piece image from previous location
    pieceSelected.textContent = "";

    // Change styles back to original state
    pieceSelected.style.border = "1px solid black";
    potentialMove2.style.backgroundColor = "red";

    // If there was a 2nd move option, change style back to original state
    if (potentialMove) potentialMove.style.backgroundColor = "red";

    if (takeOpponentPiece2) removeEnemyPiece2(enemyPlayer);

    // Remove event listeners from both move options
    potentialMove?.removeEventListener("click", identifiedPiece.moveToSpace);
    potentialMove2?.removeEventListener("click", identifiedPiece.moveToSpace2);

    // Switch active player - NEXT PLAYER'S TURN
    activePlayer = identifiedPiece.enemyPlayer;

    // Check for winner (does either player have no more game pieces?)
    checkForWinner();
  }
}

class Player1Cl extends PieceCl {
  constructor(startingPosition, assignedPlayer) {
    super(startingPosition, assignedPlayer);
    this.enemyPlayer = "player2";
    this.pieceImg = "X";
  }

  identifyMoveSpaces(pieceSelected) {
    // Take ID of piece selected and split up into two numbers (Row & Collumn)
    idCopy = pieceSelected.id.slice().split("");

    // 1 Row up Spaces - Normal Move
    moveSpaceId = `${+idCopy[0] + 1}-${+idCopy[2] - 1}`;
    moveSpace = document.getElementById(`${+idCopy[0] + 1}-${+idCopy[2] - 1}`);

    moveSpace2Id = `${+idCopy[0] + 1}-${+idCopy[2] + 1}`;
    moveSpace2 = document.getElementById(`${+idCopy[0] + 1}-${+idCopy[2] + 1}`);

    ///////////////////////////////////////////////////////////////

    // 2 Rows up Spaces - JUMPING OPPONENT PIECE
    moveSpaceNextRowId = `${+idCopy[0] + 2}-${+idCopy[2] - 2}`;

    moveSpace2NextRowId = `${+idCopy[0] + 2}-${+idCopy[2] + 2}`;

    moveSpaceNextRow = document.getElementById(
      `${+idCopy[0] + 2}-${+idCopy[2] - 2}`
    );
    moveSpace2NextRow = document.getElementById(
      `${+idCopy[0] + 2}-${+idCopy[2] + 2}`
    );
  }
}

class Player2Cl extends PieceCl {
  constructor(startingPosition, assignedPlayer) {
    super(startingPosition, assignedPlayer);
    this.enemyPlayer = "player1";
    this.pieceImg = "O";
  }

  identifyMoveSpaces(pieceSelected) {
    // Take ID of piece selected and split up into two numbers (Row & Collumn)
    idCopy = pieceSelected.id.slice().split("");

    // 1 Row up Spaces - Normal Move
    moveSpaceId = `${+idCopy[0] - 1}-${+idCopy[2] - 1}`;
    moveSpace = document.getElementById(`${+idCopy[0] - 1}-${+idCopy[2] - 1}`);

    moveSpace2Id = `${+idCopy[0] - 1}-${+idCopy[2] + 1}`;
    moveSpace2 = document.getElementById(`${+idCopy[0] - 1}-${+idCopy[2] + 1}`);

    ///////////////////////////////////////////////////////////////

    // 2 Rows up Spaces - JUMPING OPPONENT PIECE
    moveSpaceNextRowId = `${+idCopy[0] - 2}-${+idCopy[2] - 2}`;

    moveSpace2NextRowId = `${+idCopy[0] - 2}-${+idCopy[2] + 2}`;

    moveSpaceNextRow = document.getElementById(
      `${+idCopy[0] - 2}-${+idCopy[2] - 2}`
    );
    moveSpace2NextRow = document.getElementById(
      `${+idCopy[0] - 2}-${+idCopy[2] + 2}`
    );
  }
}

// Player 1 Pieces
const playerPiece1 = new Player1Cl("1-2", "player1");
const playerPiece2 = new Player1Cl("1-4", "player1");
const playerPiece3 = new Player1Cl("1-6", "player1");
const playerPiece4 = new Player1Cl("1-8", "player1");
const playerPiece5 = new Player1Cl("2-1", "player1");
const playerPiece6 = new Player1Cl("2-3", "player1");
const playerPiece7 = new Player1Cl("2-5", "player1");
const playerPiece8 = new Player1Cl("2-7", "player1");
const playerPiece9 = new Player1Cl("3-2", "player1");
const playerPiece10 = new Player1Cl("3-4", "player1");
const playerPiece11 = new Player1Cl("3-6", "player1");
const playerPiece12 = new Player1Cl("3-8", "player1");

// Player 2 Pieces
const playerPiece13 = new Player2Cl("8-1", "player2");
const playerPiece14 = new Player2Cl("8-3", "player2");
const playerPiece15 = new Player2Cl("8-5", "player2");
const playerPiece16 = new Player2Cl("8-7", "player2");
const playerPiece17 = new Player2Cl("7-2", "player2");
const playerPiece18 = new Player2Cl("7-4", "player2");
const playerPiece19 = new Player2Cl("7-6", "player2");
const playerPiece20 = new Player2Cl("7-8", "player2");
const playerPiece21 = new Player2Cl("6-1", "player2");
const playerPiece22 = new Player2Cl("6-3", "player2");
const playerPiece23 = new Player2Cl("6-5", "player2");
const playerPiece24 = new Player2Cl("6-7", "player2");

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
const turnIndicator =
  document.querySelector("#turn_indicator").firstElementChild;
const playerOneIndicator = "O";
const playerTwoIndicator = "X";
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
    space.textContent = playerPiece24.pieceImg;
  } else if (+idCopy[0] <= 3) {
    space.textContent = playerPiece1.pieceImg;
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

const removeEnemyPiece = function (enemyPlayer) {
  opponentPieceJumped.textContent = "";
  const capturedPiece = playerPiecesArray.find(
    (piece) => piece.currentPosition === capturedPieceId
  );
  capturedPiece.currentPosition = "";
  capturedPiece.captured = true;

  if (enemyPlayer === "player1") player1Score--;
  if (enemyPlayer === "player2") player2Score--;
  console.log(player1Score, player2Score);
};

const removeEnemyPiece2 = function (enemyPlayer) {
  opponentPieceJumped2.textContent = "";
  const capturedPiece2 = playerPiecesArray.find(
    (piece) => piece.currentPosition === capturedPiece2Id
  );
  capturedPiece2.currentPosition = "";
  capturedPiece2.captured = true;

  if (enemyPlayer === "player1") player1Score--;
  if (enemyPlayer === "player2") player2Score--;
  console.log(player1Score, player2Score);
};

const checkForWinner = () => {
  if (player1Score < 1) {
    turnIndicator.textContent = `Player 2 WINS!!!`;
  } else if (player2Score < 1) {
    turnIndicator.textContent = `Player 1 WINS!!!`;
  } else {
    // If no winner, CONTINUE GAME
    gamePlay();
  }
};

// Start Game
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
const gamePlayListener = function (event) {
  // Reset Global Variables
  resetGlobalData();

  // Turn indicator
  turnIndicator.textContent = `${activePlayer} Go!`;

  // Store piece selected into variable
  pieceSelected = event.target;
  console.log(pieceSelected);

  // Use position selected on board to located piece assigned to that location ID
  identifiedPiece = playerPiecesArray.find(
    (piece) => piece.currentPosition === pieceSelected.id
  );

  //Identify move spaces
  if (identifiedPiece?.assignedPlayer === activePlayer) {
    identifiedPiece.identifyMoveSpaces(pieceSelected);
  }

  // Calculate Move Spaces
  if (moveSpace) identifiedPiece.calcMoveSpace();
  if (moveSpace2) identifiedPiece.calcMoveSpace2();

  // If there's atleast one possible move, continue...if not, player can redo selection
  if (potentialMove || potentialMove2) {
    pieceSelected.style.border = "1px solid yellow";
  } else {
    return;
  }

  if (potentialMove) potentialMove.style.backgroundColor = "yellow";

  if (potentialMove2) potentialMove2.style.backgroundColor = "yellow";

  // Event Listeners for moving spaces
  potentialMove?.addEventListener("click", identifiedPiece.moveToSpace);

  potentialMove2?.addEventListener("click", identifiedPiece.moveToSpace2);
  ///////////////////////////////////////////////////////////////////////////////////////
  board.removeEventListener("click", gamePlayListener);
};

// Start game
const gamePlay = function () {
  board.addEventListener("click", gamePlayListener);
};

gamePlay();

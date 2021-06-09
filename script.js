let potentialMove = null;
let potentialMove2 = null;
let potentialMove3 = null;
let potentialMove4 = null;
let takeOpponentPiece,
  takeOpponentPiece2,
  takeOpponentPiece3,
  takeOpponentPiece4,
  opponentPieceJumped,
  opponentPieceJumped2,
  opponentPieceJumped3,
  opponentPieceJumped4,
  potentialMoveId,
  potentialMove2Id,
  potentialMove3Id,
  potentialMove4Id,
  moveSpaceId,
  moveSpace2Id,
  moveSpace3Id,
  moveSpace4Id,
  identifiedPiece,
  capturedPieceId,
  capturedPiece2Id,
  capturedPiece3Id,
  capturedPiece4Id,
  pieceSelected;
let idCopy = null;
let moveSpace = null;
let moveSpace2 = null;
let moveSpace3 = null;
let moveSpace4 = null;
let moveSpaceNextRow = null;
let moveSpace2NextRow = null;
let moveSpace3NextRow = null;
let moveSpace4NextRow = null;
let moveSpaceNextRowId = null;
let moveSpace2NextRowId = null;
let moveSpace3NextRowId = null;
let moveSpace4NextRowId = null;
let justJumped = false;

const resetGlobalData = function () {
  potentialMove = null;
  potentialMove2 = null;
  potentialMove3 = null;
  potentialMove4 = null;
  takeOpponentPiece = false;
  takeOpponentPiece2 = false;
  takeOpponentPiece3 = false;
  takeOpponentPiece4 = false;
  opponentPieceJumped = null;
  opponentPieceJumped2 = null;
  opponentPieceJumped3 = null;
  opponentPieceJumped4 = null;
  potentialMoveId = "";
  potentialMove2Id = "";
  potentialMove3Id = "";
  potentialMove4Id = "";
  moveSpaceId = "";
  moveSpace2Id = "";
  moveSpace3Id = "";
  moveSpace4Id = "";
  idCopy = null;
  moveSpace = null;
  moveSpace2 = null;
  moveSpace3 = null;
  moveSpace4 = null;
  moveSpaceNextRow = null;
  moveSpace2NextRow = null;
  moveSpace3NextRow = null;
  moveSpace4NextRow = null;
  moveSpaceNextRowId = null;
  moveSpace2NextRowId = null;
  moveSpace3NextRowId = null;
  moveSpace4NextRowId = null;
};

const activeSpaceColor = "grey";

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

  identifyKingMoveSpaces() {
    idCopy = identifiedPiece.currentPosition.slice().split("");

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
    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    // 1 Row up Spaces - Normal Move
    moveSpace3Id = `${+idCopy[0] - 1}-${+idCopy[2] - 1}`;
    moveSpace3 = document.getElementById(`${+idCopy[0] - 1}-${+idCopy[2] - 1}`);

    moveSpace4Id = `${+idCopy[0] - 1}-${+idCopy[2] + 1}`;
    moveSpace4 = document.getElementById(`${+idCopy[0] - 1}-${+idCopy[2] + 1}`);

    ///////////////////////////////////////////////////////////////

    // 2 Rows up Spaces - JUMPING OPPONENT PIECE
    moveSpace3NextRowId = `${+idCopy[0] - 2}-${+idCopy[2] - 2}`;

    moveSpace4NextRowId = `${+idCopy[0] - 2}-${+idCopy[2] + 2}`;

    moveSpace3NextRow = document.getElementById(
      `${+idCopy[0] - 2}-${+idCopy[2] - 2}`
    );
    moveSpace4NextRow = document.getElementById(
      `${+idCopy[0] - 2}-${+idCopy[2] + 2}`
    );
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

  calcMoveSpace3() {
    if (
      // Check move space for matching ID to any player pieces
      !playerPiecesArray.some((piece) => piece.currentPosition === moveSpace3Id)
    ) {
      potentialMove3Id = moveSpace3Id;
      potentialMove3 = moveSpace3;
      takeOpponentPiece3 = false;
    } else if (
      playerPiecesArray.some((piece) => {
        return (
          piece.currentPosition === moveSpace3Id &&
          piece.assignedPlayer === identifiedPiece.enemyPlayer
        );
      }) &&
      !playerPiecesArray.some(
        (piece) => piece.currentPosition === moveSpace3NextRowId
      )
    ) {
      potentialMove3Id = moveSpace3NextRowId;
      potentialMove3 = moveSpace3NextRow;
      takeOpponentPiece3 = true;
      capturedPiece3Id = moveSpace3Id;
      opponentPieceJumped3 = moveSpace3;
    }
  }

  calcMoveSpace4() {
    if (
      // Check move space for matching ID to any player pieces
      !playerPiecesArray.some((piece) => piece.currentPosition === moveSpace4Id)
    ) {
      potentialMove4Id = moveSpace4Id;
      potentialMove4 = moveSpace4;
      takeOpponentPiece4 = false;
    } else if (
      playerPiecesArray.some((piece) => {
        return (
          piece.currentPosition === moveSpace4Id &&
          piece.assignedPlayer === identifiedPiece.enemyPlayer
        );
      }) &&
      !playerPiecesArray.some(
        (piece) => piece.currentPosition === moveSpace4NextRowId
      )
    ) {
      potentialMove4Id = moveSpace4NextRowId;
      potentialMove4 = moveSpace4NextRow;
      takeOpponentPiece4 = true;
      capturedPiece4Id = moveSpace4Id;
      opponentPieceJumped4 = moveSpace4;
    }
  }

  moveToSpace() {
    // Remove piece from prev location
    document.getElementById(`${identifiedPiece.currentPosition}`).textContent =
      "";
    // Change piece's current position to new position
    identifiedPiece.currentPosition = potentialMoveId;

    // Check for King Me after piece has moved
    identifiedPiece.checkForKingMe();

    // Move Piece image to new position
    potentialMove.insertAdjacentHTML("beforeend", identifiedPiece.pieceImg);

    // Change styles back to original state
    potentialMove.style.backgroundColor = activeSpaceColor;

    // If there were other moveoptions, change style back to original state
    if (potentialMove2) potentialMove2.style.backgroundColor = activeSpaceColor;
    if (potentialMove3) potentialMove3.style.backgroundColor = activeSpaceColor;
    if (potentialMove4) potentialMove4.style.backgroundColor = activeSpaceColor;

    if (takeOpponentPiece) removeEnemyPiece();

    // Remove event listeners from all move options
    potentialMove?.removeEventListener("click", identifiedPiece.moveToSpace);
    potentialMove2?.removeEventListener("click", identifiedPiece.moveToSpace2);
    potentialMove3?.removeEventListener("click", identifiedPiece.moveToSpace3);
    potentialMove4?.removeEventListener("click", identifiedPiece.moveToSpace4);
    console.log(identifiedPiece.kingMe);

    doubleJumpLogic();
  }

  moveToSpace2() {
    // Remove piece from prev location
    document.getElementById(`${identifiedPiece.currentPosition}`).textContent =
      "";
    // Change piece's current position to new position
    identifiedPiece.currentPosition = potentialMove2Id;

    // Check for King Me after piece has moved
    identifiedPiece.checkForKingMe();

    // Move Piece image to new position
    potentialMove2.insertAdjacentHTML("beforeend", identifiedPiece.pieceImg);

    // Change styles back to original state
    potentialMove2.style.backgroundColor = activeSpaceColor;

    // If there were other moveoptions, change style back to original state
    if (potentialMove) potentialMove.style.backgroundColor = activeSpaceColor;
    if (potentialMove3) potentialMove3.style.backgroundColor = activeSpaceColor;
    if (potentialMove4) potentialMove4.style.backgroundColor = activeSpaceColor;

    if (takeOpponentPiece2) removeEnemyPiece2();

    // Remove event listeners from all move options
    potentialMove?.removeEventListener("click", identifiedPiece.moveToSpace);
    potentialMove2?.removeEventListener("click", identifiedPiece.moveToSpace2);
    potentialMove3?.removeEventListener("click", identifiedPiece.moveToSpace3);
    potentialMove4?.removeEventListener("click", identifiedPiece.moveToSpace4);
    console.log(identifiedPiece.kingMe);

    doubleJumpLogic();
  }

  moveToSpace3() {
    // Remove piece from prev location
    document.getElementById(`${identifiedPiece.currentPosition}`).textContent =
      "";
    // Change piece's current position to new position
    identifiedPiece.currentPosition = potentialMove3Id;

    // Move Piece image to new position
    potentialMove3.insertAdjacentHTML("beforeend", identifiedPiece.pieceImg);

    // Change styles back to original state
    potentialMove3.style.backgroundColor = activeSpaceColor;

    // If there were other moveoptions, change style back to original state
    if (potentialMove) potentialMove.style.backgroundColor = activeSpaceColor;
    if (potentialMove2) potentialMove2.style.backgroundColor = activeSpaceColor;
    if (potentialMove4) potentialMove4.style.backgroundColor = activeSpaceColor;

    if (takeOpponentPiece3) removeEnemyPiece3();

    // Remove event listeners from all move options
    potentialMove?.removeEventListener("click", identifiedPiece.moveToSpace);
    potentialMove2?.removeEventListener("click", identifiedPiece.moveToSpace2);
    potentialMove3?.removeEventListener("click", identifiedPiece.moveToSpace3);
    potentialMove4?.removeEventListener("click", identifiedPiece.moveToSpace4);
    console.log(identifiedPiece.kingMe);

    doubleJumpLogic();
  }

  moveToSpace4() {
    // Remove piece from prev location
    document.getElementById(`${identifiedPiece.currentPosition}`).textContent =
      "";
    // Change piece's current position to new position
    identifiedPiece.currentPosition = potentialMove4Id;

    // Move Piece image to new position
    potentialMove4.insertAdjacentHTML("beforeend", identifiedPiece.pieceImg);

    // Change styles back to original state
    potentialMove4.style.backgroundColor = activeSpaceColor;

    // If there were other moveoptions, change style back to original state
    if (potentialMove) potentialMove.style.backgroundColor = activeSpaceColor;
    if (potentialMove2) potentialMove2.style.backgroundColor = activeSpaceColor;
    if (potentialMove3) potentialMove3.style.backgroundColor = activeSpaceColor;

    if (takeOpponentPiece4) removeEnemyPiece4();

    // Remove event listeners from all move options
    potentialMove?.removeEventListener("click", identifiedPiece.moveToSpace);
    potentialMove2?.removeEventListener("click", identifiedPiece.moveToSpace2);
    potentialMove3?.removeEventListener("click", identifiedPiece.moveToSpace3);
    potentialMove4?.removeEventListener("click", identifiedPiece.moveToSpace4);
    console.log(identifiedPiece.kingMe);

    doubleJumpLogic();
  }
}

class Player1Cl extends PieceCl {
  constructor(startingPosition, assignedPlayer) {
    super(startingPosition, assignedPlayer);
    this.enemyPlayer = "player2";
    this.kingMe = false;
    this.pieceImg = '<img src="redPiece.png" class="pieceImg">';
    this.kingPieceImg = '<img src="kingRedPiece.png" class="pieceImg">';
  }

  identifyMoveSpaces() {
    if (this.kingMe) {
      this.identifyKingMoveSpaces();
    } else {
      // Take ID of piece selected and split up into two numbers (Row & Collumn)
      idCopy = identifiedPiece.currentPosition.slice().split("");

      // 1 Row up Spaces - Normal Move
      moveSpaceId = `${+idCopy[0] + 1}-${+idCopy[2] - 1}`;
      moveSpace = document.getElementById(
        `${+idCopy[0] + 1}-${+idCopy[2] - 1}`
      );

      moveSpace2Id = `${+idCopy[0] + 1}-${+idCopy[2] + 1}`;
      moveSpace2 = document.getElementById(
        `${+idCopy[0] + 1}-${+idCopy[2] + 1}`
      );

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

  checkForKingMe() {
    if (this.currentPosition.slice().split("")[0] == 8) {
      this.kingMe = true;
      this.pieceImg = this.kingPieceImg;
    }
  }
}

class Player2Cl extends PieceCl {
  constructor(startingPosition, assignedPlayer) {
    super(startingPosition, assignedPlayer);
    this.enemyPlayer = "player1";
    this.pieceImg = '<img src="blackPiece.png" class="pieceImg">';
    this.kingPieceImg = '<img src="kingBlackPiece.png" class="pieceImg">';
  }

  identifyMoveSpaces() {
    if (this.kingMe) {
      this.identifyKingMoveSpaces();
    } else {
      // Take ID of piece selected and split up into two numbers (Row & Collumn)
      idCopy = identifiedPiece.currentPosition.slice().split("");

      // 1 Row up Spaces - Normal Move
      moveSpaceId = `${+idCopy[0] - 1}-${+idCopy[2] - 1}`;
      moveSpace = document.getElementById(
        `${+idCopy[0] - 1}-${+idCopy[2] - 1}`
      );

      moveSpace2Id = `${+idCopy[0] - 1}-${+idCopy[2] + 1}`;
      moveSpace2 = document.getElementById(
        `${+idCopy[0] - 1}-${+idCopy[2] + 1}`
      );

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

  checkForKingMe() {
    if (this.currentPosition.slice().split("")[0] == 1) {
      this.kingMe = true;
      this.pieceImg = this.kingPieceImg;
    }
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

    document.getElementById("board").insertAdjacentHTML("beforeend", spaceHTML);
    if (
      (space % 2 === 0 && (rowIndex + 1) % 2 !== 0) ||
      (space % 2 !== 0 && (rowIndex + 1) % 2 === 0)
    ) {
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
    space.insertAdjacentHTML("beforeend", playerPiece24.pieceImg);
  } else if (+idCopy[0] <= 3) {
    space.insertAdjacentHTML("beforeend", playerPiece1.pieceImg);
  }
});

// Set the active player
let activePlayer = "player1";
let enemyPlayer = "player2";

const board = document.getElementById("board");

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// Game Play Functions
/////////////////////////////////////////////////////////

const removeEnemyPiece = function () {
  opponentPieceJumped.textContent = "";
  const capturedPiece = playerPiecesArray.find(
    (piece) => piece.currentPosition === capturedPieceId
  );
  capturedPiece.currentPosition = "";
  capturedPiece.captured = true;
  justJumped = true;

  if (capturedPiece.assignedPlayer === "player1") player1Score--;
  if (capturedPiece.assignedPlayer === "player2") player2Score--;
  console.log(
    `Player 1 Score: ${player1Score}, Player 2 Score: ${player2Score}`
  );
};

const removeEnemyPiece2 = function () {
  opponentPieceJumped2.textContent = "";
  const capturedPiece2 = playerPiecesArray.find(
    (piece) => piece.currentPosition === capturedPiece2Id
  );
  capturedPiece2.currentPosition = "";
  capturedPiece2.captured = true;
  justJumped = true;

  if (capturedPiece2.assignedPlayer === "player1") player1Score--;
  if (capturedPiece2.assignedPlayer === "player2") player2Score--;
  console.log(
    `Player 1 Score: ${player1Score}, Player 2 Score: ${player2Score}`
  );
};

const removeEnemyPiece3 = function () {
  opponentPieceJumped3.textContent = "";
  const capturedPiece3 = playerPiecesArray.find(
    (piece) => piece.currentPosition === capturedPiece3Id
  );
  capturedPiece3.currentPosition = "";
  capturedPiece3.captured = true;
  justJumped = true;

  if (capturedPiece3.assignedPlayer === "player1") player1Score--;
  if (capturedPiece3.assignedPlayer === "player2") player2Score--;
  console.log(
    `Player 1 Score: ${player1Score}, Player 2 Score: ${player2Score}`
  );
};

const removeEnemyPiece4 = function () {
  opponentPieceJumped4.textContent = "";
  const capturedPiece4 = playerPiecesArray.find(
    (piece) => piece.currentPosition === capturedPiece4Id
  );
  capturedPiece4.currentPosition = "";
  capturedPiece4.captured = true;
  justJumped = true;

  if (capturedPiece4.assignedPlayer === "player1") player1Score--;
  if (capturedPiece4.assignedPlayer === "player2") player2Score--;
  console.log(
    `Player 1 Score: ${player1Score}, Player 2 Score: ${player2Score}`
  );
};

const checkForWinner = () => {
  // if (player1Score < 1) {
  //   turnIndicator.textContent = `Player 2 WINS!!!`;
  // } else if (player2Score < 1) {
  //   turnIndicator.textContent = `Player 1 WINS!!!`;
  // } else {
  //   // If no winner, CONTINUE GAME
  gamePlay();
  // }
};

const doubleJumpLogic = function () {
  resetGlobalData();

  identifiedPiece.identifyMoveSpaces();

  // Calculate Move Spaces
  if (moveSpace) identifiedPiece.calcMoveSpace();
  if (moveSpace2) identifiedPiece.calcMoveSpace2();
  if (moveSpace3) identifiedPiece.calcMoveSpace3();
  if (moveSpace4) identifiedPiece.calcMoveSpace4();

  // If there's atleast one possible move, continue...if not, player can redo selection
  if (
    (!(potentialMove && takeOpponentPiece) &&
      !(potentialMove2 && takeOpponentPiece2) &&
      !(potentialMove3 && takeOpponentPiece3) &&
      !(potentialMove4 && takeOpponentPiece4)) ||
    !justJumped
  ) {
    // Switch active player - NEXT PLAYER'S TURN
    activePlayer = identifiedPiece.enemyPlayer;

    // Check for winner (does either player have no more game pieces?)
    checkForWinner();
  } else {
    if (potentialMove && takeOpponentPiece)
      potentialMove.style.backgroundColor = "yellow";
    if (potentialMove2 && takeOpponentPiece2)
      potentialMove2.style.backgroundColor = "yellow";
    if (potentialMove3 && takeOpponentPiece3)
      potentialMove3.style.backgroundColor = "yellow";
    if (potentialMove4 && takeOpponentPiece4)
      potentialMove4.style.backgroundColor = "yellow";

    // Event Listeners for moving spaces
    potentialMove?.addEventListener("click", identifiedPiece.moveToSpace);
    potentialMove2?.addEventListener("click", identifiedPiece.moveToSpace2);
    potentialMove3?.addEventListener("click", identifiedPiece.moveToSpace3);
    potentialMove4?.addEventListener("click", identifiedPiece.moveToSpace4);
  }
};

// Start Game
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
const gamePlayListener = function (event) {
  // Reset Global Variables
  resetGlobalData();
  justJumped = false;

  // Store piece selected into variable
  if (event.target.classList.contains("pieceImg")) {
    pieceSelected = event.target.parentElement;
  } else {
    pieceSelected = event.target;
  }
  console.log(pieceSelected);

  // Use position selected on board to located piece assigned to that location ID
  identifiedPiece = playerPiecesArray.find(
    (piece) => piece.currentPosition === pieceSelected.id
  );

  //Identify move spaces
  if (identifiedPiece?.assignedPlayer === activePlayer) {
    identifiedPiece.identifyMoveSpaces();
  }

  // Calculate Move Spaces
  if (moveSpace) identifiedPiece.calcMoveSpace();
  if (moveSpace2) identifiedPiece.calcMoveSpace2();
  if (moveSpace3) identifiedPiece.calcMoveSpace3();
  if (moveSpace4) identifiedPiece.calcMoveSpace4();

  // If there's atleast one possible move, continue...if not, player can redo selection
  if (!potentialMove && !potentialMove2 && !potentialMove3 && !potentialMove4) {
    return;
  }

  if (potentialMove) potentialMove.style.backgroundColor = "yellow";
  if (potentialMove2) potentialMove2.style.backgroundColor = "yellow";
  if (potentialMove3) potentialMove3.style.backgroundColor = "yellow";
  if (potentialMove4) potentialMove4.style.backgroundColor = "yellow";

  // Event Listeners for moving spaces
  potentialMove?.addEventListener("click", identifiedPiece.moveToSpace);
  potentialMove2?.addEventListener("click", identifiedPiece.moveToSpace2);
  potentialMove3?.addEventListener("click", identifiedPiece.moveToSpace3);
  potentialMove4?.addEventListener("click", identifiedPiece.moveToSpace4);
  ///////////////////////////////////////////////////////////////////////////////////////
  board.removeEventListener("click", gamePlayListener);
};

// Start game
const gamePlay = function () {
  board.addEventListener("click", gamePlayListener);
};

gamePlay();


var squaresIDs = new Array(8);
var boardPieces = new Array(8);
var attackedWhitePieces = [];
var attackedBlackPieces = [];
var currentTurn = 0;
var isSinglePlayer = true; // 2 players or 1 (face the computer)
var difficultyDepth = 3; // for AI
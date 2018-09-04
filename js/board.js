var squaresIDs = new Array(8);
var boardPieces = new Array(8);
(function initBoard(){
    
    var board = document.getElementById('chessBoard');
    var isWhite = true;

    var attackedWhitePieces = [];
    var attackedBlackPieces = [];

    //draw squares
    for(let i = 0; i < 8; i++){
        squaresIDs[i] = new Array(8);
        boardPieces[i] = new Array(8);

        let row = String.fromCharCode('A'.charCodeAt() + i);

        for(let j = 0; j < 8; j++){
            let col = String(j);
            squaresIDs[i][j] = row + col;
            boardPieces[i][j] = null;

            square = document.createElement('div');
            square.id = squaresIDs[i][j];

            if(isWhite)
                square.classList.add('square', 'white');
            else
                square.classList.add('square', 'black');
            
            // console.log('row: ' + row + ' col: ' + col + ' ' + squaresIDs[i][j]);
            board.appendChild(square);
            isWhite = !isWhite;
        }
        isWhite = !isWhite;
    }

})();
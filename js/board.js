
(function initBoard(){
    
    var board = document.getElementById('chessBoard');
    var isWhite = true;

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
    
    // Chess pieces locations
    for(let i = 0 ; i < 8; i++){
        boardPieces[6][i] = new Pawn(6, i, ColorsEnum.WHITE);
        boardPieces[1][i] = new Pawn(1, i, ColorsEnum.BLACK);
    }
    // white player starts
    Turn = ColorsEnum.WHITE;


    function render(){
        console.log('Rendering');
    }


    // draw Pieces
    for(let i = 0; i < 8; i++){
        var whiteImage = document.createElement('img');
        whiteImage.src = boardPieces[6][i].image;

        var imageDiv = document.getElementById(boardPieces[6][i].getPieceDivID());

        imageDiv.addEventListener('click', handleSelectedDiv);

        imageDiv.appendChild(whiteImage);

    }
    render();

})(this);

// var piece = new King(2, 3, ColorsEnum.WHITE);

// var moves = piece.getValidMoves(boardPieces);

// for(let i = 0; i < moves.length; i++){
//     console.log(moves[i].to[0] + " " + moves[i].to[1]);
//     if(moves[i].attack)
//         console.log('Attack');
// }

this.render();
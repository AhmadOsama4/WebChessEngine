(function initBoard(){
    var board = document.getElementById('chessBoard');
    var isWhite = true;
    var squaresIDs = new Array(8);
    //draw squares
    for(var i = 0; i < 8; i++){
        squaresIDs[i] = new Array(8);
        var row = String.fromCharCode('A'.charCodeAt() + i);

        for(var j = 0; j < 8; j++){
            var col = String(j);
            squaresIDs[i][j] = row + col;

            square = document.createElement('div');
            square.id = squaresIDs[i][j];

            if(isWhite)
                square.classList.add('square', 'white');
            else
                square.classList.add('square', 'black');
            
            console.log('row: ' + row + ' col: ' + col + ' ' + squaresIDs[i][j]);
            board.appendChild(square);
            isWhite = !isWhite;
        }
        isWhite = !isWhite;
    }

})();
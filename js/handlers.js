
var selectedDiv = null;
var selectedPiece = null;
var selectedPieceValidMoves = {};
var Turn;

// get the position of the div from its id
function getDivPosition(id){
    let row = id[0].charCodeAt(0) - 'A'.charCodeAt(0);
    let col = parseInt(id[1]);

    return [row, col];
}

function getDivID(row, col){
    let r = String.fromCharCode('A'.charCodeAt() + row);
    let c = String(col);

    id = r + c;

    return id;
}

function checkMoveValidity(currentBoard, move){
    let allies = [],
        allyKing;

    let enemies = [];
    // perform move
    move.piece.movePiece(move, currentBoard);
    
    // get an array of pieces of each color
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(currentBoard[i][j] === null)
                continue;
            
            if(currentBoard[i][j].color === move.piece.color){ // ally
                if(currentBoard[i][j].type === PiecesEnum.KING)
                    allyKing = currentBoard[i][j];
                else
                    allies.push(currentBoard[i][j]);
            }
            else{ // enemy
                if(currentBoard[i][j].type === PiecesEnum.KING)
                    enemyKing = currentBoard[i][j];
                else
                    enemies.push(currentBoard[i][j]);
            }
        }
    }
    // check if my king will be under attack after this move
    enemies.forEach(function(enemy){
        let validMoves = enemy.getValidMoves(currentBoard);

        validMoves.forEach(function(move){
            if(move.to[0] === allyKing.row && move.to[1] === allyKing.col){
                move.piece.undoMove(move, currentBoard);
                return false;
            }
        });
    });
    move.piece.undoMove(move, currentBoard);

    return true;
}

function removeSuggestedMoves(){
    for(divID in selectedPieceValidMoves){
        let div = document.getElementById(divID);
        div.classList.remove('suggestedMove');
    }
    selectedPieceValidMoves = {};
    selectedPiece = null;
}

function handleSelectedDiv(){
    divPosition = getDivPosition(this.id);
    let row = divPosition[0];
    let col = divPosition[1];

    console.log('Selected div ID ' + this.id);
    // click on square with no pieces selected
    if(selectedPiece === null && boardPieces[row][col] === null)
        return;
    
    // no piece selected and wrong turn
    if(selectedPiece === null && Turn !== boardPieces[row][col].color)
        return;
    
    // select same piece twice
    if(selectedPiece === boardPieces[row][col])
        return;
    
    // move piece to an empty cell
    if(selectedPiece && boardPieces[row][col] === null && (this.id in selectedPieceValidMoves)){
        console.log('Moving to empty cell');
        let move = selectedPieceValidMoves[this.id];
        selectedPiece.movePiece(move, boardPieces);
        removeSuggestedMoves();
        render();
        return;
    }

    // attack another piece
    if(selectedPiece && boardPieces[row][col] !== selectedPiece.color && (this.id in selectedPieceValidMoves)){
        let move = selectedPieceValidMoves[this.id];
        selectedPiece.movePiece(move, boardPieces);
        removeSuggestedMoves();
        render();
        return;
    }
    // trying to attack, invalid move
    if(selectedPiece && boardPieces[row][col] !== selectedPiece.color)
        return;
    

    // select current piece
    pieceValidMoves = boardPieces[row][col].getValidMoves(boardPieces);
    selectedDiv = boardPieces[row][col];

    for(let i = 0; i < pieceValidMoves.length; i++){
        let move = pieceValidMoves[i];

        if(!checkMoveValidity(boardPieces, move))
            continue;

        let divID = getDivID(move.to[0], move.to[1]);
        console.log('DivID: ' + divID);
        let div = document.getElementById(divID);
        div.classList.add('suggestedMove');
        selectedPieceValidMoves[divID] = move;
    }
    selectedPiece = boardPieces[row][col]; 
}

function render(){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            // clear div contents
            let imageDiv = document.getElementById(getDivID(i, j));
            imageDiv.innerHTML = "";

            if(boardPieces[i][j] === null)
                continue;

            let imgTag = document.createElement('img');
            imgTag.src = boardPieces[i][j].image;
            imageDiv.appendChild(imgTag);
        }
    }
}
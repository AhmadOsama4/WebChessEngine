var selectedDiv = null;
var selectedPiece = null;
var selectedPieceValidMoves = [];
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

    let enemies = [],
        enemyKing;

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

    // create a copy of the board
    let tmpBoard = new Array(8);

    for(let i = 0; i < 8; i++){
        tmpBoard[i] = new Array(8);
        for(let j = 0; j < 8; j++){
            if(currentBoard[i][j] === null)
                tmpBoard[i][j] = null;
            else
                tmpBoard[i][j] = JSON.parse(JSON.stringify(currentBoard[i][j]));
        }
    }

    // perform move first
    tmpBoard[move.from[0]][move.from[1]].movePiece(tmpBoard);

    // check if my king will be under attack
}

function handleSelectedDiv(){
    divPosition = getDivPosition(this.id);
    let row = divPosition[0];
    let col = divPosition[1];

    // click on square with no pieces selected
    if(selectedPiece === null && boardPieces[row][col] === null)
        return;
    
    // no piece selected and wrong turn
    if(selectedPiece === null && Turn !== boardPieces[row][col].colors)
        return;
    
    pieceValidMoves = boardPieces[row][col].getValidMoves(boardPieces);

    for(let i = 0; i < pieceValidMoves.length; i++){
        let move = pieceValidMoves[i];

        divID = getDivID(move.to[0], move.to[1]);

        console.log(divID);

        let div = document.getElementById(divID);
        div.classList.add('suggestedMove');

    }

    
}


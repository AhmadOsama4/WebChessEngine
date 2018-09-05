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
    
    pieceValidMoves = boardPieces[row][col].getValidMoves();

    for(let i = 0; i < pieceValidMoves.length; i++){
        let move = pieceValidMoves[i];

        divID = getDivID(move.to[0], move.to[1]);

        console.log(divID);

        let div = document.getElementById(divID);
        div.classList.add('suggestedMove');

    }

    
}


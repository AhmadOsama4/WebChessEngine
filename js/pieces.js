// base for all chess pieces
var ColorsEnum = Object.freeze({
    'BLACK': 0,
    'WHITE': 0
})

var PiecesEnum = Object.freeze({
    'NONE': 0,
    'PAWN': 1,
    'ROOK': 2,
    'KNIGHT': 3,
    'BISHOP': 4,
    'QUEEN': 5,
    'KING': 6
})

var Piece = function(row, col, type, color){
    this.row = row;
    this.col = col;
    this.type = type;
    this.color = color;
    this.isAlive = true;
}

// Move class
var Move = function(from, to, piece)
{
    this.from = from;
    this.to = to;
    this.piece = piece;
}

// Implement each Piece moves

// PAWN class
var Pawn = function(row, col, color){
    Piece.call(this, row, col, PiecesEnum.PAWN, color)
    this.doneMove = false;
}

Pawn.prototype = Object.create(Piece.prototype);

Pawn.prototype.getValidMoves = function(){
    let validMoves = [];
    
    if(this.color === ColorsEnum.WHITE){
        if(this.doneMove === false){ // can move 2 squares forward

        }
        else{

        }
    }
    else{
        if(this.doneMove === false){

        }
        else{
            
        }
    }

    return validMoves;
}


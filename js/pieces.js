// base for all chess pieces
var ColorsEnum = Object.freeze({
    'BLACK': 0,
    'WHITE': 1
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

Piece.prototype.removePiece = function(){
    this.isAlive = false;
    if(this.color == ColorsEnum.WHITE){
        attackedWhitePieces.push(this);
    }
    else{
        attackedBlackPieces.push(this);
    }
    boardPieces[this.row][this.col] = null;
}

Piece.prototype.movePiece = function(move){
    boardPieces[this.row][this.col] = null;
    this.row = move.to[0];
    this.col = move.to[1];

    if(move.attack !== null)
        move.attack.removePiece();
    
    boardPieces[this.row][this.col] = this;
}

Piece.prototype.getPieceDivID = function(){
    let row = String.fromCharCode('A'.charCodeAt() + this.row);
    let col = String(this.col);

    id = row + col;

    return id;
}

// Move class
var Move = function(from, to, piece, attack)
{
    this.from = from; // (x, y)
    this.to = to; // (x, y)
    this.piece = piece; // piece
    this.attack = attack // null => no attack, pieceAttacked otherwise
}

// Implement each Piece moves

// PAWN class
var Pawn = function(row, col, color){
    console.log(color);
    Piece.call(this, row, col, PiecesEnum.PAWN, color)
    this.doneMove = false;
    
    this.image = 'assets/Pawn-White.png';
    if(this.color === ColorsEnum.BLACK)
        this.image = 'assets/Pawn-Black.png';

    boardPieces[row][col] = this;
}

Pawn.prototype = Object.create(Piece.prototype);

Pawn.prototype.getValidMoves = function(){
    let validMoves = [];
    
    if(this.color === ColorsEnum.WHITE){ // White Pawn
        // move 1 step forward
        if(this.row > 0 && boardPieces[this.row - 1][this.col] === null){ 
            let move = new Move([this.row, this.col],
                                [this.row - 1, this.col],
                                this,
                                null
                            );
            
            validMoves.push(move);
        }

        // move 2 steps forward
        if(this.doneMove === false && boardPieces[this.row - 1][this.col] === null 
            && boardPieces[this.row - 2][this.col] === null) // not yet moved
        { 
            let move = new Move([this.row, this.col],
                [this.row - 2, this.col],
                this,
                null
            );
            validMoves.push(move);
        }

        // Attack other pieces
        for(let j = -1; j < 2; j += 2){
            if(this.col + j < 8 && this.col + j >= 0 && this.row > 0 && boardPieces[this.row - 1][this.col + j] !== null
               && boardPieces[this.row - 1][this.col + j].color !== this.color)
            {
     
                 let move = new Move([this.row, this.col],
                     [this.row - 1, this.col + j],
                     this,
                     boardPieces[this.row - 1][this.col + j]
                 );
                 validMoves.push(move);
             }
        }        
    }
    else{ // Black Pawn
        // move 1 step forward
        if(this.row < 7 && boardPieces[this.row + 1][this.col] === null){ // move 1 step forward
            let move = new Move([this.row, this.col],
                                [this.row + 1, this.col],
                                this,
                                null
                            );

            validMoves.push(move);
        }

         // move 2 steps forward
        if(this.doneMove === false && boardPieces[this.row + 1][this.col] === null 
            && boardPieces[this.row + 2][this.col] === null) // not yet moved
        { 
            let move = new Move([this.row, this.col],
                [this.row + 2, this.col],
                this,
                null
            );

            validMoves.push(move);
        }

        // Attack other pieces
        for(let j = -1; j < 2; j += 2){
            if(this.col + j < 8 && this.col + j >= 0 && this.row < 7 && boardPieces[this.row + 1][this.col + j] !== null
               && boardPieces[this.row + 1][this.col + j].color !== this.color)
            {
     
                 let move = new Move([this.row, this.col],
                     [this.row + 1, this.col + j],
                     this,
                     boardPieces[this.row + 1][this.col + j]
                 );
                 validMoves.push(move);
             }
        }        
    }

    return validMoves;
}
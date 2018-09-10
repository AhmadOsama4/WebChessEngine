
var infinity = 1000000;

function handleComputerMove(){
    performComputerMove(boardPieces);
    render();
    checkForCheckMate(boardPieces);
    currentTurn = 1 - currentTurn;
}

function evaluateBoard(currentBoard){
    return 5;
}

function performComputerMove(currentBoard){
    let move = miniMaxAlgorithm(currentBoard, 0, -infinity, infinity, true)[1];

    if(move)
        move.piece.movePiece(move, currentBoard);
}

// computer will take the black color
function miniMaxAlgorithm(currentBoard, depth, alpha, beta, isMax){
    if(depth === difficultyDepth){
        return [evaluateBoard(currentBoard)];
    }

    let whitePieces = [], blackPieces = [];

    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(currentBoard[i][j] === null)
                continue;
            
            if(currentBoard[i][j].color === ColorsEnum.BLACK)
                blackPieces.push(currentBoard[i][j]);
            else
                whitePieces.push(currentBoard[i][j]);
        }
    }

    let bestMove = isMax? [-infinity, null] : [infinity, null];

    if(isMax){
        // pieces
        for(let i = 0; i < blackPieces.length; i++){
            let pieceMoves = blackPieces[i].getValidMoves(currentBoard);
            // move of each piece
            for(let j = 0; j < pieceMoves.length; j++){
                let move = pieceMoves[j];
                if(!checkMoveValidity(currentBoard, move))
                    continue;
                
                blackPieces[i].movePiece(move, currentBoard);

                let retVal = miniMaxAlgorithm(currentBoard, depth + 1, alpha, beta, !isMax);

                // check if we will prune
                if(retVal[0] <= alpha || retVal[0] >= beta){
                    blackPieces[i].undoMove(move, currentBoard);
                    return bestMove;
                }
                if(retVal[0] > alpha){
                    alpha = retVal[0];
                    bestMove = [alpha, move];
                }
                //alpha = Math.max(alpha, retVal[0]);

                blackPieces[i].undoMove(move, currentBoard);
            }

        }
    }
    else{
        for(let i = 0; i < whitePieces.length; i++){
            let pieceMoves = whitePieces[i].getValidMoves(currentBoard);
            // move of each piece
            for(let j = 0; j < pieceMoves.length; j++){
                let move = pieceMoves[j];
                if(!checkMoveValidity(currentBoard, move))
                    continue;
                
                whitePieces[i].movePiece(move, currentBoard);

                let retVal = miniMaxAlgorithm(currentBoard, depth + 1, alpha, beta, isMax);

                // check if we will prune
                if(retVal[0] <= alpha || retVal[0] >= beta){
                    whitePieces[i].undoMove(move, currentBoard);
                    return bestMove;
                }
                if(retVal[0] < bestMove[0]){
                    beta = retVal[0];
                    bestMove = [beta, move];
                }
                //beta = Math.min(beta, retVal[0]);

                whitePieces[i].undoMove(move, currentBoard);
            }

        }
    }

    console.log(bestMove);
    return bestMove;
}
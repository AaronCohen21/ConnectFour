const events = require('events');
const eventEmitter = new events.EventEmitter();
const prompt = require('prompt-sync')({sigint: true});

const boardLength = 7;
const boardHeight = 6;

/*
 * a connect four board 7 columns and 6 rows, the board will be an array of characters
 * player one's pieces will be represented by X and player two's will be O
*/
const newBoard = () => {
    //create row variable
    let row = [];
    for(let i = 0; i < boardLength; i++) row.push(null);

    let board = [];
    for(let i = 0; i < boardHeight; i++) board.push([...row]);

    return board;
}

let board = newBoard();

function printBoard(board) {
    for(let i = 0; i < board.length; i++) {
        let line = "";
        for(let j = 0; j < board[i].length; j++) {
            line += board[i][j] === null ? '#' : board[i][j];
            if (j != board[i].length - 1) line += "|";
        }
        console.log(line);
    }
}

/*
 * TODO: - test all win conditions
 * 
 * Notes: - column is the index (starts at 0)
 *        - char is what token to put into the array as the piece
 * 
 * Return: successful, successful (win), error
*/
const addPiece = (board=newBoard(), column=0, char='X') => {
    if (column < 0 || column >= boardLength) throw new Error("Error: column out of bounds");
    if (board[0][column] !== null) throw new Error("Error: column full");

    //create a value for the row that the piece should be inserted at
    //move that value down until it is the correct row
    let insertRowIdx = board.length-1;
    for(let i = 0; i < board.length; i++) {
        if (board[i][column] !== null) {
            insertRowIdx = i-1;
            break;
        }
    }
    board[insertRowIdx][column] = char;

    //TODO: check for a win
    let win = false;
    const scan = (row, col) => {
        win = true;
        for(let i = 0; i < 4; i++) {
            if (board[row(i)][col(i)] !== char) win = false;
        }
    }

    //check left
    if (column - 3 >= 0) {
        scan((i) => insertRowIdx, (i) => column - i);
    }
    //check right
    if ( (column + 3 <= board[0].length - 1) && !win) {
        scan((i) => insertRowIdx, (i) => column + i);
    }
    //check down
    if ( (insertRowIdx + 3 <= board.length - 1) && !win) {
        scan((i) => insertRowIdx + i, (i) => column);
    }
    //check up
    if ( (insertRowIdx - 3 >= 0) && !win) {
        scan((i) => insertRowIdx - i, (i) => column);
    }

    //diagonal directions

    //check up + left
    if ( (insertRowIdx - 3 >= 0) && (column - 3 >= 0) && !win ) {
        scan((i) => insertRowIdx - i, (i) => column - i);
    }
    //check up + right
    if ( (insertRowIdx - 3 >= 0) && (column + 3 <= 0) && !win ) {
        scan((i) => insertRowIdx - i, (i) => column + i);
    }
    //check down + left
    if ( (insertRowIdx + 3 <= board.length - 1) && (column - 3 >= 0) && !win ) {
        scan((i) => insertRowIdx + i, (i) => column - i);
    }
    //check down + right
    if ( (insertRowIdx + 3 <= board.length - 1) && (column + 3 <= 0) && !win ) {
        scan((i) => insertRowIdx + i, (i) => column + i);
    }

    //if this was a winning move, emit an event
    if (win === true) eventEmitter.emit((char === 'X' ? 'p1' : 'p2') + ' win');
}

eventEmitter.on('p1 win', () => {
    console.log("Player 1 Wins!");
    printBoard(board);
});
eventEmitter.on('p2 win', () => {
    console.log("Player 2 Wins!");
    printBoard(board);
});

// Game Loop
// let running = true;
// while (running) {
//     //print out the board
//     let userChoice = prompt("Choose a column: ");
//     console.log(userChoice);
// }
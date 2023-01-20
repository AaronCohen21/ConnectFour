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
    for(let i = 0; i < boardHeight; i++) board.push(...row);

    return board;
}
let board = newBoard();

let running = true;
while (running) {
    //print out the board
    let userChoice = prompt("Choose a column: ");
    console.log(userChoice);
}

/*
 * TODO: create an addPiece method that modifies the board
 * 
 * Return: successful, successful (win), error
*/
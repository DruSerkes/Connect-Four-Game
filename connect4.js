/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
const restart = document.querySelector('button'); // restart button

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = () => {
  for (let y = 0; y < HEIGHT; y++){
    let row = [];
    for (let x = 0; x < WIDTH; x++){
        row.push(null);
    }
    board.push(row);
    };
}

//makeId: takes y,x and outputs a string for cell ID
const getId = (y, x) =>{
  return `${y}-${x}`;
}

//createTopRow: create row of clickable column tops

const createTopRow = () => {
  const htmlBoard = document.getElementById('board');

  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);
}

//createBoard: create rows and cells and append them to htmlBoard
const createBoard = () => {
  const htmlBoard = document.getElementById('board');
  
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", getId(y, x));                 //write function getId that returns this string 
      row.append(cell);
    }
    htmlBoard.append(row);
  }

}

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
  createTopRow();
  createBoard();
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
// cells are null until filled with curPlayer id
const findSpotForCol = (x) => {
  for (let y = HEIGHT - 1; y >= 0; y--){
  if (board[y][x] === null) { 
      return y;
      }
  };
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
  // make a div and insert into correct table cell
  const cell = document.getElementById(getId(y, x));
  const piece = document.createElement('div');
  piece.classList.add('piece');                             
  piece.classList.add(`p${currPlayer}`);
  cell.append(piece);  
}

/** endGame: announce game end and disable ability to play more pieces */
const endGame = (msg) => {
  setTimeout(function(){
    alert(msg);
  }, 600);
  const htmlBoard = document.getElementById('board');
  htmlBoard.firstChild.removeEventListener('click', handleClick);
}

/** handleClick: handle click of column top to play piece */

const handleClick = (evt) => {
  // get x from ID of clicked cell
  let x = evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // add piece to HTML board
  placeInTable(y, x);

  //update in memory board 
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} wins!`);
  }

  // check for tie
  // check if all cells in board are filled; if so call, call endGame
  if (checkForTie()){
    return endGame(`Game over - It's a tie!`); 
  }

  // switch currPlayer logic 1 <-> 2
  currPlayer === 1 ? currPlayer = 2: currPlayer = 1;        // write switchPlayer function 

  // switch players on screen
  let player = document.getElementById('player');
  player.innerText = `Current player: Player ${currPlayer}`;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin = () => {
  const _win = (cells) => {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells - array of arrays 
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&           // checks if y coordinate is within bounds of the game
        y < HEIGHT &&         
        x >= 0 &&           // checks if x coordinate is within bounds of the game
        x < WIDTH &&
        board[y][x] === currPlayer    // checks if the value at the given cell is equal to the current player val
    );
  }
  // search for how to put TODO's in vscode 


  for (let y = 0; y < HEIGHT; y++) {                                    // iterate over every row top to bottom
    for (let x = 0; x < WIDTH; x++) {  // TODO: wrap this logic in if statement checking if board[y][x] !== null                                    // iterate over every cell in that row left to right
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];         // horiz is an array of 4 arrays with y, x vals from the given coordinates, to the next 3 across the row  
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];          // vert is an array of of 4 arrays with y, x vals from the given coordinates to the next 3 down the board
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];  //diagDR = array of 4 arrays with y, x vals from given cell to the next 3 following a pattern of 1 space to the right, 1 down
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];  //diag DL = array of 4 arrays with y, x vals from given cell and the next 3 following a pattern of 1 space left, 1 down 

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {  // check if any of the 4 currently given arrays of arrays evaluates to true when passed to _win() 
        return true;                                                    // checkForWin returns true if any of them do 
      }
    }
  }
}

//checkForTie: check if the top row is full 
const checkForTie = () => {
  return board[0].every(cell => cell !== null);
}

// restart button
restart.addEventListener('click', evt => {
  location.reload();      // reload loses context - TODO: reset board/html board to keep variables (ie player wins)
})

makeBoard();
makeHtmlBoard();

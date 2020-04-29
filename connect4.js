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

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
  // Get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');

  // Create top row & cells and append to htmlBoard 
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // Create rows and cells (the board) and append them to htmlBoard
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
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
  const cell = document.getElementById(`${y}-${x}`);
  const piece = document.createElement('div');
  piece.classList.add('piece');                             
  piece.classList.add(`p${currPlayer}`);
  cell.append(piece);  
}

/** endGame: announce game end and disable ability to play more pieces */
const endGame = (msg) => {
  alert(msg);
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
  if (board[0].every(cell => cell !== null)){
    return endGame(`Game over - It's a tie!`);
  }

  // switch currPlayer logic 1 <-> 2
  currPlayer === 1 ? currPlayer = 2: currPlayer = 1;

  // switch players on screen
  let player = document.getElementById('player');
  player.innerText = `Current player: Player ${currPlayer}`;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin = () => {
  const _win = (cells) => {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

// restart button
restart.addEventListener('click', evt => {
  location.reload();
})

makeBoard();
makeHtmlBoard();

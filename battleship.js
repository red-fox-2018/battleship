// Your code here
function generateIndex() {
  return Math.floor((Math.random() * (board.length - 2)) + 1)
}
function orientation() {
  let choice = [true, false];
  let choiceIdx = Math.floor((Math.random() * choice.length))
  return choice[choiceIdx];
}
function generateBoard(row) {
  let strA = 'A'.charCodeAt();
  let board = [];
  for (var i = 0; i < row + 1; i++) {
    board[i] = [];
    for (var j = 0; j < row + 1; j++) {
      if (j === 0 && i !== 0) {
        board[i].push(i);
      } else if (i === 0 && j !== 0) {
        board[i].push(String.fromCharCode(strA - 1 + j))
      } else {
        board[i].push(' ')
      }
    }
  }
  return board;
}

function position(board, ship, isHorizontal) {
  // console.log(board);
  var startFrom = {index_i: generateIndex(), index_j: generateIndex()}
  for (var i = 1; i < board.length; i++) {
    for (var j = 1; j < board[i].length; j++) {
      let start_i = startFrom.index_i
      let start_j = startFrom.index_j
      if (i === start_i && j === start_j) {
        if (isHorizontal) {
          if (checkEmpty(startFrom, ship.size, isHorizontal)) {
            for (var k = 0; k < ship.size; k++) {
              board[i][j] = ship.code;
              j++;
            }
            return board;
          } else {
            return position(board, ship, isHorizontal)
          }
        } else {
          if (checkEmpty(startFrom, ship.size, isHorizontal)) {
            // console.log('----di position---', checkEmpty(startFrom, ship.size, isHorizontal));
            for (var k = 0; k < ship.size; k++) {
              board[i][j] = ship.code;
              i++;
            }
            return board;
          } else {
            return position(board, ship)
          }
        }
      }
    }
  }
}

function checkEmpty(index, size, isHorizontal) {
  let start_i = index.index_i;
  let start_j = index.index_j;
  let box = ''
  for (var i = 1; i < board.length; i++) {
    for (var j = 1; j < board[i].length; j++) {
      if (i === start_i && j === start_j) {
        if (isHorizontal) {
          for (var k = 0; k < size; k++) {
            if (board[i][j] !== ' ') {
              return false;
            };
            j++;
          }
          return true;
        } else {
          for (var k = 0; k < size; k++) {
            if (board[i] !== undefined) {
              if (board[i][j] !== ' ') {
                return false;
              }
            } else {
              return false;
            };
            i++;
          }
          return true;
        }
      }
    }
  }
}

var shipCode = [
  {name: 'Aircraft carrier', code: 'C', size: 5},
  {name: 'Battleship', code: 'B', size: 4},
  {name: 'Cruiser', code: 'S', size: 3},
  {name: 'Destroyer', code: 'D', size: 2},
]

var board = generateBoard(10)

function placement(ships) {
  for (var i = 0; i < ships.length; i++) {
    let isHorizontal = orientation();
    board = position(board, ships[i], isHorizontal)
  }
  console.log(board);
}

placement(shipCode);

// console.log(board);

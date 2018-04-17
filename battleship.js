// Your code here
const argv = process.argv;
const Table = require('cli-table');

function generateBoard() {
    let board = [];

    for (let i = 0; i < 10; i++) {
        let temp = []
        for (let j = 0; j < 10; j++) {
            temp.push(' ');
        }

        board.push(temp);
    }

    return board;
}

function generateShip() {
    let arrShip = generateBoard();
    let ship = [{
        name: 'Aircraft carrier',
        size: 5,
        coor: []
    }, {
        name: 'Battleship',
        size: 4,
        coor: []
    }, {
        name: 'Cruiser',
        size: 3,
        coor: []
    }, {
        name: 'Destroyer',
        size: 2,
        coor: []
    }];
    let coordinates = [];

    for (let i = 0; i < ship.length; i++) {
        let status = false;

        while (!status) {
            let shipPositionRows = Math.floor(Math.random() * (10 - 0)) + 0;
            let shipPositionCols = Math.floor(Math.random() * (10 - 0)) + 0;
            let verticalHorizontal = Math.floor(Math.random() * (2 - 0)) + 0;

            if (verticalHorizontal === 1) {
                var rowsAkhir = shipPositionRows + ship[i].size;
                var colsAkhir = shipPositionCols;
            } else {
                var colsAkhir = shipPositionCols + ship[i].size;
                var rowsAkhir = shipPositionRows;
            }

            // horizontal
            if (colsAkhir > 10) {
                let sisa = colsAkhir - 10;

                for (let j = shipPositionCols - sisa; j < colsAkhir - sisa; j++) {
                    try {
                        arrShip[shipPositionRows][j] = 'A';
                        ship[i].coor.push([j, shipPositionRows]);
                    } catch (err) {}
                }
            } else {
                for (let j = shipPositionCols; j < colsAkhir; j++) {
                    try {
                        arrShip[shipPositionRows][j] = 'X';
                        ship[i].coor.push([j, shipPositionRows]);
                    } catch (err) {}
                }
            }


            // vertical
            if (rowsAkhir > 10) {
                let sisa = rowsAkhir - 10;

                for (let k = shipPositionRows - sisa; k < rowsAkhir - sisa; k++) {
                    try {
                        arrShip[k][shipPositionCols] = 'B';
                        ship[i].coor.push([k, shipPositionCols]);
                    } catch (err) {}
                }
            } else {
                for (let k = shipPositionRows; k < rowsAkhir; k++) {
                    try {
                        arrShip[k][shipPositionCols] = 'X';
                        ship[i].coor.push([k, shipPositionCols]);
                    } catch (err) {}
                }
            }

            for (let n = 0; n < ship[i].coor.length; n++) {
                if (coordinates.includes(ship[i].coor[n]) === true) {
                    console.log('masuk sini');
                    status = false;
                } else {
                    console.log('masuk push');
                    coordinates.push(ship[i].coor);
                    status = true;
                }
            }

        }

    }

    return arrShip;
}

function destroyShip() {
    let boardShip = generateShip();

    for (let i = 0; i < boardShip.length; i++) {
        for (let j = 0; j < boardShip[i].length; j++) {
            if (i === parseInt(argv[2]) && j === parseInt(argv[3]) && boardShip[i][j] === 'X') {
                boardShip[i][j] = 'O';
            }
        }
    }

    let table = new Table({
        head: ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        colWidths: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
    });
    let columnName = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

    boardShip.forEach((data, index) => {
        table.push({
            [columnName[index]]: data
        });
    })

    console.log(table.toString());
}

destroyShip();
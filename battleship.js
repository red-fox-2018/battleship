// Your code here
const argv = process.argv

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
    let status = false;
    
    for (let i = 0; i < ship.length; i++) {
        let shipPositionRows = Math.floor(Math.random() * (10 - 0)) + 0;
        let shipPositionCols = Math.floor(Math.random() * (10 - 0)) + 0;
        let verticalHorizontal = Math.floor(Math.random() * (2 - 0)) + 0;

        if (verticalHorizontal === 1) {
            // console.log('rows: ' + shipPositionRows);
            var rowsAkhir = shipPositionRows + ship[i].size;
            var colsAkhir = shipPositionCols;
        } else {
            // console.log('cols: ' + shipPositionCols);
            var colsAkhir = shipPositionCols + ship[i].size;
            var rowsAkhir = shipPositionRows;
        }

        // horizontal
        for (let j = shipPositionCols; j < colsAkhir; j++) {
            try {
                arrShip[shipPositionRows][j] = 'X';
                ship[i].coor.push([j, shipPositionRows]);
            } catch (err) {}
        }

        // vertical
        for (let k = shipPositionRows; k < rowsAkhir; k++) {
            try {
                arrShip[k][shipPositionCols] = 'X';
                ship[i].coor.push([k, shipPositionCols]);
            } catch (err) {}
        }
    }
    console.log(ship);
    return arrShip;
}

function destroyShip() {
    let boardShip = generateShip();

    for (let i = 0; i < boardShip.length; i++) {
        for (let j = 0; j < boardShip[i].length; j++) {
            if (i === parseInt(argv[2]) && j === parseInt(argv[3]) && boardShip[i][j] === 'X') {
                boardShip[i][j] = 'O';
                console.log('---------')
            }
        }
    }

    console.log(boardShip);
}

destroyShip();
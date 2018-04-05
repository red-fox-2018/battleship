// Your code here
alphabeth = ' ABCDEFGHIJ'
var airCraft = []

function generateBoard(rowAndcol = 10){
      var board = []
      for(let i =0; i<= rowAndcol; i++){
        var rowBoard = []
        for(let j =0; j<= rowAndcol; j++){
              if(i === 0 && j > 0){
                    rowBoard.push(j+'')
              }else if(j === 0 && i > 0){
                    rowBoard.push(alphabeth[i]+' ')
              }else{
                    rowBoard.push(' ')
              }
        }
        board.push(rowBoard)
      }
      return board
}
function getPosShip(){
      return [Math.ceil(Math.random() * 10),Math.ceil(Math.random() * 10)]
}
function randomEnemy(board){
        //airCraft
        let posAirCraft = getPosShip()
        console.log(posAirCraft);
        let coorAircraft = []
        if(posAirCraft[0] - 5 < 0 ){
              console.log('kondisi1');
              for(let i = posAirCraft[0] ; i<posAirCraft[0] + 5; i++){
                      let tmpCoor = []
                      board[i][posAirCraft[1]] = "O"
                      tmpCoor.push(alphabeth[i],posAirCraft[1])
                      coorAircraft.push(tmpCoor.join(''))
              }
        }else if (posAirCraft[0] - 5 >= 0) {
          console.log('kondisi2');
          for(let i = posAirCraft[0] ; i > posAirCraft[0] - 5; i--){
                    let tmpCoor = []
                    board[i][posAirCraft[1]] = "O"
                    tmpCoor.push(alphabeth[i],posAirCraft[1])
                    coorAircraft.push(tmpCoor.join(''))
          }
        }
        //battleship
        let posBattleShip = getPosShip()
        console.log(posBattleShip);
        let coorBattleShip = []
        if(posBattleShip[0] - 4 < 0){
          console.log('kondisi1');
              for(let i = posBattleShip[0] ; i<posBattleShip[0] + 4; i++){
                      let tmpCoor = []
                      board[i][posBattleShip[1]] = "O"
                      tmpCoor.push(alphabeth[i],posBattleShip[1])
                      coorBattleShip.push(tmpCoor.join(''))
              }
        }else if (posBattleShip[0] - 4 >= 0 ) {
          console.log('kondisi2');
          for(let i = posBattleShip[0] ; i > posBattleShip[0] - 4; i--){
                    let tmpCoor = []
                    board[i][posBattleShip[1]] = "O"
                    tmpCoor.push(alphabeth[i],posBattleShip[1])
                    coorBattleShip.push(tmpCoor.join(''))
          }
        }
        //cruiser
        let posCruiser = getPosShip()
        console.log(posCruiser);
        let coorCruiser = []
        if(posCruiser[0] - 3 < 0 ){
          console.log('kondisi1');
              for(let i = posCruiser[0] ; i<posCruiser[0] + 3; i++){
                      let tmpCoor = []
                      board[i][posCruiser[1]] = "O"
                      tmpCoor.push(alphabeth[i],posCruiser[1])
                      coorCruiser.push(tmpCoor.join(''))
              }
        }else if (posCruiser[0] - 3 >= 0 ) {
          console.log('kondisi2');
          for(let i = posCruiser[0] ; i > posCruiser[0] - 3; i--){
                    let tmpCoor = []
                    board[i][posCruiser[1]] = "O"
                    tmpCoor.push(alphabeth[i],posCruiser[1])
                    coorCruiser.push(tmpCoor.join(''))
          }
        }
        // DEstroyer
        let posDestroyer = getPosShip()
        console.log(posDestroyer);
        let coorDestroyer = []
        if(posDestroyer[0] - 2 < 0 ){
          console.log('kondisi1');
              for(let i = posDestroyer[0] ; i<posDestroyer[0] + 2; i++){
                    let tmpCoor = []
                    board[posDestroyer[0]][i] = "O"
                    tmpCoor.push(posDestroyer[0],alphabeth[i])
                    coorDestroyer.push(tmpCoor.join(''))
              }
        }else if (posDestroyer[1] - 2 >= 0) {
          console.log('kondisi2');
          for(let i = posDestroyer[1] ; i > posDestroyer[1] - 2; i--){
                  let tmpCoor = []
                  board[posDestroyer[0]][i] = "O"
                  tmpCoor.push(posDestroyer[0],alphabeth[i])
                  coorDestroyer.push(tmpCoor.join(''))
          }
        }
      return {board,coorAircraft,coorBattleShip,coorCruiser,coorDestroyer}
}

function shotTarget(boardGame,shot){
  let countAircraft = 0
  let countBattleShip = 0
  let countCruiser = 0
  let countDestroyer = 0
for(let i=0;i<shot.length;i++){
      // console.log(  boardGame.board)
      boardGame.board[alphabeth.indexOf(shot[i][0])][shot[i][1]] = 'x'
}

  for(let i =0;i<shot.length;i++){
      for(let j=0;j<boardGame.coorAircraft.length;j++){
            if(shot[i] === boardGame.coorAircraft[j]){
                countAircraft ++
            }
      }
  }

  for(let i =0;i<shot.length;i++){
      for(let j=0;j<boardGame.coorBattleShip.length;j++){
            if(shot[i] === boardGame.coorBattleShip[j]){
                countBattleShip ++
            }
      }
  }
  for(let i =0;i<shot.length;i++){
      for(let j=0;j<boardGame.coorCruiser.length;j++){
            if(shot[i] === boardGame.coorCruiser[j]){
                countCruiser ++
            }
      }
  }
  for(let i =0;i<shot.length;i++){
      for(let j=0;j<boardGame.coorDestroyer.length;j++){
            if(shot[i] === boardGame.coorDestroyer[j]){
                countDestroyer ++
            }
      }
  }
    return {countAircraft,countBattleShip,countCruiser,countDestroyer,boardGame}
}


var argv = process.argv
var arrShot = []
var index = 2
while(argv[index]!==undefined){
      arrShot.push(argv[index])
      index++
}

console.log(arrShot)
var board = generateBoard()
var boardGame = randomEnemy(board)
// console.log(boardGame)
var result = shotTarget(boardGame,arrShot)
console.log(result.boardGame.board)

console.log(`|  #   |  Ship                          |  Size |`)
console.log(`|  --  |  ------------------------  |  ----- |`)
console.log(`| ${result.countAircraft}x  | Aircraft carrier           |    5   |`)
console.log(`| ${result.countBattleShip}x  | Battleship                   |    4   |`)
console.log(`| ${result.countCruiser}x  | Cruiser                       |    3    |`)
console.log(`| ${result.countDestroyer}x  | Destroyer                   |    2    |`)

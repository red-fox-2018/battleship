function battleShip(){
    var result = [];
    for(let row=0;row<10;row++){
        var nestedArr = []
        for(let col=0;col<10;col++){
            nestedArr.push('   ')  
        }
        result.push(nestedArr)
    }
    return result
}
function coordinateRow(){
    var randomIndex = Math.floor(Math.random() * 6)
    var result = []   
    for(let i=0;i<10;i++){
        if(i==randomIndex){
            return i
        }
    }
}
function coordinateCol() {
    var randomIndex = Math.floor(Math.random() * 6)
    var result = []
    for (let i = 0; i < 10; i++) {
        if (i == randomIndex) {
            return i
        }
    }
}

function generateShips(board){
    var ships = [5,4,3,2]
    var type = [' @ ',' # ',' % ',' O ']
    
        for(let i=0;i<ships.length;i++){
            var check = true   
            while(check==true){
                var row = coordinateRow()
                var col = coordinateCol()
                if (board[row][col] == '   ') {
                    var isi = true
                    for(let j=0;j<ships[i];j++){
                        debugger
                        if (board[row][col + j] != '   ' || board[row + j][col]  != '   '){       
                            isi = false   
                        }       
                   } 
                   if(isi==true){ 
                       if(col%2==1){
                           for (let j = 0; j < ships[i]; j++) {
                               board[row][col + j] = type[i]
                           }
                           check = false
                        }
                       else{
                           for (let j = 0; j < ships[i]; j++) {
                               board[row + j][col] = type[i]
                           }
                           check = false
                        }
                    }  
                }
            }    
        }       
    return board
}
function attackShips(positions,board){
    var missCount = { ' @ ':5, ' # ':4, ' % ':3, ' O ':2}
    var hitCount = { ' @ ': 0, ' # ': 0, ' % ': 0, ' O ': 0 }
    for(let i=0;i<positions.length;i++){
        var coordinate0 = positions[i][0]
        var coordinate1 = positions[i][1]
        if (board[coordinate0][coordinate1]=='   '){
            board[coordinate0][coordinate1]= ' / '
        }
        else if (Object.keys(missCount).indexOf(board[coordinate0][coordinate1])!=-1){     
            missCount[board[coordinate0][coordinate1]] -=1
            hitCount[board[coordinate0][coordinate1]] +=1   
            board[coordinate0][coordinate1] = ' X '
        } 
    }
    var count = 5
    for(let key in missCount){
        if(missCount[key]<count){
            if(count==hitCount[key]){
                console.log('-----------------------------------')
                console.log(' Booooooom!, Serangan Sebanyak ' + hitCount[key] + ' Kali' + ' Kapal ' + key +  ' Hancur Total')
            }
            else{
                console.log('-----------------------------------')
                console.log(' Booom Kapal ' + key
                    + ' Terkena Serangan sebanyak ' + hitCount[key] + ' kali'
                    + ' dan Miss sebanyak ' + missCount[key] + ' kali'
                )
            }
           
        }
        count--
    }
    return board
}
var announce = process.argv
if (announce.length == 2) {
    console.log('masukkan angka untuk koordinat')
} else {
    var input = announce.slice(2)
    board = battleShip()
    generateEnemy = generateShips(board)
    console.log('---------------Generate Enemy--------------------')
    console.log(generateEnemy)
    var attack = attackShips(input, generateEnemy)
    console.log('-----------------------------------')
    console.log(attack)
}

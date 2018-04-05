
const readline = require('readline'); 

const readLine = readline.createInterface({ 
    input: process.stdin, 
    output: process.stdout 
  }); 

function board(){
    var array=[]
    var num=0
    for(var i=0; i<10; i++){
        array.push([])
        for(var j=0; j<10; j++){
                array[i].push("O")
        }
    }
    return array
}

var putShip = (array)=>{
    var board = array;
    var kapal=[2,3,4,5]
    var kapalLength = []
    var generateKapal= parseInt(Math.random()*3+1)
    var orientasi=['horizontal','vertikal']
    for(i=0;i<generateKapal;i++){
        kapalLength.push(kapal[i])
    }
    for(i=0;i<kapalLength.length;i++){
        orientasi = orientasi[parseInt(Math.random())]
        rowstart = parseInt(Math.random()*9)
        columnstart = parseInt(Math.random()*9)
        if(rowstart>10-kapalLength[i]){
            rowstart-=kapalLength[i]
        }
        if(columnstart>10-kapalLength[i]){
            columnstart-=kapalLength[i]
        }
        for(j=0;j<kapalLength[i];j++){
            if(orientasi == 'horizontal'){
                board[rowstart][columnstart+j]='X'
            }else{
                board[rowstart+j][columnstart]='X'
            }
        }
    }
    return board
}


var board = putShip(board())
function rowQuestions(x){

    for(i=0;i<x.length;i++){
        var stat=true
        for(j=0;j<x[i].length;j++){
            if(x[i][j]=='X'){
                console.log(x)
                readLine.question('Enter Column : ',function(answer){
        
                    columnQuestions(answer,x)
                })
                stat=false
                break;
            }else if(i==x.length-1 && j==x[i].length-1 && x[i][j]!=='X'){
                console.log("You have destroyed a ship :D") 
            }
        }
        if(stat==false){
            break;
        }
    }

}

function columnQuestions (kolomjawab,board){
    readLine.question('Enter Row: ',function(answer){
        if(board[answer][kolomjawab]=='X'){
            console.log("correct!")
            board[answer][kolomjawab] = 'D'
            rowQuestions(board)
        }else if(board[answer][kolomjawab]=='O'){
            console.log("missed! try again")
            board[answer][kolomjawab] = 'E'
            rowQuestions(board)
        }else{
            console.log("You've entered that before :(")
            rowQuestions(board)
        }
    })
}

rowQuestions(board)
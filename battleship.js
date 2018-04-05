function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  function reset_board() {
    console.log("\x1B[2J")
  }
//========================Bagian Generate Field Keseluruhan=========================
var generateBattleBoard = function(num){
    let field = [];
    for(let i=0;i<num;i++){
        field.push([]);
        for(let j=0;j<num;j++){
            field[i].push('~');
        }
    }
    let boardgame = generateShip(field);
    return boardgame;
}
//===================================================================

//=======================Bagian Cek Field Untuk Generate Posisi Kapal=================
var checkposition = function(field,arah,size,x,y){
    let count = 0;
    if(arah === 0){
        for(let i=0;i<size;i++){
            if(field[x+i][y]==='~' && field[x+i][y] !== undefined){
                count++;
            }
        }
        return count;
    }
    else{
        for(let i=0;i<size;i++){
            if(field[x][y+i]==='~' && field[x][y+i] !== undefined){
                count++;
            }
        }
        return count;
    }
}
//===================================================================

//=================Bagian Munculin Kapal===========================
var generateShip = function(field){
    
    let ship = {
        aircraft:[5,'@'],
        battleship:[4,'#'],
        cruiser:[3,'&'],
        destroyer:[2,'$']
    }
    
    for(let key in ship){
        let status = false;
        while(status === false){
            let x = Math.floor(Math.random()*5);
            let y = Math.floor(Math.random()*5);
            let arah = Math.floor(Math.random()*2)
            let cek = checkposition(field,arah,ship[key][0],x,y);
            if(cek === ship[key][0]){
                status = true;
                for(let i=0;i<ship[key][0];i++){
                    if(arah === 0){
                        field[x+i][y]=ship[key][1];
                    }
                    else{
                        field[x][y+i]=ship[key][1];
                    }
                }       
            }
        }
    }
    return field;
}
//===================================================================

//===========Baguan Gameplay Perang===================
var gameplay = function(field,randomBOOM){
    let count = 0;
    let a = 5;
    let b = 4;
    let c = 3;
    let d = 2;
    console.log(field);
    while(count < randomBOOM){
        let x = Math.floor(Math.random()*7);
        let y = Math.floor(Math.random()*7);
        if(field[x][y]!=='~'){
            switch(field[x][y]){
                case '@':{
                    field[x][y] = 'X'
                    a--;
                    console.log('Aircraft Terkena Serangan !!')
                    if(a===0){
                        console.log('Aircraft telah hancur !!')
                    }
                }break;
                case '#':{
                    field[x][y] = 'X'
                    b--;
                    console.log('Battleship Terkena Serangan !!')
                    if(b===0){
                        console.log('Battleship telah hancur !!')
                    }
                }break;
                case '&':{
                    field[x][y] = 'X'
                    c--;
                    console.log('Cruiser Terkena Serangan !!')
                    if(c===0){
                        console.log('Cruiser telah hancur !!')
                    }
                }break;
                case '$':{
                    field[x][y] = 'X'
                    d--;
                    console.log('Destroyer Terkena Serangan !!')
                    if(d===0){
                        console.log('Destroyer telah hancur !!')
                    }
                }break;
            }
        }
        else if(field[x][y]==='X' || field[x][y]==='/'){
            count--;
        }
        else{
            field[x][y] = '/'
            console.log('Serangan Meleset..')
        }
        sleep();
        reset_board();
        console.log(field);
        console.log('Aircraft Health = '+a);
        console.log('Battleship Health = '+b);
        console.log('Cruiser Health = '+c);
        console.log('Destroyer Health = '+d);
        count++;
    }
    if(count >= randomBOOM){
        if(a>0 && b>0 && c>0 && d>0){
            console.log('Musuh Kehabisan BOOM..')
        }
    }
}

//==============drive code========================
let apply = process.argv.splice(2);
let field = generateBattleBoard(10);
let game = gameplay(field,apply[0]);
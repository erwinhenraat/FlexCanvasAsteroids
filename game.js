import Ship from './Ship.js'
import KeyList from './KeyList.js'


let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let ships = [1]; 
ships[0] = new Ship(ctx,10,100,10,10,"red",15,0.4,0.1);


//use keyList to register key handler functions
let k = new KeyList();
k.registerKeyHandler("w",()=>{
    console.log("w");
    let playerSpeed = ships[0].getSpeed();
    if(playerSpeed.getX() < ships[0].getMaxSpeed()){
        playerSpeed.setX(playerSpeed.getX()+ships[0].getAccelleration());
    } 

});

k.registerKeyHandler("s",()=>{
    console.log("s");
    let playerSpeed = ships[0].getSpeed();
    if(playerSpeed.getX() > 0){
        playerSpeed.setX(playerSpeed.getX()-ships[0].getDecellaration());
    }
});
k.registerKeyHandler("a",()=>{
    console.log("left");
});
k.registerKeyHandler("d",()=>{
    console.log("right");
});
k.registerKeyHandler(" ", ()=>{
    console.log("shoot");
});
//activate handlers after registering
k.activateHandlers();

let previous = 0;
function update(time){

    let delta;
    previous == 0 ? delta = 0 : delta = time - previous;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    ships[0].setX(ships[0].getX()+ships[0].getSpeed().getX());

    ships.forEach(s => {
        if(s.getSpeed().getX() > 0 )s.getSpeed().setX(s.getSpeed().getX()-0.02);       
        s.draw();    
    });    
    previous = time;
    window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);
import Ship from './Ship.js'
import KeyList from './KeyList.js'

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let ships = [1]; 
ships[0] = new Ship(ctx,0,100,10,10,"red");

let k = new KeyList();
k.registerKeyHandler("A",()=>{
    console.log("A");
});

k.activateHandlers();


let previous = 0;
function update(time){

    let delta;
    previous == 0 ? delta = 0 : delta = time - previous;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    ships.forEach(s => {
        
        s.setX(s.getX()+0.1);
        s.draw();    
    });    
    previous = time;
    window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);
import Ship from './Ship.js'

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let ships = [3]; 
ships[0] = new Ship(ctx,0,100,10,10,"red");
ships[1] = new Ship(ctx,0,150,10,10,"green");
ships[2] = new Ship(ctx,0,200,10,10,"yellow");

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
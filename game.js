let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

//beginposities
let x = 100;
let y = 100;
let size = 10;

let previous = 0;
let delta = 0;

//gameloop
function update(time){
        
    if(previous != 0){
        delta = time - previous
    }


    ctx.clearRect(0,0,canvas.width, canvas.height);
    //beweging
    x+= 0.08 * delta;
    //teken vierkant
    drawShip(x,y,size,"red");


    previous = time;

    window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);

function drawSquare(x,y,size, color){
    //Vierkantje tekenen
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+size,y);
    ctx.lineTo(x+size,y+size);
    ctx.lineTo(x,y+size);
    ctx.lineTo(x,y);
    ctx.fill();
}
function drawShip(x,y,size, color){
    //Vierkantje tekenen
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x+size/2,y);
    ctx.lineTo(x-size/2,y-size/2);
    ctx.lineTo(x-size/2,y+size/2);    
    ctx.lineTo(x+size/2,y);
    ctx.fill();
}
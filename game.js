let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

//beginposities
let x = 100;
let y = 100;
let size = 10;

//gameloop
function update(time){
    
    ctx.clearRect(0,0,canvas.width, canvas.height);
    //beweging
    x++;
    //teken vierkant
    drawShip(x,y,size,"red");

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
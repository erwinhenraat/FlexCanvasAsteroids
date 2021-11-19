import Ship from './Ship.js'
import KeyList from './KeyList.js'


let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");


//tekenposities
let x = 100;
let y = 100;
let size = 10;

//kleur
ctx.fillStyle = "red";

function update(time){
    
    ctx.clearRect(0,0,canvas.width, canvas.height);
    //beweging
    x++;
    //teken vierkant
    drawSquare(x,y,size);

    window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);

function drawSquare(x,y,size){
    //Vierkantje tekenen
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+size,y);
    ctx.lineTo(x+size,y+size);
    ctx.lineTo(x,y+size);
    ctx.lineTo(x,y);
    ctx.fill();
}
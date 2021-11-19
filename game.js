import Ship from './Ship.js'
import KeyList from './KeyList.js'


let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");


//tekenposities
let x = 100;
let y = 100;
let w = 10;
let h = 10;
//kleur
ctx.fillStyle = "red";

function update(time){
    
    //beweging
    x++;

    //Vierkantje tekenen
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+w,y);
    ctx.lineTo(x+w,y+h);
    ctx.lineTo(x,y+h);
    ctx.lineTo(x,y);
    ctx.fill();

    window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);
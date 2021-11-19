let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

//beginposities
let x = 100;
let y = 100;
let size = 10;

let previous = 0;
let delta = 0;


let horInput = 0;
let verInput = 0;

let acc = 0.001;
let speed = 0;
let maxSpeed = 0.2;

let angle = 0;
let rotSpeed = 0;
let rotAcc = 0.001;
//onpress
document.addEventListener("keydown", (event)=>{
    if(event.key == "w"){
        verInput = 1;
    }
    else if(event.key == "s"){
        verInput = -1;
    }
    else if(event.key == "a"){
        horInput = -1;
    }
    else if(event.key == "d"){
        horInput = 1;
    }
});
//onrelease
document.addEventListener("keyup", (event)=>{
    if(event.key == "w"){
        verInput = 0;
    }
    else if(event.key == "s"){
        verInput = 0;
    }
    else if(event.key == "a"){
        horInput = 0;
    }
    else if(event.key == "d"){
        horInput = 0;
    }
});

//gameloop
function update(time){
    if(previous != 0){
        delta = time - previous
    }
    //check input for speed
    if(speed < maxSpeed)speed += verInput * acc;
    if(speed < 0)speed = 0;
    
    //check input for rotation
    if(horInput!=0)rotSpeed -= rotAcc * horInput;
    if(horInput==0 && rotSpeed !=0)rotSpeed -= rotAcc * horInput;

  
    angle += rotSpeed;
    console.log("rspeed" + rotSpeed);

    ctx.rotate(rotSpeed*Math.PI/2);
    //verplaats pivot
    //ctx.translate(x,y);
    
    //ctx.translate(0,0);

   

    ctx.clearRect(0,0,canvas.width, canvas.height);
    //beweging
    x+= speed * delta;
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

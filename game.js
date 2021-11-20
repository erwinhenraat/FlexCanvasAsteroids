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

let angle = 0;
let rotSpeed = 0.05;
//gameloop
function update(time){       
    ctx.clearRect(x-10,y-10,20, 20);
    //ctx.clearRect(0,0,canvas.width, canvas.height);

    if(previous != 0){
        delta = time - previous
    }
    
    
    //check input for speed
    if(speed < maxSpeed)speed += verInput * acc;
    if(speed < 0)speed = 0;
    if(speed > 0 && verInput == 0) speed-=0.001;
    
    //beweging
    x+= speed * delta;
    
    //verplaats origin van canvas naar locatie van het schip
    ctx.translate(x,y);

    //teken vierkant
    drawShip(0,0,size,"purple");
    
    //roteer de canvas
    ctx.rotate((rotSpeed*horInput)*Math.PI/2);
    
    //verplaats origin van canvas terug naar de hoek
    ctx.translate(-x,-y);

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

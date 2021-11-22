let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

//beginposities van schip
let x = 100;
let y = 100;
let size = 10;

//timestamp vorige frame en delta (verschil)
let previous = 0;
let delta = 0;

//controller input
let inputVector = {x:0,y:0};


let acc = 0.001;
let speed = 0;
let maxSpeed = 0.2;


//onpress
document.addEventListener("keydown", (event)=>{
    if(event.key == "w"){
        inputVector.y = 1;
    }
    else if(event.key == "s"){
        inputVector.y = -1;
    }
    else if(event.key == "a"){
        inputVector.x = -1;
    }
    else if(event.key == "d"){
        inputVector.x = 1;
    }
});
//onrelease
document.addEventListener("keyup", (event)=>{
    if(event.key == "w" || event.key =="s"){
        inputVector.y = 0;
    }
    else if(event.key == "a" || event.key == "d"){
        inputVector.x = 0;
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
    if(speed < maxSpeed)speed += inputVector.y * acc;
    if(speed < 0)speed = 0;
    if(speed > 0 && inputVector.y == 0) speed-=0.001;
    
    //beweging
    x+= speed * delta;
    
    //verplaats origin van canvas naar locatie van het schip
    ctx.translate(x,y);

    //teken vierkant
    drawShip(0,0,size,"purple");
    
    //roteer de canvas
    ctx.rotate((rotSpeed*inputVector.x)*Math.PI/2);
    
    //verplaats origin van canvas terug naar de hoek
    ctx.translate(-x,-y);


    drawRock(200,100,50,"darkgrey",rockPointModifiers[0]);

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

let rockPointModifiers = [];
rockPointModifiers.push(generateRandomRockPointModifiers());

function generateRandomRockPointModifiers(){
    return [
        {y:1+Math.random()*1},                          //upper point modifier
        {x:2+Math.random()*4, y:2+Math.random()*4},     //other point modifier
        {x:2+Math.random()*4, y:2+Math.random()*4},
        {x:2+Math.random()*4, y:2+Math.random()*4},
        {x:2+Math.random()*4, y:2+Math.random()*4},
    ];
}

function drawRock(x,y,size, color, modifiers){
    ctx.clearRect(x-10,y-10, x + size + 10, y + size + 10);
    ctx.strokeStyle = "black";
    ctx.fillStyle = color;
    ctx.beginPath();    
    ctx.moveTo(x,y-size/modifiers[0].y);
    ctx.lineTo(x+size/modifiers[1].x,y-size/modifiers[1].y);
    ctx.lineTo(x+size/modifiers[2].x,y+size/modifiers[2].y);
    ctx.lineTo(x-size/modifiers[3].x,y+size/modifiers[3].y);
    ctx.lineTo(x-size/modifiers[4].x,y-size/modifiers[4].y);
    ctx.lineTo(x,y-size/modifiers[0].y);
    ctx.stroke();
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

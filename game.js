//haal canvas en context op
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");



ctx.beginPath();
ctx.strokeStyle = "black";
ctx.lineWidth = "2";
ctx.rect(0,0,canvas.width, canvas.height);
ctx.stroke();


//timestamp vorige frame en delta (verschil)
let previous = 0;
let delta = 0;

//controller input
let inputVector = {x:0,y:0};

//Bijhouden van ingedrukte toetsen
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
//bij loslaten
document.addEventListener("keyup", (event)=>{
    if(event.key == "w" || event.key =="s"){
        inputVector.y = 0;
    }
    else if(event.key == "a" || event.key == "d"){
        inputVector.x = 0;
    }
});

//maak schip object
let ship = {
    x:100,
    y:100,
    size:10,
    rotation:0,
    rotSpeed:0.05,
    acc:0.001,
    speed:0,
    maxSpeed:0.2
};
//Maak Rotsen
let rocks = [];
addRock(200,100, 20, "red");
addRock(200,200, 25, "blue");
addRock(200,300, 35, "pink");

function addRock(xPos, yPos, size, color){
    rocks.push({
        x:xPos, 
        y:yPos,        
        size:size,
        color:color, 
        direction:{x:Math.random()*4-2,y:Math.random()*4-2},
        rotation:Math.random()*Math.PI*2, 
        rotSpeed:-(Math.random()*Math.PI/16) + (Math.random()*Math.PI/16), 
        modifiers:createRockShapeModifiers()
    });    
}

//gameloop
function update(time){       
   
    ctx.clearRect(2,2,canvas.width-4, canvas.height-4);

    if(previous != 0){
        delta = time - previous;
    }    
    
    //check input for speed
    if(ship.speed < ship.maxSpeed)ship.speed += inputVector.y * ship.acc;
    if(ship.speed < 0)ship.speed = 0;
    if(ship.speed > 0 && inputVector.y == 0) ship.speed-=0.001;
    
    //beweging         
    ship.rotation += ship.rotSpeed * inputVector.x;
    ship.x += Math.cos(ship.rotation)*ship.speed*delta;
    ship.y += Math.sin(ship.rotation)*ship.speed*delta;

    //terleporteer schip
    if(ship.x > canvas.width+ship.size)ship.x = -ship.size;  
    if(ship.x < -ship.size)ship.x = canvas.width+ship.size;
    if(ship.y > canvas.height+ship.size)ship.y = -ship.size;
    if(ship.y < -ship.size)ship.y = canvas.height + ship.size;

    ctx.translate(ship.x,ship.y);
    ctx.rotate(ship.rotation);
    drawShip(0,0,10,"blue");
    ctx.resetTransform();
 
    rocks.forEach(r => {    
        r.x += r.direction.x;
        r.y += r.direction.y;

        //teleporteer rotsen
        if(r.x > canvas.width + r.size)r.x = -r.size;
        if(r.x < - r.size)r.x = canvas.width + r.size;
        if(r.y > canvas.height + r.size)r.y = -r.size;
        if(r.y < - r.size)r.y = canvas.height + r.size;

        ctx.translate(r.x,r.y);        
        r.rotation += r.rotSpeed;      
        ctx.rotate(r.rotation);
        drawRock(0,0,r.size,r.color,r.modifiers);        
        ctx.resetTransform();        
    });
    previous = time;  
    window.requestAnimationFrame(update);  
}
window.requestAnimationFrame(update);

function drawShip(x,y,size, color){
    //schip tekenen
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x+size/2,y);
    ctx.lineTo(x-size/2,y-size/2);
    ctx.lineTo(x-size/2,y+size/2);    
    ctx.lineTo(x+size/2,y);
    ctx.fill();
}
function drawRock(x,y,size, color, modifiers){
    //Rots tekenen met 5 hoeken   
    ctx.fillStyle = color;
    ctx.beginPath();    
    ctx.moveTo(x,y-size/modifiers[0].y);
    ctx.lineTo(x+size/modifiers[1].x,y-size/modifiers[1].y);
    ctx.lineTo(x+size/modifiers[2].x,y+size/modifiers[2].y);
    ctx.lineTo(x-size/modifiers[3].x,y+size/modifiers[3].y);
    ctx.lineTo(x-size/modifiers[4].x,y-size/modifiers[4].y);
    ctx.lineTo(x,y-size/modifiers[0].y);
    ctx.fill();
}
function createRockShapeModifiers(){
    //5 random hoekpunten voor de rotsen 
    return [
        {y:1+Math.random()*1},                          //upper point modifier
        {x:2+Math.random()*4, y:2+Math.random()*4},     //other point modifier
        {x:2+Math.random()*4, y:2+Math.random()*4},
        {x:2+Math.random()*4, y:2+Math.random()*4},
        {x:2+Math.random()*4, y:2+Math.random()*4},
    ];
}

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

//schip data
let x = 100;
let y = 100;
let size = 10;
let rotation = 0;
let rotSpeed = 0.05;
let acc = 0.001;
let speed = 0;
let maxSpeed = 0.2;




//timestamp vorige frame en delta (verschil)
let previous = 0;
let delta = 0;

//controller input
let inputVector = {x:0,y:0};




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




let rocks = [];
addRock(200,100, 20, "red");
addRock(200,200, 25, "blue");
addRock(200,300, 35, "pink");

function addRock(xPos, yPos, size, color){
    rocks.push({x:xPos, y:yPos, size:size,color:color, rotation:Math.random()*Math.PI*2 , rotSpeed:-(Math.random()*Math.PI/8) + (Math.random()*Math.PI/4), modifiers:generateRandomRockPointModifiers()});
    
}
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
    //Rots tekenen
   
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
//gameloop
function update(time){       
   
    ctx.clearRect(0,0,canvas.width, canvas.height);

    if(previous != 0){
        delta = time - previous;
    }    
    
    //check input for speed
    if(speed < maxSpeed)speed += inputVector.y * acc;
    if(speed < 0)speed = 0;
    if(speed > 0 && inputVector.y == 0) speed-=0.001;
    
    //beweging
    //x+= speed * delta;
 
    
    rotation += rotSpeed * inputVector.x;

    x += Math.cos(rotation)*speed*delta;
    y += Math.sin(rotation)*speed*delta;
       

    ctx.translate(x,y);
    ctx.rotate(rotation);

    drawShip(0,0,10,"blue");

    ctx.resetTransform();
 



    rocks.forEach(r => {

        //Translaties moeten ook bij elkaar worden opgeteld net als bij total Rotation
       
        ctx.translate(r.x,r.y);        
       
        r.rotation += r.rotSpeed;
      
        ctx.rotate(r.rotation);
        drawRock(0,0,r.size,r.color,r.modifiers);
        
        ctx.resetTransform();
        
    });



    //verplaats origin van canvas naar locatie van het schip
/*
    ctx.translate(x,y);
    ctx.clearRect(0-size,0-size,size*2, size*2);
    drawShip(0,0,size,"purple");
    //roteer de canvas terug
    ctx.rotate((rotSpeed*inputVector.x)*Math.PI/2);
    
    //verplaats origin van canvas terug naar de hoek
    ctx.translate(-x,-y);
*/
    //rock
    

  

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
    //schip tekenen
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x+size/2,y);
    ctx.lineTo(x-size/2,y-size/2);
    ctx.lineTo(x-size/2,y+size/2);    
    ctx.lineTo(x+size/2,y);
    ctx.fill();
}

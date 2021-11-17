let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");




class Ship{
    constructor(ctx,x,y,width,height, color){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw(){
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x+this.width/2,this.y);
        ctx.lineTo(this.x-this.width/2,this.y-this.height/2);
        ctx.lineTo(this.x-this.width/2,this.y+this.height/2);
        ctx.lineTo(this.x+this.width/2,this.y);
        ctx.stroke();
        ctx.fill();   
    }
    setX(value){
        this.x = value;
    }
    getX(){
        console.log(this.x);
        return this.x;
    }
    setY(value){
        this.y = value;
    }
    getY(){
        return this.y;
    }
}
const ships = [3]; 
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



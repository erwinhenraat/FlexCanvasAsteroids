import Vector2 from './Vector2.js'

class Ship{
    constructor(ctx,x,y,width,height, color, maxSpeed, acceleration, decelleration){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = new Vector2(0,0);
        this.maxSpeed = maxSpeed;
        this.acceleration = acceleration;
        this.decelleration = decelleration;
    }
    draw(){
        
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x+this.width/2,this.y);
        this.ctx.lineTo(this.x-this.width/2,this.y-this.height/2);
        this.ctx.lineTo(this.x-this.width/2,this.y+this.height/2);
        this.ctx.lineTo(this.x+this.width/2,this.y);
        this.ctx.stroke();
        this.ctx.fill();   
    }
    setX(value){
        this.x = value;
    }
    getX(){
        return this.x;
    }
    setY(value){
        this.y = value;
    }
    getY(){
        return this.y;
    }
    getSpeed(){
        return this.speed;
    }
    setSpeed(value){
        this.speed = value;
    }
    getMaxSpeed(){
        return this.maxSpeed;
    }
    getAccelleration(){
        return this.acceleration;
    }
    getDecelleration(){
        return this.decelleration;
    }
}
export default Ship;
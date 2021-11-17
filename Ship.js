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
export default Ship;
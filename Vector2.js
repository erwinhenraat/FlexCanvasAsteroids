class Vector2{
    x;
    y;
    constructor(x,y){
        this.x = x;
        this.y = y;
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
    
}
export default Vector2;
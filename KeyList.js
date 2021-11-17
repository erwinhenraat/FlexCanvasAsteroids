class KeyList{
    KeyHandlers;
    constructor(){
        this.KeyHandlers = [];
    }
    
    registerKeyHandler(keyName, handler){
        this.KeyHandlers.push({
            key:keyName,
            value:handler
        });
        console.log(this.keyHandlers);
        
        
    }

    activateHandlers(){
        console.log(this.keyHandlers);
        /*
        this.keyHandlers.forEach(item => {
            document.addEventListener('keydown', item.value);
        });*/
    }
}
export default KeyList;
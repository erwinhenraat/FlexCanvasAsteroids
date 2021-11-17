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
    }
    activateHandlers(){        
        document.addEventListener('keydown',(e)=>{         
            this.KeyHandlers.forEach(item => {                
                if (e.key == item.key){
                    item.value();                 
                }
            })
        });
    }
}
export default KeyList;
let canvas = document.getElementById("game");
console.log("hallo");
let previous = 0;





function update(time){

    let delta;
    previous == 0 ? delta = 0 : delta = time - previous;
    
    console.log(delta)


    previous = time;
    window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);
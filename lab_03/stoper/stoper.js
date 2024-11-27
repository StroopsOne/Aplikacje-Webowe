
const display = document.getElementById("countstoper");

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start() {
    
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 1000);
        isRunning = true;
    }
}

function stop(){

    if(isRunning){
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function reset(){
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "0s"
}

function update() {

    const currTime = Date.now()
    elapsedTime = currTime - startTime;
    let minutes = Math.floor(elapsedTime / (60 * 1000));
    let seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000); 

    if(minutes > 0){
        display.textContent = `${minutes} min ${seconds} s`;
    
    }
    else{
        display.textContent = `${seconds} s`;
    }

}

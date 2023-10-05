let startTime=0;
let timeInterval;
let running=false;
let lapCount=1;
let pauseTime=0;

const stopwatch=document.getElementById("time");
const startStopButton=document.getElementById("start");
const lapResetButton=document.getElementById("lap");
const lapList=document.getElementById("lapBox");

startStopButton.addEventListener("click", toggleStartStop);
lapResetButton.addEventListener("click", lapReset);

function toggleStartStop() {
    if(!running) {
        if(startTime===0){
            startTime=Date.now();
        }
        else{
            const pausedTime=Date.now()-pauseTime;
            startTime+=pausedTime;
        }
        timeInterval=setInterval(updateStopwatch,100);
        startStopButton.textContent="Stop";
        lapResetButton.textContent="Lap";
        running=true;
    }
    else{
        clearInterval(timeInterval);
        startStopButton.textContent="Resume";
        lapResetButton.textContent="Reset";
        running=false;
        pauseTime=Date.now();
    }
}

function lapReset() {
    if(running) {
        const lapTime = calculateLapTime();
        lapDisplay(lapTime);
        lapCount++;
    }
    else{
        resetStopwatch();
    }
}
function calculateLapTime() {
    const currentTime=Date.now()-startTime;
    const hr=Math.floor(currentTime/3600000);
    const min=Math.floor((currentTime%3600000)/60000);
    const sec=Math.floor((currentTime%60000)/1000);
    const ms=(currentTime%100).toString().slice(0,2);
    return `${padTime(hr)}:${padTime(min)}:${padTime(sec)}.${padMs(ms)}`;
}

function padTime(value) {
    return value.toString().padStart(2,"0");
}
function padMs(value) {
    return value.toString().padStart(2,"0");
}
function scrollToBottom() {
    lapList.scrollTop = lapList.scrollHeight;
}
function lapDisplay(lapTime) {
    const lapItem=document.createElement("li");
    lapItem.textContent=`Lap ${lapCount} : ${lapTime}`;
    lapItem.style.color= "rgb(164, 188, 188)";
    lapItem.style.padding="0.3rem";
    lapList.appendChild(lapItem);
    scrollToBottom();
}

function resetStopwatch() {
    clearInterval(timeInterval);
    stopwatch.textContent="00:00:00.00";
    startStopButton.textContent="Start";
    lapResetButton.textContent="Lap";
    running=false;
    startTime=0;
    lapCount=1;
    lapList.innerHTML="";
}

function updateStopwatch() {
    const currentTime=running ? Date.now()-startTime : startTime;
    const hr=Math.floor(currentTime/3600000);
    const min=Math.floor((currentTime%3600000)/60000);
    const sec=Math.floor((currentTime%60000)/1000);
    const ms=(currentTime%100);
    const formattedTime=`${padTime(hr)}:${padTime(min)}:${padTime(sec)}.${padMs(ms)}`;
    stopwatch.textContent=formattedTime;
}
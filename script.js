// initialising variables
let startTime=0;
let timeInterval;
let running=false;
let lapCount=1;
let pauseTime=0;

// accessing html
const stopwatch=document.getElementById("time");
const startStopButton=document.getElementById("start");
const lapResetButton=document.getElementById("lap");
const lapList=document.getElementById("lapBox");

// click events
startStopButton.addEventListener("click", toggleStartStop);
lapResetButton.addEventListener("click", lapReset);

function toggleStartStop() { //running condition to check whether the stopwatch is running or not
    if(!running) {
         if(startTime===0){  //stopwatch not yet started current time is stored in start time
            startTime=Date.now();
        }
        else{
            const pausedTime=Date.now()-pauseTime; //stopwatch paused paused time calculated pause time was set when the stopwatch was paused paused time is the time for which the stopwatch was paused 
            startTime+=pausedTime; //elapsed time
        }
        timeInterval=setInterval(updateStopwatch,100);   //millisecond timer upto 10 to update it using fn updateStopwatch 
        startStopButton.textContent="Stop";
        lapResetButton.textContent="Lap";
        running=true; //now running
    }
    else{ //when already running
        clearInterval(timeInterval);   //clears the fn and stops the time update
        startStopButton.textContent="Resume";
        lapResetButton.textContent="Reset";
        running=false; //stopwatch paused
        pauseTime=Date.now(); //current pause time
    }
}
//fn called when lap or reset button is pressed
function lapReset() {
    if(running) {  //if watch is running 
        const lapTime = calculateLapTime(); //it calculates the lap time
        lapDisplay(lapTime); //displays laptime
        lapCount++; //increses the lap count
    }
    else{ //watch not running
        resetStopwatch(); //clears lap and reset the stopwatch
    }
}
function calculateLapTime() { //calculates the laptime when lap is pressed
    const currentTime=Date.now()-startTime;  //calculates elapsed time but subtraction present current time from the start time done incase you just started or resumed 
    const hr=Math.floor(currentTime/3600000);
    const min=Math.floor((currentTime%3600000)/60000);
    const sec=Math.floor((currentTime%60000)/1000);
    const ms=(currentTime%100).toString().slice(0,2);
    return `${padTime(hr)}:${padTime(min)}:${padTime(sec)}.${padMs(ms)}`; //formatted string to show time
}

function padTime(value) { //takes number and repesents it as 2 digit string
    return value.toString().padStart(2,"0");
}
function padMs(value) {
    return value.toString().padStart(2,"0");
}
function scrollToBottom() {
    lapList.scrollTop = lapList.scrollHeight;
}
function lapDisplay(lapTime) {
    const lapItem=document.createElement("li"); //creates a new html li 
    lapItem.textContent=`Lap ${lapCount} : ${lapTime}`; //text that will be displayed
    lapItem.style.color= "rgb(164, 188, 188)";
    lapItem.style.padding="0.3rem";
    lapList.appendChild(lapItem); //appends lapitem to laplist adds new lap time entry to the list
    scrollToBottom();
}

function resetStopwatch() {
    clearInterval(timeInterval); //stop timer to update time display
    stopwatch.textContent="00:00:00.00";
    startStopButton.textContent="Start";
    lapResetButton.textContent="Lap";
    running=false;
    startTime=0;
    lapCount=1;
    lapList.innerHTML=""; //removes all previously recorded lap from the list
}

function updateStopwatch() {
    const currentTime=running ? Date.now()-startTime : startTime; //calculates the current time by checking if the watch is running or not
    const hr=Math.floor(currentTime/3600000);
    const min=Math.floor((currentTime%3600000)/60000);
    const sec=Math.floor((currentTime%60000)/1000);
    const ms=(currentTime%100);
    const formattedTime=`${padTime(hr)}:${padTime(min)}:${padTime(sec)}.${padMs(ms)}`;
    stopwatch.textContent=formattedTime;
}
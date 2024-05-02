const inputEl = document.querySelector('.timer-input input')
const countdownEl = document.querySelector('.countdown')
const fillEl = document.querySelector('.fill')
const minutesEl = document.querySelector('.minutes')
const secondsEl = document.querySelector('.seconds')
const millisecondsEl = document.querySelector('.milliseconds')

const playPauseBtn = document.querySelector('.pause-play')
const playPauseBtns = document.querySelectorAll('.pause-play button')
const stopBtn = document.querySelector('.stop')

inputEl.addEventListener('input',getDataFromInput)
playPauseBtn.addEventListener('click',playPause)
stopBtn.addEventListener('click',refresh)

let seconds, initialSeconds, enteredData, intervalRef, milliseconds = 0
let state = "stop"

function refresh(){
    inputEl.value = '00:59'
    inputEl.classList.add("show")
    getDataFromInput()
    fillEl.style.height = `0%` 
    playPauseBtns[0].classList.remove("show")
    playPauseBtns[1].classList.add("show")
    countdownEl.style.display = "none"
    inputEl.style.display = "flex"
    intervalRef && clearInterval(intervalRef)
    state = "pause"
    inputEl.focus()
    updateMinuteSecond()
    milliseconds = 0
    millisecondsEl.innerText = milliseconds
}
refresh()

function timerStart222(){
    if(seconds < 0 ){
        clearInterval(intervalRef)
        refresh()
        return
    }
    millisecondsEl.innerText = milliseconds
    if(seconds === initialSeconds || milliseconds !== 0) {
        updateMinuteSecond()
    }
    if(milliseconds === 0){
        seconds--
        milliseconds = 9
    } else {
        milliseconds--
    }
    fillEl.style.height = `${(seconds+(milliseconds/10))/(initialSeconds * 10)*1000}%`
}

function playPause(){
    if( isNaN(seconds)){
        refresh()
        return
    } 
    if(state==="pause"){
        intervalRef = setInterval(timerStart222,100)
        state = "playing"
        updateMinuteSecond()
        countdownEl.style.display = "flex"
        inputEl.style.display = "none"
    } else{
        intervalRef && clearInterval(intervalRef)
        state = "pause"
    }
    playPauseBtns.forEach((el)=>{
        el.classList.toggle("show")
    })
}

function add0(data){
    return data<10? `0${data}` :data
}

function getDataFromInput(){
    enteredData = inputEl.value.split(':')
    seconds = +enteredData[0]*60 + +enteredData[1]
    initialSeconds = seconds
}

function updateMinuteSecond(){
    minutesEl.innerText = add0(Math.floor(seconds/60))
    secondsEl.innerText = add0(seconds%60)
}

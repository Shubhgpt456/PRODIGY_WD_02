let minutes = 0, seconds = 0, milliseconds = 0, interval;
let isRunning = false;

const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");
const startPauseBtn = document.getElementById("startPauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsList = document.getElementById("lapsList");

function startStopwatch() {
    if (!isRunning) {
        interval = setInterval(updateTime, 10);
        startPauseBtn.textContent = "Pause";
        startPauseBtn.classList.add("pause");
        lapBtn.disabled = false;
        resetBtn.disabled = false;
        isRunning = true;
    } else {
        clearInterval(interval);
        startPauseBtn.textContent = "Resume";
        startPauseBtn.classList.remove("pause");
        isRunning = false;
    }
}

function updateTime() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);
    millisecondsElement.textContent = formatTime(Math.floor(milliseconds / 10));
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function resetStopwatch() {
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    isRunning = false;
    
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    millisecondsElement.textContent = "00";
    
    startPauseBtn.textContent = "Start";
    startPauseBtn.classList.remove("pause");
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    lapsList.innerHTML = "";
}

function recordLap() {
    const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(Math.floor(milliseconds / 10))}`;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

startPauseBtn.addEventListener("click", startStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);

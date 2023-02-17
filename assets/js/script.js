var startButtonEl = document.querySelector("#start-button");
var timerEl = document.querySelector("#timer");

var timeLeft = 60;

function runTimer() {
    setInterval(countdown, 1000);
    function countdown() {
        timeLeft--;
        timerEl.innerHTML = timeLeft;
    }
}

startButtonEl.addEventListener('click', runTimer);
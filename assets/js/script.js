var startButtonEl = document.querySelector("#start-button");
var timerEl = document.querySelector("#timer");

var timeLeft = 60;

function runTimer() {
    setInterval(countdown, 1000);
    function countdown() {
        if (timeLeft > 0) {
        timerEl.innerHTML = timeLeft;
        timeLeft--;
        } else {
            timerEl.innerHTML = "Time's up!";
            clearInterval(runTimer);
        }
    }
}
startButtonEl.addEventListener('click', runTimer);
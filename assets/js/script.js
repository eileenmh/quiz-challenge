var startButtonEl = document.querySelector("#start-button");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector('h2');
var optionsEl = document.querySelector('#options');

// Quiz Questions
function MultipleChoice(q, o, a) {
    this.question = q;
    this.options = o;
    this.answer = a;
}

var question1 = new MultipleChoice("This is a question", ['option 1', 'option 2', 'option 3', 'option 4'], "option 3");
console.log(question1.options);

// Timer that starts on click of Start Button
function startQuiz() {

    function runTimer() {
        var timeLeft = 60;
        setInterval(countdown, 1000);
        function countdown() {
            if (timeLeft > 2 ) {
                timeLeft--;
                timerEl.innerHTML = '00:' + timeLeft + ' seconds remaining';
            } 
            else if (timeLeft === 2) {
                timeLeft--;
                timerEl.innerHTML = timeLeft + ' second remaining';
            } 
            else {
                timerEl.innerHTML = "Time's up!";
                clearInterval(runTimer);
            }
        }
    }

    function firstQuestion() {
        questionEl.innerHTML = question1.question;
        function testingTesting() {
            console.log("this worked!");
        }
        for (let i = 0; i < question1.options.length; i++) {
            var answerOption = document.createElement('button');
            answerOption.innerText = question1.options[i];
            answerOption.classList.add("answer-option");
            optionsEl.appendChild(answerOption);
            answerOption.addEventListener('click',testingTesting);
        }

    }

    runTimer();
    firstQuestion();
}

startButtonEl.addEventListener('click', startQuiz);
startButtonEl.addEventListener('click',startButtonEl.remove);
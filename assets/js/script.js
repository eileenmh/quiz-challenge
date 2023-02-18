var startButtonEl = document.querySelector("#start-button");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector('h2');
var optionsEl = document.querySelector('#options');
var score = 0;

// Quiz Questions
function MultipleChoice(q, o, a) {
    this.question = q;
    this.options = o;
    this.answer = a;
}

var question1 = new MultipleChoice("Question 1 Text", ['q1 - option 1', 'q1 - option 2', 'q1 - option 3', 'q1 - option 4'], "q1 - option 3");
var question2 = new MultipleChoice("Question 2 Text", ['q2 - option 1', 'q2 - option 2', 'q2 - option 3', 'q2 - option 4'], "q2 - option 1");
var question3 = new MultipleChoice("Question 3 Text", ['q3 - option 1', 'q3 - option 2', 'q3 - option 3', 'q3 - option 4'], "q3 - option 4");

var questions = [question1, question2, question3];

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
    var questionNumber = -1;
    function getQuestions() {
        optionsEl.innerHTML = "";
        questionNumber++;
        if (questionNumber <= questions.length) {
            questionEl.innerText = questions[questionNumber].question;

            for (let i = 0; i < questions[questionNumber].options.length; i++) {
                 var answerOption = document.createElement("button");
                 answerOption.innerText = questions[questionNumber].options[i];
                 answerOption.classList.add("answer-option");
                 optionsEl.appendChild(answerOption);
                 answerOption.addEventListener('click',checkAnswer);
            }            
        }
    }
    function checkAnswer (event) {
        var checkAnswer = event.srcElement.textContent === questions[questionNumber].answer;
        console.log(checkAnswer);
        getQuestions();
    }

    runTimer();
    getQuestions();
}

startButtonEl.addEventListener('click', startQuiz);
startButtonEl.addEventListener('click',startButtonEl.remove);
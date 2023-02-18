var startButtonEl = document.querySelector("#start-button");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector('h2');
var optionsEl = document.querySelector('#options');
var gameTrackerEl = document.querySelector('#game-tracker');

var score = 0;
var scoreboard = [];

var lastAnswer = true;
var timeLeft = 60;

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
    var currentScore = document.createElement("div");
    currentScore.innerText = 'Current Score: ' + score;
    gameTrackerEl.appendChild(currentScore);
    

    var timer = setInterval(countdown, 1000);

    function countdown() {
            timeLeft--;
            if (timeLeft > 2) {
                timerEl.innerHTML = timeLeft + ' seconds remaining';
            }
            else if (timeLeft === 2) {
                timerEl.innerHTML = timeLeft + ' second remaining';
            }
            else {
                timerEl.innerHTML = "Time's up!";
                clearInterval(timer);
                
            }
        }

    var questionNumber = -1;
    function getQuestions() {
        optionsEl.innerHTML = "";
        questionNumber++;
        if (questionNumber < questions.length) {
            questionEl.innerText = questions[questionNumber].question;

            for (let i = 0; i < questions[questionNumber].options.length; i++) {
                 var answerOption = document.createElement("button");
                 answerOption.innerText = questions[questionNumber].options[i];
                 answerOption.classList.add("answer-option");
                 optionsEl.appendChild(answerOption);
                 answerOption.addEventListener('click',checkAnswer);
            }            
        }
        else {
            timerEl.innerHTML = "All done!";
            console.log("still running");
            clearInterval(timer);
        }
    }
    function checkAnswer (event) {
        lastAnswer = event.srcElement.textContent === questions[questionNumber].answer;
        if(lastAnswer) {
            score++;
        }
        else {
            timeLeft -= 5;
        }
        currentScore.innerText = 'Current Score: ' + score;
        getQuestions();
    }

    getQuestions();
}

startButtonEl.addEventListener('click', startQuiz);
startButtonEl.addEventListener('click',startButtonEl.remove);
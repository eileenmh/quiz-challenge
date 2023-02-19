var startButtonEl = document.querySelector("#start-button");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var optionsEl = document.querySelector('#answer-options');
var gameTrackerEl = document.querySelector('#game-tracker');
var scoreButtonEl = document.querySelector('#submit-score');
var scoreStatusEl = document.querySelector("#score-status")
var currentScore = document.querySelector('#current-score');

var score;
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
    score = 0;
    currentScore.innerText = score;
    scoreStatusEl.innerText = "Current Score:"
    startButtonEl.innerText = "I give up ☹️"

    var timer = setInterval(countdown, 1000);

    function countdown() {
            timeLeft--;
            if (timeLeft > 9) {
                timerEl.innerText = '0:' + timeLeft + ' seconds remaining';
            }
            else if (timeLeft > 2) {
                timerEl.innerText = '0:0' + timeLeft + ' seconds remaining';
            }
            else if (timeLeft === 2) {
                timerEl.innerText = '0:0' + timeLeft + ' second remaining';
            }
            else {
                timerEl.innerHTML = "Time's up!";
                scoreStatusEl.innerText = "Final Score:"
                restartQuiz();
                clearInterval(timer);
            }
        }

    var questionNumber = -1;
    function getQuestions() {
        optionsEl.innerHTML = "";
        questionNumber++;
        if (questionNumber < questions.length) {
            questionEl.innerText = questions[questionNumber].question;
            console.log("it's running here");

            for (let i = 0; i < questions[questionNumber].options.length; i++) {
                 var answerOption = document.createElement("button");
                 answerOption.innerText = questions[questionNumber].options[i];
                 answerOption.classList.add("mb-3");
                 answerOption.classList.add("w-100");
                 optionsEl.appendChild(answerOption);
                 answerOption.addEventListener('click',checkAnswer);
            }            
        }
        else {
            timerEl.innerHTML = "All done!";
            scoreStatusEl.innerText = "Final Score:"
            restartQuiz();
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
        currentScore.innerText = score;
        getQuestions();
    }

    getQuestions();
}

function restartQuiz() {
    timeLeft = 60;
    startButtonEl.innerText = "Try again";
}

function saveScore(event) {
    event.preventDefault();
    console.log("Woohoo!");
}

startButtonEl.addEventListener('click', startQuiz);
scoreButtonEl.addEventListener('submit', saveScore);
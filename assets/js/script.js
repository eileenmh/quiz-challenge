var quizButtonEl = document.querySelector("#quiz-button");
var timeLeftEl = document.querySelector("#time-left");


var scoreFormEl = document.querySelector('#submit-score');
var scoreStatusEl = document.querySelector("#score-status")
var currentScore = document.querySelector('#current-score');
var initialsEl = document.getElementById("initials");
var scoreboardEl = document.getElementById("scorelist");
var scoreList = document.createElement("ol");


var score;
var answerValidity;
var savedScores = [];

/* -------------------------------------------------------------------------------------------
// MULTIPLE CHOICE QUESTIONS
*/
var questionEl = document.querySelector("#question");
var mcOptionsEl = document.querySelector('#mc-options');

function mcObject(question, options, answer) {
    this.question = question;
    this.options = options;
    this.answer = answer;
}

var question1 = new mcObject("Question 1 Text", ['q1 - option 1', 'q1 - option 2', 'q1 - option 3', 'q1 - option 4'], "q1 - option 3");
var question2 = new mcObject("Question 2 Text", ['q2 - option 1', 'q2 - option 2', 'q2 - option 3', 'q2 - option 4'], "q2 - option 1");
var question3 = new mcObject("Question 3 Text", ['q3 - option 1', 'q3 - option 2', 'q3 - option 3', 'q3 - option 4'], "q3 - option 4");

var mcQuestions = [question1, question2, question3];

// On quiz start, present the first question; once answer is received, present second question; etc.
var questionNumber; // used to compare how many questions the for loop in presentQuestions() has gone through to how many question exist
function presentQuestions() {
    mcOptionsEl.innerHTML = "";
    if (questionNumber < mcQuestions.length) {
        questionEl.innerText = mcQuestions[questionNumber].question;

        for (let i = 0; i < mcQuestions[questionNumber].options.length; i++) {
             var answerOption = document.createElement("button");
             answerOption.innerText = mcQuestions[questionNumber].options[i];
             answerOption.classList.add("mb-3");
             answerOption.classList.add("w-100");
             mcOptionsEl.appendChild(answerOption);
             answerOption.addEventListener('click',checkAnswer);
        }
    }
    else {
        timeLeftEl.innerHTML = "All done!";
        scoreStatusEl.innerText = "Final Score:"
        restartQuiz();
        clearInterval(timer);
    }
}

// Compare selected answer to actual answer and increase score by one if correct, deduct 5 seconds from timer if incorrect
function checkAnswer (event) {
    answerValidity = event.srcElement.textContent === mcQuestions[questionNumber].answer;
    if(answerValidity) {
        score++;
    }
    else {
        timeLeft -= 5;
    }
    currentScore.innerText = score;
    questionNumber++;
    presentQuestions();
}

/* -------------------------------------------------------------------------------------------
// TIMER
*/
// Create a timer that will countdown from 60 seconds when the quiz starts
var timer;
var timeLeft;
function countdown() {
    timeLeft--;
    console.log("I'm still running!");
    if (timeLeft > 9) {
        timeLeftEl.innerText = '0:' + timeLeft + ' seconds remaining';
    }
    else if (timeLeft > 2) {
        timeLeftEl.innerText = '0:0' + timeLeft + ' seconds remaining';
    }
    else if (timeLeft === 2) {
        timeLeftEl.innerText = '0:0' + timeLeft + ' second remaining';
    }
    else {
        timeLeftEl.innerHTML = "Time's up!";
        scoreStatusEl.innerText = "Final Score:"
        restartQuiz();
        clearInterval(timer);
    }
}
/* -------------------------------------------------------------------------------------------
// SCORE TRACKING
*/
// update scoreboard on page load and when a new score is saved
function updateScoreboard() {
    scoreList.innerHTML = "";
    for (let i = 0; i < savedScores.length; i++) {
        var record = document.createElement("li");
        record.innerText = savedScores[i];
        scoreList.appendChild(record);
    }
}
function saveScore(event) {
    event.preventDefault();
    savedScores.push(initialsEl.value + " - " + score);
    localStorage.setItem('saved-scores', JSON.stringify(savedScores));
    updateScoreboard();
}

// Check for scores in local storage and if they exist, put them on the scoreboard
if  (localStorage.getItem('saved-scores') === null) {
    scoreboardEl.innerText = "No scores saved yet."
}
else {
    savedScores = JSON.parse(localStorage.getItem('saved-scores'));
    scoreboardEl.appendChild(scoreList);
    updateScoreboard();
}






function startQuiz() {
    quizButtonEl.innerText = "I give up ☹️"

    // reset score
    score = 0;
    currentScore.innerText = score;
    scoreStatusEl.innerText = "Current Score:"

    // start the timer
    timeLeft = 60;
    timer = setInterval(countdown, 1000);

    // present questions
    questionNumber = 0;
    presentQuestions();
}

function restartQuiz() {
    quizButtonEl.innerText = "Try again";
    scoreFormEl.classList.toggle("hide");
}



quizButtonEl.addEventListener('click', startQuiz);
scoreFormEl.addEventListener('submit', saveScore);
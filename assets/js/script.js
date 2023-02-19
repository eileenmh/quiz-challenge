/* -------------------------------------------------------------------------------------------
// MULTIPLE CHOICE QUESTIONS
*/
// Create multiple-choice-question objects
function mcObject(question, options, answer) {
    this.question = question;
    this.answerOptions = options;
    this.correctAnswer = answer;
}

var question1 = new mcObject("Question 1 Text", ['q1 - option 1', 'q1 - option 2', 'q1 - option 3', 'q1 - option 4'], "q1 - option 3");
var question2 = new mcObject("Question 2 Text", ['q2 - option 1', 'q2 - option 2', 'q2 - option 3', 'q2 - option 4'], "q2 - option 1");
var question3 = new mcObject("Question 3 Text", ['q3 - option 1', 'q3 - option 2', 'q3 - option 3', 'q3 - option 4'], "q3 - option 4");

 // array created in order to pass through one question after another - see presentQuestions()
var mcQuestions = [question1, question2, question3];

// On quiz start, present the first question; once answer is received, present second question; etc. When there are no more questions, end the quiz.
var questionEl = document.querySelector("#question");
var mcOptionsEl = document.querySelector('#mc-options');
var questionNumber; // used to compare how many questions the for loop in presentQuestions() has gone through to how many question exist.

function presentQuestions() {
    mcOptionsEl.innerHTML = "";
    if (questionNumber < mcQuestions.length) {
        questionEl.innerText = mcQuestions[questionNumber].question;

        for (let i = 0; i < mcQuestions[questionNumber].answerOptions.length; i++) {
             var answerOption = document.createElement("button");
             answerOption.innerText = mcQuestions[questionNumber].answerOptions[i];
             answerOption.classList.add("mb-3");
             answerOption.classList.add("w-100");
             mcOptionsEl.appendChild(answerOption);
             answerOption.addEventListener('click',checkAnswer);
        }
    }
    else {
        endQuiz();
    }
}

// Compare selected answer to actual answer and increase score by one if correct, deduct 5 seconds from timer if incorrect
function checkAnswer (event) {
    var answerValidity;
    answerValidity = event.srcElement.textContent === mcQuestions[questionNumber].correctAnswer;
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
var timer;
var timeLeft;
var timeLeftEl = document.querySelector("#time-left");

// Create a timer that will countdown from 60 seconds when the quiz starts. If timer hits zero, the quiz ends.
function countdown() {
    timeLeft--;
    if (timeLeft > 9) {
        timeLeftEl.innerText = '0:' + timeLeft + ' seconds remaining';
    }
    else if (timeLeft >= 2) {
        timeLeftEl.innerText = '0:0' + timeLeft + ' seconds remaining';
    }
    else if (timeLeft === 1) {
        timeLeftEl.innerText = '0:0' + timeLeft + ' second remaining';
    }
    else {
        endQuiz();
    }
}
/* -------------------------------------------------------------------------------------------
// SCORE TRACKING
*/
var score;
var savedScores = [];
var scoreStatusEl = document.querySelector("#score-status")
var currentScore = document.querySelector('#current-score');



// once the quiz is complete, user has option to save their score to the scoreboard; saved scores are stored in local storage
var initialsEl = document.getElementById("initials");
var scoreFormEl = document.querySelector('#submit-score');
scoreFormEl.addEventListener('submit', saveScore);

function saveScore(event) {
    event.preventDefault();
    scoreFormEl.classList.toggle("hide");
    savedScores.push(initialsEl.value + " - " + score);
    localStorage.setItem('saved-scores', JSON.stringify(savedScores));
    updateScoreboard();
}

// On page load, check for scores in local storage and if they exist, put them on the scoreboard
var scoreboardEl = document.getElementById("scorelist");
var scoreList = document.createElement("ol");

if  (localStorage.getItem('saved-scores') === null) {
    scoreboardEl.innerText = "No scores saved yet."
}
else {
    savedScores = JSON.parse(localStorage.getItem('saved-scores'));
    scoreboardEl.appendChild(scoreList);
    updateScoreboard();
}

// the scoreboard is updated on page load and when a new score is saved
function updateScoreboard() {
    scoreList.innerHTML = "";
    scoreboardEl.appendChild(scoreList);
    for (let i = 0; i < savedScores.length; i++) {
        var record = document.createElement("li");
        record.innerText = savedScores[i];
        scoreList.appendChild(record);
    }
}

/* -------------------------------------------------------------------------------------------
// RUN THE QUIZ
*/
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

function endQuiz() {
    if (timeLeft < 1) {
        timeLeftEl.innerHTML = "Time's up!";
    }
    else {
        timeLeftEl.innerHTML = "All done!";
    }
    scoreStatusEl.innerText = "Final Score:";
    clearInterval(timer);
}

var quizButtonEl = document.querySelector("#quiz-button");
quizButtonEl.addEventListener('click', startQuiz);

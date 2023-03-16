/* -------------------------------------------------------------------------------------------
RESPONSIVE DESIGN
*/

/* -------------------------------------------------------------------------------------------
MULTIPLE CHOICE QUESTIONS
*/
// Create multiple-choice-question objects
function mcQuestion(question, options, answer) {
  this.question = question;
  this.answerOptions = options;
  this.correctAnswer = answer;
}

var question1 = new mcQuestion(
  "Question 1 Text",
  ["q1 - option 1", "q1 - option 2", "q1 - option 3", "q1 - option 4"],
  "q1 - option 3"
);

var question2 = new mcQuestion(
  "Question 2 Text",
  ["q2 - option 1", "q2 - option 2", "q2 - option 3", "q2 - option 4"],
  "q2 - option 1"
);

var question3 = new mcQuestion(
  "Question 3 Text",
  ["q3 - option 1", "q3 - option 2", "q3 - option 3", "q3 - option 4"],
  "q3 - option 4"
);

// array created in order to present one question after another - see presentQuestions()
var allQuestions = [question1, question2, question3];

// On quiz start, present the first question; once answer is received, present second question; etc.
var questionNumber; // used to compare how many questions the for loop in presentQuestions() has gone through to how many question exist.
var answerValidity; // used to check chosen answer against actual answer

function presentQuestions() {
  // check if there are more questions to go through; if not, end the quiz
  if (questionNumber < allQuestions.length) {
    document.querySelector("#question").innerText =
      allQuestions[questionNumber].question;
    document.querySelector("#mc-options").innerHTML = "";
    document.querySelector("#last-answer").innerText = "";

    for (
      let i = 0;
      i < allQuestions[questionNumber].answerOptions.length;
      i++
    ) {
      var answerOption = document.createElement("button");
      answerOption.innerText = allQuestions[questionNumber].answerOptions[i];
      answerOption.classList.add(
        "mb-3",
        "w-100",
        "list-group-item",
        "list-group-item-action",
        "answer-options",
        "rounded",
        "border"
      );

      document.querySelector("#mc-options").appendChild(answerOption);
      answerOption.addEventListener("click", checkAnswer);
    }
  } else {
    endQuiz();
  }
}

// Compare selected answer to actual answer and increase score by one if correct, deduct 5 seconds from timer if incorrect
function checkAnswer(event) {
  var answerOptions = document.getElementsByClassName("answer-options");
  for (let i = 0; i < answerOptions.length; i++) {
    answerOptions[i].disabled = true;
  }
  answerValidity =
    event.srcElement.textContent === allQuestions[questionNumber].correctAnswer;
  if (answerValidity) {
    document.querySelector("#last-answer").innerText = "Correct! ✅";
    score++;
  } else {
    document.querySelector("#last-answer").innerText =
      "Wrong! 5 seconds deducted from timer. ⏳";
    timeLeft -= 5;
  }
  currentScore.innerText = score;
  questionNumber++;
  setTimeout(presentQuestions, 2000);
}

/* -------------------------------------------------------------------------------------------
TIMER
*/
var timer;
var timeLeft;
var timeLeftEl = document.querySelector("#time-left");

// Create a timer that will countdown from 60 seconds when the quiz starts. If timer hits zero, the quiz ends.
function countdown() {
  timeLeft--;
  if (timeLeft > 9) {
    timeLeftEl.innerText = "0:" + timeLeft + " seconds remaining";
  } else if (timeLeft >= 2) {
    timeLeftEl.innerText = "0:0" + timeLeft + " seconds remaining";
  } else if (timeLeft === 1) {
    timeLeftEl.innerText = "0:0" + timeLeft + " second remaining";
  } else {
    endQuiz();
  }
}
/* -------------------------------------------------------------------------------------------
SCORE TRACKING
*/
var score = 0;
var savedScores = [];
var scoreStatusEl = document.querySelector("#score-status");
var currentScore = document.querySelector("#current-score");

// once the quiz is complete, user has option to save their score to the scoreboard; saved scores are stored in local storage
var initialsEl = document.getElementById("initials");
var scoreFormEl = document.querySelector("#submit-score");
scoreFormEl.addEventListener("submit", saveScore);

function saveScore(event) {
  event.preventDefault();
  scoreFormEl.classList.toggle("hide");
  savedScores.push(initialsEl.value + " - " + score);
  localStorage.setItem("saved-scores", JSON.stringify(savedScores));
  updateScoreboard();
}

// On page load, check for scores in local storage and if they exist, put them on the scoreboard
var scoreboardEl = document.getElementById("scorelist");
var scoreList = document.createElement("ol");

if (localStorage.getItem("saved-scores") === null) {
  scoreboardEl.innerText = "No scores saved yet.";
} else {
  savedScores = JSON.parse(localStorage.getItem("saved-scores"));
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
RUN THE QUIZ
*/
var quizActive = false;

function startQuiz() {
  quizActive = true;
  quizButtonEl.innerText = "I give up ☹️";

  // set current score
  currentScore.innerText = score;
  scoreStatusEl.innerText = "Current Score:";

  // start the timer
  timeLeftEl.innerText = "1:00 minute remaining";
  timeLeft = 60;
  timer = setInterval(countdown, 1000);

  // present questions
  questionNumber = 0;
  presentQuestions();
}

function endQuiz() {
  quizActive = false;
  clearInterval(timer);
  if (timeLeft < 1) {
    timeLeftEl.innerText = "Time's up!";
  } else {
    timeLeftEl.innerText = "All done!";
  }
  scoreStatusEl.innerText = "Final Score:";
  scoreFormEl.classList.toggle("hide"); // reveal the score form

  // Reset questions
  document.querySelector("#question").innerText = "";
  document.querySelector("#mc-options").innerHTML = "";
  document.querySelector("#last-answer").innerText = "";

  // Reset quiz
  quizButtonEl.innerText = "Try again";
  score = 0;
}

function runQuiz() {
  if (quizActive) {
    endQuiz();
  } else {
    startQuiz();
  }
}

var quizButtonEl = document.querySelector("#quiz-button");
quizButtonEl.addEventListener("click", runQuiz);

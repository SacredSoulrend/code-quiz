// Quiz questions and answers
const quizQuestions = [
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    choices: ["a) variable = 10", "b) var variable = 10", "c) var variable : 10", "d) int variable = 10"],
    correctAnswer: "b) var variable = 10"
  },
  {
    question: "How do you add a comment in JavaScript?",
    choices: ["a) * This is a comment *", "b) <!-- This is a comment -->", "c) // This is a comment", "d) # This is a comment"],
    correctAnswer: "c) // This is a comment"
  },
  {
    question: "How do you add a new element to the end of an array in JavaScript?",
    choices: ["a) array.add(element)", "b) array.push(element)", "c) array.append(element)", "d) array(end, element)"],
    correctAnswer: "b) array.push(element)"
  },
  {
    question: "How do you check the data type of a variable in JavaScript?",
    choices: ["a) typeof variable", "b) typeOf(variable)", "c) variable.type()", "d) type(variable)"],
    correctAnswer: "a) typeof variable"
  },
  {
    question: "Question: What does the === operator do in JavaScript?",
    choices: ["a) Compares values for equality, but not data type", "b) Compares both value and data type", "c) Assigns a value to a variable", "d) Checks if a variable is defined"],
    correctAnswer: "b) Compares both value and data type"
  },
];

let correctAnswersCount = 0;
let wrongAnswersCount = 0;
let currentQuestionIndex = 0;
let time = 60;
let timerInterval;

// Start button event listener
document.getElementById("start").addEventListener("click", startQuiz);

//Start quiz function
function startQuiz() {
  document.getElementById("start").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  displayQuestion();
  startTimer();
}

function displayQuestion() {
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const currentQuestion = quizQuestions[currentQuestionIndex];

  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";

  currentQuestion.choices.forEach(choice => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener("click", () => checkAnswer(choice));
    choicesElement.appendChild(li);
  });
}

//Check answer function *make sure to add if/else statements*
function checkAnswer(choice) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const resultMessageElement = document.getElementById("result-message");

  if (choice === currentQuestion.correctAnswer) {
    resultMessageElement.textContent = "Correct!";
    correctAnswersCount++; // Increment correct answers count
  } else {
    resultMessageElement.textContent = "Wrong!";
    wrongAnswersCount++; // Increment wrong answers count
    time -= 10; // Subtract 10 seconds from the timer for wrong answers
  }

  currentQuestionIndex++;
  if (currentQuestionIndex === quizQuestions.length) {
    setTimeout(endQuiz, 1000);
  } else {
    setTimeout(displayQuestion, 100);
  }
}

//Timer function *use setInterval to count down the time*
function startTimer() {
  timerInterval = setInterval(() => {
    time--;
    document.getElementById("time").textContent = time;
    if (time <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Functiomn to calculate score
function calculateScore(correctCount, wrongCount) {
  var totalQuestions = correctCount + wrongCount;
  var scorePercentage = (correctCount / totalQuestions) * 100;
  return scorePercentage;
}

//End quiz function
function endQuiz() {
  clearInterval(timerInterval);
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("score-container").style.display = "block";

  var score = calculateScore(correctAnswersCount, wrongAnswersCount);

  var scoreElement = document.getElementById("final-score");
  scoreElement.textContent = `Your Score: ${score}%`;
}

// Form submit event listener for saving initials and score
document.querySelector("form").addEventListener("submit", saveScore);

function saveScore(event) {
  event.preventDefault();
  const initials = document.getElementById("initials").value;
  const scorePercentage = calculateScore(correctAnswersCount, wrongAnswersCount); // Calculate the percentage score
  // Save initials and score in local storage
  localStorage.setItem("initials", initials);
  localStorage.setItem("score", scorePercentage);
  alert("Score saved! You can play again if you'd like.");
  resetQuiz();
}

//Reset quiz function
function resetQuiz() {
  correctAnswersCount = 0;
  wrongAnswersCount = 0;
  currentQuestionIndex = 0;
  time = 60;
  document.getElementById("start").style.display = "block";
  document.getElementById("score-container").style.display = "none";
  document.getElementById("timer").style.display = "block";
}

// Event listener for the "Display High Scores" button
document.getElementById("display-scores").addEventListener("click", displayHighScores);

// Function to display high scores
function displayHighScores() {
  const savedInitials = localStorage.getItem("initials");
  const savedScore = localStorage.getItem("score");

  if (savedInitials && savedScore) {
    const highScoresContainer = document.getElementById("high-scores-container");
    highScoresContainer.innerHTML = `<p>${savedInitials}: ${savedScore}%</p>`;
    highScoresContainer.style.display = "block";
  } else {
    alert("No high scores found. Play the quiz and save your score first!");
  }
}



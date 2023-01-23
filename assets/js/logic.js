// Initialize variables
let currentQuestion = 0;
let score = 0;
let timer = 50;
let intervalId;

// Get elements from HTML
const startButton = document.getElementById("start");
const questionTitle = document.getElementById("question-title");
const choices = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const finalScore = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const timeSpan = document.getElementById("time");


// Add click event listener to start button
startButton.addEventListener("click", startQuiz);

// Start quiz function
function startQuiz() {
  // Hide start screen
  document.getElementById("start-screen").classList.add("hide");
  // Show questions
  document.getElementById("questions").classList.remove("hide");
  // Start timer
  let intervalId = setInterval(function() {
    if(timer > 0){
      timer--;
      timeSpan.textContent = timer;
    }
    if (timer === 0) {
      endQuiz();
    }
  }, 1000);
  
  // Display first question
  displayQuestion();
}


// Display question function
function displayQuestion() {
    // Get current question
    const current = questions[currentQuestion];
    // Display question title
    questionTitle.textContent = current.title;
    // Clear previous choices
    choices.innerHTML = "";
    // Display choices
    current.choices.forEach(function(choice, index) {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choiceButton.addEventListener("click", function() {
        // Check if answer is correct
        if (index === current.answer) {
          // Update score
          score++;
          feedback.textContent = "Correct!";
          feedback.classList.remove("hide");
        } else {
          // Subtract time
          timer -= 10;
          feedback.textContent = "Incorrect!";
          feedback.classList.remove("hide");
        }
        // Go to next question
        currentQuestion++;
        if (currentQuestion === questions.length) {
          endQuiz();
        } else {
          displayQuestion();
        }
      });
      choices.appendChild(choiceButton);
    });
}
  
  // End quiz function
  function endQuiz() {
    // Hide questions
    document.getElementById("questions").classList.add("hide");
    // Show end screen
    document.getElementById("end-screen").classList.remove("hide");
    // Display final score
    finalScore.textContent = score;
    // Store the score in local storage
    localStorage.setItem('score', score);
    // Show final score
    document.getElementById("final-score").classList.remove("hide");
    // Show initials input
    document.getElementById("initials").classList.remove("hide");
    // Show submit button
    document.getElementById("submit").classList.remove("hide");
  }
  
// Add click event listener to submit button
submitButton.addEventListener("click", function() {
    // Get initials
    const initials = initialsInput.value;

    // Save score and initials to local storage
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push({
      initials: initials,
      score: score
    });
    localStorage.setItem("highscores", JSON.stringify(highscores));
    // Go to highscores page
    location.href = "highscores.html";
  });
  
    // Get elements from HTML
    document.addEventListener("DOMContentLoaded", function(){
        const clearButton = document.getElementById("clear");
        clearButton.addEventListener("click", function() {
          localStorage.removeItem("highscores");
          highscoresList.innerHTML = "";
        });
      });


const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const endContainer = document.getElementById("end-container");
const scoreEl = document.getElementById("score");
const saveButton = document.getElementById("save-button");
const initialsEl = document.getElementById("initials");
const timerEl = document.getElementById("timer");

let currentQuestionIndex = 0;
let timeLeft = 60;
let score = 0;

const questions = [
    {
        question: "What is the leading cause of global warming?",
        choices: [
            "Volcanic activity",
            "Solar radiation",
            "Human activity",
            "Meteor impacts"
        ],
        answer: "Human activity"
    },
    {
        question: "Which gas is responsible for the majority of the warming effect in the atmosphere?",
        choices: [
            "Oxygen",
            "Carbon dioxide",
            "Methane",
            "Nitrogen"
        ],
        answer: "Carbon dioxide"
    },
    {
        question: "Which sector is responsible for the majority of carbon dioxide emissions?",
        choices: [
            "Transportation",
            "Agriculture",
            "Energy production",
            "Industry"
        ],
        answer: "Energy production"
    },
    {
        question: "Which country is the largest historical emitter of greenhouse gases?",
        choices: [
            "United States",
            "China",
            "Russia",
            "India"
        ],
        answer: "United States"
    },
    {
        question: "Which action can an individual take to reduce their carbon footprint?",
        choices: [
            "Driving a fuel-efficient car",
            "Eating a plant-based diet",
            "Installing solar panels",
            "All of the above"
        ],
        answer: "All of the above"
    },
];

function startQuiz() {
    // Hide start button and show quiz container
    document.getElementById("start-container").style.display = "none";
    quizContainer.classList.remove("hide");

    // Start the timer
    setTime();
    setInterval(setTime, 1000);

    // Show the first question
    showQuestion();
}

function setTime() {
    timerEl.textContent = "Time: " + timeLeft;
    timeLeft--;

    if (timeLeft < 0) {
        endQuiz();
    }
}

function showQuestion() {
    // Get current question object
    const currentQuestion = questions[currentQuestionIndex];

    // Update question text
    questionEl.textContent = currentQuestion.question;

    // Clear previous choices
    choicesEl.innerHTML = "";

    // Show choices for current question
    currentQuestion.choices.forEach(choice => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent =

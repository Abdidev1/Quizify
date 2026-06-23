const answerOptions = document.querySelector(".answer-options");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const questionStatus = document.querySelector(".question-status");

const QUIZ_TIME_LIMIT = 15;
let currentTime = QUIZ_TIME_LIMIT;
let timer = null;
let quizCategory = "programming";
let numberOfQuestions = 5;
let currentQuestion = null;
const questionsIndexHistory = [];

const startTimer = () => {

}

const getRandomQuestion = () => {
    const categoryQuestions = questions.find(cat => cat.category.toLowerCase() === quizCategory.toLowerCase()).questions || [];

    if(questionsIndexHistory.length >= Math.min(categoryQuestions.length, numberOfQuestions)) {
        return console.log("Quiz Completed!");
    }

    const availableQuestion = categoryQuestions.filter((_, index) => !questionsIndexHistory.includes(index));
    const RandomQuestion = availableQuestion[Math.floor(Math.random() * categoryQuestions.length)];

    questionsIndexHistory.push(categoryQuestions.indexOf(RandomQuestion));
    return RandomQuestion;
}

const highlightCorrectAnswer = () => {
    const CorrectOption = answerOptions.querySelectorAll(".answer-option")[currentQuestion.correctAnswer];
    CorrectOption.classList.add("correct");
    const iconHTML = `<span class="material-symbols-rounded">check_circle</span`;
    CorrectOption.insertAdjacentHTML("beforeend", iconHTML);
}

const handleAnswer = (option, answerIndex) => {
    const isCorrect = currentQuestion.correctAnswer === answerIndex;
    option.classList.add(isCorrect ? 'correct' : 'incorrect');
    !isCorrect ? highlightCorrectAnswer() : "";

    const iconHTML = `<span class="material-symbols-rounded">${isCorrect ? 'check_circle' : 'cancel'}</span>`;
    option.insertAdjacentHTML("beforeend", iconHTML);

    answerOptions.querySelectorAll(".answer-option").forEach(option => option.style.pointerEvents = "none");

    nextQuestionBtn.style.visibility = "visible";   
}

const renderQuestion = () => {
    currentQuestion = getRandomQuestion();
    if(!currentQuestion) return;
    console.log(currentQuestion);
    
    answerOptions.innerHTML = "";
    nextQuestionBtn.style.visibility = "hidden";
    document.querySelector(".question-text").textContent = currentQuestion.question;
    questionStatus.innerHTML = `<b>${questionsIndexHistory.length}</b> of <b>${numberOfQuestions}</b> Questions`;

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.classList.add("answer-option");
        li.textContent = option;
        answerOptions.appendChild(li)
        li.addEventListener("click", () => handleAnswer(li, index));
    });
}

renderQuestion();

nextQuestionBtn.addEventListener("click", renderQuestion);
const answerOptions = document.querySelector(".answer-options");


let quizCategory = "programming";

const getRandomQuestion = () => {
    const categoryQuestions = questions.find(cat => cat.category.toLowerCase === quizcategory.toLowerCase()).questions;

    const RandomQuestion = categoryQuestions(Math.floor(Math.random() * categoryQuestions.length));
    return RandomQuestion;
}

const renderQuestion = () => {
    const currentQuestion = getRandomQuestion();
    if(!currentQuestion) return;
    
    answerOptions.innerHTML = "";
    document.querySelector(".question-text").textContent = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        li.classList.add("answer-option");
        li.textContent = option;
        answerOptions.appendChild(li)
    });
}

renderQuestion();

const questions=[
    {
        question: "What are the two main types of functions in Python?",
        answers: [
            { text: "System function", correct: false},
            { text: "Custom function", correct: false},
            { text: "Built-in function & User defined function", correct: true},
            { text: "User function", correct: false},
        ]
    },
    {
        question: "What is the maximum possible length of an identifier in Python?",
        answers: [
            { text: "79 characters", correct: false},
            { text: "31 characters", correct: false},
            { text: "63 characters", correct: false},
            { text: "none of the mentioned", correct: true},
        ]
    },
    {
        question: "Which one of the following is not a keyword in Python language?",
        answers: [
            { text: "eval", correct: true},
            { text: "pass", correct: false},
            { text: "assert", correct: false},
            { text: "nonlocal", correct: false},
            
        ]
    },
    {
        question: " All keywords in Python are in ___?",
        answers: [
            { text: " Capitalized", correct: true},
            { text: "lower case", correct: false},
            { text: "UPPER CASE", correct: false},
            { text: "None of the mentioned", correct: false},
            
        ]
    },
    {
        question: "Which of the following functions is a built-in function in python?",
        answers: [
            { text: " factorial()", correct: false},
            { text: " print()", correct: true},
            { text: "seed()", correct: false},
            { text: "sqrt()", correct: false},
            
        ]
    }
];

const questionElement =document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score =0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);

    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore() {
    resetState();
    const questionElement = document.getElementById("question");
    const nextButton = document.getElementById("next-btn");
  
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!!!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }


function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
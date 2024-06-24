let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let lyricsContainer = document.getElementById("lyrics-container");
let questionCount;
let scoreCount = 0;
let count = 20;
let countdown;

// Static questions and options array
const quizArray = [
    {
        id: "0",
        lyrics: "Djadja, tu deviens bizarre, dis-moi c'est quoi ton blem ?",
        question: "Quelle chanson d'Aya Nakamura contient la phrase 'Djadja, tu deviens bizarre, dis-moi c'est quoi ton blem ?'",
        options: ["Pookie", "Djadja", "Copines"],
        correct: "Djadja",
    },
    {
        id: "1",
        lyrics: "Comme un seul coup de tison, c'est toi qui allumes la flamme",
        question: "Quelle chanson de Tayc contient la phrase 'Comme un seul coup de tison, c'est toi qui allumes la flamme' ?",
        options: ["N'y pense plus", "Le temps", "Promis juré"],
        correct: "N'y pense plus",
    },
    {
        id: "2",
        lyrics: "J'suis comme un aimant, j't'attire et toi t'y résistes",
        question: "Quelle chanson de Maître Gims contient la phrase 'J'suis comme un aimant, j't'attire et toi t'y résistes' ?",
        options: ["Sapés comme jamais", "Bella", "Est-ce que tu m'aimes ?"],
        correct: "Est-ce que tu m'aimes ?",
    },
    {
        id: "3",
        lyrics: "I'm everything I am because you loved me",
        question: "Quelle chanson de Céline Dion contient la phrase 'I'm everything I am because you loved me' ?",
        options: ["My Heart Will Go On", "The Power of Love", "Because You Loved Me"],
        correct: "Because You Loved Me",
    },
    {
        id: "4",
        lyrics: "Belle, tu es si belle, si belle que j'en tremble",
        question: "Quelle chanson de Garou contient la phrase 'Belle, tu es si belle, si belle que j'en tremble' ?",
        options: ["Belle", "Seul", "Gitan"],
        correct: "Belle",
    },
    {
        id: "5",
        lyrics: "For me, formidable",
        question: "Quelle chanson de Charles Aznavour contient la phrase 'For me, formidable' ?",
        options: ["Emmenez-moi", "La Bohème", "For me, formidable"],
        correct: "For me, formidable",
    },
    {
        id: "6",
        lyrics: "Quand je vois tes yeux qui traînent sur mon corps, j'ai du mal à me retenir",
        question: "Quelle chanson de Dalida contient la phrase 'Quand je vois tes yeux qui traînent sur mon corps, j'ai du mal à me retenir' ?",
        options: ["Gigi l'amoroso", "Paroles paroles", "Je suis malade"],
        correct: "Gigi l'amoroso",
    },
    {
        id: "7",
        lyrics: "Just a small town girl, living in a...",
        question: "Complétez les paroles de cette chanson des années 80 : 'Just a small town girl, living in a...' ?",
        options: ["lonely world", "big city", "lonely town"],
        correct: "lonely world",
    },
    {
        id: "8",
        lyrics: "Don't stop believin', hold on to that...",
        question: "Complétez les paroles de cette chanson des années 80 : 'Don't stop believin', hold on to that...' ?",
        options: ["feeling", "dream", "moment"],
        correct: "feeling",
    },
    {
        id: "9",
        lyrics: "Eye of the Tiger",
        question: "Quel groupe américain a sorti la chanson 'Eye of the Tiger' en 1982 ?",
        options: ["Survivor", "Journey", "Foreigner"],
        correct: "Survivor",
    },
];

// Function to fetch quiz data from OpenAI API
async function fetchQuizData() {
    try {
        const response = await fetch('https://api.openai.com/v1/quiz', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data.quizArray; // Assuming the API returns an array of quiz questions
    } catch (error) {
        console.error('Error fetching quiz data:', error);
        return quizArray; // Fallback to static data if there's an error
    }
}

// Function to initialize quiz data
async function initializeQuizData() {
    if (navigator.onLine) {
        // Fetch data from OpenAI API
        const data = await fetchQuizData();
        quizArray = data.length ? data : quizArray; // Use fetched data if available
    } else {
        // Use static data
        quizArray = quizArray;
    }
    initial();
}

// Event listener for restarting the quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

// Event listener for next button
nextBtn.addEventListener("click", (displayNext = () => {
    questionCount += 1;
    if (questionCount == quizArray.length) {
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = "Votre score est de " + scoreCount + " sur " + questionCount;
    } else {
        countOfQuestion.innerHTML = (questionCount + 1) + " of " + quizArray.length + " Question";
        quizDisplay(questionCount);
        count = 20;
        clearInterval(countdown);
        timerDisplay();
    }
}));

// Timer display function
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

// Quiz display function
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

// Quiz creation function
function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5);
    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        div.innerHTML += `
            <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        `;
        quizContainer.appendChild(div);
    }
}

// Function to check if the selected option is correct
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}

// Initial configuration function
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 20;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

// Event listener for start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initializeQuizData();
});

// Onload event to hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};

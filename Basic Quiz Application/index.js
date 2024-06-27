class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }

    get currentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    answerQuestion(answer) {
        if (this.currentQuestion.isCorrect(answer)) {
            this.score++;
        }
        this.moveToNextQuestion();
    }

    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }

    isEnded() {
        return this.currentQuestionIndex === this.questions.length;
    }

    getScore() {
        return this.score;
    }

    getPercentage() {
        return (this.score / this.questions.length) * 100;
    }
}

class Question {
    constructor(text, options, correctOptionIndex) {
        this.text = text;
        this.options = options;
        this.correctOptionIndex = correctOptionIndex;
    }

    isCorrect(answerIndex) {
        return answerIndex === this.correctOptionIndex;
    }
}

class QuizUI {
    constructor(quiz) {
        this.quiz = quiz;
        this.quizElem = document.getElementById("quiz");
        this.questionElem = document.getElementById("question");
        this.progressElem = document.getElementById("progress");
        this.attachButtonListeners();
        this.displayQuestion();
    }

    displayQuestion() {
        if (this.quiz.isEnded()) {
            this.showScores();
        } else {
            const question = this.quiz.currentQuestion;
            this.questionElem.innerText = question.text;
            this.displayOptions(question.options);
            this.showProgress();
        }
    }

    displayOptions(options) {
        const choices = Array.from(this.quizElem.querySelectorAll(".buttons button span"));
        choices.forEach((choiceElem, index) => {
            choiceElem.innerText = options[index];
        });
    }

    showProgress() {
        this.progressElem.innerText = `Question ${this.quiz.currentQuestionIndex + 1} of ${this.quiz.questions.length}`;
    }

    attachButtonListeners() {
        const buttons = Array.from(this.quizElem.querySelectorAll(".buttons button"));
        buttons.forEach((button, index) => {
            button.addEventListener("click", () => {
                this.quiz.answerQuestion(index);
                this.displayQuestion();
            });
        });
    }

    showScores() {
        const result = `
            <h1>Result</h1>
            <h2 id="score">Thank you! Here are your results: <br>
            Score: ${this.quiz.getScore()}/${this.quiz.questions.length} <br>
            Marks percentage: ${this.quiz.getPercentage()}%
            </h2>`;
        this.quizElem.innerHTML = result;
    }
}

const questions = [
    new Question("What is the correct way to declare a constant variable in JavaScript?",
                ["var PI = 3.14;", "let radius = 5;", "const PI = 3.14;", "final PI = 3.14;"],
                2),
    new Question("Which of the following correctly checks if a variable is undefined?",
                ["if (x === undefined)", "if (x == undefined)", "if (x != undefined", "if (x)"],
                0),
    new Question("What is the purpose of SQL 'INSERT INTO' statement?",
                ["To delete data from a table", "To update existing data into a table", "To add new data into a table", "To select data from a table"],
                2),
    new Question("What is the purpose of the this keyword in JavaScript?",
                ["To declare a global variable", "To reference the current object", "To define a function", "To loop through an array"],
                1),
    new Question("What does CSS stand for?",
                ["Cascading Style Sheets", "Creative Style Syntax", "Colorful Style System", "Computer Style Sheets"],
                0)
];

const quiz = new Quiz(questions);
const quizUI = new QuizUI(quiz);

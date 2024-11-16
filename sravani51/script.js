// Carousel Logic
let currentIndex = 0;
const carouselItems = document.querySelectorAll('.carousel-item');

function moveCarousel(direction) {
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = carouselItems.length - 1;
    } else if (currentIndex >= carouselItems.length) {
        currentIndex = 0;
    }

    updateCarousel();
}

function updateCarousel() {
    const offset = -currentIndex * 100; // Move the carousel to the left by the width of each item
    const container = document.querySelector('.carousel-container');
    container.style.transform = `translateX(${offset}%)`;
}

// Initialize carousel by default showing the first item
updateCarousel();

// Quiz and Joke functionality remain unchanged as previously provided
// Interactive Quiz with multiple questions and correct answers
let currentQuestionIndex = 0;
let score = 0;

const quizQuestions = [
    {
        question: "Which flavor is typically made from vanilla beans?",
        answers: ['Chocolate', 'Vanilla', 'Strawberry'],
        correctAnswer: 'Vanilla'
    },
    {
        question: "Which ice cream flavor is known for its minty taste?",
        answers: ['Mint Chocolate Chip', 'Cookies and Cream', 'Butter Pecan'],
        correctAnswer: 'Mint Chocolate Chip'
    },
    {
        question: "Which ice cream flavor is associated with a tropical fruit?",
        answers: ['Mango', 'Vanilla', 'Chocolate'],
        correctAnswer: 'Mango'
    },
    {
        question: "Which of these is a dairy-free ice cream option?",
        answers: ['Almond Milk Ice Cream', 'Chocolate Ice Cream', 'Strawberry Ice Cream'],
        correctAnswer: 'Almond Milk Ice Cream'
    },
    {
        question: "What is the primary ingredient in sorbet?",
        answers: ['Milk', 'Fruit', 'Eggs'],
        correctAnswer: 'Fruit'
    }
];

// Function to show the current question
function showNextQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const questionData = quizQuestions[currentQuestionIndex];
        document.getElementById('question').innerText = questionData.question;
        const buttons = document.querySelectorAll('.quiz button');
        
        buttons.forEach((button, index) => {
            button.innerText = questionData.answers[index];
            button.disabled = false;  // Enable buttons for each new question
        });
    } else {
        alert('Quiz complete! Your score is: ' + score + '/' + quizQuestions.length);
        currentQuestionIndex = 0;  // Reset quiz for now (or you can add another action)
        score = 0; // Reset score
    }
}

// Function to handle the answer selection
function answer(selectedAnswer) {
    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;
    const buttons = document.querySelectorAll('.quiz button');
    
    // Disable the buttons to prevent further clicks
    buttons.forEach(button => {
        button.disabled = true;
    });

    // Check if the selected answer is correct
    if (selectedAnswer === correctAnswer) {
        score++;  // Increase score for correct answer
        alert('Correct!');
    } else {
        alert('Wrong answer! The correct answer is: ' + correctAnswer);
    }

    // Move to the next question
    currentQuestionIndex++;
    setTimeout(() => {
        showNextQuestion();
    }, 1000);  // Wait for 1 second before showing the next question
}

// Initialize quiz
showNextQuestion();

// Fetch Joke from an API
async function fetchJoke() {
    const jokeElement = document.getElementById('joke');
    jokeElement.innerText = 'Loading joke...';

    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await response.json();
        jokeElement.innerText = `${data.setup} - ${data.punchline}`;
    } catch (error) {
        jokeElement.innerText = 'Oops! Something went wrong. Try again.';
    }
}

// Initialize joke on page load
fetchJoke();

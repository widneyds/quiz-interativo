const modeIcon = document.querySelector('.mode-icon');
const html = document.querySelector('html');

const form = document.querySelector('.quiz-form');
const finalScoreContainer = document.querySelector('.final-score-container');
const finalScoreSpan = finalScoreContainer.querySelector('span');
const correctAnswers = ['C', 'A', 'B', 'C', 'D'];

let score = 0;


const changeModeIcon = () => {
    if (modeIcon.classList.contains('fa-moon')) {
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
    } else {
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
    }
}

const toggleBetweenDarkAndLight = () => {
    changeModeIcon();

    html.classList.toggle('dark-mode');
}

const getUserAnswers = () => {
    const userAnswers = correctAnswers.map((userAnswer, index) => {
        return userAnswer = form[`inputQuestion${index + 1}`].value;
    })

    return userAnswers;
}

const calculateUserScore = userAnswers => {
    score = userAnswers.reduce((accumulator, userAnswer, index) => {
        if (userAnswer === correctAnswers[index]) {
            return accumulator += (100 / 5);
        }

        return accumulator;
    }, 0)
}

const showFinalResult = () => {
    finalScoreContainer.classList.remove('d-none');
    scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

const animateFinalResult = () => {
    let counter = 0;
    
    const timer = setInterval(() => {
        if (counter === score) {
            clearInterval(timer);
        }
        
        finalScoreSpan.textContent = `${counter++}%`;
    }, 35 - (score * 0.22))
}

const countAndShowUserScore = event => {
    event.preventDefault();

    const userAnswers = getUserAnswers();

    calculateUserScore(userAnswers);

    showFinalResult();
    
    animateFinalResult();
}


modeIcon.addEventListener('click', toggleBetweenDarkAndLight);
form.addEventListener('submit', countAndShowUserScore);
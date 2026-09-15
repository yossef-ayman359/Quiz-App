// get Quiz card element DOM
const Question      = document.querySelector('.Question');
const options       = document.querySelectorAll('.option');
const sidebarImg    = document.querySelector('.Img img');
// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

// get category and difficulty
const cat           = localStorage.getItem('category');
const diff          = localStorage.getItem('difficulty');
const numberOfQ     = 20; // retrieve from local storage (localStorage.getItem('#Q'))
const totalSeconds  = 15; // retrieve from local storage (localStorage.getItem('QTime'))
// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

// data from init.json
let data = null;
// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

// option button clicked functionality
options.forEach(option => {
    option.addEventListener('click', () => {
        // clear Progress bar
        updateProgressBar(0, true);
        // ـــــــــــــــــــــــــــــــــــــــــــــــــــــ

        const optionValue = option.dataset.value;
        const correctAnswerIndex = data[0].correctAnswer;

        // check if buttons disabled then return, otherwise disable buttons
        if (option.disable)
            return;
        setButtonsDisabled(true);
        // ـــــــــــــــــــــــــــــــــــــــــــــــــــــ

        // Show answer correctness
        if (optionValue == correctAnswerIndex) {
            option.classList.add('btn-success');
        } else {
            option.classList.add('btn-danger');
            options[correctAnswerIndex - 1].classList.add('btn-success');
        }
        // ـــــــــــــــــــــــــــــــــــــــــــــــــــــ
        
        // Show next Question
        // console.log(new Date().toLocaleTimeString());
        setTimeout(nextQuestion, 2000);
        // ـــــــــــــــــــــــــــــــــــــــــــــــــــــ
    })
})

// disable and enable buttons after click
function setButtonsDisabled(isDisabled) {
    options.forEach(btn => btn.disable = isDisabled);
}

// button init state
function resetButtonStatus() {
    options.forEach(btn => btn.classList.remove('btn-danger', 'btn-success', 'disabled'))
}
// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

// select Random Question from data
let qeustionsId = [];
function getRandomQuestion() {
    const availableQuestions = data.filter(item => !qeustionsId.includes(item.id));

    if (availableQuestions.length === 0) {

        return null;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];

    qeustionsId.push(selectedQuestion.id);
    return selectedQuestion;
}
// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

// set card element content based on Random Question
function setCardElements() {
    const randomQuestion = getRandomQuestion();

    if (randomQuestion === null) {
        alert("finish Questions");
        return null;
    }

    Question.textContent = randomQuestion.question;
    options.forEach((option, index) => {
        option.textContent = randomQuestion.options[index];
    });


    if (randomQuestion.image == '') {
        sidebar.classList.add('d-none');
    } else {
        sidebar.classList.remove('d-none');
        sidebarImg.src = randomQuestion.image;
    }
}
// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

// Show next Question
function nextQuestion() {
    // set card element content based on Random Question
    if (setCardElements() === null)
        return;
    // ـــــــــــــــــــــــــــــــــــــــــــــــــــــ

    // start progress bar
    startLoopingProgress();
    // ـــــــــــــــــــــــــــــــــــــــــــــــــــــ

    // enable buttons 
    setButtonsDisabled(false);
    // ـــــــــــــــــــــــــــــــــــــــــــــــــــــ

    // reset button state
    resetButtonStatus();
    // ـــــــــــــــــــــــــــــــــــــــــــــــــــــ
}
// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

// retrieve question data from init.json
async function retrieveData() {
    const response = await fetch('../data/init.json');
    const Data     = await response.json();
    return Data.filter(item => (item.category === cat && item.difficulty === diff) || (item.category === 'init' && item.difficulty === 'init') );
}
// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

// set Theme from local storage
function setTheme(theme) {
    const themeIcon = document.getElementById('theme-icon');

    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
        themeIcon.className = 'bi bi-sun-fill fs-5 text-warning';
    } else {
        themeIcon.className = 'bi bi-moon-stars-fill fs-5 text-dark';
    }
}

// toggle theme
document.getElementById('theme-toggle').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// game setup functionality
document.addEventListener('DOMContentLoaded', async () => {
    window.scrollTo(0, 0);

    // set theme from local storage
    setTheme(localStorage.getItem('theme'));
    // ـــــــــــــــــــــــــــــــــــــــــــــــــــــ

    // retrieve question data from init.json
    data = await retrieveData();
    console.log('Data form json: ', data);
    // ـــــــــــــــــــــــــــــــــــــــــــــــــــــ

    // Show next Question
    nextQuestion();
    // ـــــــــــــــــــــــــــــــــــــــــــــــــــــ
});
// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

// Sidebar toggle functionality
const toggleBtn = document.getElementById('sidebarToggle');
const sidebar   = document.querySelector('.image-sidebar');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});
// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

// back to setup page functionality
document.querySelector('#backSetup').addEventListener('click', _ => {
    localStorage.clear();
    window.location.href = './index.html';
});
// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

// counter progress bar looping functionality
const progressBar       = document.querySelector('.progress-bar');
const progressContainer = document.querySelector('.progress');
let   progressInterval  = null;

const updateProgressBar = (seconds, stop = false) => {
    if (stop) {
        clearInterval(progressInterval);
        return;
    }

    if (progressBar) {
        progressBar.style.width = `${(seconds / totalSeconds) * 100}%`;
        progressBar.textContent = `${seconds} s`;
    }
    if (progressContainer) {
        progressContainer.setAttribute('aria-valuenow', seconds);
    }

    if (seconds >= totalSeconds) {
        clearInterval(progressInterval);
        progressBar.style.setProperty('background-color', '#dc3545', 'important');
        progressBar.classList.add('progress-bar-animated');
        return;
    }
}

function startLoopingProgress() {
    if (progressInterval) clearInterval(progressInterval);

    let progressValue = 0;
    progressBar.style.width = `${(progressValue / totalSeconds) * 100}%`;
    progressBar.textContent = `${progressValue} s`;

    progressInterval = setInterval(() => {
        updateProgressBar(++progressValue);
    }, 1000);
}
// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

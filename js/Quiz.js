// theme toggle functionality
document.addEventListener('DOMContentLoaded', async () => {
    window.scrollTo(0, 0);

    // get category and difficulty
    const cat = localStorage.getItem('category');
    const diff = localStorage.getItem('difficulty');

    // retrieve question data from init.json
    let data = null;
    async function retrieveData() {
        const response = await fetch('../data/init.json');
        const Data = await response.json();
        return Data.filter(item => (item.category === cat || item.category === 'init') && (item.difficulty === diff || item.difficulty === 'init'));
    };
    data = await retrieveData();
    console.log(data);
    
    // get Quiz card element DOM
    const Question = document.querySelector('.Question');
    const options = document.querySelectorAll('.option');
    const sidebarImg = document.querySelector('.Img img');
    
    // set card element content based on retrieved data
    Question.textContent = data[0].question;
    options.forEach((option, index) => {
        option.textContent = data[0].options[index];
    });
    sidebarImg.src = data[0].image;

    // theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            themeIcon.className = 'bi bi-sun-fill fs-5 text-warning';
        } else {
            themeIcon.className = 'bi bi-moon-stars-fill fs-5 text-dark';
        }
    };

    setTheme(localStorage.getItem('theme'));

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
    // ـــــــــــــــــــــــــــــــــــــــــــــــــــــ
});
// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

// Sidebar toggle functionality
const toggleBtn = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.image-sidebar');

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

// Quiz progress bar update function
function updateProgressBar(currentQuestion, totalQuestions) {
    const progressBar = document.querySelector('.progress-bar');
    const progressPercentage = (currentQuestion / totalQuestions) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}
// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

// test progress bar looping functionality by AI
let progressValue = 0;
let progressInterval = null;

function startLoopingProgress() {
    // إلغاء أي عدّاد شغال لمنع تداخل الشغلات
    if (progressInterval) clearInterval(progressInterval);

    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.querySelector('.progress');

    progressInterval = setInterval(() => {
        progressValue++;

        // إعادة التصفير فور تجاوز الـ 100%
        if (progressValue > 100) {
            progressValue = 0;
        }

        // تحديث الـ DOM
        if (progressBar) {
            progressBar.style.width = `${progressValue}%`;
            progressBar.textContent = `${progressValue}%`;
        }
        if (progressContainer) {
            progressContainer.setAttribute('aria-valuenow', progressValue);
        }
    }, 100); // كل 100 ملي ثانية
}

// 1. لتشغيل العدّاد
startLoopingProgress();
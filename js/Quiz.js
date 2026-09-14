// theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);

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


});
// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

const difficulty = localStorage.getItem('quiz_difficulty') || 'easy';
    const category = localStorage.getItem('quiz_category') || 'sports';

    // Call your colleague's function/API using the saved selections
    loadQuizData(difficulty, category);


// Function to fetch questions based on choices
async function loadQuizData(difficulty, category) {
    try {
        // Replace this URL with your colleague's actual API endpoint
        const response = await fetch(`/api/questions?difficulty=${difficulty}&category=${category}`);
        const questions = await response.json();
        
        console.log('Loaded questions for:', difficulty, category, questions);
        // Display first question here...
    } catch (error) {
        console.error('Failed to load quiz questions:', error);
    }
}












// Sidebar toggle functionality
const toggleBtn = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.image-sidebar');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});
// ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ

// back to setup page functionality
document.querySelector('#backSetup').addEventListener('click', _ => {
    
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
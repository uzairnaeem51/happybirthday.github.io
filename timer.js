// Timer functionality for birthday countdown
let countdownInterval;
const targetDate = new Date('January 22, 2026 00:00:00').getTime();

function updateCurrentDateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    const pakistanTime = now.toLocaleString('en-US', {timeZone: 'Asia/Karachi', ...options});
    document.getElementById('currentTime').textContent = 'Pakistan Time: ' + pakistanTime;
    
    const todayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const todayDate = now.toLocaleDateString('en-US', todayOptions);
    document.getElementById('currentDate').textContent = 'Today: ' + todayDate;
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('timer').textContent = 
            days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    } else {
        clearInterval(countdownInterval);
        revealBirthday();
    }
}

function revealBirthday() {
    document.getElementById('countdownScreen').style.display = 'none';
    document.getElementById('wrapper').style.display = 'block';
    const music = document.getElementById("birthdayMusic");
    music.play();
}

// Start the timer
function startTimer() {
    const now = new Date().getTime();
    if (targetDate <= now) {
        // Time has already passed, reveal immediately
        revealBirthday();
    } else {
        // Show countdown
        updateCurrentDateTime();
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
        setInterval(updateCurrentDateTime, 1000); // Update time every second
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', startTimer);
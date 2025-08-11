"use strict";

// Function to get the day of the week from a number
function getDayName(dayNumber) {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return daysOfWeek[dayNumber]; 
}

function updateClock() {
    const now = new Date(); 
    const dateText = now.toLocaleDateString('en-SG'); 
    const timeText = now.toLocaleTimeString('en-SG', { hour12: false }); 

    document.getElementById("date").textContent = `${dateText} ${getDayName(now.getDay())}`;
    document.getElementById("time").textContent = timeText;
}

// Start and update the seconds
function startClock() {
    updateClock(); 
    setInterval(updateClock, 1000); // Update every second
}

// Small clock
function handleScroll() {
    const clockElement = document.getElementById('clock');
    if (window.scrollY > 100) { 
        clockElement.classList.add('small'); 
    } else {
        clockElement.classList.remove('small'); 
    }
}

// adjust the clock size
window.addEventListener('scroll', handleScroll);

startClock();

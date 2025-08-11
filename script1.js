const WORK_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;
const POMODOROS_UNTIL_LONG_BREAK = 4;

const timerDisplay = document.getElementById("timer");
const statusLabel = document.getElementById("status");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const tomatoContainer = document.getElementById("tomato-container");
const progressRing = document.querySelector(".progress-ring-circle");
const modeButtons = document.querySelectorAll(".mode-btn");
const soundToggleBtn = document.getElementById("sound-toggle-btn");

// 🌙 Theme toggle DOM
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const moonIcon = document.getElementById("moon-icon");
const sunIcon = document.getElementById("sun-icon");

let timeLeft = WORK_TIME;
let timerInterval = null;
let isRunning = false;
let isPaused = false;
let currentMode = "work";
let completedPomodoros = 0;
let totalTime = WORK_TIME;
let isMuted = false;

const radius = parseInt(progressRing.getAttribute("r"));
const circumference = 2 * Math.PI * radius;
progressRing.style.strokeDasharray = `${circumference}`;
progressRing.style.strokeDashoffset = `${circumference}`;

// 🌗 Theme toggle logic
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
    localStorage.setItem("theme", "light");
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
  }
}

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function updateProgressRing() {
  const progress = (totalTime - timeLeft) / totalTime;
  const offset = circumference - progress * circumference;
  progressRing.style.strokeDashoffset = offset;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
  updateProgressRing();
}

function updateTomatoDisplay() {
  tomatoContainer.innerHTML = "";
  for (let i = 0; i < completedPomodoros; i++) {
    const tomato = document.createElement("span");
    tomato.textContent = "🍅";
    tomato.classList.add("tomato");
    tomatoContainer.appendChild(tomato);
  }
}

function setTimerMode(mode) {
  currentMode = mode;
  modeButtons.forEach(b => b.classList.toggle("active", b.dataset.mode === mode));

  switch (mode) {
    case "work":
      timeLeft = WORK_TIME;
      totalTime = WORK_TIME;
      statusLabel.textContent = "Work";
      progressRing.style.stroke = "var(--work-color)";
      break;
    case "shortBreak":
      timeLeft = SHORT_BREAK_TIME;
      totalTime = SHORT_BREAK_TIME;
      statusLabel.textContent = "Short Break";
      progressRing.style.stroke = "var(--short-break-color)";
      break;
    case "longBreak":
      timeLeft = LONG_BREAK_TIME;
      totalTime = LONG_BREAK_TIME;
      statusLabel.textContent = "Long Break";
      progressRing.style.stroke = "var(--long-break-color)";
      break;
  }
  updateDisplay();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  isPaused = false;
  startBtn.disabled = true;
  pauseBtn.disabled = false;

  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);

      // 🔊 Play sound if not muted
      if (!isMuted) {
        const audio = new Audio("hailuoto_school_bell_ringtone.mp3");
        audio.play().catch(err => console.log("Sound failed:", err));
      }

      if (currentMode === "work") {
        completedPomodoros++;
        updateTomatoDisplay();
        if (completedPomodoros % POMODOROS_UNTIL_LONG_BREAK === 0) {
          setTimerMode("longBreak");
        } else {
          setTimerMode("shortBreak");
        }
      } else {
        setTimerMode("work");
      }

      isRunning = false;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  clearInterval(timerInterval);
  isRunning = false;
  isPaused = true;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  statusLabel.textContent = "Paused";
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  isPaused = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  setTimerMode(currentMode);
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
    isPaused = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    setTimerMode(btn.dataset.mode);
  });
});

// 🔇 Sound toggle logic
soundToggleBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  soundToggleBtn.textContent = isMuted ? "🔇 Sound Off" : "🔊 Sound On";
});

// 🌙 Theme toggle
themeToggleBtn.addEventListener("click", toggleTheme);
loadTheme();

setTimerMode("work");
updateTomatoDisplay();

// localStorage.clear();
const listItems = document.getElementById("listItems");
const inputBox = document.getElementById("input-box");
const itemArray = localStorage.getItem("taskList") ? JSON.parse(localStorage.getItem("taskList")) : [];

//Section 1.0 - To Do List
function enterBtn() {
    if(inputBox.value===""){
        alert("Please write something \u{1F97A}")
    } else {
        itemArray.push({ text: inputBox.value, completed: false });
        localStorage.setItem("taskList", JSON.stringify(itemArray));
        inputBox.value = "";
        refreshList();
    }
}

function refreshList() {
    listItems.innerHTML = "";
    itemArray.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = item.text;

        if (item.completed) {
            li.classList.add("completion")
        }

        // Toggle completion on click
        li.addEventListener("click", () => {
            itemArray[index].completed = !itemArray[index].completed;
            localStorage.setItem("taskList", JSON.stringify(itemArray));
            refreshList();
        });

        const xicon = document.createElement("i");
        xicon.classList.add("fa-solid", "fa-xmark");
        xicon.style.cursor = "pointer";

        li.appendChild(xicon);

        listItems.appendChild(li);
    })

    deleteList();
}

function deleteList() {
    const icons = document.querySelectorAll(".fa-xmark");
    icons.forEach((icon, index) => {
        icon.addEventListener("click", () => {
            itemArray.splice(index, 1);
            localStorage.setItem("taskList", JSON.stringify(itemArray));
            refreshList();
        })
    })
}

function retrieveList() {
    const stored = localStorage.getItem("taskList");
    
    if (stored) {
        itemArray.splice(0, itemArray.length, ...JSON.parse(stored));
    }
}

window.onload = function() {
    retrieveList();
    refreshList();
}



// Section 2 --- Pomodoro/Break Timer/

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const modeButtons = document.querySelectorAll('.mode');

const pomodoroInput = document.getElementById('pomodoroInput');
const shortInput = document.getElementById('shortInput');
const longInput = document.getElementById('longInput');

let mode = 'pomodoro';
let timer = null;
let totalTime = 0;
let remaining = 0;
let isRunning = false;



// Format HH:MM:SS
function updateDisplay(secs) {
    const hrs = String(Math.floor(secs / 3600)).padStart(2, '0');
    const mins = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const seconds = String(secs % 60).padStart(2, '0');
    display.textContent = `${hrs}:${mins}:${seconds}`;
}

function switchMode(newMode) {
    clearInterval(timer);
    isRunning = false;
    display.style.opacity = 0;
  
    setTimeout(() => {
        mode = newMode;

        const customValue = {
            pomodoro: +pomodoroInput.value || 30,
            short: +shortInput.value || 5,
            long: +longInput.value || 10
        };
        totalTime = customValue[mode] * 60;
        remaining = totalTime;
        updateDisplay(remaining);
        
        display.style.opacity = 1;
    }, 300);
}

function startCountdown() {
    if (mode === 'pomodoro' || isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        if (remaining <= 0) {
        clearInterval(timer);
        isRunning = false;
        return;
        }
        remaining--;
        updateDisplay(remaining);
    }, 1000);
}

function pauseCountdown() {
    if (!isRunning) return;
    clearInterval(timer);
    isRunning = false;
}

function resetCountdown() {
    if (mode === 'pomodoro') return;
    remaining = totalTime;
    updateDisplay(remaining);
}

modeButtons.forEach(btn => {
    btn.addEventListener('click', () => switchMode(btn.dataset.mode));
});

startBtn.addEventListener('click', startCountdown);
pauseBtn.addEventListener('click', pauseCountdown);
resetBtn.addEventListener('click', resetCountdown);

switchMode('pomodoro');


// Spotify 
function updateSpotify() {
  const input = document.getElementById('spotifyInput').value.trim();
  const embedUrlBase = "https://open.spotify.com/embed/";

  try {
    const url = new URL(input);
    const pathname = url.pathname; // e.g. /playlist/abc123
    const embedUrl = `${embedUrlBase}${pathname}?utm_source=generator`;

    document.getElementById('spotifyPlayer').src = embedUrl;
  } catch (e) {
    alert("Please enter a valid Spotify playlist link.");
  }
};

// Settings 
const openBtn = document.getElementById("openSettings");
const closeBtn = document.getElementById("closeSettings");
const settings = document.getElementById("settings");
const overlay = document.getElementById("overlay");

openBtn.addEventListener("click", () => {
    settings.classList.add("open");
    overlay.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    settings.classList.remove("open");
    overlay.classList.remove("active");
});


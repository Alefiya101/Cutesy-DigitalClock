//toggling button
const togg=document.getElementById('theme-toggle');
togg.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme');
})




// Function to update the digital clock
function updateClock() {
    let curr = new Date();

    let currHours = curr.getHours();
    let hrs = currHours.toString().padStart(2, '0');

    let currMin = curr.getMinutes();
    let mnts = currMin.toString().padStart(2, '0');

    let currSec = curr.getSeconds();
    let sec = currSec.toString().padStart(2, '0');

    // Update the HTML elements for the clock display
    document.querySelector(".first-hour").textContent = hrs[0];
    document.querySelector(".sec-hour").textContent = hrs[1];

    document.querySelector(".first-min").textContent = mnts[0];
    document.querySelector(".sec-min").textContent = mnts[1];

    document.querySelector(".first-sec").textContent = sec[0];
    document.querySelector(".sec-sec").textContent = sec[1];
}

// Set the interval to update the digital clock every 1 second
updateClock();
setInterval(updateClock, 1000);

// --- Stopwatch Logic ---

// Get the stopwatch buttons and display element
const stopwatchDisplay = document.getElementById('stopwatch-display');
const startButt = document.getElementById('start-sw');
const stopButt = document.getElementById('stop-sw');
const resetButt = document.getElementById('reset-sw');

// Global variables for the stopwatch's state
let startTime = 0;
let elapsedTime = 0;
let isPaused = true;
let intervalId;

// Event listener for the START button
startButt.addEventListener('click', () => {
    if (isPaused) {
        isPaused = false;
        // Calculate the starting point, allowing the timer to resume
        startTime = Date.now() - elapsedTime;
        
        // Start the interval and save its ID
        intervalId = setInterval(updateStopwatch, 1000);

        // Update button states
        startButt.disabled = true;
        stopButt.disabled = false;
        resetButt.disabled = false;
    }
});

// Event listener for the STOP button
stopButt.addEventListener('click', () => {
    if (!isPaused) {
        isPaused = true;
        // Stop the interval to pause the timer
        clearInterval(intervalId);

        // Update button states
        startButt.disabled = false;
        stopButt.disabled = true;
        resetButt.disabled = false;
    }
});

// Event listener for the RESET button
resetButt.addEventListener('click', () => {
    // Stop the interval
    clearInterval(intervalId);
    
    // Reset all state variables
    startTime = 0;
    elapsedTime = 0;
    isPaused = true;
    
    // Reset the display to "00:00:00"
    stopwatchDisplay.textContent = "00:00:00";

    // Update button states
    startButt.disabled = false;
    stopButt.disabled = true;
    resetButt.disabled = true;
});

// Function to update the stopwatch display
function updateStopwatch() {
    // Calculate the total time elapsed
    elapsedTime = Date.now() - startTime;
    
    // Convert milliseconds to hours, minutes, and seconds
    let hours = Math.floor(elapsedTime / 3600000);
    let minutes = Math.floor((elapsedTime % 3600000) / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);

    // Format the numbers with leading zeros
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    // Update the HTML display
    stopwatchDisplay.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Set initial stopwatch button states when the page loads
startButt.disabled = false;
stopButt.disabled = true;
resetButt.disabled = true;



// --- Timer Logic ---

// Get the timer elements
const timerInput = document.getElementById('timer-input');
const timerDisplay = document.getElementById('timer-display');
const startTimerButt = document.getElementById('start-timer');
const resetTimerButt = document.getElementById('reset-timer');

// Global variables for the timer's state
let remainingSeconds = 0;
let timerIntervalId;

// Create an audio element for the alert
const alertSound = new Audio('Alert.mpeg'); // Make sure the file path is correct

// Function to update the display
function updateTimerDisplay() {
    // Convert remaining seconds to minutes and seconds
    let minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;

    // Format the numbers with leading zeros
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    // Update the display
    timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// Event listener for the START button
startTimerButt.addEventListener('click', () => {
    // Get the user's input and convert it to a number
    const inputSeconds = parseInt(timerInput.value, 10);

    // Set the timer's starting time
    remainingSeconds = inputSeconds;

    // Immediately update the display to show the starting time
    updateTimerDisplay();

    // Start the countdown interval
    timerIntervalId = setInterval(() => {
        remainingSeconds--; // Decrease the time by one second
        updateTimerDisplay(); // Update the display

        // Stop the timer when it reaches zero
        if (remainingSeconds <= 0) {
            clearInterval(timerIntervalId);
            alertSound.play(); // Play the sound alert
        }
    }, 1000); // Run this function every 1000 milliseconds (1 second)
    
    // Disable the start button and enable reset
    startTimerButt.disabled = true;
    resetTimerButt.disabled = false;
});

// Event listener for the RESET button
resetTimerButt.addEventListener('click', () => {
    // Stop the timer
    clearInterval(timerIntervalId);
    
    // Reset state and display
    remainingSeconds = 0;
    timerInput.value = "";
    updateTimerDisplay();
    
    // Enable the start button and disable reset
    startTimerButt.disabled = false;
    resetTimerButt.disabled = true;
});

// Set initial timer button states
startTimerButt.disabled = false;
resetTimerButt.disabled = true;
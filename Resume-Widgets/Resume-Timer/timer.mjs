let timer;
let remainingTime = 0;
let isPaused = false;
let fillPercentage = 0;
let resetTimerPressed = false;
let resetHoldStartTime = 0;

function updateClock() {
  const timeInputValue = document.getElementById("timeInput").value;
  let totalSeconds = parseInt(timeInputValue);

  if (isNaN(totalSeconds)) {
    totalSeconds = 0;
  }

  const hours = Math.floor(totalSeconds / 10000);
  const minutes = Math.floor((totalSeconds % 10000) / 100);
  const seconds = totalSeconds % 100;

  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");

  remainingTime = hours * 3600 + minutes * 60 + seconds;
}

function timerIsRunning() {
  return timer !== undefined;
}

function fillTimer() {
  if (resetTimerPressed) {
    if (fillPercentage < 100) {
      fillPercentage += 5;
      document.getElementById(
        "updateButton"
      ).style.background = `linear-gradient(to right, #4caf50 ${fillPercentage}%, #f0f0f0 ${fillPercentage}%)`;
      setTimeout(fillTimer, 20);
    } else {
      resetTimer();
    }
  }
}

function startTimer(duration) {
  clearInterval(timer);
  isPaused = false;

  timer = setInterval(function () {
    if (duration <= 0) {
      clearInterval(timer);
    } else {
      if (!isPaused) {
        duration--;
      }
      remainingTime = duration;
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = duration % 60;

      document.getElementById("hours").textContent = hours
        .toString()
        .padStart(2, "0");
      document.getElementById("minutes").textContent = minutes
        .toString()
        .padStart(2, "0");
      document.getElementById("seconds").textContent = seconds
        .toString()
        .padStart(2, "0");
    }
  }, 1000);
}
function stopTimer() {
  clearInterval(timer);
  isPaused = true;
  updateStopButton();
}

function updateStopButton() {
  const stopButton = document.getElementById("stopTimer");
  stopButton.textContent = isPaused ? "Resume" : "Pause";
}

function resetTimer() {
  clearInterval(timer);
  remainingTime = 0;
  isPaused = false;
  resetTimerPressed = false;
  fillPercentage = 0;
  updateStopButton();
  updateClock();
  document.getElementById("updateButton").textContent = "Start Timer";
  timer = undefined;
  document.getElementById("updateButton").style.background = ""; // Reset button background
}

const a = document.getElementById("timeInput");
const b = document.getElementById("updateButton");
const c = document.getElementById("stopTimer");

if (a) {
  document.getElementById("timeInput").addEventListener("input", updateClock);
}

if (b) {
  document
    .getElementById("updateButton")
    .addEventListener("mousedown", handleStartHold);
  document
    .getElementById("updateButton")
    .addEventListener("touchstart", handleStartHold);

  document
    .getElementById("updateButton")
    .addEventListener("mouseup", handleButtonRelease);
  document
    .getElementById("updateButton")
    .addEventListener("touchend", handleButtonRelease);
}

function handleStartHold(event) {
  event.preventDefault(); // Prevent default behavior for touch events
  if (!resetTimerPressed) {
    if (!isPaused && !timerIsRunning()) {
      startTimer(remainingTime); // Start the timer immediately
      document.getElementById("updateButton").textContent = "Reset"; // Change button text
    } else {
      resetTimerPressed = true;
      resetHoldStartTime = Date.now();
      fillPercentage = 0;
      fillTimer();
    }
  }
}

function handleButtonRelease(event) {
  event.preventDefault(); // Prevent default behavior for touch events
  if (resetTimerPressed) {
    resetTimerPressed = false;
    const holdTime = Date.now() - resetHoldStartTime;
    if (holdTime >= 3000) {
      resetTimer();
    }
    document.getElementById("updateButton").style.background = "";
  } else {
    // This else block ensures that if the button is released before 3 seconds, it resets the timer button background
    document.getElementById("updateButton").style.background = "";
  }
}

if (a || b || c) {
  document
    .getElementById("updateButton")
    .addEventListener("mousedown", function (event) {
      if (!resetTimerPressed) {
        if (!isPaused && !timerIsRunning()) {
          startTimer(remainingTime); // Start the timer immediately
          document.getElementById("updateButton").textContent = "Reset"; // Change button text
        } else {
          resetTimerPressed = true;
          resetHoldStartTime = Date.now();
        }
      }
    });

  document
    .getElementById("updateButton")
    .addEventListener("mouseup", function (event) {
      if (resetTimerPressed) {
        resetTimerPressed = false;
        const holdTime = Date.now() - resetHoldStartTime;
        if (holdTime >= 3000) {
          resetTimer();
        } else {
          fillPercentage = 0; // Reset the fill percentage when releasing the button
          fillTimer(); // Fill the bar when releasing the reset button
        }
        document.getElementById("updateButton").style.background = "";
      }
    });

  document.getElementById("stopTimer").addEventListener("click", function () {
    if (isPaused) {
      isPaused = false;
      updateStopButton();
      startTimer(remainingTime);
    } else {
      stopTimer();
    }
  });
}

function initializeTimer() {
  const timeInput = document.getElementById("timeInput");
  const updateButton = document.getElementById("updateButton");

  if (timeInput && updateButton) {
    timeInput.addEventListener("input", updateClock);

    updateButton.addEventListener("mousedown", handleStartHold);
    updateButton.addEventListener("touchstart", handleStartHold);
    updateButton.addEventListener("mouseup", handleButtonRelease);
    updateButton.addEventListener("touchend", handleButtonRelease);
  }
}

export { initializeTimer };

let timer; 
let remainingTime = 0; 
let isPaused = false; 
let fillPercentage = 0; 
let resetTimerPressed = false; 


function updateClock() {
  const timeInputValue = document.getElementById('timeInput').value;
  let totalSeconds = parseInt(timeInputValue);

 
  if (isNaN(totalSeconds)) {
    totalSeconds = 0;
  }

 
  const hours = Math.floor(totalSeconds / 10000);
  const minutes = Math.floor((totalSeconds % 10000) / 100);
  const seconds = totalSeconds % 100;

  
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

  
  remainingTime = hours * 3600 + minutes * 60 + seconds;
}


document.getElementById('timeInput').addEventListener('input', updateClock);


document.getElementById('updateButton').addEventListener('mousedown', function() {
  if (!isPaused && !resetTimerPressed) {
    startTimer(remainingTime);
    document.getElementById('updateButton').textContent = 'Reset'; 
  }
});

document.getElementById('updateButton').addEventListener('mousedown', function() {
  resetTimerPressed = true; 
  fillPercentage = 0; 
  fillTimer(); 
});


document.getElementById('updateButton').addEventListener('mouseup', function() {
  resetTimerPressed = false; 
  document.getElementById('updateButton').style.background = '';
});


function fillTimer() {
  if (resetTimerPressed) {
    if (fillPercentage < 100) {
      fillPercentage += 5; 
      document.getElementById('updateButton').style.background = `linear-gradient(to right, #4caf50 ${fillPercentage}%, #f0f0f0 ${fillPercentage}%)`;
      setTimeout(fillTimer, 20);
    } else {
      resetTimer();
    }
  }
}


document.getElementById('stopTimer').addEventListener('click', function() {
  if (isPaused) {
   
    isPaused = false;
    updateStopButton();
    startTimer(remainingTime); 
  } else {
    
    stopTimer();
  }
});


function startTimer(duration) {
  clearInterval(timer); 
  isPaused = false; 

  timer = setInterval(function() {
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

      
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
  }, 1000);
}


function stopTimer() {
  clearInterval(timer); 
  isPaused = true; 
  updateStopButton(); 
}


function updateStopButton() {
  const stopButton = document.getElementById('stopTimer');
  stopButton.textContent = isPaused ? 'Resume' : 'Pause'; 
}


function resetTimer() {
  clearInterval(timer); 
  remainingTime = 0; 
  isPaused = false; 
  updateStopButton(); 
  updateClock(); 
  document.getElementById('updateButton').textContent = 'Start Timer'; 
}





import { savedSettings } from "../settingsUtils/getSavedSettings.js";

export function renderPomodoro() {
  const btn = document.getElementById('playPauseBtn');
  const timerMinutesEl = document.getElementById('timerMinutes');
  const timerSecondsEl = document.getElementById('timerSeconds');
  const timerButtonsEl = document.querySelectorAll('.timer-button');
  const timerResetEl = document.getElementById('resetTimerBtn');
  const focusElement = document.getElementById('focus');
  const shortBreakElement = document.getElementById('shortBreak');
  const longBreakElement = document.getElementById('longBreak');

  let intervalId = null;
  let isRunning = false;
  if (savedSettings.isPomodoroVisibleToggled !== 'true') {
    displayPomodoroTimer();
    
    shortBreakElement.addEventListener('click', () => handleToggle(shortBreakElement));
    focusElement.addEventListener('click', () => handleToggle(focusElement));
    longBreakElement.addEventListener('click', () => handleToggle(longBreakElement));

    function handleToggle(buttonElement) {
      if (isRunning === false) {
        if (!buttonElement.classList.contains('timer-is-toggled')) {
        turnOffPreviousButton();
        buttonElement.classList.add('timer-is-toggled');
        } else {
          buttonElement.classList.remove('timer-is-toggled');
        }

        displayPomodoroTimer();
      }
      

    }

    function displayPomodoroTimer() {
      const toggledEl = document.querySelector('.timer-is-toggled');
      if (!toggledEl) {
        timerMinutesEl.innerHTML = '00';
      } else {
        timerMinutesEl.innerHTML = checkToggledPomodoroButton();
      }
    }

    // PLAY AND PAUSE BUTTON LOGIC
    
    btn.addEventListener('click', () => {
      document.querySelectorAll('.timer-button').forEach((button) => {
        if (button.classList.contains('timer-is-toggled')) {
          btn.classList.toggle('stop');
          if (btn.classList.contains('stop')) {
            startTimer(checkToggledPomodoroButton());
            timerResetEl.classList.remove('hidden');
          } else {
            clearInterval(intervalId); 
          }
        }
      })


    });

    timerResetEl.addEventListener('click', () => {
      resetTimer(checkToggledPomodoroButton());
      timerResetEl.classList.add('hidden')
    })

    function startTimer(minutes) {
      let seconds = minutes * 60;

        intervalId = setInterval(() => {
          if (seconds <= 0) {
            clearInterval(intervalId);
            isRunning = false;
            return
          }

          seconds --;

          timerMinutesEl.innerHTML = Math.floor(seconds / 60).toString().padStart(2, '0');
          timerSecondsEl.innerHTML = (seconds % 60).toString().padStart(2, '0')
        }, 1000);
        isRunning = true;
      
    }

    function resetTimer(minutes) {
      clearInterval(intervalId);
      isRunning = false;
      btn.classList.remove('stop');
      timerSecondsEl.innerHTML = '00'
      timerMinutesEl.innerHTML = minutes
    }


    function checkToggledPomodoroButton() {
      const activeId = document.querySelector('.timer-is-toggled')?.id;
      return JSON.parse(localStorage.getItem(activeId)) || '00';
    }

    function turnOffPreviousButton() {
      const previousButton = document.querySelector('.timer-is-toggled');
      if (previousButton) {
        previousButton.classList.remove('timer-is-toggled');
      }
    }
  } else {
    document.querySelector('.pomodoro-section').classList.add('hidden')
  }
}
  
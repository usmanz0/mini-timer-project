import { savedSettings, pomodoroTimerInput } from "./getSavedSettings.js"
import { checkDarkMode } from "./checkSettingsDarkMode.js"


export function applySetting() {
  const darkModeEl = document.getElementById('darkModeToggle');
  const goalVisibleEl = document.getElementById('goalVisibleToggle');
  const taskVisibleEl = document.getElementById('taskVisibleToggle');
  const pomodoroVisibleEl = document.getElementById('pomodoroVisibleToggle');
  const remCompTaskEl = document.getElementById('remCompTask');
  const remCompGoalEl = document.getElementById('remCompGoal');
  const applyButtonEl = document.getElementById('applySettingButton');

  const timerInputs = {
    focusInputEl : document.getElementById('focusInput'),
    shortBreakInputEl : document.getElementById('shortBreakInput'),
    longBreakInputEl : document.getElementById('longBreakInput')
  }

  applyButtonEl.addEventListener('click', () => {
    document.querySelector('.apply-settings-overlay').classList.remove('hidden')
    setTimeout(() => {
      document.querySelector('.apply-settings-overlay').classList.add('hidden')
    },2000)
    if (darkModeEl.checked) {
      localStorage.setItem('isDarkModeToggled', 'true')
      checkDarkMode()
    } else {
      localStorage.setItem('isDarkModeToggled', 'false')
      checkDarkMode()
    }

    if (savedSettings.focus !== timerInputs.focusInputEl.value && timerInputs.focusInputEl.value !== '') {
      pomodoroTimerInput(timerInputs.focusInputEl);
    }

    if (savedSettings.shortBreak !== timerInputs.shortBreakInputEl.value && timerInputs.shortBreakInputEl.value !== '') {
      pomodoroTimerInput(timerInputs.shortBreakInputEl);
    }

    if (savedSettings.longBreak !== timerInputs.longBreakInputEl.value && timerInputs.longBreakInputEl.value !== '') {
      pomodoroTimerInput(timerInputs.longBreakInputEl);
    }

    if (remCompTaskEl.checked) {
      localStorage.setItem('isRemCompTaskToggled','true')
   
    } else {
      localStorage.setItem('isRemCompTaskToggled','false')
    }

    if (remCompGoalEl.checked) {
      localStorage.setItem('isRemCompGoalToggled','true')
      
    } else {
      localStorage.setItem('isRemCompGoalToggled','false')
    }

    if (goalVisibleEl.checked) {
      localStorage.setItem('isGoalVisibleToggled','true')
    } else {
      localStorage.setItem('isGoalVisibleToggled','false')
    }

    if (goalVisibleEl.checked) {
      localStorage.setItem('isGoalVisibleToggled','true')
    } else {
      localStorage.setItem('isGoalVisibleToggled','false')
    }

    if (taskVisibleEl.checked) {
      localStorage.setItem('isTaskVisibleToggled','true')
    } else {
      localStorage.setItem('isTaskVisibleToggled','false')
    }

    if (pomodoroVisibleEl.checked) {
      localStorage.setItem('isPomodoroVisibleToggled','true')
    } else {
      localStorage.setItem('isPomodoroVisibleToggled','false')
    }
    })
  }

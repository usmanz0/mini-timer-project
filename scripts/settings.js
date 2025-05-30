const darkModeEl = document.getElementById('darkModeToggle');
const goalVisibleEl = document.getElementById('goalVisibleToggle');
const taskVisibleEl = document.getElementById('taskVisibleToggle');
const pomodoroVisibleEl = document.getElementById('pomodoroVisibleToggle');
const remCompTaskEl = document.getElementById('remCompTask');
const remCompGoalEl = document.getElementById('remCompGoal');
const closeButtonEl = document.getElementById('closeButton');
const applyButtonEl = document.getElementById('applySettingButton');
const focusInputEl = document.getElementById('focusInput');
const shortBreakInputEl = document.getElementById('shortBreakInput');
const longBreakInputEl = document.getElementById('longBreakInput');


// CHECKS BUTTON TOGGLE STATE
checkToggleBtn();

// TOGGLE BUTTON STATE CHANGER
toggleEvent(darkModeEl,'isDarkModeToggled');
toggleEvent(goalVisibleEl,'isGoalVisibleToggled');
toggleEvent(taskVisibleEl,'isTaskVisibleToggled');
toggleEvent(pomodoroVisibleEl,'isPomodoroVisibleToggled');
toggleEvent(remCompGoalEl,'isRemCompGoalToggled');
toggleEvent(remCompTaskEl,'isRemCompTaskToggled');

// APPLIES SETTING 
applySetting();

console.log(JSON.parse(localStorage.getItem('focusInput'))) 

function applySetting() {
  applyButtonEl.addEventListener('click', () => {
    checkDarkMode();
    pomodoroTimerInput(focusInputEl);
    pomodoroTimerInput(shortBreakInputEl);
    pomodoroTimerInput(longBreakInputEl);
  })
  checkDarkMode();
}

export function checkDarkMode() {
  if (localStorage.getItem('isDarkModeToggled') === 'true') {
    console.log('hello')
    document.body.classList.add('dark-mode');
    ['p', 'strong', 'small' , 'h1', '.content-heading'].forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.classList.add('dark-mode'));
    });

  } else {
    document.body.classList.remove('dark-mode');
    ['p', 'strong', 'small' , 'h1', '.main-heading'].forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.classList.remove('dark-mode'));
    });
  }
}

function toggleEvent(toggleEl,toggleState) {
  toggleEl.addEventListener('change', () => {
    checkToggle(toggleEl,toggleState)
  })
}

function checkToggle(button,stateButton) {
  if (button.checked) {
    localStorage.setItem(`${stateButton}`,'true');
  } else {
    localStorage.setItem(`${stateButton}`,'false');
  }
}

function checkToggleBtn() {
  if (localStorage.getItem('isDarkModeToggled') === 'true') {
  darkModeEl.checked = true;
  }
  if (localStorage.getItem('isGoalVisibleToggled') === 'true') {
    goalVisibleEl.checked = true;
  }
  if (localStorage.getItem('isTaskVisibleToggled') === 'true') {
    taskVisibleEl.checked = true;
  }
  if (localStorage.getItem('isPomodoroVisibleToggled') === 'true') {
    pomodoroVisibleEl.checked = true;
  }
  if (localStorage.getItem('isRemCompTaskToggled') === 'true') {
    remCompTaskEl.checked = true;
  }
  if (localStorage.getItem('isRemCompGoalToggled') === 'true') {
    remCompGoalEl.checked = true;
  }
}

function pomodoroTimerInput(input) {
  const inputValue = input.value
  const inputId = input.id.slice(0, -5);
  localStorage.setItem(`${inputId}`, JSON.stringify(inputValue));
}

const darkModeEl = document.getElementById('darkModeToggle');
const goalVisibleEl = document.getElementById('goalVisibleToggle');
const taskVisibleEl = document.getElementById('taskVisibleToggle');
const pomodoroVisibleEl = document.getElementById('pomodoroVisibleToggle');
const remCompTaskEl = document.getElementById('remCompTask');
const remCompGoalEl = document.getElementById('remCompGoal');
const closeButtonEl = document.getElementById('closeButton');
const applyButtonEl = document.getElementById('applySettingButton');
const timerInputs = {
  focusInputEl : document.getElementById('focusInput'),
  shortBreakInputEl : document.getElementById('shortBreakInput'),
  longBreakInputEl : document.getElementById('longBreakInput')
}
const countdownYearsInputEl = document.getElementById('changeYearsInput');
const initialStates = {
  isDarkModeToggled: localStorage.getItem('isDarkModeToggled') || 'true',
  isGoalVisibleToggled: localStorage.getItem('isGoalVisibleToggled'),
  isTaskVisibleToggled: localStorage.getItem('isTaskVisibleToggled'),
  isPomodoroVisibleToggled: localStorage.getItem('isPomodoroVisibleToggled'),
  isRemCompTaskToggled: localStorage.getItem('isRemCompTaskToggled'),
  isRemCompGoalToggled: localStorage.getItem('isRemCompGoalToggled'),
  focus: JSON.parse(localStorage.getItem('focus')),
  shortBreak: JSON.parse(localStorage.getItem('shortBreak')),
  longBreak: JSON.parse(localStorage.getItem('longBreak'))
};

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

// UPDATE THE PLACEHOLDER OF THE SETTINGS INPUT
updateInputPlaceholder();

function applySetting() {
  applyButtonEl.addEventListener('click', () => {
    checkDarkMode();
    if (initialStates.focus !== timerInputs.focusInputEl.value) {
      pomodoroTimerInput(timerInputs.focusInputEl);
    } if (initialStates.shortBreak !== timerInputs.shortBreakInputEl.value) {
      pomodoroTimerInput(timerInputs.shortBreakInputEl);
    } if (initialStates.longBreak !== timerInputs.longBreakInputEl.value) {
      pomodoroTimerInput(timerInputs.longBreakInputEl);
    }
  })
  checkDarkMode();
}

function updateInputPlaceholder() {
  if (initialStates.focus === '') {
    timerInputs.focusInputEl.placeholder = '00';
  } else {
    timerInputs.focusInputEl.placeholder = initialStates.focus;
  }
  if (initialStates.shortBreak === '') {
    timerInputs.shortBreakInputEl.placeholder = '00';
  } else {
    timerInputs.shortBreakInputEl.placeholder = initialStates.shortBreak;
  }
  if (initialStates.longBreak === '') {
    timerInputs.longBreakInputEl.placeholder = '00';
  } else {
    timerInputs.longBreakInputEl.placeholder = initialStates.longBreak;
  }
}

export function checkDarkMode() {
  if (localStorage.getItem('isDarkModeToggled') === 'true') {
    document.body.classList.add('dark-mode');
    ['p', 'strong', 'small' , 'h1', '.content-heading', '.main-heading'].forEach(selector => {
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

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
const savedSettings = {
  isDarkModeToggled: localStorage.getItem('isDarkModeToggled'),
  isGoalVisibleToggled: localStorage.getItem('isGoalVisibleToggled'),
  isTaskVisibleToggled: localStorage.getItem('isTaskVisibleToggled'),
  isPomodoroVisibleToggled: localStorage.getItem('isPomodoroVisibleToggled'),
  isRemCompTaskToggled: localStorage.getItem('isRemCompTaskToggled'),
  isRemCompGoalToggled: localStorage.getItem('isRemCompGoalToggled'),
  focus: JSON.parse(localStorage.getItem('focus')),
  shortBreak: JSON.parse(localStorage.getItem('shortBreak')),
  longBreak: JSON.parse(localStorage.getItem('longBreak'))
};

checkToggleBtn();
checkDarkMode();
updateInputPlaceholder();
applySetting();

function applySetting() {
  applyButtonEl.addEventListener('click', () => {
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

  })
  
}

function updateInputPlaceholder() {
  if (savedSettings.focus === '') {
    timerInputs.focusInputEl.placeholder = '00';
  } else {
    timerInputs.focusInputEl.placeholder = savedSettings.focus;
  }
  if (savedSettings.shortBreak === '') {
    timerInputs.shortBreakInputEl.placeholder = '00';
  } else {
    timerInputs.shortBreakInputEl.placeholder = savedSettings.shortBreak;
  }
  if (savedSettings.longBreak === '') {
    timerInputs.longBreakInputEl.placeholder = '00';
  } else {
    timerInputs.longBreakInputEl.placeholder = savedSettings.longBreak;
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

function pomodoroTimerInput(input) {
  const inputValue = input.value;
  const inputId = input.id.slice(0, -5);

  localStorage.setItem(`${inputId}`, JSON.stringify(inputValue));
}

const rangeInput = document.getElementById('yearsRange');
const rangeValue = document.getElementById('rangeValue');
const yearsContinueElement = document.getElementById('yearsContinue');
const yearsError = document.getElementById('yearsError');
const questionNumber = document.getElementById('cardNumber');
const addGoalsElement = document.getElementById('addGoals');
const overlay = document.querySelector('.overlay');
const addGoalsModalElement = document.getElementById('addGoalsModal');
const goalsContinueElement = document.getElementById('goalsContinue');
const addGoalsMainElement = document.getElementById('addGoalsMain');
const focusElement = document.getElementById('focusButton');
const shortBreakElement = document.getElementById('shortBreakButton');
const longBreakElement = document.getElementById('longBreakButton');
const questionCardEl = document.getElementById('questionCard');
const mainPageEl = document.getElementById('mainPage');
const settingElement = document.getElementById('settings');
const countdownDays = document.getElementById('countdownDays');
const countdownHours = document.getElementById('countdownHours');
const countdownMinutes = document.getElementById('countdownMinutes');
const countdownSeconds = document.getElementById('countdownSeconds');
const goalsList = [];
const tasksList = [];

let yearsValue;
let currentCard = 1;

checkUserState();
countdownTimer();

function checkUserState() {
  if (localStorage.getItem('questionAsked') === 'true') {
    questionCardEl.classList.add('hidden');
    mainPageEl.classList.remove('hidden');
  }
}

// UPDATED THE CARD NUMBER 
questionNumber.innerHTML = `${currentCard}/2`

// INPUT RANGE STYLING
rangeInput.addEventListener('input', () => {
  rangeValue.value = rangeInput.value.padStart(2, '0');
});

rangeInput.addEventListener('mousedown', () => {
  rangeValue.style.borderColor = 'black'
  yearsError.innerHTML = ''
})

// CONTINUE BUTTON FUNCTIONALITY OF QUESTION 1 CARD
yearsContinueElement.addEventListener('click', () => {
  if (rangeValue.value === '0' || rangeInput.value === '0') {
    rangeValue.style.borderColor = 'red'
    yearsError.innerHTML = 'Invalid Input'
  } else {
    yearsError.innerHTML = ''
    rangeValue.style.borderColor = 'black'
    yearsValue = Number(rangeInput.value);
    localStorage.setItem('yearsInput',JSON.stringify(yearsValue))
    nextCard();
  }
})

// LOGIC FOR CLOSING AND OPENING OVERLAY
let interactionStartedOnModal = false;
let trackOverlay = false;

const addTaskButton = document.querySelector('.task-add-button');

addGoalsElement.addEventListener('click', hideOverlay);
addGoalsMainElement.addEventListener('click', hideOverlay);
addTaskButton.addEventListener('click', () => {
  hideOverlay();
  trackOverlay = true;
})


function hideOverlay() {
  overlay.classList.remove('hidden');
}

const modal = document.querySelector('.goals-modal');
modal.addEventListener('mousedown', (e) => {
  interactionStartedOnModal = true;
  e.stopPropagation();
});

overlay.addEventListener('mousedown', () => {
  interactionStartedOnModal = false;
});

overlay.addEventListener('mouseup', () => {
  if (!interactionStartedOnModal) {
    overlay.classList.add('hidden');
  }
  interactionStartedOnModal = false;
});

const inputGoalsModal = document.getElementById('inputGoalsModal');

// FUNCTIONALITY OF ADD BUTTON FOR OVERLAY 
addGoalsModalElement.addEventListener('click', () => {
  if (inputGoalsModal.value === '') {
    document.getElementById('goalsError').innerHTML = 'Field cannot be empty'
    overlay.classList.add('hidden');
  } else if (!trackOverlay) {
    addGoals(inputGoalsModal.value);
    document.getElementById('goalsError').innerHTML = ''
    overlay.classList.add('hidden');
  } else {
    addTask(inputGoalsModal.value);
    trackOverlay = false;
    overlay.classList.add('hidden');
  }
});

document.addEventListener('mouseup', () => {
  setTimeout(() => {
    interactionStartedOnModal = false;
  }, 0);
});

// LOGIC OF ADDING GOALS AKA TODOS
function addGoals(goal) {
  goalsList.push({ text: goal, checked: false });
  renderGoalsList();
}

// THIS FUNCTION WILL RENDER THE TODO AND UPDATES
function renderGoalsList() {
  let goalsHTML = '';
  let goalsHTMLMain = '';

  goalsList.forEach((goalObject, index) => {
    goalsHTML += `<li class="paragraph-text" id="goals">${goalObject.text}</li>`;
    goalsHTMLMain += ` 
      <li class="paragraph-text" id="goalsMain">
      <input 
        class="goals-main-checkbox" 
        type="checkbox" 
        data-index="${index}" 
        ${goalObject.checked ? 'checked' : ''}
      >
      <p>
        ${goalObject.text}
      </p>
      </li>
    `;
  });

  document.getElementById('goalsList').innerHTML = goalsHTML;
  document.getElementById('goalsListMain').innerHTML = goalsHTMLMain;

  document.querySelectorAll('.goals-main-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      const index = e.target.dataset.index;
      goalsList[index].checked = e.target.checked;

      const goalText = e.target.nextElementSibling;
      goalText.style.textDecoration = e.target.checked ? 'line-through' : 'none';
    });

    const goalText = checkbox.nextElementSibling;
    if (checkbox.checked) {
      goalText.style.textDecoration = 'line-through';
    }
  });

}

// ADDING TASKS
function addTask(task) {
  tasksList.push({ text: task, checked: false });
  renderTasksList();
}
function renderTasksList() {
  let tasksHTML = '';

  tasksList.forEach((taskObject, index) => {
    tasksHTML += `
      <li class="paragraph-text task-item">
        <input 
          class="task-checkbox" 
          type="checkbox" 
          data-index="${index}" 
          ${taskObject.checked ? 'checked' : ''}
        >
        <p>${taskObject.text}</p>
      </li>
    `;
  });

  document.getElementById('taskList').innerHTML = tasksHTML;

  document.querySelectorAll('.task-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      const index = e.target.dataset.index;
      tasksList[index].checked = e.target.checked;

      const taskText = e.target.nextElementSibling;
      taskText.style.textDecoration = e.target.checked ? 'line-through' : 'none';
    });

    const taskText = checkbox.nextElementSibling;
    if (checkbox.checked) {
      taskText.style.textDecoration = 'line-through';
    }
  });

}

// ANIMATION FOR QUESTION CARDS TRANSITION
function nextCard() {
  const currentCardElement = document.querySelector(`.question-card${currentCard}`);
  const nextCardElement = document.querySelector(`.question-card${currentCard + 1}`);

  currentCardElement.classList.add('fade-out');

  setTimeout(() => {
    currentCardElement.classList.add('hidden');
    currentCardElement.classList.remove('fade-out');

    nextCardElement.classList.remove('hidden');
    nextCardElement.classList.remove('fade-out');
    nextCardElement.classList.add('fade-in');

    currentCard++;
    questionNumber.innerHTML = `${currentCard}/2`
  }, 500);
};

// CONTINUE BUTTON OF QUESTION 2 CARD
goalsContinueElement.addEventListener('click', () => {
  questionCardEl.classList.add('fade-out')

  setTimeout(() => {
    questionCardEl.classList.add('hidden');
    mainPageEl.classList.remove('hidden');
    mainPageEl.classList.add('fade-in');
  }, 500);
  localStorage.setItem('questionAsked', 'true')

})

// POMODORO BUTTONS 
shortBreakElement.addEventListener('click', () => toggleButton(shortBreakElement));
focusElement.addEventListener('click', () => toggleButton(focusElement));
longBreakElement.addEventListener('click', () => toggleButton(longBreakElement));

function toggleButton(buttonElement) {

  if (!buttonElement.classList.contains('timer-is-toggled')) {
    turnOffPreviousButton();
    buttonElement.classList.add('timer-is-toggled');
  } else {
    buttonElement.classList.remove('timer-is-toggled');
  }

}

function turnOffPreviousButton() {
  let previousButton = document.querySelector('.timer-is-toggled');
  if (previousButton) {
    previousButton.classList.remove('timer-is-toggled');
  };
}

function countdownTimer() {

  const storedYearsInput = JSON.parse(localStorage.getItem('YearsInput'));
  let updateSeconds = 0;
  let updateMinutes = 0;
  let updateHours = 0;
  let updateDays = storedYearsInput * 365;

  countdownSeconds.innerHTML = '00';
  countdownMinutes.innerHTML = '00';
  countdownHours.innerHTML = '00';
  countdownDays.innerHTML = updateDays;

  const timerInterval = setInterval(() => {
    if (updateSeconds > 0) {
      updateSeconds--;
    } else {
      if (updateMinutes > 0) {
        updateMinutes--;
        updateSeconds = 59;
      } else {
        if (updateHours > 0) {
          updateHours--;
          updateMinutes = 59;
          updateSeconds = 59;
        } else {
          if (updateDays > 0) {
            updateDays--;
            updateHours = 23;
            updateMinutes = 59;
            updateSeconds = 59;
          } else {
            clearInterval(timerInterval);
            return;
          }
        }
      }
    }

    countdownSeconds.innerHTML = updateSeconds.toString().padStart(2, '0');
    countdownMinutes.innerHTML = updateMinutes.toString().padStart(2, '0');
    countdownHours.innerHTML = updateHours.toString().padStart(2, '0');
    countdownDays.innerHTML = updateDays.toString();
  }, 1000);
}

function openSettings() {
  
}


/* 
Optimized Rendering
function renderGoals(withCheckbox = false) {
  const target = document.getElementById('goalsList');
  if (!target) return;

  let html = '';

  goalsList.forEach(goal => {
    html += `
      <li class="paragraph-text">
        ${withCheckbox 
          ? `<input class="goals-main-checkbox" type="checkbox"><p>${goal}</p>`
          : `${goal}`
        }
      </li>`;
  });

  target.innerHTML = html;
} */

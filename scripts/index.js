const rangeInput = document.getElementById('yearsRange');
const rangeValue = document.getElementById('rangeValue');
const yearsContinueElement = document.getElementById('yearsContinue')
const yearsError = document.getElementById('yearsError');
const questionNumber = document.getElementById('cardNumber');
const addGoalsElement = document.getElementById('addGoals');
const overlay = document.querySelector('.overlay');
const addGoalsModalElement = document.getElementById('addGoalsModal');
const goalsContinueElement = document.getElementById('goalsContinue');
const addGoalsMainElement = document.getElementById('addGoalsMain');
let yearsValue;
let currentCard = 1;
const goalsList = [];

// UPDATED THE CARD NUMBER 
questionNumber.innerHTML = `${currentCard}/2`

// INPUT RANGE STYLING
rangeInput.addEventListener('input', () => {
  rangeValue.style.color = 'black';
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
    nextCard();
  }
})

// LOGIC FOR CLOSING AND OPENING OVERLAY
let interactionStartedOnModal = false;

addGoalsElement.addEventListener('click', hideOverlay);
addGoalsMainElement.addEventListener('click', hideOverlay);

function hideOverlay() {
  const modal = document.querySelector('.goals-modal');
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

// FUNCTIONALITY OF ADD BUTTON FOR OVERLAY 
addGoalsModalElement.addEventListener('click', () => {
  if (inputGoalsModal.value === '') {
    document.getElementById('goalsError').innerHTML = 'Field cannot be empty'
    overlay.classList.add('hidden');
  } else {
    const inputGoalsModal = document.getElementById('inputGoalsModal');
    addGoals(inputGoalsModal.value);
    document.getElementById('goalsError').innerHTML = ''
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
  goalsList.push(goal);
  renderGoalsList();
};
// THIS FUNCTION WILL RENDER THE TODO AND UPDATES
function renderGoalsList () {
  let goalsHTML = '';
  let goalsHTMLMain = '';
  goalsList.forEach((goalsObject) => {
    goalsHTML += `<li class="paragraph-text" id="goals">${goalsObject}</li>`;
    goalsHTMLMain += `<li class="paragraph-text" id="goals"><input class="goals-main-checkbox" type="checkbox"><p>${goalsObject}</p></li>`;
  })
  document.getElementById('goalsList').innerHTML = goalsHTML;
  document.getElementById('goalsListMain').innerHTML = goalsHTMLMain;
};

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
  const mainPageEl = document.getElementById('mainPage')
  const questionCardEl = document.getElementById('questionCard');

  questionCardEl.classList.add('fade-out')

  setTimeout(() => {
    questionCardEl.classList.add('hidden');

    mainPageEl.classList.remove('hidden');
    mainPageEl.classList.add('fade-in');
  }, 500);


})

/* 
Optimized Rendering - Orphelo Motapa
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
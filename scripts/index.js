const rangeInput = document.getElementById('yearsRange');
const rangeValue = document.getElementById('rangeValue');
const yearsContinueElement = document.getElementById('yearsContinue')
const yearsError = document.getElementById('yearsError');
const questionNumber = document.getElementById('cardNumber');
const addGoalsElement = document.getElementById('addGoals');
const overlay = document.querySelector('.overlay');
const addGoalsModalElement = document.getElementById('addGoalsModal');
const goalsContinueElement = document.getElementById('goalsContinue');
let yearsValue;
let currentCard = 1;
const goalsList = [];

questionNumber.innerHTML = `${currentCard}/2`

rangeInput.addEventListener('input', () => {
  rangeValue.style.color = 'black';
  rangeValue.value = rangeInput.value.padStart(2, '0');
});

rangeInput.addEventListener('mousedown', () => {
  rangeValue.style.borderColor = 'black'
  yearsError.innerHTML = ''
})

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

addGoalsElement.addEventListener('click', () => {
  // if (goalsList.length === 0) {
  //   document.getElementById('goalsError').innerHTML = 'Max Limit Reached';
  //   setTimeout(() => {
  //     document.getElementById('goalsError').innerHTML = '';
  //   },1500)
  // } else {
  // }

  const modal = document.querySelector('.goals-modal');
  overlay.classList.remove('hidden')

  modal.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  overlay.addEventListener('click', () => {
    overlay.classList.add('hidden')
  })
});


addGoalsModalElement.addEventListener('click', () => {
  const inputGoalsModal = document.getElementById('inputGoalsModal');
  addGoals(inputGoalsModal.value);

  overlay.classList.add('hidden')
})

function addGoals(goal) {
  goalsList.push(goal);
  renderGoalsList();
};

function renderGoalsList () {
  let goalsHTML = '';
  goalsList.forEach((goalsObject) => {
    goalsHTML += `<li class="paragraph-text" id="goals">${goalsObject}</li>`;
  })
  document.getElementById('goalsList').innerHTML = goalsHTML;
};

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

goalsContinueElement.addEventListener('click', () => {
  document.getElementById('questionCard').
    classList.add('fade-out')
})
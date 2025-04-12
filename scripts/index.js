const rangeInput = document.getElementById('yearsRange');
const rangeValue = document.getElementById('rangeValue');
const yearsContinueElement = document.getElementById('yearsContinue')
const yearsError = document.getElementById('yearsError');
const questionNumber = document.getElementById('cardNumber');
const addGoalsElement = document.getElementById('addGoals');
let yearsValue;
let currentCard = 1;
const goalsList = [];

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
  if (goalsList.length === 0) {
    document.getElementById('goalsList').innerHTML = 'Error';
  } else {
    addGoals();
  }
});

function addGoals() {
  
};

function renderGoalsList () {
  let goalsHTML;
  goalsList.forEach((goalsObject,index) => {
    goalsHTML += goalsObject;
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
    nextCardElement.classList.add('fade-in');

    currentCard++;
  }, 500);
};
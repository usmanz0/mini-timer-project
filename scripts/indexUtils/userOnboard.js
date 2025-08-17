import { countdownTimer } from "./countdown.js";
import { addGoals, addTask} from "../../data/goalsAndTasks.js";

export function renderUserOnBoard() {
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
  
  const questionCardEl = document.getElementById('questionCard');
  const mainPageEl = document.getElementById('mainPage');
  const settingElement = document.getElementById('settings');
  
  let yearsValue;
  let currentCard = 1;

  checkUserState()

  function checkUserState() {
    if (localStorage.getItem('questionAsked') === 'true') {
      questionCardEl.classList.add('hidden');
      mainPageEl.classList.remove('hidden');
      countdownTimer();
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
    countdownTimer();
  })
}

const rangeInput = document.getElementById('yearsRange');
const rangeValue = document.getElementById('rangeValue');
const yearsContinueElement = document.getElementById('yearsContinue')
let yearsValue;

rangeInput.addEventListener('input', () => {
  rangeValue.style.color = 'black';
  rangeValue.value = rangeInput.value.padStart(2, '0');
});

yearsContinueElement.addEventListener('click', () => {
  if (rangeValue.value === '0' || rangeInput.value === '0') {
    document.getElementById('yearsError').
    innerHTML = 'Invalid Input'
  } else {
    document.getElementById('yearsError').
    innerHTML = ''
    yearsValue = Number(rangeInput.value);
    console.log(yearsValue)
  }

})



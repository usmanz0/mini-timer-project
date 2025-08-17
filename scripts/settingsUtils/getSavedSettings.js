export const savedSettings = {
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

export function pomodoroTimerInput(input) {
  const inputValue = input.value;
  const inputId = input.id.slice(0, -5);

  localStorage.setItem(`${inputId}`, JSON.stringify(inputValue));
}

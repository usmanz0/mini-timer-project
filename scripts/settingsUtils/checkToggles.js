import { savedSettings } from "./GetSavedSettings.js";

export function checkToggleBtn() {
  const darkModeEl = document.getElementById('darkModeToggle');
  const goalVisibleEl = document.getElementById('goalVisibleToggle');
  const taskVisibleEl = document.getElementById('taskVisibleToggle');
  const pomodoroVisibleEl = document.getElementById('pomodoroVisibleToggle');
  const remCompTaskEl = document.getElementById('remCompTask');
  const remCompGoalEl = document.getElementById('remCompGoal');

  if (savedSettings.isDarkModeToggled === 'true') {
    darkModeEl.checked = true;
  }
  if (savedSettings.isGoalVisibleToggled === 'true') {
    goalVisibleEl.checked = true;
  }
  if (savedSettings.isTaskVisibleToggled === 'true') {
    taskVisibleEl.checked = true;
  }
  if (savedSettings.isPomodoroVisibleToggled === 'true') {
    pomodoroVisibleEl.checked = true;
  }
  if (savedSettings.isRemCompTaskToggled === 'true') {
    remCompTaskEl.checked = true;
  }
  if (savedSettings.isRemCompGoalToggled === 'true') {
    remCompGoalEl.checked = true;
  }
}

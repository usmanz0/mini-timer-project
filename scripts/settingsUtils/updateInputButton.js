import { savedSettings } from "../settingsUtils/getSavedSettings.js";
export function updateInputPlaceholder() {

  const timerInputs = {
    focusInputEl : document.getElementById('focusInput'),
    shortBreakInputEl : document.getElementById('shortBreakInput'),
    longBreakInputEl : document.getElementById('longBreakInput')
  }

  if (savedSettings.focus === null) {
    timerInputs.focusInputEl.placeholder = '00';
  } else {
    timerInputs.focusInputEl.placeholder = savedSettings.focus;
  }
  if (savedSettings.shortBreak === null) {
    timerInputs.shortBreakInputEl.placeholder = '00';
  } else {
    timerInputs.shortBreakInputEl.placeholder = savedSettings.shortBreak;
  }
  if (savedSettings.longBreak === null) {
    timerInputs.longBreakInputEl.placeholder = '00';
  } else {
    timerInputs.longBreakInputEl.placeholder = savedSettings.longBreak;
  }
}
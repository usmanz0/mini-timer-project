import { renderPomodoro } from "./pomodoro.js";
import { renderUserOnBoard } from "./userOnboard.js";
import { renderTasksList , renderGoalsList} from "../data/goalsAndTasks.js";

if (localStorage.getItem('isDarkModeToggled') === 'true') {
  document.body.classList.add('dark-mode');
    ['p', 'strong', 'small' , 'h1', '.main-heading', '.content-heading', '.timer', '.countdown-timer-section', '.settings-image', '.timer-button'].forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.classList.add('dark-mode'));
  });
}

renderUserOnBoard()
renderPomodoro();
renderTasksList();
renderGoalsList()


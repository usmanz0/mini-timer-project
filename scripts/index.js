import { renderPomodoro } from "./indexUtils/pomodoro.js";
import { renderUserOnBoard } from "./indexUtils/userOnboard.js";
import { renderTasksList , renderGoalsList, goalsList, tasksList} from "../data/goalsAndTasks.js";

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

// async function sendAllData() {
//   const allData = {
//     'user1': {
//       'goalsList' : goalsList,
//       'tasksList' : tasksList,
//     }
//   }

//   try {
//     const response = await fetch("https://c8a3455327b0.ngrok-free.app/webhook-test/save-data", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(allData)
//     });

//   } catch (error) {
//     console.error("Error saving data:", error);
//   }
// }

// sendAllData();

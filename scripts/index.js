import { renderPomodoro } from "./indexUtils/pomodoro.js";
import { renderUserOnBoard } from "./indexUtils/userOnboard.js";
import { renderTasksList , renderGoalsList, goalsList, tasksList} from "../data/goalsAndTasks.js";
import { checkDarkMode } from "./indexUtils/checkDarkMode.js"


renderUserOnBoard()
renderPomodoro();
renderTasksList();
renderGoalsList()
checkDarkMode();

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

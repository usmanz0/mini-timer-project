import { renderPomodoro } from "./indexUtils/pomodoro.js";
import { renderUserOnBoard } from "./indexUtils/userOnboard.js";
import { renderTasksList , renderGoalsList, goalsList, tasksList} from "../data/goalsAndTasks.js";
import { checkDarkMode } from "./indexUtils/checkIndexDarkMode.js"


renderUserOnBoard()
renderPomodoro();
renderTasksList();
renderGoalsList()
checkDarkMode();


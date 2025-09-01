import { savedSettings } from "../scripts/settingsUtils/getSavedSettings.js";
export let goalsList = JSON.parse(localStorage.getItem('goalsList')) || [];
export let tasksList = JSON.parse(localStorage.getItem('tasksList')) || []; 

export function removeAllTodos (todo) {
  if (todo === 'goal') {
    const uncheckedGoals = goalsList.filter((goal) => goal.checked === false);
    goalsList = uncheckedGoals
    saveToStorage('goalsList',uncheckedGoals)
    
    renderGoalsList()
  } else {
    const uncheckedTasks = tasksList.filter((task) => task.checked === false); 
    tasksList = uncheckedTasks
    saveToStorage('tasksList',uncheckedTasks)

    renderTasksList()
  }
}


export function addGoals(goal) {
  goalsList.push({ goals: goal, checked: false });

  saveToStorage('goalsList',goalsList)
  renderGoalsList();
}

export function renderGoalsList() {
  if (savedSettings.isGoalVisibleToggled !== 'true') {
    
    let goalsHTML = '';

    goalsList.forEach((goal, index) => {
      goalsHTML += ` 
        <li class="paragraph-text goals-item" id="goalsMain">
          <div class="todo-item-left-section">
          <input 
            class="goals-main-checkbox" 
            type="checkbox" 
            data-index="${index}" 
            ${goal.checked ? 'checked' : ''}
          >
          <p>${goal.goals}</p>
          </div>
          <button class="todolist-delete-button goals-delete-button" data-index= "${index}">Delete</button>
        </li>
      `;
    });
  
    document.getElementById('goalsListMain').innerHTML = goalsList.length > 0 ? goalsHTML : '<p style="color: rgb(200, 200, 200)">Added tasks are shown here</p>';

    document.querySelectorAll('.goals-main-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => {
        const index = e.target.dataset.index;
        goalsList[index].checked = e.target.checked;

        const goalText = e.target.nextElementSibling;
        goalText.style.textDecoration = e.target.checked ? 'line-through' : 'none';

        saveToStorage('goalsList',goalsList)
        if (savedSettings.isRemCompGoalToggled === 'true') {
          setTimeout(() =>  {
            removeAllTodos('goal')
          }, 200)
        }
        
      });

      const  goalText = checkbox.nextElementSibling
      if (checkbox.checked) {
        goalText.style.textDecoration = 'line-through';
      }
    });

    document.querySelectorAll('.goals-delete-button').forEach((button) => {
      button.addEventListener('click', (e) => {
        const indexToDelete = e.target.dataset.index;
        goalsList.splice(indexToDelete, 1); 

        saveToStorage('goalsList',goalsList)
        renderGoalsList(); 
      });
    });
  } else {
    document.querySelector('.goals-section').classList.add('hidden')
    
  }
}

export function addTask(task) {

  tasksList.push({tasks: task, checked: false});

  saveToStorage('tasksList',tasksList)

  renderTasksList();
}

export function renderTasksList() {
  if (savedSettings.isTaskVisibleToggled !== 'true') {
    let tasksHTML = '';

    tasksList.forEach((taskObject, index) => {
      tasksHTML += `
        <li class="paragraph-text task-item">
          <div class="todo-item-left-section">
          <input 
            class="task-checkbox" 
            type="checkbox" 
            data-index="${index}" 
            ${taskObject.checked ? 'checked' : ''}
          >
          <p>${taskObject.tasks}</p>
          </div>
          <button class="todolist-delete-button tasks-delete-button" data-index= "${index}">Delete</button>
        </li>
      `;
    });
    
    document.getElementById('taskList').innerHTML = tasksList.length > 0 ? tasksHTML : '<p style="color: rgb(200, 200, 200);">Added tasks are shown here</p>';

    document.querySelectorAll('.task-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => {
        const index = e.target.dataset.index;
        tasksList[index].checked = e.target.checked;

        saveToStorage('tasksList',tasksList)

        const taskText = e.target.nextElementSibling;
        taskText.style.textDecoration = e.target.checked ? 'line-through' : 'none';
         
        if (savedSettings.isRemCompTaskToggled === 'true') {
          setInterval(() => {
              removeAllTodos('task');
          }, 200)
        }
      });
      const taskText = checkbox.nextElementSibling
      if (checkbox.checked) {
        taskText.style.textDecoration = 'line-through';
      }
    });

    document.querySelectorAll('.tasks-delete-button').forEach((button) => {
      button.addEventListener('click', (e) => {
        const indexToDelete = e.target.dataset.index;

        tasksList.splice(indexToDelete, 1); 

        saveToStorage('tasksList',tasksList)
        renderTasksList(); 
      });
    });
  } else {
    document.querySelector('.task-section').classList.add('hidden')
  }
}



export function saveToStorage (key, data) {
  localStorage.setItem(key ,JSON.stringify(data))
}
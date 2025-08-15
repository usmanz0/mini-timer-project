export let goalsList = JSON.parse(localStorage.getItem('goalsList')) || [];
export let tasksList = JSON.parse(localStorage.getItem('tasksList')) || []; 

export function removeAllTodos (todo) {
  if (todo === 'goal') {
    const uncheckedGoals = goalsList.filter((goal) => goal.checked === false); 
    saveToStorage('goalsList',uncheckedGoals)
  } else {
    const uncheckedTasks = tasksList.filter((task) => task.checked === false); 
    saveToStorage('tasksList',uncheckedTasks)
  }
}


export function addGoals(goal) {
  goalsList.push({ text: goal, checked: false });

  saveToStorage('goalsList',goalsList)
  renderGoalsList();
}

export function renderGoalsList() {
  let goalsHTML = '';
  console.log('hello');
  
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
        <p>${goal.text}</p>
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

      removeAllTodos('goal')
      window.location.reload()
    });

    const goalText = checkbox.nextElementSibling;
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

}

export function addTask(task) {

  tasksList.push({text: task, checked: false});

  saveToStorage('tasksList',tasksList)

  renderTasksList();
}

export function renderTasksList() {
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
        <p>${taskObject.text}</p>
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

      removeAllTodos('task')
      window.location.reload()
    });

    const taskText = checkbox.nextElementSibling;
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
}


export function saveToStorage (key, data) {
  localStorage.setItem(key ,JSON.stringify(data))
}
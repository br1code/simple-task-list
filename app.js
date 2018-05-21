const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  taskInput.focus();
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks
function getTasks() {
  let tasks = getLocalStorage();
  tasks.forEach(task => {
    createTask(task);
  });
}

// Add Task
function addTask(e) {
  e.preventDefault();
  // Create and append the new task to the DOM
  createTask(taskInput.value);
  // Store in LS
  storeTaskInLocalStorage(taskInput.value);
  // Clear input
  taskInput.value = '';
  taskInput.focus();
}

// Remove Task
function removeTask(e) {
  // get the task from the DOM
  let task = e.target.parentElement.parentElement;
  // if the 'x' is clicked, remove the task
  if (e.target.parentElement.classList.contains('delete-item')) {
    // Remove from the DOM
    task.remove();
    // Remove from LS
    removeTaskFromLocalStorage(task);
  }
}

// Clear Tasks
function clearTasks(e) {
  // Remove tasks from the DOM
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Remove tasks from the LS
  localStorage.clear();
  taskInput.focus();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
  
}

// Create Task
function createTask(task) {
  // Create li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task));
  // Create link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);
}

// Store Task from LS
function storeTaskInLocalStorage(task) {
  let tasks = getLocalStorage();
  // if there is not tasks yet, initialize
  if(!localStorage.getItem('tasks')) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  // save the new task
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get or initialize Local Storage
function getLocalStorage() {
  let tasks;
  // if there is not tasks yet, initialize
  if(!localStorage.getItem('tasks')) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
}

// Remove Task from LS
function removeTaskFromLocalStorage(taskToRemove) {
  let tasks = getLocalStorage();
  // loop through the tasks list and remove the task
  for (let i = 0; i < tasks.length; i++) {
    if (taskToRemove.textContent === tasks[i]) {
      tasks.splice(i, 1);
      break;
    }
  }
  // save the updated task list
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
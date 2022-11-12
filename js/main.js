// getting elements
const listContainer = document.getElementById('list-container');
const todoContainer = document.getElementById('todo-container');
const form = document.querySelector('#add-container');
const action = document.querySelector('.list-container');
const titleInput = document.getElementById('todo_title');
const descInput = document.getElementById('todo_desc');
const downloadBtn = document.getElementById('download');

loadEventListeners();

function loadEventListeners() {
  // geting from local storage

  document.addEventListener('DOMContentLoaded', getTasks);
  // getting form input
  form.addEventListener('submit', addTask);

  // REMOVING TASK
  listContainer.addEventListener('click', removeTask);

  // change image
  action.addEventListener('click', changeIcon);
}

function getTasks() {
  let task, desc;
  if (localStorage.getItem('task') === null) {
    task = [];
  } else {
    task = JSON.parse(localStorage.getItem(task));
  }

  if (localStorage.getItem('desc') === null) {
    desc = [];
  } else {
    desc = JSON.parse(localStorage.getItem(desc));
  }

  // create Elements

//   For each method on the task
  task.forEach((tasks) => {
    const completedTask = document.createElement('div');
    completedTask.setAttribute('class', 'list-item');

    const pendingTask = document.createElement('div');
    pendingTask.setAttribute('class', 'list-item');

    const completedImg = document.createElement('img');
    completedImg.setAttribute('src', 'img/Done All.png');
    completedImg.setAttribute('class', 'status-icon');
    completedImg.setAttribute('alt', 'completed-Icon');
    completedImg.setAttribute('title', 'Completed Task');

    const PendingImg = document.createElement('img');
    PendingImg.setAttribute('src', 'img/Pending.png');
    PendingImg.setAttribute('class', 'status-icon');
    completedImg.setAttribute('alt', 'pending-Icon');
    completedImg.setAttribute('title', 'Task in Progress');

    const content = document.createElement('div');
    content.setAttribute('class', 'content');

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = description;

    const taskDesc = document.createElement('p');
    taskDesc.textContent = tasks;

    content.appendChild(taskTitle);
    content.appendChild(taskDesc);

    const action = document.createElement('div');
    action.setAttribute('class', 'action');

    const taskActions = document.createElement('img');
    taskActions.setAttribute('src', 'img/approve.png');
    taskActions.setAttribute('class', 'action-icon');
    action.appendChild(taskActions);

    const cancel = document.createElement('img');
    cancel.setAttribute('src', 'img/Cancel.png');
    cancel.setAttribute('class', 'action-icon remove');
    action.appendChild(cancel);

    pendingTask.appendChild(PendingImg);
    pendingTask.appendChild(content);
    pendingTask.appendChild(action);

    // completedTask.appendChild(completedImg);
    // completedTask.appendChild(content);
    // completedTask.appendChild(action);

    listContainer.appendChild(pendingTask);
  });
}

function addTask(e) {
  // create Elements
  const completedTask = document.createElement('div');
  completedTask.setAttribute('class', 'list-item');

  const pendingTask = document.createElement('div');
  pendingTask.setAttribute('class', 'list-item');

  const img = document.createElement('div');
  img.classList = 'progress-image';

  const completedImg = document.createElement('img');
  completedImg.setAttribute('src', 'img/Done All.png');
  completedImg.setAttribute('class', 'status-icon');
  completedImg.setAttribute('alt', 'completed-Icon');
  completedImg.setAttribute('title', 'Completed Task');

  const PendingImg = document.createElement('img');
  PendingImg.setAttribute('src', 'img/Pending.png');
  PendingImg.setAttribute('class', 'status-icon');
  completedImg.setAttribute('alt', 'pending-Icon');
  completedImg.setAttribute('title', 'Task in Progress');

  img.appendChild(PendingImg);

  const content = document.createElement('div');
  content.setAttribute('class', 'content');

  const taskTitle = document.createElement('h3');
  taskTitle.textContent = titleInput.value;

  const taskDesc = document.createElement('p');
  taskDesc.textContent = descInput.value;

  content.appendChild(taskTitle);
  content.appendChild(taskDesc);

  const action = document.createElement('div');
  action.setAttribute('class', 'action');

  const taskActions = document.createElement('img');
  taskActions.setAttribute('src', 'img/approve.png');
  taskActions.setAttribute('class', 'action-icon approve');
  action.appendChild(taskActions);

  const cancel = document.createElement('img');
  cancel.setAttribute('src', 'img/Cancel.png');
  cancel.setAttribute('class', 'action-icon remove');
  action.appendChild(cancel);

  pendingTask.appendChild(img);
  pendingTask.appendChild(content);
  pendingTask.appendChild(action);

  // completedTask.appendChild(completedImg);
  // completedTask.appendChild(content);
  // completedTask.appendChild(action);

  listContainer.appendChild(pendingTask);

  // store in local storae
  StoreTaskInLocalStorage(titleInput.value, descInput.value);

  descInput.value = '';
  titleInput.value = '';

  e.preventDefault();
}

function StoreTaskInLocalStorage(tasks, description) {
  let task, desc;
  if (localStorage.getItem('task') === null) {
    task = [];
  } else {
    task = JSON.parse(localStorage.getItem(task));
  }

  if (localStorage.getItem('desc') === null) {
    desc = [];
  } else {
    desc = JSON.parse(localStorage.getItem(desc));
  }

  task.push(tasks);
  desc.push(description);

  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('description', JSON.stringify(description));
}

function removeTask(e) {
//   The event object
  if (e.target.classList.contains('remove')) {
    if (confirm('Are you sure, you want to delete this task?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

function changeIcon(e) {
  if (e.target.classList.contains('approve')) {
    const parent = e.target.parentElement.parentElement;
    const pending = parent.firstElementChild;

    const completed = document.createElement('img');
    completed.setAttribute('src', 'img/Done All.png');
    completed.setAttribute('class', 'status-icon');
    completed.setAttribute('alt', 'completed-Icon');
    completed.setAttribute('title', 'Completed Task');

    console.log(parent);
    console.log(pending);

    pending.innerHTML = `<img src="./img/Done%20All.png" alt="..." class="status-icon" />`;

    e.target.style.display = 'none';
  }
}

// Retrieve tasks from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTasks(tasks);
});

// Function to add tasks
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  const dueDateInput = document.getElementById('dueDateInput');
  const dueDateValue = dueDateInput.value;

  if (taskText !== '') {
    const task = { text: taskText }; // Task without a due date by default

    if (dueDateValue !== '') {
      task.dueDate = dueDateValue; // Add due date only if it's provided
    }
    else{
      task.dueDate = "No Deadline";
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
    taskInput.value = '';
    dueDateInput.value = '';
  }
}

// Function to remove tasks
function removeTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks(tasks);
}

// Function to toggle completion of tasks
function toggleCompletion(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks(tasks);
}

// Function to render tasks
function renderTasks(tasks) {
  
  const todoList = document.getElementById('todo-list');
  todoList.textContent = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const completeCheckBox = document.createElement("INPUT");
    completeCheckBox.setAttribute("type", "checkbox");
    li.appendChild(completeCheckBox);

    li.textContent = `${task.text} - Due: ${task.dueDate}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => removeTask(index);

    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    completeButton.onclick = () => toggleCompletion(index);



    li.appendChild(completeButton);
    li.appendChild(removeButton);

    if (task.completed) {
      li.style.textDecoration = 'line-through';
    }

    todoList.appendChild(li);
  });
}


// Function to sort tasks 
function sortTasks(criteria) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  switch (criteria) {
    case 'dueDate':
      tasks.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (a.dueDate==="No Deadline") return 1;
        if (b.dueDate==="No Deadline") return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
      break;
    case 'createdAt':
      tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'alphabetical':
      tasks.sort((a, b) => a.text.localeCompare(b.text));
      break;
    default:
    // maintain the order of tasks as they are
      break;
  }

  renderTasks(tasks);
}

// Function to search tasks 
function searchTasks() {
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const filteredTasks = tasks.filter(task => {
    const taskName = task.text.toLowerCase();
    const dueDate = task.dueDate ? task.dueDate.toLowerCase() : ''; 

    return taskName.includes(searchQuery) || dueDate.includes(searchQuery);
  });

  renderTasks(filteredTasks);
}

// Function to toggle dark/light mode
function toggleDarkMode() {
const body = document.body;
body.classList.toggle('dark-mode');
const isDarkMode = body.classList.contains('dark-mode');
localStorage.setItem('darkMode', isDarkMode);
}

// Check for user's preferred mode on page load
document.addEventListener('DOMContentLoaded', () => {
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedMode = localStorage.getItem('darkMode');

if (storedMode === 'true' || (storedMode === null && prefersDarkMode)) {
  document.body.classList.add('dark-mode');
}
});

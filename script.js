// Retrieving tasks from local storage on page load
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
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
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
  
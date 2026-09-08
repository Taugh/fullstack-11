# DOM Challenge — Interactive Task Board

This is a complete solution for the task board challenge.

## HTML

```html
<h1>Task Board</h1>

<div class="task-form">
  <input id="taskInput" type="text" placeholder="Enter a task" />

  <select id="priority">
    <option value="normal">Normal</option>
    <option value="important">Important</option>
    <option value="urgent">Urgent</option>
  </select>

  <button id="addBtn">Add Task</button>
  <button id="clearCompletedBtn">Clear Completed</button>
</div>

<p id="taskCount">0 tasks remaining</p>
<p id="emptyMessage">No tasks yet.</p>

<ul id="taskList"></ul>
```

## CSS

```css
body {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 40px auto;
}

.task-form {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

#taskInput {
  flex: 1;
  min-width: 180px;
  padding: 8px;
}

#priority {
  padding: 8px;
}

button {
  padding: 8px 12px;
  cursor: pointer;
}

#taskList {
  list-style: none;
  padding: 0;
}

#taskList li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

#taskList li span {
  flex: 1;
  cursor: pointer;
}

.normal {
  background: #f3f3f3;
}

.important {
  background: #fff7d6;
}

.urgent {
  background: #ffd6d6;
}

.completed {
  text-decoration: line-through;
  opacity: 0.5;
}

.hidden {
  display: none;
}
```

## JavaScript

```javascript
const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('priority');
const addBtn = document.getElementById('addBtn');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const emptyMessage = document.getElementById('emptyMessage');

function updateTaskCount() {
  const remainingTasks = taskList.querySelectorAll('li:not(.completed)').length;
  taskCount.textContent = `${remainingTasks} task${remainingTasks === 1 ? '' : 's'} remaining`;

  if (taskList.children.length === 0) {
    emptyMessage.classList.remove('hidden');
  } else {
    emptyMessage.classList.add('hidden');
  }
}

function addTask(taskText, priority) {
  const trimmedText = taskText.trim();

  if (!trimmedText) {
    return;
  }

  const listItem = document.createElement('li');
  listItem.classList.add(priority);

  const taskTextEl = document.createElement('span');
  taskTextEl.textContent = trimmedText;
  taskTextEl.addEventListener('click', () => {
    taskTextEl.classList.toggle('completed');
    listItem.classList.toggle('completed');
    updateTaskCount();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    listItem.remove();
    updateTaskCount();
  });

  listItem.append(taskTextEl, deleteBtn);
  taskList.appendChild(listItem);
  updateTaskCount();
}

addBtn.addEventListener('click', () => {
  addTask(taskInput.value, prioritySelect.value);
  taskInput.value = '';
  taskInput.focus();
});

taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTask(taskInput.value, prioritySelect.value);
    taskInput.value = '';
    taskInput.focus();
  }
});

clearCompletedBtn.addEventListener('click', () => {
  document.querySelectorAll('.completed').forEach((completedTask) => {
    completedTask.closest('li')?.remove();
  });
  updateTaskCount();
});

updateTaskCount();
```

## Requirements covered

- Add task by button click or Enter key
- Prevent empty task submission
- Add a priority class: `normal`, `important`, or `urgent`
- Toggle completed state on task click
- Delete a task with a Delete button
- Update the remaining task count
- Clear completed tasks
- Show the empty message when there are no tasks


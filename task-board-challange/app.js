const taskInput = document.querySelector("#taskInput");
const prioritySelect = document.querySelector("#priority");
const addBtn = document.querySelector("#addBtn");
const clearCompletedBtn = document.querySelector("#clearCompletedBtn");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");
const emptyMessage = document.querySelector("#emptyMessage");

// Update remaining task count
function updateTaskCount() {
    const incompleteTasks =
        taskList.querySelectorAll("li:not(.completed)").length;

    taskCount.textContent =
        `${incompleteTasks} task${incompleteTasks !== 1 ? "s" : ""} remaining`;
}

// Show/hide empty message
function updateEmptyMessage() {
    emptyMessage.style.display =
        taskList.children.length === 0 ? "block" : "none";
}

// Create and add task
function addTask() {
    const taskText = taskInput.value.trim();

    // Prevent empty tasks
    if (!taskText) return;

    const li = document.createElement("li");
    li.classList.add(prioritySelect.value);

    const taskSpan = document.createElement("span");
    taskSpan.classList.add("task-text");
    taskSpan.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    li.append(taskSpan, deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
    taskInput.focus();

    updateTaskCount();
    updateEmptyMessage();
}

// Add task button
addBtn.addEventListener("click", addTask);

// Enter key support
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Event delegation for ALL task clicks
taskList.addEventListener("click", (event) => {

    // Delete task
    if (event.target.matches(".delete-btn")) {
        event.target.closest("li").remove();

        updateTaskCount();
        updateEmptyMessage();
        return;
    }

    // Toggle completed state
    if (event.target.matches(".task-text")) {
        event.target.closest("li").classList.toggle("completed");

        updateTaskCount();
    }
});

// Clear completed tasks
clearCompletedBtn.addEventListener("click", () => {
    const completedTasks =
        taskList.querySelectorAll(".completed");

    completedTasks.forEach((task) => task.remove());

    updateTaskCount();
    updateEmptyMessage();
});
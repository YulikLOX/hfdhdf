document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const deadlineInput = document.getElementById("deadline-input");
    const priorityInput = document.getElementById("priority-input");
    const taskList = document.getElementById("task-list");
    const addTaskBtn = document.getElementById("add-task");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${task.text} - ${task.deadline} - Priority: ${task.priority} 
                <button onclick="removeTask(${index})">❌</button>`;
            if (task.completed) {
                li.style.textDecoration = "line-through";
            }
            li.addEventListener("click", () => toggleComplete(index));
            taskList.appendChild(li);
        });
    }

    function saveTask() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({
            text: taskInput.value,
            deadline: deadlineInput.value,
            priority: priorityInput.value,
            completed: false
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        deadlineInput.value = "";
        priorityInput.value = "low";
        loadTasks();
    }

    function removeTask(index) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }

    function toggleComplete(index) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }

    addTaskBtn.addEventListener("click", saveTask);
    loadTasks();
});

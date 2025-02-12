document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function loadTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            let taskList = document.getElementById("taskList");
            taskList.innerHTML = "";
            tasks.forEach(task => {
                let li = document.createElement("li");
                li.innerHTML = `${task.task} <button onclick="deleteTask(${task.id})">❌</button>`;
                taskList.appendChild(li);
            });
        });
}

function addTask() {
    let taskInput = document.getElementById("taskInput").value;
    if (!taskInput.trim()) return;

    fetch('/add', {
        method: 'POST',
        body: JSON.stringify({ task: taskInput }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById("taskInput").value = "";
        loadTasks();
    });
}

function deleteTask(taskId) {
    fetch(`/delete/${taskId}`, { method: 'DELETE' })
    .then(() => loadTasks());
}

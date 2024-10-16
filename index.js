const express = require('express');
const app = express();

app.use(express.json());

const PORT = 69;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const tasks = [
    { id: 1, name: "Task 1", isDone: false }, 
    { id: 2, name: "Task 2", isDone: false }
];
let taskId = tasks.length;

// GET all tasks
app.get("/tasks", (request, response) => {
    response.json(tasks);
});

// GET a single task by ID
app.get("/tasks/:id", (request, response) => {
    const id = request.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));

    if (task) {
        response.json(task);
    } else {
        response.status(404).json({ message: "Task not found" });
    }
});

// POST a new task
app.post("/tasks", (request, response) => {
    taskId++;
    const newTask = {
        id: taskId,
        name: request.body.name,
        isDone: false
    };
    tasks.push(newTask);
    response.status(201).json(newTask);
});

// PUT to update a task (complete replacement)
app.put("/tasks/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const index = tasks.findIndex((task) => task.id === id);

    if (index !== -1) {
        tasks[index] = {
            id: id,
            name: request.body.name,
            isDone: request.body.isDone
        };
        response.json(tasks[index]);
    } else {
        response.status(404).json({ message: "Task not found" });
    }
});

// PATCH to update part of a task
app.patch("/tasks/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const task = tasks.find((task) => task.id === id);

    if (task) {
        if (request.body.name !== undefined) task.name = request.body.name;
        if (request.body.isDone !== undefined) task.isDone = request.body.isDone;

        response.json(task);
    } else {
        response.status(404).json({ message: "Task not found" });
    }
});

// DELETE a task
app.delete("/tasks/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const index = tasks.findIndex((task) => task.id === id);

    if (index !== -1) {
        tasks.splice(index, 1); 
        response.status(204).json(); 
    } else {
        response.status(404).json({ message: "Task not found" });
    }
});

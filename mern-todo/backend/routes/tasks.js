// backend/routes/tasks.js
import express from "express";
const router = express.Router();

let tasks = []; // temporary memory storage

// Get all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// Add a new task
router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  const newTask = { id: Date.now(), title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Delete a task
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== Number(id));
  res.json({ message: "Task deleted" });
});

export default router;

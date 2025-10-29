import express from "express";
const router = express.Router();

let tasks = []; // In-memory storage

// ✅ Get all tasks
router.get("/", (req, res) => {
  console.log("📤 [GET] /api/tasks called");
  res.json(tasks);
});

// ✅ Add new task
router.post("/", (req, res) => {
  console.log("📩 [POST] /api/tasks called with body:", req.body);
  const { title } = req.body;

  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTask = { id: Date.now().toString(), title }; // 👈 make id string
  tasks.push(newTask);
  console.log("✅ Task added:", newTask);
  res.status(201).json(newTask);
});

// ✅ Delete task
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log("🗑️ [DELETE] /api/tasks called with param:", id);

  const index = tasks.findIndex((t) => t.id === id); // 👈 compare as string
  if (index === -1) {
    console.log("⚠️ Task not found:", id);
    return res.status(404).json({ message: "Task not found" });
  }

  const deletedTask = tasks.splice(index, 1);
  console.log("✅ Task deleted:", deletedTask[0]);
  res.json(deletedTask[0]);
});

export default router;

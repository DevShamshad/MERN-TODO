import Task from "../models/taskModel.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

export const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while adding task" });
  }
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user._id.toString()) {
    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } else {
    res.status(404).json({ message: "Task not found or unauthorized" });
  }
};

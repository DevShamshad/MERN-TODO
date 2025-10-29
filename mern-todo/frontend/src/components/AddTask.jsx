import axios from "axios";
import { useState } from "react";
import "./AddTask.css";

const AddTask = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleAddTask = async () => {
    if (!title.trim()) return alert("Please enter a task title");

    try {
      const res = await axios.post("http://localhost:5000/api/tasks", { title });
      onTaskAdded(res.data);
      setTitle("");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add task");
    }
  };

  return (
    <div className="add-task-container">
      <input
        className="task-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new task..."
      />
      <button className="add-btn" onClick={handleAddTask}>
        Add
      </button>
    </div>
  );
};

export default AddTask;

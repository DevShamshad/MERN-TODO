// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks", axiosConfig)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = async () => {
    if (!title.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        { title },
        axiosConfig
      );
      setTasks([...tasks, res.data]);
      setTitle("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting:", id);
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, axiosConfig);
      setTasks(tasks.filter((t) => t._id !== id)); // ✅ FIXED
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home">
      <h2>My Tasks</h2>
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id}>
            {/* ✅ FIXED */}
            <span>{task.title}</span>
            <button onClick={() => handleDelete(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

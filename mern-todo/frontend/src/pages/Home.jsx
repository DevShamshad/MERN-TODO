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
    const res = await axios.post(
      "http://localhost:5000/api/tasks",
      { title },
      axiosConfig
    );
    setTasks([...tasks, res.data]);
    setTitle("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, axiosConfig);
    setTasks(tasks.filter((t) => t.id !== id));
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
          <li key={task.id}>
            <span>{task.title}</span>
            <button onClick={() => handleDelete(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

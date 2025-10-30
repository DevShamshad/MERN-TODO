import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Axios instance with Authorization header
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    axiosInstance
      .get("/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = async () => {
    if (!title.trim()) return;
    try {
      const res = await axiosInstance.post("/tasks", { title });
      setTasks([...tasks, res.data]);
      setTitle("");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add task (maybe token expired)");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id)); // _id instead of id
    } catch (error) {
      console.error(error);
      alert("❌ Failed to delete task");
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
            <span>{task.title}</span>
            <button onClick={() => handleDelete(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

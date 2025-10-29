import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use only routes (no direct CRUD logic here)
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

import express from "express";
import { getTasks, addTask, deleteTask } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getTasks)
  .post(protect, addTask);

router.route("/:id")
  .delete(protect, deleteTask);

export default router;

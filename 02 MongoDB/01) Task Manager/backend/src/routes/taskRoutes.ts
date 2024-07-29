import { Router } from "express";
import {
  getTasksController,
  addTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/taskController";

const router = Router();

router.get("/tasks", getTasksController);
router.post("/tasks", addTaskController);
router.put("/tasks/:id", updateTaskController);
router.delete("/tasks/:id", deleteTaskController);

export const taskRoutes = router;

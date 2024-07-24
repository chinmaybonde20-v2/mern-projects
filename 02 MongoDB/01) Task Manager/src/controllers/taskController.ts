import { Request, Response } from "express";
import {
  fetchTasksService,
  addTaskService,
  updateTaskService,
  deleteTaskService,
} from "../services/taskService";

export const getTasksController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await fetchTasksService();
    res.json(tasks);
    console.log("Tasks sent to client:", tasks);
  } catch (error) {
    console.error("Error handling GET request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskData = req.body;
    const newTask = await addTaskService(taskData);
    res.status(201).json(newTask);
    console.log("New task added:", newTask);
  } catch (error) {
    console.error("Error handling POST request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;
    const updatedTask = await updateTaskService(taskId, taskData);
    if (updatedTask) {
      res.json(updatedTask);
      console.log("Task updated:", updatedTask);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error("Error handling PUT request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = req.params.id;
    const deletedTask = await deleteTaskService(taskId);
    if (deletedTask) {
      res.json(deletedTask);
      console.log("Task deleted:", deletedTask);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

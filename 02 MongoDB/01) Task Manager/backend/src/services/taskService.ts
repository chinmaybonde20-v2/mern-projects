import taskModel from "../models/taskModel";
import { Task } from "../models/taskModel";

export const fetchTasksService = async (): Promise<any[]> => {
  try {
    const tasks = await taskModel.find();
    console.log("Fetched Tasks:", tasks);
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTaskService = async (taskData: Task): Promise<Task> => {
  try {
    const newTask = new taskModel(taskData);
    await newTask.save();
    console.log("Added Task:", newTask);
    return newTask;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTaskService = async (
  id: string,
  taskData: Partial<Task>
): Promise<Task | null> => {
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(id, taskData, {
      new: true,
    });
    console.log("Updated Task:", updatedTask);
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTaskService = async (id: string): Promise<Task | null> => {
  try {
    const deletedTask = await taskModel.findByIdAndDelete(id);
    console.log("Deleted Task:", deletedTask);
    return deletedTask;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";

export const TaskManager = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <button>Create New Task</button>
      <TaskForm />
      <h3>Task List:</h3>
      <TaskList />
    </div>
  );
};

import { TaskList } from "./components/TaskList";
import "../src/assets/css/style.css";
export const App = () => {
  return (
    <div>
      <h1>Task Manager App</h1>
      <TaskList />
    </div>
  );
};

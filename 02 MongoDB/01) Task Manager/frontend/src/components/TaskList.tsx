import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import "../assets/css/TaskList.css";
interface Task {
  taskName: string;
  description: string;
  status: boolean;
  _id: number;
}
interface FormData {
  taskName: string;
  description: string;
  status: boolean;
}

interface Props {
  toggleForm: () => void;
}

export const TaskList = ({ toggleForm }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isEditing, setEditing] = useState<boolean>(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedFormData, setEditedFormData] = useState<FormData>({
    taskName: "",
    description: "",
    status: false,
  });
  const [filter, setFilter] = useState("All");

  const fetchTask = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Task[]>(
        "http://localhost:3005/api/tasks"
      );
      setTasks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskID: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3005/api/tasks/${taskID}`
      );
      console.log("Deleted data is ", response.data);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskID));
    } catch (error) {
      console.log(error);
    }
    console.log(taskID);
  };

  const toggleStatus = async (taskID: number, taskStatus: boolean) => {
    const updatedState = !taskStatus;
    try {
      const response = await axios.put(
        `http://localhost:3005/api/tasks/${taskID}`,
        {
          status: updatedState,
        }
      );

      fetchTask();
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (task: Task) => {
    setEditing(true);
    setEditingTaskId(task._id);
    setEditedFormData({
      taskName: task.taskName,
      description: task.description,
      status: task.status,
    });
    console.log("curently we are editing", editedFormData);
  };

  const handleEditedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedFormData({ ...editedFormData, [name]: value });
  };

  const saveEdits = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3005/api/tasks/${editingTaskId}`,
        editedFormData
      );
      fetchTask();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.status;
    if (filter === "pending") return !task.status;
    return true;
  });

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div>
      <div>
        <nav>
          <button onClick={() => setFilter("all")}>All Tasks</button>
          <button onClick={() => setFilter("completed")}>
            Completed Tasks
          </button>
          <button onClick={() => setFilter("pending")}>Pending Tasks</button>
          <button onClick={toggleForm}>Create new task</button>
        </nav>
      </div>
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          {filteredTasks.map((task, index) => (
            <div className="taskBody" key={index}>
              <h4 className="margin">Task Name: {task.taskName}</h4>
              <h4 className="margin">Description:{task.description}</h4>
              <h4 className="margin">
                Status:{task.status ? "Done" : "Pending"}
              </h4>
              <button
                onClick={() => {
                  toggleStatus(task._id, task.status);
                }}
              >
                {task.status ? "Mark as undone" : "Mark as done"}
              </button>
              <button
                onClick={() => {
                  editTask(task);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  deleteTask(task._id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <div>
        {isEditing && (
          <form onSubmit={saveEdits}>
            <h1>Update Form</h1>
            <input
              type="text "
              name="taskName"
              value={editedFormData.taskName}
              onChange={handleEditedChange}
              placeholder="Task Name"
            />
            <input
              type="text "
              name="description"
              value={editedFormData.description}
              onChange={handleEditedChange}
              placeholder="Task Description"
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

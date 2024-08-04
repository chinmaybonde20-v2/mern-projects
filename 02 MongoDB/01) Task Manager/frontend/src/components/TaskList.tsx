import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../assets/css/style.css";

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

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isEditing, setEditing] = useState<boolean>(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    taskName: "",
    description: "",
    status: false,
  });
  const [filter, setFilter] = useState("All");
  const [openForm, setOpenForm] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchTasks = async () => {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEditing && editingTaskId) {
        await axios.put(
          `http://localhost:3005/api/tasks/${editingTaskId}`,
          formData
        );
        setEditing(false);
        setEditingTaskId(null);
      } else {
        await axios.post("http://localhost:3005/api/tasks", formData);
      }
      setFormData({ taskName: "", description: "", status: false });
      fetchTasks();
      setOpenForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const deleteTask = async (taskID: number) => {
    try {
      await axios.delete(`http://localhost:3005/api/tasks/${taskID}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskID));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleStatus = async (taskID: number, taskStatus: boolean) => {
    const updatedState = !taskStatus;
    try {
      await axios.put(`http://localhost:3005/api/tasks/${taskID}`, {
        status: updatedState,
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (task: Task) => {
    setEditing(true);
    setEditingTaskId(task._id);
    setFormData({
      taskName: task.taskName,
      description: task.description,
      status: task.status,
    });
    setOpenForm(true);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.status;
    if (filter === "Pending") return !task.status;
    return true;
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleForm = () => {
    setOpenForm(!openForm);
    if (openForm) {
      setFormData({ taskName: "", description: "", status: false });
      setEditing(false);
      setEditingTaskId(null);
    }
  };

  return (
    <div>
      <div>
        <nav>
          <button onClick={() => setFilter("All")}>All Tasks</button>
          <button onClick={() => setFilter("Completed")}>
            Completed Tasks
          </button>
          <button onClick={() => setFilter("Pending")}>Pending Tasks</button>
          <button onClick={toggleForm}>
            {isEditing ? "Cancel" : "Create New Task"}
          </button>
        </nav>
      </div>
      <hr />
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="taskContainer">
          {filteredTasks.map((task, index) => (
            <div className="taskBody" key={index}>
              <h4 className="margin">Task Name: {task.taskName}</h4>
              <h4 className="margin">Description: {task.description}</h4>
              <h4 className="margin">
                Status: {task.status ? "Done" : "Pending"}
              </h4>
              <button onClick={() => toggleStatus(task._id, task.status)}>
                {task.status ? "Mark as Undone" : "Mark as Done"}
              </button>
              <button className="edit-task" onClick={() => editTask(task)}>
                Edit
              </button>
              <button
                className="delete-task"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {openForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={toggleForm}>
              &times;
            </button>
            <form onSubmit={handleSubmit}>
              <h1>{isEditing ? "Update Task" : "Create Task"}</h1>
              <input
                type="text"
                name="taskName"
                value={formData.taskName}
                onChange={handleInputChange}
                placeholder="Task Name"
              />
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Task Description"
              />
              <button type="submit">
                {isEditing ? "Save Changes" : "Create Task"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

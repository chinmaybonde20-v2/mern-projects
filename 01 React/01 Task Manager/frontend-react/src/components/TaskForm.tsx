import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  taskName: string;
  description: string;
  status: boolean;
}
export const TaskForm = () => {
  const [formData, setFormData] = useState<FormData>({
    taskName: "",
    description: "",
    status: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3005/api/tasks",
        formData
      );
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h1>Create/Update a task</h1>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            name="taskName"
            value={formData.taskName}
            onChange={handleInputChange}
            placeholder="Task Name"
          />
          <br />
          <label htmlFor="description">Task Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Task Description"
          />
          <button type="submit">Create New Task</button>
        </form>
      </div>
    </div>
  );
};

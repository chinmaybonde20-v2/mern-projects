import { useState } from "react";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { Form } from "./Form";

export const TaskManager = () => {
  const [openForm, setOpenForm] = useState(false);

  const toggleForm = () => {
    setOpenForm(!openForm);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <Form />
      {openForm && <TaskForm />}
      <TaskList toggleForm={toggleForm} />
    </div>
  );
};

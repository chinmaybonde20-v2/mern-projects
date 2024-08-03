export const Form = () => {
  return (
    <div>
      <form>
        <label htmlFor="taskName">Task Name:</label>
        <input type="text" name="taskName" />
        <label htmlFor="taskDescription">Task Description:</label>
        <input type="text" name="taskDescription" />
      </form>
    </div>
  );
};

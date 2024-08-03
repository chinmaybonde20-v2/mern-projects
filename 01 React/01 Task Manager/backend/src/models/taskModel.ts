import mongoose, { Document, Schema } from "mongoose";

export interface Task extends Document {
  taskName: string;
  description: string;
  status: boolean;
}

const taskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    status: { type: Boolean, required: true },
  },
  { collection: "task-list" }
);

const taskModel = mongoose.model<Task>("Task", taskSchema);

export default taskModel;

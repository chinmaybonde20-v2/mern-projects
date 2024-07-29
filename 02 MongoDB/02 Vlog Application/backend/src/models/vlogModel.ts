import mongoose, { Document, Schema } from "mongoose";

export interface Vlog extends Document {
  vlogTitle: string;
  vlogContent: string;
  author: string;
  timestamp: Date;
}

const vlogSchema = new Schema(
  {
    vlogTitle: { type: String, required: true },
    vlogContent: { type: String, required: true },
    author: { type: String, required: true },
    timestamp: { type: Date, required: true },
  },
  { collection: "vlogs-list" }
);

const vlogModel = mongoose.model<Vlog>("Vlog", vlogSchema);

export default vlogModel;

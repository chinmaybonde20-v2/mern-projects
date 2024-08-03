import mongoose, { Document, Schema } from "mongoose";

export interface Book extends Document {
  title: string;
  author: string;
  publishedDate: Date;
  pages: number;
  genre: string;
}

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    pages: { type: Number, required: true },
    genre: { type: String, required: true },
  },
  { collection: "books-list" }
);

const bookModel = mongoose.model<Book>("Book", bookSchema);

export default bookModel;

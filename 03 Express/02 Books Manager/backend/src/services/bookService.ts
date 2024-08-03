import bookModel from "../models/bookModel";
import { Book } from "../models/bookModel";

export const fetchBooksService = async (): Promise<Book[]> => {
  try {
    const books = await bookModel.find();
    console.log("Fetched Books:", books);
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const addBookService = async (bookData: Book): Promise<Book> => {
  try {
    const newBook = new bookModel(bookData);
    await newBook.save();
    console.log("Added Book:", newBook);
    return newBook;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

export const updateBookService = async (
  id: string,
  bookData: Partial<Book>
): Promise<Book | null> => {
  try {
    const updatedBook = await bookModel.findByIdAndUpdate(id, bookData, {
      new: true,
    });
    console.log("Updated Book:", updatedBook);
    return updatedBook;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const deleteBookService = async (id: string): Promise<Book | null> => {
  try {
    const deletedBook = await bookModel.findByIdAndDelete(id);
    console.log("Deleted Book:", deletedBook);
    return deletedBook;
  } catch (error) {
    console.error("Error deleting Book:", error);
    throw error;
  }
};

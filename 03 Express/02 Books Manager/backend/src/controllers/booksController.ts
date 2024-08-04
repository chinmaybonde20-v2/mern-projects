import { Request, Response } from "express";
import {
  fetchBooksService,
  addBookService,
  updateBookService,
  deleteBookService,
} from "../services/bookService";
import { Book } from "../models/bookModel";

export const getBooksController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const books = await fetchBooksService();
    res.json(books);
    console.log("Books sent to client:", books);
  } catch (error) {
    console.error("Error handling GET request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addBookController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookData: Book = req.body;
    const newBook = await addBookService(bookData);
    res.status(201).json(newBook);
    console.log("Book added:", newBook);
  } catch (error) {
    console.error("Error handling POST request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBookController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookData: Partial<Book> = req.body;
    const { id } = req.params;
    const updatedBook = await updateBookService(id, bookData);
    if (updatedBook) {
      res.json(updatedBook);
      console.log("Book updated:", updatedBook);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error handling PUT request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteBookController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedBook = await deleteBookService(id);
    if (deletedBook) {
      res.json(deletedBook);
      console.log("Book deleted:", deletedBook);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

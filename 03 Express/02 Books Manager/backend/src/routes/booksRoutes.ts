import { Router } from "express";
import {
  getBooksController,
  addBookController,
  updateBookController,
  deleteBookController,
} from "../controllers/booksController";

const router = Router();

router.get("/books", getBooksController);
router.post("/books", addBookController);
router.put("/books/:id", updateBookController);
router.delete("/books/:id", deleteBookController);

export const bookRoutes = router;

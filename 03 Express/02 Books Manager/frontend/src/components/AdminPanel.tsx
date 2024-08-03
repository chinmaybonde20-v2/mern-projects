import axios from "axios";
import React, { useEffect, useState } from "react";
import "../assets/style.css";

interface AdminPanel {
  _id: number | string;
  title: string;
  author: string;
  publishedDate: string;
  pages: number;
  genre: string;
}

export const AdminPanel: React.FC = () => {
  const [bookList, setBookList] = useState<AdminPanel[]>([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publishedDate: new Date().toISOString().slice(0, 10),
    pages: 0,
    genre: "",
  });

  const [editingBook, setEditingBook] = useState<AdminPanel | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/books");
      setBookList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addBook = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3005/api/books",
        newBook
      );
      setBookList([...bookList, response.data]);
      setNewBook({
        title: "",
        author: "",
        publishedDate: new Date().toISOString().slice(0, 10),
        pages: 0,
        genre: "",
      });
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    if (editingBook) {
      try {
        const response = await axios.put(
          `http://localhost:3005/api/books/${editingBook._id}`,
          editingBook
        );
        setBookList(
          bookList.map((book) =>
            book._id === editingBook._id ? response.data : book
          )
        );
        setEditingBook(null);
        setShowModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editBook = (book: AdminPanel) => {
    setEditingBook({
      ...book,
      publishedDate: new Date(book.publishedDate).toISOString().slice(0, 10),
    });
    setShowModal(true);
  };

  const deleteBook = async (id: string | number) => {
    try {
      await axios.delete(`http://localhost:3005/api/books/${id}`);
      setBookList(bookList.filter((book) => book._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <button className="open-modal-button" onClick={() => setShowModal(true)}>
        Add new book to collection
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-modal" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>{editingBook ? "Edit Book Details" : "Add New Book"}</h2>
            <label> Book Title:</label>
            <input
              type="text"
              value={editingBook ? editingBook.title : newBook.title}
              onChange={(e) =>
                editingBook
                  ? setEditingBook({
                      ...editingBook,
                      title: e.target.value,
                    })
                  : setNewBook({ ...newBook, title: e.target.value })
              }
            />
            <label> Author Name:</label>
            <input
              type="text"
              value={editingBook ? editingBook.author : newBook.author}
              onChange={(e) =>
                editingBook
                  ? setEditingBook({ ...editingBook, author: e.target.value })
                  : setNewBook({ ...newBook, author: e.target.value })
              }
            />
            <label> Published Date:</label>
            <input
              type="date"
              value={
                editingBook ? editingBook.publishedDate : newBook.publishedDate
              }
              onChange={(e) =>
                editingBook
                  ? setEditingBook({
                      ...editingBook,
                      publishedDate: e.target.value,
                    })
                  : setNewBook({
                      ...newBook,
                      publishedDate: e.target.value,
                    })
              }
            />
            <label> Pages</label>
            <input
              type="number"
              value={editingBook ? editingBook.pages : newBook.pages}
              onChange={(e) =>
                editingBook
                  ? setEditingBook({
                      ...editingBook,
                      pages: Number(e.target.value),
                    })
                  : setNewBook({ ...newBook, pages: Number(e.target.value) })
              }
            />
            <label>Genre</label>
            <input
              type="text"
              value={editingBook ? editingBook.genre : newBook.genre}
              onChange={(e) =>
                editingBook
                  ? setEditingBook({ ...editingBook, genre: e.target.value })
                  : setNewBook({ ...newBook, genre: e.target.value })
              }
            />
            {editingBook ? (
              <>
                <button onClick={handleUpdate}>Update Book</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </>
            ) : (
              <button onClick={addBook}>Add New Book</button>
            )}
          </div>
        </div>
      )}
      <div>
        <h1>Current Books Collection</h1>
        <div className="posts-container">
          {bookList.map((book) => (
            <div key={book._id} className="post-card">
              <h2 className="title">{book.title}</h2>
              <p className="content">{`Published Date: ${book.publishedDate}`}</p>
              <p className="content">{`Pages: ${book.pages}`}</p>
              <h3 className="author">Author: {book.author}</h3>
              <p className="genre">Genre: {book.genre}</p>
              <div className="post-actions">
                <button onClick={() => editBook(book)}>Edit</button>
                <button onClick={() => deleteBook(book._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

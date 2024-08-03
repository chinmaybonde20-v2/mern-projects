import axios from "axios";
import React, { useEffect, useState } from "react";
import "../assets/style.css";

interface BookPost {
  _id: number | string;
  title: string;
  author: string;
  publishedDate: string;
  pages: number;
  genre: string;
}

export const BooksList: React.FC = () => {
  const [bookList, setBookList] = useState<BookPost[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/books");
      setBookList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Books List</h1>

      <div className="posts-container">
        {bookList.map((book) => (
          <div key={book._id} className="post-card">
            <h2 className="title">{book.title}</h2>
            <h3 className="author">Author: {book.author}</h3>
            <p className="date">Published Date: {book.publishedDate}</p>
            <p className="pages">Pages: {book.pages}</p>
            <p className="genre">Genre: {book.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

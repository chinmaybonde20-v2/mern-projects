import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <ul>
          <Link to="/">Home--------</Link>
          <Link to="/books">Books--------</Link>
          <Link to="/admin">Admin</Link>
        </ul>
      </nav>
    </div>
  );
};

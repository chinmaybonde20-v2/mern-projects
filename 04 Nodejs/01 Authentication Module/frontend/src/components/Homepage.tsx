import React from "react";
import { useNavigate } from "react-router-dom";

export const Homepage: React.FC = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      {token ? (
        <div>
          <h2 className="message-container">Welcome to the Home Page</h2>
          <div className="button-container">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="message-container">Please log in first</h2>
          <div className="button-container">
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

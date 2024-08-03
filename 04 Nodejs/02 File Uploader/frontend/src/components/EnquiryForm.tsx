import React, { useState } from "react";
import axios from "axios";
import "../assets/style.css";

interface Enquiry {
  userName: string;
  userEmail: string;
  message: string;
}

export const EnquiryForm: React.FC = () => {
  const [enquiry, setEnquiry] = useState<Enquiry>({
    userName: "",
    userEmail: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEnquiry((prevEnquiry) => ({
      ...prevEnquiry,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3005/api/enquiries", enquiry);
      setEnquiry({ userName: "", userEmail: "", message: "" });
    } catch (error) {
      console.error("Error adding enquiry:", error);
    }
  };

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="userName">Name:</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={enquiry.userName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="userEmail">Email:</label>
        <input
          type="email"
          id="userEmail"
          name="userEmail"
          value={enquiry.userEmail}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={enquiry.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button type="submit">Add Enquiry</button>
    </form>
  );
};

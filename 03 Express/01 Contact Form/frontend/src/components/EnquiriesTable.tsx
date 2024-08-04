import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/style.css";

interface Enquiry {
  id: number;
  userName: string;
  userEmail: string;
  message: string;
}

export const EnquiriesTable: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/enquiries");
        setEnquiries(response.data);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };

    fetchEnquiries();
  }, []);

  return (
    <table className="enquiries-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {enquiries.map((enquiry) => (
          <tr key={enquiry.id}>
            <td>{enquiry.userName}</td>
            <td>{enquiry.userEmail}</td>
            <td>{enquiry.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

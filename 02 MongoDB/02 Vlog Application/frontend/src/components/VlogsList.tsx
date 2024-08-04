import axios from "axios";
import React, { useEffect, useState } from "react";
import "../assets/style.css";

interface VlogPost {
  _id: number | string;
  vlogTitle: string;
  vlogContent: string;
  author: string;
  timestamp: string;
}
export const VlogsList: React.FC = () => {
  const [vlogList, setVlogList] = useState<VlogPost[]>([]);

  const fetchVlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/vlogs");
      setVlogList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVlogs();
  }, []);

  return (
    <div>
      <h1>Vlogs List</h1>

      <div className="posts-container">
        {vlogList.map((vlog) => (
          <div key={vlog._id} className="post-card">
            <h2 className="title">{vlog.vlogTitle}</h2>
            <p className="content">{vlog.vlogContent}</p>
            <h3 className="author">Author: {vlog.author}</h3>
            <p className="date">Date: {vlog.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

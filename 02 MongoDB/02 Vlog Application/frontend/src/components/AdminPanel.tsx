import axios from "axios";
import React, { useEffect, useState } from "react";
import "../assets/style.css";

interface AdminPanel {
  _id: number | string;
  vlogTitle: string;
  vlogContent: string;
  author: string;
  timestamp: string;
}

export const AdminPanel: React.FC = () => {
  const [vlogList, setVlogList] = useState<AdminPanel[]>([]);
  const [newVlog, setNewVlog] = useState({
    vlogTitle: "",
    vlogContent: "",
    author: "",
    timestamp: new Date().toISOString(), // Default to current date
  });
  const [editingVlog, setEditingVlog] = useState<AdminPanel | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchVlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/vlogs");
      setVlogList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addVlog = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3005/api/vlogs",
        newVlog
      );
      setVlogList([...vlogList, response.data]);
      setNewVlog({
        vlogTitle: "",
        vlogContent: "",
        author: "",
        timestamp: new Date().toISOString(),
      }); // Reset with default date
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    if (editingVlog) {
      try {
        const response = await axios.put(
          `http://localhost:3005/api/vlogs/${editingVlog._id}`,
          editingVlog
        );
        setVlogList(
          vlogList.map((vlog) =>
            vlog._id === editingVlog._id ? response.data : vlog
          )
        );
        setEditingVlog(null);
        setShowModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editVlog = (vlog: AdminPanel) => {
    setEditingVlog(vlog);
    setShowModal(true);
  };

  const deleteVlog = async (id: string | number) => {
    try {
      await axios.delete(`http://localhost:3005/api/vlogs/${id}`);
      setVlogList(vlogList.filter((vlog) => vlog._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVlogs();
  }, []);

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <button className="open-modal-button" onClick={() => setShowModal(true)}>
        Add New Post
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-modal" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>{editingVlog ? "Edit Post" : "Add New Post"}</h2>
            <input
              type="text"
              placeholder="Title"
              value={editingVlog ? editingVlog.vlogTitle : newVlog.vlogTitle}
              onChange={(e) =>
                editingVlog
                  ? setEditingVlog({
                      ...editingVlog,
                      vlogTitle: e.target.value,
                    })
                  : setNewVlog({ ...newVlog, vlogTitle: e.target.value })
              }
            />
            <textarea
              placeholder="Content"
              value={
                editingVlog ? editingVlog.vlogContent : newVlog.vlogContent
              }
              onChange={(e) =>
                editingVlog
                  ? setEditingVlog({
                      ...editingVlog,
                      vlogContent: e.target.value,
                    })
                  : setNewVlog({ ...newVlog, vlogContent: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Author"
              value={editingVlog ? editingVlog.author : newVlog.author}
              onChange={(e) =>
                editingVlog
                  ? setEditingVlog({ ...editingVlog, author: e.target.value })
                  : setNewVlog({ ...newVlog, author: e.target.value })
              }
            />
            {/* Removed Timestamp input */}
            {editingVlog ? (
              <>
                <button onClick={handleUpdate}>Update Post</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </>
            ) : (
              <button onClick={addVlog}>Add New Post</button>
            )}
          </div>
        </div>
      )}
      <div>
        <h1>Old Posts by You</h1>
        <div className="posts-container">
          {vlogList.map((vlog) => (
            <div key={vlog._id} className="post-card">
              <h2 className="title">{vlog.vlogTitle}</h2>
              <p className="content">{vlog.vlogContent}</p>
              <h3 className="author">Author: {vlog.author}</h3>
              <p className="date">Date: {vlog.timestamp}</p>
              <div className="post-actions">
                <button onClick={() => editVlog(vlog)}>Edit</button>
                <button onClick={() => deleteVlog(vlog._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

using express js

import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

const app = express();
const port = 3000;

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

mongoose
  .connect(
    "mongodb+srv://chinmaybondev2:Cccccccc20@mern-task-manager.xliyls0.mongodb.net/file-manager"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
  contentType: String,
});
const Image = mongoose.model("Image", imageSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    console.log("Upload failed: No file uploaded");
    return res.status(400).send("No file uploaded");
  }

  const newImage = new Image({
    filename: req.file.originalname,
    path: req.file.path,
    contentType: req.file.mimetype,
  });

  try {
    await newImage.save();
    console.log(File uploaded successfully: ${req.file.originalname});
    res.status(200).send("File uploaded and saved to MongoDB");
  } catch (err) {
    console.error("Error saving file to MongoDB:", err);
    res.status(500).send("Error saving file to MongoDB");
  }
});

app.listen(port, () => {
  console.log(Server running at http://localhost:${port});
});
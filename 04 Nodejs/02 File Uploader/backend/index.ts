import http, { IncomingMessage, ServerResponse } from "http";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import multer from "multer";

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
  .catch((err: Error) => console.error("MongoDB connection error:", err));

const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
  contentType: String,
});
const ImageModel = mongoose.model("Image", imageSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "POST" && req.url === "/upload") {
      const uploadMiddleware = upload.single("image");
      uploadMiddleware(req as any, res as any, async (err: any) => {
        if (err) {
          console.error("Error uploading file:", err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error uploading file");
          return;
        }

        const file = (req as any).file;
        if (file) {
          const newImage = new ImageModel({
            filename: file.originalname,
            path: file.path,
            contentType: file.mimetype,
          });

          try {
            await newImage.save();
            console.log(`File uploaded successfully: ${file.originalname}`);
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("File uploaded and saved to MongoDB");
          } catch (saveErr) {
            console.error("Error saving file to MongoDB:", saveErr);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error saving file to MongoDB");
          }
        } else {
          console.log("Upload failed: No file uploaded");
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("No file uploaded");
        }
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  }
);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

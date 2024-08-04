import http from "http";
import url from "url";
import mongoose, { Document, Schema } from "mongoose";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { IncomingMessage, ServerResponse } from "http";
import cors from "cors";

// Generate a random JWT secret
const jwtSecret: Secret = crypto.randomBytes(64).toString("hex");
console.log(`Generated JWT Secret: ${jwtSecret}`);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://chinmaybondev2:Cccccccc20@mern-task-manager.xliyls0.mongodb.net/auth-module"
  )
  .then(() => console.log("DB connected"))
  .catch((err: any) => console.error("DB connection error:", err));

// User model
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  city: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
  },
  { versionKey: false }
);

const User = mongoose.model<IUser>("User", UserSchema);

// Create HTTP server
const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // CORS middleware
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Handle OPTIONS requests
    if (req.method === "OPTIONS") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end();
      return;
    }

    const parsedUrl = url.parse(req.url ?? "", true);
    const { pathname } = parsedUrl;

    // Middleware to parse JSON
    const parseJSON = (callback: (data: any) => void) => {
      let body = "";
      req.on("data", (chunk) => (body += chunk.toString()));
      req.on("end", () => {
        try {
          callback(JSON.parse(body));
        } catch (error) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON" }));
        }
      });
    };

    // Authentication middleware
    const authenticateToken = async (): Promise<JwtPayload | null> => {
      return new Promise((resolve, reject) => {
        const rawJwtToken = req.headers["authorization"] as string | undefined;
        if (!rawJwtToken || !rawJwtToken.startsWith("Bearer ")) {
          return reject({ statusCode: 401, message: "Unauthorized" });
        }

        const jwtToken = rawJwtToken.split(" ")[1];
        jwt.verify(jwtToken, jwtSecret, (err, user) => {
          if (err || !user) {
            return reject({
              statusCode: 403,
              message: "Token expired or invalid",
            });
          }
          resolve(user as JwtPayload); // Cast to JwtPayload
        });
      });
    };

    // Register route handler
    if (pathname === "/register" && req.method === "POST") {
      parseJSON(async (data) => {
        const { name, email, password, city } = data;
        if (!name || !email || !password || !city) {
          res.writeHead(422, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Please provide all details" }));
          return;
        }

        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await User.findOne({ email });
          if (user) {
            res.writeHead(422, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Email is already in use" }));
            return;
          }

          const newUser = new User({
            name,
            email,
            password: hashedPassword,
            city,
          });
          await newUser.save();
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "User registered successfully" }));
        } catch (error) {
          console.error("Error during registration:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Failed to register user" }));
        }
      });
      return;
    }

    // Login route handler
    if (pathname === "/login" && req.method === "POST") {
      parseJSON(async (data) => {
        const { email, password } = data;
        try {
          const user = await User.findOne({ email });
          if (!user || !user.password) {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid credentials" }));
            return;
          }

          const matchPassword = await bcrypt.compare(password, user.password);
          if (!matchPassword) {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid credentials" }));
            return;
          }

          const token = jwt.sign(
            { id: user._id, email: user.email },
            jwtSecret,
            {
              expiresIn: "1h",
            }
          );
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Login successful", token }));
        } catch (error) {
          console.error("Error during login:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Login failed" }));
        }
      });
      return;
    }

    // Error handling middleware
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
);

// Error handling middleware
server.on("error", (error: Error) => {
  console.error("Server error:", error);
  server.close(() => process.exit(1));
});

// Start server
const PORT = process.env.PORT || 4005;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

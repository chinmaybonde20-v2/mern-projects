import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./config/connection";
import { taskRoutes } from "./routes/taskRoutes";
const app = express();

connectDB();

app.use(express.json());

app.use("/api", taskRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

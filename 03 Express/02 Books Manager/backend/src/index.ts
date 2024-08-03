import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./config/connection";
import { bookRoutes } from "./routes/booksRoutes";

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);
app.use(express.json());

app.use("/api", bookRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

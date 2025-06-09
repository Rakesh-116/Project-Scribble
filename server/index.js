import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db.connect.js";

// Initialize the Express application
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Request Parser Middleware
app.use(express.json({ limit: "50mb" })); // Increased limit for large drawings
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Import and use routes
import userRouter from "./routes/user.routes.js";

app.use("/api/user", userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

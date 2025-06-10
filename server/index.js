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
const allowedOrigins = [
  "http://localhost:5173",
  "https://project-scribble-jaro.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS!!"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors()); // Handle all preflight requests

// Import and use routes
import userRouter from "./routes/user.routes.js";

app.use("/api/user", userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

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
  "http://localhost:3000",
  "https://project-scribble-jaro.vercel.app",
  "https://project-scribble.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        console.log("CORS blocked origin:", origin);
        return callback(
          new Error(
            "The CORS policy for this site does not allow access from the specified Origin."
          ),
          false
        );
      }

      return callback(null, true);
    },
    credentials: true,
  })
);

app.options("*", cors()); // Handle all preflight requests

// Import and use routes
import userRouter from "./routes/user.routes.js";

// Middleware to normalize paths (remove duplicate slashes)
app.use((req, res, next) => {
  if (req.url.includes("//")) {
    req.url = req.url.replace(/\/+/g, "/");
  }
  next();
});

// Mount the router with proper path
app.use("/api/user", userRouter);

// Add a basic test route
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

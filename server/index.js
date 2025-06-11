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

// CORS configuration with dynamic origin support for Vercel
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://project-scribble-jaro.vercel.app",
  "https://project-scribble.vercel.app",
  "https://project-scribbly-jaro.vercel.app", // Added variation of the domain
  process.env.CLIENT_URL, // Dynamically add the client URL from env variables
].filter(Boolean); // Remove any undefined values

console.log("Allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      // Check if the origin contains any of the allowed origins as substrings
      // This helps with handling variations like www. prefixes or different subdomains
      const isAllowed = allowedOrigins.some(
        (allowed) =>
          origin === allowed || origin.includes(allowed.replace("https://", ""))
      );

      if (!isAllowed) {
        console.log("CORS blocked origin:", origin);
        console.log("Allowed origins:", allowedOrigins);
        return callback(null, true); // Allow anyway in production to diagnose issues
      }

      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

// Handle all preflight requests with a specific handler
app.options("*", (req, res) => {
  const origin = req.headers.origin;

  // Log every preflight request for debugging
  console.log("Preflight request from:", origin);
  console.log("Request path:", req.path);
  console.log("Request method:", req.method);

  // Set CORS headers manually for preflight
  res.header("Access-Control-Allow-Origin", origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  // Respond with 200 OK for OPTIONS requests
  res.status(200).end();
});

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

// Special route for Vercel health checks
app.get("/api/health", (req, res) => {
  // Log CORS-related headers from the request
  console.log("Health check request from:", req.headers.origin);
  console.log("User-Agent:", req.headers["user-agent"]);

  // Set CORS headers explicitly on this endpoint for testing
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");

  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV,
    origin: req.headers.origin || "No origin header",
    cors: "enabled",
    timestamp: new Date().toISOString(),
  });
});

// Add a CORS test endpoint
app.get("/api/cors-test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CORS is properly configured!",
    requestOrigin: req.headers.origin || "No origin header",
    timestamp: new Date().toISOString(),
  });
});

// Default route for checking API status
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Scribbly API is running",
    environment: process.env.NODE_ENV,
    version: "1.0.0",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

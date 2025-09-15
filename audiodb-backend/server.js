import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import audioRoutes from "./routes/audioRoutes.js";
import { connectDB } from "./config/database.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 5000; // Fixed port for local development

// Basic security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS configuration for localhost only
app.use(
  cors({
    origin: "http://localhost:5173", // Vite's default port
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve static files (audio uploads)
app.use(
  express.static("public", {
    setHeaders: (res, path) => {
      if (path.endsWith(".mp3")) {
        res.set({
          "Accept-Ranges": "bytes",
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=31536000",
        });
      } else if (path.endsWith(".ogg")) {
        res.set({
          "Accept-Ranges": "bytes",
          "Content-Type": "audio/ogg",
          "Cache-Control": "public, max-age=31536000",
        });
      } else if (path.endsWith(".wav")) {
        res.set({
          "Accept-Ranges": "bytes",
          "Content-Type": "audio/wav",
          "Cache-Control": "public, max-age=31536000",
        });
      }
    },
    maxAge: 31536000,
  })
);

// Connect to MongoDB
connectDB();

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working", timestamp: new Date().toISOString() });
});
// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "AudioDB Backend API is running!",
    version: "1.0.0",
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
app.use("/api", audioRoutes);

// CORS error handler
app.use((err, req, res, next) => {
  if (err.name === "CORSError") {
    console.error("CORS Error:", err);
    return res.status(403).json({
      error: "CORS error",
      message: err.message,
      origin: req.headers.origin,
    });
  }
  next(err);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 Server is running locally:
   API URL: http://localhost:${PORT}
   Audio Files: http://localhost:${PORT}/api/audio-files
  `);
});

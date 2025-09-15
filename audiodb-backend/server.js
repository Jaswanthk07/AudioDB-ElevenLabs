import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import audioRoutes from "./routes/audioRoutes.js";
import { connectDB } from "./config/database.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "media-src": ["'self'", "http:", "https:"],
      },
    },
  })
);

// CORS configuration
app.use(
  cors({
    origin: [
      "https://audiodb-elevenlabs.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Origin", "Accept"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    credentials: false, // Changed to false since we're not using cookies
    optionsSuccessStatus: 200,
    maxAge: 86400, // Cache preflight request results for 24 hours
  })
);

// Enable pre-flight requests for all routes
app.options("*", cors());

// Rate limiting - applied on API routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: { error: "Too many requests from this IP, please try again later." },
});
app.use("/api", limiter);

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
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log(`🎵 Test endpoint: http://localhost:${PORT}/api/audio-files`);
});

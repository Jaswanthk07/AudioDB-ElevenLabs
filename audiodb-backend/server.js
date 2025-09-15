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

// Rate limiting - more lenient for development
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased limit for development
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
});
app.use("/api", limiter);

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Vite's default development server port
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve static files from public directory with proper MIME types
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
    maxAge: 31536000, // 1 year cache
  })
);

// Connect to MongoDB
connectDB();

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

// 404 handler - catch all unmatched routes
app.use((req, res, next) => {
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

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log(`📊 Database: Connected to MongoDB`);
  console.log(`🎵 Test endpoint: http://localhost:${PORT}/api/audio-files`);
});

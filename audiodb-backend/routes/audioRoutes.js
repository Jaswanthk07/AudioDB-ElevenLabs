import express from "express";
import Audio from "../models/audio.js";

const router = express.Router();

// GET /api/audio-files - Get all audio files
router.get("/audio-files", async (req, res) => {
  try {
    const audioFiles = await Audio.getActiveLanguages();

    // Transform to the requested format
    const response = {};
    audioFiles.forEach((audio) => {
      response[audio.language] = {
        url: audio.audioUrl,
        language: audio.language,
        languageCode: audio.languageCode,
        flag: audio.flag,
        displayName: audio.displayName,
        duration: audio.duration,
        fileSize: audio.fileSize,
        formattedDuration: audio.formattedDuration,
        formattedFileSize: audio.formattedFileSize,
        sampleText: audio.sampleText,
        metadata: audio.metadata,
      };
    });

    res.json({
      success: true,
      count: audioFiles.length,
      data: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching audio files:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch audio files",
      message: error.message,
    });
  }
});

// GET /api/audio-files/:language - Get specific language audio
router.get("/audio-files/:language", async (req, res) => {
  try {
    const { language } = req.params;
    const audio = await Audio.findOne({
      language: language.toLowerCase(),
      isActive: true,
    });

    if (!audio) {
      return res.status(404).json({
        success: false,
        error: "Audio file not found",
        language: language,
      });
    }

    res.json({
      success: true,
      data: {
        url: audio.audioUrl,
        language: audio.language,
        languageCode: audio.languageCode,
        flag: audio.flag,
        displayName: audio.displayName,
        duration: audio.duration,
        fileSize: audio.fileSize,
        formattedDuration: audio.formattedDuration,
        formattedFileSize: audio.formattedFileSize,
        sampleText: audio.sampleText,
        metadata: audio.metadata,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching audio file:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch audio file",
      message: error.message,
    });
  }
});

// GET /api/languages - Get available languages only
router.get("/languages", async (req, res) => {
  try {
    const audioFiles = await Audio.getActiveLanguages();

    const languages = audioFiles.map((audio) => ({
      language: audio.language,
      languageCode: audio.languageCode,
      flag: audio.flag,
      displayName: audio.displayName,
      hasAudio: !!audio.audioUrl,
    }));

    res.json({
      success: true,
      count: languages.length,
      data: languages,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch languages",
      message: error.message,
    });
  }
});

// POST /api/audio-files - Add new audio file (for admin use)
router.post("/audio-files", async (req, res) => {
  try {
    const audioData = req.body;

    // Check if language already exists
    const existingAudio = await Audio.findOne({
      language: audioData.language.toLowerCase(),
    });

    if (existingAudio) {
      return res.status(409).json({
        success: false,
        error: "Audio file for this language already exists",
        language: audioData.language,
      });
    }

    const newAudio = new Audio(audioData);
    await newAudio.save();

    res.status(201).json({
      success: true,
      message: "Audio file added successfully",
      data: {
        url: newAudio.audioUrl,
        language: newAudio.language,
        languageCode: newAudio.languageCode,
        flag: newAudio.flag,
        displayName: newAudio.displayName,
      },
    });
  } catch (error) {
    console.error("Error adding audio file:", error);

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: validationErrors,
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to add audio file",
      message: error.message,
    });
  }
});

// PUT /api/audio-files/:language - Update audio file
router.put("/audio-files/:language", async (req, res) => {
  try {
    const { language } = req.params;
    const updateData = req.body;

    const audio = await Audio.findOneAndUpdate(
      { language: language.toLowerCase() },
      updateData,
      { new: true, runValidators: true }
    );

    if (!audio) {
      return res.status(404).json({
        success: false,
        error: "Audio file not found",
        language: language,
      });
    }

    res.json({
      success: true,
      message: "Audio file updated successfully",
      data: {
        url: audio.audioUrl,
        language: audio.language,
        languageCode: audio.languageCode,
        flag: audio.flag,
        displayName: audio.displayName,
      },
    });
  } catch (error) {
    console.error("Error updating audio file:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update audio file",
      message: error.message,
    });
  }
});

// DELETE /api/audio-files/:language - Delete audio file
router.delete("/audio-files/:language", async (req, res) => {
  try {
    const { language } = req.params;
    const audio = await Audio.findOneAndDelete({
      language: language.toLowerCase(),
    });

    if (!audio) {
      return res.status(404).json({
        success: false,
        error: "Audio file not found",
        language: language,
      });
    }

    res.json({
      success: true,
      message: "Audio file deleted successfully",
      deletedLanguage: language,
    });
  } catch (error) {
    console.error("Error deleting audio file:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete audio file",
      message: error.message,
    });
  }
});

// GET /api/health - Health check endpoint
router.get("/health", async (req, res) => {
  try {
    const audioCount = await Audio.countDocuments({ isActive: true });

    res.json({
      success: true,
      status: "healthy",
      database: "connected",
      audioFilesCount: audioCount,
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: "unhealthy",
      database: "disconnected",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;

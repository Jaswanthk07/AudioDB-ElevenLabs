import mongoose from "mongoose";
import Audio from "../models/audio.js";
import dotenv from "dotenv";

dotenv.config();

const audioData = [
  {
    language: "english",
    languageCode: "EN",
    flag: "🇺🇸",
    displayName: "English",
    audioUrl: "/uploads/english.ogg",
    duration: 30,
    fileSize: 289 * 1024,
    sampleText: "This is a sample text for English audio demonstration.",
    isActive: true,
    metadata: {
      quality: "high",
      sampleRate: "44100",
      bitrate: "320",
    },
  },
  {
    language: "russian",
    languageCode: "RU",
    flag: "🇷🇺",
    displayName: "Русский",
    audioUrl: "/uploads/russia.mp3",
    duration: 30,
    fileSize: 181 * 1024,
    sampleText: "Это образец текста для демонстрации русского аудио.",
    isActive: true,
    metadata: {
      quality: "high",
      sampleRate: "44100",
      bitrate: "320",
    },
  },
  {
    language: "japanese",
    languageCode: "JA",
    flag: "🇯🇵",
    displayName: "日本語",
    audioUrl: "/uploads/japanese.mp3",
    duration: 35,
    fileSize: 380 * 1024,
    sampleText:
      "これは日本語のオーディオデモンストレーション用のサンプルテキストです。",
    isActive: true,
    metadata: {
      quality: "high",
      sampleRate: "44100",
      bitrate: "320",
    },
  },
  {
    language: "arabic",
    languageCode: "AR",
    flag: "🇸🇦",
    displayName: "العربية",
    audioUrl: "/uploads/arabic.mp3",
    duration: 40,
    fileSize: 884 * 1024,
    sampleText: "هذا نص تجريبي لعرض الصوت باللغة العربية",
    isActive: true,
    metadata: {
      quality: "high",
      sampleRate: "44100",
      bitrate: "320",
    },
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/audiodb"
    );
    console.log("Connected to MongoDB");

    // Clear existing audio files
    await Audio.deleteMany({});
    console.log("Cleared existing audio files");

    // Insert new audio files
    await Audio.insertMany(audioData);
    console.log("Successfully seeded audio files");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();

// To run this script, use the following command:
// node scripts/seedAudioFiles.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Audio from "../models/audio.js";

// Load environment variables
dotenv.config();

// Sample audio data with working public audio URLs
const sampleAudioFiles = [
  {
    language: "english",
    audioUrl:
      "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
    duration: 30,
    fileSize: 480000,
    sampleText:
      'In the ancient land of Eldoria, where skies shimmered and forests whispered secrets to the wind, lived a dragon named Zephyros. Not the "burn it all down" kind... but he was gentle, wise, with eyes like old stars. Even the birds fell silent when he passed.',
    metadata: {
      quality: "high",
      sampleRate: "44100",
      bitrate: "320",
    },
  },
  {
    language: "arabic",
    audioUrl:
      "https://commondatastorage.googleapis.com/codeskulptor-assets/week7-button.m4a",
    duration: 2,
    fileSize: 52000,
    sampleText:
      'في أرض إلدوريا القديمة، حيث السماوات المتلألئة والغابات التي تهمس بالأسرار للرياح، عاش تنين يُدعى زفيروس. ليس من النوع الذي "يحرق كل شيء"... بل كان لطيفًا وحكيمًا، بعيون كالنجوم القديمة.',
    metadata: {
      quality: "high",
      sampleRate: "44100",
      bitrate: "320",
    },
  },
  {
    language: "spanish",
    audioUrl:
      "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg",
    duration: 15,
    fileSize: 450000,
    sampleText:
      'En la antigua tierra de Eldoria, donde los cielos brillaban y los bosques susurraban secretos al viento, vivía un dragón llamado Zephyros. No del tipo "quémalo todo"... sino que era gentil, sabio, con ojos como estrellas antiguas.',
    metadata: {
      quality: "high",
      sampleRate: "44100",
      bitrate: "320",
    },
  },
  {
    language: "japanese",
    audioUrl:
      "https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/start.ogg",
    duration: 8,
    fileSize: 180000,
    sampleText:
      "エルドリアの古い土地で、空がきらめき、森が風に秘密をささやく場所に、ゼフィロスという名前のドラゴンが住んでいました。「すべてを燃やす」タイプではありません...彼は優しく、賢く、古い星のような目をしていました。",
    metadata: {
      quality: "high",
      sampleRate: "44100",
      bitrate: "320",
    },
  },
  {
    language: "french",
    audioUrl:
      "https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/fx/engine-2.ogg",
    duration: 3,
    fileSize: 82000,
    sampleText:
      "Dans l'ancienne terre d'Eldoria, où les cieux scintillaient et les forêts murmuraient des secrets au vent, vivait un dragon nommé Zephyros. Pas du genre \"brûle tout\"... mais il était doux, sage, avec des yeux comme de vieilles étoiles.",
    metadata: {
      quality: "medium",
      sampleRate: "44100",
      bitrate: "256",
    },
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/audiodb";
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Clear existing audio files
    await Audio.deleteMany({});
    console.log("🗑️ Cleared existing audio files");

    // Insert sample data
    const insertedAudio = await Audio.insertMany(sampleAudioFiles);
    console.log(`🎵 Inserted ${insertedAudio.length} audio files:`);

    insertedAudio.forEach((audio) => {
      console.log(
        `   - ${audio.displayName} (${audio.language}): ${audio.audioUrl}`
      );
    });

    // Display summary
    const totalAudio = await Audio.countDocuments();
    console.log(`\n📊 Database seeding completed successfully!`);
    console.log(`📈 Total audio files in database: ${totalAudio}`);

    // Show API endpoint examples
    console.log(`\n🚀 Your API endpoints:`);
    console.log(
      `   - GET ${
        process.env.API_BASE_URL || "http://localhost:5000"
      }/api/audio-files`
    );
    console.log(
      `   - GET ${
        process.env.API_BASE_URL || "http://localhost:5000"
      }/api/languages`
    );
    console.log(
      `   - GET ${
        process.env.API_BASE_URL || "http://localhost:5000"
      }/api/audio-files/english`
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    console.error("Full error:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("🔐 Database connection closed");
    process.exit(0);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

// Run the seed function
console.log("🌱 Starting database seeding...");
console.log(
  `📁 Target database: ${
    process.env.MONGODB_URI || "mongodb://localhost:27017/audiodb"
  }`
);
console.log("⏳ This may take a few seconds...\n");

seedDatabase();

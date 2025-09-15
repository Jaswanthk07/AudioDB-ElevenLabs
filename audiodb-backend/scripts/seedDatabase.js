import mongoose from "mongoose";
import dotenv from "dotenv";
import Audio from "../models/audio.js";

// Load environment variables
dotenv.config();

// Sample audio data with working public audio URLs
// Language data with all required fields
const languages = {
  english: { code: "EN", flag: "🇺🇸", display: "English" },
  arabic: { code: "AR", flag: "🇸🇦", display: "العربية" },
  russian: { code: "RU", flag: "RU", display: "Русский" },
  japanese: { code: "JA", flag: "🇯🇵", display: "日本語" },
};

const sampleAudioFiles = [
  {
    language: "english",
    languageCode: languages.english.code,
    flag: languages.english.flag,
    displayName: languages.english.display,
    audioUrl: "/uploads/english.ogg",
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
    languageCode: languages.arabic.code,
    flag: languages.arabic.flag,
    displayName: languages.arabic.display,
    audioUrl: "/uploads/arabic.mp3",
    duration: 25,
    fileSize: 400000,
    sampleText:
      'في أرض إلدوريا القديمة، حيث السماوات المتلألئة والغابات التي تهمس بالأسرار للرياح، عاش تنين يُدعى زفيروس. ليس من النوع الذي "يحرق كل شيء"... بل كان لطيفًا وحكيمًا، بعيون كالنجوم القديمة.',
    metadata: {
      quality: "high",
      sampleRate: "44100",
      bitrate: "320",
    },
  },
  {
    language: "russian",
    languageCode: languages.russian.code,
    flag: languages.russian.flag,
    displayName: languages.russian.display,
    audioUrl: "/uploads/russia.mp3",
    duration: 15,
    fileSize: 450000,
    sampleText:
      'В древней земле Элдории, где небеса мерцали, а леса шептали секреты ветру, жил дракон по имени Зефирос. Не из тех, кто "все сжигает"... но он был добрым, мудрым, с глазами как старые звезды.',
    metadata: {
      quality: "high",
      sampleRate: "44100",
      bitrate: "320",
    },
  },
  {
    language: "japanese",
    languageCode: languages.japanese.code,
    flag: languages.japanese.flag,
    displayName: languages.japanese.display,
    audioUrl: "/uploads/japanese.mp3",
    duration: 20,
    fileSize: 320000,
    sampleText:
      "エルドリアの古い土地で、空がきらめき、森が風に秘密をささやく場所に、ゼフィロスという名前のドラゴンが住んでいました。「すべてを燃やす」タイプではありません...彼は優しく、賢く、古い星のような目をしていました。",
    metadata: {
      quality: "high",
      sampleRate: "44100",
      bitrate: "320",
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

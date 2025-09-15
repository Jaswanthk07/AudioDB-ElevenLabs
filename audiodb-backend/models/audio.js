import mongoose from "mongoose";

const audioSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: [
        "english",
        "arabic",
        "spanish",
        "japanese",
        "french",
        "german",
        "italian",
        "portuguese",
        "russian",
        "chinese",
      ],
    },
    languageCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      enum: ["EN", "AR", "ES", "JA", "FR", "DE", "IT", "PT", "RU", "ZH"],
    },
    flag: {
      type: String,
      required: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    audioUrl: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          // Allow both local paths and URLs
          return /^(\/uploads\/.*\.(mp3|wav|ogg|m4a)$|https?:\/\/.+\.(mp3|wav|ogg|m4a)$)/i.test(
            v
          );
        },
        message:
          "Audio URL must be either a valid local path (/uploads/...) or URL ending with .mp3, .wav, .ogg, or .m4a",
      },
    },
    duration: {
      type: Number,
      default: 0,
      min: 0,
    },
    fileSize: {
      type: Number,
      default: 0,
      min: 0,
    },
    sampleText: {
      type: String,
      default: "This is a sample text for audio demonstration.",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    metadata: {
      quality: {
        type: String,
        enum: ["low", "medium", "high", "premium"],
        default: "high",
      },
      sampleRate: {
        type: String,
        default: "44100",
      },
      bitrate: {
        type: String,
        default: "320",
      },
    },
  },
  {
    timestamps: true,
    collection: "audiofiles",
  }
);

// Indexes for better query performance
audioSchema.index({ language: 1 }, { unique: true }); // Single unique index for language
audioSchema.index({ languageCode: 1, isActive: 1 }); // Compound index for queries
audioSchema.index({ createdAt: -1 }); // Index for sorting by creation date

// Virtual for formatted duration
audioSchema.virtual("formattedDuration").get(function () {
  if (!this.duration) return "0:00";
  const minutes = Math.floor(this.duration / 60);
  const seconds = Math.floor(this.duration % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

// Virtual for formatted file size
audioSchema.virtual("formattedFileSize").get(function () {
  if (!this.fileSize) return "0 KB";
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(this.fileSize) / Math.log(1024));
  return (
    Math.round((this.fileSize / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  );
});

// Ensure virtual fields are serialized
audioSchema.set("toJSON", { virtuals: true });
audioSchema.set("toObject", { virtuals: true });

// Pre-save middleware
audioSchema.pre("save", function (next) {
  // Ensure language and languageCode consistency
  const languageMap = {
    english: { code: "EN", flag: "🇺🇸", display: "English" },
    arabic: { code: "AR", flag: "🇸🇦", display: "العربية" },
    spanish: { code: "ES", flag: "🇪🇸", display: "Español" },
    japanese: { code: "JA", flag: "🇯🇵", display: "日本語" },
    french: { code: "FR", flag: "🇫🇷", display: "Français" },
    german: { code: "DE", flag: "🇩🇪", display: "Deutsch" },
    italian: { code: "IT", flag: "🇮🇹", display: "Italiano" },
    portuguese: { code: "PT", flag: "🇵🇹", display: "Português" },
    russian: { code: "RU", flag: "🇷🇺", display: "Русский" },
    chinese: { code: "ZH", flag: "🇨🇳", display: "中文" },
  };

  if (languageMap[this.language]) {
    this.languageCode = languageMap[this.language].code;
    this.flag = languageMap[this.language].flag;
    this.displayName = languageMap[this.language].display;
  }

  next();
});

// Static method to get all active languages
audioSchema.statics.getActiveLanguages = function () {
  return this.find({ isActive: true })
    .select(
      "language languageCode flag displayName audioUrl duration fileSize sampleText metadata"
    )
    .sort({ language: 1 });
};

// Static method to get language by code
audioSchema.statics.getByLanguageCode = function (code) {
  return this.findOne({
    languageCode: code.toUpperCase(),
    isActive: true,
  });
};

// Instance method to toggle active status
audioSchema.methods.toggleActive = function () {
  this.isActive = !this.isActive;
  return this.save();
};

export default mongoose.model("Audio", audioSchema);

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Download,
  ChevronDown,
  Volume2,
  Loader2,
} from "lucide-react";

interface LanguageData {
  code: string;
  displayName: string;
  languageCode: string;
  url: string;
  flag?: string;
  formattedDuration?: string;
  formattedFileSize?: string;
  sampleText?: string;
  metadata?: {
    quality?: string;
    [key: string]: any;
  };
}

const sampleText = `In the ancient land of Eldoria, where skies shimmered and forests whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the "burn it all down" kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.`;

const voiceOptions = [
  {
    name: "Samara",
    category: "Narrate a story",
    emoji: "🎭",
    color: "bg-teal-50",
  },
  {
    name: "2 speakers",
    category: "Create a dialogue",
    emoji: "💬",
    color: "bg-pink-50",
  },
  {
    name: "Announcer",
    category: "Voiceover a game",
    emoji: "🎮",
    color: "bg-green-50",
  },
  {
    name: "Sergeant",
    category: "Play a drill sergeant",
    emoji: "🎖️",
    color: "bg-purple-50",
  },
  {
    name: "Spuds",
    category: "Recount an old story",
    emoji: "🎙️",
    color: "bg-cyan-50",
  },
  {
    name: "Jessica",
    category: "Provide customer support",
    emoji: "🌸",
    color: "bg-rose-50",
  },
];

const categoryOptions = [
  "Narrate a story",
  "Create a dialogue",
  "Voiceover a game",
  "Play a drill sergeant",
  "Recount an old story",
  "Provide customer support",
];

// Flag mapping for language codes that don't have emoji flags
const flagMap = {
  AR: "🇸🇦",
  RU: "🇷🇺",
  JA: "🇯🇵",
  EN: "🇺🇸",
  US: "🇺🇸",
  SA: "🇸🇦",
};

const formatTextWithTokens = (text) => {
  const parts = text.split(/(\[[^\]]+\])/g);
  return parts.map((part, index) =>
    part.match(/^\[[^\]]+\]$/) ? (
      <span key={index} className="text-purple-500 font-medium">
        {part}
      </span>
    ) : (
      part
    )
  );
};

export default function TextToSpeech() {
  const [text, setText] = useState(sampleText);
  const [languages, setLanguages] = useState<LanguageData[]>([]);
  const [audioFiles, setAudioFiles] = useState<Record<string, LanguageData>>(
    {}
  );
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedVoice, setSelectedVoice] = useState("Samara");
  const [selectedCategory, setSelectedCategory] = useState("Narrate a story");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");
  const audioRef = useRef(null);

  const API_BASE_URL = "https://audiodb-backend.onrender.com";

  // Get flag emoji, handling both emoji flags and country codes
  const getFlag = (flag, languageCode) => {
    if (!flag) return "🌐";

    // If it's already an emoji flag, return it
    if (flag.length > 2) return flag;

    // Otherwise, map the code to an emoji
    return flagMap[flag] || flagMap[languageCode] || "🌐";
  };

  const getFullAudioUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
  };

  useEffect(() => {
    fetchAudioFiles();
  }, []);

  const fetchAudioFiles = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/api/audio-files`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      if (data.success) {
        console.log("Received audio files:", data.data);

        // Store audio files with original keys
        setAudioFiles(data.data);

        // Process languages
        const availableLanguages = Object.entries(data.data).map(
          ([key, langData]: [string, any]) => {
            const typedLangData = langData as {
              flag?: string;
              languageCode?: string;
              displayName?: string;
              url?: string;
              duration?: number;
              fileSize?: number;
              formattedDuration?: string;
              formattedFileSize?: string;
              metadata?: { quality?: string; [key: string]: any };
            };

            return {
              code: key,
              displayName: typedLangData.displayName || key,
              languageCode: typedLangData.languageCode || key.toUpperCase(),
              url: typedLangData.url || "",
              flag: getFlag(typedLangData.flag, typedLangData.languageCode),
              formattedDuration: typedLangData.formattedDuration,
              formattedFileSize: typedLangData.formattedFileSize,
              metadata: typedLangData.metadata || {},
            };
          }
        );

        console.log("Processed languages:", availableLanguages);

        setLanguages(availableLanguages);

        // Set default language if current selection isn't available
        if (availableLanguages.length > 0) {
          const hasCurrentLanguage = availableLanguages.some(
            (lang) => lang.code.toLowerCase() === selectedLanguage.toLowerCase()
          );

          if (!hasCurrentLanguage) {
            setSelectedLanguage(availableLanguages[0].code);
          }
        }
      } else {
        throw new Error(data.error || "Failed to fetch audio files");
      }
    } catch (err) {
      console.error("Error fetching audio files:", err);
      setError(`Failed to load audio files: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => {
      setIsLoading(false);
      setError("");
    };
    const handleError = (e) => {
      const audioElement = e.target;
      const errorMessage = audioElement.error
        ? `Audio error: ${audioElement.error.message}`
        : "Failed to load audio file";
      console.error(errorMessage, audioElement.error);
      setError(errorMessage);
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);

      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      setIsLoading(false);
      setError("");
    };
  }, []);

  const handlePlay = async () => {
    const audio = audioRef.current;
    if (!audio) {
      setError("Audio player not initialized");
      return;
    }

    try {
      setError("");
      const currentAudio = audioFiles[selectedLanguage];

      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        return;
      }

      if (!currentAudio?.url) {
        setError("No audio available for selected language");
        return;
      }

      const fullUrl = getFullAudioUrl(currentAudio.url);
      console.log("Playing audio:", { url: fullUrl, currentAudio });

      if (audio.src !== fullUrl) {
        setIsLoading(true);
        audio.src = fullUrl;
        audio.preload = "auto";
        audio.crossOrigin = "anonymous";

        await new Promise((resolve, reject) => {
          const cleanup = () => {
            clearTimeout(timeout);
            audio.removeEventListener("canplaythrough", handleCanPlay);
            audio.removeEventListener("error", handleError);
          };

          const handleCanPlay = () => {
            cleanup();
            resolve(true);
          };

          const handleError = (e) => {
            cleanup();
            const audioElement = e.target;
            reject(
              new Error(audioElement.error?.message || "Failed to load audio")
            );
          };

          const timeout = setTimeout(() => {
            cleanup();
            reject(new Error("Audio loading timed out"));
          }, 10000);

          audio.addEventListener("canplaythrough", handleCanPlay);
          audio.addEventListener("error", handleError);
        });
      }

      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Playback error:", err);
      setError(err.message || "Failed to play audio. Please try again.");
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const currentAudio = audioFiles[selectedLanguage];
    if (currentAudio) {
      const link = document.createElement("a");
      link.href = getFullAudioUrl(currentAudio.url);
      const extension = currentAudio.url.split(".").pop() || "mp3";
      link.download = `audio_${selectedLanguage}_${Date.now()}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleLanguageSelect = async (languageCode) => {
    try {
      const audio = audioRef.current;
      if (audio && isPlaying) {
        audio.pause();
      }

      console.log("Selecting language:", {
        original: languageCode,
        availableKeys: Object.keys(audioFiles),
      });

      setSelectedLanguage(languageCode);
      setIsPlaying(false);
      setCurrentTime(0);
      setError("");

      const languageData = audioFiles[languageCode];
      if (!languageData) {
        throw new Error(`No audio data available for ${languageCode}`);
      }

      // Update sample text if available
      if (languageData.sampleText) {
        setText(languageData.sampleText);
      }

      // Pre-load the audio file
      if (audio && languageData.url) {
        setIsLoading(true);
        const fullUrl = getFullAudioUrl(languageData.url);
        audio.src = fullUrl;

        await new Promise((resolve) => {
          const handleCanPlay = () => {
            setIsLoading(false);
            resolve(true);
          };

          const handleError = () => {
            setError(`Failed to load audio for ${languageData.displayName}`);
            setIsLoading(false);
            resolve(false);
          };

          audio.addEventListener("canplaythrough", handleCanPlay, {
            once: true,
          });
          audio.addEventListener("error", handleError, { once: true });
        });
      }
    } catch (err) {
      console.error("Language selection error:", err);
      setError(err.message || "Failed to select language");
      setIsLoading(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const currentLanguageData: LanguageData = audioFiles[selectedLanguage] || {
    code: "",
    displayName: "Select Language",
    languageCode: "",
    url: "",
    flag: "🌐",
    formattedDuration: "",
    formattedFileSize: "",
    metadata: { quality: "Standard" },
  };
  const currentFlag = getFlag(
    currentLanguageData.flag,
    currentLanguageData.languageCode
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
      {error && !error.includes("Failed to load audio for") && (
        <div className="mb-4 p-3 bg-red-50/50 border border-red-100 rounded-lg flex items-center justify-between">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={() => setError("")}
            className="ml-3 text-red-400 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
        <div className="h-3 bg-gradient-to-r from-blue-100 via-purple-100 to-orange-100"></div>

        {/* Text Area */}
        <div className="p-4 sm:p-8 pb-0">
          <div className="relative">
            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full min-h-[200px] text-base sm:text-lg leading-relaxed resize-none border-2 border-gray-200 rounded-2xl focus:border-black transition-all duration-300 bg-white p-4 sm:p-6 outline-none"
                  placeholder="Enter your text here..."
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Done Editing
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setIsEditing(true)}
                className="min-h-[200px] cursor-text hover:bg-gray-50/50 transition-all duration-300 rounded-2xl p-4 sm:p-6 border-2 border-gray-100 hover:border-gray-200 text-base sm:text-lg leading-relaxed"
              >
                {formatTextWithTokens(text)}
              </div>
            )}
          </div>
        </div>

        {/* Voice and Category Selection */}
        <div className="px-4 sm:px-8 py-6 space-y-4">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {voiceOptions.map((voice) => (
              <button
                key={voice.name}
                onClick={() => setSelectedVoice(voice.name)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border transition-all duration-300 ${
                  voice.color
                } ${
                  selectedVoice === voice.name
                    ? "border-black ring-2 ring-black/20"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-base sm:text-lg">{voice.emoji}</span>
                <span className="font-semibold text-xs sm:text-sm">
                  {voice.name}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categoryOptions.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-2 rounded-full border transition-all duration-300 text-xs sm:text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-black text-white border-black"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Audio Progress */}
        {(isPlaying || currentTime > 0) && (
          <div className="px-4 sm:px-8 py-2">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <Volume2 className="w-4 h-4" />
              <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
                <div
                  className="bg-black rounded-full h-2 transition-all duration-300"
                  style={{
                    width: `${
                      duration > 0 ? (currentTime / duration) * 100 : 0
                    }%`,
                  }}
                ></div>
              </div>
              <span className="text-xs font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="px-4 sm:px-8 py-6 border-t border-gray-100 bg-gray-50/30">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Language Selector */}
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              {languages.length === 0 ? (
                <div className="w-full px-4 py-3 text-center text-gray-500 flex items-center justify-center gap-2 bg-gray-50 rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Loading languages...</span>
                </div>
              ) : (
                languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                      selectedLanguage === lang.code
                        ? "bg-black text-white border-black ring-2 ring-black/20"
                        : "bg-white border-gray-200 hover:border-black/20"
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <div className="text-left">
                      <span
                        className={`text-sm font-medium block ${
                          selectedLanguage === lang.code
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        {lang.displayName}
                      </span>
                      <span
                        className={`text-xs ${
                          selectedLanguage === lang.code
                            ? "text-white/80"
                            : "text-gray-500"
                        }`}
                      >
                        {lang.languageCode} • {lang.formattedDuration}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 justify-center sm:justify-end">
              <button
                onClick={handlePlay}
                disabled={isLoading || !currentLanguageData.url}
                className="flex items-center gap-3 bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none justify-center"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span>
                  {isLoading ? "LOADING" : isPlaying ? "PAUSE" : "PLAY"}
                </span>
              </button>

              <button
                onClick={handleDownload}
                disabled={!currentLanguageData.url}
                className="p-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Download audio"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          {currentLanguageData.formattedDuration && (
            <div className="mt-4 text-xs text-gray-500 text-center">
              Duration: {currentLanguageData.formattedDuration} • Size:{" "}
              {currentLanguageData.formattedFileSize} • Quality:{" "}
              {currentLanguageData.metadata?.quality || "Standard"}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-orange-100 px-4 sm:px-8 py-4">
          <div className="text-center">
            <span className="text-sm font-medium text-gray-700">
              Powered by AudioDB v1.0
            </span>
          </div>
        </div>
      </div>

      <audio ref={audioRef} preload="metadata" style={{ display: "none" }} />
    </div>
  );
}

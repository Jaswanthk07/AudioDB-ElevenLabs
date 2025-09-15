import { API_BASE_URL } from "../constant";

export interface AudioData {
  url: string;
  language: string;
  languageCode: string;
  flag: string;
  displayName: string;
  duration: number;
  fileSize: number;
  formattedDuration: string;
  formattedFileSize: string;
  sampleText: string;
  metadata: {
    quality: string;
    sampleRate: string;
    bitrate: string;
  };
}

export interface ApiResponse {
  success: boolean;
  count?: number;
  data: Record<string, AudioData>;
  timestamp: string;
}

export const fetchAudioFiles = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/audio-files`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching audio files:", error);
    throw error;
  }
};

export const fetchLanguageAudio = async (
  language: string
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/audio-files/${language}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching audio for ${language}:`, error);
    throw error;
  }
};

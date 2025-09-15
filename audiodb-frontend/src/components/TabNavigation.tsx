import React from "react";
import {
  Volume2,
  Users,
  Music,
  Mic,
  Globe,
  Copy,
  BookOpen,
} from "lucide-react";

// Tab Navigation Component - ElevenLabs Style
const TabNavigation = ({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}) => {
  const tabs = [
    { id: "text-to-speech", label: "Text to Speech", icon: Volume2 },
    { id: "agents", label: "Agents", icon: Users },
    { id: "music", label: "Music", icon: Music },
    { id: "speech-to-text", label: "Speech to Text", icon: Mic },
    { id: "dubbing", label: "Dubbing", icon: Globe },
    { id: "voice-cloning", label: "Voice Cloning", icon: Copy },
    { id: "eleven-reader", label: "ElevenReader", icon: BookOpen },
  ];

  return (
    <div className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      {/* Container with centered content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab container with ElevenLabs pill style */}
        <div className="flex justify-center py-4">
          <div
            className="bg-gray-100 rounded-2xl p-1.5 inline-flex overflow-x-auto overflow-y-hidden"
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="flex gap-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 ease-out transform
                      ${
                        isActive
                          ? "bg-white text-black shadow-sm scale-105"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/60 hover:scale-102"
                      }
                    `}
                    style={{
                      fontFamily:
                        '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
                      fontSize: "11px",
                      fontWeight: isActive ? 700 : 600,
                      letterSpacing: "0.08em",
                    }}
                  >
                    <IconComponent
                      className={`w-3.5 h-3.5 transition-colors duration-300 ${
                        isActive ? "text-black" : "text-gray-500"
                      }`}
                    />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle gradient line at bottom */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50"></div>
    </div>
  );
};

export default TabNavigation;

import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TabNavigation from "./components/TabNavigation";
import TextToSpeech from "./components/TextToSpeech";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create a stable query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

// Main App Component with Tab Navigation
const MainApp = () => {
  const [activeTab, setActiveTab] = useState("text-to-speech");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation Tabs */}
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content */}
      <main className="safe-top safe-bottom">
        {activeTab === "text-to-speech" && <TextToSpeech />}

        {/* Other tab content - Coming Soon */}
        {activeTab === "agents" && <ComingSoonSection title="Agents" />}
        {activeTab === "music" && <ComingSoonSection title="Music" />}
        {activeTab === "speech-to-text" && (
          <ComingSoonSection title="Speech to Text" />
        )}
        {activeTab === "dubbing" && <ComingSoonSection title="Dubbing" />}
        {activeTab === "voice-cloning" && (
          <ComingSoonSection title="Voice Cloning" />
        )}
        {activeTab === "eleven-reader" && (
          <ComingSoonSection title="AudioReader" />
        )}
      </main>
    </div>
  );
};

// Coming Soon Component
const ComingSoonSection = ({ title }: { title: string }) => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 text-center animate-fade-in">
    <div className="card-elevated p-8 sm:p-12">
      <div className="space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">🚀</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {title}
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          We're working hard to bring you this feature. Stay tuned for updates!
        </p>
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

// Root App Component with Providers and Router
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/app" element={<MainApp />} />
            <Route path="/text-to-speech" element={<MainApp />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

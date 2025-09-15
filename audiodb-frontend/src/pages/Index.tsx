import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TabNavigation from "@/components/TabNavigation";
import TextToSpeech from "@/components/TextToSpeech";

const Index = () => {
  const [activeTab, setActiveTab] = useState("text-to-speech");

  const renderTabContent = () => {
    switch (activeTab) {
      case "text-to-speech":
        return <TextToSpeech />;
      default:
        return (
          <div className="w-full max-w-4xl mx-auto py-16 text-center">
            <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
              {activeTab.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </h2>
            <p className="text-muted-foreground">
              This feature is coming soon! Try the Text to Speech tab for now.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container py-8">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Index;

import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="w-full py-20 lg:py-32 bg-background">
      <div className="container text-center space-y-8 lg:space-y-12">
        {/* Main Headline */}
        <h1 className="font-montserrat font-normal text-headline max-w-5xl mx-auto px-4">
          The most realistic voice AI platform
        </h1>

        {/* Subheading */}
        <p className="font-montserrat font-normal text-subheading max-w-4xl mx-auto px-4">
          AI voice models and products powering millions of developers,
          creators, and enterprises. From low-latency conversational agents to
          the leading AI voice generator for voiceovers and audiobooks.
        </p>

        {/* CTA Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
          <Button className="btn-primary w-full sm:w-auto min-w-[160px]">
            SIGN UP
          </Button>
          <Button className="btn-secondary w-full sm:w-auto min-w-[160px]">
            CONTACT SALES
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

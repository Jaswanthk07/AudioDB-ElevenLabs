import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <header className="w-full border-b border-border bg-background relative">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo with brand mark */}
        <div className="flex items-center">
          <span className="logo-text">
            <span className="text-muted-foreground mr-1">||</span>
            ElevenLabs
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="#"
              className="nav-item hover:text-foreground transition-smooth flex items-center gap-1"
            >
              Creative Platform
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            {/* Dropdown Menu */}
            <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
              <div className="grid grid-cols-2 gap-8">
                {/* Research Column */}
                <div>
                  <h3 className="dropdown-section-title">Research</h3>
                  <div className="space-y-2">
                    <div className="dropdown-item">Text to Speech</div>
                    <div className="dropdown-item">Speech to Text</div>
                    <div className="dropdown-item">Voice Changer</div>
                    <div className="dropdown-item">Voice Cloning</div>
                    <div className="dropdown-item">Voice Design</div>
                    <div className="dropdown-item">Voice Isolator</div>
                    <div className="dropdown-item">Sound Effects</div>
                    <div className="dropdown-item">Music</div>
                  </div>
                </div>

                {/* Products Column */}
                <div>
                  <h3 className="dropdown-section-title">Products</h3>
                  <div className="space-y-2">
                    <div className="dropdown-item">Studio</div>
                    <div className="dropdown-item">Voice Library</div>
                    <div className="dropdown-item">Dubbing</div>
                    <div className="dropdown-item">ElevenLabs Mobile App</div>
                  </div>
                </div>
              </div>

              {/* V3 Badge Section */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="v3-badge">V3 Meet Eleven v3 (Alpha)</div>
                <div className="v3-description">
                  Experience our most advanced AI voice technology with enhanced
                  naturalness and emotional range.
                </div>
              </div>
            </div>
          </div>

          <a
            href="#"
            className="nav-item hover:text-foreground transition-smooth flex items-center gap-1"
          >
            Agents Platform
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <a
            href="#"
            className="nav-item hover:text-foreground transition-smooth flex items-center gap-1"
          >
            Developers
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <a
            href="#"
            className="nav-item hover:text-foreground transition-smooth flex items-center gap-1"
          >
            Resources
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <a
            href="#"
            className="nav-item hover:text-foreground transition-smooth"
          >
            Enterprise
          </a>

          <a
            href="#"
            className="nav-item hover:text-foreground transition-smooth"
          >
            Pricing
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            className="nav-item hover:bg-muted transition-smooth px-4 py-2 rounded-md"
          >
            Log in
          </Button>
          <Button className="btn-primary">Sign up</Button>
        </div>

        {/* Mobile Menu Button (hidden for now, can be implemented later) */}
        <div className="lg:hidden">
          <Button variant="ghost" className="p-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

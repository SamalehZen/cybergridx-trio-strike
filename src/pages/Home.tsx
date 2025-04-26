
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Info, Volume2, VolumeX } from "lucide-react";

const Home = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<"default" | "neon" | "cyber">("default");
  const navigate = useNavigate();

  useEffect(() => {
    const body = document.body;
    body.classList.remove("default", "neon", "cyber");
    body.classList.add(selectedTheme);
  }, [selectedTheme]);

  const handleThemeSelect = (theme: "default" | "neon" | "cyber") => {
    setSelectedTheme(theme);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="scanline"></div>

      <main className="flex-1 container px-4 py-8 flex flex-col items-center justify-center">
        <header className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-primary mb-4">
            TEAM ISKUDAYS
          </h1>
          <p className="text-white/70 text-lg md:text-xl">
            TRIO-STRIKE TACTICAL GRID SYSTEM
          </p>
        </header>

        <div className="flex flex-col gap-4 mb-8">
          <button onClick={() => handleThemeSelect("default")} className="cyber-button group flex items-center justify-center gap-3 py-4 text-lg">Default</button>
          <button onClick={() => handleThemeSelect("neon")} className="cyber-button group flex items-center justify-center gap-3 py-4 text-lg">Neon</button>
          <button onClick={() => handleThemeSelect("cyber")} className="cyber-button group flex items-center justify-center gap-3 py-4 text-lg">Cyber</button>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-md">
          <button
            onClick={() => navigate(`/game?theme=${selectedTheme}`)}
            className="cyber-button group flex items-center justify-center gap-3 py-4 text-lg"
          >
            <Play className="w-5 h-5" />
            <span>START GAME</span>
          </button>
          
          <button 
            onClick={() => navigate("/rules")}
            className="cyber-button group flex items-center justify-center gap-3 py-4 text-lg"
          >
            <Info className="w-5 h-5" />
            <span>RULES</span>
          </button>
          
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className="cyber-button group flex items-center justify-center gap-3 py-4 text-lg"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-5 h-5" />
                <span>UNMUTE AUDIO</span>
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5" />
                <span>MUTE AUDIO</span>
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;

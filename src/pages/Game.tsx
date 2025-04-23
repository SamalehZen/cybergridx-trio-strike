
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CyberGridX from "../components/CyberGridX";

const Game = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="scanline"></div>
      
      <main className="flex-1 container px-4 py-8">
        <button 
          onClick={() => navigate('/')}
          className="cyber-button mb-8 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO MENU</span>
        </button>

        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-primary mb-2">
            TEAM ISKUDAYS
          </h1>
          <p className="text-white/70 text-sm md:text-base">TRIO-STRIKE TACTICAL GRID SYSTEM</p>
        </header>
        
        <CyberGridX />
      </main>
    </div>
  );
};

export default Game;

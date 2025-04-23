
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CyberGridX from "../components/CyberGridX";
import AudioManager from "../components/AudioManager";
import GameStats from "../components/GameStats";
import { useState, useEffect } from "react";

const Game = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [hasWinner, setHasWinner] = useState(false);
  const [stats, setStats] = useState({
    playerXWins: 0,
    playerOWins: 0,
    draws: 0
  });

  useEffect(() => {
    setHasWinner(false);
  }, []);

  const handleGameEnd = (winner: 'x' | 'o' | 'draw' | null) => {
    if (winner === 'x') {
      setStats(prev => ({ ...prev, playerXWins: prev.playerXWins + 1 }));
      setHasWinner(true);
    } else if (winner === 'o') {
      setStats(prev => ({ ...prev, playerOWins: prev.playerOWins + 1 }));
      setHasWinner(true);
    } else if (winner === 'draw') {
      setStats(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

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

        <GameStats {...stats} />
        
        <CyberGridX onWin={(winner) => handleGameEnd(winner)} />

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="fixed bottom-4 right-4 cyber-button"
        >
          {isMuted ? "🔇 UNMUTE" : "🔊 MUTE"}
        </button>
      </main>

      <AudioManager isMuted={isMuted} isWinning={hasWinner} />
    </div>
  );
};

export default Game;



import { Trophy, TrendingDown, Circle } from "lucide-react";

interface GameStatsProps {
  playerXWins: number;
  playerOWins: number;
  draws: number;
}

const GameStats = ({ playerXWins, playerOWins, draws }: GameStatsProps) => {
  return (
    <div className="flex justify-between items-center bg-cyber-dark/80 backdrop-blur rounded-lg p-4 mb-4">
      <div className="text-center">
        <div className="text-cyber-cyan flex items-center gap-2 justify-center">
          <Trophy className="w-5 h-5" />
          <span>{playerXWins}</span>
        </div>
        <div className="text-xs text-white/70">Player X</div>
      </div>
      
      <div className="text-center">
        <div className="text-white/90 flex items-center gap-2 justify-center">
          <TrendingDown className="w-5 h-5" />
          <span>{draws}</span>
        </div>
        <div className="text-xs text-white/70">Draws</div>
      </div>
      
      <div className="text-center">
        <div className="text-cyber-primary flex items-center gap-2 justify-center">
          <Circle className="w-5 h-5" fill="currentColor" />
          <span>{playerOWins}</span>
        </div>
        <div className="text-xs text-white/70">Player O</div>
      </div>
    </div>
  );
};

export default GameStats;

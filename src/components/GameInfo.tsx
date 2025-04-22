import { Circle, X } from "lucide-react";
import { GameState, Player } from "../types/game";

interface GameInfoProps {
  gameState: GameState;
  onRestart: () => void;
}

const GameInfo = ({ gameState, onRestart }: GameInfoProps) => {
  const { currentPlayer, winner, isGameOver, playerXMoves, playerOMoves, selectionMode } = gameState;

  const renderPlayerSymbol = (player: Player) => {
    return player === "x" ? (
      <X size={20} className="inline text-cyber-cyan" />
    ) : (
      <Circle size={16} className="inline text-cyber-primary" />
    );
  };

  const renderGameStatus = () => {
    if (selectionMode) {
      return (
        <div className={`${currentPlayer === "x" ? "text-cyber-cyan" : "text-cyber-primary"} animate-pulse-glow`}>
          <span className="font-bold text-xl">SELECT SYMBOL TO REMOVE</span>
          <p className="text-sm text-white/70">Click on one of your symbols</p>
        </div>
      );
    }

    if (winner === "draw") {
      return (
        <div className="text-cyber-cyan animate-pulse-glow">
          <span className="font-bold text-xl">GRID LOCKED</span>
          <p className="text-sm text-white/70">No winner detected</p>
        </div>
      );
    } else if (winner) {
      return (
        <div className={`${winner === "x" ? "text-cyber-cyan" : "text-cyber-primary"} animate-pulse-glow`}>
          <span className="font-bold text-xl">PLAYER {winner.toUpperCase()} WINS</span>
          <p className="text-sm text-white/70">Sequence complete</p>
        </div>
      );
    } else {
      return (
        <div>
          <span className="font-bold">CURRENT PLAYER: </span>
          <span className={currentPlayer === "x" ? "text-cyber-cyan" : "text-cyber-primary"}>
            {renderPlayerSymbol(currentPlayer)} PLAYER {currentPlayer.toUpperCase()}
          </span>
        </div>
      );
    }
  };

  const renderMoveCounter = (player: Player) => {
    const moves = player === "x" ? playerXMoves : playerOMoves;
    return (
      <div className={`flex items-center ${player === "x" ? "text-cyber-cyan" : "text-cyber-primary"}`}>
        <div className="mr-2">{renderPlayerSymbol(player)}</div>
        <div className="text-xs">
          <div className="font-bold">PLAYER {player.toUpperCase()}</div>
          <div className="text-white/70">{moves.length}/3 SYMBOLS ACTIVE</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="cyber-border p-4 text-center">{renderGameStatus()}</div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="cyber-border p-3">
          {renderMoveCounter("x")}
        </div>
        <div className="cyber-border p-3">
          {renderMoveCounter("o")}
        </div>
      </div>
      
      {isGameOver && (
        <button
          className="cyber-button mt-4"
          onClick={onRestart}
        >
          RESET GRID
        </button>
      )}
    </div>
  );
};

export default GameInfo;

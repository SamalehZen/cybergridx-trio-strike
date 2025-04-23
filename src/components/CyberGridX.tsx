
import { useState, useEffect } from "react";
import { CellPosition } from "../types/game";
import { initializeGame, makeMove, removeSymbol } from "../utils/gameLogic";
import GameBoard from "./GameBoard";
import GameInfo from "./GameInfo";

interface CyberGridXProps {
  onWin?: (winner: 'x' | 'o' | 'draw' | null) => void;
}

const CyberGridX = ({ onWin }: CyberGridXProps) => {
  const [gameState, setGameState] = useState(initializeGame());
  
  useEffect(() => {
    if (gameState.winner) {
      onWin?.(gameState.winner);
    }
  }, [gameState.winner, onWin]);

  const handleCellClick = (position: CellPosition) => {
    if (gameState.isGameOver) return;
    
    if (gameState.selectionMode) {
      const cell = gameState.board[position.row][position.col];
      if (cell === gameState.currentPlayer) {
        const newGameState = removeSymbol(gameState, position);
        setGameState(newGameState);
      }
    } else {
      const newGameState = makeMove(gameState, position);
      setGameState(newGameState);
    }
  };
  
  const handleRestart = () => {
    setGameState(initializeGame());
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <GameBoard gameState={gameState} onCellClick={handleCellClick} />
        </div>
        <div>
          <GameInfo 
            gameState={gameState} 
            onRestart={handleRestart} 
          />
        </div>
      </div>
    </div>
  );
};

export default CyberGridX;


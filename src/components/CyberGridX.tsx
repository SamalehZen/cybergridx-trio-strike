
import { useState } from "react";
import { CellPosition } from "../types/game";
import { initializeGame, makeMove } from "../utils/gameLogic";
import GameBoard from "./GameBoard";
import GameInfo from "./GameInfo";

const CyberGridX = () => {
  const [gameState, setGameState] = useState(initializeGame());
  
  const handleCellClick = (position: CellPosition) => {
    if (gameState.isGameOver) return;
    
    const newGameState = makeMove(gameState, position);
    setGameState(newGameState);
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
          <GameInfo gameState={gameState} onRestart={handleRestart} />
        </div>
      </div>
    </div>
  );
};

export default CyberGridX;

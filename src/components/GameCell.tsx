
import { Square, Circle } from "lucide-react";
import { Cell, CellPosition, MoveHistory } from "../types/game";
import { useEffect, useState } from "react";

interface GameCellProps {
  value: Cell;
  position: CellPosition;
  onCellClick: (position: CellPosition) => void;
  isWinningCell: boolean;
  moveHistory: MoveHistory[];
}

const GameCell = ({ value, position, onCellClick, isWinningCell, moveHistory }: GameCellProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousValue, setPreviousValue] = useState<Cell>(null);

  useEffect(() => {
    if (value !== previousValue) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      setPreviousValue(value);
      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);

  const isFirstMove = (symbol: Cell): boolean => {
    if (!symbol) return false;
    const symbolMoves = moveHistory.filter(move => move.player === symbol);
    if (symbolMoves.length === 0) return false;
    const firstMove = symbolMoves[0];
    return firstMove.position.row === position.row && firstMove.position.col === position.col;
  };

  return (
    <div 
      className={`cyber-grid-cell w-full h-full ${isWinningCell ? 'bg-cyber-vivid/30 win-animation' : ''}`} 
      onClick={() => onCellClick(position)}
    >
      <div className="multicolor-trail" />
      {value === "x" && (
        <Square 
          size={36} 
          className={`symbol player-x ${isAnimating ? 'symbol-fade-in' : ''} 
            ${isWinningCell ? 'animate-glitch' : ''} 
            ${isFirstMove(value) ? 'animate-pulse opacity-100' : ''}`}
          strokeWidth={3}
        />
      )}
      {value === "o" && (
        <Circle 
          size={30} 
          className={`symbol player-o ${isAnimating ? 'symbol-fade-in' : ''} 
            ${isWinningCell ? 'animate-glitch' : ''} 
            ${isFirstMove(value) ? 'animate-pulse opacity-100' : ''}`}
          strokeWidth={3}
          fill="currentColor"
        />
      )}
    </div>
  );
};

export default GameCell;

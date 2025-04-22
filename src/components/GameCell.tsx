
import { Circle, X } from "lucide-react";
import { Cell, CellPosition } from "../types/game";
import { useEffect, useState } from "react";

interface GameCellProps {
  value: Cell;
  position: CellPosition;
  onCellClick: (position: CellPosition) => void;
  isWinningCell: boolean;
}

const GameCell = ({ value, position, onCellClick, isWinningCell }: GameCellProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousValue, setPreviousValue] = useState<Cell>(null);

  useEffect(() => {
    // If value changes, trigger animation
    if (value !== previousValue) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      setPreviousValue(value);
      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);

  const handleClick = () => {
    onCellClick(position);
  };

  return (
    <div 
      className={`cyber-grid-cell w-full h-full ${isWinningCell ? 'bg-cyber-vivid/30 animate-pulse-glow' : ''}`} 
      onClick={handleClick}
    >
      {value === "x" && (
        <X 
          size={36} 
          className={`player-x ${isAnimating ? 'symbol-fade-in' : ''} ${isWinningCell ? 'animate-glitch' : ''}`} 
        />
      )}
      {value === "o" && (
        <Circle 
          size={30} 
          className={`player-o ${isAnimating ? 'symbol-fade-in' : ''} ${isWinningCell ? 'animate-glitch' : ''}`} 
        />
      )}
    </div>
  );
};

export default GameCell;

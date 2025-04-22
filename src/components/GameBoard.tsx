
import React from "react";
import { CellPosition, GameState } from "../types/game";
import GameCell from "./GameCell";

interface GameBoardProps {
  gameState: GameState;
  onCellClick: (position: CellPosition) => void;
}

const GameBoard = ({ gameState, onCellClick }: GameBoardProps) => {
  const { board, winLine } = gameState;

  // Check if a cell is part of the winning line
  const isWinningCell = (row: number, col: number): boolean => {
    if (!winLine) return false;
    return winLine.some((pos) => pos.row === row && pos.col === col);
  };

  // Calculate win line styles if there's a winner
  const getWinLineStyle = () => {
    if (!winLine) return null;

    const start = winLine[0];
    const end = winLine[winLine.length - 1];

    // Determine if line is horizontal, vertical, or diagonal
    if (start.row === end.row) {
      // Horizontal line
      return {
        top: `calc(${start.row * 33.33 + 16.5}% - 2px)`,
        left: '5%',
        width: '90%',
        height: '4px',
      };
    } else if (start.col === end.col) {
      // Vertical line
      return {
        top: '5%',
        left: `calc(${start.col * 33.33 + 16.5}% - 2px)`,
        width: '4px',
        height: '90%',
      };
    } else if (start.row === 0 && start.col === 0) {
      // Diagonal from top-left to bottom-right
      return {
        top: '5%',
        left: '5%',
        width: '90%',
        height: '4px',
        transform: 'rotate(45deg)',
        transformOrigin: 'top left',
      };
    } else {
      // Diagonal from top-right to bottom-left
      return {
        top: '5%',
        right: '5%',
        width: '90%',
        height: '4px',
        transform: 'rotate(-45deg)',
        transformOrigin: 'top right',
      };
    }
  };

  return (
    <div className="cyber-border relative w-full max-w-md aspect-square mx-auto">
      {/* Win line */}
      {winLine && <div className="win-line" style={getWinLineStyle()} />}
      
      <div className="grid grid-cols-3 grid-rows-3 gap-px w-full h-full bg-cyber-primary/30 p-px">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GameCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              position={{ row: rowIndex, col: colIndex }}
              onCellClick={onCellClick}
              isWinningCell={isWinningCell(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      
      {/* Grid lines overlay for aesthetic effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full grid grid-cols-3 grid-rows-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border border-cyber-primary/10" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;

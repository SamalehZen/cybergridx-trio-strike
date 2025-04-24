
import React from "react";
import { CellPosition, GameState } from "../types/game";
import GameCell from "./GameCell";

interface GameBoardProps {
  gameState: GameState;
  onCellClick: (position: CellPosition) => void;
}

const GameBoard = ({ gameState, onCellClick }: GameBoardProps) => {
  const { board, winLine, moveHistory } = gameState;

  const isWinningCell = (row: number, col: number): boolean => {
    if (!winLine) return false;
    return winLine.some((pos) => pos.row === row && pos.col === col);
  };

  const getWinLineStyle = () => {
    if (!winLine) return null;

    const start = winLine[0];
    const end = winLine[winLine.length - 1];
    const baseStyle = {
      position: 'absolute' as const,
      background: 'linear-gradient(90deg, #ff719A, #33C3F0)',
      boxShadow: '0 0 20px rgba(155, 135, 245, 0.8)',
      zIndex: 10,
      borderRadius: '4px',
    };

    if (start.row === end.row) {
      // Horizontal line
      return {
        ...baseStyle,
        top: `calc(${start.row * 33.33 + 16.5}% - 2px)`,
        left: '5%',
        width: '90%',
        height: '4px',
        animation: 'slideRight 0.5s ease-out forwards',
      };
    } else if (start.col === end.col) {
      // Vertical line
      return {
        ...baseStyle,
        left: `calc(${start.col * 33.33 + 16.5}% - 2px)`,
        top: '5%',
        width: '4px',
        height: '90%',
        animation: 'slideDown 0.5s ease-out forwards',
      };
    } else if (start.row === 0 && start.col === 0) {
      // Diagonal from top-left to bottom-right
      return {
        ...baseStyle,
        top: '5%',
        left: '5%',
        width: '130%',
        height: '4px',
        transform: 'rotate(45deg)',
        transformOrigin: 'top left',
        animation: 'slideDiagonal 0.5s ease-out forwards',
      };
    } else {
      // Diagonal from top-right to bottom-left
      return {
        ...baseStyle,
        top: '5%',
        right: '5%',
        width: '130%',
        height: '4px',
        transform: 'rotate(-45deg)',
        transformOrigin: 'top right',
        animation: 'slideDiagonalReverse 0.5s ease-out forwards',
      };
    }
  };

  return (
    <div className="cyber-border relative w-full max-w-md aspect-square mx-auto">
      {winLine && <div style={getWinLineStyle()} />}
      
      <div className="grid grid-cols-3 grid-rows-3 gap-px w-full h-full bg-cyber-primary/30 p-px">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GameCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              position={{ row: rowIndex, col: colIndex }}
              onCellClick={onCellClick}
              isWinningCell={isWinningCell(rowIndex, colIndex)}
              moveHistory={moveHistory}
            />
          ))
        )}
      </div>
      
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

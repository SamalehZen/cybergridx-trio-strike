
export type Player = "x" | "o";

export type Cell = Player | null;

export interface CellPosition {
  row: number;
  col: number;
}

export interface MoveHistory {
  position: CellPosition;
  player: Player;
  timestamp: number;
}

export type GameBoard = Cell[][];

export interface GameState {
  board: GameBoard;
  moveHistory: MoveHistory[];
  playerXMoves: MoveHistory[];
  playerOMoves: MoveHistory[];
  currentPlayer: Player;
  winner: Player | "draw" | null;
  winLine: CellPosition[] | null;
  isGameOver: boolean;
}

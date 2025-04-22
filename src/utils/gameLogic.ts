import { Cell, CellPosition, GameBoard, GameState, MoveHistory, Player } from "../types/game";

const MAX_MOVES_PER_PLAYER = 3;

// Create an empty 3x3 board
export const createEmptyBoard = (): GameBoard => {
  return Array(3).fill(null).map(() => Array(3).fill(null));
};

// Initialize a new game
export const initializeGame = (): GameState => {
  return {
    board: createEmptyBoard(),
    moveHistory: [],
    playerXMoves: [],
    playerOMoves: [],
    currentPlayer: "x",
    winner: null,
    winLine: null,
    isGameOver: false,
    selectionMode: false,
    pendingMove: null,
  };
};

export const makeMove = (
  state: GameState,
  position: CellPosition
): GameState => {
  const newState = { ...state };
  const { row, col } = position;

  if (newState.isGameOver || newState.board[row][col] !== null) {
    return newState;
  }

  const currentPlayer = newState.currentPlayer;
  const currentPlayerMoves = currentPlayer === "x" ? newState.playerXMoves : newState.playerOMoves;

  if (currentPlayerMoves.length === MAX_MOVES_PER_PLAYER) {
    // Enter selection mode
    newState.selectionMode = true;
    newState.pendingMove = position;
    return newState;
  }

  return processMove(newState, position);
};

export const processMove = (state: GameState, position: CellPosition): GameState => {
  const newState = { ...state };
  const { row, col } = position;
  const currentPlayer = newState.currentPlayer;
  
  const move: MoveHistory = {
    position,
    player: currentPlayer,
    timestamp: Date.now(),
  };

  newState.moveHistory = [...newState.moveHistory, move];

  if (currentPlayer === "x") {
    newState.playerXMoves = [...newState.playerXMoves, move];
  } else {
    newState.playerOMoves = [...newState.playerOMoves, move];
  }

  const newBoard = [...newState.board];
  newBoard[row] = [...newBoard[row]];
  newBoard[row][col] = currentPlayer;
  newState.board = newBoard;

  const winResult = checkWinner(newState.board);
  if (winResult) {
    newState.winner = winResult.winner;
    newState.winLine = winResult.line;
    newState.isGameOver = true;
  } else if (isBoardFull(newState.board)) {
    newState.winner = "draw";
    newState.isGameOver = true;
  } else {
    newState.currentPlayer = currentPlayer === "x" ? "o" : "x";
  }

  return newState;
};

export const removeSymbol = (state: GameState, position: CellPosition): GameState => {
  const newState = { ...state };
  const currentPlayer = newState.currentPlayer;
  const playerMoves = currentPlayer === "x" ? newState.playerXMoves : newState.playerOMoves;

  // Remove the selected symbol
  if (currentPlayer === "x") {
    newState.playerXMoves = playerMoves.filter(
      move => move.position.row !== position.row || move.position.col !== position.col
    );
  } else {
    newState.playerOMoves = playerMoves.filter(
      move => move.position.row !== position.row || move.position.col !== position.col
    );
  }

  // Clear the cell on the board
  newState.board[position.row][position.col] = null;

  // Exit selection mode and process the pending move
  newState.selectionMode = false;
  if (newState.pendingMove) {
    return processMove(newState, newState.pendingMove);
  }

  return newState;
};

// Check if the board is full (a draw)
export const isBoardFull = (board: GameBoard): boolean => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === null) {
        return false;
      }
    }
  }
  return true;
};

// Check for a winner
export const checkWinner = (
  board: GameBoard
): { winner: Player; line: CellPosition[] } | null => {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] &&
      board[row][0] === board[row][1] &&
      board[row][0] === board[row][2]
    ) {
      return {
        winner: board[row][0] as Player,
        line: [
          { row, col: 0 },
          { row, col: 1 },
          { row, col: 2 },
        ],
      };
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] &&
      board[0][col] === board[1][col] &&
      board[0][col] === board[2][col]
    ) {
      return {
        winner: board[0][col] as Player,
        line: [
          { row: 0, col },
          { row: 1, col },
          { row: 2, col },
        ],
      };
    }
  }

  // Check diagonals
  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    return {
      winner: board[0][0] as Player,
      line: [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 },
      ],
    };
  }

  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0]
  ) {
    return {
      winner: board[0][2] as Player,
      line: [
        { row: 0, col: 2 },
        { row: 1, col: 1 },
        { row: 2, col: 0 },
      ],
    };
  }

  return null;
};

// Reset the game
export const resetGame = (): GameState => {
  return initializeGame();
};

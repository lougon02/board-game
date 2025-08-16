import type { Move, Ctx } from "boardgame.io";
import type { MyGameState } from "./state";
import { INVALID_MOVE } from 'boardgame.io/core';

export const moveToCell: Move<MyGameState> = ({G, ctx}, cell: [number, number]) => {
  const [x, y] = cell;

  if (G.cells[x][y] === null) {
    G.cells[x][y] = ctx.currentPlayer ?? null;
  }
  else {
    console.log(`Cell (${x}, ${y}) is already occupied`);
    return INVALID_MOVE
  }

  console.log(`Player ${ctx.currentPlayer} moved to cell (${x}, ${y})`);
};

export const resetBoard: Move<MyGameState> = (({G, ctx}) => {
  G.cells = Array.from({ length: 19 }, () => Array(19).fill(null));
  console.log(`The board was reset`);
});

export const throwDice: Move<MyGameState> = ({G, ctx}) => {
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  console.log(`Player ${ctx.currentPlayer} threw a ${diceRoll}`);
};

export const askQuestion: Move<MyGameState> = ({G, ctx}, question: string) => {
  console.log(`Player ${ctx.currentPlayer} asked a question: ${question}`);
};

export const moves = {
  moveToCell,
  resetBoard,
  throwDice,
  askQuestion,
};
import type { Move, Ctx } from "boardgame.io";
import type { MyGameState } from "./state";
import { INVALID_MOVE } from 'boardgame.io/core';
import { boardGraph } from "@game/board.ts";

console.log(boardGraph);

export const moveToCell: Move<MyGameState> = ({G, ctx}, cell: [number, number]) => {
  const [x, y] = cell;
  //const board = G.gameBoard;
/*
  if (!placePiece(board, ctx.currentPlayer ?? null, [x, y])) {
    return INVALID_MOVE;
  }*/

  console.log(`Player ${ctx.currentPlayer} moved to cell (${x}, ${y})`); 
};


export const throwDice: Move<MyGameState> = ({G, ctx}) => {
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  console.log(`Player ${ctx.currentPlayer} threw a ${diceRoll}`);
};

export const askQuestion: Move<MyGameState> = ({G, ctx}, question: string) => {
  console.log(`Player ${ctx.currentPlayer} asked a question: ${question}`);
};

export const moves = {
  moveToCell,
  throwDice,
  askQuestion,
};
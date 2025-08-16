import type { Game } from "boardgame.io";
import type { MyGameState } from "./state";
import { moves } from "./moves";
import { phases } from "./phases";

export const MyGame: Game<MyGameState> = {
  setup: () => ({
    cells: Array.from({ length: 19 }, () => Array(19).fill(null)),
  }),

  moves,

  phases,

  turn: {
    stages: {
      throwDice: {
        moves: {
          throwDice: moves.throwDice,
        },
      },
      movePlayer: {
        moves: {
          moveToCell: moves.moveToCell,
        },
      },
      askQuestion: {
        moves: {
          askQuestion: moves.askQuestion,
        },
      },
    },
  },
};

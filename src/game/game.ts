import type { Game } from "boardgame.io";
import type { MyGameState } from "./state";
import { moves } from "./moves";
import { phases } from "./phases";
import type { BoardState } from '@game/board.ts';



export const MyGame: Game<MyGameState> = {
  setup: ({ctx}) => {
    const boardState: BoardState = {
      playerPositions: {}
    };

    for(let i = 0; i < ctx.numPlayers; i++) {
      boardState.playerPositions[i] = "Center";
    }
    
    return {
      boardState,
    };
  },

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

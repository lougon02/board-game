import type { Game } from "boardgame.io";
import type { MyGameState } from "./state";
import { moves } from "./moves";

export const MyGame: Game<MyGameState> = {
  setup: () => ({
    cells: Array.from({ length: 19 }, () => Array(19).fill(null)),
  }),

  moves,
};

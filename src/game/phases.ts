import type { PhaseConfig } from "boardgame.io";
import { moves } from "./moves";

export const decideWhoStarts: PhaseConfig = {
  moves: {
    ...moves,
  },
};

export const play: PhaseConfig = {
  moves: {
    ...moves,
  },
};

export const phases = {
  decideWhoStarts
};

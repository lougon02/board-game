import React, { useRef }  from "react";
import { Client } from "boardgame.io/react";
import { MyGame } from "@game/game.ts";
import { DiceRoller } from '@components/Board/DiceRollOverlay';
import type { DiceRollerHandle } from '@components/Board/DiceRollOverlay';
import Board from '@components/Board/Board.tsx';
import Main from '@components/Main.tsx';


const GameClient = Client({
  game: MyGame,
  board: Main,
  debug: true,
});


const App: React.FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-full h-full p-3 relative object-contain">
        <GameClient />
      </div>
    </div>
  );
};

export default App;

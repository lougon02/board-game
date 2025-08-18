import React, { useRef }  from "react";
import { Client } from "boardgame.io/react";
import { MyGame } from "@game/game.ts";
import { DiceRoller } from '@components/Board/DiceRollOverlay';
import type { DiceRollerHandle } from '@components/Board/DiceRollOverlay';
import Board from '@components/Board/Board.tsx';


// Create the BGIO client
const GameClient = Client({
  game: MyGame,
  board: Board,
  debug: true,
});


const App: React.FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {/* GameClient now fills the parent */}
      <div className="w-full h-full p-3 relative object-contain">
        <GameClient />
      </div>
    </div>
  );
};

export default App;

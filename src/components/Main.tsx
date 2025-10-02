import React, { useRef, useState }  from "react";
import Board from '@components/Board/Board.tsx';
import type { Ctx, MoveMap } from "boardgame.io";
import type { MyGameState } from "@game/state.ts";
import ControlPanel from "@components/Controls/ControlPanel.tsx";
import NotesTable from "@components/Controls/NotesTable.tsx";

type MainProps = {
  ctx: Ctx;
  G: MyGameState;
  //moves: MoveMap<MyGameState, Record<string, unknown>>;
}

const Main: React.FC<MainProps> = ({ ctx, G/*, moves*/}) => {

  return (
    <div className="w-full h-full flex flex-row">
      <Board ctx={ctx} G={G} />
      <div className="flex flex-col w-full h-full">
        <ControlPanel />
        <div className="flex p-1">
          <NotesTable/>
        </div>
      </div>
      
    </div>
  );
};

export default Main;

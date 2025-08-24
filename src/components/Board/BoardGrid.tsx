import React, {useState} from 'react';
import {boardGraph} from '@game/board.ts';
import type { Player } from '@game/board.ts';
import type { BoardState, GraphNode } from '@game/board.ts';
import '@styles/boardShapes.css'
import { numbersToClipPath } from '@utils/func.ts';

type BoardGridProps = {
  className?: string;
  boardState: BoardState;
  borderWidth?: number; 
  scale?: number;
  players?: Player[];
};

const BoardGrid: React.FC<BoardGridProps> = ({ className, borderWidth = 2, scale = 1 }) => {
  const grid = Array.from({ length: 19 }, () => Array.from({ length: 19 }, () => null));

  return (
    <div className={className}>
      {Object.values(boardGraph).map((node: GraphNode) => {
        const { id, data } = node;
        return (
          <div key={id}
            style={{
              clipPath: numbersToClipPath(data.boundary)
            }}
            className={`absolute h-full w-full hover:bg-gray-600/60 hover:mix-blend-multiply transition-opacity`}
          />
        );
      })}
      <div className="grid grid-cols-19 grid-rows-19 w-full h-full">
        {grid.map((row: Player[], y: number) =>
          row.map((player: Player, x: number) => (
            <div
              key={`${x+1}-${y+1}`}
              style={{ borderWidth: `${borderWidth / scale}px` }}
              className="border border-gray-400"
            >
              <div className='text-white drop-shadow-[0_0_3px_black] pointer-events-none'>
                {/*`(${x+1},${y+1})`*/}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BoardGrid;

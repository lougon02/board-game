import React, {useState} from 'react';
import GameBoard from '@game/board.ts';
import type { Player } from '@game/board.ts';
import type { BoardState } from '@game/board.ts';

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
      <div className="grid grid-cols-19 grid-rows-19 w-full h-full">
        {grid.map((row: Player[], y: number) =>
          row.map((player: Player, x: number) => (
            <div
              key={`${x}-${y}`}
              style={{ borderWidth: `${borderWidth / scale}px` }}
              className="border border-gray-400"
            >
              <div className='text-white drop-shadow-[0_0_3px_black]'>
                {`(${x+1},${y+1})`}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BoardGrid;

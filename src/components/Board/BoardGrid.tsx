import React, {useState} from 'react';
import GameBoard from '@game/board.ts';
import type { Player } from '@game/board.ts';

type BoardGridProps = {
  className?: string;
  board: GameBoard;
  borderWidth?: number; // optional prop to set border width
  scale?: number; // receive current zoom scale from parent
};

const BoardGrid: React.FC<BoardGridProps> = ({ className, board, borderWidth = 2, scale = 1 }) => {
  const grid = board.getGrid();

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
              {player}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BoardGrid;

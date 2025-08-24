import React, {useState} from 'react';
import {boardGraph, findShortestPath} from '@game/board.ts';
import type { Player } from '@game/board.ts';
import type { BoardState, GraphNode } from '@game/board.ts';
import '@styles/boardShapes.css'
import { numbersToClipPath } from '@utils/func.ts';
import type { Ctx } from 'boardgame.io';
import type { MyGameState } from '../../game/state';

type BoardGridProps = {
  className?: string;
  ctx: Ctx;
  G: MyGameState;
  borderWidth?: number; 
  scale?: number;
  players?: Player[];
};

const BoardGrid: React.FC<BoardGridProps> = ({ className, ctx, G, borderWidth = 2, scale = 1 }) => {
  const [highlightedPath, setHighlightedPath] = useState<string[]>([]);


  const grid = Array.from({ length: 19 }, () => Array.from({ length: 19 }, () => null));
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const handleMouseEnter = (id: string) => {
    // Set a 10ms delay before logging
    timeoutId = setTimeout(() => {
      console.log(`Finding shortest path from ${G.boardState.playerPositions[Number(ctx.currentPlayer)]} to ${id}`);
      const path: string[] = findShortestPath(boardGraph, G.boardState.playerPositions[Number(ctx.currentPlayer)], id, 12);
      console.log(path);
      setHighlightedPath(path);
    }, 25);
  };

  const handleMouseLeave = (id: string) => {
    // Clear the timeout if mouse leaves before 10ms
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return (
    <div className={className}>
      {Object.values(boardGraph).map((node: GraphNode) => {
        const { id, data } = node;
        return (
          <div key={id}
            style={{
              clipPath: numbersToClipPath(data.boundary)
            }}
            className={`
              absolute h-full w-full hover:bg-gray-600/60 hover:mix-blend-multiply transition-opacity
              ${highlightedPath.includes(id) ? 'bg-gray-600/60 mix-blend-multiply' : ''}
            `}
            onMouseEnter={() => handleMouseEnter(id)}
            onMouseLeave={() => handleMouseLeave(id)}
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

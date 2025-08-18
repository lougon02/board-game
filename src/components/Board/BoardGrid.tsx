import GameBoard from '@game/board.ts';
import type { Player } from '@game/board.ts';

type BoardGridProps = {
  className?: string;
  board: GameBoard;
};

const BoardGrid: React.FC<BoardGridProps> = ({ className, board }) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-19 grid-rows-19 w-full h-full">
        {board.getGrid().map((row: Array<Player>, y: number) =>
          row.map((player: Player, x: number) => (
            <div key={`${x}-${y}`} className="border border-gray-400">
              {player}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BoardGrid;

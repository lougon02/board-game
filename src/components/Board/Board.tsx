import React, { useRef }  from "react";
import { DiceRoller } from '@components/Board/DiceRollOverlay';
import type { DiceRollerHandle } from '@components/Board/DiceRollOverlay';
import boardImage from '@assets/Board.svg'



const Board: React.FC = () => {
  const diceRef = useRef<DiceRollerHandle>(null);

  const handleRoll = () => {
    diceRef.current?.rollDice('2d6@2,4');
  };

  return (
    <div className="h-full aspect-square">
      <div className="relative w-full h-full">
        <img src={boardImage} alt="Game Board" className="w-full h-full" />
        <DiceRoller ref={diceRef} className="absolute top-0 left-0 w-full h-full" />
        <button 
          onClick={handleRoll} 
          className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Roll Dice
        </button>
      </div>
    </div>

  );
};

export default Board;

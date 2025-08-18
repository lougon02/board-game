import React, { useRef, useState }  from "react";
import { DiceRoller } from '@components/Board/DiceRollOverlay';
import type { DiceRollerHandle } from '@components/Board/DiceRollOverlay';
import boardImage from '@assets/Board.svg'
import BoardGrid from "./BoardGrid";
import { GameBoard } from "@game/board.ts";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const Board: React.FC = () => {
  const diceRef = useRef<DiceRollerHandle>(null);
  const [zoomScale, setZoomScale] = useState(1);

  const handleRoll = () => {
    diceRef.current?.rollDice('2d6@2,4');
  };

  const board = new GameBoard();

  return (
    <div className="h-full aspect-square">
      <div className="relative w-full h-full">
        <TransformWrapper
          initialScale={1}
          minScale={1}
          maxScale={10}
          wheel={{ step: 0.1 }}
          doubleClick={{ disabled: true }}
          onZoom={(ref) => {setZoomScale(ref.state.scale);console.log(`Zoom scale: ${ref.state.scale}`)}}
        >
          <TransformComponent>
            <div>
              <img src={boardImage} alt="Game Board" className="w-full h-full" />
              <BoardGrid className="absolute top-0 left-0 w-full h-full" board={board} borderWidth={1} scale={zoomScale} />
            </div>
            
          </TransformComponent>
        </TransformWrapper>
        <DiceRoller ref={diceRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
        <button 
          onClick={handleRoll} 
          className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded pointer-events-auto"
        >
          Roll Dice
        </button>
      </div>
    </div>

  );
};

export default Board;

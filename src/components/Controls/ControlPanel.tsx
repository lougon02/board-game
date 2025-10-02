const ControlPanel = () => {
  // Example props/state
  const currentPlayer = "Alice";
  const diceRoll = 5;
  const phase = "Movement Phase";

  return (
    <div className="w-full h-full p-1">
      <div className="mb-4 border-1 border-gray-300">
        <div className="flex items-stretch shadow rounded-lg p-3 space-x-4">
          {/* Left side: Info */}
          <div className="flex flex-col justify-center space-y-2 text-sm w-1/4">
            <div>
              <span className="block font-semibold">Player</span>
              <span>{currentPlayer}</span>
            </div>
            <div>
              <span className="block font-semibold">Dice</span>
              <span>{diceRoll}</span>
            </div>
            <div>
              <span className="block font-semibold">Phase</span>
              <span>{phase}</span>
            </div>
          </div>

          {/* Middle section: Context */}
          <div className="flex-1 flex items-center justify-center border-x border-gray-200 text-sm">
            {/* Context UI goes here */}
          </div>

          {/* Right side: Actions */}
          <div className="flex flex-col justify-center space-y-1 w-1/5">
            <button className="px-2 py-0 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
              Move
            </button>
            <button className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600">
              Suggest
            </button>
            <button className="px-2 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Accuse
            </button>
            <button className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600">
              End Turn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;

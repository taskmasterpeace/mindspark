import React from 'react';

interface GameConfigProps {
  gameConfig: {
    totalRaceTime: number;
    fastCarFinishTime: number;
    slowCarFinishTime: number;
    requiredCorrectAnswers: number;
    penaltyForWrongAnswer: number;
  };
  handleConfigChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GameConfig: React.FC<GameConfigProps> = ({ gameConfig, handleConfigChange }) => {
  return (
    <div className="mb-6 w-full max-w-md bg-gray-800 p-4 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-4 text-center">Race Configuration</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block mb-1">Total Race Time (seconds):</label>
          <input 
            type="number" 
            name="totalRaceTime"
            value={gameConfig.totalRaceTime} 
            onChange={handleConfigChange}
            className="w-full p-2 border rounded text-black" 
            min="10"
            max="300"
          />
        </div>
        
        <div>
          <label className="block mb-1">Fast Car Time (s):</label>
          <input 
            type="number" 
            name="fastCarFinishTime"
            value={gameConfig.fastCarFinishTime} 
            onChange={handleConfigChange}
            className="w-full p-2 border rounded text-black" 
            min="10"
          />
        </div>
        
        <div>
          <label className="block mb-1">Slow Car Time (s):</label>
          <input 
            type="number" 
            name="slowCarFinishTime"
            value={gameConfig.slowCarFinishTime} 
            onChange={handleConfigChange}
            className="w-full p-2 border rounded text-black" 
            min="10"
          />
        </div>
        
        <div>
          <label className="block mb-1">Required Correct Answers:</label>
          <input 
            type="number" 
            name="requiredCorrectAnswers"
            value={gameConfig.requiredCorrectAnswers} 
            onChange={handleConfigChange}
            className="w-full p-2 border rounded text-black" 
            min="1"
            max="20"
          />
        </div>
        
        <div>
          <label className="block mb-1">Wrong Answer Penalty (%):</label>
          <input 
            type="number" 
            name="penaltyForWrongAnswer"
            value={gameConfig.penaltyForWrongAnswer} 
            onChange={handleConfigChange}
            className="w-full p-2 border rounded text-black" 
            min="0"
            max="50"
          />
        </div>
      </div>
    </div>
  );
};

export default GameConfig; 
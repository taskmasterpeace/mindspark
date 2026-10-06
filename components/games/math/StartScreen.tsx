import React from 'react';
import GameConfig from './GameConfig';

interface StartScreenProps {
  username: string;
  setUsername: (name: string) => void;
  carColor: string;
  setCarColor: (color: string) => void;
  gameConfig: {
    totalRaceTime: number;
    fastCarFinishTime: number;
    slowCarFinishTime: number;
    requiredCorrectAnswers: number;
    penaltyForWrongAnswer: number;
    progressPerCorrectAnswer: number;
  };
  handleConfigChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startGame: () => void;
  carColors: string[];
}

const StartScreen: React.FC<StartScreenProps> = ({
  username,
  setUsername,
  carColor,
  setCarColor,
  gameConfig,
  handleConfigChange,
  startGame,
  carColors
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Math Racing Challenge</h1>
      <div className="mb-4 w-full max-w-md">
        <label className="block text-gray-700 mb-2">Username:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your name" 
        />
      </div>
      
      <div className="mb-6 w-full max-w-md">
        <label className="block text-gray-700 mb-2">Choose your car color:</label>
        <div className="flex justify-between">
          {carColors.map(color => (
            <div 
              key={color} 
              onClick={() => setCarColor(color)}
              className={`w-12 h-12 rounded-full cursor-pointer ${carColor === color ? 'ring-4 ring-blue-500' : ''}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
      
      <GameConfig 
        gameConfig={gameConfig}
        handleConfigChange={handleConfigChange}
      />
      
      <button 
        onClick={startGame}
        className="bg-green-500 text-white py-3 px-6 rounded-lg text-xl hover:bg-green-600 transition"
      >
        Start Race!
      </button>
    </div>
  );
};

export default StartScreen; 
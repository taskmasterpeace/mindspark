import React from 'react';

interface DebugInfo {
  fastCarProgress: string;
  playerProgress: string;
  slowCarProgress: string;
  fastCarExpectedTime: string;
  playerExpectedTime: string;
  slowCarExpectedTime: string;
  fastCarTimeToFinish: string;
  slowCarTimeToFinish: string;
  playerRemainingCorrect: number;
  fastCarCurrentTime: number;
  slowCarCurrentTime: number;
  fastCarSpeed: string;
  slowCarSpeed: string;
}

interface GameStatsProps {
  username: string;
  timeLeft: number;
  score: number;
  correctAnswers: number;
  requiredCorrectAnswers: number;
  debugInfo: DebugInfo;
  carColor: string;
  gameConfig: {
    progressPerCorrectAnswer: number;
  };
}

const GameStats: React.FC<GameStatsProps> = ({
  username,
  timeLeft,
  score,
  correctAnswers,
  requiredCorrectAnswers,
  debugInfo,
  carColor,
  gameConfig
}) => {
  return (
    <>
      {/* Game stats bar */}
      <div className="bg-gray-800 p-2 text-white flex justify-between">
        <div>Player: {username}</div>
        <div>Time: {timeLeft}s</div>
        <div>Score: {score}</div>
        <div>Correct: {correctAnswers}/{requiredCorrectAnswers}</div>
      </div>
      
      {/* Debug stats - Enhanced for testing */}
      <div className="bg-gray-700 p-2 text-white flex flex-col gap-2">
        <div className="font-bold text-center text-lg">Race Parameters (for testing)</div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-yellow-900 p-2 rounded">
            <div className="font-bold">Fast Car (Yellow)</div>
            <div>Progress: {debugInfo.fastCarProgress}</div>
            <div>Expected finish: {debugInfo.fastCarExpectedTime}</div>
            <div>Time elapsed: {debugInfo.fastCarCurrentTime} sec</div>
            <div className="font-bold text-yellow-300">Time to finish: {debugInfo.fastCarTimeToFinish}</div>
            <div>Speed: {debugInfo.fastCarSpeed}</div>
          </div>
          
          <div className="bg-blue-900 p-2 rounded">
            <div className="font-bold">Your Car ({carColor})</div>
            <div>Progress: {debugInfo.playerProgress}</div>
            <div>To win: {debugInfo.playerExpectedTime}</div>
            <div>Current correct: {correctAnswers}/{requiredCorrectAnswers}</div>
            <div className="font-bold text-blue-300">Remaining correct: {debugInfo.playerRemainingCorrect}</div>
            <div>Speed: {gameConfig.progressPerCorrectAnswer.toFixed(1)}% per correct answer</div>
          </div>
          
          <div className="bg-gray-900 p-2 rounded">
            <div className="font-bold">Slow Car (Gray)</div>
            <div>Progress: {debugInfo.slowCarProgress}</div>
            <div>Expected finish: {debugInfo.slowCarExpectedTime}</div>
            <div>Time elapsed: {debugInfo.slowCarCurrentTime} sec</div>
            <div className="font-bold text-gray-300">Time to finish: {debugInfo.slowCarTimeToFinish}</div>
            <div>Speed: {debugInfo.slowCarSpeed}</div>
          </div>
        </div>
        <div className="text-center bg-red-900 p-2 rounded font-bold">
          Race time remaining: {timeLeft} seconds
        </div>
        <div className="text-center font-bold">
          To win: Answer {requiredCorrectAnswers} questions correctly before other cars finish
        </div>
      </div>
    </>
  );
};

export default GameStats; 
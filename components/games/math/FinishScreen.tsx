import React from 'react';

interface FinishScreenProps {
  username: string;
  timeLeft: number;
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  requiredCorrectAnswers: number;
  resetGame: () => void;
}

const FinishScreen: React.FC<FinishScreenProps> = ({
  username,
  timeLeft,
  correctAnswers,
  totalQuestions,
  score,
  requiredCorrectAnswers,
  resetGame
}) => {
  const isVictory = correctAnswers >= requiredCorrectAnswers;
  const timeTaken = 60 - timeLeft; // Assuming 60 seconds total race time
  
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg">
      <h1 className="text-4xl font-bold mb-6">
        {isVictory ? 'Victory!' : 'Race Over!'}
      </h1>
      
      <div className="text-2xl mb-6">
        {isVictory 
          ? `Congratulations ${username}! You completed the race!` 
          : `Better luck next time, ${username}!`}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Race Results</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>Time Taken:</div>
          <div>{timeTaken} seconds</div>
          
          <div>Correct Answers:</div>
          <div>{correctAnswers}/{totalQuestions}</div>
          
          <div>Final Score:</div>
          <div>{score}</div>
        </div>
      </div>
      
      <button 
        onClick={resetGame}
        className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-lg text-xl hover:bg-blue-600 transition"
      >
        Play Again
      </button>
    </div>
  );
};

export default FinishScreen; 
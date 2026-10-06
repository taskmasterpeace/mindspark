import React, { useState, useEffect } from 'react';
import StartScreen from './StartScreen';
import RaceTrack from './RaceTrack';
import MathQuestion from './MathQuestion';
import GameStats from './GameStats';
import FinishScreen from './FinishScreen';
import { generateQuestion, QuestionData } from './questionGenerator';
import { calculateDebugInfo, GameConfig, DebugInfo } from './debugUtils';

const MathRacingGame: React.FC = () => {
  // Game states
  const [gameState, setGameState] = useState<'start' | 'racing' | 'finished'>('start');
  const [username, setUsername] = useState<string>('');
  const [carColor, setCarColor] = useState<string>('red');
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60); // 60 seconds total race time
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ type: string; message: string } | null>(null);
  const [playerPosition, setPlayerPosition] = useState<number>(2); // Start in the middle (1-3)
  const [raceProgress, setRaceProgress] = useState<number>(0); // 0-100%
  
  // Available car colors
  const carColors: string[] = ['red', 'blue', 'green', 'yellow', 'purple'];
  
  // Configuration options that could be adjusted for testing
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    totalRaceTime: 60, // seconds
    fastCarFinishTime: 40, // seconds
    slowCarFinishTime: 80, // seconds
    requiredCorrectAnswers: 5, // Need 5 correct answers to win
    progressPerCorrectAnswer: 100 / 5, // percentage
    penaltyForWrongAnswer: 5 // percentage
  });
  
  // Handle game config changes
  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value);
    
    if (isNaN(numValue) || numValue <= 0) return;
    
    if (name === 'requiredCorrectAnswers') {
      setGameConfig({
        ...gameConfig,
        requiredCorrectAnswers: numValue,
        progressPerCorrectAnswer: 100 / numValue
      });
    } else {
      setGameConfig({
        ...gameConfig,
        [name]: numValue
      });
    }
  };
  
  // Start the game
  const startGame = () => {
    if (!username) {
      alert('Please enter a username');
      return;
    }
    
    setGameState('racing');
    setCurrentQuestion(generateQuestion());
    setTimeLeft(gameConfig.totalRaceTime);
    setScore(0);
    setCorrectAnswers(0);
    setTotalQuestions(0);
    setRaceProgress(0);
    setPlayerPosition(2);
  };
  
  // Handle answer selection
  const handleAnswer = (choice: number) => {
    if (!currentQuestion) return;
    
    setTotalQuestions(totalQuestions + 1);
    
    if (choice === currentQuestion.answer) {
      // Correct answer
      const newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);
      setScore(score + 100);
      setFeedback({ type: 'correct', message: 'Correct! +100 points' });
      
      // Improve position if possible
      if (playerPosition > 1) {
        setPlayerPosition(playerPosition - 1);
      }
      
      // Move forward in the race - progress based on correct answers and time remaining
      // This creates the effect that answering correctly advances you toward the finish line
      setRaceProgress(Math.min(92, gameConfig.progressPerCorrectAnswer * newCorrectAnswers));
      
      // Check if player has won
      if (newCorrectAnswers >= gameConfig.requiredCorrectAnswers) {
        setTimeout(() => endGame(true), 1000);
      }
    } else {
      // Incorrect answer
      setFeedback({ type: 'incorrect', message: `Wrong! The correct answer is ${currentQuestion.answer}` });
      
      // Fall back in position
      if (playerPosition < 3) {
        setPlayerPosition(playerPosition + 1);
      }
      
      // Slight penalty to race progress
      setRaceProgress(Math.max(0, raceProgress - gameConfig.penaltyForWrongAnswer));
    }
    
    // Clear feedback after 1.5 seconds
    setTimeout(() => {
      setFeedback(null);
      // Generate new question
      setCurrentQuestion(generateQuestion());
    }, 1500);
  };
  
  // End the game
  const endGame = (didWin: boolean) => {
    setGameState('finished');
  };
  
  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (gameState === 'racing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        
        // If time runs out
        if (timeLeft === 1) {
          endGame(correctAnswers >= gameConfig.requiredCorrectAnswers);
        }
      }, 1000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [gameState, timeLeft, correctAnswers, gameConfig.requiredCorrectAnswers]);
  
  // Calculate debug info
  const debugInfo: DebugInfo = calculateDebugInfo(
    timeLeft,
    gameConfig,
    correctAnswers,
    raceProgress
  );
  
  // Main render
  return (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {gameState === 'start' && (
          <StartScreen
            username={username}
            setUsername={setUsername}
            carColor={carColor}
            setCarColor={setCarColor}
            gameConfig={gameConfig}
            handleConfigChange={handleConfigChange}
            startGame={startGame}
            carColors={carColors}
          />
        )}
        
        {gameState === 'racing' && (
          <div className="relative h-full">
            <RaceTrack
              timeLeft={timeLeft}
              gameConfig={gameConfig}
              raceProgress={raceProgress}
              carColor={carColor}
              feedback={feedback}
            />
            
            <GameStats
              username={username}
              timeLeft={timeLeft}
              score={score}
              correctAnswers={correctAnswers}
              requiredCorrectAnswers={gameConfig.requiredCorrectAnswers}
              debugInfo={debugInfo}
              carColor={carColor}
              gameConfig={gameConfig}
            />
            
            <div className="p-4 bg-white border-t-2 border-blue-500">
              <MathQuestion
                currentQuestion={currentQuestion}
                feedback={feedback}
                handleAnswer={handleAnswer}
              />
            </div>
          </div>
        )}
        
        {gameState === 'finished' && (
          <FinishScreen
            username={username}
            timeLeft={timeLeft}
            correctAnswers={correctAnswers}
            totalQuestions={totalQuestions}
            score={score}
            requiredCorrectAnswers={gameConfig.requiredCorrectAnswers}
            resetGame={() => setGameState('start')}
          />
        )}
      </div>
    </div>
  );
};

export default MathRacingGame; 
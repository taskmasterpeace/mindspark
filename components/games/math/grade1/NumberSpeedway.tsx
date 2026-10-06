import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Game metadata for use in game listings
export const gameMetadata = {
  id: 'number-speedway',
  title: 'Number Speedway',
  image: '/images/games/number-speedway.jpg',
  subject: 'Math',
  gradeLevel: 'Grade 1',
  difficulty: 'Easy',
  isNew: true,
  description: 'Race to solve simple math problems! The faster you answer, the faster your car goes!'
};

interface QuestionData {
  question: string;
  choices: number[];
  answer: number;
}

const NumberSpeedway: React.FC = () => {
  // Game states
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [playerName, setPlayerName] = useState<string>('');
  const [carColor, setCarColor] = useState<string>('red');
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ type: string; message: string } | null>(null);
  const [raceProgress, setRaceProgress] = useState<number>(0);
  
  // Available car colors
  const carColors: string[] = ['red', 'blue', 'green', 'yellow', 'purple'];
  
  // Generate a simple math question for 1st graders (numbers 1-10)
  const generateQuestion = (): QuestionData => {
    // For 1st grade, only use addition and subtraction with small numbers
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1: number, num2: number, answer: number;
    
    switch(operation) {
      case '+':
        num1 = Math.floor(Math.random() * 5) + 1; // 1-5
        num2 = Math.floor(Math.random() * 5) + 1; // 1-5
        answer = num1 + num2;
        break;
      case '-':
        // Ensure subtraction results in positive numbers
        num1 = Math.floor(Math.random() * 5) + 5; // 5-9
        num2 = Math.floor(Math.random() * 4) + 1; // 1-4
        answer = num1 - num2;
        break;
      default:
        num1 = Math.floor(Math.random() * 5) + 1;
        num2 = Math.floor(Math.random() * 5) + 1;
        answer = num1 + num2;
    }
    
    // Only provide 3 choices for 1st graders
    const choices: number[] = [answer];
    while(choices.length < 3) {
      const randomChoice = answer + Math.floor(Math.random() * 3) - 1; // Closer options
      if (!choices.includes(randomChoice) && randomChoice >= 0) {
        choices.push(randomChoice);
      }
    }
    
    // Shuffle choices
    choices.sort(() => Math.random() - 0.5);
    
    return {
      question: `${num1} ${operation} ${num2} = ?`,
      choices,
      answer
    };
  };
  
  // Start the game
  const startGame = () => {
    if (!playerName) {
      alert('Please enter your name');
      return;
    }
    
    setGameState('playing');
    setCurrentQuestion(generateQuestion());
    setTimeLeft(60);
    setScore(0);
    setCorrectAnswers(0);
    setTotalQuestions(0);
    setRaceProgress(0);
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
      
      // Move forward in the race
      setRaceProgress(Math.min(100, raceProgress + 10));
      
      // Check if player has won (5 correct answers)
      if (newCorrectAnswers >= 5) {
        setTimeout(() => setGameState('finished'), 1000);
        return;
      }
    } else {
      // Incorrect answer
      setFeedback({ type: 'incorrect', message: `Oops! The answer is ${currentQuestion.answer}` });
    }
    
    // Clear feedback after 1.5 seconds
    setTimeout(() => {
      setFeedback(null);
      // Generate new question
      setCurrentQuestion(generateQuestion());
    }, 1500);
  };
  
  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        
        // If time runs out
        if (timeLeft === 1) {
          setGameState('finished');
        }
      }, 1000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [gameState, timeLeft]);
  
  // Render the start screen
  const renderStartScreen = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-['Press_Start_2P'] text-primary">
          Number Speedway
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center mb-4">
          <p className="text-muted-foreground">Race to solve math problems!</p>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Your Name:</label>
          <input 
            type="text" 
            value={playerName} 
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your name" 
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Choose your car color:</label>
          <div className="flex justify-between">
            {carColors.map(color => (
              <div 
                key={color} 
                onClick={() => setCarColor(color)}
                className={`w-10 h-10 rounded-full cursor-pointer ${carColor === color ? 'ring-4 ring-primary' : ''}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={startGame}
          className="w-full"
        >
          Start Race!
        </Button>
      </CardFooter>
    </Card>
  );
  
  // Render the racing screen
  const renderRacingScreen = () => (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <div>Player: {playerName}</div>
        <div>Time: {timeLeft}s</div>
        <div>Score: {score}</div>
        <div>Correct: {correctAnswers}/5</div>
      </div>
      
      {/* Race track */}
      <div className="bg-gray-200 h-32 rounded-lg relative overflow-hidden">
        {/* Finish line */}
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-white flex flex-col">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`h-1/8 w-full ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`}></div>
          ))}
        </div>
        
        {/* Player car */}
        <div 
          className="absolute h-16 w-16 rounded-md bottom-2"
          style={{ 
            backgroundColor: carColor,
            left: `${raceProgress}%`,
            transition: 'left 0.5s ease-out'
          }}
        >
          <div className="h-4 w-full rounded-t-md" style={{ backgroundColor: `dark${carColor}` }}></div>
          <div className="h-2 w-full bg-black mt-8"></div>
        </div>
      </div>
      
      <Progress value={raceProgress} className="h-2" />
      
      {/* Question area */}
      <Card>
        <CardContent className="pt-6">
          {feedback ? (
            <Alert className={feedback.type === 'correct' ? 'bg-green-100' : 'bg-red-100'}>
              <AlertDescription className="text-center text-xl font-bold">
                {feedback.message}
              </AlertDescription>
            </Alert>
          ) : currentQuestion ? (
            <div className="space-y-4">
              <div className="text-2xl font-bold text-center">{currentQuestion.question}</div>
              <div className="grid grid-cols-3 gap-4">
                {currentQuestion.choices.map((choice, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(choice)}
                    size="lg"
                    className="text-2xl py-8"
                  >
                    {choice}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">Loading question...</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
  
  // Render the finish screen
  const renderFinishScreen = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {correctAnswers >= 5 ? 'You Win!' : 'Race Over!'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center mb-4">
          <p className="text-xl">
            {correctAnswers >= 5 
              ? `Great job, ${playerName}! You completed the race!` 
              : `Good try, ${playerName}! Let's race again!`}
          </p>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-2">
            <div className="font-medium">Time Taken:</div>
            <div>{60 - timeLeft} seconds</div>
            
            <div className="font-medium">Correct Answers:</div>
            <div>{correctAnswers}/{totalQuestions}</div>
            
            <div className="font-medium">Final Score:</div>
            <div>{score}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/games">
          <Button variant="outline" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Games
          </Button>
        </Link>
        <Button onClick={() => setGameState('start')}>
          Play Again
        </Button>
      </CardFooter>
    </Card>
  );
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/games" className="text-primary hover:underline flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Games
        </Link>
      </div>
      
      {gameState === 'start' && renderStartScreen()}
      {gameState === 'playing' && renderRacingScreen()}
      {gameState === 'finished' && renderFinishScreen()}
    </div>
  );
};

export default NumberSpeedway; 
export interface DebugInfo {
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

export interface GameConfig {
  totalRaceTime: number;
  fastCarFinishTime: number;
  slowCarFinishTime: number;
  requiredCorrectAnswers: number;
  progressPerCorrectAnswer: number;
  penaltyForWrongAnswer: number;
}

/**
 * Calculates detailed debug information for race mechanics
 * @param timeLeft Time remaining in the race
 * @param gameConfig Game configuration settings
 * @param correctAnswers Number of correct answers
 * @param raceProgress Current race progress percentage
 * @returns Debug information object
 */
export const calculateDebugInfo = (
  timeLeft: number, 
  gameConfig: GameConfig, 
  correctAnswers: number,
  raceProgress: number
): DebugInfo => {
  // Fast car (Yellow)
  const fastCarSpeed = 92 / gameConfig.fastCarFinishTime; // percent per second
  const fastCarProgress = Math.min(92, (gameConfig.totalRaceTime - timeLeft) / gameConfig.fastCarFinishTime * 100);
  const fastCarTimeToFinish = timeLeft > 0 ? Math.max(0, (92 - fastCarProgress) / fastCarSpeed) : 0;
  
  // Slow car (Gray)
  const slowCarSpeed = 92 / gameConfig.slowCarFinishTime; // percent per second
  const slowCarProgress = Math.min(92, (gameConfig.totalRaceTime - timeLeft) / gameConfig.slowCarFinishTime * 100);
  const slowCarTimeToFinish = timeLeft > 0 ? Math.max(0, (92 - slowCarProgress) / slowCarSpeed) : 0;
  
  // Player car
  const playerRemainingCorrect = gameConfig.requiredCorrectAnswers - correctAnswers;
  
  return {
    fastCarExpectedTime: `${gameConfig.fastCarFinishTime} seconds`,
    playerExpectedTime: `${gameConfig.requiredCorrectAnswers} correct answers`,
    slowCarExpectedTime: `${gameConfig.slowCarFinishTime} seconds`,
    fastCarProgress: `${fastCarProgress.toFixed(1)}%`,
    playerProgress: `${raceProgress.toFixed(1)}%`,
    slowCarProgress: `${slowCarProgress.toFixed(1)}%`,
    fastCarTimeToFinish: `${Math.ceil(fastCarTimeToFinish)} sec`,
    slowCarTimeToFinish: `${Math.ceil(slowCarTimeToFinish)} sec`,
    playerRemainingCorrect,
    fastCarCurrentTime: gameConfig.totalRaceTime - timeLeft,
    slowCarCurrentTime: gameConfig.totalRaceTime - timeLeft,
    fastCarSpeed: `${fastCarSpeed.toFixed(2)}%/sec`,
    slowCarSpeed: `${slowCarSpeed.toFixed(2)}%/sec`
  };
}; 
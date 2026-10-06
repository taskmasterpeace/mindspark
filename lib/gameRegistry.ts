import { gameMetadata as numberSpeedwayMetadata } from '@/components/games/math/grade1/NumberSpeedway';

// Define the game metadata interface
export interface GameMetadata {
  id: string;
  title: string;
  image: string;
  subject: 'Math' | 'Science' | 'Literacy' | 'Coding';
  gradeLevel: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isNew?: boolean;
  description?: string;
}

// Create a registry of all games
export const gameRegistry: Record<string, GameMetadata> = {
  [numberSpeedwayMetadata.id]: {
    ...numberSpeedwayMetadata,
    subject: numberSpeedwayMetadata.subject as 'Math' | 'Science' | 'Literacy' | 'Coding',
    difficulty: numberSpeedwayMetadata.difficulty as 'Easy' | 'Medium' | 'Hard'
  },
  // Add more games here as they are created
};

// Helper functions
export const getAllGames = () => Object.values(gameRegistry);

export const getGamesBySubject = (subject: string) => 
  Object.values(gameRegistry).filter(game => game.subject === subject);

export const getGamesByGrade = (grade: string) => 
  Object.values(gameRegistry).filter(game => game.gradeLevel === grade);

export const getFeaturedGames = () => 
  Object.values(gameRegistry).filter(game => game.isNew);

export const getGrade1MathGames = () =>
  Object.values(gameRegistry).filter(
    game => game.subject === 'Math' && game.gradeLevel === 'Grade 1'
  ); 
import React from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { gameRegistry } from '@/lib/gameRegistry';

interface GamePageProps {
  params: {
    gameId: string;
  };
}

export default function GamePage({ params }: GamePageProps) {
  const { gameId } = params;
  
  // Check if the game exists in our registry
  if (!gameRegistry[gameId]) {
    return notFound();
  }
  
  // Dynamically import the game component based on the ID
  const GameComponent = dynamic(() => {
    // Map game ID to its file path
    const gameInfo = gameRegistry[gameId];
    
    if (gameInfo.subject === 'Math' && gameInfo.gradeLevel === 'Grade 1') {
      return import('@/components/games/math/grade1/NumberSpeedway').then(mod => mod.default);
    }
    
    // Add more mappings for other games here as they are created
    // For example:
    // if (gameInfo.subject === 'Science' && gameInfo.gradeLevel === 'Grade 2') {
    //   return import('@/components/games/science/grade2/ScienceExplorer').then(mod => mod.default);
    // }
    
    // Default fallback
    return Promise.resolve(() => <div>Game not found</div>);
  }, {
    loading: () => (
      <div className="flex items-center justify-center h-96">
        <div className="text-xl">Loading game...</div>
      </div>
    ),
  });
  
  return <GameComponent />;
} 
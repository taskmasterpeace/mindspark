import React from 'react';
import Link from 'next/link';
import { getAllGames, getGrade1MathGames } from '@/lib/gameRegistry';
import GameCard from '@/components/games/GameCard';
import { MindSparkSidebarProvider } from '@/components/mindspark-sidebar';
import { ArrowLeft } from 'lucide-react';

export default function GamesPage() {
  const allGames = getAllGames();
  const grade1MathGames = getGrade1MathGames();
  
  return (
    <MindSparkSidebarProvider>
      <main className="flex min-h-screen flex-col p-6">
        <div className="mb-6">
          <Link href="/" className="text-primary hover:underline flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Games Library</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Explore our collection of educational games
          </p>
        </div>
        
        {grade1MathGames.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">1st Grade Math Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grade1MathGames.map(game => (
                <GameCard
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  image={game.image}
                  subject={game.subject}
                  gradeLevel={game.gradeLevel}
                  difficulty={game.difficulty}
                  isNew={game.isNew}
                  description={game.description}
                />
              ))}
            </div>
          </div>
        )}
        
        <div>
          <h2 className="text-2xl font-bold mb-4">All Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allGames.map(game => (
              <GameCard
                key={game.id}
                id={game.id}
                title={game.title}
                image={game.image}
                subject={game.subject}
                gradeLevel={game.gradeLevel}
                difficulty={game.difficulty}
                isNew={game.isNew}
                description={game.description}
              />
            ))}
          </div>
        </div>
      </main>
    </MindSparkSidebarProvider>
  );
} 
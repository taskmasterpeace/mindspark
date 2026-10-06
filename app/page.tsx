import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gamepad2, Star, Trophy } from "lucide-react";
import { MindSparkSidebarProvider } from "@/components/mindspark-sidebar";
import GameCard from "@/components/games/GameCard";
import { getFeaturedGames } from "@/lib/gameRegistry";

export default function Home() {
  const featuredGames = getFeaturedGames();
  
  return (
    <MindSparkSidebarProvider>
      <main className="flex min-h-screen flex-col p-6">
        {/* Header section */}
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight font-['Press_Start_2P'] bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            MindSpark Studio
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            A fun learning platform for grades 1-6!
          </p>
        </div>
        
        {/* Featured games banner */}
        <div className="relative w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white shadow-lg mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">Popular Games</h2>
              <p className="mt-1 max-w-md">
                Check out our most popular learning games!
              </p>
            </div>
            <Link href="/games">
              <Button size="lg" variant="secondary">
                Explore All Games
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Game grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredGames.length > 0 ? (
            featuredGames.map(game => (
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
            ))
          ) : (
            // Fallback game cards if no featured games are available
            <>
              <div className="bg-card text-card-foreground rounded-xl border-2 border-blue-300 bg-blue-50 dark:bg-blue-950/30 shadow-sm p-4">
                <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden relative">
                  <div className="absolute top-2 right-2 bg-black/60 text-white rounded-full px-2 py-0.5 text-xs font-medium">
                    Medium
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold mb-1 text-lg">Math Blaster</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        Math
                      </span>
                      <span>• Grade 3-5</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">Popular</div>
                  <Button size="sm" variant="outline" className="gap-1 text-xs">
                    <Gamepad2 className="h-3 w-3" />
                    Play Now
                  </Button>
                </div>
              </div>
              
              {/* More fallback game cards... */}
            </>
          )}
        </div>
        
        {/* Achievements section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card text-card-foreground rounded-lg border p-4 flex items-center gap-4">
              <div className="bg-blue-100 text-blue-700 p-3 rounded-full">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">Math Master</h3>
                <div className="text-sm text-muted-foreground">Level 3</div>
              </div>
            </div>
            <div className="bg-card text-card-foreground rounded-lg border p-4 flex items-center gap-4">
              <div className="bg-green-100 text-green-700 p-3 rounded-full">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">Science Explorer</h3>
                <div className="text-sm text-muted-foreground">Level 2</div>
              </div>
            </div>
            <div className="bg-card text-card-foreground rounded-lg border p-4 flex items-center gap-4">
              <div className="bg-purple-100 text-purple-700 p-3 rounded-full">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">Reading Champion</h3>
                <div className="text-sm text-muted-foreground">Level 4</div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">View All Achievements</Button>
          </div>
        </div>
      </main>
    </MindSparkSidebarProvider>
  );
}


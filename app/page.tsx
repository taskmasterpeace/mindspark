import { MindSparkSidebarProvider } from "@/components/mindspark-sidebar"
import { Button } from "@/components/ui/button"
import { Gamepad2, Star, Trophy, Zap, Calculator, Microscope, BookText } from "lucide-react"

export default function Home() {
  return (
    <MindSparkSidebarProvider>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight font-['Press_Start_2P'] bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            MindSpark Studio
          </h1>
          <p className="text-muted-foreground">A fun learning platform for grades 1-6!</p>
        </div>

        {/* Featured Games Banner */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              <Gamepad2 className="mr-2 h-6 w-6" />
              Featured Games
            </h2>
            <p className="mb-4 max-w-lg">Discover our most popular learning games and start your adventure today!</p>
            <Button className="bg-white text-indigo-600 hover:bg-white/90">Start Playing</Button>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => {
            const subjects = ["Math", "Science", "Literacy", "Coding"]
            const subject = subjects[i % subjects.length]
            const colors = {
              Math: "border-blue-300 bg-blue-50 dark:bg-blue-950/30",
              Science: "border-green-300 bg-green-50 dark:bg-green-950/30",
              Literacy: "border-orange-300 bg-orange-50 dark:bg-orange-950/30",
              Coding: "border-purple-300 bg-purple-50 dark:bg-purple-950/30",
            }

            return (
              <div
                key={i}
                className={`bg-card text-card-foreground rounded-xl border-2 ${colors[subject]} shadow-sm p-4 transition-all duration-300 hover:scale-105 hover:shadow-md group`}
              >
                <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden relative">
                  <img
                    src={`/placeholder.svg?height=200&width=300&text=Game ${i + 1}`}
                    alt={`Game ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 text-white rounded-full px-2 py-0.5 text-xs font-medium">
                    {["Easy", "Medium", "Hard"][i % 3]}
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold mb-1 text-lg">Fun Game {i + 1}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {subject}
                      </span>
                      <span>• Grade {(i % 6) + 1}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`h-3 w-3 ${starIndex < 4 - (i % 2) ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">Played 1.2k times</div>
                  <Button size="sm" variant="outline" className="gap-1 text-xs">
                    <Zap className="h-3 w-3" />
                    Play Now
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Achievements Section */}
        <div className="mt-8 p-6 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Your Achievements
            </h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {["Math Master", "Science Explorer", "Reading Champion"].map((achievement, i) => (
              <div key={i} className="p-3 rounded-lg bg-card border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  {i === 0 ? (
                    <Calculator className="h-5 w-5 text-blue-500" />
                  ) : i === 1 ? (
                    <Microscope className="h-5 w-5 text-green-500" />
                  ) : (
                    <BookText className="h-5 w-5 text-orange-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-sm">{achievement}</h3>
                  <p className="text-xs text-muted-foreground">Level {i + 2}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MindSparkSidebarProvider>
  )
}


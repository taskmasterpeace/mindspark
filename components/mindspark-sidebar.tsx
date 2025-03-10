"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  BookOpen,
  Home,
  Music,
  Settings,
  Users,
  Calculator,
  Microscope,
  BookText,
  ChevronDown,
  Trophy,
  Calendar,
  Star,
  Bell,
  Sparkles,
  Gamepad2,
  Zap,
  Crown,
  Gift,
  Rocket,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenuBadge,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Avatar accessories
const avatarAccessories = [
  { id: 1, name: "Wizard Hat", emoji: "🧙", unlocked: true },
  { id: 2, name: "Crown", emoji: "👑", unlocked: true },
  { id: 3, name: "Glasses", emoji: "👓", unlocked: true },
  { id: 4, name: "Superhero", emoji: "🦸", unlocked: false },
  { id: 5, name: "Astronaut", emoji: "👨‍🚀", unlocked: false },
  { id: 6, name: "Pirate", emoji: "🏴‍☠️", unlocked: false },
]

// Grade level options with themes
const gradeOptions = [
  { value: "1", label: "Grade 1", theme: "from-pink-400 to-purple-500", emoji: "🐰" },
  { value: "2", label: "Grade 2", theme: "from-blue-400 to-indigo-500", emoji: "🐶" },
  { value: "3", label: "Grade 3", theme: "from-green-400 to-teal-500", emoji: "🐸" },
  { value: "4", label: "Grade 4", theme: "from-yellow-400 to-orange-500", emoji: "🤖" },
  { value: "5", label: "Grade 5", theme: "from-red-400 to-pink-500", emoji: "👾" },
  { value: "6", label: "Grade 6", theme: "from-purple-400 to-indigo-500", emoji: "🚀" },
]

// Subject icons with color coding
const subjects = [
  {
    name: "Math",
    icon: Calculator,
    color: "text-blue-500 bg-blue-100 dark:bg-blue-950 border-blue-300 dark:border-blue-800",
    emoji: "🧮",
  },
  {
    name: "Science",
    icon: Microscope,
    color: "text-green-500 bg-green-100 dark:bg-green-950 border-green-300 dark:border-green-800",
    emoji: "🔬",
  },
  {
    name: "Literacy",
    icon: BookText,
    color: "text-orange-500 bg-orange-100 dark:bg-orange-950 border-orange-300 dark:border-orange-800",
    emoji: "📚",
  },
  {
    name: "Coding",
    icon: Zap,
    color: "text-purple-500 bg-purple-100 dark:bg-purple-950 border-purple-300 dark:border-purple-800",
    emoji: "💻",
  },
]

// Navigation items with badges and notifications
const navItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard", badge: null, notification: false },
  { name: "Games", icon: Gamepad2, href: "/games", badge: "12", notification: true },
  { name: "Music Lab", icon: Music, href: "/music", badge: null, notification: false },
  { name: "Challenges", icon: Trophy, href: "/challenges", badge: "3", notification: true },
  { name: "Friends", icon: Users, href: "/friends", badge: "5", notification: false },
  { name: "Rewards", icon: Gift, href: "/rewards", badge: "New", notification: true },
  { name: "Settings", icon: Settings, href: "/settings", badge: null, notification: false },
]

// Achievements data
const achievements = [
  { name: "Math Master", progress: 70, icon: Calculator },
  { name: "Science Whiz", progress: 45, icon: Microscope },
  { name: "Reading Pro", progress: 90, icon: BookText },
]

// Daily challenges
const dailyChallenges = [
  { name: "Pop 10 Balloons", progress: 3, total: 10, emoji: "🎈" },
  { name: "Solve 5 Math Problems", progress: 2, total: 5, emoji: "🔢" },
  { name: "Read a Story", progress: 0, total: 1, emoji: "📖" },
]

export function MindSparkSidebar() {
  const [selectedGrade, setSelectedGrade] = useState("1")
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [avatarEmoji, setAvatarEmoji] = useState("🐰")
  const [xp, setXp] = useState(250)
  const [level, setLevel] = useState(3)
  const [showConfetti, setShowConfetti] = useState(false)
  const { isMobile } = useSidebar()

  const isYoungerGrade = Number.parseInt(selectedGrade) <= 3
  const currentGrade = gradeOptions.find((g) => g.value === selectedGrade)

  // Update avatar emoji when grade changes
  useEffect(() => {
    const grade = gradeOptions.find((g) => g.value === selectedGrade)
    if (grade) {
      setAvatarEmoji(grade.emoji)
    }
  }, [selectedGrade])

  // Simulate XP gain on subject click
  const handleSubjectClick = (subjectName: string) => {
    setSelectedSubject(selectedSubject === subjectName ? null : subjectName)

    if (selectedSubject !== subjectName) {
      // Add a small XP boost when selecting a new subject
      setXp((prev) => {
        const newXp = prev + 5
        // Level up if XP reaches 300
        if (newXp >= 300) {
          setLevel((prev) => prev + 1)
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 3000)
          return newXp - 300
        }
        return newXp
      })
    }
  }

  return (
    <Sidebar className="border-r border-sidebar-border" collapsible={isMobile ? "offcanvas" : "icon"}>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className={`absolute animate-confetti w-2 h-2 rounded-full`}
              style={{
                top: "-10px",
                left: `${Math.random() * 100}%`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <SidebarHeader className="flex flex-col items-center gap-2 py-4">
        <div className="flex items-center justify-center w-full">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="relative w-10 h-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white animate-bounce" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight font-['Press_Start_2P'] group-data-[collapsible=icon]:hidden bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              MindSpark
            </span>
          </Link>
        </div>

        <div className="w-full px-2 mt-4 group-data-[collapsible=icon]:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative cursor-pointer group">
                <Avatar className="w-20 h-20 mx-auto border-4 border-primary transition-all duration-300 hover:scale-110 hover:rotate-6 hover:border-purple-500">
                  <AvatarFallback className={`text-4xl bg-gradient-to-br ${currentGrade?.theme}`}>
                    {avatarEmoji}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-background font-bold text-xs">
                  {level}
                </div>
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-black/30 flex items-center justify-center transition-opacity">
                  <span className="text-white font-bold">Customize</span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-3">
              <h3 className="font-bold text-center mb-2 font-['Press_Start_2P'] text-sm">Customize Avatar</h3>
              <Tabs defaultValue="accessories">
                <TabsList className="w-full mb-2">
                  <TabsTrigger value="accessories" className="flex-1">
                    Accessories
                  </TabsTrigger>
                  <TabsTrigger value="colors" className="flex-1">
                    Colors
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="accessories" className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    {avatarAccessories.map((accessory) => (
                      <Button
                        key={accessory.id}
                        variant={accessory.unlocked ? "outline" : "ghost"}
                        className={cn("h-12 text-2xl", !accessory.unlocked && "opacity-50 cursor-not-allowed")}
                        disabled={!accessory.unlocked}
                        onClick={() => setAvatarEmoji(accessory.emoji)}
                      >
                        {accessory.emoji}
                        {!accessory.unlocked && (
                          <span className="absolute inset-0 flex items-center justify-center bg-background/80 text-xl">
                            🔒
                          </span>
                        )}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Unlock more by completing challenges!</p>
                </TabsContent>
                <TabsContent value="colors" className="space-y-2">
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      "bg-red-500",
                      "bg-blue-500",
                      "bg-green-500",
                      "bg-yellow-500",
                      "bg-purple-500",
                      "bg-pink-500",
                      "bg-indigo-500",
                      "bg-teal-500",
                    ].map((color, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className={`h-8 w-full ${color} border-2 hover:scale-110 transition-transform`}
                        onClick={() => {}}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Change your avatar's background color!</p>
                </TabsContent>
              </Tabs>
            </PopoverContent>
          </Popover>

          <div className="text-center mt-2">
            <p className="font-semibold">Spark Explorer</p>
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
              <span>Level {level} Explorer</span>
            </div>
          </div>

          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span>XP: {xp}/300</span>
              <span>Next: Lvl {level + 1}</span>
            </div>
            <Progress
              value={(xp / 300) * 100}
              className="h-2"
              indicatorClassName={`bg-gradient-to-r ${currentGrade?.theme}`}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Grade Selector */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 font-['Press_Start_2P'] text-xs flex items-center">
            <Rocket className="h-3 w-3 mr-1" />
            Grade Level
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="grid grid-cols-3 gap-1 px-2 group-data-[collapsible=icon]:grid-cols-1">
              {gradeOptions.map((grade) => (
                <TooltipProvider key={grade.value} delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={selectedGrade === grade.value ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "h-8 text-xs font-semibold transition-all duration-300 hover:scale-110 relative overflow-hidden",
                          selectedGrade === grade.value ? `bg-gradient-to-r ${grade.theme} border-none` : "border-2",
                        )}
                        onClick={() => setSelectedGrade(grade.value)}
                      >
                        <span className={selectedGrade === grade.value ? "text-white" : ""}>
                          {grade.label.replace("Grade ", "")}
                        </span>
                        {selectedGrade === grade.value && (
                          <span className="absolute right-1 text-xs">{grade.emoji}</span>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-gradient-to-r from-primary to-purple-600 text-white border-none"
                    >
                      <p>
                        {grade.label} - {grade.emoji}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Subject Filters */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 font-['Press_Start_2P'] text-xs flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            Subjects
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-wrap gap-2 px-2">
              {subjects.map((subject) => (
                <TooltipProvider key={subject.name} delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "flex items-center gap-1 transition-all duration-300 hover:scale-110 border-2",
                          selectedSubject === subject.name ? subject.color : "hover:border-primary",
                          "group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10",
                        )}
                        onClick={() => handleSubjectClick(subject.name)}
                      >
                        <div className="relative">
                          <subject.icon className="h-4 w-4" />
                          {selectedSubject === subject.name && (
                            <span className="absolute -top-1 -right-1 text-[8px] animate-bounce">{subject.emoji}</span>
                          )}
                        </div>
                        <span className="group-data-[collapsible=icon]:hidden">{subject.name}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>
                        {subject.name} {subject.emoji}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 font-['Press_Start_2P'] text-xs flex items-center">
            <Gamepad2 className="h-3 w-3 mr-1" />
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.name}
                    className="transition-all duration-300 hover:scale-110 hover:bg-accent/80"
                  >
                    <Link href={item.href}>
                      <div className="relative">
                        <item.icon className="h-4 w-4" />
                        {item.notification && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        )}
                      </div>
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge
                      className={cn(
                        "bg-primary text-primary-foreground",
                        item.badge === "New" && "bg-green-500 text-white",
                      )}
                    >
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Daily Challenge */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="w-full flex items-center">
                <span className="font-['Press_Start_2P'] text-xs flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Daily Quests
                </span>
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <div className="space-y-2">
                  {dailyChallenges.map((challenge, index) => (
                    <div
                      key={index}
                      className={cn(
                        "p-2 rounded-lg text-white relative overflow-hidden transition-all duration-300 hover:scale-[1.02] border-2 border-white/20",
                        "bg-gradient-to-r",
                        index === 0
                          ? "from-indigo-500 to-purple-500"
                          : index === 1
                            ? "from-blue-500 to-cyan-500"
                            : "from-green-500 to-teal-500",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div className="text-xl">{challenge.emoji}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm">{challenge.name}</h4>
                          <div className="w-full bg-white/20 rounded-full h-2 mt-1">
                            <div
                              className="bg-white rounded-full h-2 transition-all duration-1000"
                              style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                            />
                          </div>
                          <p className="text-xs mt-1 text-right">
                            {challenge.progress}/{challenge.total} complete
                          </p>
                        </div>
                      </div>
                      {challenge.progress === challenge.total && (
                        <div className="absolute top-1 right-1">
                          <Crown className="h-4 w-4 text-yellow-300 fill-yellow-300 animate-pulse" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Achievements */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <Collapsible className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="w-full flex items-center">
                <span className="font-['Press_Start_2P'] text-xs flex items-center">
                  <Trophy className="h-3 w-3 mr-1" />
                  Achievements
                </span>
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <div className="space-y-2 p-2">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                          <achievement.icon className="h-3 w-3" />
                        </div>
                        <span className="text-xs font-medium">{achievement.name}</span>
                        <span className="text-xs ml-auto">{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="group-data-[collapsible=icon]:hidden">
        <div className="p-2 space-y-2">
          <Badge
            variant="outline"
            className="w-full justify-center py-1 border-2 border-dashed bg-gradient-to-r from-yellow-300 to-amber-500 text-black font-bold"
          >
            <Trophy className="h-4 w-4 mr-1 text-yellow-700 fill-yellow-700" />
            <span className="font-semibold">{xp} Points</span>
          </Badge>

          <Button
            variant="outline"
            size="sm"
            className="w-full border-2 border-primary/50 bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-105"
          >
            <Bell className="h-4 w-4 mr-1" />
            <span className="text-xs">Notifications</span>
            <span className="ml-auto bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
              3
            </span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export function MindSparkSidebarProvider({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <MindSparkSidebar />
        <div className="flex-1">
          <div className="container p-4">
            <SidebarTrigger className="mb-4" />
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}


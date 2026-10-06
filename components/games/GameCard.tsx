import React from 'react';
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface GameCardProps {
  id: string;
  title: string;
  image: string;
  subject: 'Math' | 'Science' | 'Literacy' | 'Coding';
  gradeLevel: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isNew?: boolean;
  description?: string;
}

const subjectColors = {
  Math: 'bg-blue-300 bg-blue-50 dark:bg-blue-950/30 border-blue-300 text-blue-700',
  Science: 'bg-green-300 bg-green-50 dark:bg-green-950/30 border-green-300 text-green-700',
  Literacy: 'bg-purple-300 bg-purple-50 dark:bg-purple-950/30 border-purple-300 text-purple-700',
  Coding: 'bg-orange-300 bg-orange-50 dark:bg-orange-950/30 border-orange-300 text-orange-700'
};

const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  image,
  subject,
  gradeLevel,
  difficulty,
  isNew = false,
  description
}) => {
  const subjectColor = subjectColors[subject];
  
  return (
    <div className={`bg-card text-card-foreground rounded-xl border-2 ${subjectColor} shadow-sm p-4 transition-all duration-300 hover:scale-105 hover:shadow-md group`}>
      <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden relative">
        <Image
          src={image}
          alt={`${title} Game`}
          width={300}
          height={200}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-black/60 text-white rounded-full px-2 py-0.5 text-xs font-medium">
          {difficulty}
        </div>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold mb-1 text-lg">{title}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {subject}
            </span>
            <span>• {gradeLevel}</span>
          </div>
          {description && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{description}</p>
          )}
        </div>
      </div>
      
      <div className="mt-3 flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          {isNew && "New!"}
        </div>
        <Link href={`/games/${id}`}>
          <Button 
            size="sm" 
            variant="outline" 
            className="gap-1 text-xs"
          >
            <Gamepad2 className="h-3 w-3" />
            Play Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GameCard; 
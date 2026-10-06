import React from 'react';

interface RaceTrackProps {
  timeLeft: number;
  gameConfig: {
    totalRaceTime: number;
    fastCarFinishTime: number;
    slowCarFinishTime: number;
    progressPerCorrectAnswer: number;
  };
  raceProgress: number;
  carColor: string;
  feedback: { type: string; message: string } | null;
}

const RaceTrack: React.FC<RaceTrackProps> = ({
  timeLeft,
  gameConfig,
  raceProgress,
  carColor,
  feedback
}) => {
  // Calculate positions for AI cars
  const fastCarProgress = Math.min(92, (gameConfig.totalRaceTime - timeLeft) / gameConfig.fastCarFinishTime * 100);
  const slowCarProgress = Math.min(92, (gameConfig.totalRaceTime - timeLeft) / gameConfig.slowCarFinishTime * 100);

  return (
    <div className="bg-green-200 h-64 relative overflow-hidden">
      <div className="absolute bottom-0 w-full h-16 bg-gray-700"></div>
      
      {/* Race track */}
      <div className="absolute bottom-16 w-full h-32 bg-gray-400 flex items-end">
        {/* Track lanes */}
        <div className="w-full h-full relative">
          {/* Lane dividers */}
          <div className="absolute w-full h-px bg-white top-1/3"></div>
          <div className="absolute w-full h-px bg-white top-2/3"></div>
          
          {/* AI Car 1 - Fast */}
          <div 
            className="absolute h-16 w-16 bg-yellow-500 rounded-md bottom-2"
            style={{ 
              left: `${fastCarProgress}%` 
            }}
          >
            <div className="h-4 w-full bg-yellow-600 rounded-t-md"></div>
            <div className="h-2 w-full bg-black mt-8"></div>
            {/* Engine smoke effect */}
            <div className="absolute -right-6 top-6 w-6 h-6 bg-gray-300 rounded-full opacity-75 animate-pulse"></div>
          </div>
          
          {/* Player Car - middle lane */}
          <div 
            className="absolute h-16 w-16 rounded-md bottom-2"
            style={{ 
              backgroundColor: carColor,
              left: `${Math.min(92, raceProgress)}%`,
              top: '33%'
            }}
          >
            <div 
              className="h-4 w-full rounded-t-md" 
              style={{ 
                backgroundColor: carColor === 'yellow' ? '#B8860B' : `dark${carColor}` 
              }}
            ></div>
            <div className="h-2 w-full bg-black mt-8"></div>
            {/* Effects */}
            {feedback && feedback.type === 'correct' && (
              <>
                <div className="absolute -right-6 top-6 w-6 h-6 bg-white rounded-full opacity-75 animate-pulse"></div>
                <div className="absolute -right-4 top-4 w-4 h-4 bg-white rounded-full opacity-60 animate-pulse"></div>
              </>
            )}
            {feedback && feedback.type === 'incorrect' && (
              <>
                <div className="absolute left-0 right-0 bottom-0 h-1 bg-black opacity-50 animate-pulse"></div>
                <div className="absolute -left-8 top-4 w-8 h-2 bg-red-500 animate-pulse"></div>
              </>
            )}
          </div>
          
          {/* AI Car 3 - Slow */}
          <div 
            className="absolute h-16 w-16 bg-gray-500 rounded-md bottom-2"
            style={{ 
              left: `${slowCarProgress}%`,
              top: '66%'
            }}
          >
            <div className="h-4 w-full bg-gray-600 rounded-t-md"></div>
            <div className="h-2 w-full bg-black mt-8"></div>
          </div>
          
          {/* Finish line */}
          <div className="absolute right-4 top-0 bottom-0 w-4 bg-white flex flex-col">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`h-1/8 w-full ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`}></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Environment elements */}
      <div className="absolute top-4 left-4 h-12 w-12 bg-green-700 transform rotate-45"></div>
      <div className="absolute top-8 right-12 h-16 w-16 bg-green-700 transform rotate-45"></div>
      <div className="absolute top-16 left-32 h-8 w-8 bg-green-700 transform rotate-45"></div>
      
      {/* Finish line */}
      <div className="absolute bottom-16 right-8 h-32 w-4 bg-white"></div>
    </div>
  );
};

export default RaceTrack; 
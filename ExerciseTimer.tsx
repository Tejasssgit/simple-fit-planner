import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Exercise } from '@/types/workout';
import { X, Play, Pause, RotateCcw, Check, Volume2, VolumeX } from 'lucide-react';

interface ExerciseTimerProps {
  exercise: Exercise;
  onComplete: (timeSpent: number) => void;
  onClose: () => void;
}

const ExerciseTimer: React.FC<ExerciseTimerProps> = ({ exercise, onComplete, onClose }) => {
  const [currentSet, setCurrentSet] = useState(1);
  const [currentRep, setCurrentRep] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [restTime, setRestTime] = useState(30);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
      }
      
      interval = setInterval(() => {
        if (isResting) {
          setRestTime(prev => {
            if (prev <= 1) {
              setIsResting(false);
              return 30;
            }
            return prev - 1;
          });
        }
        setTimeElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, isResting]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRepComplete = () => {
    if (currentRep < exercise.reps - 1) {
      setCurrentRep(prev => prev + 1);
    } else if (currentSet < exercise.sets) {
      setCurrentSet(prev => prev + 1);
      setCurrentRep(0);
      setIsResting(true);
    } else {
      // All sets complete
      onComplete(timeElapsed);
    }
  };

  const handleSetComplete = () => {
    if (currentSet < exercise.sets) {
      setCurrentSet(prev => prev + 1);
      setCurrentRep(0);
      setIsResting(true);
    } else {
      onComplete(timeElapsed);
    }
  };

  const skipRest = () => {
    setIsResting(false);
    setRestTime(30);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-destructive transition-all"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Set {currentSet} of {exercise.sets}</p>
          </div>
          <div className="w-10" />
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          {isResting ? (
            <motion.div
              className="text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-6 flex items-center justify-center glow-box-intense">
                <span className="text-4xl font-display font-bold text-primary">
                  {restTime}
                </span>
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                REST
              </h2>
              <p className="text-muted-foreground mb-6">
                Next: Set {currentSet} of {exercise.sets}
              </p>
              <motion.button
                onClick={skipRest}
                className="px-6 py-3 bg-secondary text-foreground rounded-xl font-display font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                whileTap={{ scale: 0.95 }}
              >
                SKIP REST
              </motion.button>
            </motion.div>
          ) : (
            <>
              {/* Exercise Image */}
              <div className="w-48 h-48 rounded-2xl bg-card border border-border mb-6 flex items-center justify-center overflow-hidden">
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
               
              </div>

              {/* Exercise Name */}
              <h1 className="text-2xl font-display font-bold text-primary glow-text text-center mb-2">
                {exercise.name}
              </h1>
              
              <p className="text-muted-foreground text-center max-w-sm mb-6">
                {exercise.description}
              </p>

              {/* Timer */}
              <div className="text-5xl font-display font-bold text-foreground mb-6">
                {formatTime(timeElapsed)}
              </div>

              {/* Rep Counter */}
              <div className="flex items-center gap-4 mb-8">
                <div className="text-center px-6 py-4 bg-card border border-border rounded-xl">
                  <p className="text-3xl font-display font-bold text-primary">{currentRep}/{exercise.reps}</p>
                  <p className="text-xs text-muted-foreground uppercase">Reps</p>
                </div>
                <div className="text-center px-6 py-4 bg-card border border-border rounded-xl">
                  <p className="text-3xl font-display font-bold text-foreground">{currentSet}/{exercise.sets}</p>
                  <p className="text-xs text-muted-foreground uppercase">Sets</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-primary" />
                  ) : (
                    <Play className="w-6 h-6 text-primary ml-1" />
                  )}
                </motion.button>

                <motion.button
                  onClick={handleSetComplete}
                  className="w-20 h-20 rounded-full bg-primary flex items-center justify-center glow-box hover:glow-box-intense transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Check className="w-8 h-8 text-primary-foreground" />
                </motion.button>

                <motion.button
                  onClick={handleRepComplete}
                  className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg font-bold text-primary">+1</span>
                </motion.button>
              </div>
            </>
          )}
        </div>

        {/* Footer hint */}
        <div className="p-4 text-center">
          <p className="text-xs text-muted-foreground">
            Tap the check button to complete the set, or +1 for each rep
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ExerciseTimer;

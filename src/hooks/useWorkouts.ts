import { useState, useEffect } from 'react';
import { Workout, WorkoutExercise } from '@/types/workout';

const STORAGE_KEY = 'workout-planner-workouts';

const defaultWorkouts: Workout[] = [
  {
    id: 'default-1',
    name: 'Full Body Blast',
    category: 'strength',
    difficulty: 'intermediate',
    exercises: [],
    estimatedMinutes: 45,
    isFavorite: true,
    createdAt: new Date(),
  },
  {
    id: 'default-2',
    name: 'Core Crusher',
    category: 'core',
    difficulty: 'beginner',
    exercises: [],
    estimatedMinutes: 20,
    isFavorite: false,
    createdAt: new Date(),
  },
  {
    id: 'default-3',
    name: 'HIIT Cardio',
    category: 'cardio',
    difficulty: 'advanced',
    exercises: [],
    estimatedMinutes: 30,
    isFavorite: false,
    createdAt: new Date(),
  },
  {
    id: 'default-4',
    name: 'Morning Stretch',
    category: 'flexibility',
    difficulty: 'beginner',
    exercises: [],
    estimatedMinutes: 15,
    isFavorite: true,
    createdAt: new Date(),
  },
];

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setWorkouts(parsed.map((w: Workout) => ({
          ...w,
          createdAt: new Date(w.createdAt),
          lastUsed: w.lastUsed ? new Date(w.lastUsed) : undefined,
        })));
      } catch {
        setWorkouts(defaultWorkouts);
      }
    } else {
      setWorkouts(defaultWorkouts);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
    }
  }, [workouts, isLoaded]);

  const addWorkout = (workout: Omit<Workout, 'id' | 'createdAt'>) => {
    const newWorkout: Workout = {
      ...workout,
      id: `workout-${Date.now()}`,
      createdAt: new Date(),
    };
    setWorkouts(prev => [newWorkout, ...prev]);
    return newWorkout;
  };

  const updateWorkout = (id: string, updates: Partial<Workout>) => {
    setWorkouts(prev =>
      prev.map(w => (w.id === id ? { ...w, ...updates } : w))
    );
  };

  const deleteWorkout = (id: string) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setWorkouts(prev =>
      prev.map(w => (w.id === id ? { ...w, isFavorite: !w.isFavorite } : w))
    );
  };

  const duplicateWorkout = (id: string) => {
    const workout = workouts.find(w => w.id === id);
    if (workout) {
      addWorkout({
        ...workout,
        name: `${workout.name} (Copy)`,
        isFavorite: false,
      });
    }
  };

  return {
    workouts,
    isLoaded,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    toggleFavorite,
    duplicateWorkout,
  };
}

export type ExerciseCategory = 'strength' | 'cardio' | 'flexibility' | 'core';
export type MuscleGroup = 'chest' | 'back' | 'shoulders' | 'arms' | 'legs' | 'core' | 'full-body';
export type Equipment = 'none' | 'dumbbells' | 'barbell' | 'machine' | 'cables' | 'bands' | 'kettlebell';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  muscleGroup: MuscleGroup;
  equipment: Equipment;
  difficulty: Difficulty;
  description: string;
  instructions: string[];
}

export interface WorkoutExercise {
  id: string;
  exercise: Exercise;
  sets: number;
  reps: number;
  restSeconds: number;
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  category: ExerciseCategory;
  difficulty: Difficulty;
  exercises: WorkoutExercise[];
  estimatedMinutes: number;
  isFavorite: boolean;
  createdAt: Date;
  lastUsed?: Date;
}

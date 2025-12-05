import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Plus, Minus, Trash2 } from 'lucide-react';
import { Exercise, Workout, WorkoutExercise, ExerciseCategory, Difficulty } from '@/types/workout';
import { exercises } from '@/data/exercises';
import { ExerciseCard } from '../ExerciseCard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';

interface CreateWorkoutViewProps {
  onSave: (workout: Omit<Workout, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

type Step = 'details' | 'exercises' | 'customize' | 'review';

const categories: { id: ExerciseCategory; label: string }[] = [
  { id: 'strength', label: 'Strength' },
  { id: 'cardio', label: 'Cardio' },
  { id: 'core', label: 'Core' },
  { id: 'flexibility', label: 'Flexibility' },
];

const difficulties: { id: Difficulty; label: string }[] = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

export function CreateWorkoutView({ onSave, onCancel }: CreateWorkoutViewProps) {
  const [step, setStep] = useState<Step>('details');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ExerciseCategory>('strength');
  const [difficulty, setDifficulty] = useState<Difficulty>('intermediate');
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const steps: Step[] = ['details', 'exercises', 'customize', 'review'];
  const currentStepIndex = steps.indexOf(step);

  const filteredExercises = exercises.filter(
    (ex) =>
      ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.category.includes(searchTerm.toLowerCase())
  );

  const toggleExercise = (exercise: Exercise) => {
    const exists = selectedExercises.find((e) => e.exercise.id === exercise.id);
    if (exists) {
      setSelectedExercises((prev) => prev.filter((e) => e.exercise.id !== exercise.id));
    } else {
      setSelectedExercises((prev) => [
        ...prev,
        {
          id: `we-${Date.now()}-${exercise.id}`,
          exercise,
          sets: 3,
          reps: 10,
          restSeconds: 60,
        },
      ]);
    }
  };

  const updateExerciseConfig = (id: string, field: 'sets' | 'reps' | 'restSeconds', value: number) => {
    setSelectedExercises((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: Math.max(1, value) } : e))
    );
  };

  const removeExercise = (id: string) => {
    setSelectedExercises((prev) => prev.filter((e) => e.id !== id));
  };

  const estimatedMinutes = selectedExercises.reduce((acc, ex) => {
    const exerciseTime = ex.sets * (ex.reps * 3 + ex.restSeconds) / 60;
    return acc + exerciseTime;
  }, 0);

  const canProceed = () => {
    switch (step) {
      case 'details':
        return name.trim().length > 0;
      case 'exercises':
        return selectedExercises.length > 0;
      case 'customize':
        return true;
      case 'review':
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step === 'review') {
      onSave({
        name,
        category,
        difficulty,
        exercises: selectedExercises,
        estimatedMinutes: Math.round(estimatedMinutes),
        isFavorite: false,
      });
    } else {
      setStep(steps[currentStepIndex + 1]);
    }
  };

  const handleBack = () => {
    if (currentStepIndex === 0) {
      onCancel();
    } else {
      setStep(steps[currentStepIndex - 1]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Create Workout</h1>
            <p className="text-sm text-muted-foreground capitalize">Step {currentStepIndex + 1}: {step}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-2">
          {steps.map((s, i) => (
            <div
              key={s}
              className={cn(
                'h-1 flex-1 rounded-full transition-colors',
                i <= currentStepIndex ? 'bg-primary' : 'bg-secondary'
              )}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-32">
        <AnimatePresence mode="wait">
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <Label htmlFor="name" className="text-base font-medium">Workout Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Morning Power"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 h-12 text-lg"
                />
              </div>

              <div>
                <Label className="text-base font-medium">Category</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={cn(
                        'p-4 rounded-xl border-2 text-left transition-all',
                        category === cat.id
                          ? 'border-primary bg-primary/10 shadow-glow'
                          : 'border-border bg-secondary/30 hover:border-primary/50'
                      )}
                    >
                      <span className="font-semibold">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Difficulty</Label>
                <div className="flex gap-3 mt-2">
                  {difficulties.map((diff) => (
                    <button
                      key={diff.id}
                      onClick={() => setDifficulty(diff.id)}
                      className={cn(
                        'flex-1 py-3 px-4 rounded-xl border-2 transition-all font-medium',
                        difficulty === diff.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-secondary/30 hover:border-primary/50'
                      )}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'exercises' && (
            <motion.div
              key="exercises"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <Input
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11"
              />
              <p className="text-sm text-muted-foreground">
                {selectedExercises.length} selected
              </p>
              <div className="grid gap-3">
                {filteredExercises.map((exercise, index) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    isSelected={selectedExercises.some((e) => e.exercise.id === exercise.id)}
                    onSelect={() => toggleExercise(exercise)}
                    onAdd={() => toggleExercise(exercise)}
                    showAddButton
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 'customize' && (
            <motion.div
              key="customize"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <p className="text-muted-foreground">Customize sets, reps, and rest for each exercise</p>
              {selectedExercises.map((workoutEx, index) => (
                <motion.div
                  key={workoutEx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="gradient-card rounded-xl border border-border/50 p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-foreground">{workoutEx.exercise.name}</h4>
                    <Button
                      variant="ghost"
                      size="iconSm"
                      onClick={() => removeExercise(workoutEx.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Sets */}
                    <div>
                      <Label className="text-xs text-muted-foreground">Sets</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="outline"
                          size="iconSm"
                          onClick={() => updateExerciseConfig(workoutEx.id, 'sets', workoutEx.sets - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-bold text-lg w-6 text-center">{workoutEx.sets}</span>
                        <Button
                          variant="outline"
                          size="iconSm"
                          onClick={() => updateExerciseConfig(workoutEx.id, 'sets', workoutEx.sets + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    {/* Reps */}
                    <div>
                      <Label className="text-xs text-muted-foreground">Reps</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="outline"
                          size="iconSm"
                          onClick={() => updateExerciseConfig(workoutEx.id, 'reps', workoutEx.reps - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-bold text-lg w-6 text-center">{workoutEx.reps}</span>
                        <Button
                          variant="outline"
                          size="iconSm"
                          onClick={() => updateExerciseConfig(workoutEx.id, 'reps', workoutEx.reps + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    {/* Rest */}
                    <div>
                      <Label className="text-xs text-muted-foreground">Rest (s)</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="outline"
                          size="iconSm"
                          onClick={() => updateExerciseConfig(workoutEx.id, 'restSeconds', workoutEx.restSeconds - 15)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-bold text-lg w-8 text-center">{workoutEx.restSeconds}</span>
                        <Button
                          variant="outline"
                          size="iconSm"
                          onClick={() => updateExerciseConfig(workoutEx.id, 'restSeconds', workoutEx.restSeconds + 15)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {step === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="gradient-card rounded-2xl border border-border/50 p-6 shadow-card">
                <h2 className="text-2xl font-bold text-foreground">{name}</h2>
                <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                  <span className="capitalize">{category}</span>
                  <span>•</span>
                  <span className="capitalize">{difficulty}</span>
                  <span>•</span>
                  <span>~{Math.round(estimatedMinutes)} min</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">
                  {selectedExercises.length} Exercises
                </h3>
                <div className="space-y-2">
                  {selectedExercises.map((ex, i) => (
                    <div
                      key={ex.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </span>
                        <span className="font-medium">{ex.exercise.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {ex.sets}×{ex.reps}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full h-14 text-lg font-semibold"
          size="xl"
        >
          {step === 'review' ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Save Workout
            </>
          ) : (
            <>
              Continue
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

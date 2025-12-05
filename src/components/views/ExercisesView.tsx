import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { exercises } from '@/data/exercises';
import { Exercise, ExerciseCategory, MuscleGroup, Equipment } from '@/types/workout';
import { ExerciseCard } from '../ExerciseCard';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';

interface ExercisesViewProps {
  onSelectExercise?: (exercise: Exercise) => void;
}

const categories: { id: ExerciseCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'strength', label: 'Strength' },
  { id: 'cardio', label: 'Cardio' },
  { id: 'core', label: 'Core' },
  { id: 'flexibility', label: 'Flexibility' },
];

const muscleGroups: { id: MuscleGroup | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'chest', label: 'Chest' },
  { id: 'back', label: 'Back' },
  { id: 'shoulders', label: 'Shoulders' },
  { id: 'arms', label: 'Arms' },
  { id: 'legs', label: 'Legs' },
  { id: 'core', label: 'Core' },
  { id: 'full-body', label: 'Full Body' },
];

const equipmentOptions: { id: Equipment | 'all'; label: string }[] = [
  { id: 'all', label: 'Any' },
  { id: 'none', label: 'Bodyweight' },
  { id: 'dumbbells', label: 'Dumbbells' },
  { id: 'barbell', label: 'Barbell' },
  { id: 'machine', label: 'Machine' },
  { id: 'cables', label: 'Cables' },
  { id: 'bands', label: 'Bands' },
  { id: 'kettlebell', label: 'Kettlebell' },
];

export function ExercisesView({ onSelectExercise }: ExercisesViewProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ExerciseCategory | 'all'>('all');
  const [muscleFilter, setMuscleFilter] = useState<MuscleGroup | 'all'>('all');
  const [equipmentFilter, setEquipmentFilter] = useState<Equipment | 'all'>('all');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || ex.category === categoryFilter;
    const matchesMuscle = muscleFilter === 'all' || ex.muscleGroup === muscleFilter;
    const matchesEquipment = equipmentFilter === 'all' || ex.equipment === equipmentFilter;
    return matchesSearch && matchesCategory && matchesMuscle && matchesEquipment;
  });

  const activeFiltersCount = [categoryFilter, muscleFilter, equipmentFilter].filter(
    (f) => f !== 'all'
  ).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-6 pb-4"
      >
        <h1 className="text-3xl font-bold text-foreground">Exercise Library</h1>
        <p className="text-muted-foreground mt-1">{exercises.length} exercises available</p>
      </motion.div>

      {/* Search & Filter */}
      <div className="px-4 pb-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50"
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative shrink-0">
              <Filter className="w-5 h-5" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
            <SheetHeader>
              <SheetTitle>Filter Exercises</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6 overflow-y-auto">
              {/* Category */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Category</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={categoryFilter === cat.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCategoryFilter(cat.id)}
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Muscle Group */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Muscle Group</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {muscleGroups.map((mg) => (
                    <Button
                      key={mg.id}
                      variant={muscleFilter === mg.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMuscleFilter(mg.id)}
                    >
                      {mg.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Equipment</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {equipmentOptions.map((eq) => (
                    <Button
                      key={eq.id}
                      variant={equipmentFilter === eq.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setEquipmentFilter(eq.id)}
                    >
                      {eq.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Clear */}
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setCategoryFilter('all');
                    setMuscleFilter('all');
                    setEquipmentFilter('all');
                  }}
                >
                  Clear all filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Quick Category Pills */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={categoryFilter === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoryFilter(cat.id)}
              className="shrink-0"
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Exercise List */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <p className="text-sm text-muted-foreground mb-4">
          {filteredExercises.length} exercises found
        </p>
        <div className="grid gap-3">
          {filteredExercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onSelect={() => setSelectedExercise(exercise)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Exercise Detail Sheet */}
      <Sheet open={!!selectedExercise} onOpenChange={() => setSelectedExercise(null)}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
          {selectedExercise && (
            <div className="h-full overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-2xl">{selectedExercise.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <p className="text-muted-foreground">{selectedExercise.description}</p>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium capitalize">
                    {selectedExercise.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary text-foreground text-sm font-medium capitalize">
                    {selectedExercise.muscleGroup.replace('-', ' ')}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary text-foreground text-sm font-medium capitalize">
                    {selectedExercise.equipment === 'none' ? 'Bodyweight' : selectedExercise.equipment}
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Instructions</h4>
                  <ol className="space-y-3">
                    {selectedExercise.instructions.map((instruction, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-muted-foreground">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Heart } from 'lucide-react';
import { Workout, ExerciseCategory } from '@/types/workout';
import { WorkoutCard } from '../WorkoutCard';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface WorkoutsViewProps {
  workouts: Workout[];
  onSelectWorkout: (workout: Workout) => void;
  onToggleFavorite: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

type FilterType = 'all' | 'favorites' | ExerciseCategory;

const filters: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'strength', label: 'Strength' },
  { id: 'cardio', label: 'Cardio' },
  { id: 'core', label: 'Core' },
  { id: 'flexibility', label: 'Flexibility' },
];

export function WorkoutsView({
  workouts,
  onSelectWorkout,
  onToggleFavorite,
  onDuplicate,
  onDelete,
}: WorkoutsViewProps) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch = workout.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'favorites' && workout.isFavorite) ||
      workout.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-6 pb-4"
      >
        <h1 className="text-3xl font-bold text-foreground">My Workouts</h1>
        <p className="text-muted-foreground mt-1">Your saved routines</p>
      </motion.div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search workouts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'shrink-0',
                activeFilter === filter.id && 'shadow-lg shadow-primary/20'
              )}
            >
              {filter.id === 'favorites' && <Heart className="w-3.5 h-3.5 mr-1" />}
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Workout List */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {filteredWorkouts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Search className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No workouts found</h3>
            <p className="text-muted-foreground mt-1">
              {search ? 'Try a different search term' : 'Create your first workout to get started'}
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {filteredWorkouts.map((workout, index) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onSelect={() => onSelectWorkout(workout)}
                onToggleFavorite={() => onToggleFavorite(workout.id)}
                onDuplicate={() => onDuplicate(workout.id)}
                onDelete={() => onDelete(workout.id)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

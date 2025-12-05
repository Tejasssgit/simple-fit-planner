import { motion } from 'framer-motion';
import { Heart, Clock, Dumbbell, MoreVertical, Copy, Trash2, Play } from 'lucide-react';
import { Workout, ExerciseCategory } from '@/types/workout';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface WorkoutCardProps {
  workout: Workout;
  onSelect: () => void;
  onToggleFavorite: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  index: number;
}

const categoryColors: Record<ExerciseCategory, string> = {
  strength: 'bg-strength/20 text-strength border-strength/30',
  cardio: 'bg-cardio/20 text-cardio border-cardio/30',
  flexibility: 'bg-flexibility/20 text-flexibility border-flexibility/30',
  core: 'bg-core/20 text-core border-core/30',
};

const categoryLabels: Record<ExerciseCategory, string> = {
  strength: 'Strength',
  cardio: 'Cardio',
  flexibility: 'Flexibility',
  core: 'Core',
};

export function WorkoutCard({
  workout,
  onSelect,
  onToggleFavorite,
  onDuplicate,
  onDelete,
  index,
}: WorkoutCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group relative bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-glow hover:border-primary/40 transition-all duration-300 cursor-pointer"
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate text-lg">{workout.name}</h3>
          <span
            className={cn(
              'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border mt-1.5',
              categoryColors[workout.category]
            )}
          >
            {categoryLabels[workout.category]}
          </span>
        </div>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="iconSm"
            onClick={onToggleFavorite}
            className="opacity-70 hover:opacity-100"
          >
            <Heart
              className={cn(
                'w-4 h-4 transition-colors',
                workout.isFavorite ? 'fill-cardio text-cardio' : 'text-muted-foreground'
              )}
            />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="iconSm" className="opacity-70 hover:opacity-100">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={onDuplicate}>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{workout.estimatedMinutes} min</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Dumbbell className="w-4 h-4" />
          <span>{workout.exercises.length} exercises</span>
        </div>
      </div>

      {/* Start button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.05 }}
        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <Button size="icon" className="rounded-full w-10 h-10 shadow-lg">
          <Play className="w-4 h-4 ml-0.5" />
        </Button>
      </motion.div>
    </motion.div>
  );
}

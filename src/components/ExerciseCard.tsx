import { motion } from 'framer-motion';
import { Plus, Check, Dumbbell } from 'lucide-react';
import { Exercise, ExerciseCategory } from '@/types/workout';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface ExerciseCardProps {
  exercise: Exercise;
  isSelected?: boolean;
  onSelect?: () => void;
  onAdd?: () => void;
  showAddButton?: boolean;
  index: number;
}

const categoryColors: Record<ExerciseCategory, { bg: string; text: string; border: string }> = {
  strength: { bg: 'bg-strength/10', text: 'text-strength', border: 'border-strength/30' },
  cardio: { bg: 'bg-cardio/10', text: 'text-cardio', border: 'border-cardio/30' },
  flexibility: { bg: 'bg-flexibility/10', text: 'text-flexibility', border: 'border-flexibility/30' },
  core: { bg: 'bg-core/10', text: 'text-core', border: 'border-core/30' },
};

const equipmentLabels: Record<string, string> = {
  none: 'Bodyweight',
  dumbbells: 'Dumbbells',
  barbell: 'Barbell',
  machine: 'Machine',
  cables: 'Cables',
  bands: 'Bands',
  kettlebell: 'Kettlebell',
};

const difficultyColors: Record<string, string> = {
  beginner: 'text-flexibility',
  intermediate: 'text-core',
  advanced: 'text-cardio',
};

export function ExerciseCard({
  exercise,
  isSelected,
  onSelect,
  onAdd,
  showAddButton = false,
  index,
}: ExerciseCardProps) {
  const colors = categoryColors[exercise.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      className={cn(
        'relative gradient-card rounded-xl border p-4 transition-all duration-200 cursor-pointer',
        isSelected
          ? 'border-primary shadow-glow'
          : 'border-border/50 hover:border-primary/30 hover:shadow-card'
      )}
      onClick={onSelect}
    >
      {/* Category indicator */}
      <div className={cn('absolute top-0 left-4 w-8 h-1 rounded-b-full', colors.bg)} />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{exercise.name}</h4>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{exercise.description}</p>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium',
                colors.bg,
                colors.text
              )}
            >
              <Dumbbell className="w-3 h-3" />
              {equipmentLabels[exercise.equipment]}
            </span>
            <span className={cn('text-xs font-medium capitalize', difficultyColors[exercise.difficulty])}>
              {exercise.difficulty}
            </span>
          </div>
        </div>

        {showAddButton && (
          <Button
            size="icon"
            variant={isSelected ? 'default' : 'icon'}
            onClick={(e) => {
              e.stopPropagation();
              onAdd?.();
            }}
            className="shrink-0"
          >
            {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </Button>
        )}
      </div>
    </motion.div>
  );
}

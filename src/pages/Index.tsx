import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BottomNav } from '@/components/BottomNav';
import { WorkoutsView } from '@/components/views/WorkoutsView';
import { CreateWorkoutView } from '@/components/views/CreateWorkoutView';
import { ExercisesView } from '@/components/views/ExercisesView';
import { SettingsView } from '@/components/views/SettingsView';
import { useWorkouts } from '@/hooks/useWorkouts';
import { Workout } from '@/types/workout';
import { toast } from '@/hooks/use-toast';

type Tab = 'workouts' | 'create' | 'exercises' | 'settings';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('workouts');
  const { workouts, addWorkout, updateWorkout, deleteWorkout, toggleFavorite, duplicateWorkout } =
    useWorkouts();

  const handleSaveWorkout = (workout: Omit<Workout, 'id' | 'createdAt'>) => {
    addWorkout(workout);
    setActiveTab('workouts');
    toast({
      title: 'Workout saved!',
      description: `${workout.name} has been added to your library.`,
    });
  };

  const handleDeleteWorkout = (id: string) => {
    const workout = workouts.find((w) => w.id === id);
    deleteWorkout(id);
    toast({
      title: 'Workout deleted',
      description: workout ? `${workout.name} has been removed.` : 'Workout removed.',
    });
  };

  const handleSelectWorkout = (workout: Workout) => {
    toast({
      title: workout.name,
      description: `${workout.exercises.length} exercises • ${workout.estimatedMinutes} min`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="h-screen"
        >
          {activeTab === 'workouts' && (
            <WorkoutsView
              workouts={workouts}
              onSelectWorkout={handleSelectWorkout}
              onToggleFavorite={toggleFavorite}
              onDuplicate={duplicateWorkout}
              onDelete={handleDeleteWorkout}
            />
          )}
          {activeTab === 'create' && (
            <CreateWorkoutView
              onSave={handleSaveWorkout}
              onCancel={() => setActiveTab('workouts')}
            />
          )}
          {activeTab === 'exercises' && <ExercisesView />}
          {activeTab === 'settings' && <SettingsView />}
        </motion.div>
      </AnimatePresence>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;

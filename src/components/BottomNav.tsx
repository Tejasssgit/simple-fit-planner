import { motion } from 'framer-motion';
import { Dumbbell, Plus, ListChecks, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'workouts' | 'create' | 'exercises' | 'settings';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs = [
  { id: 'workouts' as Tab, label: 'Workouts', icon: Dumbbell },
  { id: 'create' as Tab, label: 'Create', icon: Plus },
  { id: 'exercises' as Tab, label: 'Exercises', icon: ListChecks },
  { id: 'settings' as Tab, label: 'Settings', icon: Settings },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              <Icon className={cn('w-5 h-5 relative z-10', isActive && 'text-primary')} />
              <span className="text-xs font-medium relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

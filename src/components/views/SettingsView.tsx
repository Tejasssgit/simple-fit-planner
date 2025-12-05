import { motion } from 'framer-motion';
import { User, Bell, Moon, Share2, HelpCircle, Shield, ChevronRight } from 'lucide-react';
import { Switch } from '../ui/switch';
import { cn } from '@/lib/utils';

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  action?: React.ReactNode;
  onClick?: () => void;
}

function SettingItem({ icon, label, description, action, onClick }: SettingItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-4 p-4 rounded-xl transition-colors',
        onClick && 'hover:bg-secondary/50 cursor-pointer'
      )}
    >
      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className="font-medium text-foreground">{label}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {action || (onClick && <ChevronRight className="w-5 h-5 text-muted-foreground" />)}
    </button>
  );
}

export function SettingsView() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-6 pb-6"
      >
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Customize your experience</p>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Profile Section */}
          <div className="gradient-card rounded-2xl border border-border/50 p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                W
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Workout Warrior</h3>
                <p className="text-sm text-muted-foreground">Free Plan</p>
              </div>
            </div>
          </div>

          {/* App Settings */}
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-muted-foreground px-1 mb-2">App Settings</h4>
            <div className="gradient-card rounded-2xl border border-border/50 overflow-hidden">
              <SettingItem
                icon={<Bell className="w-5 h-5" />}
                label="Notifications"
                description="Workout reminders"
                action={<Switch />}
              />
              <div className="h-px bg-border/50 mx-4" />
              <SettingItem
                icon={<Moon className="w-5 h-5" />}
                label="Dark Mode"
                description="Always on"
                action={<Switch defaultChecked />}
              />
            </div>
          </div>

          {/* Data */}
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-muted-foreground px-1 mb-2">Data</h4>
            <div className="gradient-card rounded-2xl border border-border/50 overflow-hidden">
              <SettingItem
                icon={<Share2 className="w-5 h-5" />}
                label="Export Workouts"
                onClick={() => {}}
              />
              <div className="h-px bg-border/50 mx-4" />
              <SettingItem
                icon={<Shield className="w-5 h-5" />}
                label="Privacy"
                onClick={() => {}}
              />
            </div>
          </div>

          {/* Support */}
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-muted-foreground px-1 mb-2">Support</h4>
            <div className="gradient-card rounded-2xl border border-border/50 overflow-hidden">
              <SettingItem
                icon={<HelpCircle className="w-5 h-5" />}
                label="Help & FAQ"
                onClick={() => {}}
              />
            </div>
          </div>

          {/* Version */}
          <p className="text-center text-sm text-muted-foreground pt-4">
            Simple Workout Planner v1.0.0
          </p>
        </motion.div>
      </div>
    </div>
  );
}

import { Exercise, WorkoutDay, RewardWallpaper } from '@/types/workout';
import exerciseChest1 from '@/assets/chestx/beginner/excercise-pushups.jpg';
import exerciseChest2 from '@/assets/chestx/intermediate/diamond-pushup.jpg';
import exerciseChest3 from '@/assets/chestx/intermediate/decline-pushups.jpg';
import exerciseChest4 from '@/assets/chestx/advanced/archer-pushups.jpg';
import exerciseChest5 from '@/assets/chestx/advanced/clap-pushups.jpg';
import exerciseBack1 from '@/assets/backx/beginner/excercise-superman-hold.jpg';
import exerciseBack2 from '@/assets/backx/beginner/excercise-reverse-snow.jpg';
import exerciseBack3 from '@/assets/backx/beginner/excercise-bird-dog.jpg';
import exerciseBack4 from '@/assets/backx/intermediate/prone-Y-raises.jpg';
import exerciseBack5 from '@/assets/backx/intermediate/inverted-row.jpg';
import exerciseBack6 from '@/assets/backx/advanced/towel-rows.jpg';
import exerciseShoulders1 from '@/assets/shoulderx/beginner/excercise-pike-pushups.jpg';
import exerciseShoulders2 from '@/assets/shoulderx/beginner/excercise-Shoulder-taps.jpg';
import exerciseShoulders3 from '@/assets/shoulderx/beginner/excercise-wall-puspups.jpg';
import exerciseShoulders4 from '@/assets/shoulderx/intermediate/elevated-pike-pushups.jpg';
import exerciseShoulders5 from '@/assets/shoulderx/advanced/handstand-holdwall.jpg';
import exerciseShoulders6 from '@/assets/shoulderx/advanced/handstand-pushups.jpg';
import exerciseLegs1 from '@/assets/legx/beginner/excercise-Bodywieght-squats.jpg';
import exerciseLegs2 from '@/assets/legx/beginner/excercise-Lunges.jpg';
import exerciseLegs3 from '@/assets/legx/beginner/excercise-calf-raises.jpg';
import exerciseLegs4 from '@/assets/legx/intermediate/bulgarian-split-squats.jpg';
import exerciseLegs5 from '@/assets/legx/intermediate/jump-squats.jpg';
import exerciseLegs6 from '@/assets/legx/advanced/pistol-squats.jpg';
import exerciseArms1 from '@/assets/armsx/beginner/excercise-tricep-ips.jpg';
import exerciseArms2 from '@/assets/armsx/beginner/excercise-close-grip-pushups.jpg';
import exerciseArms3 from '@/assets/armsx/beginner/excercise-Arm-pulses.jpg';
import exerciseArms4 from '@/assets/armsx/intermediate/bench-dips.jpg';
import exerciseArms5 from '@/assets/armsx/advanced/psueado-plance-pushups.jpg';
import exerciseArms6 from '@/assets/armsx/advanced/tiger-pushups.jpg';
import exercisebitrix1 from '@/assets/bitrix/beginner/excercise-doorway-curls.jpg';
import exercisebitrix2 from '@/assets/bitrix/beginner/excercise-tricep-kickbacks.jpg';
import exercisebitrix3 from '@/assets/bitrix/beginner/excercise-Isometric-bicep-hold.jpg';
import exercisebitrix4 from '@/assets/bitrix/intermediate/towel-bicep-curls.jpg';
import exercisebitrix5 from '@/assets/bitrix/intermediate/diamon-tricep-pushup.jpg';
import exercisebitrix6 from '@/assets/bitrix/advanced/body-wieght-skull-crushers.jpg';
import exerciseWarmup1 from '@/assets/warmupd/excercise-jumpingjacks.jpg';
import exerciseWarmup2 from '@/assets/warmupd/excercise-arm-circles.jpg';
import exerciseWarmup3 from '@/assets/warmupd/excercise-high-knees.jpg';
import exerciseWarmup4 from '@/assets/warmupd/excercise-torso-twists.jpg';
import exerciseCooldown1 from '@/assets/coold/excercise-quad-stretch.jpg';
import exerciseCooldown2 from '@/assets/coold/excercise-shoulder-stretch.jpg';
import exerciseCooldown3 from '@/assets/coold/excercise-Childs-pose.jpg';
import exerciseCooldown4 from '@/assets/coold/excercise-deep-breathing.jpg';
import wallpaperWelcome from '@/assets/wallpaper-welcome.png';
import wallpaper7Day from '@/assets/wallpaper-7day.png';
import wallpaper14Day from '@/assets/wallpaper-14day.png';
import wallpaper30Day from '@/assets/wallpaper-30day.png';
import wallpaper60Day from '@/assets/wallpaper-60day.png';
import wallpaper90Day from '@/assets/wallpaper-90day.png';
import wallpaper21Day from '@/assets/wallpaper-21day.png';
import wallpaper45Day from '@/assets/wallpaper-45day.png';
import wallpaper120Day from '@/assets/wallpaper-120day.png';
import wallpaper180Day from '@/assets/wallpaper-180day.png';
import wallpaper365Day from '@/assets/wallpaper-365day.png';

// Warm-up exercises
export const warmUpExercises: Exercise[] = [
  {
    id: 'warmup-1',
    name: 'Jumping Jacks',
    description: 'Stand with feet together, jump while spreading arms and legs, return to start.',
    muscleGroup: 'Full Body',
    reps: 30,
    sets: 1,
    duration: 60,
    image: exerciseWarmup1,
    level: 'beginner',
    isWarmUp: true,
  },
  {
    id: 'warmup-2',
    name: 'Arm Circles',
    description: 'Extend arms to sides and make circular motions, gradually increasing size.',
    muscleGroup: 'Shoulders',
    reps: 20,
    sets: 1,
    duration: 30,
    image: exerciseWarmup2,
    level: 'beginner',
    isWarmUp: true,
  },
  {
    id: 'warmup-3',
    name: 'High Knees',
    description: 'Run in place bringing knees up to hip level alternately.',
    muscleGroup: 'Legs',
    reps: 30,
    sets: 1,
    duration: 45,
    image: exerciseWarmup3,
    level: 'beginner',
    isWarmUp: true,
  },
  {
    id: 'warmup-4',
    name: 'Torso Twists',
    description: 'Stand with feet shoulder-width apart, twist your torso left and right.',
    muscleGroup: 'Core',
    reps: 20,
    sets: 1,
    duration: 30,
    image: exerciseWarmup4,
    level: 'beginner',
    isWarmUp: true,
  },
];

// Cool-down exercises
export const coolDownExercises: Exercise[] = [
  {
    id: 'cooldown-1',
    name: 'Standing Quad Stretch',
    description: 'Stand on one leg, pull opposite foot to glutes, hold for 30 seconds each side.',
    muscleGroup: 'Legs',
    reps: 1,
    sets: 2,
    duration: 60,
    image: exerciseCooldown1,
    level: 'beginner',
    isCoolDown: true,
  },
  {
    id: 'cooldown-2',
    name: 'Shoulder Stretch',
    description: 'Cross one arm over chest, use other hand to press it closer, hold 30 seconds each.',
    muscleGroup: 'Shoulders',
    reps: 1,
    sets: 2,
    duration: 60,
    image: exerciseCooldown2,
    level: 'beginner',
    isCoolDown: true,
  },
  {
    id: 'cooldown-3',
    name: 'Child\'s Pose',
    description: 'Kneel on floor, sit back on heels, extend arms forward, rest forehead on ground.',
    muscleGroup: 'Back',
    reps: 1,
    sets: 1,
    duration: 60,
    image: exerciseCooldown3,
    level: 'beginner',
    isCoolDown: true,
  },
  {
    id: 'cooldown-4',
    name: 'Deep Breathing',
    description: 'Stand or sit comfortably, inhale deeply for 4 counts, hold 4, exhale 4.',
    muscleGroup: 'Recovery',
    reps: 5,
    sets: 1,
    duration: 60,
    image: exerciseCooldown4,
    level: 'beginner',
    isCoolDown: true,
  },
];

// Chest exercises
const chestExercises: Exercise[] = [
  {
    id: 'chest-1',
    name: 'Push-Ups',
    description: 'Classic push-up position, lower chest to floor and push back up.',
    muscleGroup: 'Chest',
    reps: 15,
    sets: 3,
    image: exerciseChest1,
    level: 'beginner',
  },
  {
    id: 'chest-2',
    name: 'Wide Push-Ups',
    description: 'Push-ups with hands placed wider than shoulder width.',
    muscleGroup: 'Chest',
    reps: 12,
    sets: 3,
    image: exerciseChest1,
    level: 'beginner',
  },
  {
    id: 'chest-3',
    name: 'Diamond Push-Ups',
    description: 'Push-ups with hands close together forming a diamond shape.',
    muscleGroup: 'Chest',
    reps: 10,
    sets: 3,
    image: exerciseChest2,
    level: 'intermediate',
  },
  {
    id: 'chest-4',
    name: 'Decline Push-Ups',
    description: 'Push-ups with feet elevated on a chair or step.',
    muscleGroup: 'Chest',
    reps: 12,
    sets: 3,
    image: exerciseChest3,
    level: 'intermediate',
  },
  {
    id: 'chest-5',
    name: 'Archer Push-Ups',
    description: 'Wide push-up shifting weight to one side, extending opposite arm.',
    muscleGroup: 'Chest',
    reps: 8,
    sets: 3,
    image: exerciseChest4,
    level: 'advanced',
  },
  {
    id: 'chest-6',
    name: 'Clap Push-Ups',
    description: 'Explosive push-up with a clap at the top of the movement.',
    muscleGroup: 'Chest',
    reps: 8,
    sets: 3,
    image: exerciseChest5,
    level: 'advanced',
  },
];

// Back exercises
const backExercises: Exercise[] = [
  {
    id: 'back-1',
    name: 'Superman Hold',
    description: 'Lie face down, lift arms and legs off ground, hold position.',
    muscleGroup: 'Back',
    reps: 10,
    sets: 3,
    duration: 30,
    image: exerciseBack1,
    level: 'beginner',
  },
  {
    id: 'back-2',
    name: 'Reverse Snow Angels',
    description: 'Lie face down, move arms in arc from hips to overhead.',
    muscleGroup: 'Back',
    reps: 12,
    sets: 3,
    image: exerciseBack2,
    level: 'beginner',
  },
  {
    id: 'back-3',
    name: 'Bird Dog',
    description: 'On hands and knees, extend opposite arm and leg simultaneously.',
    muscleGroup: 'Back',
    reps: 12,
    sets: 3,
    image: exerciseBack3,
    level: 'beginner',
  },
  {
    id: 'back-4',
    name: 'Prone Y Raises',
    description: 'Lie face down, raise arms in Y position, squeeze shoulder blades.',
    muscleGroup: 'Back',
    reps: 15,
    sets: 3,
    image: exerciseBack4,
    level: 'intermediate',
  },
  {
    id: 'back-5',
    name: 'Inverted Rows',
    description: 'Using a sturdy table edge, pull chest up while keeping body straight.',
    muscleGroup: 'Back',
    reps: 10,
    sets: 3,
    image: exerciseBack5,
    level: 'intermediate',
  },
  {
    id: 'back-6',
    name: 'Towel Rows',
    description: 'Loop towel around doorknob, lean back and row towards chest.',
    muscleGroup: 'Back',
    reps: 12,
    sets: 4,
    image: exerciseBack6,
    level: 'advanced',
  },
];

// Shoulder exercises
const shoulderExercises: Exercise[] = [
  {
    id: 'shoulder-1',
    name: 'Pike Push-Ups',
    description: 'Downward dog position, bend elbows to lower head towards floor.',
    muscleGroup: 'Shoulders',
    reps: 12,
    sets: 3,
    image: exerciseShoulders1,
    level: 'beginner',
  },
  {
    id: 'shoulder-2',
    name: 'Shoulder Taps',
    description: 'In plank position, alternately tap opposite shoulder with each hand.',
    muscleGroup: 'Shoulders',
    reps: 20,
    sets: 3,
    image: exerciseShoulders2,
    level: 'beginner',
  },
  {
    id: 'shoulder-3',
    name: 'Wall Push-Ups',
    description: 'Push-ups against a wall to target shoulders with less resistance.',
    muscleGroup: 'Shoulders',
    reps: 15,
    sets: 3,
    image: exerciseShoulders3,
    level: 'beginner',
  },
  {
    id: 'shoulder-4',
    name: 'Elevated Pike Push-Ups',
    description: 'Pike push-ups with feet elevated for increased difficulty.',
    muscleGroup: 'Shoulders',
    reps: 10,
    sets: 3,
    image: exerciseShoulders4,
    level: 'intermediate',
  },
  {
    id: 'shoulder-5',
    name: 'Handstand Hold (Wall)',
    description: 'Kick up to handstand against wall, hold position.',
    muscleGroup: 'Shoulders',
    reps: 1,
    sets: 3,
    duration: 30,
    image: exerciseShoulders5,
    level: 'advanced',
  },
  {
    id: 'shoulder-6',
    name: 'Handstand Push-Ups',
    description: 'Against wall, lower head to floor and push back up.',
    muscleGroup: 'Shoulders',
    reps: 5,
    sets: 3,
    image: exerciseShoulders6,
    level: 'advanced',
  },
];

// Arms exercises (combined)
const armsExercises: Exercise[] = [
  {
    id: 'arms-1',
    name: 'Tricep Dips (Chair)',
    description: 'Using a chair, lower body by bending elbows, then push back up.',
    muscleGroup: 'Arms',
    reps: 12,
    sets: 3,
    image: exerciseArms1,
    level: 'beginner',
  },
  {
    id: 'arms-2',
    name: 'Close-Grip Push-Ups',
    description: 'Push-ups with hands close together to target triceps.',
    muscleGroup: 'Arms',
    reps: 12,
    sets: 3,
    image: exerciseArms2,
    level: 'beginner',
  },
  {
    id: 'arms-3',
    name: 'Arm Pulses',
    description: 'Extend arms to sides, make small pulsing movements.',
    muscleGroup: 'Arms',
    reps: 30,
    sets: 3,
    image: exerciseArms3,
    level: 'beginner',
  },
  {
    id: 'arms-4',
    name: 'Bench Dips (Deep)',
    description: 'Deep tricep dips with legs extended for more challenge.',
    muscleGroup: 'Arms',
    reps: 10,
    sets: 3,
    image: exerciseArms4,
    level: 'intermediate',
  },
  {
    id: 'arms-5',
    name: 'Pseudo Planche Push-Ups',
    description: 'Push-ups with hands by waist, leaning forward.',
    muscleGroup: 'Arms',
    reps: 8,
    sets: 3,
    image: exerciseArms5,
    level: 'advanced',
  },
  {
    id: 'arms-6',
    name: 'Tiger Bend Push-Ups',
    description: 'From forearm plank, push up to high plank position.',
    muscleGroup: 'Arms',
    reps: 8,
    sets: 3,
    image: exerciseArms6,
    level: 'advanced',
  },
];

// Biceps and Triceps focus
const bicepsTricepsExercises: Exercise[] = [
  {
    id: 'bi-tri-1',
    name: 'Doorway Curls',
    description: 'Hold door frame, lean back, curl body towards hands.',
    muscleGroup: 'Biceps',
    reps: 12,
    sets: 3,
    image: exercisebitrix1,
    level: 'beginner',
  },
  {
    id: 'bi-tri-2',
    name: 'Tricep Kickbacks',
    description: 'Bent over, extend arm straight back, squeeze tricep.',
    muscleGroup: 'Triceps',
    reps: 15,
    sets: 3,
    image: exercisebitrix2,
    level: 'beginner',
  },
  {
    id: 'bi-tri-3',
    name: 'Isometric Bicep Hold',
    description: 'Press palms against underside of table, hold tension.',
    muscleGroup: 'Biceps',
    reps: 1,
    sets: 3,
    duration: 30,
    image: exercisebitrix3,
    level: 'beginner',
  },
  {
    id: 'bi-tri-4',
    name: 'Towel Bicep Curls',
    description: 'Step on towel, curl ends towards shoulders with resistance.',
    muscleGroup: 'Biceps',
    reps: 12,
    sets: 3,
    image: exercisebitrix4,
    level: 'intermediate',
  },
  {
    id: 'bi-tri-5',
    name: 'Diamond Tricep Push-Ups',
    description: 'Diamond push-ups focusing on tricep contraction.',
    muscleGroup: 'Triceps',
    reps: 10,
    sets: 4,
    image: exercisebitrix5,
    level: 'intermediate',
  },
  {
    id: 'bi-tri-6',
    name: 'Bodyweight Skull Crushers',
    description: 'From elevated surface, lower forehead towards hands and push up.',
    muscleGroup: 'Triceps',
    reps: 10,
    sets: 3,
    image: exercisebitrix6,
    level: 'advanced',
  },
];

// Leg exercises
const legExercises: Exercise[] = [
  {
    id: 'legs-1',
    name: 'Bodyweight Squats',
    description: 'Stand with feet shoulder-width, lower until thighs parallel to floor.',
    muscleGroup: 'Legs',
    reps: 20,
    sets: 3,
    image: exerciseLegs1,
    level: 'beginner',
  },
  {
    id: 'legs-2',
    name: 'Lunges',
    description: 'Step forward, lower back knee towards floor, return to standing.',
    muscleGroup: 'Legs',
    reps: 12,
    sets: 3,
    image: exerciseLegs2,
    level: 'beginner',
  },
  {
    id: 'legs-3',
    name: 'Calf Raises',
    description: 'Stand on edge of step, raise heels high, lower below step level.',
    muscleGroup: 'Legs',
    reps: 20,
    sets: 3,
    image: exerciseLegs3,
    level: 'beginner',
  },
  {
    id: 'legs-4',
    name: 'Bulgarian Split Squats',
    description: 'Rear foot on chair, lower front thigh parallel to floor.',
    muscleGroup: 'Legs',
    reps: 10,
    sets: 3,
    image: exerciseLegs4,
    level: 'intermediate',
  },
  {
    id: 'legs-5',
    name: 'Jump Squats',
    description: 'Squat down, explode upward into a jump, land softly.',
    muscleGroup: 'Legs',
    reps: 15,
    sets: 3,
    image: exerciseLegs5,
    level: 'intermediate',
  },
  {
    id: 'legs-6',
    name: 'Pistol Squats',
    description: 'Single leg squat with other leg extended forward.',
    muscleGroup: 'Legs',
    reps: 5,
    sets: 3,
    image: exerciseLegs6,
    level: 'advanced',
  },
];

export const workoutSchedule: WorkoutDay[] = [
  {
    day: 'monday',
    muscleGroup: 'Chest',
    isRestDay: false,
    warmUp: warmUpExercises,
    exercises: chestExercises,
    coolDown: coolDownExercises,
  },
  {
    day: 'tuesday',
    muscleGroup: 'Back',
    isRestDay: false,
    warmUp: warmUpExercises,
    exercises: backExercises,
    coolDown: coolDownExercises,
  },
  {
    day: 'wednesday',
    muscleGroup: 'Shoulders',
    isRestDay: false,
    warmUp: warmUpExercises,
    exercises: shoulderExercises,
    coolDown: coolDownExercises,
  },
  {
    day: 'thursday',
    muscleGroup: 'Arms',
    isRestDay: false,
    warmUp: warmUpExercises,
    exercises: armsExercises,
    coolDown: coolDownExercises,
  },
  {
    day: 'friday',
    muscleGroup: 'Biceps & Triceps',
    isRestDay: false,
    warmUp: warmUpExercises,
    exercises: bicepsTricepsExercises,
    coolDown: coolDownExercises,
  },
  {
    day: 'saturday',
    muscleGroup: 'Legs',
    isRestDay: false,
    warmUp: warmUpExercises,
    exercises: legExercises,
    coolDown: coolDownExercises,
  },
  {
    day: 'sunday',
    muscleGroup: 'Rest',
    isRestDay: true,
    warmUp: [],
    exercises: [],
    coolDown: [],
  },
];

export const rewardWallpapers: RewardWallpaper[] = [
  {
    id: 'wallpaper-default',
    name: 'Welcome Warrior',
    image: wallpaperWelcome,
    requiredStreak: 0,
    description: 'Your journey begins here!',
  },
  {
    id: 'wallpaper-7day',
    name: 'First Week Champion',
    image: wallpaper7Day,
    requiredStreak: 7,
    description: 'Complete a 7-day workout streak',
  },
  {
    id: 'wallpaper-14day',
    name: 'Dedicated Athlete',
    image: wallpaper14Day,
    requiredStreak: 14,
    description: 'Complete a 14-day workout streak',
  },
  {
    id: 'wallpaper-21day',
    name: 'Habit Builder',
    image: wallpaper21Day,
    requiredStreak: 21,
    description: 'Complete a 21-day workout streak',
  },
  {
    id: 'wallpaper-30day',
    name: 'Iron Will',
    image: wallpaper30Day,
    requiredStreak: 30,
    description: 'Complete a 30-day workout streak',
  },
  {
    id: 'wallpaper-45day',
    name: 'Fire Warrior',
    image: wallpaper45Day,
    requiredStreak: 45,
    description: 'Complete a 45-day workout streak',
  },
  {
    id: 'wallpaper-60day',
    name: 'Unstoppable Force',
    image: wallpaper60Day,
    requiredStreak: 60,
    description: 'Complete a 60-day workout streak',
  },
  {
    id: 'wallpaper-90day',
    name: 'Legend',
    image: wallpaper90Day,
    requiredStreak: 90,
    description: 'Complete a 90-day workout streak',
  },
  {
    id: 'wallpaper-120day',
    name: 'Elite Champion',
    image: wallpaper120Day,
    requiredStreak: 120,
    description: 'Complete a 120-day workout streak',
  },
  {
    id: 'wallpaper-180day',
    name: 'Transcendent',
    image: wallpaper180Day,
    requiredStreak: 180,
    description: 'Complete a 180-day workout streak',
  },
  {
    id: 'wallpaper-365day',
    name: 'Immortal',
    image: wallpaper365Day,
    requiredStreak: 365,
    description: 'Complete a full year workout streak',
  },
];

export const getExercisesForLevel = (exercises: Exercise[], level: string): Exercise[] => {
  const levelPriority = { beginner: 1, intermediate: 2, advanced: 3 };
  const userLevel = levelPriority[level as keyof typeof levelPriority] || 1;
  
  return exercises.filter(ex => {
    const exLevel = levelPriority[ex.level as keyof typeof levelPriority] || 1;
    return exLevel <= userLevel;
  });
};

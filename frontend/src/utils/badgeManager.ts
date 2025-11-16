// Badge Manager
// Tracks and awards badges to users
// Static badge data stored in code, only IDs and earned dates in localStorage

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string; // Tailwind gradient classes
  category: 'beginner' | 'achievement' | 'streak' | 'challenge' | 'special';
}

export interface Badge extends BadgeDefinition {
  earnedDate: string; // ISO date string
}

export interface EarnedBadgeData {
  id: string;
  earnedDate: string; // ISO date string
}

export interface UserStats {
  modulesCompleted: number;
  challengesWon: number;
  dailyStreak: number;
  badgesEarned: number;
  lessonsCompleted: number;
}

/**
 * Static badge definitions - stored in code, not localStorage
 */
export const BADGE_DEFINITIONS: Record<string, BadgeDefinition> = {
  'brave-beginner': {
    id: 'brave-beginner',
    name: 'Brave Beginner',
    description: 'Started your coding journey!',
    icon: '🎯',
    color: 'from-blue-400 to-cyan-500',
    category: 'beginner',
  },
  'first-lesson': {
    id: 'first-lesson',
    name: 'First Steps',
    description: 'Completed your first lesson',
    icon: '📚',
    color: 'from-green-400 to-emerald-500',
    category: 'achievement',
  },
  'loop-master': {
    id: 'loop-master',
    name: 'Loop Master',
    description: 'Completed 10 loop challenges',
    icon: '🔄',
    color: 'from-yellow-400 to-orange-500',
    category: 'achievement',
  },
  'week-warrior': {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Maintained a 7-day streak',
    icon: '🔥',
    color: 'from-red-400 to-pink-500',
    category: 'streak',
  },
  'challenge-champion': {
    id: 'challenge-champion',
    name: 'Challenge Champion',
    description: 'Won 5 coding challenges',
    icon: '🏆',
    color: 'from-purple-400 to-indigo-500',
    category: 'challenge',
  },
  'module-master': {
    id: 'module-master',
    name: 'Module Master',
    description: 'Completed your first module',
    icon: '⭐',
    color: 'from-yellow-300 to-amber-400',
    category: 'achievement',
  },
  'speed-coder': {
    id: 'speed-coder',
    name: 'Speed Coder',
    description: 'Completed a challenge in record time',
    icon: '⚡',
    color: 'from-cyan-400 to-blue-500',
    category: 'special',
  },
  'python-pro': {
    id: 'python-pro',
    name: 'Python Pro',
    description: 'Completed all Python Adventures modules',
    icon: '🐍',
    color: 'from-green-500 to-teal-500',
    category: 'achievement',
  },
  'quiz-whiz': {
    id: 'quiz-whiz',
    name: 'Quiz Whiz',
    description: 'Scored 100% on 3 quizzes',
    icon: '🧠',
    color: 'from-pink-400 to-rose-500',
    category: 'achievement',
  },
  'code-explorer': {
    id: 'code-explorer',
    name: 'Code Explorer',
    description: 'Tried Free Code mode',
    icon: '🔍',
    color: 'from-indigo-400 to-purple-500',
    category: 'special',
  },
};

/**
 * Gets earned badge data from localStorage (only IDs and dates)
 */
function getEarnedBadgeData(): EarnedBadgeData[] {
  const storedData = localStorage.getItem('earnedBadges');
  if (storedData) {
    return JSON.parse(storedData);
  }
  return [];
}

/**
 * Saves earned badge data to localStorage (only IDs and dates)
 */
function saveEarnedBadgeData(data: EarnedBadgeData[]): void {
  localStorage.setItem('earnedBadges', JSON.stringify(data));
}

/**
 * Gets all earned badges with full details (merges localStorage data with static definitions)
 */
export function getEarnedBadges(): Badge[] {
  const earnedData = getEarnedBadgeData();
  
  return earnedData.map(data => {
    const definition = BADGE_DEFINITIONS[data.id];
    if (!definition) {
      console.warn(`Badge definition not found for ID: ${data.id}`);
      return null;
    }
    return {
      ...definition,
      earnedDate: data.earnedDate,
    };
  }).filter((badge): badge is Badge => badge !== null);
}

/**
 * Gets the most recently earned badge
 */
export function getLatestBadge(): Badge | null {
  const badges = getEarnedBadges();
  if (badges.length === 0) return null;
  
  // Sort by earned date (most recent first)
  badges.sort((a, b) => new Date(b.earnedDate).getTime() - new Date(a.earnedDate).getTime());
  return badges[0];
}

/**
 * Checks if user has earned a specific badge
 */
export function hasBadge(badgeId: string): boolean {
  const earnedData = getEarnedBadgeData();
  return earnedData.some(data => data.id === badgeId);
}

/**
 * Awards a badge to the user (if they don't already have it)
 * Returns true if badge was awarded, false if they already had it
 */
export function awardBadge(badgeId: string): boolean {
  // Check if badge definition exists
  if (!BADGE_DEFINITIONS[badgeId]) {
    console.error(`Cannot award badge: Badge definition not found for ID: ${badgeId}`);
    return false;
  }
  
  // Check if user already has this badge
  if (hasBadge(badgeId)) {
    return false;
  }
  
  // Get existing earned badge data
  const earnedData = getEarnedBadgeData();
  
  // Add new badge data (only ID and date)
  const newBadgeData: EarnedBadgeData = {
    id: badgeId,
    earnedDate: new Date().toISOString(),
  };
  
  earnedData.push(newBadgeData);
  
  // Save to localStorage
  saveEarnedBadgeData(earnedData);
  
  // Update badge count in userStats
  updateBadgeCount(earnedData.length);
  
  return true;
}

/**
 * Updates the badgesEarned count in userStats
 */
function updateBadgeCount(count: number): void {
  const storedStats = localStorage.getItem('userStats');
  
  if (storedStats) {
    const userStats: UserStats = JSON.parse(storedStats);
    userStats.badgesEarned = count;
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }
}

/**
 * Awards multiple badges at once
 */
export function awardBadges(badgeIds: string[]): Badge[] {
  const awardedBadges: Badge[] = [];
  
  badgeIds.forEach(id => {
    const wasAwarded = awardBadge(id);
    if (wasAwarded) {
      const definition = BADGE_DEFINITIONS[id];
      if (definition) {
        awardedBadges.push({
          ...definition,
          earnedDate: new Date().toISOString(),
        });
      }
    }
  });
  
  return awardedBadges;
}

/**
 * Resets all badges (useful for testing)
 */
export function resetBadges(): void {
  localStorage.removeItem('earnedBadges');
  updateBadgeCount(0);
}

/**
 * Gets all available badge definitions
 */
export function getAllBadgeDefinitions(): BadgeDefinition[] {
  return Object.values(BADGE_DEFINITIONS);
}

/**
 * Gets badge progress for specific achievements
 */
export function getBadgeProgress(badgeId: string): {
  current: number;
  required: number;
  percentage: number;
} {
  // This would be expanded based on actual progress tracking
  // For now, return a simple structure
  return {
    current: 0,
    required: 10,
    percentage: 0,
  };
}
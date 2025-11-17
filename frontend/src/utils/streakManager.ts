// Daily Streak Manager
// Tracks consecutive days of user visits

export interface UserStats {
  modulesCompleted: number;
  challengesWon: number;
  dailyStreak: number;
  badgesEarned: number;
  lessonsCompleted: number;
}

export interface StreakData {
  lastVisit: string; // ISO date string (YYYY-MM-DD)
  currentStreak: number;
}

/**
 * Gets the current date in YYYY-MM-DD format
 */
function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Calculates the difference in days between two dates
 */
function getDayDifference(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Updates the daily streak based on the last visit
 * Returns the updated streak count
 */
export function updateDailyStreak(): number {
  const today = getTodayDate();
  
  // Get stored streak data
  const storedStreakData = localStorage.getItem('streakData');
  let streakData: StreakData;
  
  if (storedStreakData) {
    streakData = JSON.parse(storedStreakData);
  } else {
    // First time visitor
    streakData = {
      lastVisit: today,
      currentStreak: 1
    };
    saveStreakData(streakData);
    updateUserStatsStreak(1);
    return 1;
  }
  
  // Check if this is the same day
  if (streakData.lastVisit === today) {
    // Same day, no change to streak
    return streakData.currentStreak;
  }
  
  // Calculate days since last visit
  const daysSinceLastVisit = getDayDifference(streakData.lastVisit, today);
  
  let newStreak: number;
  
  if (daysSinceLastVisit === 1) {
    // Consecutive day! Increment streak
    newStreak = streakData.currentStreak + 1;
  } else if (daysSinceLastVisit > 1) {
    // Missed days, reset streak to 1
    newStreak = 1;
  } else {
    // Should not happen, but keep current streak
    newStreak = streakData.currentStreak;
  }
  
  // Update streak data
  streakData.lastVisit = today;
  streakData.currentStreak = newStreak;
  
  // Save to localStorage
  saveStreakData(streakData);
  updateUserStatsStreak(newStreak);
  
  return newStreak;
}

/**
 * Saves streak data to localStorage
 */
function saveStreakData(streakData: StreakData): void {
  localStorage.setItem('streakData', JSON.stringify(streakData));
}

/**
 * Updates the dailyStreak in userStats
 */
function updateUserStatsStreak(streak: number): void {
  const storedStats = localStorage.getItem('userStats');
  
  if (storedStats) {
    const userStats: UserStats = JSON.parse(storedStats);
    userStats.dailyStreak = streak;
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }
}

/**
 * Gets the current streak without updating it
 */
export function getCurrentStreak(): number {
  const storedStreakData = localStorage.getItem('streakData');
  
  if (storedStreakData) {
    const streakData: StreakData = JSON.parse(storedStreakData);
    return streakData.currentStreak;
  }
  
  return 0;
}

/**
 * Resets the streak (useful for testing or manual reset)
 */
export function resetStreak(): void {
  localStorage.removeItem('streakData');
  updateUserStatsStreak(0);
}

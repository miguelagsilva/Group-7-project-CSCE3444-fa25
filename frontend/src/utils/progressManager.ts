// Progress Manager
// Manages user progress data stored in localStorage
// Separates user-specific data from static course content

export interface UserProgress {
  completedLessons: string[]; // Array of lesson IDs
  completedModules: string[]; // Array of module IDs
  completedCourses: string[]; // Array of course IDs
  currentLesson?: {
    moduleId: string;
    lessonId: string;
    lessonIndex: number;
  };
  completedChallenges: string[]; // Array of challenge IDs
  completedQuizzes: string[]; // Array of quiz IDs
  quizScores: Record<string, number>; // quizId -> score (0-100)
}

const PROGRESS_KEY = 'userProgress';

/**
 * Gets the default/empty progress state for new users
 */
function getDefaultProgress(): UserProgress {
  return {
    completedLessons: [],
    completedModules: [],
    completedCourses: [],
    completedChallenges: [],
    completedQuizzes: [],
    quizScores: {},
  };
}

/**
 * Gets user progress from localStorage
 */
export function getUserProgress(): UserProgress {
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing user progress:', error);
      return getDefaultProgress();
    }
  }
  return getDefaultProgress();
}

/**
 * Saves user progress to localStorage
 */
function saveUserProgress(progress: UserProgress): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

/**
 * Checks if a lesson is completed
 */
export function isLessonCompleted(lessonId: string): boolean {
  const progress = getUserProgress();
  return progress.completedLessons.includes(lessonId);
}

/**
 * Checks if a module is completed
 * A module is only completed when ALL lessons, the quiz, AND the challenge are completed
 */
export async function isModuleCompleted(moduleId: string): Promise<boolean> {
  const progress = getUserProgress();
  
  // First check if it's marked as completed in storage
  if (progress.completedModules.includes(moduleId)) {
    console.log(`✅ Module ${moduleId} is already marked as complete`);
    return true;
  }
  
  // Otherwise, check if all requirements are met
  try {
    // Import necessary functions
    const { getLessonsByModuleId, getChallengeByModuleId, getQuizByModuleId } = await import('../api/data');
    
    // Get all lessons for this module
    const lessons = await getLessonsByModuleId(moduleId);
    
    // Check if all lessons are completed
    const allLessonsCompleted = lessons.every(lesson => progress.completedLessons.includes(lesson.id));
    console.log(`📚 Module ${moduleId}: All lessons completed? ${allLessonsCompleted} (${lessons.filter(l => progress.completedLessons.includes(l.id)).length}/${lessons.length})`);
    if (!allLessonsCompleted) {
      return false;
    }
    
    // Check if the challenge is completed
    const challenge = await getChallengeByModuleId(moduleId);
    const challengeCompleted = challenge ? progress.completedChallenges.includes(challenge.id) : true;
    console.log(`🏆 Module ${moduleId}: Challenge completed? ${challengeCompleted} (Challenge ID: ${challenge?.id || 'none'})`);
    if (challenge && !progress.completedChallenges.includes(challenge.id)) {
      return false;
    }
    
    // Check if the quiz is completed
    const quiz = await getQuizByModuleId(moduleId);
    const quizCompleted = quiz ? progress.completedQuizzes.includes(quiz.id) : true;
    console.log(`📝 Module ${moduleId}: Quiz completed? ${quizCompleted} (Quiz ID: ${quiz?.id || 'none'})`);
    if (quiz && !progress.completedQuizzes.includes(quiz.id)) {
      return false;
    }
    
    // All requirements met! Auto-mark as completed
    console.log(`🎉 All requirements met for module ${moduleId}! Marking as complete...`);
    if (!progress.completedModules.includes(moduleId)) {
      progress.completedModules.push(moduleId);
      saveUserProgress(progress);
      updateModulesCompletedCount(progress.completedModules.length);
      console.log(`✅ Module ${moduleId} marked as complete!`);
    }
    
    return true;
  } catch (error) {
    console.error('Error checking module completion:', error);
    return false;
  }
}

/**
 * Synchronous version of isModuleCompleted - only checks storage
 * Use this when you need immediate response and can't await
 */
export function isModuleCompletedSync(moduleId: string): boolean {
  const progress = getUserProgress();
  return progress.completedModules.includes(moduleId);
}

/**
 * Checks if a course is completed
 */
export function isCourseCompleted(courseId: string): boolean {
  const progress = getUserProgress();
  return progress.completedCourses.includes(courseId);
}

/**
 * Marks a lesson as completed
 */
export async function markLessonCompleted(lessonId: string, moduleId?: string): Promise<void> {
  const progress = getUserProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    saveUserProgress(progress);
    
    // Update lessonsCompleted count in userStats
    updateLessonsCompletedCount(progress.completedLessons.length);
    
    // If moduleId is provided, auto-check if module should be marked as complete
    if (moduleId) {
      await isModuleCompleted(moduleId);
    }
  }
}

/**
 * Marks a module as completed
 */
export function markModuleCompleted(moduleId: string): void {
  const progress = getUserProgress();
  if (!progress.completedModules.includes(moduleId)) {
    progress.completedModules.push(moduleId);
    saveUserProgress(progress);
    
    // Update modulesCompleted count in userStats
    updateModulesCompletedCount(progress.completedModules.length);
  }
}

/**
 * Marks a course as completed
 */
export function markCourseCompleted(courseId: string): void {
  const progress = getUserProgress();
  if (!progress.completedCourses.includes(courseId)) {
    progress.completedCourses.push(courseId);
    saveUserProgress(progress);
  }
}

/**
 * Marks a challenge as completed
 */
export function markChallengeCompleted(challengeId: string): void {
  const progress = getUserProgress();
  if (!progress.completedChallenges.includes(challengeId)) {
    progress.completedChallenges.push(challengeId);
    saveUserProgress(progress);
    
    // Update challengesWon count in userStats
    updateChallengesWonCount(progress.completedChallenges.length);
    
    // Auto-check if module should be marked as complete
    checkAndMarkModuleComplete(challengeId).catch(err => 
      console.error('Error auto-checking module completion:', err)
    );
  }
}

/**
 * Checks if a challenge is completed
 */
export function isChallengeCompleted(challengeId: string): boolean {
  const progress = getUserProgress();
  return progress.completedChallenges.includes(challengeId);
}

/**
 * Marks a quiz as completed with a score
 */
export function markQuizCompleted(quizId: string, score: number): void {
  const progress = getUserProgress();
  
  // Add to completed quizzes if not already there
  if (!progress.completedQuizzes.includes(quizId)) {
    progress.completedQuizzes.push(quizId);
  }
  
  // Update score (will overwrite if retaken)
  progress.quizScores[quizId] = score;
  
  saveUserProgress(progress);
  
  // Auto-check if module should be marked as complete
  checkAndMarkModuleComplete(quizId).catch(err => 
    console.error('Error auto-checking module completion:', err)
  );
}

/**
 * Checks if a quiz is completed (by quizId)
 */
export function isQuizCompleted(quizId: string): boolean {
  const progress = getUserProgress();
  return progress.completedQuizzes.includes(quizId);
}

/**
 * Checks if a quiz is completed for a module (by moduleId)
 */
export async function isQuizCompletedByModule(moduleId: string): Promise<boolean> {
  try {
    const { getQuizByModuleId } = await import('../api/data');
    const quiz = await getQuizByModuleId(moduleId);
    if (!quiz) return false;
    
    const progress = getUserProgress();
    return progress.completedQuizzes.includes(quiz.id);
  } catch (error) {
    console.error('Error checking quiz completion:', error);
    return false;
  }
}

/**
 * Gets quiz score by quizId
 */
export function getQuizScore(quizId: string): number | null {
  const progress = getUserProgress();
  return progress.quizScores[quizId] ?? null;
}

/**
 * Gets quiz score by moduleId
 */
export async function getQuizScoreByModule(moduleId: string): Promise<number | null> {
  try {
    const { getQuizByModuleId } = await import('../api/data');
    const quiz = await getQuizByModuleId(moduleId);
    if (!quiz) return null;
    
    const progress = getUserProgress();
    return progress.quizScores[quiz.id] ?? null;
  } catch (error) {
    console.error('Error getting quiz score:', error);
    return null;
  }
}

/**
 * Sets the current lesson the user is on
 */
export function setCurrentLesson(moduleId: string, lessonId: string, lessonIndex: number): void {
  const progress = getUserProgress();
  progress.currentLesson = { moduleId, lessonId, lessonIndex };
  saveUserProgress(progress);
}

/**
 * Gets the current lesson the user is on
 */
export function getCurrentLesson(): { moduleId: string; lessonId: string; lessonIndex: number } | null {
  const progress = getUserProgress();
  return progress.currentLesson || null;
}

/**
 * Gets module progress percentage (0-100)
 * This function now needs to be async to fetch lessons by moduleId
 */
export async function getModuleProgressAsync(moduleId: string): Promise<{ completed: number; total: number; percentage: number }> {
  // Import the getLessonsByModuleId function
  const { getLessonsByModuleId } = await import('../api/data');
  
  const progress = getUserProgress();
  const lessons = await getLessonsByModuleId(moduleId);
  
  const completedInModule = lessons.filter(lesson => 
    progress.completedLessons.includes(lesson.id)
  ).length;
  
  const percentage = lessons.length > 0 ? Math.round((completedInModule / lessons.length) * 100) : 0;
  
  return {
    completed: completedInModule,
    total: lessons.length,
    percentage
  };
}

/**
 * Gets module progress percentage (0-100) - Synchronous version
 * For backward compatibility, but less reliable due to inconsistent lesson ID formats
 */
export function getModuleProgress(moduleId: string, totalLessons: number): number {
  const progress = getUserProgress();
  
  // We need to check completed lessons that belong to this module
  // Extract module number from moduleId (e.g., 'module-1' -> '1')
  const moduleNumber = moduleId.split('-')[1];
  
  // Count lessons that match this module
  // Try both formats: 'lesson-m1-1' (module 1 format) and 'lesson-1' (other modules)
  const completedInModule = progress.completedLessons.filter(lessonId => {
    // Format 1: lesson-m1-1, lesson-m2-1, etc.
    if (lessonId.includes(`-m${moduleNumber}-`)) {
      return true;
    }
    // Format 2: For modules other than 1, lessons might be lesson-1, lesson-2, etc.
    // We need a better way to determine this - check if it's a simple format
    // This is a fallback and won't work perfectly without the moduleId reference
    return false;
  }).length;
  
  return totalLessons > 0 ? Math.round((completedInModule / totalLessons) * 100) : 0;
}

/**
 * Gets course progress percentage (0-100)
 */
export function getCourseProgress(courseId: string, totalLessons: number): number {
  const progress = getUserProgress();
  // Count completed lessons that belong to this course
  const completedInCourse = progress.completedLessons.filter(id => id.includes(courseId)).length;
  return totalLessons > 0 ? Math.round((completedInCourse / totalLessons) * 100) : 0;
}

/**
 * Checks if a module is locked based on prerequisites
 */
export function isModuleLocked(moduleId: string): boolean {
  // Module 1 is never locked
  if (moduleId === 'module-1') return false;
  
  // Extract module number
  const moduleNumber = parseInt(moduleId.split('-')[1]);
  
  // Check if previous module is completed
  const previousModuleId = `module-${moduleNumber - 1}`;
  return !isModuleCompletedSync(previousModuleId);
}

/**
 * Checks if a module has been started (has at least one lesson completed)
 * This is now async to properly fetch lessons by moduleId
 */
export async function isModuleStarted(moduleId: string): Promise<boolean> {
  // Import the getLessonsByModuleId function
  const { getLessonsByModuleId } = await import('../api/data');
  
  const progress = getUserProgress();
  const lessons = await getLessonsByModuleId(moduleId);
  
  // Check if any of this module's lessons are completed
  return lessons.some(lesson => progress.completedLessons.includes(lesson.id));
}

/**
 * Gets the next modules that are up next for the user
 * Returns modules that are:
 * - Not started (no lessons completed)
 * - Not completed
 * - In sequential order
 * This is now async to properly check if modules are started
 */
export async function getUpNextModules(allModules: any[], limit: number = 3): Promise<any[]> {
  const result = [];
  
  for (const module of allModules) {
    // Stop if we have enough modules
    if (result.length >= limit) break;
    
    // Skip completed modules
    if (isModuleCompletedSync(module.id)) continue;
    
    // Skip started modules
    const started = await isModuleStarted(module.id);
    if (started) continue;
    
    result.push(module);
  }
  
  return result;
}

/**
 * Updates the lessonsCompleted count in userStats
 */
function updateLessonsCompletedCount(count: number): void {
  const storedStats = localStorage.getItem('userStats');
  
  if (storedStats) {
    const userStats = JSON.parse(storedStats);
    userStats.lessonsCompleted = count;
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }
}

/**
 * Updates the modulesCompleted count in userStats
 */
function updateModulesCompletedCount(count: number): void {
  const storedStats = localStorage.getItem('userStats');
  
  if (storedStats) {
    const userStats = JSON.parse(storedStats);
    userStats.modulesCompleted = count;
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }
}

/**
 * Updates the challengesWon count in userStats
 */
function updateChallengesWonCount(count: number): void {
  const storedStats = localStorage.getItem('userStats');
  
  if (storedStats) {
    const userStats = JSON.parse(storedStats);
    userStats.challengesWon = count;
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }
}

/**
 * Resets all progress (useful for testing or starting over)
 */
export function resetProgress(): void {
  const defaultProgress = getDefaultProgress();
  saveUserProgress(defaultProgress);
  
  // Reset stats
  updateLessonsCompletedCount(0);
  updateModulesCompletedCount(0);
  updateChallengesWonCount(0);
}

/**
 * Gets total completed lessons count
 */
export function getTotalCompletedLessons(): number {
  const progress = getUserProgress();
  return progress.completedLessons.length;
}

/**
 * Gets total completed modules count
 */
export function getTotalCompletedModules(): number {
  const progress = getUserProgress();
  return progress.completedModules.length;
}

/**
 * Auto-checks if a module should be marked as complete based on a completed challenge or quiz
 */
async function checkAndMarkModuleComplete(itemId: string): Promise<void> {
  try {
    // Import necessary functions
    const { getChallengeById, getQuizByModuleId, modulesData } = await import('../api/data');
    
    // Try to find the challenge first
    const challenge = await getChallengeById(itemId);
    if (challenge) {
      // Check if the module is now complete
      await isModuleCompleted(challenge.moduleId);
      return;
    }
    
    // If not a challenge, it might be a quiz - find which module it belongs to
    for (const module of modulesData) {
      const quiz = await getQuizByModuleId(module.id);
      if (quiz && quiz.id === itemId) {
        // Check if the module is now complete
        await isModuleCompleted(module.id);
        return;
      }
    }
  } catch (error) {
    console.error('Error in checkAndMarkModuleComplete:', error);
  }
}
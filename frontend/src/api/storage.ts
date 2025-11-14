// TypeScript service for retrieving user progress (modules, quizzes, challenges)
// Uses your platform interfaces to strongly type stored progress.

const STORAGE_KEY = 'userProgressData';

// === LocalStorage Data Shape ===
export interface StoredModuleProgress {
  id: string;
  moduleId: string;
  title: string;
  progress: number; // 0–100
  completed: boolean;
  completedAt?: string;
}

export interface StoredQuizProgress {
  id: string;
  moduleId: string;
  title: string;
  score: number;
  passed: boolean;
  completedAt?: string;
}

export interface StoredChallengeProgress {
  id: string;
  moduleId: string;
  title: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completedAt?: string;
}

export interface StoredData {
  modules: StoredModuleProgress[];
  quizzes: StoredQuizProgress[];
  challenges: StoredChallengeProgress[];
}

// Default empty structure
const DEFAULT_DATA: StoredData = {
  modules: [],
  quizzes: [],
  challenges: [],
};

// === Load ===
export function loadData(): StoredData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as StoredData;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
    return DEFAULT_DATA;
  } catch (e) {
    console.error('LocalStorage load error:', e);
    return DEFAULT_DATA;
  }
}

// === Save ===
export function saveData(data: StoredData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage save error:', e);
  }
}

// === Getters ===
export function getCompletedModules(): StoredModuleProgress[] {
  return loadData().modules.filter(m => m.completed);
}

export function getCompletedQuizzes(): StoredQuizProgress[] {
  return loadData().quizzes.filter(q => Boolean(q.completedAt));
}

export function getCompletedChallenges(): StoredChallengeProgress[] {
  return loadData().challenges.filter(c => Boolean(c.completedAt));
}

// === Summary (optional helper) ===
export function getUserProgressSummary() {
  const data = loadData();

  const modulesCompleted = data.modules.filter(m => m.completed).length;
  const quizzesPassed = data.quizzes.filter(q => q.passed).length;
  const challengesCompleted = data.challenges.filter(c => c.completedAt).length;
  const lessonsCompleted = data.modules.reduce((sum, m) => sum + m.progress, 0);

  return {
    modulesCompleted,
    quizzesPassed,
    challengesCompleted,
    lessonsCompleted,
  };
}

// === Updaters ===
export function updateModules(modules: StoredModuleProgress[]): void {
  const data = loadData();
  data.modules = modules;
  saveData(data);
}

export function updateQuizzes(quizzes: StoredQuizProgress[]): void {
  const data = loadData();
  data.quizzes = quizzes;
  saveData(data);
}

export function updateChallenges(challenges: StoredChallengeProgress[]): void {
  const data = loadData();
  data.challenges = challenges;
  saveData(data);
}

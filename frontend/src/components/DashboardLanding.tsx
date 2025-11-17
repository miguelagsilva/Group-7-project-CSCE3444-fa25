import { useState, useEffect } from 'react';
import { Code, Trophy, Zap, Target, BookOpen, Star, TrendingUp, Award, Flame, Clock, Play, ChevronRight, Home, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { updateDailyStreak } from '../utils/streakManager';
import { awardBadge, getLatestBadge, getEarnedBadges, getAllBadgeDefinitions, Badge as BadgeType, BadgeDefinition, hasBadge } from '../utils/badgeManager';
import { getTotalCompletedLessons, getUpNextModules, isModuleLocked, isModuleCompleted } from '../utils/progressManager';
import { getModulesByCourseId, Module } from '../api/data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface DashboardLandingProps {
  onStartLearning: () => void;
  onFreeCodeClick: () => void;
  onNavigateToHome?: () => void;
}

// Avatar options for kids
const avatarOptions = [
  { id: 1, emoji: '🦁', name: 'Lion' },
  { id: 2, emoji: '🐼', name: 'Panda' },
  { id: 3, emoji: '🦊', name: 'Fox' },
  { id: 4, emoji: '🐯', name: 'Tiger' },
  { id: 5, emoji: '🐨', name: 'Koala' },
  { id: 6, emoji: '🦉', name: 'Owl' },
  { id: 7, emoji: '🦄', name: 'Unicorn' },
  { id: 8, emoji: '🐸', name: 'Frog' },
  { id: 9, emoji: '🦖', name: 'Dino' },
  { id: 10, emoji: '🚀', name: 'Rocket' },
  { id: 11, emoji: '⚡', name: 'Lightning' },
  { id: 12, emoji: '🌟', name: 'Star' },
];

export function DashboardLanding({ onStartLearning, onFreeCodeClick, onNavigateToHome }: DashboardLandingProps) {
  const [completedLessons, setCompletedLessons] = useState(0);
  const [userName, setUserName] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<string>('');
  const [showGettingStarted, setShowGettingStarted] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempAvatar, setTempAvatar] = useState('');
  const [latestBadge, setLatestBadge] = useState<BadgeType | null>(null);
  const [upNextModules, setUpNextModules] = useState<Module[]>([]);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  
  // User stats from localStorage
  const [userStats, setUserStats] = useState({
    modulesCompleted: 0,
    challengesWon: 0,
    dailyStreak: 0,
    badgesEarned: 0,
    lessonsCompleted: 0,
  });

  useEffect(() => {
    // Load completed lessons count from progress manager
    const completedCount = getTotalCompletedLessons();
    setCompletedLessons(completedCount);

    // Load modules and get up next modules + current module
    getModulesByCourseId('python-adventures').then(async modules => {
      const nextModules = await getUpNextModules(modules, 3);
      setUpNextModules(nextModules);
      
      // Determine current module: first module that is not completed
      for (const module of modules) {
        const completed = await isModuleCompleted(module.id);
        if (!completed) {
          setCurrentModule(module);
          break;
        }
      }
    });

    // Load user profile from localStorage
    const storedName = localStorage.getItem('userName');
    const storedAvatar = localStorage.getItem('userAvatar');
    const storedStats = localStorage.getItem('userStats');
    
    if (storedName) {
      setUserName(storedName);
    }
    if (storedAvatar) {
      setUserAvatar(storedAvatar);
    }
    
    // Show getting started dialog if no profile exists
    if (!storedName || !storedAvatar) {
      setShowGettingStarted(true);
    } else {
      // User exists - update daily streak
      const updatedStreak = updateDailyStreak();
      
      // Load and update user stats with the new streak
      if (storedStats) {
        const stats = JSON.parse(storedStats);
        stats.dailyStreak = updatedStreak;
        setUserStats(stats);
      }
      
      // Load latest badge
      const badge = getLatestBadge();
      setLatestBadge(badge);
    }
  }, []);

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim() && tempAvatar) {
      // Store in localStorage
      localStorage.setItem('userName', tempName.trim());
      localStorage.setItem('userAvatar', tempAvatar);
      
      // Initialize streak data for new user
      const today = new Date().toISOString().split('T')[0];
      const streakData = {
        lastVisit: today,
        currentStreak: 1
      };
      localStorage.setItem('streakData', JSON.stringify(streakData));
      
      // Award the Brave Beginner badge! 🎉
      awardBadge('brave-beginner');
      
      // Initialize user profile with streak at 1 and badge count at 1
      const initialStats = {
        modulesCompleted: 0,
        challengesWon: 0,
        dailyStreak: 1,
        badgesEarned: 1, // Brave Beginner badge!
        lessonsCompleted: 0,
      };
      localStorage.setItem('userStats', JSON.stringify(initialStats));
      
      // Load the newly awarded badge
      const newBadge = getLatestBadge();
      setLatestBadge(newBadge);
      
      setUserName(tempName.trim());
      setUserAvatar(tempAvatar);
      setUserStats(initialStats);
      setShowGettingStarted(false);
      setTempName('');
      setTempAvatar('');
    }
  };

  const handleContinueLearning = () => {
    // Check if user has profile
    if (!userName || !userAvatar) {
      setShowGettingStarted(true);
    } else {
      onStartLearning();
    }
  };

  // Calculate course progress based on modules completed
  const totalModules = 8; // Total number of modules in Python Adventures course
  const courseProgress = Math.round((userStats.modulesCompleted / totalModules) * 100);

  // Mock data for the dashboard - removed Current Streak and Challenges Won
  const stats = [
    { label: 'Modules Completed', value: userStats.modulesCompleted.toString(), icon: BookOpen, color: 'bg-blue-500', change: '+1 this week' },
    { label: 'Challenges Won', value: userStats.challengesWon.toString(), icon: Trophy, color: 'bg-purple-500', change: '+2 this week' },
    { label: 'Daily Streak 🔥', value: userStats.dailyStreak.toString(), icon: Flame, color: 'bg-orange-500', change: 'Keep it up!' },
    { label: 'Badges Earned 🏅', value: userStats.badgesEarned.toString(), icon: Award, color: 'bg-yellow-500', change: '2 more to unlock!' },
  ];

  // Helper to get difficulty badge for module
  const getModuleDifficulty = (moduleIndex: number): 'Easy' | 'Medium' | 'Hard' => {
    if (moduleIndex <= 2) return 'Easy';
    if (moduleIndex <= 5) return 'Medium';
    return 'Hard';
  };

  const upcomingLessons = [
    { title: 'Functions & Parameters', module: 'Python Basics', difficulty: 'Easy', duration: '15 min', locked: false },
    { title: 'Lists & Arrays', module: 'Python Basics', difficulty: 'Medium', duration: '20 min', locked: false },
    { title: 'Dictionaries', module: 'Python Basics', difficulty: 'Medium', duration: '18 min', locked: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 relative overflow-hidden">
      {/* Wavy background layers matching the rest of the app */}
      <div className="absolute inset-x-0 bottom-0">
        {/* First wave layer */}
        <svg className="absolute bottom-0 left-0 w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none">
          <path 
            d="M0,128L48,149.3C96,171,192,213,288,213.3C384,213,480,171,576,165.3C672,160,768,192,864,186.7C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
            fill="rgba(59, 130, 246, 0.3)"
          />
        </svg>
        
        {/* Second wave layer */}
        <svg className="absolute bottom-0 left-0 w-full h-48" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none">
          <path 
            d="M0,224L48,208C96,192,192,160,288,170.7C384,181,480,235,576,245.3C672,256,768,224,864,197.3C960,171,1056,149,1152,165.3C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
            fill="rgba(37, 99, 235, 0.4)"
          />
        </svg>
        
        {/* Third wave layer */}
        <svg className="absolute bottom-0 left-0 w-full h-32" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none">
          <path 
            d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,122.7C672,128,768,192,864,213.3C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
            fill="rgba(29, 78, 216, 0.6)"
          />
        </svg>
      </div>

      {/* Playful floating shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-50 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
      <div className="absolute top-40 right-40 w-16 h-16 bg-white rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
      <div className="absolute bottom-32 left-20 w-24 h-24 bg-blue-300 rounded-full opacity-40 animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
      <div className="absolute top-32 left-1/4 w-12 h-12 bg-white rounded-full opacity-50 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            {userAvatar && (
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">{userAvatar}</span>
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome{userName ? `, ${userName}` : ', Code Explorer'}! 👋
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Ready to continue your coding adventure?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-2xl`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black text-gray-800">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-xs text-green-600 font-medium">{stat.change}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content - Current Course Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning Card */}
            <Card 
              className="p-8 rounded-3xl shadow-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white cursor-pointer hover:shadow-2xl transition-all duration-200 hover:scale-[1.02]"
              onClick={handleContinueLearning}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <Badge className="bg-white/20 text-white border-0 mb-3">
                    Python Adventures
                  </Badge>
                  <h2 className="text-3xl font-black mb-2">
                    {userStats.lessonsCompleted === 0 ? 'Start Learning' : 'Continue Learning'}
                  </h2>
                  <p className="text-blue-100 text-lg mb-4">
                    {userStats.lessonsCompleted === 0 
                      ? 'Begin your coding adventure with Module 1!'
                      : currentModule 
                        ? `You're on ${currentModule.title}`
                        : 'Continue your coding journey!'
                    }
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>Course Progress</span>
                      <span>{courseProgress}%</span>
                    </div>
                    <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full" style={{ width: `${courseProgress}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <BookOpen className="w-8 h-8" />
                </div>
              </div>
              
              <Button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent double-click
                  handleContinueLearning();
                }}
                className="w-full bg-white text-blue-600 hover:bg-blue-50 py-6 rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Play className="w-5 h-5 mr-2" />
                {userStats.lessonsCompleted === 0 ? 'Start Learning' : 'Continue Learning'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>

            {/* Upcoming Lessons */}
            <Card className="p-6 rounded-3xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-800">Up Next</h3>
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              
              <div className="space-y-4">
                {upNextModules.length > 0 ? (
                  upNextModules.map((module, index) => {
                    const moduleIndex = parseInt(module.id.split('-')[1]);
                    const difficulty = getModuleDifficulty(moduleIndex);
                    // Estimate duration based on number of lessons
                    const duration = `${module.lessonsCount * 10} min`;
                    
                    return (
                      <div 
                        key={module.id}
                        className="p-4 rounded-2xl border-2 transition-all duration-200 bg-white border-blue-100 hover:border-blue-300 hover:shadow-md cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-gray-800">{module.title}</h4>
                            </div>
                            <p className="text-sm text-gray-600">{module.description}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {difficulty}
                              </Badge>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {duration}
                              </span>
                              <span className="text-xs text-gray-500">
                                {module.lessonsCount} {module.lessonsCount === 1 ? 'lesson' : 'lessons'}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-blue-500" />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-2">🎉 Amazing work!</p>
                    <p className="text-sm text-gray-500">You've completed all available modules!</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6 rounded-3xl shadow-lg">
              <h3 className="text-xl font-black text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  onClick={onFreeCodeClick}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-5 rounded-2xl flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    <span className="font-bold">Free Code</span>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>

            {/* Latest Badge */}
            <Card className="p-6 rounded-3xl shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-black text-gray-800">Latest Badge</h3>
              </div>
              
              {latestBadge ? (
                <div className="text-center">
                  <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${latestBadge.color} rounded-full flex items-center justify-center mb-3 shadow-lg`}>
                    <span className="text-4xl">{latestBadge.icon}</span>
                  </div>
                  <p className="font-bold text-gray-800 mb-1">{latestBadge.name}</p>
                  <p className="text-sm text-gray-600">{latestBadge.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Earned {new Date(latestBadge.earnedDate).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-3">
                    <span className="text-4xl">🏆</span>
                  </div>
                  <p className="text-sm text-gray-600">No badges yet!</p>
                  <p className="text-xs text-gray-500 mt-1">Complete lessons to earn your first badge</p>
                </div>
              )}
            </Card>

            {/* Badge Collection */}
            <Card className="p-6 rounded-3xl shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-black text-gray-800">My Badge Collection</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {getAllBadgeDefinitions().slice(0, 6).map(badge => {
                  const isEarned = hasBadge(badge.id);
                  return (
                    <div 
                      key={badge.id}
                      className="text-center"
                    >
                      <div className={`w-12 h-12 mx-auto bg-gradient-to-br ${isEarned ? badge.color : 'from-gray-300 to-gray-400'} rounded-full flex items-center justify-center mb-2 shadow-md relative`}>
                        <span className={`text-xl ${!isEarned && 'grayscale'}`}>{badge.icon}</span>
                        {!isEarned && <Lock className="w-3 h-3 absolute bottom-0 right-0 text-gray-600 bg-white rounded-full p-0.5" />}
                      </div>
                      <p className={`text-xs font-bold ${isEarned ? 'text-gray-800' : 'text-gray-600'} line-clamp-2`}>{badge.name}</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Getting Started Dialog */}
      <Dialog open={showGettingStarted} onOpenChange={setShowGettingStarted}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🎉 Let's Get Started!
            </DialogTitle>
            <DialogDescription className="text-lg text-gray-600">
              Create your profile to begin your amazing coding journey!
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleGetStarted} className="space-y-6 mt-4">
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-bold text-gray-700">
                What's your name?
              </Label>
              <Input
                id="name"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter your name"
                className="text-lg py-6 rounded-2xl border-2 focus:border-blue-500"
                required
              />
            </div>

            {/* Avatar Selection */}
            <div className="space-y-3">
              <Label className="text-lg font-bold text-gray-700">
                Pick your avatar!
              </Label>
              <div className="grid grid-cols-6 gap-3">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar.id}
                    type="button"
                    className={`p-4 border-2 rounded-2xl transition-all duration-200 hover:scale-110 ${
                      tempAvatar === avatar.emoji 
                        ? 'border-blue-500 bg-blue-50 shadow-lg scale-110' 
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                    }`}
                    onClick={() => setTempAvatar(avatar.emoji)}
                    title={avatar.name}
                  >
                    <span className="text-3xl">{avatar.emoji}</span>
                  </button>
                ))}
              </div>
              {tempAvatar && (
                <p className="text-center text-sm text-gray-600 mt-2">
                  You selected: <span className="font-bold">{avatarOptions.find(a => a.emoji === tempAvatar)?.name}</span> {tempAvatar}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!tempName.trim() || !tempAvatar}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-6 rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-5 h-5 mr-2" />
              Start My Coding Adventure! 🚀
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
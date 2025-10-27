import { ArrowLeft, Search, Edit3, Code, CheckCircle, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { modulesData } from '../api/data';
import { useState, useEffect } from 'react';
import { quizAPI, challengeAPI, handleAPIError } from '../api/apiService';

interface ProgressPageProps {
  onBack: () => void;
  onLearnClick?: () => void;
  onFreeCodeClick?: () => void;
}

export function ProgressPage({ onBack, onLearnClick, onFreeCodeClick }: ProgressPageProps) {
  const [quizProgress, setQuizProgress] = useState<any[]>([]);
  const [challengeProgress, setChallengeProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch progress data from backend
  useEffect(() => {
    const fetchProgressData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch quiz progress for demo user
        const quizData = await quizAPI.getUserProgress('demo_user');
        setQuizProgress(quizData);
        
        // Fetch challenge submissions for demo user
        const challengeData = await challengeAPI.getUserSubmissions(1, 'demo_user');
        setChallengeProgress(challengeData);
        
      } catch (err) {
        setError(handleAPIError(err as Error).error);
        console.error('Failed to fetch progress data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  // Calculate real progress from backend data
  const calculateRealProgress = () => {
    const completedQuizzes = quizProgress.filter(q => q.score >= 80).length;
    const completedChallenges = challengeProgress.filter(c => c.score >= 80).length;
    
    // Calculate module progress based on activities
    const enhancedModules = modulesData.map(module => {
      const moduleId = parseInt(module.id.replace('module-', ''));
      
      // Check if user has completed quiz for this module
      const hasCompletedQuiz = quizProgress.some(q => q.quiz_id === moduleId && q.score >= 80);
      
      // Check if user has completed challenge for this module
      const hasCompletedChallenge = challengeProgress.some(c => c.challenge_id === moduleId && c.score >= 80);
      
      // Calculate progress: 50% for quiz, 50% for challenge
      let progress = 0;
      if (hasCompletedQuiz) progress += 50;
      if (hasCompletedChallenge) progress += 50;
      
      return {
        ...module,
        progress,
        completed: progress === 100,
        hasQuiz: hasCompletedQuiz,
        hasChallenge: hasCompletedChallenge
      };
    });
    
    return enhancedModules;
  };

  const enhancedModules = calculateRealProgress();
  
  // Calculate overall progress from enhanced modules
  const totalModules = enhancedModules.length;
  const totalProgress = enhancedModules.reduce((sum, module) => sum + module.progress, 0);
  const overallProgress = Math.round(totalProgress / totalModules);
  
  // Find current module (first incomplete module with some progress, or first incomplete)
  const currentModule = enhancedModules.find(m => !m.completed && m.progress > 0) || enhancedModules.find(m => !m.completed);
  const completedModules = enhancedModules.filter(m => m.completed);
  
  // Get exactly the first 4 modules for the journey visualization
  const journeyModules = enhancedModules.slice(0, 4);
  
  // Helper function to get short name
  const getShortName = (title: string) => {
    if (title.includes('Getting Started')) return 'Getting Started';
    if (title.includes('Variables')) return 'Variables';
    if (title.includes('Loops and Conditionals')) return 'Loops';
    if (title.includes('Functions')) return 'Functions';
    if (title.includes('Lists')) return 'Lists';
    if (title.includes('Loops: For')) return 'For & While';
    if (title.includes('Dictionaries')) return 'Dictionaries';
    if (title.includes('Projects')) return 'Projects';
    return title;
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 relative overflow-hidden">
      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your progress...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md">
            <div className="text-red-600 mb-4">❌ Error loading progress</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
              Try Again
            </Button>
          </div>
        </div>
      )}
      {/* Wavy background layers matching landing page */}
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

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute top-32 right-20 w-12 h-12 bg-blue-300 rounded-full opacity-50 animate-bounce" style={{animationDelay: '1s'}}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
            <Button 
              onClick={onBack}
              className="bg-white hover:bg-gray-50 text-gray-700 p-4 rounded-2xl shadow-lg text-lg"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Code className="w-8 h-8 text-white" />
              </div>
              <span className="text-gray-700 font-medium text-xl">LeetCode for Kids</span>
            </div>
          </div>
          
          {/* Course Title in Center */}
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 tracking-wide mr-50">
              PYTHON <span className="text-blue-600">ADVENTURES</span>
            </h1>
          </div>
          
          <Button className="bg-white hover:bg-gray-50 text-gray-700 p-4 rounded-2xl shadow-lg">
            <Search className="w-6 h-6" />
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                className="text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50"
                onClick={onLearnClick}
              >
                Learn
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50"
                onClick={onFreeCodeClick}
              >
                Free Code
              </Button>
              <Button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium">
                Progress
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Profile Sidebar */}
          <div className="w-72">
            {/* User Profile Card */}
            <Card className="p-6 rounded-3xl shadow-lg mb-4">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-4xl">🦸</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">Alex Chen</h2>
                <p className="text-gray-600">Age 10 | Level 3</p>
              </div>
            </Card>

            {/* Overall Progress Card */}
            <Card className="p-6 rounded-3xl shadow-lg mb-4">
              <h3 className="text-center font-bold text-gray-700 mb-3">Course Progress</h3>
              <div className="flex justify-center mb-3">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      stroke="#3b82f6"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={`${overallProgress * 2.827} 282.7`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">{overallProgress}%</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">{completedModules.length} of {totalModules} modules complete</p>
              </div>
            </Card>

            {/* Avatar Selection */}
            <Card className="p-4 rounded-3xl shadow-lg mb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">Choose Your Avatar</h3>
              <div className="flex justify-center space-x-4 mb-4">
                {/* Princess inspired */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                    <span className="text-xl">👸</span>
                  </div>
                  <span className="text-xs text-gray-600 mt-1 font-medium">Princess</span>
                </div>
                
                {/* Superhero inspired */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg ring-4 ring-blue-200">
                    <span className="text-xl">🦸</span>
                  </div>
                  <span className="text-xs text-gray-600 mt-1 font-medium">Hero</span>
                </div>
                
                {/* Lion inspired */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                    <span className="text-xl">🦁</span>
                  </div>
                  <span className="text-xs text-gray-600 mt-1 font-medium">Lion</span>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </Card>
          </div>

          {/* Main Progress Content */}
          <div className="flex-1">
            {/* Coding Journey Path */}
            <Card className="p-6 rounded-3xl shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">My Coding Journey</h2>
              
              {/* Journey Path SVG */}
              <div className="relative h-56 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-4 overflow-hidden">
                {/* Path Line */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 200">
                  <path
                    d="M60 170 Q140 150 220 155 Q300 160 380 145 Q460 130 540 125 Q600 120 640 110"
                    stroke={completedModules.length > 0 ? "#22c55e" : "#9ca3af"}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="8,4"
                    className={completedModules.length > 0 ? "animate-pulse" : ""}
                  />
                </svg>

                {/* Journey Points - Dynamic 4 modules */}
                <div className="relative z-10">
                  {/* Position 1 - Getting Started - Far Left */}
                  {journeyModules[0] && (
                    <div className="absolute left-8 bottom-8">
                      <div className={`${journeyModules[0].completed ? 'bg-green-500' : journeyModules[0].progress > 0 ? 'bg-blue-500' : 'bg-gray-300'} p-2 rounded-lg shadow-lg ${journeyModules[0].progress > 0 && !journeyModules[0].completed ? 'animate-bounce' : ''}`}>
                        {journeyModules[0].completed ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : journeyModules[0].progress > 0 ? (
                          <span className="text-white text-sm">🚀</span>
                        ) : (
                          <Lock className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                      <div className={`${journeyModules[0].completed ? 'bg-green-100' : journeyModules[0].progress > 0 ? 'bg-blue-100' : 'bg-gray-100'} px-2 py-1 rounded-md mt-1 max-w-[80px]`}>
                        <span className={`${journeyModules[0].completed ? 'text-green-800' : journeyModules[0].progress > 0 ? 'text-blue-800' : 'text-gray-600'} font-bold text-xs truncate block`}>
                          {getShortName(journeyModules[0].title)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Position 2 - Variables - Center Left */}
                  {journeyModules[1] && (
                    <div className="absolute left-1/3 top-20 transform -translate-x-1/2">
                      <div className={`${journeyModules[1].completed ? 'bg-green-500' : journeyModules[1].progress > 0 ? 'bg-blue-500' : 'bg-gray-300'} p-2 rounded-lg shadow-lg ${journeyModules[1].progress > 0 && !journeyModules[1].completed ? 'animate-bounce' : ''}`}>
                        {journeyModules[1].completed ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : journeyModules[1].progress > 0 ? (
                          <span className="text-white text-sm">🚀</span>
                        ) : (
                          <Lock className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                      <div className={`${journeyModules[1].completed ? 'bg-green-100' : journeyModules[1].progress > 0 ? 'bg-blue-100' : 'bg-gray-100'} px-2 py-1 rounded-md mt-1 max-w-[80px]`}>
                        <span className={`${journeyModules[1].completed ? 'text-green-800' : journeyModules[1].progress > 0 ? 'text-blue-800' : 'text-gray-600'} font-bold text-xs truncate block`}>
                          {getShortName(journeyModules[1].title)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Position 3 - Loops - Center Right */}
                  {journeyModules[2] && (
                    <div className="absolute left-1/2 top-12 transform -translate-x-1/2">
                      <div className={`${journeyModules[2].completed ? 'bg-green-500' : journeyModules[2].progress > 0 ? 'bg-blue-500' : 'bg-gray-300'} p-2 rounded-lg shadow-lg ${journeyModules[2].progress > 0 && !journeyModules[2].completed ? 'animate-bounce' : ''}`}>
                        {journeyModules[2].completed ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : journeyModules[2].progress > 0 ? (
                          <span className="text-white text-sm">🚀</span>
                        ) : (
                          <Lock className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                      <div className={`${journeyModules[2].completed ? 'bg-green-100' : journeyModules[2].progress > 0 ? 'bg-blue-100' : 'bg-gray-100'} px-2 py-1 rounded-md mt-1 max-w-[80px]`}>
                        <span className={`${journeyModules[2].completed ? 'text-green-800' : journeyModules[2].progress > 0 ? 'text-blue-800' : 'text-gray-600'} font-bold text-xs truncate block`}>
                          {getShortName(journeyModules[2].title)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Position 4 - Functions - Far Right */}
                  {journeyModules[3] && (
                    <div className="absolute right-8 top-6">
                      <div className={`${journeyModules[3].completed ? 'bg-green-500' : journeyModules[3].progress > 0 ? 'bg-blue-500' : 'bg-gray-300'} p-2 rounded-lg shadow-lg ${journeyModules[3].progress > 0 && !journeyModules[3].completed ? 'animate-bounce' : ''}`}>
                        {journeyModules[3].completed ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : journeyModules[3].progress > 0 ? (
                          <span className="text-white text-sm">🚀</span>
                        ) : (
                          <Lock className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                      <div className={`${journeyModules[3].completed ? 'bg-green-100' : journeyModules[3].progress > 0 ? 'bg-blue-100' : 'bg-gray-100'} px-2 py-1 rounded-md mt-1 max-w-[80px]`}>
                        <span className={`${journeyModules[3].completed ? 'text-green-800' : journeyModules[3].progress > 0 ? 'text-blue-800' : 'text-gray-600'} font-bold text-xs truncate block`}>
                          {getShortName(journeyModules[3].title)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Module Progress List */}
            <Card className="p-6 rounded-3xl shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Module Progress</h2>
              <div className="space-y-3">
                {enhancedModules.map((module, index) => {
                  const isCompleted = module.completed;
                  const isInProgress = !module.completed && module.progress > 0;
                  const isUpNext = !isCompleted && !isInProgress && index === completedModules.length + (currentModule ? 1 : 0);
                  
                  return (
                    <div
                      key={module.id}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 ${
                        isCompleted
                          ? 'bg-green-50 border-green-200'
                          : isInProgress
                          ? 'bg-blue-50 border-blue-300 shadow-md'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isCompleted
                              ? 'bg-green-500'
                              : isInProgress
                              ? 'bg-blue-500 animate-pulse'
                              : 'bg-gray-300'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : isInProgress ? (
                            <span className="text-xl">🚀</span>
                          ) : (
                            <Lock className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <h3 className={`font-bold ${isCompleted || isInProgress ? 'text-gray-800' : 'text-gray-700'}`}>
                            {module.title}
                          </h3>
                          <p className={`text-sm ${
                            isCompleted
                              ? 'text-gray-600'
                              : isInProgress
                              ? 'text-blue-600 font-medium'
                              : 'text-gray-500'
                          }`}>
                            {isCompleted
                              ? 'All activities completed!'
                              : isInProgress
                              ? 'Currently learning...'
                              : isUpNext
                              ? 'Up next!'
                              : index === enhancedModules.length - 1
                              ? 'Final module!'
                              : 'Coming soon'}
                          </p>
                          {/* Activity Indicators */}
                          <div className="flex space-x-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              module.hasQuiz ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                            }`}>
                              Quiz {module.hasQuiz ? '✓' : '○'}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              module.hasChallenge ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'
                            }`}>
                              Challenge {module.hasChallenge ? '✓' : '○'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          isCompleted
                            ? 'bg-green-500'
                            : isInProgress
                            ? 'bg-blue-500'
                            : 'bg-gray-300'
                        }`}
                      >
                        <span className={`font-bold ${isCompleted || isInProgress ? 'text-white' : 'text-gray-600'}`}>
                          {module.progress}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Detailed Progress Stats */}
            <Card className="p-6 rounded-3xl shadow-lg max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Course Statistics</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">{completedModules.length}</div>
                  <div className="text-sm text-gray-600 mt-1">Modules Complete</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">{quizProgress.filter(q => q.score >= 80).length}</div>
                  <div className="text-sm text-gray-600 mt-1">Quizzes Passed</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600">{challengeProgress.filter(c => c.score >= 80).length}</div>
                  <div className="text-sm text-gray-600 mt-1">Challenges Solved</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-gray-600">{totalModules - completedModules.length - (currentModule ? 1 : 0)}</div>
                  <div className="text-sm text-gray-600 mt-1">Modules Remaining</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
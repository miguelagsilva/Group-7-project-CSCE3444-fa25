import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Clock, BarChart3, FileText, GitBranch, RotateCcw, ShoppingCart, Zap, Award } from 'lucide-react';
import { Button } from './ui/button';
import { getModulesByCourseId, getLessonsByModuleId, getQuizByModuleId, Module, Lesson } from '../api/data';
import { isModuleCompleted, getModuleProgressAsync, getQuizScoreByModule, isQuizCompletedByModule } from '../utils/progressManager';

interface ModuleWithProgress extends Module {
  progress: number;
  status: 'completed' | 'in-progress' | 'locked' | 'not-started';
  quizScore?: number | null;
  quizAttempted: boolean;
}

interface ModuleCardProps {
  title: string;
  icon: React.ReactNode;
  status: 'completed' | 'in-progress' | 'locked' | 'not-started';
  progress?: number;
  quizScore?: number | null;
  quizAttempted: boolean;
  onClick?: () => void;
}

function ModuleCard({ title, icon, status, progress = 0, quizScore = null, quizAttempted, onClick }: ModuleCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'locked': return 'bg-gray-100 text-gray-500';
      case 'not-started': return 'bg-blue-100 text-blue-700'; // Blue like in-progress
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed': return 'COMPLETED';
      case 'in-progress': return progress > 0 ? `${progress}% COMPLETE` : 'IN PROGRESS';
      case 'locked': return 'LOCKED';
      case 'not-started': return 'NOT STARTED';
      default: return 'NOT STARTED';
    }
  };

  return (
    <div 
      className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-2 h-full ${
        status === 'locked' ? 'opacity-60' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center space-y-6 h-full">
        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center ${
          status === 'completed' ? 'bg-green-100' : 
          status === 'in-progress' || status === 'not-started' ? 'bg-blue-100' : 'bg-gray-100'
        }`}>
          <div className={`${
            status === 'completed' ? 'text-green-600' : 
            status === 'in-progress' || status === 'not-started' ? 'text-blue-600' : 'text-gray-400'
          }`}>
            {icon}
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-800 text-lg leading-tight flex-grow flex items-center">{title}</h3>
        
        {/* Progress bar or Quiz Score - takes same space */}
        <div className="w-full h-3">
          {status === 'completed' ? (
            // Show quiz score for completed modules
            <div className="flex items-center justify-center gap-2 h-full">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-bold text-gray-700">
                Quiz: {quizScore !== null ? `${quizScore}%` : 'N/A'}
              </span>
            </div>
          ) : status === 'in-progress' && progress > 0 ? (
            // Show progress bar for in-progress modules
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          ) : (
            // Empty space for not-started and locked modules
            <div className="h-3"></div>
          )}
        </div>
        
        <span className={`text-sm font-bold px-4 py-2 rounded-full ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>
    </div>
  );
}

interface ModulesPageProps {
  onBack: () => void;
  onModuleClick?: (moduleId: string) => void;
  onFreeCodeClick?: () => void;
}

export function ModulesPage({ onBack, onModuleClick, onFreeCodeClick }: ModulesPageProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [modulesWithProgress, setModulesWithProgress] = useState<ModuleWithProgress[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const loadModulesWithProgress = async () => {
      const moduleData = await getModulesByCourseId('python-adventures');
      setModules(moduleData);
      
      // Calculate progress for each module
      const modulesData = await Promise.all(
        moduleData.map(async (module) => {
          const progressData = await getModuleProgressAsync(module.id);
          
          let status: 'completed' | 'in-progress' | 'locked' | 'not-started' = 'not-started';
          if (module.locked) {
            status = 'locked';
          } else if (await isModuleCompleted(module.id)) {
            status = 'completed';
          } else if (progressData.percentage > 0) {
            status = 'in-progress';
          }
          
          const quizScore = await getQuizScoreByModule(module.id);
          const quizAttempted = await isQuizCompletedByModule(module.id);
          
          return {
            ...module,
            progress: progressData.percentage,
            status,
            quizScore,
            quizAttempted
          };
        })
      );
      
      setModulesWithProgress(modulesData);
    };
    
    loadModulesWithProgress();
  }, [refreshKey]);
  
  // Refresh when component becomes visible (user returns from module detail)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setRefreshKey(prev => prev + 1);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const getIconForModule = (title: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "Getting Started with Python": <Zap className="w-12 h-12" />,
      "Variables and Data Types": <FileText className="w-12 h-12" />,
      "Loops and Conditionals": <GitBranch className="w-12 h-12" />,
      "Functions and Methods": <RotateCcw className="w-12 h-12" />,
      "Lists and Collections": <ShoppingCart className="w-12 h-12" />,
      "Loops: For and While": <Clock className="w-12 h-12" />,
      "Dictionaries and Data": <BarChart3 className="w-12 h-12" />,
      "Building Projects": <CheckCircle className="w-12 h-12" />
    };
    return iconMap[title] || <FileText className="w-12 h-12" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 relative overflow-hidden">
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
      <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-white rounded-full opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          {/* Back Button */}
          <div className="flex items-center">
            <Button 
              onClick={onBack}
              className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-4 rounded-2xl shadow-lg text-lg flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go back
            </Button>
          </div>
          
          {/* Center: LeetCode for Kids - shows below on mobile, centered on desktop */}
          <div className="flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <h1 className="text-blue-600 text-2xl md:text-3xl font-bold tracking-wide">
              LeetCode for Kids
            </h1>
          </div>
          
          {/* Right: Spacer for alignment on desktop */}
          <div className="hidden md:flex items-center space-x-4 invisible">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <span className="text-gray-700 font-medium text-xl">LeetCode for Kids</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <div className="flex space-x-2">
              <Button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium">
                Learn
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50"
                onClick={onFreeCodeClick}
              >
                Free Code
              </Button>
            </div>
          </div>
        </div>

        {/* Your Modules Section */}
        <div className="mb-16">
          <h2 className="text-xl text-gray-700 mb-10">Your Learning Journey</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {modulesWithProgress.map((module) => (
              <ModuleCard
                key={module.id}
                title={module.title}
                icon={getIconForModule(module.title)}
                status={module.status}
                progress={module.progress}
                quizScore={module.quizScore}
                quizAttempted={module.quizAttempted}
                onClick={() => {
                  if (!module.locked && onModuleClick) {
                    onModuleClick(module.id);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
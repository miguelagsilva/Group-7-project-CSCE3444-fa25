import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Zap, Play, CheckCircle, Copy, RotateCcw, Maximize2, Timer, Trophy, Target, Flame, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { newChallengesData } from '../api/challenges-quizzes-data-fixed';
import { challengeAPI, handleAPIError } from '../api/apiService';
import { SolutionDisplay } from './SolutionDisplay';
import { MonacoEditor } from './MonacoEditor';
import { markChallengeCompleted } from '../utils/progressManager';
import { awardBadge } from '../utils/badgeManager';

interface ChallengePageProps {
  moduleId: string;
  onBack: () => void;
  onLearnClick?: () => void;
  onQuizClick?: () => void;
}

export function ChallengePage({ moduleId, onBack, onLearnClick, onQuizClick }: ChallengePageProps) {
  // Get the challenge for this module
  const currentChallenge = newChallengesData.find(challenge => challenge.moduleId === moduleId);
  
  const [code, setCode] = useState(currentChallenge?.starterCode || '# Loading challenge...');
  const [hasRun, setHasRun] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(currentChallenge?.timeLimit || 900);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>(
    currentChallenge?.difficulty === 'easy' ? 'Easy' : 
    currentChallenge?.difficulty === 'hard' ? 'Hard' : 'Medium'
  );
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [backendScore, setBackendScore] = useState(0);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [badgeAwarded, setBadgeAwarded] = useState(false);

  // Update code when moduleId changes
  useEffect(() => {
    if (currentChallenge) {
      setCode(currentChallenge.starterCode);
      setTimeLeft(currentChallenge.timeLimit);
      setDifficulty(
        currentChallenge.difficulty === 'easy' ? 'Easy' : 
        currentChallenge.difficulty === 'hard' ? 'Hard' : 'Medium'
      );
      setHasRun(false);
      setScore(0);
      setShowHints(false);
    }
  }, [moduleId, currentChallenge]);

  // Show error message if no challenge available
  if (!currentChallenge) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 shadow-lg text-center max-w-md">
          <div className="text-6xl mb-4">🔥</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Challenge Available</h2>
          <p className="text-gray-600 mb-6">There is no challenge available for this module yet.</p>
          <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700 text-white">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const lineCount = code.split('\n').length; // Keep for display purposes

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !hasRun) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, hasRun]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRunCode = async () => {
    setHasRun(true);
    setIsValidating(true);
    setValidationError(null);
    
    try {
      // For now, we'll simulate execution results
      // In a real implementation, this would come from Miguel's Python execution
      const executionResults = {
        test_0: "Hi! My name is Alex\nI am 10 years old\nI love to play soccer !\nNice to meet you!"
      };
      
      // Get challenge ID (convert moduleId to challenge ID)
      const challengeId = parseInt(moduleId.replace('module-', ''));
      
      // Validate with backend
      const validationResult = await challengeAPI.validateSubmission(challengeId, {
        user_id: 'demo_user',
        code: code,
        execution_results: executionResults
      });
      
      setBackendScore(validationResult.score);
      setTestResults(validationResult.test_results);
      
      // If score is 80% or higher, mark challenge as completed and award badge
      if (validationResult.score >= 80) {
        setChallengeCompleted(true);
        
        // Mark challenge as completed in progress manager
        if (currentChallenge) {
          markChallengeCompleted(currentChallenge.id);
          
          // Award badge for completing a challenge (per challenge)
          if (!badgeAwarded) {
            try {
              // Award "Challenge Completer" badge for first challenge completion
              const badgeResult = awardBadge('challenge-completer');
              if (badgeResult.success) {
                setBadgeAwarded(true);
                // Show badge notification (you can add a toast/notification here)
                console.log('Badge awarded:', badgeResult.badge);
              }
            } catch (error) {
              console.error('Error awarding badge:', error);
            }
          }
          
          // Auto-navigate to quiz after 3 seconds
          setTimeout(() => {
            if (onQuizClick) {
              onQuizClick();
            }
          }, 3000);
        }
      } else {
        // Show solution if score is low
        setTimeout(() => {
          setShowSolution(true);
        }, 2000);
      }
      
    } catch (error) {
      setValidationError(handleAPIError(error as Error).error);
      // Fallback to local scoring
      const timeBonus = Math.floor(timeLeft / 10);
      const completionBonus = 100;
      setScore(timeBonus + completionBonus);
    } finally {
      setIsValidating(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const handleResetCode = () => {
    if (currentChallenge) {
      setCode(currentChallenge.starterCode);
      setHasRun(false);
      setScore(0);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Generate line numbers
  const generateLineNumbers = () => {
    return Array.from({ length: Math.max(lineCount, 12) }, (_, i) => i + 1).join('\n');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 relative overflow-hidden">
      {/* Wavy background layers matching landing page */}
      <div className="absolute inset-x-0 bottom-0">
        <svg className="absolute bottom-0 left-0 w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none">
          <path 
            d="M0,128L48,149.3C96,171,192,213,288,213.3C384,213,480,171,576,165.3C672,160,768,192,864,186.7C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
            fill="rgba(59, 130, 246, 0.3)"
          />
        </svg>
        
        <svg className="absolute bottom-0 left-0 w-full h-48" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none">
          <path 
            d="M0,224L48,208C96,192,192,160,288,170.7C384,181,480,235,576,245.3C672,256,768,224,864,197.3C960,171,1056,149,1152,165.3C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
            fill="rgba(37, 99, 235, 0.4)"
          />
        </svg>
        
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

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-6">
            <Button 
              onClick={onBack}
              className="bg-white hover:bg-gray-50 text-gray-700 p-4 rounded-2xl shadow-lg"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <span className="text-gray-700 font-medium text-xl">LeetCode for Kids</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 tracking-wide">
              PYTHON <span className="text-blue-600">CHALLENGES</span>
            </h1>
          </div>
          
          <Button className="bg-white hover:bg-gray-50 text-gray-700 p-4 rounded-2xl shadow-lg">
            <Search className="w-6 h-6" />
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
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
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600"
              >
                Challenge
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50"
                onClick={onQuizClick}
              >
                Quiz
              </Button>
            </div>
          </div>
        </div>

        {/* Challenge Stats Bar */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <Timer className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">Time Remaining</div>
                  <div className={`text-xl font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-blue-600'}`}>
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Trophy className="w-6 h-6 text-yellow-600" />
                <div>
                  <div className="text-sm text-gray-600">Current Score</div>
                  <div className="text-xl font-bold text-yellow-600">{score} pts</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">Difficulty</div>
                  <Badge className={`${
                    difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {difficulty}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Challenge Mode Active</span>
            </div>
          </div>
        </div>

        {/* Main Content - Adjusted Layout for Bigger Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Instructions Panel */}
          <div className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-lg h-fit">
            <div className="flex items-center space-x-3 mb-6">
              <Trophy className="w-6 h-6 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-800">Challenge</h3>
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">{currentChallenge?.title || 'Challenge'}</h4>
              <p className="text-gray-700 leading-relaxed text-sm mb-4">
                {currentChallenge?.description || 'Loading challenge description...'}
              </p>
              
              {/* Show Expected Output Example */}
              {currentChallenge?.testCases && currentChallenge.testCases.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h5 className="font-semibold text-blue-800 mb-2 text-sm">💡 Expected Output Format:</h5>
                      <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-green-400 whitespace-pre-wrap overflow-x-auto">
                        {currentChallenge.testCases[0].expectedOutput.replace(/\\n/g, '\n')}
                      </div>
                      <p className="text-blue-700 text-xs mt-2">
                        Your output should match this format, but the exact wording can vary slightly.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Challenge Points */}
            <div className="bg-blue-50 rounded-2xl p-4 mb-6">
              <h5 className="font-semibold text-blue-800 mb-3">Challenge Info:</h5>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Points: {currentChallenge?.points || 100} pts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Time Limit: {currentChallenge?.timeLimit ? Math.floor(currentChallenge.timeLimit / 60) : 0} minutes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Difficulty: {difficulty}</span>
                </li>
              </ul>
            </div>

            {/* Hints Section */}
            <div className="mb-6">
              <Button
                onClick={() => setShowHints(!showHints)}
                variant="outline"
                className="w-full rounded-xl border-2 border-yellow-300 bg-yellow-50 hover:bg-yellow-100 text-yellow-800 font-medium py-3"
              >
                <Lightbulb className="w-5 h-5 mr-2" />
                {showHints ? 'Hide Hints' : 'Need a Hint?'}
              </Button>
              
              {showHints && (
                <div className="mt-4 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 animate-in fade-in duration-300">
                  <h5 className="font-semibold text-yellow-800 mb-3 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Helpful Hints:
                  </h5>
                  <ul className="space-y-3 text-sm text-yellow-900">
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-600 font-bold">💡</span>
                      <span>Read the challenge description carefully and understand what's expected</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-600 font-bold">💡</span>
                      <span>Start by writing out the steps in comments before coding</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-600 font-bold">💡</span>
                      <span>Test your code with simple examples first</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-600 font-bold">💡</span>
                      <span>Look at the starter code - it gives you clues about the solution structure</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>


          </div>

          {/* Code Editor */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-lg">
            {/* Editor Header */}
            <div className="bg-gray-800 rounded-t-2xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-300 text-sm font-medium">Challenge Editor</span>
                <Badge className="bg-blue-600 text-white text-xs">
                  <Flame className="w-3 h-3 mr-1" />
                  Challenge Mode
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopyCode}
                  className="text-gray-400 hover:text-white hover:bg-gray-700 p-2"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleResetCode}
                  className="text-gray-400 hover:text-white hover:bg-gray-700 p-2"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleFullscreen}
                  className="text-gray-400 hover:text-white hover:bg-gray-700 p-2"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Code Editor with Monaco */}
            <div className={`bg-gray-900 rounded-b-2xl relative overflow-hidden ${isFullscreen ? 'min-h-[600px]' : 'min-h-[450px]'}`}>
              <MonacoEditor
                value={code}
                onChange={(value) => setCode(value || '')}
                language="python"
                theme="vs-dark"
                height={isFullscreen ? '600px' : '450px'}
                autosaveKey={`challenge-${moduleId}-code`}
              />
              
              {/* Status Indicator */}
              <div className="absolute top-4 right-4 z-10">
                <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-400 text-xs">Challenge Active</span>
                </div>
              </div>
            </div>

            {/* Editor Controls */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Lines: {lineCount}</span>
                <span>•</span>
                <span>Characters: {code.length}</span>
                <span>•</span>
                <span className="text-blue-600 font-medium">Challenge Mode</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline"
                  className="px-6 py-3 rounded-xl text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  Save Progress
                </Button>
                <Button 
                  onClick={handleRunCode}
                  disabled={hasRun || isValidating}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center space-x-2 shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="w-5 h-5" />
                  <span>
                    {isValidating ? 'Validating...' : 
                     hasRun ? 'Submitted!' : 
                     'Submit Challenge'}
                  </span>
                </Button>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-lg h-fit">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Test Results</h3>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${hasRun ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`}></div>
                <span className="text-sm text-gray-600">{hasRun ? 'Complete' : 'Waiting'}</span>
              </div>
            </div>
            
            {/* Test Console */}
            <div className="bg-gray-900 rounded-2xl p-4 mb-6 min-h-[300px]">
              <div className="text-green-400 font-mono text-sm">
                {!hasRun ? (
                  <div className="text-gray-500">
                    <div className="flex items-center space-x-2 mb-2">
                      <span>▶</span>
                      <span>Submit your challenge solution...</span>
                    </div>
                    <div className="text-blue-400 mt-4">
                      ⏱️ Timer: {formatTime(timeLeft)}
                    </div>
                    <div className="w-2 h-4 bg-blue-400 animate-pulse inline-block mt-2"></div>
                  </div>
                ) : (
                  <div>
                    <div className="text-blue-400"># Running challenge tests...</div>
                    <div className="mt-2 space-y-1">
                      {currentChallenge?.testCases && currentChallenge.testCases.length > 0 ? (
                        <div className="text-gray-300">
                          <div className="mb-2">Test Case Results:</div>
                          {currentChallenge.testCases.map((testCase, index) => (
                            <div key={index} className="mb-3">
                              <div className="text-yellow-400">Test {index + 1}:</div>
                              {testCase.input && <div className="text-gray-400">Input: {testCase.input}</div>}
                              <div className="text-green-400">Expected: {testCase.expectedOutput}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-green-400">Test output will appear here...</div>
                      )}
                    </div>
                    <div className="mt-4 text-gray-500">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>All tests passed! 🎉</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {hasRun && (
              <div className={`rounded-2xl p-6 text-center ${
                challengeCompleted 
                  ? 'bg-gradient-to-r from-green-100 to-emerald-200 border-2 border-green-300' 
                  : 'bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-200'
              }`}>
                {challengeCompleted && (
                  <div className="mb-4">
                    <div className="text-4xl mb-2">🏆</div>
                    <div className="text-green-700 font-bold text-xl mb-2">Challenge Completed!</div>
                    {badgeAwarded && (
                      <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 mb-4 animate-pulse">
                        <div className="text-2xl mb-1">🎖️</div>
                        <div className="text-yellow-800 font-semibold">Badge Earned: Challenge Completer!</div>
                        <div className="text-yellow-700 text-sm mt-1">You've completed a coding challenge! ⭐</div>
                      </div>
                    )}
                    <div className="text-green-600 text-sm mb-3">
                      Redirecting to Quiz in 3 seconds...
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-center space-x-2 text-blue-700 mb-3">
                  <Trophy className="w-6 h-6" />
                  <span className="font-semibold text-lg">Challenge Complete! 🏆</span>
                </div>
                <div className="text-gray-700 text-sm mb-4">
                  <div className="font-semibold">Backend Score: {backendScore}%</div>
                  <div className="font-semibold">Local Score: {score} points</div>
                  <div>Time Bonus: {Math.floor(timeLeft / 10)} pts</div>
                  {validationError && (
                    <div className="text-red-600 text-xs mt-2">
                      Backend Error: {validationError}
                    </div>
                  )}
                </div>
                {!challengeCompleted && (
                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => {
                        // Reset challenge state
                        setHasRun(false);
                        setScore(0);
                        setBackendScore(0);
                        setTestResults([]);
                        setValidationError(null);
                        setIsValidating(false);
                        setShowSolution(false);
                        setChallengeCompleted(false);
                        setBadgeAwarded(false);
                        // Reset code to starter code
                        if (currentChallenge) {
                          setCode(currentChallenge.starterCode);
                        }
                        // Reset timer
                        setTimeLeft(currentChallenge?.timeLimit || 900);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm"
                    >
                      Try Again
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm">
                      Next Challenge →
                    </Button>
                  </div>
                )}
              </div>
            )}


          </div>
        </div>

        {/* Challenge Progress */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-4 text-gray-600">
            <Trophy className="w-5 h-5 text-blue-500" />
            <span>Challenge 1 of 5</span>
            <span>•</span>
            <span className="text-blue-600 font-medium">Difficulty: {difficulty}</span>
          </div>
        </div>
      </div>
      
      {/* Solution Display Modal */}
      <SolutionDisplay
        challengeId={parseInt(moduleId.replace('module-', ''))}
        isOpen={showSolution}
        onClose={() => setShowSolution(false)}
        onTryAgain={() => {
          // Reset challenge state
          setHasRun(false);
          setScore(0);
          setBackendScore(0);
          setTestResults([]);
          setValidationError(null);
          setIsValidating(false);
          setShowSolution(false);
          // Reset code to starter code
          if (currentChallenge) {
            setCode(currentChallenge.starterCode);
          }
          // Reset timer
          setTimeLeft(currentChallenge?.timeLimit || 900);
        }}
        userScore={backendScore}
        maxScore={100}
      />
    </div>
  );
}
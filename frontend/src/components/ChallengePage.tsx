import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Search, Zap, Play, CheckCircle, Copy, RotateCcw, Maximize2, Timer, Trophy, Target, Flame, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChallengePageProps {
  onBack: () => void;
  onProgressClick?: () => void;
  onLearnClick?: () => void;
  onFreeCodeClick?: () => void;
  onQuizClick?: () => void;
}

export function ChallengePage({ onBack, onProgressClick, onLearnClick, onFreeCodeClick, onQuizClick }: ChallengePageProps) {
  const [code, setCode] = useState(`# 🔥 CHALLENGE: FizzBuzz Adventure! 
# Write a program that prints numbers 1 to 15
# BUT: Replace multiples of 3 with "Fizz"
#      Replace multiples of 5 with "Buzz" 
#      Replace multiples of both with "FizzBuzz"

for i in range(1, 16):
    # Your code here!
    print(i)`);
  const [hasRun, setHasRun] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [showHints, setShowHints] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lineCount = code.split('\n').length;

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

  const handleRunCode = () => {
    setHasRun(true);
    // Calculate score based on time remaining and code quality
    const timeBonus = Math.floor(timeLeft / 10);
    const completionBonus = 100;
    setScore(timeBonus + completionBonus);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const handleResetCode = () => {
    setCode(`# 🔥 CHALLENGE: FizzBuzz Adventure! 
# Write a program that prints numbers 1 to 15
# BUT: Replace multiples of 3 with "Fizz"
#      Replace multiples of 5 with "Buzz" 
#      Replace multiples of both with "FizzBuzz"

for i in range(1, 16):
    # Your code here!
    print(i)`);
    setHasRun(false);
    setScore(0);
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
                className="text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50"
                onClick={onFreeCodeClick}
              >
                Free Code
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
              <Button 
                variant="ghost" 
                className="text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50"
                onClick={onProgressClick}
              >
                Progress
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
              <h4 className="font-semibold text-gray-800 mb-2">FizzBuzz Challenge</h4>
              <p className="text-gray-700 leading-relaxed text-sm">
                Classic coding challenge! Print numbers 1-15, but replace multiples of 3 with "Fizz", 
                multiples of 5 with "Buzz", and multiples of both with "FizzBuzz".
              </p>
            </div>

            {/* Challenge Requirements */}
            <div className="bg-blue-50 rounded-2xl p-4 mb-6">
              <h5 className="font-semibold text-blue-800 mb-3">Requirements:</h5>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Numbers 1-15</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Multiples of 3 → "Fizz"</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Multiples of 5 → "Buzz"</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Both → "FizzBuzz"</span>
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
                      <span>Use the <code className="bg-yellow-100 px-1 rounded">%</code> (modulo) operator to check if a number is divisible</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-600 font-bold">💡</span>
                      <span>Check for multiples of both 3 AND 5 first, before checking each separately</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-600 font-bold">💡</span>
                      <span>Use <code className="bg-yellow-100 px-1 rounded">if/elif/else</code> statements to handle different cases</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-600 font-bold">💡</span>
                      <span>If a number is divisible by 15, it's divisible by both 3 and 5!</span>
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
            
            {/* Code Editor with Line Numbers */}
            <div className={`bg-gray-900 rounded-b-2xl relative ${isFullscreen ? 'min-h-[600px]' : 'min-h-[450px]'}`}>
              <div className="flex">
                {/* Line Numbers */}
                <div className="bg-gray-800 px-4 py-6 border-r border-gray-700 min-w-[60px]">
                  <pre
                    className="text-gray-500 text-sm font-mono leading-6 text-right select-none"
                    style={{ 
                      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                      lineHeight: '1.6'
                    }}
                  >
                    {generateLineNumbers()}
                  </pre>
                </div>
                
                {/* Code Area */}
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={`w-full bg-transparent text-green-400 font-mono resize-none outline-none p-6 ${
                      isFullscreen ? 'min-h-[600px]' : 'min-h-[450px]'
                    }`}
                    placeholder="# Write your challenge solution here..."
                    style={{ 
                      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                      lineHeight: '1.6',
                      fontSize: '16px'
                    }}
                    spellCheck={false}
                  />
                  
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-gray-400 text-xs">Challenge Active</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Syntax Highlighting Hints */}
              <div className="absolute bottom-4 left-4 text-gray-500 text-xs">
                <div className="flex items-center space-x-4">
                  <span><span className="text-purple-400">■</span> Keywords</span>
                  <span><span className="text-green-400">■</span> Strings</span>
                  <span><span className="text-blue-400">■</span> Numbers</span>
                  <span><span className="text-gray-400">■</span> Comments</span>
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
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center space-x-2 shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Play className="w-5 h-5" />
                  <span>Submit Challenge</span>
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
                      <div>1</div>
                      <div>2</div>
                      <div className="text-blue-400">Fizz</div>
                      <div>4</div>
                      <div className="text-purple-400">Buzz</div>
                      <div className="text-blue-400">Fizz</div>
                      <div>7</div>
                      <div>8</div>
                      <div className="text-blue-400">Fizz</div>
                      <div className="text-purple-400">Buzz</div>
                      <div>11</div>
                      <div className="text-blue-400">Fizz</div>
                      <div>13</div>
                      <div>14</div>
                      <div className="text-red-400">FizzBuzz</div>
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
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-200 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-blue-700 mb-3">
                  <Trophy className="w-6 h-6" />
                  <span className="font-semibold text-lg">Challenge Complete! 🏆</span>
                </div>
                <div className="text-gray-700 text-sm mb-4">
                  <div className="font-semibold">Final Score: {score} points</div>
                  <div>Time Bonus: {Math.floor(timeLeft / 10)} pts</div>
                </div>
                <div className="flex space-x-3">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm">
                    Next Challenge →
                  </Button>
                  <Button variant="outline" className="px-4 py-2 rounded-xl text-sm">
                    Leaderboard
                  </Button>
                </div>
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
    </div>
  );
}
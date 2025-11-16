import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Zap, Play, CheckCircle, Copy, RotateCcw, Maximize2, Timer, Trophy, Target, Flame, Lightbulb, XCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { newChallengesData } from '../api/challenges-quizzes-data-fixed';
import { MonacoEditor } from './MonacoEditor';
import { usePyodide } from '../hooks/usePyodide';
import { useChallengeRunner } from '../hooks/useChallengeRunner';
import { markChallengeCompleted, isChallengeCompleted } from '../utils/progressManager';
import { validateChallengeFromRunner, ChallengeValidationResult, TestCaseResult, getDetailedFeedback } from '../utils/validate-challenge';

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationResult, setValidationResult] = useState<ChallengeValidationResult | null>(null);
  const [shouldValidate, setShouldValidate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>(
    currentChallenge?.difficulty === 'easy' ? 'Easy' : 
    currentChallenge?.difficulty === 'hard' ? 'Hard' : 'Medium'
  );
  const [showHints, setShowHints] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Pyodide for real Python execution
  const { isLoading: pyodideLoading, isRunning, output, error: pyodideError, runCode: executePython, runCodeWithInputs, clearOutput } = usePyodide();
  
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

  const lineCount = code.split('\n').length;

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !hasRun) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, hasRun]);

  // Validate output when it changes and shouldValidate is true
  useEffect(() => {
    if (shouldValidate && output && currentChallenge && !isRunning) {
      // Create a RunnerResult object from the Pyodide output
      const runnerResult = {
        stdout: output,
        error: output.includes('Error:') || output.includes('❌') ? output : null,
        exitCode: output.includes('Error:') || output.includes('❌') ? 1 : 0
      };
      
      const validation = validateChallengeFromRunner(runnerResult, currentChallenge);
      setValidationResult(validation);
      
      // If submitting, handle completion
      if (isSubmitting) {
        const baseScore = validation.score;
        const timeBonus = validation.passed ? Math.floor(timeLeft / 10) : 0;
        const totalScore = baseScore + timeBonus;
        setScore(totalScore);
        
        if (validation.passed) {
          markChallengeCompleted(currentChallenge.id);
          console.log(`✅ Challenge completed: ${currentChallenge.id} with score ${totalScore}`);
          setIsSubmitted(true);
        } else {
          console.log(`❌ Challenge failed: ${currentChallenge.id}`);
        }
        setIsSubmitting(false);
      }
      
      setShouldValidate(false);
    }
  }, [output, shouldValidate, currentChallenge, isRunning, isSubmitting, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRunCode = async () => {
    // Run the Python code through Pyodide (without validation)
    setShouldValidate(false); // Don't validate on run, only on submit
    setValidationResult(null); // Clear previous validation results
    
    // Check if we have test cases with inputs
    if (currentChallenge?.testCases && currentChallenge.testCases.length > 0 && currentChallenge.testCases[0].input) {
      const inputs = parseTestInputs(currentChallenge.testCases[0].input);
      await runCodeWithInputs(code, inputs);
    } else {
      await executePython(code);
    }
    
    setHasRun(true);
  };

  const handleSubmitChallenge = async () => {
    // Run the code first with validation
    setIsSubmitting(true);
    setShouldValidate(true); // Only validate on submit
    
    // Check if we have test cases with inputs
    if (currentChallenge?.testCases && currentChallenge.testCases.length > 0 && currentChallenge.testCases[0].input) {
      const inputs = parseTestInputs(currentChallenge.testCases[0].input);
      await runCodeWithInputs(code, inputs);
    } else {
      await executePython(code);
    }
    
    setHasRun(true);
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
    return Array.from({ length: Math.max(lineCount, 12) }, (_, i) => i + 1).join('\\n');
  };

  // Helper function to parse test inputs
  const parseTestInputs = (input: string): string[] => {
    return input.split('\n').filter(line => line.trim() !== '');
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

      {/* Success Modal Overlay */}
      {isSubmitted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md mx-4 animate-in zoom-in duration-300">
            <div className="text-center">
              {/* Trophy Icon */}
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
              </div>
              
              {/* Success Message */}
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Challenge Complete! 🎉
              </h2>
              <p className="text-gray-600 mb-6">
                Amazing work! You've successfully completed the challenge.
              </p>
              
              {/* Score Display */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                  {score}
                </div>
                <div className="text-gray-600 text-sm">Total Points Earned</div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Completion Bonus:</span>
                    <span className="font-medium">100 pts</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>Time Bonus:</span>
                    <span className="font-medium">{Math.floor(timeLeft / 10)} pts</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 rounded-2xl text-lg font-medium shadow-lg"
                  onClick={onQuizClick}
                >
                  Continue to Quiz →
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-6 rounded-2xl text-lg font-medium"
                  onClick={onLearnClick}
                >
                  Review Lesson
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          {/* Left: Back Button */}
          <div className="flex items-center">
            <Button 
              onClick={onBack}
              className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-4 rounded-2xl shadow-lg flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go back
            </Button>
          </div>
          
          {/* Center: LeetCode for Kids */}
          <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-blue-600 text-3xl font-bold tracking-wide">
              LeetCode for Kids
            </h1>
          </div>
          
          {/* Right: Spacer for alignment */}
          <div className="flex items-center space-x-4 invisible">
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
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
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

        {/* Main Content - Single Card with Sections */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
          {/* Top Section: Challenge Info */}
          <div className="p-6 border-b-2 border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <Trophy className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-800">{currentChallenge?.title || 'Challenge'}</h3>
                  <Badge className={`${
                    difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {difficulty}
                  </Badge>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {currentChallenge?.description || 'Loading challenge description...'}
                </p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-blue-600" />
                    <span>{currentChallenge?.points || 100} pts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Timer className="w-4 h-4 text-blue-600" />
                    <span>{currentChallenge?.timeLimit ? Math.floor(currentChallenge.timeLimit / 60) : 0} minutes</span>
                  </div>
                </div>
              </div>
              
              {/* Hints Button */}
              <div>
                <Button
                  onClick={() => setShowHints(!showHints)}
                  variant="outline"
                  className="rounded-xl border-2 border-yellow-300 bg-yellow-50 hover:bg-yellow-100 text-yellow-800 font-medium"
                >
                  <Lightbulb className="w-5 h-5 mr-2" />
                  {showHints ? 'Hide Hints' : 'Need a Hint?'}
                </Button>
              </div>
            </div>
            
            {/* Hints Section */}
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

          {/* Middle Section: Code Editor and Output Side by Side */}
          <div className="flex h-[900px]">
            {/* Code Editor */}
            <div className="w-[60%] border-r-2 border-white flex flex-col">
              {/* Editor Header */}
              <div className="bg-gray-800 h-16 px-4 flex items-center justify-between border-b border-gray-700">
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
                </div>
              </div>
              
              {/* Code Editor */}
              <div className="flex-1 relative">
                <MonacoEditor
                  value={code}
                  onChange={setCode}
                  language="python"
                  theme="vs-dark"
                  height="100%"
                />
                
                {/* Status Indicator */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400 text-xs">Challenge Active</span>
                  </div>
                </div>
              </div>

              {/* Editor Footer with Stats */}
              <div className="bg-gray-800 p-3 border-t border-gray-700 flex justify-between items-center">
                <div className="flex items-center space-x-3 text-xs text-gray-400">
                  <span>Lines: {lineCount}</span>
                  <span>•</span>
                  <span>Characters: {code.length}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-blue-400">
                  <Flame className="w-3 h-3" />
                  <span>Challenge Mode</span>
                </div>
              </div>
            </div>

            {/* Output Panel */}
            <div className="w-[40%] flex flex-col bg-gray-900">
              {/* Output Header */}
              <div className="bg-gray-800 h-16 px-4 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-300 ">Test Results</h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${hasRun ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`}></div>
                    <span className="text-xs text-gray-400">{hasRun ? 'Complete' : 'Waiting'}</span>
                  </div>
                </div>
              </div>
              
              {/* Test Console */}
              <div className="flex-1 p-4 overflow-auto">
                <div className="text-green-400 font-mono text-sm">
                  {pyodideLoading && (
                    <div className="text-yellow-400 mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
                        <span>Loading Python environment...</span>
                      </div>
                    </div>
                  )}
                  
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
                      <div className="text-blue-400"># Challenge Output:</div>
                      <div className="mt-3 mb-4 text-gray-300 whitespace-pre-wrap bg-black/30 p-3 rounded-lg">
                        {output || 'Running code...'}
                      </div>
                      
                      {/* Validation Results */}
                      {validationResult && (
                        <div className="mt-4 border-t border-gray-700 pt-4">
                          {/* Overall Status */}
                          <div className={`mb-3 p-3 rounded-lg ${
                            validationResult.passed ? 'bg-green-900/30 border border-green-700' :
                            'bg-red-900/30 border border-red-700'
                          }`}>
                            <div className="flex items-center space-x-2 mb-2">
                              {validationResult.passed ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-400" />
                              )}
                              <span className={validationResult.passed ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}>
                                {validationResult.message}
                              </span>
                            </div>
                            <div className="text-gray-400 text-xs">
                              {validationResult.feedback}
                            </div>
                            <div className="mt-2 text-sm">
                              <span className="text-blue-400">Score: {validationResult.score}/{validationResult.maxScore} pts</span>
                            </div>
                          </div>
                          
                          {/* Test Case Results */}
                          {validationResult.testResults.length > 0 && (
                            <div className="space-y-2">
                              <div className="text-yellow-400 text-sm font-semibold mb-2">Test Cases:</div>
                              {validationResult.testResults.map((testResult, index) => (
                                <div 
                                  key={index}
                                  className={`p-3 rounded-lg ${
                                    testResult.passed ? 'bg-green-900/20 border border-green-800' :
                                    'bg-red-900/20 border border-red-800'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-yellow-400 font-medium">Test {testResult.testNumber}</span>
                                    {testResult.passed ? (
                                      <Badge className="bg-green-700 text-white text-xs">✓ Passed</Badge>
                                    ) : (
                                      <Badge className="bg-red-700 text-white text-xs">✗ Failed</Badge>
                                    )}
                                  </div>
                                  {testResult.description && (
                                    <div className="text-gray-400 text-xs mb-2">{testResult.description}</div>
                                  )}
                                  {testResult.input && (
                                    <div className="text-gray-400 text-xs">Input: {testResult.input}</div>
                                  )}
                                  <div className="text-green-400 text-xs">Expected: {testResult.expectedOutput}</div>
                                  {!testResult.passed && (
                                    <div className="text-red-400 text-xs">Your Output: {testResult.actualOutput.replace(/^✅ Success!\s*/m, '').replace(/⚠️ Errors:[\s\S]*/m, '').trim()}</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="mt-4 text-gray-500">
                        <div className="flex items-center space-x-2">
                          {validationResult && validationResult.passed ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span>{isSubmitted ? 'Challenge submitted! 🎉' : 'All tests passed! Ready to submit! 🎯'}</span>
                            </>
                          ) : validationResult && !validationResult.passed ? (
                            <>
                              <AlertCircle className="w-4 h-4 text-yellow-400" />
                              <span>Some tests failed. Review and try again! 💪</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span>{isSubmitted ? 'Challenge submitted! 🎉' : 'Code executed successfully! 💫'}</span>
                            </>
                          )}
                        </div>
                        {!isSubmitted && validationResult && !validationResult.passed && (
                          <div className="mt-2 text-yellow-400 text-xs">
                            💡 Fix the failing tests and click "Submit Challenge" to complete!
                          </div>
                        )}
                        {!isSubmitted && validationResult && validationResult.passed && (
                          <div className="mt-2 text-green-400 text-xs">
                            🎉 Excellent! Click "Submit Challenge" to complete the challenge and earn your points!
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Action Buttons */}
          <div className="p-6 border-t-2 border-white flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <Trophy className="w-5 h-5 text-blue-500" />
              <span>Challenge 1 of 5</span>
              <span>•</span>
              <span className="text-blue-600 font-medium">Keep going! 💪</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleRunCode}
                variant="outline"
                disabled={isRunning}
                className="px-6 py-3 rounded-xl text-blue-600 border-2 border-blue-600 hover:bg-blue-50 flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
              </Button>
              <Button 
                onClick={handleSubmitChallenge}
                disabled={isRunning || score > 0}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl flex items-center space-x-2 shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <CheckCircle className="w-5 h-5" />
                <span>{score > 0 ? 'Submitted ✓' : 'Submit Challenge'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
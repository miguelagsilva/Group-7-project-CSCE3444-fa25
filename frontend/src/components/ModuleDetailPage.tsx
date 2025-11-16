import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { 
  Code, 
  Play, 
  Lightbulb, 
  Star, 
  CheckCircle, 
  Clock, 
  Trophy, 
  ArrowLeft, 
  Terminal, 
  RotateCcw 
} from 'lucide-react';
import { 
  Module, 
  Lesson, 
  getModuleById, 
  getLessonsByModuleId 
} from '../api/data';
import { MonacoEditor } from './MonacoEditor';
import { usePyodide } from '../hooks/usePyodide';
import { getRandomFeedback } from '../utils/practiceFeedback';
import { validateCode } from '../utils/codeValidation';
import { 
  markLessonCompleted, 
  isLessonCompleted, 
  setCurrentLesson,
  markModuleCompleted 
} from '../utils/progressManager';

interface ModuleDetailPageProps {
  moduleId: string;
  onBack: () => void;
  onChallengeClick?: () => void;
  onQuizClick?: () => void;
}

export function ModuleDetailPage({ moduleId, onBack, onChallengeClick, onQuizClick }: ModuleDetailPageProps) {
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [codeOutputs, setCodeOutputs] = useState<Record<number | string, string>>({});
  const [runningCode, setRunningCode] = useState<Record<number | string, boolean>>({});
  const [editedCode, setEditedCode] = useState<Record<number | string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [, forceUpdate] = useState({}); // For forcing re-render when progress changes
  const [practiceMode, setPracticeMode] = useState<Record<string, boolean>>({}); // Track practice mode for each example
  const [currentRunningKey, setCurrentRunningKey] = useState<number | string | null>(null); // Track which editor is running
  const [practiceFeedback, setPracticeFeedback] = useState<Record<string, { type: 'success' | 'partial' | 'incorrect', message: string }>>({}); // Store feedback for practice exercises
  
  // Pyodide for real Python execution
  const { isLoading: pyodideLoading, isRunning, output: pyodideOutput, runCode: executePython } = usePyodide();

  // Capture Pyodide output when code finishes running
  useEffect(() => {
    if (!isRunning && currentRunningKey !== null && pyodideOutput) {
      // Code just finished running - capture the output
      setCodeOutputs(prev => ({
        ...prev,
        [currentRunningKey]: pyodideOutput
      }));
      
      // Check if this was a practice exercise and grade it
      const keyStr = String(currentRunningKey);
      const currentLesson = lessons[currentLessonIndex]; // Get current lesson from state
      if (keyStr.includes('-practice') && currentLesson) {
        // Extract the example index from the key
        const exampleIndexMatch = keyStr.match(/(\d+)-example-(\d+)-practice/);
        if (exampleIndexMatch) {
          const exampleIndex = parseInt(exampleIndexMatch[2]);
          const matchingExercise = currentLesson.content.practiceExercises?.[exampleIndex];
          
          if (matchingExercise) {
            // Check if there's an error in the output first
            const hasError = pyodideOutput.includes('Error:') || 
                           pyodideOutput.includes('SyntaxError') || 
                           pyodideOutput.includes('NameError') ||
                           pyodideOutput.includes('TypeError') ||
                           pyodideOutput.includes('ValueError') ||
                           pyodideOutput.includes('❌') ||
                           pyodideOutput.includes('⚠️ Errors:');
            
            if (hasError) {
              // If there's an error, mark as incorrect
              const feedbackMessage = getRandomFeedback('incorrect');
              setPracticeFeedback(prev => ({
                ...prev,
                [currentRunningKey]: {
                  type: 'incorrect',
                  message: feedbackMessage
                }
              }));
            } else {
              // Extract only the actual output (remove the "✅ Success!" prefix and other formatting)
              const cleanOutput = pyodideOutput
                .replace(/✅ Success!\n\n/, '')
                .replace(/✅ Code executed successfully.*/, '')
                .trim();
              
              // Get validation config or create a default one
              let validationConfig = matchingExercise.validation;
              
              if (!validationConfig) {
                // If no validation config exists, create a default one
                const expectedOutput = matchingExercise.expectedOutput || '';
                
                if (expectedOutput === '') {
                  // Empty expected output means any output is acceptable (pattern validation)
                  validationConfig = {
                    type: 'pattern' as const,
                    checks: [
                      { rule: 'not_empty', message: '💡 You need to print something!' }
                    ]
                  };
                } else {
                  // Use exact matching for exercises with specific expected output
                  validationConfig = {
                    type: 'exact' as const,
                    expectedOutput: expectedOutput,
                    ignoreCase: false,
                    ignoreWhitespace: true,
                    allowPartialCredit: true
                  };
                }
              }
              
              // Grade the output using the new validation system
              const studentCode = editedCode[currentRunningKey] || '';
              const validationResult = validateCode(cleanOutput, validationConfig, studentCode);
              const feedbackMessage = validationResult.message;
              
              // Store the feedback
              setPracticeFeedback(prev => ({
                ...prev,
                [currentRunningKey]: {
                  type: validationResult.type,
                  message: feedbackMessage
                }
              }));
            }
          }
        }
      }
      
      setRunningCode(prev => ({
        ...prev,
        [currentRunningKey]: false
      }));
      setCurrentRunningKey(null);
    }
  }, [isRunning, pyodideOutput, currentRunningKey, lessons, currentLessonIndex]);

  useEffect(() => {
    // Reset loading state when moduleId changes
    setIsLoading(true);
    setCurrentModule(null);
    setLessons([]);
    setCurrentLessonIndex(0);
    
    // Load the selected module and its lessons
    Promise.all([
      getModuleById(moduleId),
      getLessonsByModuleId(moduleId)
    ]).then(([module, loadedLessons]) => {
      if (module) setCurrentModule(module);
      setLessons(loadedLessons);
      setCurrentLessonIndex(0);
      // Reset code states when changing lessons
      setCodeOutputs({});
      setRunningCode({});
      setEditedCode({});
      setIsLoading(false);
    }).catch((error) => {
      console.error('Error loading module data:', error);
      setIsLoading(false);
    });
  }, [moduleId]);

  useEffect(() => {
    // Reset code states when changing lessons within the same module
    setCodeOutputs({});
    setRunningCode({});
    setEditedCode({});
    setPracticeMode({});
    setPracticeFeedback({});
  }, [currentLessonIndex]);

  const runPythonCode = async (code: string, exampleIndex: number | string) => {
    setRunningCode({ ...runningCode, [exampleIndex]: true });
    setCodeOutputs({ ...codeOutputs, [exampleIndex]: '🚀 Running your code...\n' });
    setCurrentRunningKey(exampleIndex);

    try {
      // Run real Python code using Pyodide
      await executePython(code);
    } catch (error) {
      setCodeOutputs({ 
        ...codeOutputs, 
        [exampleIndex]: `❌ Oops! Something went wrong:\n${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    } finally {
      setRunningCode({ ...runningCode, [exampleIndex]: false });
    }
  };

  const handleCodeChange = (index: number | string, newCode: string) => {
    setEditedCode({ ...editedCode, [index]: newCode });
  };

  const resetCode = (index: number | string, originalCode: string) => {
    const newEdited = { ...editedCode };
    delete newEdited[index];
    setEditedCode(newEdited);
    const newOutputs = { ...codeOutputs };
    delete newOutputs[index];
    setCodeOutputs(newOutputs);
  };

  const currentLesson = lessons[currentLessonIndex];
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

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {/* Left: Back Button */}
          <div className="flex items-center">
            <Button 
              onClick={onBack}
              className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-4 rounded-2xl shadow-lg text-lg flex items-center gap-2"
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
              <Code className="w-8 h-8 text-white" />
            </div>
            <span className="text-gray-700 font-medium text-xl">LeetCode for Kids</span>
          </div>
        </div>

        {/* Lesson Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl py-2 px-6 shadow-lg">
            <div className="flex space-x-2">
              <Button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-large">
                Learn
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-600 px-6 py-3 rounded-xl font-large hover:bg-gray-50"
                onClick={onChallengeClick}
              >
                Challenge
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-600 px-6 py-3 rounded-xl font-large hover:bg-gray-50"
                onClick={onQuizClick}
              >
                Quiz
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Module Title with Robot */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="bg-blue-100 p-4 rounded-3xl">
                <span className="text-6xl">🤖</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {currentModule?.title || 'Loading...'}
                </h1>
                <p className="text-xl text-gray-600">
                  {currentModule?.description || ''}
                </p>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading lessons...</h2>
                <p className="text-gray-600">Getting everything ready for you!</p>
              </div>
            )}

            {/* No Lessons State */}
            {!isLoading && !currentLesson && lessons.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🚧</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h2>
                <p className="text-gray-600">We're working on lessons for this module. Check back soon!</p>
              </div>
            )}

            {/* Lesson Content */}
            {!isLoading && currentLesson && (
              <>
                <Card className="p-8 mb-8 rounded-3xl shadow-lg">
                  <div className="flex items-start space-x-6">
                    <div className="bg-orange-100 p-4 rounded-2xl">
                      <Lightbulb className="w-12 h-12 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentLesson.title}</h2>
                      
                      {/* Render lesson content properly */}
                      <div className="prose prose-lg max-w-none">
                        {/* Introduction */}
                        {currentLesson.content.introduction && (
                          <p className="text-lg text-gray-700 mb-6 leading-relaxed font-medium">
                            {currentLesson.content.introduction}
                          </p>
                        )}

                        {/* Video if available */}
                        {currentLesson.content.videoUrl && (
                          <div className="my-6 rounded-2xl overflow-hidden shadow-lg">
                            <iframe
                              width="100%"
                              height="400"
                              src={currentLesson.content.videoUrl}
                              title={currentLesson.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full"
                            ></iframe>
                          </div>
                        )}

                        {/* Main Content */}
                        {currentLesson.content.mainContent && currentLesson.content.mainContent.map((paragraph, index) => (
                          <p key={index} className="text-lg text-gray-600 mb-4 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}

                        {/* Code Examples - Interactive with Toggle */}
                        {currentLesson.content.codeExamples && currentLesson.content.codeExamples.length > 0 && (
                          <div className="my-6 space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="bg-blue-100 p-3 rounded-xl">
                                <Code className="w-8 h-8 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold text-gray-800">
                                  {Object.values(practiceMode).some(mode => mode) ? 'Try it Yourself' : 'Code Examples'}
                                </h3>
                                <p className="text-gray-600">See these examples in action! Try them yourself.</p>
                              </div>
                            </div>
                            {currentLesson.content.codeExamples.map((example, exampleIndex) => {
                              const exampleKey = `${currentLessonIndex}-example-${exampleIndex}`;
                              const isPracticeMode = practiceMode[exampleKey] || false;
                              const practiceCodeKey = `${exampleKey}-practice`;
                              
                              return (
                                <Card 
                                  key={exampleIndex} 
                                  className={`p-6 rounded-3xl shadow-lg border-2 ${
                                    isPracticeMode 
                                      ? 'border-green-200 bg-gradient-to-br from-green-50 to-white' 
                                      : 'border-blue-200 bg-gradient-to-br from-blue-50 to-white'
                                  }`}
                                >
                                  <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                      <h4 className="text-xl font-bold text-gray-800 mb-2">{example.title}</h4>
                                      {!isPracticeMode && (
                                        <p className="text-gray-700">{example.explanation}</p>
                                      )}
                                      {isPracticeMode && (() => {
                                        const matchingExercise = currentLesson.content.practiceExercises?.[exampleIndex];
                                        return matchingExercise ? (
                                          <p className="text-gray-700">{matchingExercise.description}</p>
                                        ) : (
                                          <p className="text-gray-700">
                                            Now it's your turn! Try writing similar code with your own values.
                                          </p>
                                        );
                                      })()}
                                    </div>
                                    
                                    {/* Toggle Button */}
                                    <Button
                                      size="sm"
                                      onClick={() => {
                                        setPracticeMode({ ...practiceMode, [exampleKey]: !isPracticeMode });
                                        // Reset code when switching modes
                                        if (!isPracticeMode) {
                                          // Switching to practice mode - clear the practice code
                                          const newEdited = { ...editedCode };
                                          delete newEdited[practiceCodeKey];
                                          setEditedCode(newEdited);
                                        }
                                      }}
                                      className={`${
                                        isPracticeMode
                                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                          : 'bg-green-600 hover:bg-green-700 text-white'
                                      } shrink-0 ml-4`}
                                    >
                                      {isPracticeMode ? '👁️ View Example' : '✏️ Now Try This!'}
                                    </Button>
                                  </div>

                                  {/* Practice Mode - Step-by-step instructions and hints */}
                                  {isPracticeMode && (() => {
                                    const matchingExercise = currentLesson.content.practiceExercises?.[exampleIndex];
                                    
                                    return matchingExercise && (matchingExercise.instructions.length > 0 || matchingExercise.hints.length > 0) && (
                                      <div className="mb-4 space-y-3">
                                        {/* Step-by-step instructions */}
                                        {matchingExercise.instructions.length > 0 && (
                                          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                                            <p className="text-blue-800 font-medium mb-2">📝 Steps:</p>
                                            <ol className="space-y-1">
                                              {matchingExercise.instructions.map((instruction, i) => (
                                                <li key={i} className="text-blue-700 flex items-start gap-2 text-sm">
                                                  <span className="text-blue-500 font-bold">{i + 1}.</span>
                                                  <span>{instruction}</span>
                                                </li>
                                              ))}
                                            </ol>
                                          </div>
                                        )}
                                        
                                        {/* Hints */}
                                        {matchingExercise.hints.length > 0 && (
                                          <div>
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              onClick={() => {
                                                const hintKey = `hints-${exampleKey}`;
                                                setEditedCode({ ...editedCode, [hintKey]: editedCode[hintKey] === 'shown' ? 'hidden' : 'shown' });
                                              }}
                                              className="border-yellow-300 bg-yellow-50 hover:bg-yellow-100 text-yellow-800"
                                            >
                                              {editedCode[`hints-${exampleKey}`] === 'shown' ? '🙈 Hide Hint' : '💡 Show Hint'}
                                            </Button>

                                            {editedCode[`hints-${exampleKey}`] === 'shown' && (
                                              <div className="mt-3 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-3">
                                                <p className="text-yellow-800 font-medium mb-2">💡 Hints:</p>
                                                <ul className="space-y-1">
                                                  {matchingExercise.hints.map((hint, i) => (
                                                    <li key={i} className="text-yellow-700 flex items-start gap-2 text-sm">
                                                      <span className="text-yellow-600">✦</span>
                                                      <span>{hint}</span>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })()}
                                  
                                  {/* Code Editor */}
                                  <div className="bg-gray-900 rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                      <span className={`${isPracticeMode ? 'text-green-400' : 'text-blue-400'} font-medium flex items-center gap-2`}>
                                        <Code className="w-5 h-5" />
                                        {isPracticeMode ? 'Practice Editor' : 'Python Code'}
                                      </span>
                                      <div className="flex gap-2">
                                        <Button 
                                          size="sm" 
                                          className={`${isPracticeMode ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                                          onClick={() => {
                                            const codeKey = isPracticeMode ? practiceCodeKey : exampleKey;
                                            const code = isPracticeMode 
                                              ? (editedCode[practiceCodeKey] || '') 
                                              : (editedCode[exampleKey] || example.code);
                                            runPythonCode(code, codeKey);
                                          }}
                                          disabled={runningCode[isPracticeMode ? practiceCodeKey : exampleKey]}
                                        >
                                          {runningCode[isPracticeMode ? practiceCodeKey : exampleKey] ? (
                                            <>
                                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                              Running...
                                            </>
                                          ) : (
                                            <>
                                              <Play className="w-4 h-4 mr-1" />
                                              Run Code
                                            </>
                                          )}
                                        </Button>
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                                          onClick={() => {
                                            const codeKey = isPracticeMode ? practiceCodeKey : exampleKey;
                                            resetCode(codeKey, isPracticeMode ? '' : example.code);
                                          }}
                                        >
                                          <RotateCcw className="w-4 h-4 mr-1" />
                                          Reset
                                        </Button>
                                      </div>
                                    </div>
                                    
                                    <MonacoEditor
                                      value={
                                        isPracticeMode 
                                          ? (editedCode[practiceCodeKey] || '# Write your code here\n\n') 
                                          : (editedCode[exampleKey] || example.code)
                                      }
                                      onChange={(newCode) => {
                                        const codeKey = isPracticeMode ? practiceCodeKey : exampleKey;
                                        handleCodeChange(codeKey, newCode);
                                      }}
                                      language="python"
                                      theme="vs-dark"
                                      height="250px"
                                    />
                                  </div>

                                  {/* Output Console */}
                                  {(codeOutputs[isPracticeMode ? practiceCodeKey : exampleKey]) && (
                                    <div className="mt-4 bg-gray-900 rounded-2xl p-6">
                                      <div className="flex items-center gap-2 mb-3">
                                        <Terminal className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 font-medium">Output:</span>
                                      </div>
                                      <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                                        {codeOutputs[isPracticeMode ? practiceCodeKey : exampleKey]}
                                      </pre>
                                    </div>
                                  )}

                                  {/* Feedback Section - Only in Practice Mode */}
                                  {isPracticeMode && (() => {
                                    const feedback = practiceFeedback[practiceCodeKey];
                                    
                                    return feedback && (
                                      <div className={`mt-4 border-2 rounded-2xl p-6 animate-pulse ${
                                        feedback.type === 'success' 
                                          ? 'bg-green-50 border-green-300' 
                                          : feedback.type === 'partial'
                                          ? 'bg-yellow-50 border-yellow-300'
                                          : 'bg-red-50 border-red-300'
                                      }`}>
                                        <div className="flex items-start gap-3">
                                          <div className={`text-4xl ${
                                            feedback.type === 'success' ? 'animate-bounce' : ''
                                          }`}>
                                            {feedback.type === 'success' ? '🎉' : feedback.type === 'partial' ? '💭' : '💡'}
                                          </div>
                                          <div className="flex-1">
                                            <p className={`text-xl font-bold mb-2 ${
                                              feedback.type === 'success' 
                                                ? 'text-green-800' 
                                                : feedback.type === 'partial'
                                                ? 'text-yellow-800'
                                                : 'text-red-800'
                                            }`}>
                                              {feedback.message}
                                            </p>
                                            {feedback.type === 'partial' && (
                                              <p className="text-yellow-700 text-sm">
                                                You're close! Keep trying!
                                              </p>
                                            )}
                                            {feedback.type === 'incorrect' && (
                                              <p className="text-red-700 text-sm">
                                                Check the hints for help. You can do this!
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })()}
                                </Card>
                              );
                            })}
                          </div>
                        )}

                        {/* Key Points */}
                        {currentLesson.content.keyPoints && currentLesson.content.keyPoints.length > 0 && (
                          <div className="my-6 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <span>🔑</span>
                              Key Points to Remember
                            </h3>
                            <ul className="space-y-2">
                              {currentLesson.content.keyPoints.map((point, index) => (
                                <li key={index} className="text-gray-700 flex items-start gap-2">
                                  <span className="text-yellow-600 font-bold">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}


                      </div>

                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* Navigation Buttons */}
            {!isLoading && lessons.length > 0 && (
              <div className="flex items-center justify-between gap-4">
                {/* Previous Lesson Button */}
                {currentLessonIndex > 0 ? (
                  <Button 
                    className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-6 rounded-2xl text-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => {
                      setCurrentLessonIndex(currentLessonIndex - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <span className="mr-3">←</span>
                    Previous Lesson
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {/* Next Lesson / Go to Challenge Button */}
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200 ml-auto"
                  onClick={async () => {
                    // Mark current lesson as completed before moving on
                    if (currentLesson && currentModule) {
                      await markLessonCompleted(currentLesson.id, currentModule.id);
                    }
                    
                    if (currentLessonIndex < lessons.length - 1) {
                      // Move to next lesson
                      const nextLessonIndex = currentLessonIndex + 1;
                      setCurrentLessonIndex(nextLessonIndex);
                      
                      // Track current lesson position
                      if (currentModule && lessons[nextLessonIndex]) {
                        setCurrentLesson(currentModule.id, lessons[nextLessonIndex].id, nextLessonIndex);
                      }
                      
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      // Last lesson - go to challenge
                      onChallengeClick?.();
                    }
                  }}
                >
                  <span className="mr-3">{currentLessonIndex < lessons.length - 1 ? '🚀' : '🏆'}</span>
                  {currentLessonIndex < lessons.length - 1 
                    ? `Next Lesson: ${lessons[currentLessonIndex + 1]?.title}`
                    : 'Go to Challenge'
                  }
                  <span className="ml-3">→</span>
                </Button>
              </div>
            )}
          </div>

          {/* Progress Sidebar */}
          {!isLoading && lessons.length > 0 && (
            <div className="w-80">
            <Card className="p-6 rounded-3xl shadow-lg sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-3" />
                Module Progress
              </h3>
              
              <div className="space-y-4">
                {lessons.map((lesson, index) => {
                  // Check completion status from progress manager
                  const isCompleted = isLessonCompleted(lesson.id);
                  const isCurrent = index === currentLessonIndex;
                  const isLocked = !isCompleted && index > currentLessonIndex;
                  
                  return (
                    <div 
                      key={lesson.id}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                        isCurrent 
                          ? 'bg-blue-50' 
                          : isCompleted 
                            ? 'hover:bg-gray-50' 
                            : 'text-gray-400'
                      }`}
                      onClick={() => !isLocked && setCurrentLessonIndex(index)}
                    >
                      <span className={`font-medium ${
                        isCurrent 
                          ? 'text-blue-800' 
                          : isCompleted 
                            ? 'text-gray-700' 
                            : 'text-gray-400'
                      }`}>
                        {lesson.title}
                      </span>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : isCurrent ? (
                        <div className="bg-blue-600 p-1 rounded-full">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <Clock className="w-6 h-6" />
                      )}
                    </div>
                  );
                })}
                
                <div 
                  className="flex items-center justify-between bg-orange-50 p-3 rounded-xl cursor-pointer hover:bg-orange-100 transition-colors"
                  onClick={onChallengeClick}
                >
                  <span className="text-orange-800 font-medium">Challenge Mode!</span>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Trophy className="w-4 h-4" />
                  </Button>
                </div>
                
                <div 
                  className="flex items-center justify-between bg-purple-50 p-3 rounded-xl cursor-pointer hover:bg-purple-100 transition-colors"
                  onClick={onQuizClick}
                >
                  <span className="text-purple-800 font-medium">Take Quiz!</span>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Fun Character */}
              <div className="mt-8 text-center">
                <div className="bg-yellow-100 p-6 rounded-2xl">
                  <div className="text-6xl mb-3">🤖</div>
                  <p className="text-yellow-800 font-medium">
                    "Great job learning about variables! You're becoming a real programmer! 🎉"
                  </p>
                </div>
              </div>
            </Card>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
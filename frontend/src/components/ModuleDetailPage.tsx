import { useState, useEffect } from 'react';
import { ArrowLeft, Search, CheckCircle, Clock, Play, Code, Lightbulb, Star, Trophy, RotateCcw, Terminal } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import exampleImage from 'figma:asset/92f61c2fba9265b29974c4ad1a13c4c9ada6cd46.png';
import { getLessonsByModuleId, getModuleById, Lesson, Module } from '../api/data';
import { isLessonCompleted, markLessonCompleted } from '../utils/progressManager';

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
  const [codeOutputs, setCodeOutputs] = useState<Record<number, string>>({});
  const [runningCode, setRunningCode] = useState<Record<number, boolean>>({});
  const [editedCode, setEditedCode] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(true);

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
  }, [currentLessonIndex]);

  // Check if all lessons are completed and auto-navigate to challenge
  // Only navigate once when lessons are first completed, not on every render
  const [hasNavigatedToChallenge, setHasNavigatedToChallenge] = useState(false);
  
  useEffect(() => {
    if (lessons.length > 0 && !isLoading && !hasNavigatedToChallenge) {
      const allLessonsCompleted = lessons.every(lesson => isLessonCompleted(lesson.id));
      
      // If all lessons are completed and challenge button exists, auto-navigate
      // This means user finished all lessons, so take them to challenge
      if (allLessonsCompleted && onChallengeClick && lessons.length > 0) {
        setHasNavigatedToChallenge(true);
        // Small delay to show completion state, then navigate
        const timer = setTimeout(() => {
          onChallengeClick();
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [lessons, isLoading, onChallengeClick, hasNavigatedToChallenge]);
  
  // Reset navigation flag when module changes
  useEffect(() => {
    setHasNavigatedToChallenge(false);
  }, [moduleId]);

  const runPythonCode = async (code: string, exampleIndex: number) => {
    setRunningCode({ ...runningCode, [exampleIndex]: true });
    setCodeOutputs({ ...codeOutputs, [exampleIndex]: '🚀 Running your code...\n' });

    try {
      // Simulate Python code execution
      // In a real implementation, you would use Skulpt or Pyodide
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const output = simulatePythonExecution(code);
      setCodeOutputs({ ...codeOutputs, [exampleIndex]: output });
    } catch (error) {
      setCodeOutputs({ 
        ...codeOutputs, 
        [exampleIndex]: `❌ Oops! Something went wrong:\n${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    } finally {
      setRunningCode({ ...runningCode, [exampleIndex]: false });
    }
  };

  const simulatePythonExecution = (code: string): string => {
    let output = '';
    const variables: Record<string, any> = {};
    
    try {
      // Remove comments and split into lines
      const lines = code.split('\n').map(line => {
        const commentIndex = line.indexOf('#');
        return commentIndex >= 0 ? line.substring(0, commentIndex) : line;
      }).filter(line => line.trim().length > 0);
      
      for (const line of lines) {
        const trimmed = line.trim();
        
        // Handle input() - simulate with default values
        if (trimmed.includes('input(')) {
          const match = trimmed.match(/(\w+)\s*=\s*input\((.*)\)/);
          if (match) {
            const varName = match[1];
            const prompt = match[2].replace(/['"]/g, '');
            // Use a simulated default value
            const simulatedInput = prompt.includes('name') ? 'Alex' : 
                                  prompt.includes('age') ? '10' : 
                                  prompt.includes('color') ? 'blue' : 
                                  'example';
            variables[varName] = simulatedInput;
            output += `${prompt} ${simulatedInput}\n`;
          }
          continue;
        }
        
        // Handle variable assignment
        if (trimmed.includes('=') && !trimmed.includes('==') && !trimmed.startsWith('print')) {
          const parts = trimmed.split('=');
          if (parts.length >= 2) {
            const varName = parts[0].trim();
            const value = evaluateExpression(parts.slice(1).join('=').trim(), variables);
            variables[varName] = value;
          }
          continue;
        }
        
        // Handle print statements
        if (trimmed.startsWith('print(')) {
          const match = trimmed.match(/print\((.*)\)/);
          if (match) {
            const args = match[1];
            const result = evaluateExpression(args, variables);
            output += result + '\n';
          }
        }
      }
      
      if (!output) {
        output = '✅ Code executed successfully! (No output to display)\n';
      }
      
      return '✅ Success!\n\n' + output;
    } catch (error) {
      return `❌ Error: ${error instanceof Error ? error.message : 'Something went wrong!'}\n\nDon't worry, errors help us learn! 💪\nTry checking your code for typos or missing quotes.`;
    }
  };

  const evaluateExpression = (expr: string, variables: Record<string, any>): string => {
    expr = expr.trim();
    
    // Handle multiple arguments (comma-separated) - split carefully to avoid splitting inside strings
    if (expr.includes(',')) {
      const parts: string[] = [];
      let current = '';
      let inString = false;
      let stringChar = '';
      
      for (let i = 0; i < expr.length; i++) {
        const char = expr[i];
        if ((char === '"' || char === "'") && (i === 0 || expr[i-1] !== '\\')) {
          if (!inString) {
            inString = true;
            stringChar = char;
          } else if (char === stringChar) {
            inString = false;
          }
        }
        
        if (char === ',' && !inString) {
          parts.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      if (current) parts.push(current.trim());
      
      if (parts.length > 1) {
        return parts.map(part => evaluateExpression(part, variables)).join(' ');
      }
    }
    
    // Handle string literals with quotes
    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
      return expr.slice(1, -1);
    }
    
    // Handle f-strings (simplified)
    if (expr.startsWith('f"') || expr.startsWith("f'")) {
      let str = expr.slice(2, -1);
      // Replace {variable} with actual values
      const matches = str.match(/\{([^}]+)\}/g);
      if (matches) {
        matches.forEach(match => {
          const varName = match.slice(1, -1);
          const value = variables[varName] ?? varName;
          str = str.replace(match, String(value));
        });
      }
      return str;
    }
    
    // Handle variable references
    if (variables.hasOwnProperty(expr)) {
      return String(variables[expr]);
    }
    
    // Handle numbers
    if (!isNaN(Number(expr))) {
      return String(expr);
    }
    
    // Handle int() conversion
    if (expr.startsWith('int(')) {
      const inner = expr.slice(4, -1);
      const value = evaluateExpression(inner, variables);
      return String(Math.floor(Number(value)));
    }
    
    // Handle str() conversion
    if (expr.startsWith('str(')) {
      const inner = expr.slice(4, -1);
      return evaluateExpression(inner, variables);
    }
    
    // Handle len() function
    if (expr.startsWith('len(')) {
      const inner = expr.slice(4, -1);
      const value = evaluateExpression(inner, variables);
      return String(value.length);
    }
    
    // Handle .upper(), .lower(), .title() string methods
    if (expr.includes('.upper()')) {
      const varName = expr.replace('.upper()', '').trim();
      const value = variables[varName] ?? varName;
      return String(value).toUpperCase();
    }
    if (expr.includes('.lower()')) {
      const varName = expr.replace('.lower()', '').trim();
      const value = variables[varName] ?? varName;
      return String(value).toLowerCase();
    }
    if (expr.includes('.title()')) {
      const varName = expr.replace('.title()', '').trim();
      const value = variables[varName] ?? varName;
      return String(value).replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
    
    // Handle simple math expressions with variables
    try {
      let evalExpr = expr;
      // Replace variables in the expression
      Object.keys(variables).forEach(varName => {
        const regex = new RegExp(`\\b${varName}\\b`, 'g');
        evalExpr = evalExpr.replace(regex, String(variables[varName]));
      });
      
      // Check if it's a safe math expression
      if (/^[\d\s+\-*/(). ]+$/.test(evalExpr)) {
        const result = eval(evalExpr);
        return String(result);
      }
    } catch {
      // Continue to default return
    }
    
    // Handle string concatenation with +
    if (expr.includes('+') && !expr.match(/^\d+\s*\+/)) {
      const parts = expr.split('+').map(part => {
        const trimmed = part.trim();
        if (trimmed.startsWith('"') || trimmed.startsWith("'")) {
          return trimmed.slice(1, -1);
        }
        if (variables.hasOwnProperty(trimmed)) {
          return String(variables[trimmed]);
        }
        return trimmed;
      });
      return parts.join('');
    }
    
    return expr;
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

        {/* Lesson Navigation Tabs */}
        <div className="flex justify-center mb-16">
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
                      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        {currentLesson.content.introduction}
                      </p>
                      
                      {currentLesson.content.mainContent.map((paragraph, index) => (
                        <p key={index} className="text-lg text-gray-600 mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                      
                      {/* Video Embed Section */}
                      {currentLesson.content.videoUrl && (
                        <div className="my-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="text-3xl">🎥</div>
                            <h3 className="text-xl font-bold text-purple-800">Watch & Learn</h3>
                          </div>
                          <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                              className="absolute top-0 left-0 w-full h-full"
                              src={currentLesson.content.videoUrl}
                              title="Python Tutorial Video"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          <p className="text-center text-purple-700 mt-4 font-medium">
                            📺 Watch this video to understand the concept better! 🌟
                          </p>
                        </div>
                      )}
                      
                      {/* Code Examples */}
                      {currentLesson.content.codeExamples && currentLesson.content.codeExamples.map((example, index) => (
                        <div key={index} className="mt-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-3">{example.title}</h3>
                          
                          {/* Tip Box */}
                          {index === 0 && (
                            <div className="mb-4 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                              <div className="flex items-start gap-3">
                                <span className="text-2xl">💡</span>
                                <div>
                                  <p className="text-blue-800 font-medium">Try it yourself!</p>
                                  <p className="text-blue-700 text-sm mt-1">
                                    You can edit the code and click "Run Code" to see what happens! Don't be afraid to experiment! 🚀
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <div className="bg-gray-900 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-green-400 font-medium">Python Code</span>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  className="bg-blue-600 hover:bg-blue-700"
                                  onClick={() => runPythonCode(editedCode[index] || example.code, index)}
                                  disabled={runningCode[index]}
                                >
                                  {runningCode[index] ? (
                                    <>
                                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                      Running...
                                    </>
                                  ) : (
                                    <>
                                      <Play className="w-4 h-4 mr-2" />
                                      Run Code
                                    </>
                                  )}
                                </Button>
                                {editedCode[index] && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white"
                                    onClick={() => {
                                      const newEdited = { ...editedCode };
                                      delete newEdited[index];
                                      setEditedCode(newEdited);
                                      const newOutputs = { ...codeOutputs };
                                      delete newOutputs[index];
                                      setCodeOutputs(newOutputs);
                                    }}
                                  >
                                    <RotateCcw className="w-3 h-3 mr-1" />
                                    Reset
                                  </Button>
                                )}
                              </div>
                            </div>
                            <div className="relative">
                              <textarea
                                className="w-full bg-gray-800 text-white text-lg font-mono p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                rows={Math.max(example.code.split('\n').length, 3)}
                                value={editedCode[index] !== undefined ? editedCode[index] : example.code}
                                onChange={(e) => setEditedCode({ ...editedCode, [index]: e.target.value })}
                                spellCheck={false}
                                placeholder="# Write your Python code here..."
                              />
                              {editedCode[index] && editedCode[index] !== example.code && (
                                <div className="absolute top-2 right-2">
                                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                    ✏️ Edited
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Code Output Console */}
                          {codeOutputs[index] && (
                            <div className="mt-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-green-500 shadow-lg animate-in fade-in duration-300">
                              <div className="flex items-center gap-2 mb-4">
                                <Terminal className="w-5 h-5 text-green-400" />
                                <span className="text-green-400 font-bold">Output Console</span>
                                <div className="flex gap-1 ml-auto">
                                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                              </div>
                              <div className="bg-black rounded-lg p-4 min-h-[60px]">
                                <pre className="text-green-300 text-base whitespace-pre-wrap font-mono leading-relaxed">
                                  {codeOutputs[index]}
                                </pre>
                              </div>
                              {codeOutputs[index].includes('✅') && (
                                <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
                                  <span>🎉</span>
                                  <span className="font-medium">Great job! Your code ran successfully!</span>
                                </div>
                              )}
                            </div>
                          )}
                          
                          <p className="text-gray-600 mt-3">{example.explanation}</p>
                        </div>
                      ))}
                      
                      {/* Key Points */}
                      {currentLesson.content.keyPoints && currentLesson.content.keyPoints.length > 0 && (
                        <div className="mt-6 bg-blue-50 p-6 rounded-2xl">
                          <h3 className="text-xl font-bold text-blue-800 mb-4">🔑 Key Points to Remember</h3>
                          <ul className="space-y-2">
                            {currentLesson.content.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-600 mr-2">✓</span>
                                <span className="text-blue-700">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* Next Lesson Button */}
            {!isLoading && lessons.length > 0 && (
              <div className="text-center">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                  onClick={() => {
                    if (currentLessonIndex < lessons.length - 1) {
                      setCurrentLessonIndex(currentLessonIndex + 1);
                    }
                  }}
                  disabled={currentLessonIndex >= lessons.length - 1}
                >
                  <span className="mr-3">🚀</span>
                  {currentLessonIndex < lessons.length - 1 
                    ? `Next Lesson: ${lessons[currentLessonIndex + 1]?.title}`
                    : 'Module Complete!'
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
                  const isCompleted = lesson.completed;
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
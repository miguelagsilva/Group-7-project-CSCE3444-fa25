import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Search, Play, Code, RotateCcw, Terminal } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface FreeCodePageProps {
  onBack: () => void;
  onLearnClick?: () => void;
  onProgressClick?: () => void;
}

export function FreeCodePage({ onBack, onLearnClick, onProgressClick }: FreeCodePageProps) {
  const [code, setCode] = useState(`# Welcome to Free Code! 🚀
# Write any Python code you want here and click "Run Code" to see the output

print("Hello, World! 👋")
print("I'm learning Python!")

# Try creating variables
name = "Code Explorer"
age = 10

print(f"My name is {name} and I'm {age} years old!")

# Try some math
x = 5
y = 3
print(f"{x} + {y} = {x + y}")
`);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const pyodideRef = useRef<any>(null);

useEffect(() => {
  const loadPyodide = async () => {
    setOutput('⏳ Loading Python runtime...');
    try {
      // Dynamically import the real Pyodide loader
      const { loadPyodide } = await import('https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.mjs');

      const pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
      });

      pyodideRef.current = pyodide;
      setOutput('✅ Python runtime loaded! Ready to run code.');
    } catch (err) {
      setOutput('❌ Failed to load Pyodide. Check your internet connection.');
    }
  };

  loadPyodide();
}, []);

  const runCode = async () => {
    if (!pyodideRef.current) {
      setOutput('⚙️ Pyodide is still loading, please wait...');
      return;
    }

    setIsRunning(true);
    setOutput('🚀 Running your Python code...\n');

    try {
      // Capture print() output
      let capturedOutput = '';
      const pyodide = pyodideRef.current;
      pyodide.setStdout({
        batched: (text: string) => {
          capturedOutput += text+'\n';
        },
      });
      pyodide.setStderr({
        batched: (text: string) => {
          capturedOutput += `❌ ${text}`;
        },
      });

      // Actually run the Python code
      await pyodide.runPythonAsync(code);
      setOutput(`✅ Success!\n\n${capturedOutput || '✅ Code ran successfully (no output).'}`);
    } catch (error: any) {
      setOutput(
        `❌ Python Error:\n${error.message || error.toString()}\n\n💪 Remember: every error teaches you something new!`
      );
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(`# Welcome to Free Code! 🚀
# Write any Python code you want here and click "Run Code" to see the output

print("Hello, World! 👋")
print("I'm learning Python!")

name = "Code Explorer"
age = 10
print(f"My name is {name} and I'm {age} years old!")
x = 5
y = 3
print(f"{x} + {y} = {x + y}")
`);
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 relative overflow-hidden">
      {/* Wavy background layers */}
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
              <Button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium">
                Free Code
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

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          {/* Header Card */}
          <Card className="p-8 mb-6 rounded-3xl shadow-lg bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="text-5xl">🎨</div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Free Code Playground</h2>
                <p className="text-lg text-gray-700 mb-2">
                  Welcome to your personal Python playground! Write any code you want and experiment freely. 🚀
                </p>
                <p className="text-gray-600">
                  Try creating variables, using functions, doing math, or anything else you've learned. There are no rules here - just have fun coding!
                </p>
              </div>
            </div>
          </Card>

          {/* Code Editor Card */}
          <Card className="p-6 rounded-3xl shadow-lg mb-4">
            <div className="bg-gray-900 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-medium">Python Code Editor</span>
                  <div className="flex gap-1 ml-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={runCode}
                    disabled={isRunning}
                  >
                    {isRunning ? (
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
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white"
                    onClick={resetCode}
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Reset
                  </Button>
                </div>
              </div>
              <textarea
                className="w-full bg-gray-800 text-white text-lg font-mono p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                rows={18}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                placeholder="# Write your Python code here..."
              />
            </div>
          </Card>

          {/* Output Console */}
          {output && (
            <Card className="p-6 rounded-3xl shadow-lg">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-green-500 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-bold">Output Console</span>
                  <div className="flex gap-1 ml-auto">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="bg-black rounded-lg p-4 min-h-[120px]">
                  <pre className="text-green-300 text-base whitespace-pre-wrap font-mono leading-relaxed">
                    {output}
                  </pre>
                </div>
                {output.includes('✅') && (
                  <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
                    <span>🎉</span>
                    <span className="font-medium">Great job! Your code ran successfully!</span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Tips Card */}
          <Card className="p-6 rounded-3xl shadow-lg mt-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
            <div className="flex items-start gap-3">
              <span className="text-3xl">💡</span>
              <div>
                <h3 className="text-xl font-bold text-yellow-800 mb-2">Coding Tips</h3>
                <ul className="space-y-2 text-yellow-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Try experimenting with different Python concepts you've learned!</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Don't be afraid to make mistakes - they help you learn!</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Use print() statements to see what your code is doing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Write comments with # to remember what your code does</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

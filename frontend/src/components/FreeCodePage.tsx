import { useState } from 'react';
import { ArrowLeft, Play, Code, RotateCcw, Terminal } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CodeEditor } from './CodeEditor';

interface FreeCodePageProps {
  onBack: () => void;
  onLearnClick?: () => void;
}

export function FreeCodePage({ onBack, onLearnClick }: FreeCodePageProps) {
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

  const runCode = async () => {
    setIsRunning(true);
    setOutput('🚀 Running your code...\n');

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const result = simulatePythonExecution(code);
      setOutput(result);
    } catch (error) {
      setOutput(`❌ Oops! Something went wrong:\n${error instanceof Error ? error.message : 'Unknown error'}\n\nDon't worry, errors help us learn! 💪`);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(`# Welcome to Free Code! 🚀
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
    setOutput('');
  };

  const simulatePythonExecution = (code: string): string => {
    let output = '';
    const variables: Record<string, any> = {};
    
    try {
      const lines = code.split('\n').map(line => {
        const commentIndex = line.indexOf('#');
        return commentIndex >= 0 ? line.substring(0, commentIndex) : line;
      }).filter(line => line.trim().length > 0);
      
      for (const line of lines) {
        const trimmed = line.trim();
        
        if (trimmed.includes('input(')) {
          const match = trimmed.match(/(\w+)\s*=\s*input\((.*)\)/);
          if (match) {
            const varName = match[1];
            const prompt = match[2].replace(/['"]/g, '');
            const simulatedInput = prompt.includes('name') ? 'Alex' : 
                                  prompt.includes('age') ? '10' : 
                                  prompt.includes('color') ? 'blue' : 
                                  'example';
            variables[varName] = simulatedInput;
            output += `${prompt} ${simulatedInput}\n`;
          }
          continue;
        }
        
        if (trimmed.includes('=') && !trimmed.includes('==') && !trimmed.startsWith('print')) {
          const parts = trimmed.split('=');
          if (parts.length >= 2) {
            const varName = parts[0].trim();
            const value = evaluateExpression(parts.slice(1).join('=').trim(), variables);
            variables[varName] = value;
          }
          continue;
        }
        
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
    
    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
      return expr.slice(1, -1);
    }
    
    if (expr.startsWith('f"') || expr.startsWith("f'")) {
      let str = expr.slice(2, -1);
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
    
    if (variables.hasOwnProperty(expr)) {
      return String(variables[expr]);
    }
    
    if (!isNaN(Number(expr))) {
      return String(expr);
    }
    
    if (expr.startsWith('int(')) {
      const inner = expr.slice(4, -1);
      const value = evaluateExpression(inner, variables);
      return String(Math.floor(Number(value)));
    }
    
    if (expr.startsWith('str(')) {
      const inner = expr.slice(4, -1);
      return evaluateExpression(inner, variables);
    }
    
    if (expr.startsWith('len(')) {
      const inner = expr.slice(4, -1);
      const value = evaluateExpression(inner, variables);
      return String(value.length);
    }
    
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
    
    try {
      let evalExpr = expr;
      Object.keys(variables).forEach(varName => {
        const regex = new RegExp(`\\b${varName}\\b`, 'g');
        evalExpr = evalExpr.replace(regex, String(variables[varName]));
      });
      
      if (/^[\d\s+\-*/(). ]+$/.test(evalExpr)) {
        const result = eval(evalExpr);
        return String(result);
      }
    } catch {
      // Continue to default return
    }
    
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
              <Terminal className="w-8 h-8 text-white" />
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
              <Button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium">
                Free Code
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
            <div className="rounded-2xl overflow-hidden">
              <div className="bg-gray-900 px-6 pt-6 pb-4">
                <div className="flex items-center justify-between">
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
              </div>
              <CodeEditor
                value={code}
                onChange={setCode}
                placeholder="# Write your Python code here..."
                minHeight="500px"
                showLineNumbers={true}
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
import { ArrowLeft, Code, Lightbulb, Book } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { PythonEditor } from './PythonEditor';

interface FreeCodePageProps {
  onBack: () => void;
  onLearnClick: () => void;
}

export function FreeCodePage({ onBack, onLearnClick }: FreeCodePageProps) {
  const defaultCode = `# Welcome to Free Code!
# Write any Python code you want here!

print("Hello, World!")`;

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
          <div className="flex items-center">
            <Button 
              onClick={onBack}
              className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-4 rounded-2xl shadow-lg text-lg flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Button>
          </div>
          
          <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-blue-600 text-3xl font-bold tracking-wide">
              LeetCode for Kids
            </h1>
          </div>
          
          <div className="flex items-center space-x-4 invisible">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Code className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          <div className="flex-1">
            {/* Title Section */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="bg-green-100 p-4 rounded-3xl">
                <span className="text-6xl">🎨</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  Free Code Playground
                </h1>
                <p className="text-xl text-gray-600">
                  Experiment with Python! Write any code you want and see it run.
                </p>
              </div>
            </div>

            <Card className="p-8 mb-8 rounded-3xl shadow-lg">
              {/* Info Box */}
              <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-blue-800 mb-2">Welcome to Your Coding Playground!</h3>
                    <p className="text-blue-700 mb-3">
                      This is your space to experiment and get creative with Python. Try anything you want!
                    </p>
                    <ul className="space-y-2 text-blue-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">✦</span>
                        <span>Write any Python code and click "Run Code" to see it work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">✦</span>
                        <span>Make mistakes - that's how we learn!</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">✦</span>
                        <span>Try combining different things you've learned</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Python Editor Component */}
              <PythonEditor
                initialCode={defaultCode}
                height="700px"
                showOutput={true}
                showControls={true}
                autosaveKey="lc4k_freecode_v1"
              />
            </Card>

            {/* Navigate to Lessons */}
            <div className="flex justify-center">
              <Button
                onClick={onLearnClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Book className="w-6 h-6 mr-3" />
                Go to Lessons
              </Button>
            </div>
          </div>

          {/* Sidebar with Tips */}
          <div className="w-80">
            <Card className="p-6 rounded-3xl shadow-lg sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 text-yellow-500 mr-3" />
                Quick Tips
              </h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-blue-800 font-medium mb-2">💡 Print Something</p>
                  <code className="text-sm text-blue-700 bg-white px-2 py-1 rounded">
                    print("Hello!")
                  </code>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-green-800 font-medium mb-2">🎯 Variables</p>
                  <code className="text-sm text-green-700 bg-white px-2 py-1 rounded block mb-1">
                    name = "Alex"
                  </code>
                  <code className="text-sm text-green-700 bg-white px-2 py-1 rounded block">
                    print(name)
                  </code>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl">
                  <p className="text-purple-800 font-medium mb-2">➕ Math</p>
                  <code className="text-sm text-purple-700 bg-white px-2 py-1 rounded block mb-1">
                    result = 5 + 3
                  </code>
                  <code className="text-sm text-purple-700 bg-white px-2 py-1 rounded block">
                    print(result)
                  </code>
                </div>

                <div className="bg-orange-50 p-4 rounded-xl">
                  <p className="text-orange-800 font-medium mb-2">🔄 Loops</p>
                  <code className="text-sm text-orange-700 bg-white px-2 py-1 rounded block mb-1">
                    for i in range(3):
                  </code>
                  <code className="text-sm text-orange-700 bg-white px-2 py-1 rounded block ml-4">
                    {"  "}print(i)
                  </code>
                </div>
              </div>

              {/* Fun Character */}
              <div className="mt-8 text-center">
                <div className="bg-yellow-100 p-6 rounded-2xl">
                  <div className="text-6xl mb-3">🚀</div>
                  <p className="text-yellow-800 font-medium">
                    "Have fun coding! Try combining different ideas!"
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

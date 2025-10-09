import { ArrowLeft, Search, CheckCircle, Clock, Play, Code, Lightbulb, Star, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import exampleImage from 'figma:asset/92f61c2fba9265b29974c4ad1a13c4c9ada6cd46.png';

interface ModuleDetailPageProps {
  onBack: () => void;
  onProgressClick?: () => void;
  onPracticeClick?: () => void;
  onChallengeClick?: () => void;
  onQuizClick?: () => void;
}

export function ModuleDetailPage({ onBack, onProgressClick, onPracticeClick, onChallengeClick, onQuizClick }: ModuleDetailPageProps) {
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
                onClick={onPracticeClick}
              >
                Practice
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
              <Button 
                variant="ghost" 
                className="text-gray-600 px-6 py-3 rounded-xl font-large hover:bg-gray-50"
                onClick={onProgressClick}
              >
                Progress
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
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Variables & Data Types</h1>
                <p className="text-xl text-gray-600">Learn how to store and use different types of information in Python!</p>
              </div>
            </div>

            {/* What is a Variable? Section */}
            <Card className="p-8 mb-8 rounded-3xl shadow-lg">
              <div className="flex items-start space-x-6">
                <div className="bg-orange-100 p-4 rounded-2xl">
                  <Lightbulb className="w-12 h-12 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">What is a Variable?</h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Think of a variable like a special box where you can store things! 📦 
                    Just like how you might have a box labeled "toys" or "books", 
                    variables have names and can hold different types of information.
                  </p>
                  
                  {/* Code Example */}
                  <div className="bg-gray-900 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-green-400 font-medium">Python Code</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-2" />
                        Run Code
                      </Button>
                    </div>
                    <pre className="text-white text-lg">
{`# Creating variables is like labeling boxes!
my_name = "Alex"
my_age = 12
favorite_color = "blue"

print("Hi! My name is", my_name)
print("I am", my_age, "years old")
print("My favorite color is", favorite_color)`}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>

            {/* Types of Data Section */}
            <Card className="p-8 mb-8 rounded-3xl shadow-lg">
              <div className="flex items-start space-x-6">
                <div className="bg-green-100 p-4 rounded-2xl">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <span className="text-2xl">🎨</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Types of Data</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Just like you have different types of things in real life, Python has different types of data!
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Text (String) */}
                    <div className="bg-purple-50 p-6 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">📝</span>
                        <h3 className="text-xl font-bold text-purple-800">Text (String)</h3>
                      </div>
                      <p className="text-purple-700 mb-3">Words, sentences, and letters</p>
                      <div className="bg-white p-3 rounded-xl">
                        <code className="text-purple-800">"Hello World!"</code>
                      </div>
                    </div>

                    {/* Numbers (Integer) */}
                    <div className="bg-blue-50 p-6 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">🔢</span>
                        <h3 className="text-xl font-bold text-blue-800">Whole Numbers</h3>
                      </div>
                      <p className="text-blue-700 mb-3">Numbers without decimals</p>
                      <div className="bg-white p-3 rounded-xl">
                        <code className="text-blue-800">42</code>
                      </div>
                    </div>

                    {/* Decimal Numbers (Float) */}
                    <div className="bg-green-50 p-6 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">🎯</span>
                        <h3 className="text-xl font-bold text-green-800">Decimal Numbers</h3>
                      </div>
                      <p className="text-green-700 mb-3">Numbers with decimal points</p>
                      <div className="bg-white p-3 rounded-xl">
                        <code className="text-green-800">3.14</code>
                      </div>
                    </div>

                    {/* True/False (Boolean) */}
                    <div className="bg-red-50 p-6 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">✅</span>
                        <h3 className="text-xl font-bold text-red-800">True or False</h3>
                      </div>
                      <p className="text-red-700 mb-3">Yes or No answers</p>
                      <div className="bg-white p-3 rounded-xl">
                        <code className="text-red-800">True</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Fun Example Section */}
            <Card className="p-8 mb-8 rounded-3xl shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-3xl mr-4">🎮</span>
                Let's Make a Game Character!
              </h2>
              
              <div className="bg-gray-900 rounded-2xl p-6">
                <pre className="text-white text-lg">
{`# Let's create a superhero character!
hero_name = "Code Crusader"
hero_level = 1
hero_power = 85.5
has_cape = True

print("🦸 Meet our hero:", hero_name)
print("⭐ Level:", hero_level)
print("💪 Power Level:", hero_power)
print("🦸‍♂️ Has a cape:", has_cape)

# Output:
# 🦸 Meet our hero: Code Crusader
# ⭐ Level: 1
# 💪 Power Level: 85.5
# 🦸‍♂️ Has a cape: True`}
                </pre>
              </div>
            </Card>

            {/* Next Lesson Button */}
            <div className="text-center">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <span className="mr-3">🚀</span>
                Next Lesson: Numbers
                <span className="ml-3">→</span>
              </Button>
            </div>
          </div>

          {/* Progress Sidebar */}
          <div className="w-80">
            <Card className="p-6 rounded-3xl shadow-lg sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-3" />
                Module Progress
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Introduction</span>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                
                <div className="flex items-center justify-between bg-blue-50 p-3 rounded-xl">
                  <span className="text-blue-800 font-medium">Variables & Data Types</span>
                  <div className="bg-blue-600 p-1 rounded-full">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-gray-400">
                  <span>Variables in Action</span>
                  <Clock className="w-6 h-6" />
                </div>
                
                <div className="flex items-center justify-between text-gray-400">
                  <span>Numbers</span>
                  <Clock className="w-6 h-6" />
                </div>
                
                <div 
                  className="flex items-center justify-between bg-green-50 p-3 rounded-xl cursor-pointer hover:bg-green-100 transition-colors"
                  onClick={onPracticeClick}
                >
                  <span className="text-green-800 font-medium">Practice Time!</span>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
                
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
        </div>
      </div>
    </div>
  );
}
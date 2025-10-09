import { ArrowLeft, Search, User, Edit3, Star, Award, Code, Zap, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface ProgressPageProps {
  onBack: () => void;
}

export function ProgressPage({ onBack }: ProgressPageProps) {
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

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <div className="flex space-x-2">
              <Button variant="ghost" className="text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50">
                Learn
              </Button>
              <Button variant="ghost" className="text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50">
                Practice
              </Button>
              <Button variant="ghost" className="text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50">
                Challenge
              </Button>
              <Button variant="ghost" className="text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50">
                Quiz
              </Button>
              <Button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium">
                Progress
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Profile Sidebar */}
          <div className="w-72">
            {/* User Profile Card */}
            <Card className="p-6 rounded-3xl shadow-lg mb-4">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-4xl">🦸</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">Alex Chen</h2>
                <p className="text-gray-600 mb-2">Age 10 | Level 3</p>
                <div className="flex justify-center">
                  <Badge className="bg-yellow-100 text-yellow-800 px-3 py-1">
                    ⭐ Rising Star
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Avatar Selection */}
            <Card className="p-4 rounded-3xl shadow-lg mb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">Choose Your Avatar</h3>
              <div className="flex justify-center space-x-4 mb-4">
                {/* Princess inspired */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                    <span className="text-xl">👸</span>
                  </div>
                  <span className="text-xs text-gray-600 mt-1 font-medium">Princess</span>
                </div>
                
                {/* Superhero inspired */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg ring-4 ring-blue-200">
                    <span className="text-xl">🦸</span>
                  </div>
                  <span className="text-xs text-gray-600 mt-1 font-medium">Hero</span>
                </div>
                
                {/* Lion inspired */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                    <span className="text-xl">🦁</span>
                  </div>
                  <span className="text-xs text-gray-600 mt-1 font-medium">Lion</span>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </Card>
          </div>

          {/* Main Progress Content */}
          <div className="flex-1">
            {/* Coding Journey Path */}
            <Card className="p-6 rounded-3xl shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">My Coding Journey</h2>
              
              {/* Journey Path SVG */}
              <div className="relative h-48 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-4 overflow-hidden">
                {/* Path Line */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 180">
                  <path
                    d="M50 150 Q150 120 250 130 T450 100 Q500 90 550 80"
                    stroke="#22c55e"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="8,4"
                    className="animate-pulse"
                  />
                </svg>

                {/* Journey Points */}
                <div className="relative z-10">
                  {/* Start Point */}
                  <div className="absolute left-6 bottom-6">
                    <div className="bg-green-500 p-2 rounded-lg shadow-lg">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-green-100 px-2 py-1 rounded-md mt-1">
                      <span className="text-green-800 font-bold text-xs">First Code</span>
                    </div>
                  </div>

                  {/* Variables Point */}
                  <div className="absolute left-28 top-20">
                    <div className="bg-green-500 p-2 rounded-lg shadow-lg">
                      <span className="text-white text-sm">📦</span>
                    </div>
                    <div className="bg-green-100 px-2 py-1 rounded-md mt-1">
                      <span className="text-green-800 font-bold text-xs">Variables</span>
                    </div>
                  </div>

                  {/* Castle (Major Milestone) */}
                  <div className="absolute left-1/2 top-8 transform -translate-x-1/2">
                    <div className="bg-yellow-400 p-2 rounded-lg shadow-lg">
                      <span className="text-white text-sm">🏰</span>
                    </div>
                    <div className="bg-yellow-100 px-2 py-1 rounded-md mt-1">
                      <span className="text-yellow-800 font-bold text-xs">Control Flow</span>
                    </div>
                  </div>

                  {/* Current Progress */}
                  <div className="absolute right-28 top-12">
                    <div className="bg-blue-500 p-2 rounded-lg shadow-lg animate-bounce">
                      <span className="text-white text-sm">🚀</span>
                    </div>
                    <div className="bg-blue-100 px-2 py-1 rounded-md mt-1">
                      <span className="text-blue-800 font-bold text-xs">Functions</span>
                    </div>
                  </div>

                  {/* Future Goals */}
                  <div className="absolute right-6 top-4">
                    <div className="bg-gray-300 p-2 rounded-lg shadow-lg">
                      <span className="text-gray-600 text-sm">🎯</span>
                    </div>
                    <div className="bg-gray-100 px-2 py-1 rounded-md mt-1">
                      <span className="text-gray-600 font-bold text-xs">Projects</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Progress Circle */}
              <Card className="p-6 rounded-3xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Overall Progress</h3>
                <div className="flex justify-center">
                  <div className="relative w-32 h-32">
                    {/* Background Circle */}
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${75 * 3.14} 314`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">75%</div>
                        <div className="text-xs text-gray-600">Complete</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Earned Badges */}
              <Card className="p-6 rounded-3xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Earned Badges</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center mx-auto mb-1 shadow-lg">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">First Steps</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-1 shadow-lg">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">Logic Master</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-1 shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">Speed Coder</span>
                  </div>
                  
                  <div className="text-center opacity-50">
                    <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center mx-auto mb-1">
                      <Award className="w-6 h-6 text-gray-500" />
                    </div>
                    <span className="text-xs font-medium text-gray-500">Problem Solver</span>
                  </div>
                  
                  <div className="text-center opacity-50">
                    <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center mx-auto mb-1">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                    <span className="text-xs font-medium text-gray-500">Team Player</span>
                  </div>
                  
                  <div className="text-center opacity-50">
                    <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center mx-auto mb-1">
                      <CheckCircle className="w-6 h-6 text-gray-500" />
                    </div>
                    <span className="text-xs font-medium text-gray-500">Completionist</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
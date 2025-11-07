import { useState } from 'react';
import { Code, Trophy, Zap, Target, BookOpen, Star, TrendingUp, Award, Flame, Clock, Play, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface DashboardLandingProps {
  onStartLearning: () => void;
  onFreeCodeClick: () => void;
  onProgressClick: () => void;
}

export function DashboardLanding({ onStartLearning, onFreeCodeClick, onProgressClick }: DashboardLandingProps) {
  // Mock data for the dashboard
  const stats = [
    { label: 'Lessons Completed', value: '12', icon: BookOpen, color: 'bg-blue-500', change: '+3 this week' },
    { label: 'Current Streak', value: '5', icon: Flame, color: 'bg-orange-500', change: 'days' },
    { label: 'XP Points', value: '850', icon: Star, color: 'bg-yellow-500', change: '+120 today' },
    { label: 'Challenges Won', value: '8', icon: Trophy, color: 'bg-purple-500', change: '2 pending' },
  ];

  const recentActivity = [
    { title: 'Variables & Data Types', type: 'Lesson', status: 'completed', time: '2 hours ago', xp: 50 },
    { title: 'Loop Master Challenge', type: 'Challenge', status: 'completed', time: '1 day ago', xp: 100 },
    { title: 'Conditional Statements Quiz', type: 'Quiz', status: 'completed', time: '2 days ago', xp: 75 },
  ];

  const upcomingLessons = [
    { title: 'Functions & Parameters', module: 'Python Basics', difficulty: 'Easy', duration: '15 min', locked: false },
    { title: 'Lists & Arrays', module: 'Python Basics', difficulty: 'Medium', duration: '20 min', locked: false },
    { title: 'Dictionaries', module: 'Python Basics', difficulty: 'Medium', duration: '18 min', locked: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome Back, Code Explorer! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Ready to continue your coding adventure?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-2xl`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black text-gray-800">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-xs text-green-600 font-medium">{stat.change}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content - Current Course Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning Card */}
            <Card className="p-8 rounded-3xl shadow-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <Badge className="bg-white/20 text-white border-0 mb-3">
                    Python Adventures
                  </Badge>
                  <h2 className="text-3xl font-black mb-2">Continue Learning</h2>
                  <p className="text-blue-100 text-lg mb-4">
                    You're on Module 3: Functions & Logic
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>Course Progress</span>
                      <span>65%</span>
                    </div>
                    <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <BookOpen className="w-8 h-8" />
                </div>
              </div>
              
              <Button 
                onClick={onStartLearning}
                className="w-full bg-white text-blue-600 hover:bg-blue-50 py-6 rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Play className="w-5 h-5 mr-2" />
                Continue Learning
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>

            {/* Upcoming Lessons */}
            <Card className="p-6 rounded-3xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-800">Up Next</h3>
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              
              <div className="space-y-4">
                {upcomingLessons.map((lesson, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                      lesson.locked 
                        ? 'bg-gray-50 border-gray-200 opacity-60' 
                        : 'bg-white border-blue-100 hover:border-blue-300 hover:shadow-md cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-800">{lesson.title}</h4>
                          {lesson.locked && (
                            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">🔒 Locked</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{lesson.module}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {lesson.difficulty}
                          </Badge>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}
                          </span>
                        </div>
                      </div>
                      {!lesson.locked && (
                        <ChevronRight className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6 rounded-3xl shadow-lg">
              <h3 className="text-xl font-black text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  onClick={onFreeCodeClick}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-5 rounded-2xl flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    <span className="font-bold">Free Code</span>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  onClick={onProgressClick}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-5 rounded-2xl flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    <span className="font-bold">My Progress</span>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full border-2 border-orange-300 text-orange-600 hover:bg-orange-50 py-5 rounded-2xl flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    <span className="font-bold">Daily Challenge</span>
                  </div>
                  <Badge className="bg-orange-500 text-white">New!</Badge>
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 rounded-3xl shadow-lg">
              <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-bold text-sm text-gray-800">{activity.title}</p>
                      <Badge className="bg-green-500 text-white text-xs">
                        +{activity.xp} XP
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600">{activity.type}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements Preview */}
            <Card className="p-6 rounded-3xl shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-black text-gray-800">Latest Badge</h3>
              </div>
              <div className="text-center py-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-black text-gray-800 mb-1">Loop Master</h4>
                <p className="text-sm text-gray-600">Completed 10 loop challenges</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

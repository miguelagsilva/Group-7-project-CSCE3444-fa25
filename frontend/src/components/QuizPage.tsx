import { useState, useEffect } from 'react';
import { ArrowLeft, Brain, CheckCircle, X, Lightbulb, Star, Award, Timer, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { newQuizzesData } from '../api/challenges-quizzes-data-fixed';

interface QuizPageProps {
  moduleId: string;
  onBack: () => void;
  onLearnClick?: () => void;
  onChallengeClick?: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'drag-drop' | 'code-output';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export function QuizPage({ moduleId, onBack, onLearnClick, onChallengeClick }: QuizPageProps) {
  // Get quizzes for this module
  const moduleQuizzes = newQuizzesData.filter(quiz => quiz.moduleId === moduleId);
  const currentQuiz = moduleQuizzes[0]; // For now, we'll use the first quiz. Later we can add quiz selection
  
  // Convert the quiz questions to the format expected by the component
  const quizQuestions: QuizQuestion[] = currentQuiz?.questions.map((q, index) => ({
    id: index + 1,
    question: q.question,
    type: 'multiple-choice' as const,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    difficulty: 'Easy' as const
  })) || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes for quiz
  const [streak, setStreak] = useState(0);

  const totalQuestions = quizQuestions.length;
  const progressPercentage = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  // Show error message if no quizzes available
  if (!currentQuiz || quizQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 shadow-lg text-center max-w-md">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Quizzes Available</h2>
          <p className="text-gray-600 mb-6">There are no quizzes available for this module yet.</p>
          <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700 text-white">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !quizComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setQuizComplete(true);
    }
  }, [timeLeft, quizComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowFeedback(true);
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizComplete(false);
    setTimeLeft(180);
    setStreak(0);
  };

  const getScoreColor = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 90) return "🎉 Outstanding! You're a Python pro!";
    if (percentage >= 80) return "🌟 Excellent work! Keep it up!";
    if (percentage >= 70) return "👍 Good job! You're learning well!";
    if (percentage >= 60) return "📚 Not bad! Review and try again!";
    return "💪 Keep practicing! You'll get there!";
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
          
          {/* Center: Course Title */}
          <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 tracking-wide">
              PYTHON <span className="text-blue-600">QUIZ</span>
            </h1>
          </div>
          
          {/* Right: Logo */}
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
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
                className="text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50"
                onClick={onChallengeClick}
              >
                Challenge
              </Button>
              <Button 
                variant="ghost" 
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600"
              >
                Quiz
              </Button>
            </div>
          </div>
        </div>

        {/* Quiz Stats Bar */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <Timer className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">Time Remaining</div>
                  <div className={`text-xl font-bold ${timeLeft < 30 ? 'text-red-600' : 'text-blue-600'}`}>
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">Progress</div>
                  <div className="text-xl font-bold text-blue-600">
                    {currentQuestion + 1} / {totalQuestions}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-yellow-600" />
                <div>
                  <div className="text-sm text-gray-600">Score</div>
                  <div className={`text-xl font-bold ${getScoreColor()}`}>
                    {score} / {totalQuestions}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Star className="w-6 h-6 text-orange-500" />
                <div>
                  <div className="text-sm text-gray-600">Streak</div>
                  <div className="text-xl font-bold text-orange-500">{streak}🔥</div>
                </div>
              </div>
            </div>
            
            <div className="w-32">
              <Progress value={progressPercentage} className="h-3" />
              <div className="text-center text-sm text-gray-600 mt-1">
                {Math.round(progressPercentage)}%
              </div>
            </div>
          </div>
        </div>

        {!quizComplete ? (
          /* Main Content - Three Column Layout */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            {/* Question Panel */}
            <div className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-lg h-fit">
              <div className="flex items-center space-x-3 mb-6">
                <Brain className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">Question {currentQuestion + 1}</h3>
                <Badge className={`${
                  quizQuestions[currentQuestion].difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  quizQuestions[currentQuestion].difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {quizQuestions[currentQuestion].difficulty}
                </Badge>
              </div>
              
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">Q</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">
                    {quizQuestions[currentQuestion].question}
                  </p>
                </div>
              </div>

              {/* Quiz Illustration */}
              <div className="text-center mb-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1750365920056-d4b4ca73fbaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWl6JTIwYnJhaW4lMjBsaWdodGJ1bGIlMjBsZWFybmluZ3xlbnwxfHx8fDE3NTkyNDUzODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Quiz brain illustration"
                  className="w-20 h-20 object-cover rounded-xl mx-auto"
                />
              </div>

              {/* Progress indicator */}
              <div className="bg-blue-50 rounded-2xl p-4">
                <div className="flex items-center justify-between text-sm text-blue-700 mb-2">
                  <span>Quiz Progress</span>
                  <span>{currentQuestion + 1}/{totalQuestions}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>

            {/* Quiz Interface */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-semibold text-gray-800">Choose Your Answer</h3>
                <Badge className="bg-blue-100 text-blue-800">
                  <Lightbulb className="w-4 h-4 mr-1" />
                  Quiz Mode
                </Badge>
              </div>

              {/* Answer Options */}
              <div className="space-y-4 mb-8">
                {quizQuestions[currentQuestion].options?.map((option, index) => (
                  <Card
                    key={index}
                    className={`p-6 cursor-pointer transition-all duration-200 border-2 ${
                      selectedAnswer === index
                        ? showFeedback
                          ? index === quizQuestions[currentQuestion].correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-5'
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        selectedAnswer === index
                          ? showFeedback
                            ? index === quizQuestions[currentQuestion].correctAnswer
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-lg text-gray-800">{option}</span>
                      {showFeedback && (
                        <div className="ml-auto">
                          {index === quizQuestions[currentQuestion].correctAnswer ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : selectedAnswer === index ? (
                            <X className="w-6 h-6 text-red-500" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Feedback Section */}
              {showFeedback && (
                <div className={`rounded-2xl p-6 mb-6 ${
                  selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center space-x-3 mb-3">
                    {selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <X className="w-6 h-6 text-red-600" />
                    )}
                    <span className={`font-semibold text-lg ${
                      selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                        ? 'text-green-700'
                        : 'text-red-700'
                    }`}>
                      {selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                        ? 'Correct! Great job! 🎉'
                        : 'Not quite right. Keep learning! 📚'
                      }
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {quizQuestions[currentQuestion].explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {totalQuestions}
                </div>
                
                <div className="flex space-x-4">
                  {!showFeedback ? (
                    <Button 
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNextQuestion}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
                    >
                      {currentQuestion < totalQuestions - 1 ? 'Next Question →' : 'Finish Quiz'}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Quiz Progress Panel */}
            <div className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-lg h-fit">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Quiz Status</h3>
              
              {/* Question Status */}
              <div className="space-y-3 mb-6">
                {quizQuestions.map((_, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index < currentQuestion || (index === currentQuestion && showFeedback)
                        ? answeredQuestions.includes(index) || (index === currentQuestion && showFeedback)
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : index === currentQuestion
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`text-sm ${
                      index === currentQuestion ? 'font-semibold text-purple-600' : 'text-gray-600'
                    }`}>
                      {index < currentQuestion || (index === currentQuestion && showFeedback)
                        ? 'Completed'
                        : index === currentQuestion
                        ? 'Current'
                        : 'Pending'
                      }
                    </span>
                  </div>
                ))}
              </div>

              {/* Quiz Stats */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Answered:</span>
                    <span className="font-semibold">{answeredQuestions.length + (showFeedback ? 1 : 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining:</span>
                    <span className="font-semibold">{totalQuestions - answeredQuestions.length - (showFeedback ? 1 : 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="font-semibold">{answeredQuestions.length > 0 ? Math.round((score / (answeredQuestions.length + (showFeedback ? 1 : 0))) * 100) : 0}%</span>
                  </div>
                </div>
              </div>

              {/* Motivational Image */}
              <div className="text-center">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1714475575582-5230a87c1d1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBxdWl6JTIwY29sb3JmdWwlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzU5MjQ1Mzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Educational quiz illustration"
                  className="w-16 h-16 object-cover rounded-xl mx-auto"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Quiz Complete Screen */
          <div className="max-w-2xl mx-auto">
            <Card className="p-12 text-center">
              <div className="text-6xl mb-6">
                {score === totalQuestions ? '🏆' : score >= totalQuestions * 0.8 ? '🌟' : score >= totalQuestions * 0.6 ? '👍' : '📚'}
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
              
              <p className="text-xl text-gray-700 mb-8">
                {getScoreMessage()}
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-purple-50 rounded-2xl p-6">
                  <div className="text-2xl font-bold text-purple-600">{score}</div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
                <div className="bg-green-50 rounded-2xl p-6">
                  <div className="text-2xl font-bold text-green-600">{Math.round((score / totalQuestions) * 100)}%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-6">
                  <div className="text-2xl font-bold text-yellow-600">{formatTime(180 - timeLeft)}</div>
                  <div className="text-sm text-gray-600">Time Taken</div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={handleRetakeQuiz}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl"
                >
                  Retake Quiz
                </Button>
                <Button 
                  variant="outline"
                  onClick={onBack}
                  className="px-8 py-3 rounded-xl"
                >
                  Back to Module
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
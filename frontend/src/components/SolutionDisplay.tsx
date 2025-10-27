import { useState, useEffect } from 'react';
import { X, Code, Lightbulb, CheckCircle, Copy, Play, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { challengeAPI, handleAPIError } from '../api/apiService';

interface SolutionDisplayProps {
  challengeId: number;
  isOpen: boolean;
  onClose: () => void;
  onTryAgain?: () => void;
  userScore?: number;
  maxScore?: number;
}

interface SolutionData {
  challenge_id: number;
  title: string;
  solution: string;
  explanation: string;
  difficulty: string;
}

export function SolutionDisplay({ 
  challengeId, 
  isOpen, 
  onClose, 
  onTryAgain,
  userScore = 0, 
  maxScore = 100 
}: SolutionDisplayProps) {
  const [solutionData, setSolutionData] = useState<SolutionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (isOpen && challengeId) {
      loadSolution();
    }
  }, [isOpen, challengeId]);

  const loadSolution = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await challengeAPI.getSolution(challengeId);
      setSolutionData(data);
    } catch (err) {
      setError(handleAPIError(err as Error).error);
    } finally {
      setLoading(false);
    }
  };

  const copySolution = () => {
    if (solutionData?.solution) {
      navigator.clipboard.writeText(solutionData.solution);
    }
  };

  const getScoreColor = () => {
    const percentage = (userScore / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border-2 border-blue-500" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          pointerEvents: 'auto', 
          opacity: 1, 
          filter: 'none',
          position: 'relative',
          zIndex: 1000
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">💡 Solution & Explanation</h2>
              <p className="text-blue-100">
                {solutionData?.title || 'Loading solution...'}
              </p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Score Display */}
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              <span className="text-sm">Your Score:</span>
              <span className={`font-bold text-lg ${getScoreColor()}`}>
                {userScore}/{maxScore}
              </span>
            </div>
            {solutionData && (
              <Badge className={getDifficultyColor(solutionData.difficulty)}>
                {solutionData.difficulty.toUpperCase()}
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading solution...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <div className="text-red-600 mb-2">❌ Error loading solution</div>
              <p className="text-gray-600">{error}</p>
              <Button onClick={loadSolution} className="mt-4">
                Try Again
              </Button>
            </div>
          )}

          {solutionData && (
            <div className="space-y-6">
              {/* Solution Code */}
              <Card className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Solution Code
                  </h3>
                  <Button onClick={copySolution} size="sm" variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{solutionData.solution}</code>
                </pre>
              </Card>

              {/* Explanation Toggle */}
              <div className="flex justify-center">
                <Button
                  onClick={() => setShowExplanation(!showExplanation)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Lightbulb className="h-4 w-4" />
                  {showExplanation ? 'Hide' : 'Show'} Explanation
                </Button>
              </div>

              {/* Explanation */}
              {showExplanation && (
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    How It Works
                  </h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {solutionData.explanation}
                    </p>
                  </div>
                </Card>
              )}

              {/* Learning Tips */}
              <Card className="p-4 bg-blue-50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-800">
                  <CheckCircle className="h-5 w-5" />
                  Learning Tips
                </h3>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Try to understand each line of the solution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Practice writing similar code on your own</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Experiment with different inputs to see how it works</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Don't worry if you didn't get it right the first time - learning takes practice!</span>
                  </li>
                </ul>
              </Card>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            💪 Keep practicing! Every challenge makes you a better programmer.
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                console.log('Close button clicked');
                alert('Close button clicked!');
                onClose();
              }} 
              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer"
              style={{ pointerEvents: 'auto', opacity: 1 }}
            >
              Close
            </button>
            <button 
              onClick={() => {
                console.log('Try Again button clicked');
                alert('Try Again button clicked!');
                // Close modal and reset challenge if callback provided
                onClose();
                if (onTryAgain) {
                  onTryAgain();
                }
              }} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer"
              style={{ pointerEvents: 'auto', opacity: 1 }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

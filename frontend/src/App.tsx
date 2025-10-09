import { useState } from 'react';
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { CoursesSection } from "./components/CoursesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { Footer } from "./components/Footer";
import { ModulesPage } from "./components/ModulesPage";
import { ModuleDetailPage } from "./components/ModuleDetailPage";
import { ProgressPage } from "./components/ProgressPage";
import { PracticePage } from "./components/PracticePage";
import { ChallengePage } from "./components/ChallengePage";
import { QuizPage } from "./components/QuizPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'modules' | 'module-detail' | 'progress' | 'practice' | 'challenge' | 'quiz'>('landing');

  const navigateToModules = () => {
    setCurrentPage('modules');
  };

  const navigateToLanding = () => {
    setCurrentPage('landing');
  };

  const navigateToModuleDetail = () => {
    setCurrentPage('module-detail');
  };

  const navigateToProgress = () => {
    setCurrentPage('progress');
  };

  const navigateToPractice = () => {
    setCurrentPage('practice');
  };

  const navigateToChallenge = () => {
    setCurrentPage('challenge');
  };

  const navigateToQuiz = () => {
    setCurrentPage('quiz');
  };

  const navigateBackToModules = () => {
    setCurrentPage('modules');
  };

  if (currentPage === 'quiz') {
    return <QuizPage onBack={navigateToModuleDetail} onProgressClick={navigateToProgress} />;
  }

  if (currentPage === 'challenge') {
    return <ChallengePage onBack={navigateToModuleDetail} onProgressClick={navigateToProgress} />;
  }

  if (currentPage === 'practice') {
    return <PracticePage 
      onBack={navigateToModuleDetail} 
      onProgressClick={navigateToProgress}
      onLearnClick={navigateToModuleDetail}
      onChallengeClick={navigateToChallenge}
      onQuizClick={navigateToQuiz}
    />;
  }

  if (currentPage === 'progress') {
    return <ProgressPage onBack={navigateBackToModules} />;
  }

  if (currentPage === 'module-detail') {
    return <ModuleDetailPage onBack={navigateBackToModules} onProgressClick={navigateToProgress} onPracticeClick={navigateToPractice} onChallengeClick={navigateToChallenge} onQuizClick={navigateToQuiz} />;
  }

  if (currentPage === 'modules') {
    return <ModulesPage 
      onBack={navigateToLanding} 
      onModuleClick={navigateToModuleDetail} 
      onProgressClick={navigateToProgress}
      onPracticeClick={navigateToPractice}
      onChallengeClick={navigateToChallenge}
      onQuizClick={navigateToQuiz}
    />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onNavigateToModules={navigateToModules} 
        onNavigateToProgress={navigateToProgress}
        onNavigateToHome={navigateToLanding}
      />
      <HeroSection onNavigateToModules={navigateToModules} />
      <FeaturesSection />
      <CoursesSection onNavigateToModules={navigateToModules} />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
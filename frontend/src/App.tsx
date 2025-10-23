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
import { FreeCodePage } from "./components/FreeCodePage";
import { ChallengePage } from "./components/ChallengePage";
import { QuizPage } from "./components/QuizPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'modules' | 'module-detail' | 'progress' | 'freecode' | 'challenge' | 'quiz'>('landing');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('module-2');

  const navigateToModules = () => {
    setCurrentPage('modules');
  };

  const navigateToLanding = () => {
    setCurrentPage('landing');
  };

  const navigateToModuleDetail = (moduleId?: string) => {
    if (moduleId) {
      setSelectedModuleId(moduleId);
    }
    setCurrentPage('module-detail');
  };

  const navigateToProgress = () => {
    setCurrentPage('progress');
  };

  const navigateToFreeCode = () => {
    setCurrentPage('freecode');
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
    return <QuizPage 
      onBack={navigateToModuleDetail} 
      onProgressClick={navigateToProgress}
      onLearnClick={navigateBackToModules}
      onFreeCodeClick={navigateToFreeCode}
      onChallengeClick={navigateToChallenge}
    />;
  }

  if (currentPage === 'challenge') {
    return <ChallengePage 
      onBack={navigateToModuleDetail} 
      onProgressClick={navigateToProgress}
      onLearnClick={navigateBackToModules}
      onFreeCodeClick={navigateToFreeCode}
      onQuizClick={navigateToQuiz}
    />;
  }

  if (currentPage === 'freecode') {
    return <FreeCodePage 
      onBack={navigateBackToModules} 
      onProgressClick={navigateToProgress}
      onLearnClick={navigateBackToModules}
    />;
  }

  if (currentPage === 'progress') {
    return <ProgressPage 
      onBack={navigateBackToModules}
      onLearnClick={navigateBackToModules}
      onFreeCodeClick={navigateToFreeCode}
    />;
  }

  if (currentPage === 'module-detail') {
    return <ModuleDetailPage 
      moduleId={selectedModuleId}
      onBack={navigateBackToModules} 
      onProgressClick={navigateToProgress} 
      onFreeCodeClick={navigateToFreeCode} 
      onChallengeClick={navigateToChallenge} 
      onQuizClick={navigateToQuiz} 
    />;
  }

  if (currentPage === 'modules') {
    return <ModulesPage 
      onBack={navigateToLanding} 
      onModuleClick={navigateToModuleDetail} 
      onProgressClick={navigateToProgress}
      onFreeCodeClick={navigateToFreeCode}
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
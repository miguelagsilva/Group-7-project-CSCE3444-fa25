import { useState } from 'react';
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { CoursesSection } from "./components/CoursesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { Footer } from "./components/Footer";
import { DashboardLanding } from "./components/DashboardLanding";
import { ModulesPage } from "./components/ModulesPage";
import { ModuleDetailPage } from "./components/ModuleDetailPage";
import { ProgressPage } from "./components/ProgressPage";
import { FreeCodePage } from "./components/FreeCodePage";
import { ChallengePage } from "./components/ChallengePage";
import { QuizPage } from "./components/QuizPage";
import { AboutUsPage } from "./components/AboutUsPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'modules' | 'module-detail' | 'progress' | 'freecode' | 'challenge' | 'quiz' | 'about'>('landing');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('module-2');

  const navigateToDashboard = () => {
    setCurrentPage('dashboard');
  };

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

  const navigateBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const navigateToAbout = () => {
    setCurrentPage('about');
  };

  if (currentPage === 'quiz') {
    return <QuizPage 
      moduleId={selectedModuleId}
      onBack={() => navigateToModuleDetail(selectedModuleId)} 
      onLearnClick={() => navigateToModuleDetail(selectedModuleId)}
      onChallengeClick={navigateToChallenge}
    />;
  }

  if (currentPage === 'challenge') {
    return <ChallengePage 
      moduleId={selectedModuleId}
      onBack={() => navigateToModuleDetail(selectedModuleId)} 
      onLearnClick={() => navigateToModuleDetail(selectedModuleId)}
      onQuizClick={navigateToQuiz}
    />;
  }

  if (currentPage === 'freecode') {
    return <FreeCodePage 
      onBack={navigateBackToDashboard} 
      onProgressClick={navigateToProgress}
      onLearnClick={navigateBackToDashboard}
    />;
  }

  if (currentPage === 'progress') {
    return <ProgressPage 
      onBack={navigateBackToDashboard}
      onLearnClick={navigateBackToDashboard}
      onFreeCodeClick={navigateToFreeCode}
    />;
  }

  if (currentPage === 'module-detail') {
    return <ModuleDetailPage 
      moduleId={selectedModuleId}
      onBack={navigateBackToModules} 
      onChallengeClick={navigateToChallenge} 
      onQuizClick={navigateToQuiz} 
    />;
  }

  if (currentPage === 'dashboard') {
    return (
      <>
        <Header 
          onNavigateToModules={navigateToModules} 
          onNavigateToProgress={navigateToProgress}
          onNavigateToHome={navigateToLanding}
          onNavigateToAbout={navigateToAbout}
        />
        <DashboardLanding
          onStartLearning={navigateToModules}
          onFreeCodeClick={navigateToFreeCode}
          onProgressClick={navigateToProgress}
        />
      </>
    );
  }

  if (currentPage === 'modules') {
    return <ModulesPage 
      onBack={navigateToDashboard} 
      onModuleClick={navigateToModuleDetail} 
      onProgressClick={navigateToProgress}
      onFreeCodeClick={navigateToFreeCode}
    />;
  }

  if (currentPage === 'about') {
    return <AboutUsPage 
      onBack={navigateToLanding}
      onNavigateToModules={navigateToDashboard}
      onNavigateToProgress={navigateToDashboard}
      onNavigateToHome={navigateToLanding}
    />;
  }

  // Landing page (marketing page)
  return (
    <div className="min-h-screen bg-white">
      <Header 
        onNavigateToModules={navigateToDashboard} 
        onNavigateToProgress={navigateToDashboard}
        onNavigateToHome={navigateToLanding}
        onNavigateToAbout={navigateToAbout}
      />
      <HeroSection onNavigateToModules={navigateToDashboard} />
      <FeaturesSection />
      <CoursesSection onNavigateToModules={navigateToDashboard} />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
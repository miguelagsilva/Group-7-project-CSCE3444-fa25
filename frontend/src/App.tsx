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
import { FreeCodePage } from "./components/FreeCodePage";
import { ChallengePage } from "./components/ChallengePage";
import { QuizPage } from "./components/QuizPage";
import { AboutUsPage } from "./components/AboutUsPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'modules' | 'module-detail' | 'freecode' | 'challenge' | 'quiz' | 'about'>('landing');
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

  const navigateToNextModule = () => {
    // Map current module to next module
    const moduleOrder = ['module-1', 'module-2', 'module-3'];
    const currentIndex = moduleOrder.indexOf(selectedModuleId);
    
    if (currentIndex >= 0 && currentIndex < moduleOrder.length - 1) {
      const nextModuleId = moduleOrder[currentIndex + 1];
      setSelectedModuleId(nextModuleId);
      setCurrentPage('modules'); // Go back to modules page to see the new module
    } else {
      // If it's the last module, go back to modules page
      setCurrentPage('modules');
    }
  };

  const navigateToFreeCode = () => {
    setCurrentPage('freecode');
  };

  const navigateToChallenge = () => {
    setCurrentPage('challenge');
  }

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
      onNextModule={navigateToNextModule}
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
      onLearnClick={navigateToModules}
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
          onNavigateToHome={navigateToLanding}
          onNavigateToAbout={navigateToAbout}
          onNavigateToDashboard={navigateToDashboard}
          currentPage="dashboard"
        />
        <DashboardLanding
          onStartLearning={navigateToModules}
          onFreeCodeClick={navigateToFreeCode}
          onNavigateToHome={navigateToLanding}
        />
      </>
    );
  }

  if (currentPage === 'modules') {
    return <ModulesPage 
      onBack={navigateToDashboard} 
      onModuleClick={navigateToModuleDetail} 
      onFreeCodeClick={navigateToFreeCode}
    />;
  }

  if (currentPage === 'about') {
    return <AboutUsPage 
      onBack={navigateToLanding}
      onNavigateToModules={navigateToModules}
      onNavigateToHome={navigateToLanding}
      onNavigateToDashboard={navigateToDashboard}
    />;
  }

  // Landing page (marketing page)
  return (
    <div className="min-h-screen bg-white">
      <Header 
        onNavigateToModules={navigateToDashboard} 
        onNavigateToHome={navigateToLanding}
        onNavigateToAbout={navigateToAbout}
        onNavigateToDashboard={navigateToDashboard}
        currentPage="landing"
      />
      <HeroSection onNavigateToModules={navigateToDashboard} />
      <FeaturesSection />
      <CoursesSection onNavigateToModules={navigateToDashboard} />
      <TestimonialsSection />
      <Footer onNavigateToModules={navigateToDashboard} />
    </div>
  );
}
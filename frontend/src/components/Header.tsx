import { Button } from "./ui/button";

interface HeaderProps {
  onNavigateToModules?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToDashboard?: () => void;
  currentPage?: 'landing' | 'dashboard' | 'about';
}

export function Header({ onNavigateToModules, onNavigateToHome, onNavigateToAbout, onNavigateToDashboard, currentPage = 'landing' }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-6 relative z-10">
      <div className="flex items-center">
        <h1 
          onClick={onNavigateToHome}
          className="text-blue-600 text-3xl font-bold tracking-wide cursor-pointer hover:text-blue-700 transition-colors"
        >
          LeetCode for Kids
        </h1>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <button 
          onClick={onNavigateToHome}
          className={`transition-colors cursor-pointer font-medium ${
            currentPage === 'landing' 
              ? 'text-blue-600 font-bold' 
              : 'text-gray-700 hover:text-blue-600'
          }`}
        >
          Home
        </button>
        
        {/* Show Dashboard tab only on dashboard and about pages */}
        {(currentPage === 'dashboard' || currentPage === 'about') && (
          <button 
            onClick={onNavigateToDashboard}
            className={`transition-colors cursor-pointer font-medium ${
              currentPage === 'dashboard' 
                ? 'text-blue-600 font-bold' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Dashboard
          </button>
        )}
        
        <button 
          onClick={onNavigateToModules}
          className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer font-medium"
        >
          Learn
        </button>
        
        <button 
          onClick={onNavigateToAbout}
          className={`transition-colors cursor-pointer font-medium ${
            currentPage === 'about' 
              ? 'text-blue-600 font-bold' 
              : 'text-gray-700 hover:text-blue-600'
          }`}
        >
          About Us
        </button>
      </nav>
      
      <Button 
        onClick={onNavigateToModules}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
      >
        Start Learning
      </Button>
    </header>
  );
}
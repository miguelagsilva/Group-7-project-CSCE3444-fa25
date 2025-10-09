import { Button } from "./ui/button";

interface HeaderProps {
  onNavigateToModules?: () => void;
  onNavigateToProgress?: () => void;
  onNavigateToHome?: () => void;
}

export function Header({ onNavigateToModules, onNavigateToProgress, onNavigateToHome }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-6 relative z-10">
      <div className="flex items-center">
        <h1 className="text-blue-600 text-3xl font-bold tracking-wide">LeetCode for Kids</h1>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <button 
          onClick={onNavigateToHome}
          className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
        >
          Home
        </button>
        <button 
          onClick={onNavigateToModules}
          className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
        >
          Learn
        </button>
        <button 
          onClick={onNavigateToProgress}
          className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
        >
          Progress
        </button>
        <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</a>
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
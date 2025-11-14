import { Button } from "./ui/button";

interface HeaderProps {
  onNavigateToModules?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToAbout?: () => void;
}

export function Header({ onNavigateToModules, onNavigateToHome, onNavigateToAbout }: HeaderProps) {
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
          onClick={onNavigateToAbout}
          className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
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
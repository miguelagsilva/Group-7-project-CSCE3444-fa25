import { Button } from "./ui/button";
import { Code, Mail, MapPin, Phone } from "lucide-react";

interface FooterProps {
  onNavigateToModules?: () => void;
}

export function Footer({ onNavigateToModules }: FooterProps) {
  return (
    <footer className="relative overflow-hidden">
      {/* Wavy top border */}
      <div className="absolute top-0 left-0 w-full">
        <svg className="w-full h-20" viewBox="0 0 1440 320" fill="none">
          <path 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" 
            fill="rgba(29, 78, 216, 0.1)"
          />
        </svg>
      </div>
      
      {/* Main footer content */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-800 pt-20 pb-8">
        
        {/* Footer links */}
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
            {/* Brand column */}
            <div>
              <div className="flex items-center mb-6">
                <Code className="w-8 h-8 text-white mr-3" />
                <h4 className="text-2xl font-bold">LeetCode for Kids</h4>
              </div>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Making coding accessible, fun, and engaging for the next generation of digital creators.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
                  <span className="text-white font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
                  <span className="text-white font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
                  <span className="text-white font-bold">in</span>
                </div>
              </div>
            </div>
            
            {/* Modules column */}
            <div>
              <h5 className="text-xl font-bold mb-6">Modules</h5>
              <ul className="space-y-3 text-blue-100">
                <li>
                  <button 
                    onClick={onNavigateToModules}
                    className="hover:text-white transition-colors text-left"
                  >
                    Getting Started with Python
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onNavigateToModules}
                    className="hover:text-white transition-colors text-left"
                  >
                    Variables and Data Types
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onNavigateToModules}
                    className="hover:text-white transition-colors text-left"
                  >
                    Loops and Conditionals
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onNavigateToModules}
                    className="hover:text-white transition-colors text-left"
                  >
                    Functions and Methods
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onNavigateToModules}
                    className="hover:text-white transition-colors text-left"
                  >
                    Lists and Collections
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Support column */}
            <div>
              <h5 className="text-xl font-bold mb-6">Support</h5>
              <ul className="space-y-3 text-blue-100">
                <li>
                  <a 
                    href="mailto:miguelangelogoncalvesdasilva@my.unt.edu" 
                    className="hover:text-white transition-colors inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Our Email</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="border-t border-blue-500 mt-12 pt-8 text-center text-blue-100">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>&copy; 2025 LeetCode for Kids. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-10 right-10 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-12 h-12 bg-blue-300 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-white rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
    </footer>
  );
}
import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Clock, Star, Users, BookOpen, Code, Zap } from "lucide-react";
import { getModules, Module } from "../api/data";

interface CoursesSectionProps {
  onNavigateToModules?: () => void;
}

export function CoursesSection({ onNavigateToModules }: CoursesSectionProps) {
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    // Get only the first 3 modules to display
    getModules().then(allModules => {
      setModules(allModules.slice(0, 3));
    });
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with waves */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-white to-blue-50"></div>
      
      {/* Wavy top border */}
      <div className="absolute top-0 left-0 w-full">
        <svg className="w-full h-16" viewBox="0 0 1440 320" fill="none">
          <path 
            d="M0,32L48,53.3C96,75,192,117,288,128C384,139,480,117,576,106.7C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" 
            fill="rgba(59, 130, 246, 0.1)"
          />
        </svg>
      </div>
      
      {/* Floating decorative shapes */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-blue-300 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute top-1/2 left-20">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M5 20C10 10, 30 10, 35 20C30 30, 10 30, 5 20Z" fill="rgba(59, 130, 246, 0.2)"/>
        </svg>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Available <span className="text-blue-600">Modules</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your Python journey with these exciting modules - each one builds on the last!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => {
            const moduleImages = [
              "https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY29kaW5nJTIwcHJvZ3JhbW1pbmclMjBjaGlsZHJlbnxlbnwxfHx8fDE3NjA0NTU2MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1525829528215-ffae12a76ac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGtpZHMlMjB0ZWNobm9sb2d5JTIwbGVhcm5pbmd8ZW58MXx8fHwxNzYwNDU1NjE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1674049406486-4b1f6e1845fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBwcm9ncmFtbWluZyUyMGtpZHMlMjBsZWFybmluZ3xlbnwxfHx8fDE3NjA0NTU2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
            ];
            
            return (
              <div 
                key={module.id} 
                onClick={onNavigateToModules}
                className={`bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 relative cursor-pointer ${ 
                  index % 2 === 0 ? 'rotate-1 hover:rotate-0' : '-rotate-1 hover:rotate-0'
                }`}
              >
                <div className="relative">
                  <ImageWithFallback 
                    src={moduleImages[index] || moduleImages[0]}
                    alt={module.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-blue-600">
                    Beginner
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{module.title}</h3>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{module.lessonsCount} lessons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Code className="w-4 h-4" />
                      <span>Python</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>4.9</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={onNavigateToModules}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Start Learning
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            onClick={onNavigateToModules}
            className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl"
          >
            View All Modules
          </Button>
        </div>
      </div>
    </section>
  );
}
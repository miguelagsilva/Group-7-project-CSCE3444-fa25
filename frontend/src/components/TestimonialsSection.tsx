import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star, Quote, School, Home, Lightbulb, Sparkles } from "lucide-react";
import { getTestimonials, Testimonial } from "../api/data";

export function TestimonialsSection() {
  // Use cases instead of testimonials
  const useCases = [
    {
      emoji: "🏫",
      icon: School,
      title: "Classroom Learning",
      description: "Teachers use LeetCode for Kids to teach problem-solving in innovative ways, making computer science accessible and engaging for students of all levels.",
      color: "bg-pink-100 border-pink-200"
    },
    {
      emoji: "🏠",
      icon: Home,
      title: "Home Learning",
      description: "Kids spend quality time learning coding at home, building projects at their own pace while parents track their progress and celebrate achievements.",
      color: "bg-blue-100 border-blue-200"
    },
    {
      emoji: "💡",
      icon: Lightbulb,
      title: "Creative Projects",
      description: "Students bring their ideas to life by creating games, animations, and interactive stories, developing both coding skills and creative thinking.",
      color: "bg-green-100 border-green-200"
    },
    {
      emoji: "✨",
      icon: Sparkles,
      title: "After-School Programs",
      description: "Coding clubs and after-school programs use our platform to provide structured, fun learning experiences that keep kids engaged and motivated.",
      color: "bg-purple-100 border-purple-200"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"></div>
      
      {/* Wavy decorative elements */}
      <div className="absolute top-0 left-0 w-full">
        <svg className="w-full h-20" viewBox="0 0 1440 320" fill="none">
          <path 
            d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,106.7C1248,117,1344,171,1392,197.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" 
            fill="rgba(59, 130, 246, 0.1)"
          />
        </svg>
      </div>
      
      {/* Floating shapes */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-pulse" style={{animationDelay: '0s'}}></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-blue-300 rounded-full opacity-40 animate-bounce" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-white rounded-full opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            How It's <span className="text-blue-600">Used</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the many ways students and educators bring coding education to life with our platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => {
            return (
              <div 
                key={index}
                className={`${useCase.color} p-8 rounded-3xl border-2 transform hover:scale-105 transition-all duration-300 ${
                  index % 2 === 0 ? 'rotate-1 hover:rotate-0' : '-rotate-1 hover:rotate-0'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg bg-gradient-to-br from-blue-400 to-blue-600">
                      <span className="text-2xl">{useCase.emoji}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white p-1 rounded-full">
                      <useCase.icon className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {useCase.title}
                    </h3>
                    
                    <p className="text-gray-700 text-base leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Bottom decorative wave */}
        <div className="mt-20">
          <svg className="w-full h-16" viewBox="0 0 1440 320" fill="none">
            <path 
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
              fill="rgba(59, 130, 246, 0.1)"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
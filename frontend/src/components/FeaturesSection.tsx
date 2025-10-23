import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Code, Gamepad2, Users, Trophy } from "lucide-react";
import tabletImage from 'figma:asset/8c4442a185aaceecaa9ad9946fb6f5b27ceb8d4b.png';
import projectCompleteImage from 'figma:asset/af1ed826546098c7f1b3d0bc274bc6079674388c.png';

export function FeaturesSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Wavy background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-blue-100"></div>
      
      {/* Top wave */}
      <div className="absolute top-0 left-0 w-full">
        <svg className="w-full h-20" viewBox="0 0 1440 320" fill="none">
          <path 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,186.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" 
            fill="white"
          />
        </svg>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute top-32 right-20 w-12 h-12 bg-blue-300 rounded-full opacity-50 animate-bounce" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-white rounded-full opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Why Kids <span className="text-blue-600">Love</span> LeetCode for Kids?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make coding as fun as playing games, while building real skills that last a lifetime.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Image */}
          <div className="relative">
            <div className="transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white p-6 rounded-3xl shadow-2xl">
                <ImageWithFallback 
                  src={tabletImage}
                  alt="LeetCode for Kids progress dashboard on tablet"
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
          
          {/* Right - Features */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-2xl">
                <Gamepad2 className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Game-Based Learning</h3>
                <p className="text-gray-600">
                  Learn coding through fun games and interactive challenges that feel like play, not work.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-2xl">
                <Code className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Visual Programming</h3>
                <p className="text-gray-600">
                  Start with drag-and-drop blocks, then progress to real code as confidence grows.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-2xl">
                <Trophy className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Achievement System</h3>
                <p className="text-gray-600">
                  Earn badges, unlock new levels, and celebrate every coding milestone along the way.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom feature with different layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Feature */}
          <div className="lg:order-2 relative">
            <div className="transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white p-6 rounded-3xl shadow-2xl">
                <ImageWithFallback 
                  src={projectCompleteImage}
                  alt="Child celebrating project completion on LeetCode for Kids platform"
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
          
          {/* Right - Content */}
          <div className="lg:order-1 space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-2xl">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Safe Community</h3>
                <p className="text-gray-600">
                  Connect with other young coders in a safe, moderated environment designed for kids.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h4 className="text-xl font-bold text-blue-800 mb-3">Perfect for Ages 8-12</h4>
              <p className="text-blue-700">
                Our curriculum adapts to every child's learning pace, from complete beginners to advanced young programmers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
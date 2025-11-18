import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import heroImage from 'figma:asset/5c4bf0824e4a7fca53c96d48957286efed9967fc.png';

interface HeroSectionProps {
  onNavigateToModules?: () => void;
}

export function HeroSection({ onNavigateToModules }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden min-h-[80vh]">
      {/* Blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400"></div>
      
      {/* Wavy background layers */}
      <div className="absolute inset-x-0 bottom-0">
        {/* First wave layer */}
        <svg className="absolute bottom-0 left-0 w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none">
          <path 
            d="M0,128L48,149.3C96,171,192,213,288,213.3C384,213,480,171,576,165.3C672,160,768,192,864,186.7C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
            fill="rgba(59, 130, 246, 0.3)"
          />
        </svg>
        
        {/* Second wave layer */}
        <svg className="absolute bottom-0 left-0 w-full h-48" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none">
          <path 
            d="M0,224L48,208C96,192,192,160,288,170.7C384,181,480,235,576,245.3C672,256,768,224,864,197.3C960,171,1056,149,1152,165.3C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
            fill="rgba(37, 99, 235, 0.4)"
          />
        </svg>
        
        {/* Third wave layer */}
        <svg className="absolute bottom-0 left-0 w-full h-32" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none">
          <path 
            d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,122.7C672,128,768,192,864,213.3C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
            fill="rgba(29, 78, 216, 0.6)"
          />
        </svg>
      </div>
      
      {/* Playful floating shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-50 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
      <div className="absolute top-40 right-40 w-16 h-16 bg-white rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
      <div className="absolute bottom-32 left-20 w-24 h-24 bg-blue-300 rounded-full opacity-40 animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
      <div className="absolute top-32 left-1/4 w-12 h-12 bg-white rounded-full opacity-50 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
      
      {/* Wavy decorative shapes */}
      <div className="absolute top-1/3 left-10">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M10 30C20 10, 40 10, 50 30C40 50, 20 50, 10 30Z" fill="rgba(255,255,255,0.4)"/>
        </svg>
      </div>
      <div className="absolute top-1/2 right-10">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M20 40C30 20, 50 20, 60 40C50 60, 30 60, 20 40Z" fill="rgba(59, 130, 246, 0.3)"/>
        </svg>
      </div>
      
      <div className="relative z-10 px-4 md:px-8 my-16 md:my-32 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight tracking-wide">
                Where Coding 
                <br />
                <span className="text-blue-600">Sparks Creativity</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                Helping kids grow smarter and more curious through playful, engaging coding lessons.
              </p>
            </div>
            
            <div className="flex justify-center lg:justify-start">
              <Button 
                onClick={onNavigateToModules}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 sm:px-12 py-5 sm:py-6 text-lg sm:text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Your Coding Adventure
              </Button>
            </div>
          </div>
          
          {/* Right content - Floating images */}
          <div className="relative hidden lg:block">
            {/* Main coding image */}
            <div className="relative z-10 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white p-4 rounded-2xl shadow-xl">
                <ImageWithFallback 
                  src={heroImage}
                  alt="Kids coding together with robots and computers"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
            
            {/* Floating laptop image */}
            <div className="absolute -top-8 -right-8 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white p-3 rounded-xl shadow-lg">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1674049406486-4b1f6e1845fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsYXB0b3AlMjBwcm9ncmFtbWluZyUyMGtpZHMlMjBsZWFybmluZ3xlbnwxfHx8fDE3NTg3Njk4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Programming laptop"
                  className="w-32 h-24 object-cover rounded-lg"
                />
              </div>
            </div>
            
            {/* Another floating image */}
            <div className="absolute -bottom-4 -left-8 transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white p-3 rounded-xl shadow-lg">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1756723903313-b3d2f705f472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHhjb21wdXRlciUyMHNjaWVuY2UlMjBlZHVjYXRpb24lMjBjaGlsZHJlbnxlbnwxfHx8fDE3NTg3Njk4MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Computer science education"
                  className="w-40 h-32 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom wave section with stats */}
        <div className="mt-56 relative">
          {/* Wavy stats background */}
          <div className="relative">
            
          </div>
          
          {/* Stats */}
          {/* <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center py-12 text-black w-full max-w-6xl">
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">25k+</div>
                <div className="text-blue-100">Happy Coders</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-blue-100">Courses</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">4.9/5</div>
                <div className="text-blue-100">Satisfaction Score</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">30+</div>
                <div className="text-blue-100">Countries & Counting</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
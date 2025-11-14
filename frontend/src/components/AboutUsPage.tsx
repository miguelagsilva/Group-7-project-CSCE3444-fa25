import { Header } from './Header';
import { Footer } from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GraduationCap, Users, Book, Award } from 'lucide-react';

interface AboutUsPageProps {
  onBack: () => void;
  onNavigateToModules?: () => void;
  onNavigateToProgress?: () => void;
  onNavigateToHome?: () => void;
}

export function AboutUsPage({ onBack, onNavigateToModules, onNavigateToProgress, onNavigateToHome }: AboutUsPageProps) {
  const teamMembers = [
    { name: 'Alfredo Guevara', id: '11501470' },
    { name: 'Aminat Usman', id: '11846769' },
    { name: 'Miguel Silva', id: '11911591' },
    { name: 'Arnav Saxena', id: '11552665' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onNavigateToModules={onNavigateToModules} 
        onNavigateToProgress={onNavigateToProgress}
        onNavigateToHome={onNavigateToHome}
        onNavigateToAbout={onBack}
      />

      {/* Hero Section - Similar to landing page hero */}
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
        
        <div className="relative z-10 px-8 my-32 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight tracking-wide">
                  About
                  <br />
                  <span className="text-blue-600">LeetCode for Kids</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Where Coding Sparks Creativity
                </p>
                <p className="text-lg text-gray-600 max-w-lg">
                  A playful, engaging platform designed to make coding fun and accessible for young learners through interactive lessons and creative projects.
                </p>
              </div>
            </div>
            
            {/* Right content - Decorative image section */}
            <div className="relative">
              {/* Main image */}
              <div className="relative z-10 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white p-4 rounded-2xl shadow-xl">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="Team collaboration and learning"
                    className="w-full h-80 object-cover rounded-xl"
                  />
                </div>
              </div>
              
              {/* Floating icon decorations */}
              <div className="absolute -top-8 -right-8 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <GraduationCap className="w-16 h-16 text-blue-600" />
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-8 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <Award className="w-16 h-16 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Information Section - Similar to Features Section */}
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
              Course <span className="text-blue-600">Information</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This project was created as part of our software engineering coursework.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left - Image */}
            <div className="relative">
              <div className="transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white p-6 rounded-3xl shadow-2xl">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="University classroom and learning"
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
            
            {/* Right - Course Details */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <Book className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Software Engineering 3444</h3>
                  <p className="text-gray-600">
                    A comprehensive course focused on modern software development practices, 
                    team collaboration, and building real-world applications.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Instructor: Hamed Jalali</h3>
                  <p className="text-gray-600">
                    Under the guidance of our instructor, we've learned to design, develop, 
                    and deploy full-stack applications with best practices.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h4 className="text-xl font-bold text-blue-800 mb-3">Our Mission</h4>
                <p className="text-blue-700">
                  We believe every child deserves the opportunity to explore coding in a fun, 
                  creative, and supportive environment. Through interactive learning, we're 
                  building a foundation for tomorrow's innovators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section - Similar to Features Section alternate layout */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-100 to-white">
        {/* Floating decorative elements */}
        <div className="absolute top-20 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-blue-300 rounded-full opacity-50 animate-bounce" style={{animationDelay: '1s'}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Meet Our <span className="text-blue-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The dedicated students behind LeetCode for Kids.
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
                  {/* Avatar */}
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl text-white">{member.name.charAt(0)}</span>
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                    {member.name}
                  </h3>
                  
                  {/* ID Badge */}
                  <div className="text-center">
                    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm">
                      ID: {member.id}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-center mt-4">Team Member</p>
                </div>
              </div>
            ))}
          </div>

          {/* Team Collaboration Image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white p-6 rounded-3xl shadow-2xl">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Team collaboration"
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Team Statement */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <Users className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-4">Building Together</h3>
              <p className="text-xl text-blue-50 leading-relaxed">
                As a team, we've worked together to create an engaging platform that 
                makes learning to code fun and accessible. Through collaboration and 
                creativity, we've brought LeetCode for Kids to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

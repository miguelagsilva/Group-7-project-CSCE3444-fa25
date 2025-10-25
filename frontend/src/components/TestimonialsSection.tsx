import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star, Quote } from "lucide-react";
import { getTestimonials, Testimonial } from "../api/data";

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    getTestimonials().then(setTestimonials);
  }, []);

  const getColorForIndex = (index: number) => {
    const colors = [
      "bg-pink-100 border-pink-200",
      "bg-blue-100 border-blue-200",
      "bg-green-100 border-green-200",
      "bg-purple-100 border-purple-200"
    ];
    return colors[index % colors.length];
  };

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
            What Kids & Parents <span className="text-blue-600">Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from our coding community - where kids become creators and parents see the magic happen.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => {
            const avatarImages = [
              "https://images.unsplash.com/photo-1525829528215-ffae12a76ac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGtpZHMlMjB0ZWNobm9sb2d5JTIwbGVhcm5pbmd8ZW58MXx8fHwxNzYwNDU1NjE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY29kaW5nJTIwcHJvZ3JhbW1pbmclMjBjaGlsZHJlbnxlbnwxfHx8fDE3NjA0NTU2MTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1674049406486-4b1f6e1845fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBwcm9ncmFtbWluZyUyMGtpZHMlMjBsZWFybmluZ3xlbnwxfHx8fDE3NjA0NTU2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1505976442149-53a82393903b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwbGVhcm5pbmclMjBjb21wdXRlciUyMGdhbWVzfGVufDF8fHx8MTc2MDQ1NTY2OHww&ixlib=rb-4.1.0&q=80&w=1080"
            ];

            return (
              <div 
                key={index}
                className={`${getColorForIndex(index)} p-8 rounded-3xl border-2 transform hover:scale-105 transition-all duration-300 ${
                  index % 2 === 0 ? 'rotate-1 hover:rotate-0' : '-rotate-1 hover:rotate-0'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg bg-gradient-to-br from-blue-400 to-blue-600">
                      <span className="text-2xl">{testimonial.avatar}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white p-1 rounded-full">
                      <Quote className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-gray-800 text-lg mb-4 italic">
                      "{testimonial.text}"
                    </p>
                    
                    <p className="text-gray-600 font-bold">
                      - {testimonial.name}, age {testimonial.age}
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
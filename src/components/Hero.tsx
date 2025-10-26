import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Rocket, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuote(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen  flex items-center justify-center relative overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <Star
            key={i}
            className={`absolute text-white/20 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 8 + 4}px`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 mt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <h1 className="text-hero text-white font-bold leading-tight animate-fade-in-up mb-10">
               Welcome Softforge Technology
               </h1>
               <span className="text-white">"Softforge Technology Pvt. Ltd, we believe every student’s journey deserves to be tracked with care and precision. Through innovative software solutions, we empower schools to monitor progress, streamline administration, and build a brighter future—one student at a time."</span>
               
               <h1 className="text-hero text-white font-bold leading-tight animate-fade-in-up">
                <span className="text-glow text-primary block">Digital Dreams?</span>
              </h1>
              
              {showQuote && (
                <div className="quote-reveal">
                  
                 
                </div>
              )}

              <p className="text-xl text-gray-300 max-w-2xl animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                Empowering Education with Innovative Mobile Solutions

At A Unique Technology Pvt. Ltd, we are proud to lead the way in mobile application development for Android and iOS, delivering cutting-edge solutions tailored for school student tracking and administration. This dashboard provides you with real-time insights and tools to manage your educational ecosystem efficiently.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{animationDelay: '1s'}}>
              <Button asChild variant="hero" size="lg">
                <NavLink to="/signup" className="group">
                  Get Started 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </NavLink>
              </Button>
              <Button asChild variant="glass" size="lg">
                <NavLink to="/services">
                  Explore Services
                </NavLink>
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-400 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>100+ Projects Launched soon</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>98% Success Rate</span>
              </div>
            </div>
          </div>

          {/* Rocket Animation Section */}
          <div className="flex items-center justify-center relative">
            <div className="relative">
              {/* Rocket Container */}
              <div className="rocket-fly">
                <Rocket className="h-64 w-64 text-primary" />
                 <div className="quote-reveal">
                  <blockquote className="text-subtitle text-gray-200 italic leading-relaxed">
                    "Let's Shoot at the moon — if you miss it, you will land among the stars"
                  </blockquote>
                  <cite className="text-sm text-primary block mt-2">— Unique Philosophy</cite>
                </div>
                 <Button asChild variant="hero" size="lg">
                 <NavLink to="/request-demo" className="group text-white font-semibold mt-6 inline-flex items-center ">
                  Reuest a Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </NavLink>
                </Button>
              </div>
              
              {/* Rocket Trail Effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rocket-trail">
                <div className="w-8 h-20 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-full opacity-70"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-10 -left-10 animate-bounce" style={{animationDelay: '0.5s'}}>
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="absolute -top-5 -right-8 animate-bounce" style={{animationDelay: '1s'}}>
                <Star className="h-6 w-6 text-purple-300" />
              </div>
              <div className="absolute -bottom-5 -right-12 animate-bounce" style={{animationDelay: '1.5s'}}>
                <Star className="h-5 w-5 text-blue-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
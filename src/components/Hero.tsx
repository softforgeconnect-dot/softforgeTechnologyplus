import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Rocket, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ✅ Correct way: Import the image so Vite processes it
import heroImage from '@/assets/hero.jpg';   // Make sure this path is correct!

const Hero = () => {
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowQuote(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-white/20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 8 + 4}px`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 mt-20 mb-3">
        <div className="grid lg:grid-cols-2 gap-12 items-center"> {/* Fixed: was lg:grid-cols-1 */}
          
          {/* Content Section */}
          <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">
            <div className="space-y-6">
              <h3 className="text-4xl md:text-5xl text-white font-bold leading-tight animate-fade-in-up mb-10">
                Welcome To Softforge Technology
              </h3>

              <span className=" text-whiteblock mb-6 text-lg ">
                "Softforge Technology Pvt. Ltd, we believe every student’s journey deserves to be tracked with care and precision..."
              </span>

              <h1 className="text-5xl md:text-6xl text-white font-bold leading-tight animate-fade-in-up">
                <span className="text-glow text-primary block">Digital Dreams?</span>
              </h1>

              <p className="text-xl text-gray-300 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                Empowering Education with Innovative Mobile Solutions<br />
                Real-time student tracking, smart administration tools, and seamless Android/iOS apps.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <Button asChild variant="hero" size="lg">
                <NavLink to="/signup" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </NavLink>
              </Button>
              <Button asChild variant="glass" size="lg">
                <NavLink to="/services">Explore Services</NavLink>
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-400 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>100+ Projects Launched soon</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>98% Success Rate</span>
              </div>
            </div>
          </div>

          {/* Image / Rocket Animation Section */}
          <div className="flex items-center justify-center relative order-1 lg:order-2">
            <div className="relative rocket-fly">
              {/* ✅ Now the image will load on Hostinger too! */}
              {/* <img
                src={heroImage}
                alt="Softforge Technology - Empowering Education"
                className="h-80 w-auto max-w-full object-contain drop-shadow-2xl"
              /> */}

              {/* {showQuote && (
                <div className="quote-reveal mt-8 text-center">
                  <blockquote className="text-2xl md:text-3xl text-gray-200 italic leading-relaxed">
                    "Empowering Innovation With Next-Gen Tech."
                  </blockquote>
                </div>
              )} */}

              {/* <Button asChild variant="hero" size="lg" className="mt-8">
                <NavLink to="/request-demo" className="group">
                  Request a Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </NavLink>
              </Button> */}
            </div>

            {/* Rocket trail & floating stars */}
            {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rocket-trail">
              <div className="w-8 h-20 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-full opacity-70 blur-md" />
            </div> */}

           {/*  */}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div> */}
    </section> 
  );
};

export default Hero;
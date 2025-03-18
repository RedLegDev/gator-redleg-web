
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate elements
    const title = titleRef.current;
    const quote = quoteRef.current;
    const cta = ctaRef.current;

    setTimeout(() => {
      if (title) title.style.opacity = '1';
      if (title) title.style.transform = 'translateY(0)';
    }, 300);

    setTimeout(() => {
      if (quote) quote.style.opacity = '1';
      if (quote) quote.style.transform = 'translateY(0)';
    }, 800);

    setTimeout(() => {
      if (cta) cta.style.opacity = '1';
      if (cta) cta.style.transform = 'translateY(0)';
    }, 1200);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Hero background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('/lovable-uploads/ac3eb31a-0a32-423c-93e2-681fd77acbaf.png')",
          backgroundPosition: "center 40%"
        }}
      ></div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80"></div>
      
      {/* Red decorative line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-redleg"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="flex justify-center items-center mb-6">
          <img 
            src="/lovable-uploads/bd767145-b0bf-48ab-b1cf-b97f6b6034cc.png" 
            alt="116th Field Artillery Insignia" 
            className="h-24 md:h-32 animate-fade-in"
          />
        </div>
        
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 opacity-0 transform translate-y-8 transition-all duration-1000"
        >
          GATOR REDLEGS
        </h1>
        
        <div className="w-24 h-1 bg-redleg mx-auto mb-8 animate-fade-in"></div>
        
        <p 
          ref={quoteRef}
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 delay-300"
        >
          The Florida Chapter of the United States Field Artillery Association
        </p>
        
        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 transform translate-y-8 transition-all duration-1000 delay-500"
        >
          <Link to="/membership">
            <button className="button-red">Become a Member</button>
          </Link>
          <Link to="/support/donate">
            <button className="button-ghost text-white border-white hover:bg-white/10">Support Our Mission</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

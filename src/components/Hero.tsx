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
    <section className="relative h-screen bg-hero-pattern bg-cover bg-center flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80"></div>
      
      {/* Red decorative line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-redleg"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 opacity-0 transform translate-y-8 transition-all duration-1000"
        >
          GATOR REDLEGS CHAPTER
        </h1>
        
        <div className="w-24 h-1 bg-redleg mx-auto mb-8 animate-fade-in"></div>
        
        <p 
          ref={quoteRef}
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 delay-300"
        >
          The harder the fighting and the longer the war... the more they lean on the gunners.
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

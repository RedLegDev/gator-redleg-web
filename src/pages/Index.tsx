
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Support from '@/components/Support';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "Gator Redlegs - Florida Chapter of the US Field Artillery Association";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Initialize scroll reveal animation
    const handleScrollAnimation = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
          rect.bottom >= 0
        );
        
        if (isVisible) {
          el.classList.add('reveal');
        }
      });
    };

    // Initial check
    handleScrollAnimation();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScrollAnimation);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Mission />
        <Support />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

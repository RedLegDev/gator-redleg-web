
import React, { useEffect, useRef } from 'react';

const Mission = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const section = sectionRef.current;
    if (section) {
      const scrollElements = section.querySelectorAll('.scroll-reveal');
      scrollElements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (section) {
        const scrollElements = section.querySelectorAll('.scroll-reveal');
        scrollElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white" id="mission">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Who We Are */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center">
            <div className="order-2 md:order-1">
              <div className="scroll-reveal">
                <h2 className="section-heading">WHO WE ARE</h2>
                <p className="text-lg mb-6 text-artillery leading-relaxed">
                  The Gator Redlegs is a professional organization dedicated to supporting Florida's Field Artillery community as the Florida Chapter of the USFAA.
                </p>
                <p className="text-lg text-artillery leading-relaxed">
                  We bring together active duty, National Guard, Reserve, and retired Field Artillery Soldiers, creating a network of mutual support and professional development.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="scroll-reveal relative">
                <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-2xl">
                  <img 
                    src="/lovable-uploads/8d03f7c2-dfd3-4e15-ae50-c03ca6c8f2b2.png" 
                    alt="Historic Field Artillery Unit" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-redleg text-white py-2 px-4 rounded-sm font-bold">
                  Chapter Vision for 2025
                </div>
              </div>
            </div>
          </div>

          {/* Our Mission */}
          <div className="text-center mb-24">
            <div className="scroll-reveal">
              <h2 className="section-heading mx-auto">OUR MISSION</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg mb-6 text-artillery leading-relaxed">
                  The Gator Redlegs is a 501(c)(3) non-profit professional association serving Florida's Field Artillery Soldiers, veterans and their families. As a professional association, we promote the efficiency of the Field Artillery by maintaining its best traditions, and perpetuating the memory and history of our fallen.
                </p>
                <p className="text-lg text-artillery leading-relaxed">
                  As a non-profit, we support Soldiers through family scholarships and contributions to charities serving the veteran community. The Gator Redlegs foster camaraderie in the Field Artillery profession of arms and create a climate of mutual support within the community for our currently serving Field Artillerists.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="scroll-reveal glass-card rounded-lg p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-redleg/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-redleg">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                  <line x1="4" x2="4" y1="22" y2="15"></line>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Tradition</h3>
              <p className="text-artillery-muted">
                We honor and preserve the proud traditions of the Field Artillery, maintaining a deep connection to our storied past.
              </p>
            </div>

            <div className="scroll-reveal glass-card rounded-lg p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-redleg/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-redleg">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Service</h3>
              <p className="text-artillery-muted">
                We are committed to serving our members, veterans, and the wider Field Artillery community in Florida.
              </p>
            </div>

            <div className="scroll-reveal glass-card rounded-lg p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-redleg/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-redleg">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Community</h3>
              <p className="text-artillery-muted">
                We build meaningful connections among Field Artillery professionals, creating a supportive network across Florida.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;


import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Support = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section ref={sectionRef} className="py-24 bg-artillery text-white" id="support">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Support Our Mission</h2>
              <p className="text-lg mb-6 text-white/90 leading-relaxed">
                Your support helps us continue our mission of serving Florida's Field Artillery community. Whether through financial contributions, volunteering, or becoming a member, you're making a difference in the lives of Soldiers and their families.
              </p>
              <p className="text-lg mb-8 text-white/90 leading-relaxed">
                As a 501(c)(3) non-profit organization, all donations to the Gator Redleg Chapter are tax-deductible. Your generosity directly supports scholarships, emergency assistance, and community programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/support/donate">
                  <button className="bg-redleg hover:bg-redleg-light text-white font-bold py-3 px-8 rounded transition-all duration-300">
                    Donate Now
                  </button>
                </Link>
                <Link to="/support/volunteer">
                  <button className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded transition-all duration-300">
                    Volunteer
                  </button>
                </Link>
              </div>
            </div>

            <div className="scroll-reveal">
              <div className="bg-white rounded-lg p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-artillery">Join Our Community</h3>
                <p className="text-artillery-muted mb-6">
                  Become a member of the Gator Redleg Chapter and connect with fellow Field Artillery professionals across Florida. Members receive exclusive benefits while supporting our mission.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-redleg mr-3 flex-shrink-0" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-artillery">Network with Field Artillery professionals</span>
                  </div>
                  <div className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-redleg mr-3 flex-shrink-0" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-artillery">Access to exclusive events and programs</span>
                  </div>
                  <div className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-redleg mr-3 flex-shrink-0" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-artillery">Support scholarships for military families</span>
                  </div>
                  <div className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-redleg mr-3 flex-shrink-0" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-artillery">Quarterly newsletter and updates</span>
                  </div>
                </div>
                <Link to="/membership" className="block">
                  <button className="button-red w-full">
                    Become a Member
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;

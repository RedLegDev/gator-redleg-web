import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Saint Barbara's Day Ball",
    description: "Our most important annual event celebrating the patron saint of Field Artillery.",
    image: "/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png",
    link: "/activities/events/st-barbaras-day"
  },
  {
    id: 2,
    title: "Kenny Fike Memorial Softball Tournament",
    description: "Annual softball tournament honoring the memory of Kenny Fike and raising funds for military families.",
    image: "/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png",
    link: "/activities/events/softball"
  },
  {
    id: 3,
    title: "Annual Golf Tournament",
    description: "Spring golf tournament bringing together Redlegs for a day of camaraderie and fundraising.",
    image: "/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png",
    link: "/activities/events/golf"
  },
  {
    id: 4,
    title: "5K Fun Run",
    description: "Our newest event - a 5K run to raise funds for the chapter and other military organizations.",
    image: "/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png",
    link: "/activities/events/5k"
  }
];

const Events = () => {
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
    <section ref={sectionRef} className="py-24 bg-gray-50" id="events">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="section-heading mx-auto">OUR EVENTS</h2>
          <p className="text-lg text-artillery-muted max-w-3xl mx-auto">
            The Gator Redleg Association hosts several events throughout the year to raise funds for military families and organizations, while bringing our community together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, index) => (
            <div 
              key={event.id} 
              className="scroll-reveal event-card" 
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-w-16 aspect-h-9">
                <img
                  src={event.image}
                  alt={event.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-artillery-muted mb-4 text-sm">{event.description}</p>
                <Link to={event.link} className="text-redleg hover:text-redleg-dark font-medium inline-flex items-center">
                  Learn more
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 scroll-reveal">
          <p className="text-lg mb-6">
            Our events aim to raise money for the chapter and other military organizations. In past years, our events have donated to Heroes on the Water, the Tampa Warriors Veterans Hockey Program and to several Soldiers of the FL Artillery Association.
          </p>
          <Link to="/activities/events">
            <button className="button-red">View All Events</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Events;


import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Calendar, MapPin, Clock, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const StBarbarasDay = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-gray-500 mb-6">
              <Link to="/" className="hover:text-redleg">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link to="/activities" className="hover:text-redleg">Activities</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link to="/activities/events" className="hover:text-redleg">Events</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700">St. Barbara's Day Ball</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-artillery section-heading">
              Saint Barbara's Day Ball
            </h1>
            
            {/* Hero image */}
            <div className="mb-12 bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-80 md:h-96 overflow-hidden">
                <img 
                  src="/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png" 
                  alt="St. Barbara's Day Ball"
                  className="absolute w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">Our Annual Celebration</h2>
                    <p className="text-sm opacity-80">Honoring the Patron Saint of Artillery</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Event details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-redleg mr-3" />
                  <h3 className="font-bold">When</h3>
                </div>
                <p className="text-artillery-muted">December 4th</p>
                <p className="text-artillery-muted">Annual Event</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-redleg mr-3" />
                  <h3 className="font-bold">Where</h3>
                </div>
                <p className="text-artillery-muted">MacDill Air Force Base</p>
                <p className="text-artillery-muted">Tampa, FL</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Users className="h-5 w-5 text-redleg mr-3" />
                  <h3 className="font-bold">Who</h3>
                </div>
                <p className="text-artillery-muted">Redlegs and guests</p>
                <p className="text-artillery-muted">Formal attire required</p>
              </div>
            </div>
            
            {/* Event description */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-artillery mb-6">About the Event</h2>
              
              <div className="prose prose-lg max-w-none text-artillery-muted">
                <p>
                  The Saint Barbara's Day Ball is our most important annual event, celebrating the patron saint of Field Artillery. This formal gathering brings together current and former Field Artillery personnel, their families, and supporters for an evening of camaraderie, tradition, and recognition.
                </p>
                
                <p>
                  The evening typically includes a formal dinner, presentation of the Order of Saint Barbara medals to deserving individuals, special guest speakers, and dancing. It's a time to honor our Field Artillery heritage and recognize those who have made significant contributions to the artillery community.
                </p>
                
                <p>
                  Saint Barbara, the patron saint of artillerymen, is celebrated on December 4th. According to legend, she was martyred for her Christian faith and came to be regarded as the patroness of those in danger from thunderstorms, fire, and explosions. Given the nature of artillery work, our predecessors sought her protection, and she has been associated with artillery units ever since.
                </p>
              </div>
            </div>
            
            {/* Order of Saint Barbara */}
            <div className="mb-12 bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Trophy className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">Order of Saint Barbara</h2>
              </div>
              
              <div className="prose prose-lg max-w-none text-artillery-muted mb-6">
                <p>
                  The Ancient Order of Saint Barbara and the Honorable Order of Saint Barbara are prestigious awards presented to individuals who have demonstrated the highest standards of integrity and moral character, displayed an outstanding competence in the Field Artillery, and contributed to the promotion of the Field Artillery community.
                </p>
                
                <p>
                  These medals are presented at our annual Saint Barbara's Day Ball in a formal ceremony that highlights the importance of these achievements and the rich traditions of the Field Artillery.
                </p>
              </div>
              
              <Link to="/history/st-barbara">
                <button className="button-red">Learn About Saint Barbara</button>
              </Link>
            </div>
            
            {/* Past events and registration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-artillery">Past Celebrations</h3>
                <p className="text-artillery-muted mb-6">
                  Each year, our Saint Barbara's Day Ball brings together the Field Artillery community in Florida for an evening of tradition, recognition, and fellowship.
                </p>
                <Link to="/photos/gallery">
                  <button className="button-ghost border border-redleg text-redleg hover:bg-redleg/5">
                    View Photo Gallery
                  </button>
                </Link>
              </div>
              
              <div className="bg-redleg/5 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-artillery">Registration</h3>
                <p className="text-artillery-muted mb-6">
                  Registration details for the upcoming Saint Barbara's Day Ball will be posted here and sent to our members via email. For questions about attending, please contact us.
                </p>
                <Link to="/more/contact">
                  <button className="button-red">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StBarbarasDay;

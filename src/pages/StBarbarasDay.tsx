
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const StBarbarasDay = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center text-sm text-gray-300 mb-6">
                <Link to="/" className="hover:text-redleg">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/activities" className="hover:text-redleg">Activities</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/activities/events" className="hover:text-redleg">Events</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-gray-400">Saint Barbara's Day Ball</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Saint Barbara's Day Ball</h1>
              <p className="text-xl text-gray-300 mb-8">
                Celebrating the patron saint of Field Artillery with a formal evening of dinner, 
                awards, and camaraderie.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="font-medium">December 4, 2023</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="font-medium">6:00 PM - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="font-medium">MacDill Air Force Base, Tampa, FL</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Attendees</p>
                    <p className="font-medium">Military Personnel and Guests</p>
                  </div>
                </div>
              </div>
              
              <Link to="/support/donate">
                <Button size="lg" className="bg-redleg hover:bg-redleg-dark text-white">
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Event Details Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-3xl font-bold text-artillery mb-6">Event Details</h2>
                  
                  <div className="prose max-w-none mb-8">
                    <p className="text-lg mb-4">
                      The Saint Barbara's Day Ball is the premier annual event for the Gator Redleg Chapter, 
                      bringing together Field Artillery personnel past and present to celebrate our branch heritage 
                      and honor the patron saint of artillerymen.
                    </p>
                    
                    <p className="mb-4">
                      The evening begins with a cocktail hour where attendees can mingle and reconnect. 
                      The formal program follows with dinner, guest speakers, and the prestigious Saint Barbara 
                      and Molly Pitcher award ceremonies recognizing outstanding contributions to the Field Artillery 
                      community.
                    </p>
                    
                    <p className="mb-4">
                      After the formal ceremonies, the evening continues with music and dancing. The event is open 
                      to active duty and retired military personnel, their families, and invited guests.
                    </p>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">Dress Code</h3>
                    <p className="mb-4">
                      <strong>Military:</strong> Dress Mess/Army Service Uniform with bow tie<br />
                      <strong>Civilian:</strong> Black tie/formal attire
                    </p>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">Tickets</h3>
                    <p>
                      Tickets include dinner, complimentary drinks, and all evening activities. Early registration is 
                      recommended as this event typically sells out weeks in advance.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                    <h3 className="text-xl font-bold text-artillery mb-4">Event Schedule</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">6:00 PM - 7:00 PM</p>
                        <p className="text-artillery-muted">Cocktail Reception</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">7:00 PM - 8:30 PM</p>
                        <p className="text-artillery-muted">Dinner & Keynote Speaker</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">8:30 PM - 9:30 PM</p>
                        <p className="text-artillery-muted">Award Ceremony</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">9:30 PM - 11:00 PM</p>
                        <p className="text-artillery-muted">Dancing & Social</p>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Link to="/support/donate">
                        <Button className="w-full bg-redleg hover:bg-redleg-dark text-white">
                          Register Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
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

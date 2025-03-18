
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, Trophy } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Golf = () => {
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
                <span className="text-gray-400">Annual Golf Tournament</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Annual Golf Tournament</h1>
              <p className="text-xl text-gray-300 mb-8">
                A day on the links bringing together Redlegs and supporters for camaraderie and fundraising.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="font-medium">May 20, 2023</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="font-medium">8:00 AM Shotgun Start</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="font-medium">Westchase Golf Club, Tampa, FL</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Format</p>
                    <p className="font-medium">4-Person Scramble</p>
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
                      The Gator Redleg Chapter's Annual Golf Tournament is a popular spring event that brings 
                      together Field Artillery personnel, veterans, and supporters for a day of friendly competition 
                      and networking on the links.
                    </p>
                    
                    <p className="mb-4">
                      This tournament is one of our primary fundraising events, with proceeds supporting our scholarship 
                      fund for military families and various community outreach programs. The event features a 
                      four-person scramble format, ensuring a fun and engaging experience for golfers of all skill levels.
                    </p>
                    
                    <p className="mb-4">
                      In addition to the tournament itself, participants can enjoy various contests including longest drive, 
                      closest to the pin, and a hole-in-one competition with a chance to win exciting prizes.
                    </p>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">Tournament Format</h3>
                    <ul className="list-disc pl-6 mb-4">
                      <li>4-Person Scramble</li>
                      <li>Shotgun start at 8:00 AM</li>
                      <li>Maximum of 36 teams (144 players)</li>
                      <li>Prizes for 1st, 2nd, and 3rd place teams</li>
                      <li>Special contest holes throughout the course</li>
                    </ul>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">Registration Includes</h3>
                    <ul className="list-disc pl-6 mb-4">
                      <li>18 holes of golf with cart</li>
                      <li>Tournament swag bag</li>
                      <li>Range balls</li>
                      <li>Breakfast</li>
                      <li>Lunch and awards ceremony</li>
                      <li>Two beverage tickets</li>
                    </ul>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">Registration Fees</h3>
                    <p>
                      Individual Player: $125<br />
                      Team of Four: $450<br />
                      Sponsorship opportunities also available
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                    <h3 className="text-xl font-bold text-artillery mb-4">Tournament Schedule</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">6:30 AM</p>
                        <p className="text-artillery-muted">Registration Opens</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">7:00 AM</p>
                        <p className="text-artillery-muted">Breakfast & Driving Range Open</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">7:45 AM</p>
                        <p className="text-artillery-muted">Welcome & Rules Briefing</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">8:00 AM</p>
                        <p className="text-artillery-muted">Shotgun Start</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">1:00 PM</p>
                        <p className="text-artillery-muted">Lunch & Award Ceremony</p>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-artillery mb-4">Sponsorship Opportunities</h3>
                      <ul className="space-y-2">
                        <li>Title Sponsor: $2,500</li>
                        <li>Lunch Sponsor: $1,500</li>
                        <li>Beverage Cart Sponsor: $1,000</li>
                        <li>Hole Sponsor: $250</li>
                      </ul>
                      
                      <div className="mt-6">
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Golf;

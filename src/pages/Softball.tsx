
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, Trophy } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Softball = () => {
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
                <span className="text-gray-400">Kenny Fike Memorial Softball Tournament</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Kenny Fike Memorial Softball Tournament</h1>
              <p className="text-xl text-gray-300 mb-8">
                A day of friendly competition honoring the memory of Kenny Fike while 
                raising funds for military families in need.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="font-medium">April 15, 2023</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="font-medium">9:00 AM - 5:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="font-medium">Veterans Park, Tampa, FL</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Teams</p>
                    <p className="font-medium">Up to 16 teams</p>
                  </div>
                </div>
              </div>
              
              <Link to="/support/donate">
                <Button size="lg" className="bg-redleg hover:bg-redleg-dark text-white">
                  Register Your Team
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
                      The Kenny Fike Memorial Softball Tournament brings together Field Artillery units, veterans, 
                      and supporters for a day of friendly competition and camaraderie on the field.
                    </p>
                    
                    <p className="mb-4">
                      Kenny Fike was a dedicated artilleryman who served with distinction. This tournament honors 
                      his memory and his commitment to unit cohesion and physical fitness. All proceeds from the 
                      tournament go directly to supporting military families in need through our chapter's assistance fund.
                    </p>
                    
                    <p className="mb-4">
                      The tournament features a double-elimination format, ensuring that each team gets to play at least 
                      two games. Teams can be composed of active duty personnel, veterans, family members, or supporters.
                    </p>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">Tournament Format</h3>
                    <ul className="list-disc pl-6 mb-4">
                      <li>Double elimination format</li>
                      <li>7-inning games</li>
                      <li>ASA softball rules</li>
                      <li>Co-ed teams encouraged (at least 2 women per team)</li>
                      <li>Maximum of 16 teams</li>
                    </ul>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">Registration</h3>
                    <p className="mb-4">
                      Team registration fee: $250 per team<br/>
                      Includes: Tournament entry, team t-shirts, lunch, and beverages for all players
                    </p>
                    
                    <p>
                      Spectators are welcome and encouraged to attend! Food trucks and refreshments will be available 
                      throughout the day, and there will be activities for children.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                    <h3 className="text-xl font-bold text-artillery mb-4">Tournament Schedule</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">8:00 AM</p>
                        <p className="text-artillery-muted">Team Check-in</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">9:00 AM</p>
                        <p className="text-artillery-muted">Opening Ceremony</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">9:30 AM</p>
                        <p className="text-artillery-muted">First Round Games Begin</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">12:00 PM</p>
                        <p className="text-artillery-muted">Lunch Break</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">1:00 PM</p>
                        <p className="text-artillery-muted">Tournament Continues</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">4:30 PM</p>
                        <p className="text-artillery-muted">Championship Game</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">5:00 PM</p>
                        <p className="text-artillery-muted">Awards Ceremony</p>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Link to="/support/donate">
                        <Button className="w-full bg-redleg hover:bg-redleg-dark text-white">
                          Register Your Team
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

export default Softball;

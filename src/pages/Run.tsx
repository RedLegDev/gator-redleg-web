
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, Award } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Run = () => {
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
                <span className="text-gray-400">5K Fun Run</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Field Artillery 5K Fun Run</h1>
              <p className="text-xl text-gray-300 mb-8">
                Join us for a fitness-focused event supporting our scholarship fund.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="font-medium">March 15, 2023</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="font-medium">8:00 AM Start</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="font-medium">Al Lopez Park, Tampa, FL</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Award className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Registration Fee</p>
                    <p className="font-medium">$30 Adults | $15 Children (12 & under)</p>
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
                      The Field Artillery 5K Fun Run is one of our newest annual events, promoting fitness and 
                      camaraderie among Field Artillery personnel, veterans, and their families.
                    </p>
                    
                    <p className="mb-4">
                      This family-friendly event welcomes participants of all ages and abilities to walk or run 
                      in support of our cause. The course winds through the beautiful Al Lopez Park in Tampa, 
                      providing a scenic and enjoyable experience for all participants.
                    </p>
                    
                    <p className="mb-4">
                      All proceeds from the run support our scholarship fund, which provides educational 
                      assistance to family members of Field Artillery Soldiers.
                    </p>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">Event Features</h3>
                    <ul className="list-disc pl-6 mb-4">
                      <li>Professionally timed 5K race</li>
                      <li>Commemorative t-shirt for all registered participants</li>
                      <li>Age group awards for top finishers</li>
                      <li>Post-race refreshments and celebration</li>
                      <li>Military team competition</li>
                      <li>Family-friendly atmosphere</li>
                    </ul>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">Registration Options</h3>
                    <ul className="list-disc pl-6 mb-4">
                      <li>Individual Runner/Walker: $30</li>
                      <li>Children (12 & under): $15</li>
                      <li>Military Team (5 members): $125</li>
                      <li>Virtual Participant: $25</li>
                    </ul>
                    
                    <p>
                      Registration includes a commemorative t-shirt, race bib, timing chip, and post-race refreshments.
                      Virtual participants receive a t-shirt and can complete the 5K on their own time and location.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                    <h3 className="text-xl font-bold text-artillery mb-4">Event Schedule</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">7:00 AM</p>
                        <p className="text-artillery-muted">Check-in & Registration Opens</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">7:45 AM</p>
                        <p className="text-artillery-muted">Pre-race Announcements</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">8:00 AM</p>
                        <p className="text-artillery-muted">Race Start</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">9:15 AM</p>
                        <p className="text-artillery-muted">Awards Ceremony</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">10:00 AM</p>
                        <p className="text-artillery-muted">Event Concludes</p>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-artillery mb-4">Sponsorship Opportunities</h3>
                      <ul className="space-y-2">
                        <li>Title Sponsor: $1,500</li>
                        <li>Starting Line Sponsor: $750</li>
                        <li>Finish Line Sponsor: $750</li>
                        <li>Water Station Sponsor: $500</li>
                        <li>Mile Marker Sponsor: $250</li>
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

export default Run;

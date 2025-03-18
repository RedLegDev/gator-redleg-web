
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, Trophy } from 'lucide-react';
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
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">5K Fun Run</h1>
              <p className="text-xl text-gray-300 mb-8">
                A family-friendly event promoting fitness and camaraderie among Field Artillery personnel and their families.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="font-medium">September 9, 2023</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="font-medium">7:30 AM - 11:00 AM</p>
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
                  <Users className="h-6 w-6 mr-3 text-redleg" />
                  <div>
                    <p className="text-sm text-gray-400">Participants</p>
                    <p className="font-medium">Runners and Walkers of All Ages</p>
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
                      Our 5K Fun Run is the newest addition to the Gator Redleg Chapter's annual events, promoting fitness and 
                      camaraderie among Field Artillery personnel, veterans, and their families.
                    </p>
                    
                    <p className="mb-4">
                      This family-friendly event welcomes participants of all ages and abilities. Whether you're a competitive 
                      runner looking to set a personal record or prefer a leisurely walk through the park, this event is for you. 
                      Children are encouraged to participate alongside their parents.
                    </p>
                    
                    <p className="mb-4">
                      The course winds through the beautiful Al Lopez Park, offering a scenic route that's suitable for all fitness 
                      levels. Water stations will be positioned throughout the course, and medical support will be available.
                    </p>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">Registration Includes</h3>
                    <ul className="list-disc pl-6 mb-4">
                      <li>Official event t-shirt</li>
                      <li>Race bib with timing chip</li>
                      <li>Finisher medal</li>
                      <li>Post-race refreshments</li>
                      <li>Access to the post-race celebration</li>
                    </ul>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">Categories and Awards</h3>
                    <p className="mb-4">
                      Awards will be presented to the top three male and female finishers in the following age categories:
                    </p>
                    <ul className="list-disc pl-6 mb-4">
                      <li>14 and under</li>
                      <li>15-19</li>
                      <li>20-29</li>
                      <li>30-39</li>
                      <li>40-49</li>
                      <li>50-59</li>
                      <li>60+</li>
                    </ul>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">Registration Fees</h3>
                    <p>
                      Early Bird (until August 1): $25<br />
                      Regular Registration: $35<br />
                      Day-of Registration: $45<br />
                      Military Discount: $5 off with valid military ID<br />
                      Children under 12: $15
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                    <h3 className="text-xl font-bold text-artillery mb-4">Event Schedule</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">6:30 AM</p>
                        <p className="text-artillery-muted">Check-in & Registration Opens</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">7:15 AM</p>
                        <p className="text-artillery-muted">Pre-race Stretching & Warm-up</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">7:30 AM</p>
                        <p className="text-artillery-muted">5K Run/Walk Begins</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">8:30 AM</p>
                        <p className="text-artillery-muted">Kids' Fun Run (Ages 10 & Under)</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">9:00 AM</p>
                        <p className="text-artillery-muted">Post-race Refreshments</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">10:00 AM</p>
                        <p className="text-artillery-muted">Awards Ceremony</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 space-y-4">
                      <h3 className="text-xl font-bold text-artillery mb-2">Course Map</h3>
                      <div className="bg-gray-200 h-40 rounded flex items-center justify-center text-gray-500">
                        Course Map Image
                      </div>
                      
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

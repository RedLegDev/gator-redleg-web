
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, Calendar, Heart, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Volunteer = () => {
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
              <Link to="/support" className="hover:text-redleg">Support</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700">Volunteer</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-artillery section-heading">
              Volunteer Opportunities
            </h1>
            
            <p className="text-lg text-gray-600 mb-12">
              Share your time and talents to help the Gator Redlegs Chapter serve Florida's Field Artillery community.
            </p>
            
            <div className="space-y-12">
              {/* Event Volunteering */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-redleg/10 rounded-full mr-4">
                    <Calendar className="h-6 w-6 text-redleg" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-artillery mb-2">Event Volunteering</h2>
                    <p className="text-artillery-muted mb-4">
                      Our events throughout the year require volunteers for various roles, from registration and setup to
                      coordination and cleanup.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-2">Upcoming Events Needing Volunteers:</h3>
                    <ul className="list-disc pl-6 mb-4 text-artillery-muted">
                      <li>Saint Barbara's Day Ball - December</li>
                      <li>Annual Golf Tournament - May</li>
                      <li>Kenny Fike Memorial Softball Tournament - October</li>
                      <li>5K Fun Run - March</li>
                    </ul>
                    
                    <Link to="/activities/events">
                      <button className="text-redleg hover:underline flex items-center">
                        View all events
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Committee Membership */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-redleg/10 rounded-full mr-4">
                    <Users className="h-6 w-6 text-redleg" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-artillery mb-2">Committee Membership</h2>
                    <p className="text-artillery-muted mb-4">
                      Join one of our committees and help guide our chapter's activities and initiatives.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-2">Current Committees:</h3>
                    <ul className="list-disc pl-6 mb-4 text-artillery-muted">
                      <li>Events Committee</li>
                      <li>Scholarship Committee</li>
                      <li>Membership Committee</li>
                      <li>Communications Committee</li>
                      <li>Community Outreach Committee</li>
                    </ul>
                    
                    <p className="text-artillery-muted mb-4">
                      Committee members typically meet monthly and contribute their expertise to furthering our mission.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Skills-Based Volunteering */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-redleg/10 rounded-full mr-4">
                    <Star className="h-6 w-6 text-redleg" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-artillery mb-2">Skills-Based Volunteering</h2>
                    <p className="text-artillery-muted mb-4">
                      Contribute your professional skills and expertise to help our chapter thrive.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-2">Areas of Need:</h3>
                    <ul className="list-disc pl-6 mb-4 text-artillery-muted">
                      <li>Graphic Design and Marketing</li>
                      <li>Website Management</li>
                      <li>Social Media</li>
                      <li>Photography and Videography</li>
                      <li>Grant Writing</li>
                      <li>Accounting and Financial Management</li>
                    </ul>
                    
                    <p className="text-artillery-muted mb-4">
                      Skills-based volunteering can be done on a project basis or as an ongoing commitment.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-artillery mb-6 text-center">Volunteer Interest Form</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">Areas of Interest</label>
                    <select
                      id="interests"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                    >
                      <option value="">Select an area</option>
                      <option value="events">Event Volunteering</option>
                      <option value="committee">Committee Membership</option>
                      <option value="skills">Skills-Based Volunteering</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                      placeholder="Please share any skills, experience, or availability information."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-redleg text-white py-3 px-6 rounded-md hover:bg-redleg/90 transition duration-300"
                  >
                    Submit Interest Form
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Volunteer;

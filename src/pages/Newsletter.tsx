
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, FileText, Download, Archive, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Newsletter = () => {
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
              <span className="text-gray-700">Newsletter</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-artillery section-heading">
              The Gator Redlegs Newsletter
            </h1>
            
            <p className="text-lg text-gray-600 mb-12">
              Our quarterly newsletter keeps members and supporters informed about chapter activities, events, and initiatives.
              It also highlights the achievements of our members and the impact of our programs.
            </p>
            
            {/* Latest issue section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 bg-artillery">
                  <div className="h-full flex items-center justify-center p-8">
                    <FileText className="h-32 w-32 text-white" />
                  </div>
                </div>
                <div className="md:w-3/5 p-8">
                  <h2 className="text-2xl font-bold text-artillery mb-4">Latest Issue: Summer 2023</h2>
                  <p className="text-artillery-muted mb-6">
                    Our latest newsletter features recaps of recent events, announcements of upcoming activities,
                    member spotlights, and updates on our scholarship program.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/newsletter/latest">
                      <button className="bg-redleg text-white py-2 px-6 rounded-md hover:bg-redleg/90 transition duration-300 w-full sm:w-auto mb-2 sm:mb-0">
                        Read Online
                      </button>
                    </Link>
                    <button className="bg-white text-redleg border border-redleg py-2 px-6 rounded-md hover:bg-redleg/5 transition duration-300 flex items-center justify-center w-full sm:w-auto">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* What's inside section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-artillery mb-6">What's Inside Our Newsletter</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-redleg">President's Message</h3>
                  <p className="text-gray-700">
                    Updates from our chapter president on recent accomplishments, future plans, and strategic initiatives.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-redleg">Event Recaps</h3>
                  <p className="text-gray-700">
                    Summaries and photos from recent events including St. Barbara's Day, golf tournaments, and community service activities.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-redleg">Member Spotlights</h3>
                  <p className="text-gray-700">
                    Profiles of chapter members highlighting their military service, civilian careers, and contributions to our community.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-redleg">Upcoming Events</h3>
                  <p className="text-gray-700">
                    Calendar of upcoming chapter activities, events, and opportunities to get involved.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-redleg">Scholarship Updates</h3>
                  <p className="text-gray-700">
                    Information about our scholarship program, including recipient profiles and application deadlines.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-redleg">Field Artillery News</h3>
                  <p className="text-gray-700">
                    Updates on Field Artillery developments, technologies, and news relevant to our community.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Archive section */}
            <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
              <div className="flex items-center mb-6">
                <Archive className="h-8 w-8 text-redleg mr-3" />
                <h2 className="text-2xl font-bold text-artillery">Newsletter Archive</h2>
              </div>
              
              <p className="text-artillery-muted mb-6">
                Access our collection of past newsletters to learn about our chapter's history and previous activities.
              </p>
              
              <Link to="/newsletter/archive">
                <button className="bg-redleg text-white py-2 px-6 rounded-md hover:bg-redleg/90 transition duration-300">
                  Browse Archive
                </button>
              </Link>
            </div>
            
            {/* Subscription section */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Mail className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-2xl font-bold text-artillery">Subscribe to Our Newsletter</h2>
              </div>
              
              <p className="text-artillery-muted mb-6">
                Stay informed about Gator Redlegs activities, events, and initiatives by subscribing to our quarterly newsletter.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                />
                <button
                  type="submit"
                  className="bg-redleg text-white py-2 px-6 rounded-md hover:bg-redleg/90 transition duration-300"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-sm text-gray-500 mt-3">
                We respect your privacy. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Newsletter;

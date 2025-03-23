
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, Download, Calendar, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const LatestNewsletter = () => {
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
              <Link to="/newsletter" className="hover:text-redleg">Newsletter</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700">Latest Edition</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-artillery section-heading">
              Gator Redlegs Newsletter
            </h1>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
              <div className="p-6 bg-gray-50 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-artillery">Summer 2023 Edition</h2>
                  <div className="flex items-center mt-2">
                    <Calendar className="h-4 w-4 text-redleg mr-2" />
                    <span className="text-sm text-gray-600">Published: June 15, 2023</span>
                  </div>
                </div>
                <a 
                  href="#" 
                  className="bg-redleg text-white py-2 px-4 rounded-md hover:bg-redleg/90 transition duration-300 flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </a>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-artillery mb-6">In This Issue</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-redleg">President's Message</h4>
                    <p className="text-artillery-muted">
                      A message from our chapter president discussing our recent accomplishments and upcoming initiatives.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-redleg">Annual Golf Tournament Recap</h4>
                    <p className="text-artillery-muted">
                      A summary of our successful annual golf tournament, which raised over $15,000 for our scholarship fund.
                      Thank you to all participants and sponsors!
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-redleg">Scholarship Recipients Announced</h4>
                    <p className="text-artillery-muted">
                      Meet the recipients of this year's Gator Redlegs scholarships. Learn about their accomplishments
                      and future plans.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-redleg">Upcoming Events</h4>
                    <p className="text-artillery-muted">
                      Mark your calendars for these upcoming Gator Redlegs events:
                    </p>
                    <ul className="list-disc pl-6 mt-2 text-artillery-muted">
                      <li>Kenny Fike Memorial Softball Tournament - October 12, 2023</li>
                      <li>Fall Member Social - September 18, 2023</li>
                      <li>St. Barbara's Day Ball - December 4, 2023</li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-redleg">Member Spotlight</h4>
                    <p className="text-artillery-muted">
                      This issue features longtime member COL (Ret.) Michael Johnson, who shares his experiences
                      serving with Florida Field Artillery units and his continued involvement with our chapter.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-redleg">Community Impact</h4>
                    <p className="text-artillery-muted">
                      Learn about our recent community service initiatives and how our members are making a
                      difference in the lives of Field Artillery Soldiers and their families.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Newsletter navigation */}
            <div className="flex items-center justify-between mb-12">
              <div></div>
              <Link 
                to="/newsletter/archive" 
                className="text-redleg hover:underline font-medium flex items-center"
              >
                View Past Newsletters
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            {/* Newsletter subscription */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Mail className="h-6 w-6 text-redleg" />
                </div>
                <h3 className="text-2xl font-bold text-artillery">Subscribe to Our Newsletter</h3>
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

export default LatestNewsletter;

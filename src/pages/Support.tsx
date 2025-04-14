
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight } from 'lucide-react';

const Support = () => {
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
              <span className="text-gray-700">Support Our Mission</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-artillery">Support Our Mission</h1>
            <p className="text-lg text-gray-600 mb-6">
              Learn how you can support the Gator Redlegs Chapter's mission to serve Field Artillery Soldiers and their families.
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12 text-center">
              <p className="font-medium text-artillery text-lg mb-2">
                We are a 501(c)(3) non-profit organization
              </p>
              <p className="text-gray-600">
                EIN: 82-4625785
              </p>
              <p className="text-gray-600 mt-2">
                All donations are tax-deductible to the extent allowed by law
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-artillery">Make a Donation</h2>
                <p className="text-gray-600 mb-6">
                  Your financial support helps us provide scholarships, emergency assistance, and support programs for Field Artillery Soldiers and their families.
                </p>
                <Link to="/support/donate">
                  <button className="w-full bg-redleg text-white py-3 px-6 rounded-md hover:bg-redleg/90 transition duration-300">
                    Donate Now
                  </button>
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-artillery">Volunteer With Us</h2>
                <p className="text-gray-600 mb-6">
                  Share your time and talents to help us serve the Field Artillery community in Florida. There are many ways to get involved.
                </p>
                <Link to="/support/volunteer">
                  <button className="w-full bg-redleg text-white py-3 px-6 rounded-md hover:bg-redleg/90 transition duration-300">
                    Volunteer Opportunities
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-artillery text-center">Other Ways to Support</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Become a Member</h3>
                  <p className="text-gray-600 mb-4">
                    Join our community of Field Artillery professionals and supporters. Your membership dues help fund our programs and activities.
                  </p>
                  <div className="text-redleg hover:underline font-medium">
                    <Link to="/membership" className="inline-flex items-center">
                      Learn about membership <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Learn About Our Mission</h3>
                  <p className="text-gray-600 mb-4">
                    Find out more about who we are and the important work we do for Florida's Field Artillery community.
                  </p>
                  <div className="text-redleg hover:underline font-medium">
                    <Link to="/about" className="inline-flex items-center">
                      Visit our About page <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Corporate Partnerships</h3>
                  <p className="text-gray-600 mb-4">
                    We welcome partnerships with businesses and organizations that share our commitment to supporting Florida's Field Artillery community.
                  </p>
                  <div className="text-redleg hover:underline font-medium">
                    <Link to="/more/contact" className="inline-flex items-center">
                      Contact us about partnerships <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
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

export default Support;

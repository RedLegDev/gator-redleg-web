
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Flag, Users, BookOpen, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import MissionSection from '@/components/History/MissionSection';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-6 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-gray-500 mb-6">
              <Link to="/" className="hover:text-redleg">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700">About Us</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-artillery section-heading">
              About Gator Redlegs
            </h1>
            
            <div className="mb-12 prose prose-lg max-w-none text-artillery-muted">
              <p>
                The Gator Redleg Chapter of the United States Field Artillery Association (USFAA) is a 501(c)(3) non-profit professional 
                association serving Florida's Field Artillery Soldiers, veterans and their families.
              </p>
            </div>
            
            {/* Mission Section */}
            <MissionSection />
            
            {/* Organization Structure Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Users className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">Organization Structure</h2>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-artillery-muted mb-4">
                  The Gator Redlegs chapter is led by a volunteer board of directors comprised of current and former 
                  Field Artillery officers and enlisted personnel. Our leadership team brings decades of combined 
                  experience in Field Artillery operations, training, and community support.
                </p>
                
                <p className="text-artillery-muted">
                  We operate across Florida, with members representing all branches of service containing Field Artillery 
                  units, including the Army, National Guard, and Reserves. As a Florida chapter of the national United States 
                  Field Artillery Association, we coordinate our efforts with the national organization while maintaining 
                  our focus on local community needs.
                </p>
              </div>
            </div>
            
            {/* What We Do Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <BookOpen className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">What We Do</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-redleg">Scholarship Programs</h3>
                  <p className="text-gray-700">
                    We provide educational scholarships to family members of Field Artillery Soldiers, 
                    helping to ensure that the children of those who serve have access to quality education.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-redleg">Community Events</h3>
                  <p className="text-gray-700">
                    We organize and sponsor community events that bring together Field Artillery 
                    personnel, veterans, and their families to foster camaraderie and mutual support.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-redleg">Professional Development</h3>
                  <p className="text-gray-700">
                    We support the professional development of Field Artillery personnel through 
                    educational programs, networking opportunities, and mentorship initiatives.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-redleg">Historical Preservation</h3>
                  <p className="text-gray-700">
                    We work to preserve and promote the rich heritage and history of Field Artillery 
                    in Florida through educational materials, exhibits, and special events.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Recognition Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Award className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">501(c)(3) Status</h2>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-artillery-muted mb-4">
                  The Gator Redleg Chapter is recognized by the Internal Revenue Service as a 501(c)(3) 
                  non-profit organization, which means that all donations are tax-deductible to the extent 
                  allowed by law.
                </p>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-4 text-center">
                  <p className="font-medium text-artillery text-lg mb-2">
                    We are a 501(c)(3) non-profit organization
                  </p>
                  <p className="text-gray-600">
                    EIN: 82-4625785
                  </p>
                </div>
                
                <p className="text-artillery-muted">
                  Your support helps us continue our mission of serving Florida's Field Artillery community. 
                  Consider making a tax-deductible donation or volunteering your time to help us make a difference.
                </p>
              </div>
            </div>
            
            {/* Call to action */}
            <div className="bg-gray-50 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-artillery">Join Our Mission</h3>
                <p className="text-gray-600 mb-4 md:mb-0">
                  Become part of the Gator Redlegs community and help support Florida's Field Artillery personnel.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/membership">
                  <button className="button-red w-full sm:w-auto">Become a Member</button>
                </Link>
                <Link to="/support">
                  <button className="button-ghost border border-redleg text-redleg hover:bg-redleg/5 w-full sm:w-auto">
                    Support Our Cause
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

export default About;

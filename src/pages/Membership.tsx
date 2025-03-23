
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Membership = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-gray-500 mb-6">
              <Link to="/" className="hover:text-redleg">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700">Membership</span>
            </nav>
            
            <PlaceholderPage 
              title="Membership Information" 
              description="Learn about becoming a member of the Gator Redlegs Chapter and the benefits of membership."
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Membership;

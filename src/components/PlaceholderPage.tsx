
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  comingSoon?: boolean;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ 
  title, 
  description = "This page is currently under construction.", 
  comingSoon = true 
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-artillery mb-6">{title}</h1>
          
          {comingSoon && (
            <div className="inline-block px-3 py-1 bg-redleg/10 text-redleg rounded-full text-sm font-medium mb-8">
              Coming Soon
            </div>
          )}
          
          <p className="text-xl text-artillery-muted max-w-2xl mx-auto mb-10">
            {description}
          </p>
          
          <Link to="/" className="button-red">
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlaceholderPage;

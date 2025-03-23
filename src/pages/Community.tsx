
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

const Community = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <PlaceholderPage 
          title="Community Outreach" 
          description="Learn about our community service efforts and how we give back to the Field Artillery community."
        />
      </main>
      <Footer />
    </div>
  );
};

export default Community;

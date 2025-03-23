
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

const Membership = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <PlaceholderPage 
          title="Membership Information" 
          description="Learn about becoming a member of the Gator Redlegs Chapter and the benefits of membership."
        />
      </main>
      <Footer />
    </div>
  );
};

export default Membership;

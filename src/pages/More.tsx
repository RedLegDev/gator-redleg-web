
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

const More = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <PlaceholderPage 
          title="More Information" 
          description="Additional resources and information about the Gator Redlegs Chapter."
        />
      </main>
      <Footer />
    </div>
  );
};

export default More;

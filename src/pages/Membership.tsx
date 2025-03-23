
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MembershipHero from '@/components/Membership/MembershipHero';
import MembershipQuote from '@/components/Membership/MembershipQuote';
import MembershipInfo from '@/components/Membership/MembershipInfo';
import MembershipPricing from '@/components/Membership/MembershipPricing';
import LifetimeMembership from '@/components/Membership/LifetimeMembership';
import JoinCTA from '@/components/Membership/JoinCTA';

const Membership = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <MembershipHero />
            <MembershipQuote />
            <MembershipInfo />
            <MembershipPricing />
            <LifetimeMembership />
            <JoinCTA />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Membership;

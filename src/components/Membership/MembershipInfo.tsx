
import React from 'react';
import JoinInfoCard from './JoinInfoCard';
import AusaPartnershipCard from './AusaPartnershipCard';

const MembershipInfo = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      <JoinInfoCard />
      <AusaPartnershipCard />
    </div>
  );
};

export default MembershipInfo;

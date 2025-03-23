
import React from 'react';
import { Award } from 'lucide-react';

const AusaPartnershipCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Award className="h-6 w-6 text-redleg mr-3" />
        <h2 className="text-2xl font-bold text-artillery">AUSA Partnership</h2>
      </div>
      <p className="text-gray-600 mb-4">
        We have recently become teammates with the Association of the United States Army. As long as you are a member of the United States Field Artillery Association you gain complementary membership in AUSA.
      </p>
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h3 className="font-bold text-artillery mb-2">What You Need to Know:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>You do not have to do anything else to get your membership with AUSA recognized</li>
          <li>The Field Artillery Association ensures you are enrolled</li>
          <li>AUSA has been a huge advocate for force structure</li>
          <li>Significant retail discounts are now available to all members</li>
        </ul>
      </div>
      <div className="flex justify-center mt-6">
        <img 
          src="/placeholder.svg" 
          alt="AUSA Logo" 
          className="h-16 opacity-60"
        />
      </div>
    </div>
  );
};

export default AusaPartnershipCard;

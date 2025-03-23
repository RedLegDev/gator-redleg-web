
import React from 'react';
import { Users } from 'lucide-react';

const JoinInfoCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Users className="h-6 w-6 text-redleg mr-3" />
        <h2 className="text-2xl font-bold text-artillery">Join Today!</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Since its humble beginnings on horseback at Fort Riley in the first decade of this century, the United States Field Artillery Association has served important purposes and contributed to the development of the world's best Field Artillery. Today's Association continues this proud Redleg tradition.
      </p>
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-artillery mb-2">Membership Benefits:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Artillery Journal subscription</li>
          <li>Scholarship eligibility</li>
          <li>Complimentary membership in the AUSA</li>
          <li>Supporting the Gator Redlegs in your community</li>
        </ul>
      </div>
      <div className="mb-4">
        <a 
          href="https://www.fieldartillery.org/membership-information" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-redleg hover:underline font-medium"
        >
          Visit fieldartillery.org →
        </a>
      </div>
      <p className="text-sm text-gray-500">
        Visit for more information about the organization, including small business or corporate enrollment and membership renewal.
      </p>
    </div>
  );
};

export default JoinInfoCard;

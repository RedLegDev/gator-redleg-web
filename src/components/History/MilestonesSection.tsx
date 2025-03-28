
import React from 'react';
import { Clock } from 'lucide-react';

const MilestonesSection: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-4">
        <div className="mr-4 p-2 bg-redleg/10 rounded-full">
          <Clock className="h-6 w-6 text-redleg" />
        </div>
        <h2 className="text-3xl font-bold text-artillery">Key Milestones</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-redleg">1898</h3>
          <p className="text-gray-700">
            Originally organized as the 1st Florida Infantry during the Spanish–American War.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-redleg">1917-1919</h3>
          <p className="text-gray-700">
            Regiment organized at Camp Wheeler, Georgia as part of the 31st (Dixie) Division.
            Transported overseas during World War I and later mustered from federal service.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-redleg">December 5, 1921</h3>
          <p className="text-gray-700">
            Sumter L. Lowry Jr. of Tampa, Florida presented three batteries for federal recognition,
            forming the First Battalion 116th Field Artillery under his command.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-redleg">January 20, 1924</h3>
          <p className="text-gray-700">
            The full regiment receives federal recognition at Tampa after the expansion
            to include the Second Battalion with units across central Florida.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-redleg">1926-1936</h3>
          <p className="text-gray-700">
            The regiment serves Florida communities through multiple emergency missions,
            including hurricane relief efforts and civil support operations.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-redleg">July 16, 1933</h3>
          <p className="text-gray-700">
            The regiment modernizes by converting from horse-drawn to truck-drawn artillery,
            significantly enhancing its mobility and operational capabilities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MilestonesSection;

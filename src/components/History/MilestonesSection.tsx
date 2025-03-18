
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
      </div>
    </div>
  );
};

export default MilestonesSection;

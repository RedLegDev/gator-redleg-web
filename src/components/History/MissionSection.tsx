
import React from 'react';
import { Flag } from 'lucide-react';

const MissionSection: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-4">
        <div className="mr-4 p-2 bg-redleg/10 rounded-full">
          <Flag className="h-6 w-6 text-redleg" />
        </div>
        <h2 className="text-3xl font-bold text-artillery">Our Mission</h2>
      </div>
      
      <div className="prose prose-lg max-w-none text-artillery-muted">
        <p>
          The Gator Redleg Chapter of the USFAA is a 501(c)(3) non-profit professional association serving Florida's Field Artillery Soldiers, veterans and their families. As a professional association, the Chapter promotes the efficiency of the Field Artillery by maintaining its best traditions, and perpetuating the memory and history of our fallen.
        </p>
        
        <p>
          As a non-profit, we support Soldiers through family scholarships and contributions to charities serving the veteran community. The Gator Redlegs foster camaraderie in the Field Artillery profession of arms and create a climate of mutual support within the community for our currently serving Field Artillerists.
        </p>
      </div>
    </div>
  );
};

export default MissionSection;

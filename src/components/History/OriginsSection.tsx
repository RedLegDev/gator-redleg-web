
import React from 'react';
import { BookOpen } from 'lucide-react';

const OriginsSection: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-4">
        <div className="mr-4 p-2 bg-redleg/10 rounded-full">
          <BookOpen className="h-6 w-6 text-redleg" />
        </div>
        <h2 className="text-3xl font-bold text-artillery">Our Origins</h2>
      </div>
      
      <div className="prose prose-lg max-w-none text-artillery-muted">
        <p>
          FROM THE EARLY FORMATION OF THE 116TH FIELD ARTILLERY, ARTILLERY HAS HAD A PROUD HERITAGE IN FLORIDA.
        </p>
        
        <p>
          This regiment was originally organized during the First World War at Camp Wheeler, Georgia from 1 October 1917 through 1 November 1917, as part of the 31st (Dixie) Division. Although transported overseas it saw no combat action and was mustered from federal service on January 16, 1919.
        </p>
        
        <p>
          On December 5, 1921 Sumter L. Lowry Jr. of Tampa, Florida, upon commission issued by the Adjutant General, State of Florida presented for federal recognition three batteries to constitute units of a regiment to be known as the 116th Field Artillery. Thus on December 5, 1921, three firing batteries, A, B, and C formed the basis of the First Battalion 116th Field Artillery. Major Sumter L. Lowry Jr. commanding. The battalion was inspected and mustered into service by then Lieutenant Colonel Vivian Collins present Adjutant General of Florida.
        </p>
      </div>
    </div>
  );
};

export default OriginsSection;

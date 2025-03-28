
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
          The regiment was originally organized as the 1st Florida Infantry during the Spanish–American War in 1898. During the First World War at Camp Wheeler, Georgia from 1 October 1917 through 1 November 1917, the 1st Florida Infantry was combined with other units from Alabama and Georgia to create the 116th Field Artillery, part of the 31st ("Dixie") Division.
        </p>
        
        <p>
          On December 5, 1921 Sumter L. Lowry Jr. of Tampa, Florida, upon commission issued by the Adjutant General, State of Florida presented for federal recognition three batteries to constitute units of a regiment to be known as the 116th Field Artillery. Thus on December 5, 1921, three firing batteries, A, B, and C formed the basis of the First Battalion 116th Field Artillery. Major Sumter L. Lowry Jr. commanding. The battalion was inspected and mustered into service by then Lieutenant Colonel Vivian Collins present Adjutant General of Florida.
        </p>
        
        <blockquote className="border-l-4 border-redleg pl-4 italic my-6">
          <p>
            "The 116th Field Artillery has had a singular history in the period covered since the date of its organization in Florida. 
            Perhaps no regiment of the Florida National Guard within the United States has had such dramatic calls upon its services."
          </p>
          <p className="text-sm mt-2">— Lt. Col. George E. Grace, Florida Army National Guard</p>
        </blockquote>
      </div>
    </div>
  );
};

export default OriginsSection;

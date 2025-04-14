
import React from 'react';
import { Button } from "@/components/ui/button";

const JoinCTA = () => {
  return (
    <div className="bg-artillery/5 rounded-lg p-8 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-artillery">Ready to Join?</h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Your membership supports scholarships, recognition awards, and community initiatives for Field Artillery Soldiers and their families.
      </p>
      <a 
        href="https://www.fieldartillery.org/membership-information" 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Button className="bg-redleg hover:bg-redleg/90 text-white py-2 px-6 rounded-md text-lg">
          Join the USFAA Today
        </Button>
      </a>
    </div>
  );
};

export default JoinCTA;

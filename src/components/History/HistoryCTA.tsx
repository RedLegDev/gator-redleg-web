
import React from 'react';
import { Link } from 'react-router-dom';

const HistoryCTA: React.FC = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-artillery">Explore Our Heritage</h3>
        <p className="text-gray-600 mb-4 md:mb-0">
          Discover more about our rich history through our photo galleries and heritage pages.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/photos/historical">
          <button className="button-red w-full sm:w-auto">View Historical Photos</button>
        </Link>
        <Link to="/history/heritage">
          <button className="button-ghost border border-redleg text-redleg hover:bg-redleg/5 w-full sm:w-auto">
            Our Heritage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HistoryCTA;

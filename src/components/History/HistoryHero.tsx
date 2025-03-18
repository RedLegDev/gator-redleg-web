
import React from 'react';

interface HistoryHeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
}

const HistoryHero: React.FC<HistoryHeroProps> = ({ title, subtitle, imageSrc }) => {
  return (
    <div className="mb-12 bg-gray-50 rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-80 md:h-96 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title}
          className="absolute w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-sm opacity-80">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryHero;

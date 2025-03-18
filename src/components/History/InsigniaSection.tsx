
import React from 'react';
import { Shield } from 'lucide-react';

interface InsigniaSectionProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const InsigniaSection: React.FC<InsigniaSectionProps> = ({ 
  title, 
  imageSrc, 
  imageAlt,
  icon,
  children 
}) => {
  return (
    <div className="mb-12 bg-white rounded-lg shadow-lg p-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/3">
          <div className="flex justify-center">
            <img 
              src={imageSrc} 
              alt={imageAlt} 
              className="h-auto max-w-full shadow-lg rounded-lg"
            />
          </div>
        </div>
        <div className="md:w-2/3">
          <div className="flex items-center mb-4">
            <div className="mr-4 p-2 bg-redleg/10 rounded-full">
              {icon}
            </div>
            <h2 className="text-3xl font-bold text-artillery">{title}</h2>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default InsigniaSection;

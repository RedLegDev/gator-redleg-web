
import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LegendaryFigureSectionProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  icon: React.ReactNode;
  description: React.ReactNode;
  linkTo: string;
  linkText: string;
  imageClassName?: string;
}

const LegendaryFigureSection: React.FC<LegendaryFigureSectionProps> = ({
  title,
  imageSrc,
  imageAlt,
  icon,
  description,
  linkTo,
  linkText,
  imageClassName = "h-auto max-w-full shadow-lg rounded-lg hover:opacity-90 transition-opacity"
}) => {
  return (
    <div className="mb-12 bg-white rounded-lg shadow-lg p-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/3">
          <Link to={linkTo} className="block cursor-pointer">
            <div className="flex justify-center">
              <img 
                src={imageSrc} 
                alt={imageAlt} 
                className={imageClassName}
              />
            </div>
          </Link>
        </div>
        <div className="md:w-2/3">
          <Link to={linkTo} className="block cursor-pointer hover:opacity-90 transition-opacity">
            <div className="flex items-center mb-4">
              <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                {icon}
              </div>
              <h2 className="text-3xl font-bold text-artillery">{title}</h2>
            </div>
          </Link>
          
          {description}
          
          <Link to={linkTo}>
            <Button 
              variant="default" 
              className="bg-redleg hover:bg-redleg/90 text-white"
            >
              {linkText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LegendaryFigureSection;

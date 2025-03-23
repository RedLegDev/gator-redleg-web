
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample historical photos data
const historicalPhotos = [
  {
    id: 1,
    src: "/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png",
    alt: "116th Field Artillery Regiment, 1940s",
    year: "1940",
    description: "Members of the 116th Field Artillery Regiment during World War II."
  },
  {
    id: 2,
    src: "/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png",
    alt: "Florida National Guard Artillery Training",
    year: "1956",
    description: "Florida National Guard Artillery training at Camp Blanding."
  },
  {
    id: 3,
    src: "/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png",
    alt: "Howitzer Crew in Vietnam",
    year: "1968",
    description: "Florida Field Artillery soldiers operating a howitzer in Vietnam."
  },
  {
    id: 4,
    src: "/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png",
    alt: "Early St. Barbara's Day Celebration",
    year: "1975",
    description: "One of the early St. Barbara's Day celebrations in Florida."
  },
  {
    id: 5,
    src: "/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png",
    alt: "Field Artillery Training Exercise",
    year: "1983",
    description: "Field Training Exercise at Eglin Air Force Base."
  },
  {
    id: 6,
    src: "/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png",
    alt: "Desert Storm Deployment",
    year: "1991",
    description: "Florida Field Artillery units deploying for Operation Desert Storm."
  },
  {
    id: 7,
    src: "/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png",
    alt: "Gator Redlegs Founding Members",
    year: "2002",
    description: "Founding members of the Gator Redlegs chapter."
  },
  {
    id: 8,
    src: "/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png",
    alt: "Modern Field Artillery Training",
    year: "2015",
    description: "Modern Field Artillery training with advanced targeting systems."
  }
];

// Decades for filtering
const decades = ["All", "1940s", "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];

const HistoricalPhotos = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-gray-500 mb-6">
              <Link to="/" className="hover:text-redleg">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link to="/photos" className="hover:text-redleg">Photos</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700">Historical Photos</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-artillery section-heading">
              Historical Photos
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Explore our archive of historical photos documenting the rich heritage of Field Artillery in Florida.
            </p>
            
            {/* Decade filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {decades.map((decade) => (
                <button
                  key={decade}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    decade === "All" 
                      ? "bg-redleg text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {decade}
                </button>
              ))}
            </div>
            
            {/* Historical photos grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {historicalPhotos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-64">
                    <img 
                      src={photo.src} 
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-black bg-opacity-70 text-white text-sm font-medium px-3 py-1 m-2 rounded">
                      {photo.year}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-artillery mb-2">{photo.alt}</h3>
                    <p className="text-artillery-muted text-sm">{photo.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mb-8">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-redleg text-white flex items-center justify-center">1</button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100">2</button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
            
            {/* Historical contribution section */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-artillery mb-4 text-center">Help Preserve Our History</h3>
              <p className="text-artillery-muted mb-6 max-w-2xl mx-auto text-center">
                Do you have historical photos related to Florida Field Artillery units or personnel?
                We're always looking to expand our historical archives and preserve this important legacy.
              </p>
              <div className="flex justify-center">
                <Link to="/more/contact">
                  <button className="button-red">Share Historical Photos</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HistoricalPhotos;

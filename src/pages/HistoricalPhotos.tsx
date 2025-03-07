
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, Camera, History, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

type HistoricalPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  year: string;
  description?: string;
};

const HistoricalPhotos = () => {
  const photos: HistoricalPhoto[] = [
    {
      id: 'photo1',
      src: '/lovable-uploads/cca47b6f-2e17-450d-a490-dfc013ec9eaf.png',
      alt: '116th Battalion at Camp Pickett, VA',
      caption: '116th Battalion at Camp Pickett, VA',
      year: 'c. 1940s',
      description: 'A group photograph of the 116th Field Artillery Battalion during training at Camp Pickett, Virginia.'
    },
    {
      id: 'photo2',
      src: '/lovable-uploads/72be9951-7d20-4517-a4be-8c710eee0cd5.png',
      alt: 'Field Artillery Officers in Meeting',
      caption: 'Field Artillery Officers in Meeting',
      year: 'c. 1950s',
      description: 'Field Artillery officers attending a briefing or training session, displaying the professionalism and dedication of the artillery leadership.'
    },
    {
      id: 'photo3',
      src: '/lovable-uploads/a4b8420f-0d4f-4f90-a4cc-bc37a65c457d.png',
      alt: 'Regimental Crest',
      caption: 'The Regimental Crest',
      year: 'Present',
      description: 'The official crest of the Florida Field Artillery, symbolizing our proud heritage and traditions.'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-gray-500 mb-6">
              <Link to="/" className="hover:text-redleg">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link to="/photos" className="hover:text-redleg">Photo Gallery</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700">Historical Photos</span>
            </nav>
            
            <div className="flex items-center mb-8">
              <div className="p-2 bg-redleg/10 rounded-full mr-4">
                <Camera className="h-8 w-8 text-redleg" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-artillery">
                Historical Photos
              </h1>
            </div>
            
            <div className="prose prose-lg max-w-none mb-10 text-artillery-muted">
              <p>
                These historical photographs document the proud legacy of Field Artillery in Florida, 
                showcasing the personnel, equipment, and traditions that have shaped our organization.
                Each image represents a piece of our heritage and the commitment to excellence that
                defines the Field Artillery.
              </p>
            </div>
            
            {/* Photo Gallery */}
            <div className="grid grid-cols-1 gap-12 mb-16">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative aspect-w-16 aspect-h-9 md:aspect-h-7 bg-gray-100">
                    <img 
                      src={photo.src} 
                      alt={photo.alt}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-2xl font-bold text-artillery">{photo.caption}</h2>
                      <span className="text-sm font-medium bg-redleg/10 text-redleg py-1 px-3 rounded-full">
                        {photo.year}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {photo.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <History className="h-4 w-4 mr-1" />
                      <span>Part of the Florida Field Artillery heritage collection</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-10 bg-gray-200" />
            
            {/* Call to action section */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <History className="h-6 w-6 text-redleg mr-3" />
                <h2 className="text-2xl font-bold text-artillery">Preserving Our History</h2>
              </div>
              <p className="text-gray-700 mb-6">
                The Gator Redlegs Chapter is committed to preserving the rich history of the Field Artillery in Florida. 
                If you have historical photographs, documents, or artifacts related to the 116th Field Artillery or 
                other Florida artillery units, we would be honored to include them in our archives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/more/contact">
                  <button className="button-red w-full sm:w-auto">Contact Us</button>
                </Link>
                <Link to="/history">
                  <button className="button-ghost border border-redleg text-redleg hover:bg-redleg/5 w-full sm:w-auto">
                    Learn More About Our History
                  </button>
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

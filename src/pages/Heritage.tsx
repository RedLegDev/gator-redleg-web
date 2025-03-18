
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, BookOpen, Award, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Heritage = () => {
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
              <Link to="/history" className="hover:text-redleg">Our History</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700">Our Heritage</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-artillery section-heading">
              Our Heritage
            </h1>
            
            <div className="mb-12 prose prose-lg max-w-none text-artillery-muted">
              <p>
                The Gator Redlegs carry forward a rich heritage of service, excellence, and tradition that defines 
                Florida's Field Artillery. Our symbols, traditions, and organizational values connect us to a proud 
                history while guiding our present and future mission.
              </p>
            </div>
            
            {/* Organizational Insignia Section */}
            <div className="mb-12 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                      <Shield className="h-6 w-6 text-redleg" />
                    </div>
                    <h2 className="text-2xl font-bold text-artillery">Organizational Insignia</h2>
                  </div>
                  
                  <p className="text-artillery-muted mb-6">
                    Our organizational insignia represents the Gator Redlegs' identity as Florida's chapter of the 
                    United States Field Artillery Association. It combines the Florida state outline with traditional 
                    artillery symbols.
                  </p>
                  
                  <p className="text-artillery-muted">
                    The crossed cannons represent Field Artillery service, while the shield with red and blue bands and 
                    fleur-de-lis symbolizes our connection to the 116th Field Artillery's distinguished history and 
                    Florida's military tradition.
                  </p>
                </div>
                
                <div className="bg-gray-100 p-8 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/545c3e95-750d-44cb-a8a7-3bc273840ada.png" 
                    alt="Gator Redlegs Organizational Insignia" 
                    className="h-64 w-auto object-contain shadow-lg rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            {/* Unit Insignia & Coat of Arms Section */}
            <div className="mb-12 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                      <Shield className="h-6 w-6 text-redleg" />
                    </div>
                    <h2 className="text-2xl font-bold text-artillery">Our Coat of Arms</h2>
                  </div>
                  
                  <p className="text-artillery-muted mb-6">
                    The Coat of Arms features a shield with horizontal bands in red, blue, and red, symbolizing 
                    strength, loyalty, and sacrifice. The fleur-de-lis represents our historical connections and 
                    tradition of service.
                  </p>
                  
                  <p className="text-artillery-muted">
                    The distinctive red and blue colors pay homage to artillery tradition and our Florida heritage, 
                    while the circular emblem represents unity and the precision that defines field artillery.
                  </p>
                </div>
                
                <div className="bg-gray-100 p-8 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/bd767145-b0bf-48ab-b1cf-b97f6b6034cc.png" 
                    alt="116th Field Artillery Coat of Arms" 
                    className="h-64 w-auto object-contain shadow-lg rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            <Separator className="my-10 bg-gray-200" />
            
            {/* Motto Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Award className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">Our Motto</h2>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/3 flex justify-center">
                    <img 
                      src="/lovable-uploads/94a399e4-5142-426b-aff8-140dce908017.png" 
                      alt="Distinguished Unit Insignia" 
                      className="h-auto max-w-full shadow-lg rounded-lg"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold mb-4 text-redleg">Vestigia Nulla Retrorsum</h3>
                    <p className="text-artillery-muted mb-4">
                      Our Latin motto "Vestigia Nulla Retrorsum" translates to "No Step Backward," embodying 
                      the unwavering dedication and forward-focused commitment of Florida's Field Artillery units.
                    </p>
                    <p className="text-artillery-muted">
                      This principle has guided generations of Field Artillery Soldiers, reminding us of our 
                      duty to press forward in service to our mission and our fellow soldiers, never retreating 
                      from our responsibilities or our heritage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Traditions Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <BookOpen className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">Artillery Traditions</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-redleg">Saint Barbara's Day</h3>
                  <p className="text-gray-700">
                    Celebrated annually on December 4th, honoring the patron saint of artillery. 
                    The Gator Redlegs maintain this tradition through formal ceremonies and gatherings 
                    that connect us to centuries of artillery heritage.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-redleg">The Artillery Punch</h3>
                  <p className="text-gray-700">
                    A traditional ceremonial drink with a recipe dating back generations, served at formal 
                    artillery functions to honor our heritage and strengthen bonds between artillery members.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-redleg">Challenge Coins</h3>
                  <p className="text-gray-700">
                    Carrying forward the military tradition of unit coins, used to recognize achievement 
                    and foster unit pride and camaraderie among artillery personnel.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-redleg">Artillery March</h3>
                  <p className="text-gray-700">
                    "The U.S. Field Artillery March" (also known as "The Caissons Go Rolling Along") 
                    serves as the official song of the artillery, played at ceremonies and events to 
                    honor our identity.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Call to action */}
            <div className="bg-gray-50 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-artillery">Join Our Heritage</h3>
                <p className="text-gray-600 mb-4 md:mb-0">
                  Become part of the continuing legacy of Florida's proud artillery tradition.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/membership">
                  <button className="button-red w-full sm:w-auto">Become a Member</button>
                </Link>
                <Link to="/photos/historical">
                  <button className="button-ghost border border-redleg text-redleg hover:bg-redleg/5 w-full sm:w-auto">
                    Historical Photos
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

export default Heritage;

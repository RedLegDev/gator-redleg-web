
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, Bookmark, Target, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const FloridaArtillery = () => {
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
              <span className="text-gray-700">Florida Artillery</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-artillery section-heading">
              Florida Artillery History
            </h1>
            
            {/* Introduction */}
            <div className="mb-12 prose prose-lg max-w-none text-artillery-muted">
              <p className="text-xl font-semibold text-artillery">
                From the early formation of the 116th Field Artillery, artillery has had a proud heritage in Florida.
              </p>
              <p>
                The history of Field Artillery in Florida represents a legacy of service, dedication, and excellence that spans more than a century. 
                From its earliest days to the present, Florida's artillery units have embodied the values represented in our Distinguished Unit Insignia: 
                precision, loyalty, and unwavering commitment to mission.
              </p>
            </div>
            
            {/* First Section - Formation */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Bookmark className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">Formation and Early Years</h2>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/3 flex justify-center">
                    <img 
                      src="/lovable-uploads/bd767145-b0bf-48ab-b1cf-b97f6b6034cc.png" 
                      alt="116th Field Artillery Coat of Arms" 
                      className="h-auto max-w-full shadow-lg rounded-lg"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-artillery-muted mb-4">
                      The 116th Field Artillery Regiment was officially organized during the First World War at Camp Wheeler, Georgia from October 1 through November 1, 1917, as part of the 31st (Dixie) Division. Though transported overseas, it saw no combat action and was mustered from federal service on January 16, 1919.
                    </p>
                    <p className="text-artillery-muted">
                      A pivotal moment in Florida's artillery history came on December 5, 1921, when Sumter L. Lowry Jr. of Tampa, Florida, upon commission issued by the Adjutant General, State of Florida, presented for federal recognition three batteries to constitute units of a regiment to be known as the 116th Field Artillery. These three firing batteries—A, B, and C—formed the basis of the First Battalion 116th Field Artillery under Major Lowry's command.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-10 bg-gray-200" />
            
            {/* Symbol Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Target className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">Our Symbols and Identity</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex justify-center mb-6">
                    <img 
                      src="/lovable-uploads/94a399e4-5142-426b-aff8-140dce908017.png" 
                      alt="Distinguished Unit Insignia" 
                      className="h-48 w-auto object-contain shadow-md rounded-md"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-redleg text-center">Distinguished Unit Insignia</h3>
                  <p className="text-gray-700 text-center">
                    The Distinguished Unit Insignia features the motto "Vestigia Nulla Retrorsum" (No Step Backward), 
                    which has inspired generations of Florida artillerymen to uphold the highest standards of service.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex justify-center mb-6">
                    <img 
                      src="/lovable-uploads/bd767145-b0bf-48ab-b1cf-b97f6b6034cc.png" 
                      alt="Coat of Arms" 
                      className="h-48 w-auto object-contain shadow-md rounded-md"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-redleg text-center">Coat of Arms</h3>
                  <p className="text-gray-700 text-center">
                    The Coat of Arms with its distinctive red and blue colors and fleur-de-lis symbolizes our 
                    proud heritage and the values that have guided Florida's artillery units through their history.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Timeline Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Clock className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">Historical Timeline</h2>
              </div>
              
              <div className="relative border-l-2 border-redleg/30 pl-8 ml-4 space-y-10">
                <div className="relative">
                  <div className="absolute -left-[38px] top-0 w-6 h-6 bg-redleg rounded-full"></div>
                  <h3 className="text-xl font-bold mb-1 text-redleg">1917-1919</h3>
                  <p className="text-gray-700">
                    Initial formation at Camp Wheeler as part of the 31st Division during World War I.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[38px] top-0 w-6 h-6 bg-redleg rounded-full"></div>
                  <h3 className="text-xl font-bold mb-1 text-redleg">December 5, 1921</h3>
                  <p className="text-gray-700">
                    Major Sumter L. Lowry Jr. establishes the first three batteries (A, B, and C) of what would 
                    become the 116th Field Artillery Regiment.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[38px] top-0 w-6 h-6 bg-redleg rounded-full"></div>
                  <h3 className="text-xl font-bold mb-1 text-redleg">World War II Era</h3>
                  <p className="text-gray-700">
                    The 116th Field Artillery serves with distinction, carrying forward the traditions 
                    represented in its insignia.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[38px] top-0 w-6 h-6 bg-redleg rounded-full"></div>
                  <h3 className="text-xl font-bold mb-1 text-redleg">Present Day</h3>
                  <p className="text-gray-700">
                    The Gator Redlegs carries on the proud tradition of Florida's Field Artillery, preserving 
                    its heritage and supporting today's artillery community.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Call to action */}
            <div className="bg-gray-50 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-artillery">Learn More About Our Heritage</h3>
                <p className="text-gray-600 mb-4 md:mb-0">
                  Discover the stories, traditions, and symbols that have shaped Florida's artillery community.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/history/heritage">
                  <button className="button-red w-full sm:w-auto">Our Heritage</button>
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

export default FloridaArtillery;

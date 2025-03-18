
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, BookOpen, Flag, Clock, Award, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const History = () => {
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
              <span className="text-gray-700">Our History</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-artillery section-heading">
              Our History
            </h1>
            
            {/* Hero section with historical image */}
            <div className="mb-12 bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-80 md:h-96 overflow-hidden">
                <img 
                  src="/lovable-uploads/cca47b6f-2e17-450d-a490-dfc013ec9eaf.png" 
                  alt="116th Battalion at Camp Pickett, VA"
                  className="absolute w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">116th Battalion at Camp Pickett, VA</h2>
                    <p className="text-sm opacity-80">A proud heritage of service and excellence</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Origin story section */}
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
                  This regiment was originally organized during the First World War at Camp Wheeler, Georgia from 1 October 1917 through 1 November 1917, as part of the 31st (Dixie) Division. Although transported overseas it saw no combat action and was mustered from federal service on January 16, 1919.
                </p>
                
                <p>
                  On December 5, 1921 Sumter L. Lowry Jr. of Tampa, Florida, upon commission issued by the Adjutant General, State of Florida presented for federal recognition three batteries to constitute units of a regiment to be known as the 116th Field Artillery. Thus on December 5, 1921, three firing batteries, A, B, and C formed the basis of the First Battalion 116th Field Artillery. Major Sumter L. Lowry Jr. commanding. The battalion was inspected and mustered into service by then Lieutenant Colonel Vivian Collins present Adjutant General of Florida.
                </p>
              </div>
            </div>
            
            {/* Unit Insignia Section - NEW */}
            <div className="mb-12 bg-white rounded-lg shadow-lg p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <div className="flex justify-center">
                    <img 
                      src="/lovable-uploads/94a399e4-5142-426b-aff8-140dce908017.png" 
                      alt="Distinguished Unit Insignia" 
                      className="h-auto max-w-full shadow-lg rounded-lg"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                      <Shield className="h-6 w-6 text-redleg" />
                    </div>
                    <h2 className="text-3xl font-bold text-artillery">Distinguished Unit Insignia</h2>
                  </div>
                  
                  <p className="text-artillery-muted mb-4">
                    The unit insignia of the 116th Field Artillery carries deep symbolism representing our heritage and values. The shield features a distinctive red, white, and blue design incorporating the traditional artillery colors. The fleur-de-lis in the lower portion represents our historical connections to French artillery traditions, while the circular emblem at the top symbolizes unity and precision.
                  </p>
                  
                  <p className="text-artillery-muted">
                    The motto "Vestigia Nulla Retrorsum" is Latin for "No Step Backward," embodying the unwavering dedication and forward-focused commitment of Florida's Field Artillery units throughout their history.
                  </p>
                </div>
              </div>
            </div>
            
            <Separator className="my-10 bg-gray-200" />
            
            {/* Mission section */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Flag className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">Our Mission</h2>
              </div>
              
              <div className="prose prose-lg max-w-none text-artillery-muted">
                <p>
                  The Gator Redleg Chapter of the USFAA is a 501(c)(3) non-profit professional association serving Florida's Field Artillery Soldiers, veterans and their families. As a professional association, the Chapter promotes the efficiency of the Field Artillery by maintaining its best traditions, and perpetuating the memory and history of our fallen.
                </p>
                
                <p>
                  As a non-profit, we support Soldiers through family scholarships and contributions to charities serving the veteran community. The Gator Redlegs foster camaraderie in the Field Artillery profession of arms and create a climate of mutual support within the community for our currently serving Field Artillerists.
                </p>
              </div>
            </div>
            
            {/* Coat of Arms Section - NEW */}
            <div className="mb-12 bg-white rounded-lg shadow-lg p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <div className="flex justify-center">
                    <img 
                      src="/lovable-uploads/bd767145-b0bf-48ab-b1cf-b97f6b6034cc.png" 
                      alt="Coat of Arms" 
                      className="h-auto max-w-full shadow-lg rounded-lg"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                      <Award className="h-6 w-6 text-redleg" />
                    </div>
                    <h2 className="text-3xl font-bold text-artillery">Coat of Arms</h2>
                  </div>
                  
                  <p className="text-artillery-muted mb-4">
                    The Coat of Arms of the 116th Field Artillery features a shield with three horizontal bands in red, blue, and red — symbolizing both service and sacrifice. The prominent fleur-de-lis represents our historical connections and French artillery influences. 
                  </p>
                  
                  <p className="text-artillery-muted">
                    The circular emblem at the top symbolizes unity, commitment, and the ongoing cycle of service that defines the Field Artillery's mission. The distinctive red and blue colors pay homage to both artillery tradition and our Florida heritage.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Timeline section - placeholder for future content */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Clock className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">Key Milestones</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-redleg">1917-1919</h3>
                  <p className="text-gray-700">
                    Regiment organized at Camp Wheeler, Georgia as part of the 31st (Dixie) Division.
                    Transported overseas during World War I and later mustered from federal service.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-redleg">December 5, 1921</h3>
                  <p className="text-gray-700">
                    Sumter L. Lowry Jr. of Tampa, Florida presented three batteries for federal recognition,
                    forming the First Battalion 116th Field Artillery under his command.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Call to action */}
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;

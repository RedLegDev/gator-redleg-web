
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, Bookmark, Target, Clock, AlertTriangle, Shield, Medal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const FloridaArtillery = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-8 pb-16">
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
              <blockquote className="border-l-4 border-redleg pl-4 italic my-6">
                <p className="text-lg">
                  "The 116th Field Artillery has had a singular history in the period covered since the date of its organization in Florida. 
                  Perhaps no regiment of the Florida National Guard within the United States has had such dramatic calls upon its services. 
                  Woven into the pattern of everyday life, the work of the peacetime soldier calls forth little notice from the general public. 
                  However, when disaster threatens the structure of the commonwealth, either man-made, or by the hand of Providence, 
                  the National Guard steps promptly into the breach, and, with a steady hand firmly applied, brings aid and comfort to the stricken 
                  and punishment to the law breaker."
                </p>
                <p className="text-sm mt-2">— From the official regimental history, compiled by Lieutenant Colonel George E. Grace, Florida Army National Guard</p>
              </blockquote>
            </div>
            
            {/* Origins Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Bookmark className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">Origins & Early Years</h2>
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
                      The regiment was originally organized as the 1st Florida Infantry during the Spanish–American War in 1898. During the First World War at Camp Wheeler, Georgia from 1 October 1917 through 1 November 1917, the 1st Florida Infantry was combined with other units from Alabama and Georgia to create the 116th Field Artillery, part of the 31st ("Dixie") Division.
                    </p>
                    <p className="text-artillery-muted">
                      It consisted of the battalion headquarters and Batteries B and C from the 1st Battalion, Georgia Field Artillery, 4 officers and 99 men from the 1st Florida Infantry Regiment, Troops A, D, G, H, I, and the Supply Troop from the 1st Alabama Cavalry Regiment, and the Band from the 2nd Alabama Infantry Regiment. Although transported overseas, it saw no combat action and was mustered out of federal service on 16 January 1919.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Formation Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Shield className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">Formation in Florida</h2>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-artillery-muted mb-4">
                  On 5 December 1921 Sumter de Leon Lowry Jr., of Tampa, Florida, upon commission issued by the Adjutant General of the State of Florida, presented for federal recognition three batteries to constitute units of a regiment to be known as the 116th Field Artillery. Thus, on 5 December 1921, three firing batteries, A, B, and C, formed the basis of the First Battalion, 116th Field Artillery, Major Sumter L. Lowry Jr. commanding.
                </p>
                <p className="text-artillery-muted mb-4">
                  The battalion was inspected and mustered into service by then-Lieutenant Colonel Vivian Collins, Adjutant General of Florida. Completion of the First Battalion was effected on 15 February 1922, with the establishment of the Headquarters Battery and Combat Train. In 1922, the City of Tampa and Hillsborough County furnished land and funds for the construction of stables, gunsheds, and armory buildings.
                </p>
                <p className="text-artillery-muted">
                  An expansive movement was made for the establishment of a full regiment by the founding of the Second Battalion. Firing batteries D, E, and F were located at Lakeland, Plant City, and Arcadia, with the Headquarters Battery and Combat Train of the Second Battalion in Bartow. The Second Battalion participated in the summer encampment in 1923, and was federally recognized as a unit on 23 August 1923, with Major Fred Hampton commanding. The regiment received federal recognition at Tampa on 20 January 1924.
                </p>
              </div>
            </div>
            
            {/* 2nd Battalion Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Medal className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">Expansion & Reorganization</h2>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-artillery-muted mb-4">
                  Ultimately, the subordinate units of the 2nd Battalion, 116th Field Artillery were re-designated and relocated in some cases in different cities: HQ Battery – Lakeland. Battery A – Bartow. Battery B – Dade City. Battery C – Ocala. Service Battery – Haines City.
                </p>
                <p className="text-artillery-muted">
                  On 16 July 1933, the regiment was converted from horse-drawn to truck-drawn, marking an important modernization in its capabilities and mission readiness.
                </p>
              </div>
            </div>
            
            <Separator className="my-10 bg-gray-200" />
            
            {/* Service to Community Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">Service to Florida Communities</h2>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-artillery-muted mb-4">
                  Throughout its history, the 116th Field Artillery has been called upon numerous times to serve Florida communities in times of need:
                </p>
                <ul className="list-disc pl-6 mb-4 text-artillery-muted space-y-2">
                  <li>Hurricane relief duties at Tampa and Moore Haven, Florida, from 16 September to 7 November 1926.</li>
                  <li>Riot control duties in connection with the protection of prisoners at the Hillsborough County Jail in Tampa, from 31 May to 6 June 1927.</li>
                  <li>Duties associated with the Mediterranean Fruit Fly quarantine in July 1929.</li>
                  <li>Hurricane relief duties at Palm Beach and Okeechobee from 17 September to 4 November 1928 (2nd Battalion).</li>
                  <li>Riot control duties in connection with elections in Tampa in September 1935.</li>
                  <li>Guard duties in connection with the visit of President Franklin D. Roosevelt to Winter Park, Florida, on 31 March 1936.</li>
                </ul>
                <p className="text-artillery-muted">
                  These missions reflect the regiment's commitment to serving the people of Florida beyond its military responsibilities, embodying the National Guard ethos of being always ready, always there.
                </p>
              </div>
            </div>
            
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
                  <h3 className="text-xl font-bold mb-1 text-redleg">1898</h3>
                  <p className="text-gray-700">
                    Originally organized as the 1st Florida Infantry during the Spanish–American War.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[38px] top-0 w-6 h-6 bg-redleg rounded-full"></div>
                  <h3 className="text-xl font-bold mb-1 text-redleg">1917-1919</h3>
                  <p className="text-gray-700">
                    Formation at Camp Wheeler as the 116th Field Artillery as part of the 31st Division during World War I.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[38px] top-0 w-6 h-6 bg-redleg rounded-full"></div>
                  <h3 className="text-xl font-bold mb-1 text-redleg">December 5, 1921</h3>
                  <p className="text-gray-700">
                    Major Sumter L. Lowry Jr. establishes the first three batteries (A, B, and C) of what would 
                    become the 116th Field Artillery Regiment in Florida.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[38px] top-0 w-6 h-6 bg-redleg rounded-full"></div>
                  <h3 className="text-xl font-bold mb-1 text-redleg">January 20, 1924</h3>
                  <p className="text-gray-700">
                    The full regiment receives federal recognition at Tampa.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[38px] top-0 w-6 h-6 bg-redleg rounded-full"></div>
                  <h3 className="text-xl font-bold mb-1 text-redleg">July 16, 1933</h3>
                  <p className="text-gray-700">
                    The regiment is converted from horse-drawn to truck-drawn.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[38px] top-0 w-6 h-6 bg-redleg rounded-full"></div>
                  <h3 className="text-xl font-bold mb-1 text-redleg">1926-1936</h3>
                  <p className="text-gray-700">
                    Multiple emergency response missions throughout Florida, including hurricane relief and civic support.
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

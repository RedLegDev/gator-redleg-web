
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, BookOpen, Medal, Shield, Flag, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const MollyPitcher = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-gray-500 mb-6">
              <Link to="/" className="hover:text-redleg">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link to="/history" className="hover:text-redleg">Our History</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700">Molly Pitcher</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-artillery section-heading">
              The Story of Molly Pitcher
            </h1>
            
            {/* Hero image */}
            <div className="mb-12 bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-80 md:h-96 overflow-hidden">
                <img 
                  src="/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png" 
                  alt="Molly Pitcher at the Battle of Monmouth"
                  className="absolute w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">Hero of the Battle of Monmouth</h2>
                    <p className="text-sm opacity-80">June 28, 1778</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Biography section */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <User className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">The Artillery Wife</h2>
              </div>
              
              <div className="prose prose-lg max-w-none text-artillery-muted">
                <p>
                  An Artillery wife, Mary Hays McCauly (better known as Molly Pitcher) shared the rigors of Valley Forge with her husband, William Hays. Her actions during the battle of Monmouth (28 June 1778) became legendary. That day at Monmouth was as hot as Valley Forge was cold. Someone had to cool the hot guns and bathe parched throats with water.
                </p>
                
                <p>
                  Across that bullet-swept ground, a striped skirt fluttered. Mary Hays McCauly was earning her nickname "Molly Pitcher" by bringing pitcher after pitcher of cool spring water to the exhausted and thirsty men. She also tended to the wounded and once, heaving a crippled continental soldier up on her strong young back, carried him out of reach of hard-charging Britishers.
                </p>
              </div>
            </div>
            
            {/* Battle of Monmouth section */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Flag className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">The Battle of Monmouth</h2>
              </div>
              
              <div className="prose prose-lg max-w-none text-artillery-muted">
                <p>
                  On her next trip with water she found her artilleryman husband back with the guns again, replacing a casualty. While she watched, Hays fell wounded. The piece, its crew too depleted to serve it, was about to be withdrawn. Without hesitation, Molly stepped forward and took the rammer staff from her fallen husband's hands.
                </p>
                
                <p>
                  For the second time on an American battlefield, a woman manned a gun. (The first was Margaret Corbin during the defense of Fort Washington in 1776.) Resolutely, she stayed at her post in the face of heavy enemy fire, ably acting as a matross (gunner).
                </p>
              </div>
            </div>
            
            {/* Recognition section */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Medal className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">Recognition and Legacy</h2>
              </div>
              
              <div className="prose prose-lg max-w-none text-artillery-muted">
                <p>
                  For her heroic role, General Washington himself issued her a warrant as a noncommissioned officer. Thereafter, she was widely hailed as "Sergeant Molly." A flagstaff and cannon stand at her gravesite at Carlisle, Pennsylvania. A sculpture on the battle monument commemorates her courageous deed.
                </p>
                
                <p>
                  Molly Pitcher represents the spirit of the many women who supported the Continental Army during the Revolutionary War. Her story continues to inspire generations of artillery personnel and military families, embodying the courage and commitment that defines the artillery tradition.
                </p>
              </div>
            </div>
            
            {/* Historical significance */}
            <div className="bg-gray-50 rounded-lg p-8 flex flex-col md:flex-row items-center gap-6 mb-12">
              <div className="md:w-1/3 flex justify-center">
                <div className="p-2 bg-redleg/10 rounded-full w-24 h-24 flex items-center justify-center">
                  <Shield className="h-12 w-12 text-redleg" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold mb-2 text-artillery">Artillery Heritage</h3>
                <p className="text-artillery-muted">
                  Molly Pitcher's story is an integral part of artillery heritage, demonstrating the commitment and sacrifice that has characterized the artillery community from the earliest days of American independence. Her actions exemplify the "spirit of the guns" that continues in today's Field Artillery.
                </p>
              </div>
            </div>
            
            {/* Related links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/history/florida-artillery" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2 text-redleg">Florida Artillery</h3>
                <p className="text-gray-700 mb-4">
                  Explore the rich history of Field Artillery in Florida from its beginnings to today.
                </p>
                <span className="text-redleg font-medium inline-flex items-center">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </Link>
              
              <Link to="/history/st-barbara" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2 text-redleg">St. Barbara</h3>
                <p className="text-gray-700 mb-4">
                  Discover the legend of St. Barbara, the patron saint of artillery and those in danger.
                </p>
                <span className="text-redleg font-medium inline-flex items-center">
                  Read the legend
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MollyPitcher;

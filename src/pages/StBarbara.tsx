
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, BookOpen, Flame, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const StBarbara = () => {
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
              <span className="text-gray-700">St. Barbara</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-artillery section-heading">
              The Legend of St. Barbara
            </h1>
            
            {/* Hero image */}
            <div className="mb-12 bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-80 md:h-96 overflow-hidden">
                <img 
                  src="/lovable-uploads/a4b8420f-0d4f-4f90-a4cc-bc37a65c457d.png" 
                  alt="Saint Barbara, Patron Saint of Artillery"
                  className="absolute w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">Patron Saint of Artillery</h2>
                    <p className="text-sm opacity-80">Feast Day: December 4th</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Legend section */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <BookOpen className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">The Legend</h2>
              </div>
              
              <div className="prose prose-lg max-w-none text-artillery-muted">
                <p>
                  According to legend, our patron saint was the beautiful daughter of Dioscorus, a nobleman of the Roman Empire, believed to have lived in Nicomedia in Asia Minor in the third or fourth century, A.D. Because of her singular beauty and fearful that she be demanded in marriage and taken away from him, and also to limit Barbara's exposure to Christianity and encourage her development as a zealous pagan, her father kept her shut up in a tower.
                </p>
                
                <p>
                  But even such incarceration could not keep the young woman from becoming a Christian. From her window, she looked out upon the surrounding countryside and marveled at the living things. She concluded they all must be part of a master plan and the idols of wood and stone her parents worshipped had to be condemned as false. She received instruction in Christianity and was baptized.
                </p>
                
                <p>
                  Shortly before embarking on a journey, he commissioned a sumptuous bathhouse to be built for her, approving the design before he left. The bathhouse was to be lighted by only two windows. In token of her faith, while her father was away, she had another window pierced in the tower, making three, symbolizing the Holy Trinity.
                </p>
                
                <p>
                  On his return, Dioscorus asked why she had made this change, and Barbara acknowledged her conversion. Despite his threats, she refused to renounce Christianity. Dioscorus flew into a rage and dragged her before the local prefect who ordered her death. The evil Dioscorus tortured his daughter, then took her to a high mountain, where he beheaded her.
                </p>
                
                <p>
                  Afterward, as he descended the mountain, he was caught in a sudden violent storm, struck down and consumed by lightning. Only his scorched sword remained as a reminder of God's vengeance.
                </p>
              </div>
            </div>
            
            {/* Patronage section */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Flame className="h-6 w-6 text-redleg" />
                </div>
                <h2 className="text-3xl font-bold text-artillery">Patron Saint of Artillery</h2>
              </div>
              
              <div className="prose prose-lg max-w-none text-artillery-muted">
                <p>
                  As a logical consequence, Barbara came to be regarded as the sainted patroness of those in danger from thunderstorms, fire, explosions — that is to say, sudden death. Given the questionable reliability of early cannon misfires, muzzle bursts and exploding weapons were not uncommon - it is easy to see why our predecessors sought the protection of Saint Barbara. She has protected us well ever since.
                </p>
                
                <p>
                  Saint Barbara was venerated as early as the seventh century. She has been popular in the East and West since that time. Legendary acts of her martyrdom were inserted in the collection of Symeon Metaphrastes and by the authors, Ado and Usuard, of the enlarged martyrologies composed during the ninth century in Western Europe.
                </p>
                
                <p>
                  G.K. Chesterton celebrates her in the poem, The Ballad of Saint Barbara. Patroness of artillerymen, Saint Barbara was venerated as one of the fourteen Holy Helpers. An occurrence of the year 1448 did much to further the spread of the veneration of the saint. A man named Henry Kock was nearly burned to death in a fire at Gorkum. He called upon Saint Barbara who aided him to escape from the burning house and kept him alive until he could receive the last sacraments.
                </p>
                
                <p>
                  Saint Barbara is usually represented standing by a tower with three windows, carrying a palm of a martyr in her hand. She is often viewed standing by cannon or holding a chalice and sacramental wafer.
                </p>
              </div>
            </div>
            
            {/* Feast day section */}
            <div className="bg-gray-50 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between mb-12">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="mr-4 p-2 bg-redleg/10 rounded-full">
                  <Calendar className="h-6 w-6 text-redleg" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-artillery">Feast Day</h3>
                  <p className="text-artillery-muted">
                    On current calendars, the Feast of Saint Barbara falls on the 4th of December.
                  </p>
                </div>
              </div>
              <Link to="/activities/events/st-barbaras-day">
                <button className="button-red">St. Barbara's Day Ball</button>
              </Link>
            </div>
            
            {/* Related links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/history/heritage" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2 text-redleg">Our Heritage</h3>
                <p className="text-gray-700 mb-4">
                  Learn more about the rich heritage and traditions of Field Artillery in Florida.
                </p>
                <span className="text-redleg font-medium inline-flex items-center">
                  Explore heritage
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </Link>
              
              <Link to="/activities/events/st-barbaras-day" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2 text-redleg">St. Barbara's Day Ball</h3>
                <p className="text-gray-700 mb-4">
                  Join us for our annual celebration honoring the patron saint of Field Artillery.
                </p>
                <span className="text-redleg font-medium inline-flex items-center">
                  Learn about the event
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

export default StBarbara;

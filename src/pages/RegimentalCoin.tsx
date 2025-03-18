
import React from 'react';
import { Shield, Award, History } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const RegimentalCoin = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-artillery section-heading">
              Regimental Coin
            </h1>
            
            <div className="mb-10 glass-card p-6 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                <div className="md:w-1/3 flex justify-center">
                  <img 
                    src="/lovable-uploads/545c3e95-750d-44cb-a8a7-3bc273840ada.png" 
                    alt="Gator Redlegs Organizational Insignia" 
                    className="w-64 h-auto object-contain shadow-md rounded-md border-2 border-gray-200"
                  />
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-4 text-artillery">Organizational Insignia</h2>
                  <p className="text-gray-700 mb-4">
                    The Gator Redlegs insignia represents our identity as Florida's chapter of the United States Field Artillery Association. 
                    It combines the state of Florida outline, the coat of arms with red and blue bands and a fleur-de-lis, and crossed cannons 
                    symbolizing artillery service.
                  </p>
                  <p className="text-gray-700">
                    The design incorporates elements of Florida's state seal and the traditional crossed cannons of the Field Artillery branch,
                    highlighting our dual commitment to our state and to the artillery tradition.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-artillery">About Our Regimental Coin</h2>
              <p className="text-gray-700 mb-6">
                The Gator Redlegs challenge coin carries the proud heritage of Florida's Field Artillery. 
                Each element of the coin's design connects to our history and traditions, serving as a tangible 
                reminder of the chapter's mission and the legacy we uphold.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <Shield className="h-12 w-12 text-redleg" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">Symbol of Pride</h3>
                  <p className="text-gray-600 text-center">
                    The coin represents membership in an exclusive community of artillery professionals and veterans.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <Award className="h-12 w-12 text-redleg" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">Mark of Excellence</h3>
                  <p className="text-gray-600 text-center">
                    Given to recognize outstanding contributions to the field artillery community.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <History className="h-12 w-12 text-redleg" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">Historical Connection</h3>
                  <p className="text-gray-600 text-center">
                    Links the present generation of artillery personnel to a proud military tradition.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-8 mb-10">
              <h2 className="text-3xl font-bold mb-6 text-artillery">How to Earn the Coin</h2>
              <p className="text-gray-700 mb-6">
                The Gator Redlegs presents its regimental coin to members who demonstrate exceptional 
                dedication to the chapter's mission and values. Ways to earn this prestigious symbol include:
              </p>
              
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li>Outstanding service to the Florida artillery community</li>
                <li>Exceptional contributions to chapter activities and events</li>
                <li>Distinguished leadership within the field artillery profession</li>
                <li>Significant support for artillery families and veterans</li>
                <li>Preserving and promoting artillery traditions and heritage</li>
              </ul>
            </div>
            
            <div className="bg-redleg/5 border border-redleg/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-artillery">Coin Challenge Tradition</h2>
              <p className="text-gray-700 mb-4">
                The military coin challenge is a tradition dating back decades. When challenged, members must 
                produce their regimental coin. Those who cannot must buy a round of drinks for the challenger and 
                others present who successfully produced their coins.
              </p>
              <p className="text-gray-700">
                This tradition strengthens camaraderie among members and serves as a reminder of our shared identity 
                and commitment to the artillery community.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegimentalCoin;

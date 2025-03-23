
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegimentalCoin = () => {
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
              <span className="text-gray-700">Regimental Coin</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-artillery section-heading">
              The Gator Redlegs Regimental Coin
            </h1>
            
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <img 
                    src="/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png" 
                    alt="Gator Redlegs Regimental Coin"
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold text-artillery mb-4">About Our Coin</h2>
                  <p className="text-artillery-muted mb-6">
                    The Gator Redlegs regimental coin symbolizes membership in our organization and 
                    honors the tradition of military challenge coins. Each coin is meticulously crafted 
                    to represent our Florida Field Artillery heritage.
                  </p>
                  <p className="text-artillery-muted">
                    Our coin features distinctive design elements that represent our identity as Florida's 
                    Field Artillery association. It serves as a token of recognition among members and 
                    honors the camaraderie and shared service of our Redleg community.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none text-artillery-muted mb-12">
              <h2 className="text-3xl font-bold text-artillery mb-4">Coin Significance</h2>
              <p>
                Challenge coins have a long and proud tradition in military history. They typically bear an 
                organization's insignia and are carried by members as proof of membership. The tradition 
                of presenting and challenging with these coins builds camaraderie and unit pride.
              </p>
              
              <p>
                The Gator Redlegs coin is presented to new members upon joining our chapter and to 
                individuals who have made significant contributions to our mission. It symbolizes our 
                shared commitment to supporting Florida's Field Artillery Soldiers, veterans, and their families.
              </p>
              
              <h2 className="text-3xl font-bold text-artillery mb-4 mt-8">Design Elements</h2>
              <p>
                Our coin features elements that represent both our Florida identity and our Field Artillery heritage:
              </p>
              
              <ul className="list-disc pl-6 mb-6">
                <li>Front side: The Gator Redlegs insignia</li>
                <li>Reverse side: Symbols representing Field Artillery excellence</li>
                <li>Edge: Engraved with our motto and founding year</li>
              </ul>
              
              <h2 className="text-3xl font-bold text-artillery mb-4 mt-8">Receiving a Coin</h2>
              <p>
                Gator Redlegs coins are available to:
              </p>
              
              <ul className="list-disc pl-6 mb-6">
                <li>Active members of the Gator Redlegs Chapter</li>
                <li>Honorary members recognized for their support</li>
                <li>Distinguished visitors at special chapter events</li>
              </ul>
              
              <p>
                To learn more about becoming a member and receiving your own Gator Redlegs coin, 
                visit our membership page.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-artillery mb-4">Join Our Community</h3>
              <p className="text-artillery-muted mb-6">
                Become a member of the Gator Redlegs Chapter and receive your own regimental coin.
              </p>
              <Link to="/membership">
                <button className="button-red">Become a Member</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegimentalCoin;

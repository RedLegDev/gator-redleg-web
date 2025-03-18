
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Bookmark, User, Shield, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import the new components
import HistoryHero from '@/components/History/HistoryHero';
import OriginsSection from '@/components/History/OriginsSection';
import InsigniaSection from '@/components/History/InsigniaSection';
import MissionSection from '@/components/History/MissionSection';
import MilestonesSection from '@/components/History/MilestonesSection';
import LegendaryFigureSection from '@/components/History/LegendaryFigureSection';
import HistoryCTA from '@/components/History/HistoryCTA';

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
            <HistoryHero 
              title="116th Battalion at Camp Pickett, VA"
              subtitle="A proud heritage of service and excellence"
              imageSrc="/lovable-uploads/cca47b6f-2e17-450d-a490-dfc013ec9eaf.png"
            />
            
            {/* Origin story section */}
            <OriginsSection />
            
            {/* Unit Insignia Section */}
            <InsigniaSection
              title="Distinguished Unit Insignia"
              imageSrc="/lovable-uploads/94a399e4-5142-426b-aff8-140dce908017.png"
              imageAlt="Distinguished Unit Insignia"
              icon={<Shield className="h-6 w-6 text-redleg" />}
            >
              <p className="text-artillery-muted mb-4">
                The unit insignia of the 116th Field Artillery carries deep symbolism representing our heritage and values. The shield features a distinctive red, white, and blue design incorporating the traditional artillery colors. The fleur-de-lis in the lower portion represents our historical connections to French artillery traditions, while the circular emblem at the top symbolizes unity and precision.
              </p>
              
              <p className="text-artillery-muted">
                The motto "Vestigia Nulla Retrorsum" is Latin for "No Step Backward," embodying the unwavering dedication and forward-focused commitment of Florida's Field Artillery units throughout their history.
              </p>
            </InsigniaSection>
            
            <Separator className="my-10 bg-gray-200" />
            
            {/* Mission section */}
            <MissionSection />
            
            {/* Coat of Arms Section */}
            <InsigniaSection
              title="Coat of Arms"
              imageSrc="/lovable-uploads/bd767145-b0bf-48ab-b1cf-b97f6b6034cc.png"
              imageAlt="Coat of Arms"
              icon={<Award className="h-6 w-6 text-redleg" />}
            >
              <p className="text-artillery-muted mb-4">
                The Coat of Arms of the 116th Field Artillery features a shield with three horizontal bands in red, blue, and red — symbolizing both service and sacrifice. The prominent fleur-de-lis represents our historical connections and French artillery influences. 
              </p>
              
              <p className="text-artillery-muted">
                The circular emblem at the top symbolizes unity, commitment, and the ongoing cycle of service that defines the Field Artillery's mission. The distinctive red and blue colors pay homage to both artillery tradition and our Florida heritage.
              </p>
            </InsigniaSection>
            
            {/* St. Barbara Section */}
            <LegendaryFigureSection
              title="The Legend of St. Barbara"
              imageSrc="/lovable-uploads/a4b8420f-0d4f-4f90-a4cc-bc37a65c457d.png"
              imageAlt="Saint Barbara, Patron Saint of Artillery"
              icon={<Bookmark className="h-6 w-6 text-redleg" />}
              linkTo="/history/st-barbara"
              linkText="Read the Full Legend"
              description={
                <>
                  <p className="text-artillery-muted mb-4">
                    St. Barbara is the patron saint of artillerymen and those who face danger from thunderstorms, fire, and explosions. According to legend, she was the beautiful daughter of Dioscorus, a pagan nobleman who kept her locked in a tower to preserve her from the outside world.
                  </p>
                  
                  <p className="text-artillery-muted mb-6">
                    After her conversion to Christianity and subsequent martyrdom, St. Barbara became associated with protection from sudden death, making her the natural patroness for artillerymen throughout history.
                  </p>
                </>
              }
            />
            
            {/* Molly Pitcher Section */}
            <LegendaryFigureSection
              title="The Story of Molly Pitcher"
              imageSrc="/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png"
              imageAlt="Molly Pitcher at the Battle of Monmouth"
              icon={<User className="h-6 w-6 text-redleg" />}
              linkTo="/history/molly-pitcher"
              linkText="Read Her Story"
              description={
                <>
                  <p className="text-artillery-muted mb-4">
                    Mary Hays McCauly, better known as "Molly Pitcher," became a legendary figure during the American Revolutionary War when she took her wounded husband's place at a cannon during the Battle of Monmouth on June 28, 1778.
                  </p>
                  
                  <p className="text-artillery-muted mb-6">
                    Her courage under fire earned her recognition from General Washington himself, who issued her a warrant as a noncommissioned officer. Her story represents the spirit and dedication that defines the artillery tradition.
                  </p>
                </>
              }
            />
            
            {/* Timeline section */}
            <MilestonesSection />
            
            {/* Call to action */}
            <HistoryCTA />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;

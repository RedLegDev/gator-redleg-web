
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Bookmark, User, Shield, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

// Import the new components
import HistoryHero from '@/components/History/HistoryHero';
import OriginsSection from '@/components/History/OriginsSection';
import InsigniaSection from '@/components/History/InsigniaSection';
import MilestonesSection from '@/components/History/MilestonesSection';
import LegendaryFigureSection from '@/components/History/LegendaryFigureSection';
import DecorationSection from '@/components/History/DecorationSection';

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
            
            {/* Quick Navigation Links */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/history/st-barbara">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="flex items-center p-4 gap-3">
                    <Bookmark className="h-6 w-6 text-redleg" />
                    <div>
                      <h3 className="font-semibold text-artillery">St. Barbara</h3>
                      <p className="text-sm text-artillery-muted">Patron Saint of Artillery</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-redleg ml-auto" />
                  </CardContent>
                </Card>
              </Link>
              <Link to="/history/molly-pitcher">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="flex items-center p-4 gap-3">
                    <User className="h-6 w-6 text-redleg" />
                    <div>
                      <h3 className="font-semibold text-artillery">Molly Pitcher</h3>
                      <p className="text-sm text-artillery-muted">Hero of the Battle of Monmouth</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-redleg ml-auto" />
                  </CardContent>
                </Card>
              </Link>
            </div>
            
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
            
            {/* Decorations Section - New Addition */}
            <DecorationSection />
            
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
            
            {/* St. Barbara Section - Updated with new image */}
            <LegendaryFigureSection
              title="The Legend of St. Barbara"
              imageSrc="/lovable-uploads/4c7bd39e-600f-4df4-8645-2f6269c1bcc2.png"
              imageAlt="Saint Barbara, Patron Saint of Artillery"
              icon={<Bookmark className="h-6 w-6 text-redleg" />}
              linkTo="/history/st-barbara"
              linkText="Read the Full Legend"
              imageClassName="h-auto max-w-full shadow-lg rounded-lg hover:opacity-90 transition-opacity max-h-80"
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
            
            {/* Molly Pitcher Section - Updated with new image */}
            <LegendaryFigureSection
              title="The Story of Molly Pitcher"
              imageSrc="/lovable-uploads/f1e293fd-7582-4827-9cc2-532c58979ef8.png"
              imageAlt="Molly Pitcher at the Battle of Monmouth"
              icon={<User className="h-6 w-6 text-redleg" />}
              linkTo="/history/molly-pitcher"
              linkText="Read Her Story"
              imageClassName="h-auto max-w-full shadow-lg rounded-lg hover:opacity-90 transition-opacity max-h-80"
              description={
                <>
                  <p className="text-artillery-muted mb-4">
                    Mary Hays McCauly, better known as Molly Pitcher, was the wife of an artilleryman who fought in the American Revolutionary War. During the Battle of Monmouth in 1778, she carried water to soldiers on the battlefield, earning her nickname "Molly Pitcher."
                  </p>
                  <p className="text-artillery-muted">
                    When her husband collapsed at his cannon, Molly stepped forward and took his place, helping to operate the gun through the remainder of the battle. For her bravery, General Washington issued her a warrant as a non-commissioned officer.
                  </p>
                </>
              }
            />
            
            {/* Timeline section */}
            <MilestonesSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;

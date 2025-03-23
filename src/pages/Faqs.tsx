
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Faqs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-6 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-gray-500 mb-6">
              <Link to="/" className="hover:text-redleg">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link to="/more" className="hover:text-redleg">More</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700">FAQs</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-artillery section-heading">
              Frequently Asked Questions
            </h1>
            
            <p className="text-lg text-gray-600 mb-12">
              Find answers to common questions about our chapter, membership, events, and more.
            </p>
            
            {/* FAQ Accordion */}
            <div className="mb-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium">
                    What is the Gator Redlegs Chapter?
                  </AccordionTrigger>
                  <AccordionContent className="text-artillery-muted">
                    The Gator Redlegs Chapter is the Florida chapter of the United States Field Artillery Association (USFAA). 
                    We are a 501(c)(3) non-profit professional association serving Florida's Field Artillery Soldiers, veterans and their families. 
                    Our mission is to promote the efficiency of the Field Artillery by maintaining its best traditions and perpetuating 
                    the memory and history of our fallen.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-medium">
                    Who can join the Gator Redlegs Chapter?
                  </AccordionTrigger>
                  <AccordionContent className="text-artillery-muted">
                    Membership is open to anyone with a connection to the Field Artillery, including active duty, National Guard, 
                    Reserve, and retired Field Artillery personnel, as well as family members and supporters. You do not need to 
                    be currently serving to join.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-medium">
                    What are the benefits of membership?
                  </AccordionTrigger>
                  <AccordionContent className="text-artillery-muted">
                    Benefits include networking with Field Artillery professionals, access to chapter events and activities, 
                    eligibility for scholarship programs, professional development opportunities, and being part of a community 
                    that supports Field Artillery Soldiers and their families. Members also receive our quarterly newsletter 
                    and a Gator Redlegs regimental coin.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-medium">
                    How much are membership dues?
                  </AccordionTrigger>
                  <AccordionContent className="text-artillery-muted">
                    Annual membership dues are $25 for regular members and $15 for retired members and family members. 
                    Lifetime memberships are also available. These dues help fund our scholarship programs, community 
                    outreach initiatives, and chapter events.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg font-medium">
                    What events does the chapter host?
                  </AccordionTrigger>
                  <AccordionContent className="text-artillery-muted">
                    Our signature events include the annual St. Barbara's Day Ball in December, the spring Golf Tournament, 
                    the Kenny Fike Memorial Softball Tournament in the fall, and our 5K Fun Run. We also hold regular 
                    member socials, professional development sessions, and community service activities throughout the year.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-lg font-medium">
                    How can I apply for a scholarship?
                  </AccordionTrigger>
                  <AccordionContent className="text-artillery-muted">
                    Scholarships are available to family members of Field Artillery personnel. The application period 
                    typically opens in January each year, with awards announced in May. Eligibility requirements and 
                    application materials are available on our website during the application period. Please contact 
                    us for more information.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-lg font-medium">
                    Is my donation tax-deductible?
                  </AccordionTrigger>
                  <AccordionContent className="text-artillery-muted">
                    Yes, the Gator Redlegs Chapter is a 501(c)(3) non-profit organization (EIN: 82-4625785), and all 
                    donations are tax-deductible to the extent allowed by law. You will receive a receipt for your donation 
                    that can be used for tax purposes.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-lg font-medium">
                    How can I volunteer with the chapter?
                  </AccordionTrigger>
                  <AccordionContent className="text-artillery-muted">
                    We have many volunteer opportunities, including helping with events, serving on committees, 
                    contributing professional skills, and participating in community service projects. Visit our 
                    Volunteer page or contact us to learn more about current volunteer needs.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-lg font-medium">
                    What is the Order of Saint Barbara?
                  </AccordionTrigger>
                  <AccordionContent className="text-artillery-muted">
                    The Honorable Order of Saint Barbara is a recognition for those who have demonstrated the highest 
                    standards of integrity and moral character, displayed an outstanding competence in the Field Artillery, 
                    and contributed to the promotion of the Field Artillery. Nominations are reviewed by our awards committee, 
                    and recipients are recognized at our annual St. Barbara's Day Ball.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-lg font-medium">
                    How can I contact the chapter leadership?
                  </AccordionTrigger>
                  <AccordionContent className="text-artillery-muted">
                    You can reach our chapter leadership through the Contact Us page on our website, 
                    by email at info@gatorredleg.org, or by mail at GATOR REDLEG ASSOCIATION INC, 
                    4140 DRANE FIELD RD, LAKELAND FL 33811-1209.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Contact CTA */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <HelpCircle className="h-12 w-12 text-redleg mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-artillery mb-4">Still Have Questions?</h3>
              <p className="text-artillery-muted mb-6 max-w-2xl mx-auto">
                If you couldn't find the answer you were looking for, feel free to contact us directly.
                We're happy to help!
              </p>
              <Link to="/more/contact">
                <button className="button-red">Contact Us</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Faqs;

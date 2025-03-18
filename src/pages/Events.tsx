
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  image: string;
  path: string;
}

const events: Event[] = [
  {
    id: "st-barbaras-day",
    title: "Saint Barbara's Day Ball",
    description: "Join us for our annual Saint Barbara's Day Ball, celebrating the patron saint of Field Artillery. This formal event includes dinner, awards ceremony, and dancing. It's an opportunity to honor our Field Artillery heritage and recognize outstanding members of our community.",
    location: "MacDill Air Force Base, Tampa, FL",
    image: "/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png",
    path: "/activities/events/st-barbaras-day"
  },
  {
    id: "softball",
    title: "Kenny Fike Memorial Softball Tournament",
    description: "The annual Kenny Fike Memorial Softball Tournament brings together Field Artillery units and veterans for a day of friendly competition. This tournament honors the memory of Kenny Fike while raising funds to support military families in need.",
    location: "Veterans Park, Tampa, FL",
    image: "/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png",
    path: "/activities/events/softball"
  },
  {
    id: "golf",
    title: "Annual Golf Tournament",
    description: "Our spring golf tournament is a popular event that brings together Redlegs and supporters for a day on the links. Teams compete in a scramble format with prizes for various achievements. All proceeds support our scholarship fund and other chapter initiatives.",
    location: "Westchase Golf Club, Tampa, FL",
    image: "/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png",
    path: "/activities/events/golf"
  },
  {
    id: "5k",
    title: "5K Fun Run",
    description: "Our newest event, the 5K Fun Run, promotes fitness and camaraderie among Field Artillery personnel, veterans, and their families. This family-friendly event welcomes participants of all ages and abilities to walk or run in support of our cause.",
    location: "Al Lopez Park, Tampa, FL",
    image: "/lovable-uploads/462710ac-29ef-4a8c-9e07-448e45e8ada8.png",
    path: "/activities/events/5k"
  }
];

const Events = () => {
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
              <Link to="/activities" className="hover:text-redleg">Activities</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700">Events</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-artillery section-heading">
              Upcoming Events
            </h1>
            
            <p className="text-lg text-artillery-muted mb-12">
              Throughout the year, the Gator Redleg Chapter hosts several signature events that bring our community 
              together while raising funds for our charitable initiatives. Learn about our upcoming events and how 
              you can participate.
            </p>
            
            <div className="space-y-8">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <CardTitle className="text-2xl text-artillery">{event.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-sm">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {event.location}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-artillery-muted">{event.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Link to={event.path} className="w-full sm:w-auto">
                          <Button variant="default" className="w-full sm:w-auto bg-redleg hover:bg-redleg-dark text-white">
                            Event Details
                          </Button>
                        </Link>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Call to Action */}
            <div className="mt-12 text-center bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-artillery mb-4">Want to Help with Our Events?</h2>
              <p className="text-artillery-muted mb-6">
                We're always looking for volunteers to help organize and run our events.
                Your time and talents can make a significant impact!
              </p>
              <Link to="/support/volunteer">
                <Button className="bg-redleg hover:bg-redleg-dark text-white">
                  Volunteer With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;

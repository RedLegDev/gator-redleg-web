
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, Trophy, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

interface ActivityCard {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  date?: string;
}

const eventsActivities: ActivityCard[] = [
  {
    id: "st-barbaras-day",
    title: "Saint Barbara's Day Ball",
    description: "Our most important annual event celebrating the patron saint of Field Artillery.",
    path: "/activities/events/st-barbaras-day",
    icon: <Award className="h-10 w-10 text-redleg" />,
    date: "December 4, 2023"
  },
  {
    id: "softball",
    title: "Kenny Fike Memorial Softball Tournament",
    description: "Annual softball tournament honoring the memory of Kenny Fike and raising funds for military families.",
    path: "/activities/events/softball",
    icon: <Trophy className="h-10 w-10 text-redleg" />,
    date: "September 15, 2023"
  },
  {
    id: "golf",
    title: "Annual Golf Tournament",
    description: "Spring golf tournament bringing together Redlegs for a day of camaraderie and fundraising.",
    path: "/activities/events/golf",
    icon: <Users className="h-10 w-10 text-redleg" />,
    date: "April 22, 2023"
  },
  {
    id: "5k",
    title: "5K Fun Run",
    description: "Our newest event - a 5K run to raise funds for the chapter and other military organizations.",
    path: "/activities/events/5k",
    icon: <Calendar className="h-10 w-10 text-redleg" />,
    date: "March 26, 2023"
  }
];

const communityActivities: ActivityCard[] = [
  {
    id: "community-service",
    title: "Community Service",
    description: "Supporting local veteran and military family initiatives through volunteer work.",
    path: "/activities/community",
    icon: <Users className="h-10 w-10 text-redleg" />
  }
];

const Activities = () => {
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
              <span className="text-gray-700">Chapter Activities</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-artillery section-heading">
              Chapter Activities
            </h1>
            
            <p className="text-lg text-artillery-muted mb-12">
              Explore the various activities, events, and initiatives that our chapter organizes throughout the year. 
              From formal events like Saint Barbara's Day to community service initiatives, the Gator Redleg Chapter 
              remains active in supporting Field Artillery Soldiers, veterans and their families.
            </p>
            
            {/* Events Section */}
            <section className="mb-16">
              <div className="flex items-center mb-6">
                <Trophy className="h-6 w-6 text-redleg mr-2" />
                <h2 className="text-3xl font-bold text-artillery">Events</h2>
              </div>
              
              <p className="text-artillery-muted mb-8">
                Throughout the year, our chapter hosts several signature events that bring together current and former 
                Field Artillery personnel, raise funds for our charitable initiatives, and strengthen our community bonds.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {eventsActivities.map((activity) => (
                  <Card key={activity.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className="p-2 bg-gray-50 rounded-md">
                        {activity.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-artillery">{activity.title}</CardTitle>
                        {activity.date && (
                          <CardDescription>{activity.date}</CardDescription>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-artillery-muted">{activity.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Link to={activity.path} className="w-full">
                        <Button variant="outline" className="w-full border-redleg text-redleg hover:bg-redleg hover:text-white">
                          Learn More
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Link to="/activities/events">
                  <Button className="bg-redleg hover:bg-redleg-dark text-white">
                    View All Events Details
                  </Button>
                </Link>
              </div>
            </section>
            
            <Separator className="my-12" />
            
            {/* Community Initiatives Section */}
            <section>
              <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-redleg mr-2" />
                <h2 className="text-3xl font-bold text-artillery">Community Initiatives</h2>
              </div>
              
              <p className="text-artillery-muted mb-8">
                Beyond our signature events, the Gator Redleg Chapter is actively involved in community service and 
                outreach initiatives that support Field Artillery Soldiers, veterans, and their families.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {communityActivities.map((activity) => (
                  <Card key={activity.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className="p-2 bg-gray-50 rounded-md">
                        {activity.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-artillery">{activity.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-artillery-muted">{activity.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Link to={activity.path} className="w-full">
                        <Button variant="outline" className="w-full border-redleg text-redleg hover:bg-redleg hover:text-white">
                          Learn More
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Activities;

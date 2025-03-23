
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ChevronRight, Users, Award, Book, DollarSign, Info } from 'lucide-react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Membership = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-6 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-gray-500 hover:text-redleg">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-700">Membership</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Page Header */}
            <div className="mb-12 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-artillery">Membership</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto md:mx-0">
                Join the Gator Redlegs Chapter and help support Florida's Field Artillery Soldiers, veterans, and their families.
              </p>
            </div>

            {/* Quote Section */}
            <div className="bg-gray-50 border-l-4 border-redleg p-6 rounded-r-lg mb-12">
              <p className="text-lg italic text-gray-700 mb-4">
                "We are only as strong as our membership and your dedication to your professional association will help perpetuate its rich heritage, as well as its many initiatives. Some of the initiatives include scholarships to USFAA members and their family members, recognition awards to the FA BOLC, CCC, PCC and NCOA distinguished graduates, support for Field Artillery balls, Saint Barbara and Molly Pitcher awards, and of course, Chapter Grants. Grants to USFAA chapters help them stay active and promote the mission and legacy of the Field Artillery."
              </p>
              <p className="text-right font-medium text-gray-600">
                — US Field Artillery Association
              </p>
            </div>

            {/* Membership Information */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-redleg mr-3" />
                  <h2 className="text-2xl font-bold text-artillery">Join Today!</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Since its humble beginnings on horseback at Fort Riley in the first decade of this century, the United States Field Artillery Association has served important purposes and contributed to the development of the world's best Field Artillery. Today's Association continues this proud Redleg tradition.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-bold text-artillery mb-2">Membership Benefits:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Artillery Journal subscription</li>
                    <li>Scholarship eligibility</li>
                    <li>Complimentary membership in the AUSA</li>
                    <li>Supporting the Gator Redlegs in your community</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <a 
                    href="https://fieldartillery.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-redleg hover:underline font-medium"
                  >
                    Visit fieldartillery.org →
                  </a>
                </div>
                <p className="text-sm text-gray-500">
                  Visit for more information about the organization, including small business or corporate enrollment and membership renewal.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 text-redleg mr-3" />
                  <h2 className="text-2xl font-bold text-artillery">AUSA Partnership</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  We have recently become teammates with the Association of the United States Army. As long as you are a member of the United States Field Artillery Association you gain complementary membership in AUSA.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-bold text-artillery mb-2">What You Need to Know:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>You do not have to do anything else to get your membership with AUSA recognized</li>
                    <li>The Field Artillery Association ensures you are enrolled</li>
                    <li>AUSA has been a huge advocate for force structure</li>
                    <li>Significant retail discounts are now available to all members</li>
                  </ul>
                </div>
                <div className="flex justify-center mt-6">
                  <img 
                    src="/placeholder.svg" 
                    alt="AUSA Logo" 
                    className="h-16 opacity-60"
                  />
                </div>
              </div>
            </div>

            {/* Membership Pricing */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <DollarSign className="h-6 w-6 text-redleg mr-3" />
                <h2 className="text-2xl font-bold text-artillery">Membership Pricing</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Annual Membership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$25.00</div>
                    <p className="text-sm text-gray-500">1 Year Membership</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>3 Year Membership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$60.00</div>
                    <p className="text-sm text-gray-500">Save $15 over annual rate</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>5 Year Membership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$100.00</div>
                    <p className="text-sm text-gray-500">Save $25 over annual rate</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Lifetime Membership */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Book className="h-6 w-6 text-redleg mr-3" />
                <h2 className="text-2xl font-bold text-artillery">Lifetime Membership Options</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Age 17-40</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$425.00</div>
                    <p className="text-sm text-gray-500">Lifetime Membership</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Age 41-50</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$410.00</div>
                    <p className="text-sm text-gray-500">Lifetime Membership</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Age 51-60</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$365.00</div>
                    <p className="text-sm text-gray-500">Lifetime Membership</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Age 61-70</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$300.00</div>
                    <p className="text-sm text-gray-500">Lifetime Membership</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Age 71-80</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$265.00</div>
                    <p className="text-sm text-gray-500">Lifetime Membership</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Age 80+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$215.00</div>
                    <p className="text-sm text-gray-500">Lifetime Membership</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-artillery/5 rounded-lg p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-artillery">Ready to Join?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Your membership supports scholarships, recognition awards, and community initiatives for Field Artillery Soldiers and their families.
              </p>
              <a 
                href="https://fieldartillery.org/join" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="bg-redleg hover:bg-redleg/90 text-white py-2 px-6 rounded-md text-lg">
                  Join the USFAA Today
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Membership;

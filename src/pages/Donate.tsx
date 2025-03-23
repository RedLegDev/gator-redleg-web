
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, CreditCard, DollarSign, Award, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Donate = () => {
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
              <Link to="/support" className="hover:text-redleg">Support</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700">Donate</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-artillery section-heading">
              Make a Donation
            </h1>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12 text-center">
              <p className="font-medium text-artillery text-lg mb-2">
                We are a 501(c)(3) non-profit organization
              </p>
              <p className="text-gray-600">
                EIN: 82-4625785
              </p>
              <p className="text-gray-600 mt-2">
                All donations are tax-deductible to the extent allowed by law
              </p>
            </div>
            
            <p className="text-lg text-gray-600 mb-12">
              Your generous support helps us provide scholarships, emergency assistance, and support programs 
              for Field Artillery Soldiers, veterans, and their families.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* One-Time Donation */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-6">
                  <DollarSign className="h-8 w-8 text-redleg mr-3" />
                  <h2 className="text-2xl font-bold text-artillery">One-Time Donation</h2>
                </div>
                
                <p className="text-artillery-muted mb-6">
                  Make a single donation in any amount to support our mission and programs.
                </p>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button className="border border-gray-300 rounded-md py-2 text-artillery-muted hover:bg-redleg hover:text-white hover:border-redleg transition-colors">
                    $25
                  </button>
                  <button className="border border-gray-300 rounded-md py-2 text-artillery-muted hover:bg-redleg hover:text-white hover:border-redleg transition-colors">
                    $50
                  </button>
                  <button className="border border-gray-300 rounded-md py-2 text-artillery-muted hover:bg-redleg hover:text-white hover:border-redleg transition-colors">
                    $100
                  </button>
                  <button className="border border-gray-300 rounded-md py-2 text-artillery-muted hover:bg-redleg hover:text-white hover:border-redleg transition-colors">
                    $250
                  </button>
                  <button className="border border-gray-300 rounded-md py-2 text-artillery-muted hover:bg-redleg hover:text-white hover:border-redleg transition-colors">
                    $500
                  </button>
                  <button className="border border-gray-300 rounded-md py-2 text-artillery-muted hover:bg-redleg hover:text-white hover:border-redleg transition-colors">
                    Other
                  </button>
                </div>
                
                <button className="w-full bg-redleg text-white py-3 px-6 rounded-md hover:bg-redleg/90 transition duration-300 mb-4">
                  Donate Now
                </button>
              </div>
              
              {/* Monthly Giving */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-6">
                  <Calendar className="h-8 w-8 text-redleg mr-3" />
                  <h2 className="text-2xl font-bold text-artillery">Monthly Giving</h2>
                </div>
                
                <p className="text-artillery-muted mb-6">
                  Become a sustaining donor with a monthly contribution to support our ongoing programs.
                </p>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button className="border border-gray-300 rounded-md py-2 text-artillery-muted hover:bg-redleg hover:text-white hover:border-redleg transition-colors">
                    $10/mo
                  </button>
                  <button className="border border-gray-300 rounded-md py-2 text-artillery-muted hover:bg-redleg hover:text-white hover:border-redleg transition-colors">
                    $20/mo
                  </button>
                  <button className="border border-gray-300 rounded-md py-2 text-artillery-muted hover:bg-redleg hover:text-white hover:border-redleg transition-colors">
                    $50/mo
                  </button>
                  <button className="border border-gray-300 rounded-md py-2 text-artillery-muted hover:bg-redleg hover:text-white hover:border-redleg transition-colors">
                    $100/mo
                  </button>
                  <button className="border border-gray-300 rounded-md py-2 text-artillery-muted hover:bg-redleg hover:text-white hover:border-redleg transition-colors">
                    $200/mo
                  </button>
                  <button className="border border-gray-300 rounded-md py-2 text-artillery-muted hover:bg-redleg hover:text-white hover:border-redleg transition-colors">
                    Other
                  </button>
                </div>
                
                <button className="w-full bg-redleg text-white py-3 px-6 rounded-md hover:bg-redleg/90 transition duration-300 mb-4">
                  Become a Monthly Donor
                </button>
              </div>
            </div>
            
            {/* Payment Information Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
              <div className="flex items-center mb-6">
                <CreditCard className="h-8 w-8 text-redleg mr-3" />
                <h2 className="text-2xl font-bold text-artillery">Payment Information</h2>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                  />
                </div>
                
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                    placeholder="•••• •••• •••• ••••"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiration" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                    <input
                      type="text"
                      id="expiration"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                    <input
                      type="text"
                      id="cvc"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                      placeholder="•••"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Donation Amount</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="text"
                      id="amount"
                      className="w-full pl-7 px-4 py-2 border border-gray-300 rounded-md focus:ring-redleg focus:border-redleg"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div className="flex items-start">
                  <input
                    id="recurring"
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-redleg border-gray-300 rounded focus:ring-redleg"
                  />
                  <label htmlFor="recurring" className="ml-2 block text-sm text-gray-700">
                    Make this a monthly recurring donation
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-redleg text-white py-3 px-6 rounded-md hover:bg-redleg/90 transition duration-300"
                >
                  Complete Donation
                </button>
                
                <p className="text-sm text-gray-500 text-center">
                  Your donation is secure and encrypted. You will receive a tax receipt by email.
                </p>
              </form>
            </div>
            
            {/* Other Ways to Give */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-artillery mb-6 text-center">Other Ways to Give</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Check by Mail</h3>
                  <p className="text-artillery-muted mb-2">
                    Please make checks payable to "Gator Redleg Chapter" and mail to:
                  </p>
                  <p className="text-artillery-muted">
                    GATOR REDLEG ASSOCIATION INC<br />
                    4140 DRANE FIELD RD<br />
                    LAKELAND FL 33811-1209
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Employer Matching Gifts</h3>
                  <p className="text-artillery-muted">
                    Many employers match charitable contributions made by their employees. Ask your HR department 
                    if your company participates in a matching gift program.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Planned Giving</h3>
                  <p className="text-artillery-muted">
                    Include the Gator Redleg Chapter in your estate planning to create a lasting legacy. 
                    Contact us for more information about planned giving options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;


import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-bold text-2xl mb-4">
              <span className="text-redleg">Gator Redlegs</span>
            </h3>
            <p className="text-gray-400 mb-6">
              The Florida Chapter of the <a href="https://www.fieldartillery.org/" target="_blank" rel="noopener noreferrer" className="text-redleg hover:underline">United States Field Artillery Association (USFAA)</a>
            </p>
            <p className="text-gray-400 mb-6">
              501(c)(3) Non-Profit Organization<br />
              EIN: 82-4625785
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-redleg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-redleg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-redleg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/history" className="text-gray-400 hover:text-white transition-colors">History</Link>
              </li>
              <li>
                <Link to="/regimental-coin" className="text-gray-400 hover:text-white transition-colors">Regimental Coin</Link>
              </li>
              <li>
                <Link to="/activities" className="text-gray-400 hover:text-white transition-colors">Chapter Activities</Link>
              </li>
              <li>
                <Link to="/membership" className="text-gray-400 hover:text-white transition-colors">Membership</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/support/donate" className="text-gray-400 hover:text-white transition-colors">Donate</Link>
              </li>
              <li>
                <Link to="/support/volunteer" className="text-gray-400 hover:text-white transition-colors">Volunteer</Link>
              </li>
              <li>
                <Link to="/newsletter" className="text-gray-400 hover:text-white transition-colors">Newsletter</Link>
              </li>
              <li>
                <Link to="/more/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/history" className="text-gray-400 hover:text-white transition-colors">FAQs</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact Information</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-redleg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-gray-400">GATOR REDLEG ASSOCIATION INC<br/>4140 DRANE FIELD RD<br/>LAKELAND FL 33811-1209</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-redleg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="text-gray-400">info@gatorredleg.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex justify-center">
            <div className="flex flex-col space-y-2">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Gator Redlegs - Florida Chapter of the United States Field Artillery Association. 
                All rights reserved.
              </p>
              <p className="text-gray-500 text-sm">
                Built and maintained by <a href="https://www.redleg.dev" target="_blank" rel="noopener noreferrer" className="text-redleg hover:underline">Red Leg Dev</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

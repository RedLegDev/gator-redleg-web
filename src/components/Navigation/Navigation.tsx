
import React, { useState, useEffect } from 'react';
import { Home, Info, Calendar, Image, Heart, User, Phone } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar";
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import { NavItem } from './types';

const Navigation: React.FC = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Main navbar items (tubelight effect)
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/history', icon: Info },
    { name: 'Events', url: '/activities', icon: Calendar },
    { name: 'Media', url: '/photos', icon: Image },
    { name: 'Support', url: '/support', icon: Heart },
    { name: 'Membership', url: '/membership', icon: User },
    { name: 'Contact', url: '/more/contact', icon: Phone }
  ];

  // Full navigation structure with subpages for dropdown menus
  const fullNavItems: NavItem[] = [
    {
      title: 'Home',
      path: '/',
      hasSubmenu: false
    },
    {
      title: 'About',
      path: '/history',
      hasSubmenu: true,
      submenu: [
        { title: 'History', path: '/history' },
        { title: 'Heritage', path: '/history/heritage' },
        { title: 'Florida Artillery', path: '/history/florida-artillery' },
        { title: 'St. Barbara', path: '/history/st-barbara' },
        { title: 'Molly Pitcher', path: '/history/molly-pitcher' },
        { title: 'Regimental Coin', path: '/regimental-coin' }
      ]
    },
    {
      title: 'Events',
      path: '/activities',
      hasSubmenu: true,
      submenu: [
        { title: 'Activities', path: '/activities' },
        { title: 'Events Calendar', path: '/activities/events' },
        { title: 'Community', path: '/activities/community' },
        { title: 'St. Barbara\'s Day', path: '/activities/events/st-barbaras-day' },
        { title: 'Softball Tournament', path: '/activities/events/softball' },
        { title: 'Golf Tournament', path: '/activities/events/golf' },
        { title: '5K Run', path: '/activities/events/5k' }
      ]
    },
    {
      title: 'Media',
      path: '/photos',
      hasSubmenu: true,
      submenu: [
        { title: 'Photo Gallery', path: '/photos' },
        { title: 'Event Gallery', path: '/photos/gallery' },
        { title: 'Historical Photos', path: '/photos/historical' },
        { title: 'Newsletter', path: '/newsletter' },
        { title: 'Latest Newsletter', path: '/newsletter/latest' },
        { title: 'Newsletter Archive', path: '/newsletter/archive' }
      ]
    },
    {
      title: 'Support',
      path: '/support',
      hasSubmenu: true,
      submenu: [
        { title: 'Support Us', path: '/support' },
        { title: 'Donate', path: '/support/donate' },
        { title: 'Volunteer', path: '/support/volunteer' }
      ]
    },
    {
      title: 'Membership',
      path: '/membership',
      hasSubmenu: false
    },
    {
      title: 'More',
      path: '/more',
      hasSubmenu: true,
      submenu: [
        { title: 'Contact Us', path: '/more/contact' },
        { title: 'FAQs', path: '/history' },
        { title: 'Privacy Policy', path: '/privacy-policy' },
        { title: 'Terms of Service', path: '/terms-of-service' }
      ]
    }
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header className="relative z-50">
      {/* Main tubelight navbar */}
      <NavBar 
        items={navItems} 
        className={isMobile ? "bottom-4" : "top-4"}
      />
      
      {/* Desktop dropdown menu */}
      <div className="hidden md:block fixed top-0 left-0 w-full bg-white shadow-sm z-40">
        <div className="container mx-auto px-4 py-1">
          <div className="flex justify-center items-center h-16">
            <DesktopMenu navItems={fullNavItems} />
          </div>
        </div>
      </div>
      
      {/* Mobile menu toggle and menu */}
      <div className="md:hidden fixed top-0 left-0 w-full z-40">
        <div className="flex justify-between items-center p-4 bg-white shadow-sm">
          <div className="text-xl font-bold text-redleg">Gator Redlegs</div>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 text-artillery hover:text-redleg focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <MobileMenu 
        navItems={fullNavItems} 
        isOpen={mobileMenuOpen} 
        closeMenu={() => setMobileMenuOpen(false)} 
      />
    </header>
  );
};

export default Navigation;

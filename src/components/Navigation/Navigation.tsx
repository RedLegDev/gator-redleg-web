
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { NavItem } from './types';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

const navItems: NavItem[] = [
  { 
    title: 'Home', 
    path: '/',
  },
  { 
    title: 'About', 
    path: '/history',
    hasSubmenu: true,
    submenu: [
      { title: 'Our Heritage', path: '/history/heritage' },
      { title: 'Florida Artillery', path: '/history/florida-artillery' },
      { title: 'Regimental Coin', path: '/regimental-coin' },
    ]
  },
  { 
    title: 'Events', 
    path: '/activities',
    hasSubmenu: true,
    submenu: [
      { title: 'All Events', path: '/activities/events' },
      { title: 'St. Barbara\'s Day', path: '/activities/events/st-barbaras-day' },
      { title: 'Softball Tournament', path: '/activities/events/softball' },
      { title: 'Golf Tournament', path: '/activities/events/golf' },
      { title: '5K Run', path: '/activities/events/5k' },
      { title: 'Community Outreach', path: '/activities/community' },
    ]
  },
  { 
    title: 'Media', 
    path: '/media',
    hasSubmenu: true,
    submenu: [
      { title: 'Photo Gallery', path: '/photos/gallery' },
      { title: 'Historical Photos', path: '/photos/historical' },
      { title: 'Newsletter', path: '/newsletter/latest' },
      { title: 'Newsletter Archive', path: '/newsletter/archive' },
    ]
  },
  { 
    title: 'Support', 
    path: '/support',
    hasSubmenu: true,
    submenu: [
      { title: 'Donate', path: '/support/donate' },
      { title: 'Volunteer', path: '/support/volunteer' },
    ]
  },
  { 
    title: 'Membership', 
    path: '/membership',
  },
  { 
    title: 'Contact', 
    path: '/more/contact',
  },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-white/80 backdrop-blur-sm py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center"
          onClick={closeMenu}
        >
          <h1 className="text-2xl font-bold text-artillery">
            <span className="text-redleg">Gator Redlegs</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && <DesktopMenu navItems={navItems} />}

        {/* Mobile Menu Button */}
        <button className="md:hidden text-artillery" onClick={toggleMenu}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu 
        navItems={navItems} 
        isOpen={isOpen} 
        closeMenu={closeMenu} 
      />
    </nav>
  );
};

export default Navigation;

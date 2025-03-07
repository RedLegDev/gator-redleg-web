
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, X, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItem {
  title: string;
  path: string;
  hasSubmenu?: boolean;
  submenu?: NavItem[];
}

const navItems: NavItem[] = [
  { title: 'Home', path: '/' },
  { 
    title: 'History', 
    path: '/history',
    hasSubmenu: true,
    submenu: [
      { title: 'Our Heritage', path: '/history/heritage' },
      { title: 'Florida Artillery', path: '/history/florida-artillery' },
    ]
  },
  { title: 'Regimental Coin', path: '/regimental-coin' },
  { 
    title: 'Chapter Activities', 
    path: '/activities',
    hasSubmenu: true,
    submenu: [
      { title: 'Events', path: '/activities/events' },
      { title: 'Community Outreach', path: '/activities/community' },
    ]
  },
  { 
    title: 'Newsletter', 
    path: '/newsletter',
    hasSubmenu: true,
    submenu: [
      { title: 'Latest Newsletter', path: '/newsletter/latest' },
      { title: 'Archive', path: '/newsletter/archive' },
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
    title: 'Photos', 
    path: '/photos',
    hasSubmenu: true,
    submenu: [
      { title: 'Gallery', path: '/photos/gallery' },
      { title: 'Historical', path: '/photos/historical' },
    ]
  },
  { title: 'Membership', path: '/membership' },
  { 
    title: 'More', 
    path: '/more',
    hasSubmenu: true,
    submenu: [
      { title: 'Contact', path: '/more/contact' },
      { title: 'FAQs', path: '/more/faqs' },
    ]
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
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

  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(title);
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-white/80 backdrop-blur-sm py-4'}`}>
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
        {!isMobile && (
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <div key={item.title} className="relative group">
                <Link 
                  to={item.path} 
                  className="nav-item font-medium"
                >
                  <span className="flex items-center">
                    {item.title}
                    {item.hasSubmenu && <ChevronDown className="ml-1 w-4 h-4" />}
                  </span>
                </Link>
                
                {item.hasSubmenu && (
                  <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                    <div className="py-2">
                      {item.submenu?.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-artillery-light hover:bg-redleg/5 hover:text-redleg transition-colors"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden text-artillery" onClick={toggleMenu}>
          {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="flex flex-col h-full pt-20 px-6 pb-6 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.title} className="border-b border-gray-100 py-3">
              {item.hasSubmenu ? (
                <>
                  <button 
                    className="w-full flex justify-between items-center text-left text-lg font-medium text-artillery"
                    onClick={() => toggleSubmenu(item.title)}
                  >
                    {item.title}
                    <ChevronDown className={`h-5 w-5 transform transition-transform ${openSubmenu === item.title ? 'rotate-180' : ''}`} />
                  </button>
                  {openSubmenu === item.title && (
                    <div className="pl-4 mt-2 space-y-2">
                      {item.submenu?.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.path}
                          className="block py-2 text-artillery-muted hover:text-redleg"
                          onClick={closeMenu}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className="block text-lg font-medium text-artillery hover:text-redleg"
                  onClick={closeMenu}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
          
          <div className="mt-auto pt-6">
            <Link to="/membership" onClick={closeMenu}>
              <button className="button-red w-full">Become a Member</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

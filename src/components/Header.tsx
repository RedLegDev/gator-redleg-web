
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  path: string;
  hasSubmenu?: boolean;
  submenu?: NavItem[];
}

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

        {/* Desktop Navigation - Using shadcn NavigationMenu */}
        {!isMobile && (
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.hasSubmenu ? (
                    <NavigationMenuTrigger className="font-medium text-artillery hover:text-redleg hover:bg-transparent focus:bg-transparent">
                      {item.title}
                    </NavigationMenuTrigger>
                  ) : (
                    <Link to={item.path}>
                      <NavigationMenuLink className={cn(
                        navigationMenuTriggerStyle(),
                        "font-medium text-artillery hover:text-redleg hover:bg-transparent focus:bg-transparent"
                      )}>
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                  
                  {item.hasSubmenu && (
                    <NavigationMenuContent>
                      <ul className="grid w-[220px] gap-1 p-2">
                        {item.submenu?.map((subItem) => (
                          <li key={subItem.title}>
                            <Link to={subItem.path}>
                              <NavigationMenuLink
                                className={cn(
                                  "block select-none space-y-1 rounded-md p-3 hover:bg-redleg/5 hover:text-redleg",
                                )}
                              >
                                <div className="text-sm font-medium">{subItem.title}</div>
                              </NavigationMenuLink>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden text-artillery" onClick={toggleMenu}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                    <span>{item.title}</span>
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

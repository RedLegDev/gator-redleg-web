
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { NavItem } from './types';

interface MobileMenuProps {
  navItems: NavItem[];
  isOpen: boolean;
  closeMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navItems, isOpen, closeMenu }) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(title);
    }
  };

  // Check if an item or its children are active
  const isActive = (item: NavItem): boolean => {
    if (location.pathname === item.path) return true;
    if (item.submenu) {
      return item.submenu.some(subItem => 
        location.pathname === subItem.path || 
        location.pathname.startsWith(subItem.path + '/')
      );
    }
    return false;
  };

  return (
    <div className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
      <div className="flex flex-col h-full pt-20 px-6 pb-32 overflow-y-auto">
        {navItems.map((item) => (
          <div key={item.title} className="border-b border-gray-100 py-3">
            {item.hasSubmenu ? (
              <>
                <button 
                  className={`w-full flex justify-between items-center text-left text-lg font-medium ${isActive(item) ? 'text-redleg' : 'text-artillery'}`}
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
                        className={`block py-2 hover:text-redleg ${location.pathname === subItem.path ? 'text-redleg' : 'text-artillery-muted'}`}
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
                className={`block text-lg font-medium hover:text-redleg ${location.pathname === item.path ? 'text-redleg' : 'text-artillery'}`}
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
  );
};

export default MobileMenu;

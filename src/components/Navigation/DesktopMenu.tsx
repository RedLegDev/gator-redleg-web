
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import { NavItem } from './types';

interface DesktopMenuProps {
  navItems: NavItem[];
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ navItems }) => {
  const location = useLocation();

  // Check if a path is active or one of its children is active
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
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-1">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            {item.hasSubmenu ? (
              <>
                <NavigationMenuTrigger 
                  className={cn(
                    "font-medium hover:text-redleg hover:bg-transparent focus:bg-transparent",
                    isActive(item) ? "text-redleg" : "text-artillery"
                  )}
                >
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 p-2 w-[220px]">
                    {item.submenu?.map((subItem) => (
                      <li key={subItem.title}>
                        <Link 
                          to={subItem.path}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 hover:bg-redleg/5 hover:text-redleg",
                            location.pathname === subItem.path ? "bg-redleg/5 text-redleg" : "text-artillery"
                          )}
                        >
                          <div className="text-sm font-medium">{subItem.title}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link to={item.path}>
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "font-medium hover:text-redleg hover:bg-transparent focus:bg-transparent",
                    isActive(item) ? "text-redleg" : "text-artillery"
                  )}
                >
                  {item.title}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopMenu;

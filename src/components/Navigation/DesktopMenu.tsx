
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
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
  return (
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
  );
};

export default DesktopMenu;

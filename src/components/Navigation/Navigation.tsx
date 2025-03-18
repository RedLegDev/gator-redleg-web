
import React from 'react';
import { Home, Info, Calendar, Image, Heart, User, Phone } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar";
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation: React.FC = () => {
  const isMobile = useIsMobile();
  
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/history', icon: Info },
    { name: 'Events', url: '/activities', icon: Calendar },
    { name: 'Media', url: '/photos', icon: Image },
    { name: 'Support', url: '/support', icon: Heart },
    { name: 'Membership', url: '/membership', icon: User },
    { name: 'Contact', url: '/more/contact', icon: Phone }
  ];

  return (
    <NavBar 
      items={navItems} 
      className={isMobile ? "bottom-4" : "top-4"}
    />
  );
};

export default Navigation;

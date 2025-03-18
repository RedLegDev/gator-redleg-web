
import React from 'react';
import Navigation from './Navigation/Navigation';

const Header = () => {
  return (
    <>
      <Navigation />
      {/* Add spacing to accommodate the fixed navigation */}
      <div className="pt-20 md:pt-32"></div>
    </>
  );
};

export default Header;

import React from 'react';
import { useLocation } from 'react-router-dom';

const FadeInWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-fadeIn opacity-0 transition-opacity duration-600 ease-out">
      {children}
    </div>
  );
};

export default FadeInWrapper;

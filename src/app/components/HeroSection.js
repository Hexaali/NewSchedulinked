// components/HeroSection.js
import React from 'react';

const HeroSection = ({ children, className = '', id = '' }) => {
  return (
    <section
      id={id}
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </section>
  );
};

export default HeroSection;

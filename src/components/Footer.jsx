import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full h-16 bg-white border-t border-gray-200 flex items-center justify-center text-sm text-gray-500 mt-auto">
      &copy; {new Date().getFullYear()} EbrajGR. All rights reserved.
    </footer>
  );
};

export default Footer;

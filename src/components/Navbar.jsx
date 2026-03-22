import React, { useState } from 'react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <nav className="w-full h-16 bg-gradient-to-r from-slate-900 to-blue-900 flex items-center px-8 shadow-md">
      
      {/* LEFT HALF (Contains Logo and Links) */}
      <div className="flex items-center w-1/2 h-full">
        
        {/* Logo Text - Far Left */}
        <div className="text-xl tracking-wide flex-shrink-0">
          <span className="font-normal text-yellow-300">Ebraj</span>
          <span className="font-small text-yellow-300 text-[10px]">GR</span>
        </div>

        {/* Links - Pinned to the right side of the left half (so they extend left from center) */}
        {/* Increased space-x-8 to space-x-16 for extra spacing */}
        <div className="ml-auto flex items-center space-x-32 pr-4">
          <a href="#" className="text-sm font-medium text-slate-200 hover:text-white transition-colors duration-200">
            Public law
          </a>
          <a href="#" className="text-sm font-medium text-slate-200 hover:text-white transition-colors duration-200">
            Stats
          </a>
          <a href="#" className="text-sm font-medium text-slate-200 hover:text-white transition-colors duration-200">
            Future
          </a>
        </div>
      </div>

      {/* RIGHT HALF (Contains Toggle and Login) */}
      <div className="flex items-center justify-end w-1/2 h-full space-x-6">
        
        {/* Toggle Switch UI with Icons inside the circle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`w-14 h-7 rounded-full p-1 flex items-center transition-colors duration-300 focus:outline-none ${
            isDarkMode ? 'bg-blue-600' : 'bg-slate-700'
          }`}
          aria-label="Toggle dark mode"
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300 ${
              isDarkMode ? 'translate-x-7' : 'translate-x-0'
            }`}
          >
            {isDarkMode ? (
              /* Moon Icon for Dark Mode */
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-blue-900">
                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
              </svg>
            ) : (
              /* Sun Icon for Light Mode */
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-yellow-500">
                <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
              </svg>
            )}
          </div>
        </button>

        {/* Login Button */}
        <button className="text-sm font-medium text-slate-200 hover:text-white transition-colors duration-200 focus:outline-none">
          Login
        </button>
      </div>

    </nav>
  );
};

export default Navbar;

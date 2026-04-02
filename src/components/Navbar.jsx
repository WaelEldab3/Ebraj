import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import logo from '../assets/Ebraj logo/logo.png';
import { useUser, useLogout } from '../hooks/useAuth';
import IdentityBadge from './ui/IdentityBadge';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { data: user } = useUser();
  const isLoggedIn = !!user;
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout(null, {
      onSuccess: () => {
        setIsDropdownOpen(false);
        navigate('/login');
      }
    });
  };

  return (
    <nav className="w-full h-16 bg-gradient-to-r from-slate-900 to-blue-900 flex items-center px-8 shadow-md">
      
      {/* LEFT HALF (Contains Logo and Links) */}
      <div className="flex items-center w-1/2 h-full">
        
        {/* Logo Section - Far Left */}
        <Link to="/home" className="flex items-center gap-2 focus:outline-none">
          {/* Logo Image */}
          <img src={logo} alt="Ebraj Logo" className="h-10 w-auto" />
          
          {/* Logo Text */}
          <div className="text-xl tracking-wide flex-shrink-0">
            <span className="font-normal text-yellow-300">Ebraj</span>
            <span className="font-small text-yellow-300 text-[10px]">GR</span>
          </div>
        </Link>

        {/* Links - Pinned to the right side of the left half (so they extend left from center) */}
        {/* Increased space-x-8 to space-x-16 for extra spacing */}
        <div className="ml-auto flex items-center space-x-32 pr-4">
          <NavLink 
            to="/public-law" 
            className={({ isActive }) => 
              `text-sm transition-colors duration-200 focus:outline-none ${
                isActive ? "text-yellow-500 font-semibold" : "text-slate-200 font-medium hover:text-white"
              }`
            }
          >
            Public law
          </NavLink>
          <NavLink 
            to="/stats" 
            className={({ isActive }) => 
              `text-sm transition-colors duration-200 focus:outline-none ${
                isActive ? "text-yellow-500 font-semibold" : "text-slate-200 font-medium hover:text-white"
              }`
            }
          >
            Stats
          </NavLink>
          <NavLink 
            to="/future" 
            className={({ isActive }) => 
              `text-sm transition-colors duration-200 focus:outline-none ${
                isActive ? "text-yellow-500 font-semibold" : "text-slate-200 font-medium hover:text-white"
              }`
            }
          >
            Future
          </NavLink>

          {/* Admin link — only visible to ADMIN role users */}
          {user?.role === 'ADMIN' && (
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `text-sm transition-colors duration-200 focus:outline-none flex items-center gap-1.5 ${
                  isActive ? "text-yellow-500 font-semibold" : "text-slate-200 font-medium hover:text-white"
                }`
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M2.5 3A1.5 1.5 0 001 4.5v4A1.5 1.5 0 002.5 10h6A1.5 1.5 0 0010 8.5v-4A1.5 1.5 0 008.5 3h-6zm11 2A1.5 1.5 0 0012 6.5v7a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0018 13.5v-7A1.5 1.5 0 0016.5 5h-3zm-10 7A1.5 1.5 0 002 13.5v1A1.5 1.5 0 003.5 16h6a1.5 1.5 0 001.5-1.5v-1A1.5 1.5 0 009.5 12h-6z" clipRule="evenodd" />
              </svg>
              Admin
            </NavLink>
          )}
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

        {/* Login & Dropdown Section */}
        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-sm font-medium text-slate-200 hover:text-white transition-colors duration-200 focus:outline-none"
            >
              My Ebraj
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-4 w-60 bg-white rounded-xl shadow-lg border border-gray-100 py-4 z-50">
                
                {/* Top Section */}
                <div className="px-4 mb-4 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-yellow-500 font-bold flex-shrink-0 text-sm">
                    {(user?.username || user?.fullName || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 leading-tight">{user?.username || 'User'}</span>
                    <IdentityBadge user={user} className="mt-1" />
                  </div>
                </div>

                {/* My Profile Button */}
                <div className="px-4 mb-4">
                  <button
                    onClick={() => { navigate('/profile'); setIsDropdownOpen(false); }}
                    className="w-full py-1.5 text-xs font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    My Profile
                  </button>
                </div>

                <div className="h-px bg-gray-100 w-full my-2"></div>

                {/* Middle Menu Items */}
                <div className="px-2 py-1 flex flex-col">
                  {/* Manage Sub-Accounts - Only for Main Ebrajers */}
                  {user?.verificationStatus === 'APPROVED' && !user?.parentId && (
                    <button 
                      onClick={() => { navigate('/sub-accounts'); setIsDropdownOpen(false); }}
                      className="text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors w-full font-medium"
                    >
                      Team & Family
                    </button>
                  )}
                  <button className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors w-full">
                    eWallet
                  </button>
                  <button className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors w-full">
                    eCode
                  </button>
                </div>

                <div className="h-px bg-gray-100 w-full my-2"></div>

                {/* Bottom Menu Items */}
                <div className="px-2 py-1 flex flex-col">
                  <button className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors w-full">
                    Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors w-full font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-slate-200 hover:text-white transition-colors duration-200 focus:outline-none"
          >
            Login
          </button>
        )}
      </div>

    </nav>
  );
};

export default Navbar;

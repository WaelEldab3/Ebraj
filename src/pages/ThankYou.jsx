import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useAuth';

const ThankYou = () => {
  const navigate = useNavigate();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout(null, {
      onSuccess: () => {
        navigate('/login', { replace: true });
      }
    });
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-6 text-center font-sans transition-all duration-500 animate-fade-in">
      <div className="max-w-xl w-full">
        
        {/* Success Icon / Branding Placeholder */}
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
          Thank you for your time
        </h1>
        
        <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-10">
          You have declined the access declaration and cannot proceed further. Your response has been recorded accurately.
        </p>

        <div className="pt-8 border-t border-gray-100 flex flex-col items-center gap-4">
          <p className="text-sm text-gray-400 mb-2 italic">You can safely close this window or sign out below</p>
          
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="px-10 py-3 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 flex items-center gap-2 group"
          >
            {isLoggingOut ? (
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            )}
            {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;

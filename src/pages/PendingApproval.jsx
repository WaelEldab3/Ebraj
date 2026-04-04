import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout, useUser } from '../hooks/useAuth';

const PendingApproval = () => {
  const { data: user } = useUser();
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
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-xl w-full border border-gray-100 shadow-sm p-8 sm:p-12 rounded-[32px]">
        
        {/* Status Icon */}
        <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-blue-900">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          Waiting for Admin Approval
        </h1>

        <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed mb-10">
          <p>
            Your secondary account (<strong className="font-semibold text-gray-900">{user?.username || user?.email}</strong>) has been successfully created and you have acknowledged the Ebraj Public Law.
          </p>
          <p>
            Before you can access the platform features, an authorized Ebraj administrator must review and approve your account.
          </p>
          <p className="bg-gray-50 border border-gray-200 py-3 px-4 rounded-sm text-sm font-medium text-gray-800">
            Current Status: PENDING REVIEW
          </p>
        </div>

        <div className="pt-6 border-t border-gray-200 flex flex-col items-center gap-3">
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

export default PendingApproval;

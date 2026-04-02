import React from 'react';
import { useLogout, useUser } from '../hooks/useAuth';

const PendingApproval = () => {
  const { data: user } = useUser();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-xl w-full bg-white p-8 sm:p-12 shadow-sm border border-gray-200 text-center">
        
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

        <div className="pt-6 border-t border-gray-200">
          <button
            onClick={() => logout()}
            disabled={isLoggingOut}
            className="w-full sm:w-auto px-8 py-3 bg-white text-gray-900 text-sm font-semibold border-2 border-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-60 cursor-pointer flex items-center justify-center mx-auto gap-2"
          >
            {isLoggingOut && (
              <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
            )}
            Sign Out
          </button>
        </div>

      </div>
    </div>
  );
};

export default PendingApproval;

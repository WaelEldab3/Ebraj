import React from 'react';
import { useNavigate } from 'react-router-dom';

const Agreement = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50 flex-shrink-0">
          <h1 className="text-2xl font-bold text-gray-800 text-center">Ebraj Access Declaration</h1>
        </div>
        
        {/* Scrollable Body Content */}
        <div className="px-8 py-8 overflow-y-auto flex-1 text-gray-600 text-base leading-relaxed space-y-5">
          <p>
            Welcome to EbrajGR. By accessing and using this platform, you acknowledge and agree to be bound by the following access declaration and terms of service. Please review this document carefully before proceeding. 
          </p>
          <p>
            This platform is strictly governed by public law and our organizational guidelines. Users are expected to maintain the highest standards of integrity. Unauthorized access, data scraping, or malicious activities will result in immediate termination of access and potential legal action.
          </p>
          <p>
            By clicking "I Agree", you consent to our data processing agreements, privacy policies, and the usage of cookies to enhance your experience. If you do not accept these fundamental terms, you must exit this application immediately.
          </p>
          <p>
            Furthermore, any intellectual property displayed on this site remains the exclusive property of EbrajGR. You may not reproduce, distribute, or transmit any part of this platform without prior written consent. Ensure you fully comprehend your responsibilities before submitting your agreement.
          </p>
        </div>

        {/* Footer with Buttons */}
        <div className="px-8 py-5 bg-gray-50 flex justify-end space-x-4 border-t border-gray-200 flex-shrink-0">
          <button 
            onClick={() => navigate('/thank-you')}
            className="px-6 py-2.5 text-sm font-medium bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            I Disagree
          </button>
          
          <button 
            onClick={() => navigate('/home')}
            className="px-6 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm focus:ring-offset-2"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default Agreement;

import React, { useState, useEffect } from 'react';

const AgreementModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // Revert back
    }
    return () => {
      document.body.style.overflow = 'auto'; // Clean up on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDisagree = () => {
    // Simple redirect since they disagreed to the terms
    window.location.href = "about:blank";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Ebraj Access Declaration</h2>
        </div>
        
        {/* Scrollable Body Content */}
        <div className="px-6 py-6 overflow-y-auto flex-1 text-gray-600 text-sm leading-relaxed space-y-4">
          <p>
            Welcome to EbrajGR. By accessing and using this platform, you acknowledge and agree to be bound by the following access declaration and terms of service. Please review this document carefully before proceeding. 
          </p>
          <p>
            This platform is strictly governed by public law and our organizational guidelines. Users are expected to maintain the highest standards of integrity. Unauthorized access, data scraping, or malicious activities will result in immediate termination of access and potential legal action.
          </p>
          <p>
            By clicking "I Agree", you consent to our data processing agreements, privacy policies, and the usage of cookies to enhance your experience. If you do not accept these fundamental terms, you must exit this application immediately.
          </p>
        </div>

        {/* Footer with Buttons */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 border-t border-gray-200">
          <button 
            onClick={handleDisagree}
            className="px-5 py-2.5 text-sm font-medium bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            I Disagree
          </button>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="px-5 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
          >
            I Agree
          </button>
        </div>

      </div>
    </div>
  );
};

export default AgreementModal;

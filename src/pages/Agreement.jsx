import React from 'react';
import { useNavigate } from 'react-router-dom';

const Agreement = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex-1 flex flex-col font-sans bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-12 w-full">
        
        {/* World Header Label - FAR LEFT */}
        <div className="w-full px-8 sm:px-12 mb-6">
          <div className="flex items-center space-x-2 text-gray-500 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
            <span className="text-sm tracking-widest uppercase">World</span>
          </div>
        </div>

        {/* Top Section */}
        <div className="w-full max-w-3xl mb-10 px-4">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">White Paper</h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Please read our access declaration thoroughly to understand the terms, conditions, and strictly governed policies regarding your usage of this platform.
            </p>
          </div>
        </div>

        {/* Agreement Card (MAIN PART) */}
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden flex flex-col mx-4 sm:mx-0 mb-12">
          
          {/* Card Header */}
          <div className="pt-8 pb-4 px-8 sm:px-10 border-b border-gray-100 flex-shrink-0">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Ebraj Access Declaration</h2>
          </div>
          
          {/* Card Body - NOT Scrollable */}
          <div className="p-8 sm:px-10 text-gray-600 text-sm sm:text-base leading-relaxed space-y-5">
            <p>
              By clicking I Agree below you confirm and acknowledge the following
            </p>
            <p>
              Your access to and use of the Ebraj Website and its related platforms is undertaken voluntarily and within the structured framework of the Website and its approved Terms
            </p>
            <p>
              You expressly agree that your use of the Website or any of its services or content does not grant you any right to initiate a lawsuit or submit a legal claim against Ebraj Company or any related entity
            </p>
            <p>
              The relationship between you and the Company is governed exclusively by the approved Terms of Use
            </p>
            <p>
              In the event of any concern or difference related to the use of the Website you agree to contact the Company to address the matter within the structured framework of the Website before taking any further action
            </p>
            <p>
              Your continued use of the Website constitutes clear acceptance of this framework
            </p>
            <p className="font-semibold text-gray-800">
              Terms of use
            </p>
            <p>
              If you do not agree with the above please click I Disagree to leave the Website
            </p>
          </div>

          {/* Card Footer */}
          <div className="p-6 sm:px-10 sm:py-8 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 flex-shrink-0">
            <button 
              onClick={() => navigate('/thank-you')}
              className="w-full sm:w-auto px-8 py-3 text-sm font-semibold bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              I Disagree
            </button>
            
            <button 
              onClick={() => navigate('/home')}
              className="w-full sm:w-auto px-8 py-3 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              I Agree
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Agreement;

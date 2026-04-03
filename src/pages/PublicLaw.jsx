import React, { useState } from 'react';
import { publicLawSections } from '../constants/rulesData';
import { policiesSections } from '../constants/policiesData';
import { conditionsSections } from '../constants/conditionsData';
import { recommendationsSections } from '../constants/recommendationsData';
import FaqSection from '../components/FaqSection';

const PublicLaw = () => {
  const [activeTab, setActiveTab] = useState('rules');

  const tabs = [
    { id: 'rules', label: 'Rules' },
    { id: 'policies', label: 'Policies' },
    { id: 'conditions', label: 'Conditions' },
    { id: 'recommendations', label: 'Recommendations' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'rules':
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Rules</h2>
            <p className="text-gray-600 leading-relaxed">
              
The white paper of Ebraj Company is an official document that outlines its vision, operating mechanism, and economic model based on sustainability, transparency, and social solidarity.

            </p>
            
            <div className="flex flex-col w-full pb-8">
              {publicLawSections.map((section) => (
                <FaqSection 
                  key={section.id} 
                  title={section.title} 
                  questions={section.questions} 
                />
              ))}
            </div>

          </div>
        );
      case 'policies':
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Policies</h2>
            <p className="text-gray-600 leading-relaxed">
              The white paper of Ebraj Company is an official document that outlines its vision, operating mechanism, and economic model based on sustainability, transparency, and social solidarity.

            </p>
            
            <div className="flex flex-col w-full pb-8">
              {policiesSections.map((section) => (
                <FaqSection 
                  key={section.id} 
                  title={section.title} 
                  questions={section.questions} 
                />
              ))}
            </div>

          </div>
        );
      case 'conditions':
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Rules</h2>
            <p className="text-gray-600 leading-relaxed">
              The white paper of Ebraj Company is an official document that outlines its vision, operating mechanism, and economic model based on sustainability, transparency, and social solidarity.

            </p>

            <div className="flex flex-col w-full pb-8 mt-6">
              {conditionsSections.map((section) => (
                <FaqSection 
                  key={section.id} 
                  title={section.title} 
                  questions={section.questions} 
                />
              ))}
            </div>

          </div>
        );
      case 'recommendations':
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Recommendations</h2>
            <p className="text-gray-600 leading-relaxed">
             The white paper of Ebraj Company is an official document that outlines its vision, operating mechanism, and economic model based on sustainability, transparency, and social solidarity
            </p>

            <div className="flex flex-col w-full pb-8 mt-6">
              {recommendationsSections.map((section) => (
                <FaqSection 
                  key={section.id} 
                  title={section.title} 
                  questions={section.questions} 
                />
              ))}
            </div>
            
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col font-sans bg-gray-50 min-h-screen">
      <main className="flex-1 flex flex-col py-10 w-full">
        
        {/* Top Section */}
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 mb-10 relative">
          
          {/* World Header Label - FAR LEFT */}
          <div className="sm:absolute left-4 sm:left-8 top-0 mb-6 sm:mb-0 flex justify-center sm:justify-start">
            <div className="flex items-center space-x-2 text-gray-500 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <span className="text-sm tracking-widest uppercase">World</span>
            </div>
          </div>

          {/* Center Title */}
          <div className="text-center sm:pt-2">
            <h1 className="text-3xl sm:text-2xl font-extrabold text-gray-900 tracking-tight mb-4">
              Public law
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Read through our comprehensive public law documentation to understand the established frameworks 
              and community guidelines associated with the Ebraj platform.
            </p>
          </div>
        </div>

        {/* Tabs Container */}
        <div className="w-full border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 flex justify-center space-x-6 sm:space-x-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm sm:text-base font-semibold transition-colors focus:outline-none relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {/* Active Underline */}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-900 rounded-t-md"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-12 min-h-[250px] flex flex-col justify-center">
            {renderContent()}
          </div>
        </div>

      </main>
    </div>
  );
};

export default PublicLaw;
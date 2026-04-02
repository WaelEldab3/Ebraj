import React, { useState } from 'react';

const FaqSection = ({ title, questions }) => {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="mt-8 w-full font-sans max-w-[800px] mx-auto">
      {/* Title/Header bar */}
      <div className="bg-[#B4B4B4] px-4 py-2 mb-2 w-full">
        <h3 className="text-[13px] font-semibold text-gray-800">
          {title}
        </h3>
      </div>

      {/* Multiple Question Items Stacked Vertically with gaps */}
      <div className="flex flex-col space-y-2">
        {questions.map((faq) => {
          const isOpen = openId === faq.id;
          
          return (
            <div 
              key={faq.id}
              className="border border-[#D1D1D1] rounded-[3px] bg-white overflow-hidden"
            >
              <div 
                onClick={() => toggleAccordion(faq.id)}
                className="w-full flex justify-between items-center px-4 py-[13px] cursor-pointer select-none"
              >
                <div className="text-[14px] text-[#4A4A4A]">
                  {faq.question}
                </div>
                
                <div className={`flex-shrink-0 text-[#6B6B6B] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                  {/* Solid Caret Down Icon */}
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M5 8l7 8 7-8H5z" />
                  </svg>
                </div>
              </div>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-48' : 'max-h-0'
                }`}
              >
                <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqSection;

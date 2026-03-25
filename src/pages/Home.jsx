import React from 'react';
import image1 from "../assets/home/image1.png";
import image2 from "../assets/home/image2.png";
import image3 from "../assets/home/image3.png";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Top Section */}
      <div className="relative flex items-center justify-between mb-16">
        {/* Left: Icon + Text */}
        <div className="flex items-center gap-2">
          {/* A simple inline SVG placeholder for "World" icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-6 h-6 text-gray-700" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium text-gray-800">World</span>
        </div>

        {/* Center: Title and Subtitle */}
        <div className="absolute left-1/2 flex flex-col items-center pointer-events-none" style={{ transform: "translateX(-50%)" }}>
          <h1 className="text-3xl font-bold text-gray-900 pointer-events-auto">Ebraj Company</h1>
          <p className="text-sm text-gray-600 mt-2 text-center pointer-events-auto">
            Providing modern solutions and empowering futuristic goals globally.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="border border-gray-200 rounded-xl bg-gray-50 p-8 md:p-12 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Row 1 */}
          <div className="flex flex-col items-start justify-center order-2 md:order-1">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Ebraj Company</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
             Is an assets fund called (eBox).
             The main goal of this fund is to serve as a source of financing for the Sustainable Social Solidarity System program,
             referred to hereafter as (4S).
             The main objective for that (4S) program is to provide a partial support for individuals’ basic life needs, free of charge.
             Read more
            </p>
            
          </div>
          <div className="order-1 md:order-2">
            <img 
              src={image1} 
              alt="Ebraj Company overview" 
              className="w-full h-auto object-cover rounded-md shadow-md aspect-video"
            />
          </div>

          {/* Row 2 */}
          <div className="order-3">
            <img 
              src={image2} 
              alt="Reasons for establishing" 
              className="w-full h-auto object-cover rounded-md shadow-md aspect-video"
            />
          </div>
          <div className="flex flex-col items-start justify-center order-4">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Reasons for Establishing the Program</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              We foresee future risks threatening the stability of the labor market, where a large number of individuals are expected to lose their jobs.
With the absence of clear strategies to address these challenges and the continuous growth in the number of affected individuals, failing to develop a solution based on a sustainable and stable source could lead to threats to social and global security and peace.
Therefore, we had to design a program aimed to offer practical solutions for enhancing the stability of individuals and communities in the long term.
            </p>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col items-start justify-center order-6 md:order-5">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">How the Program Operates</h2>
            <div className="text-sm text-gray-600 mb-6 space-y-2">
              <p className="mb-2">The (4S) program operates through the provision of a digital wallet containing a balance of assets from the (eBox) fund.</p>
              <p className='mb-2'>This wallet is granted to individuals free of charge after creating a verified account with Ebraj Company.</p> 
              <p className='mb-2'>The provided balance to distributed as follows:</p>
              <ol className="list-decimal list-inside space-y-1 ml-1 pl-2">
                <li>A portion allocated for housing.</li>
                <li>A portion allocated for food.</li>
                <li>A portion allocated for healthcare.</li>
                <li>A portion allocated for transportation.</li>
                <li>An optional portion.</li>
                <li>A portion allocated for investment (used as one of the mechanisms to recharge the wallet)</li>
                <li>A portion allocated for savings.</li>
              </ol>
            </div>
          </div>
          <div className="order-5 md:order-6">
            <img 
              src={image3} 
              alt="How the program operates" 
              className="w-full h-auto object-cover rounded-md shadow-md aspect-video"
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;

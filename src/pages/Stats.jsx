import React from 'react';

const Stats = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Ebraj Statistics
        </h1>
        <div className="h-1 w-24 bg-slate-900 mx-auto rounded"></div>
        <p className="text-lg md:text-xl text-slate-600 font-medium uppercase tracking-widest mt-8">
          Coming Soon
        </p>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          We are building the definitive dashboard for the Ebraj network. Check back soon for comprehensive data and insights.
        </p>
      </div>
    </div>
  );
};

export default Stats;

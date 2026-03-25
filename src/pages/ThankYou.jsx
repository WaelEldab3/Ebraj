import React from 'react';

const ThankYou = () => {
  return (
    <div className="flex-1 w-full bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-slate-800 p-10 rounded-xl shadow-xl max-w-lg border border-slate-700">
        <h1 className="text-4xl font-bold text-white mb-6">Thank you for your time</h1>
        <p className="text-slate-400 text-lg">
          You have declined the access declaration and cannot proceed. You can safely close this window.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;

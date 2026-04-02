import React from 'react';

const LegalDocument = ({ title, subtitle, sections, children }) => {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-yellow-900/20">

      {/* ── Header Bar ── */}
      <div className="bg-[#0a0f1e] px-8 py-6 flex items-center justify-between border-b border-yellow-500/20">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/30 flex-shrink-0">
            <span className="text-[#0a0f1e] font-black text-lg">E</span>
          </div>
          <div>
            <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-[0.2em]">Ebraj Unified Identity System</p>
            <h1 className="text-white font-bold text-lg leading-tight">{title}</h1>
            {subtitle && <p className="text-white/40 text-xs mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-1">
          <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Official Document</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-yellow-400/70 text-[10px] font-bold uppercase tracking-wider">In Force</span>
          </div>
        </div>
      </div>

      {/* ── Document Body ── */}
      <div className="bg-white">
        {/* Official notice strip */}
        <div className="bg-blue-950/5 border-b border-blue-900/10 px-8 py-3 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-800 flex-shrink-0">
            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-blue-900 font-semibold">
            This is an official and legally-binding Ebraj Company document. Reading and acceptance is mandatory for all platform users.
          </p>
        </div>

        <div className="px-8 sm:px-12 py-10 space-y-8">
          {sections && sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-[#0a0f1e] font-black text-[10px]">{idx + 1}</span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{section.title}</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed pl-9">{section.body}</p>
            </div>
          ))}

          {/* Children slot — for action buttons */}
          {children && (
            <div className="pt-6 border-t border-gray-100">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="bg-[#0a0f1e] px-8 py-3 flex items-center justify-between">
        <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">© 2026 Ebraj Company</span>
        <span className="text-yellow-500/50 text-[10px] font-bold uppercase tracking-widest">Version 1.0.4 — All Rights Reserved</span>
      </div>
    </div>
  );
};

export default LegalDocument;

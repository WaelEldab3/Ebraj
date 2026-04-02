import React from 'react';
import logo from '../../assets/Ebraj logo/logo.png';

const IdentityBadge = ({ user, className = '' }) => {
  if (!user) return null;

  if (user.parentId) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold tracking-wider ${className}`}>
        SECONDARY ACCOUNT
      </span>
    );
  }

  if (user.verificationStatus === 'APPROVED') {
    return (
      <span className={`inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-[10px] font-bold tracking-wider ${className}`}>
        <img src={logo} alt="Ebraj" className="w-3.5 h-3.5 object-contain" />
        EBRAJER
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold tracking-wider ${className}`}>
      <div className="relative w-3.5 h-3.5 flex-shrink-0 flex items-center justify-center">
        <img src={logo} alt="Ebraj" className="w-full h-full object-contain" />
        <div className="absolute w-[130%] h-[1.5px] bg-red-600 -rotate-45 rounded-full"></div>
      </div>
      NON EBRAJER
    </span>
  );
};

export default IdentityBadge;

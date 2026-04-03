import React from 'react';
import logo from '../../assets/Ebraj logo/logo.png';

const IdentityBadge = ({ user, className = '' }) => {
  if (!user) return null;

  if (user.verificationStatus === 'APPROVED') {
    return (
      <span className={`inline-flex items-center gap-2.5 text-yellow-700 text-[10px] font-bold tracking-wider ${className}`}>
        <img src={logo} alt="Ebraj" className="w-6 h-6 object-contain" />
        EBRAJER
      </span>
    );
  }

  if (user.parentId) {
    return (
      <span className={`inline-flex items-center gap-1.5 text-blue-700 text-[10px] font-bold tracking-wider ${className}`}>
        SECONDARY ACCOUNT
      </span>
    );
  }

    return (
      <span className={`inline-flex items-center gap-2.5 text-slate-700 text-[10px] font-bold tracking-wider ${className}`}>
        <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
          <img src={logo} alt="Ebraj" className="w-full h-full object-contain" />
          <div className="absolute w-[140%] h-[2px] bg-red-600 -rotate-45 rounded-full"></div>
        </div>
        NON EBRAJER
      </span>
    );
};

export default IdentityBadge;

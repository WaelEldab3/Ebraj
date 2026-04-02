import React, { useState } from 'react';
import { useUser, useRequestVerification } from '../hooks/useAuth';
import logo from '../assets/Ebraj logo/logo.png';
import IdentityBadge from '../components/ui/IdentityBadge';

// ── Identity helper ──────────────────────────────────────────────────────────
const getIdentity = (user) => ({
  isEbrajer: user?.verificationStatus === 'APPROVED' && !user?.parentId,
  isSecondary: !!user?.parentId,
  label:     user?.parentId ? 'Secondary Account' : (user?.verificationStatus === 'APPROVED' ? 'Ebrajer' : 'None-Ebrajer'),
});

const getIdentityLevel = (user) => {
  if (user?.parentId) return { level: 3, name: 'Managed Account', score: 100 };
  const status = user?.verificationStatus;
  const levels = {
    APPROVED:      { level: 3, name: 'Verified Identity',  score: 100 },
    PENDING_REVIEW:{ level: 2, name: 'Under Review',       score: 50  },
    UNVERIFIED:    { level: 1, name: 'Unverified',         score: 15  },
    REJECTED:      { level: 0, name: 'Rejected',           score: 0   },
  };
  return levels[status] ?? levels.UNVERIFIED;
};

// ── Sub-components ────────────────────────────────────────────────────────────
const ProfileField = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">{label}</span>
    <span className="text-sm font-medium text-slate-800">{value || '—'}</span>
  </div>
);

const TrustBar = ({ score }) => (
  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
    <div
      className={`h-2 rounded-full transition-all duration-700 ${
        score === 100 ? 'bg-gradient-to-r from-amber-400 to-yellow-500' :
        score >= 50  ? 'bg-gradient-to-r from-blue-400 to-cyan-400' :
                       'bg-slate-300'
      }`}
      style={{ width: `${score}%` }}
    />
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const Profile = () => {
  const { data: user, isLoading } = useUser();
  const { isEbrajer, isSecondary, label } = getIdentity(user);
  const identity = getIdentityLevel(user);
  const { mutate: requestVerification, isPending: isRequesting } = useRequestVerification();
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRequestVerification = () => {
    requestVerification(null, {
      onSuccess: () => showToast('Verification request sent successfully!'),
      onError: (error) => showToast(error?.response?.data?.message || 'Failed to send request', 'error'),
    });
  };

  const initials = (user?.username || user?.fullName || 'U')
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const activationDate = user?.updatedAt && isEbrajer
    ? new Date(user.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-8">
      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-sm font-semibold transition-all animate-fade-in ${
          toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'
        }`}>
          {toast.message}
        </div>
      )}
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ── Page title ── */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Identity</h1>
          <p className="text-sm text-slate-400 mt-0.5">Your official Ebraj digital profile</p>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            EBRAJ IDENTITY CARD
        ════════════════════════════════════════════════════════════════════ */}
        <div className={`relative overflow-hidden rounded-3xl shadow-xl border ${
          isEbrajer
            ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 border-yellow-500/30'
            : isSecondary
            ? 'bg-gradient-to-br from-slate-900 to-blue-900 border-blue-500/30'
            : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700'
        }`}>

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white transform -translate-x-1/2 translate-y-1/2" />
          </div>

          {/* Gold shimmer strip for approved */}
          {isEbrajer && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          )}

          <div className="relative p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row gap-8 items-start">

              {/* Left — Avatar + status */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                {/* Avatar */}
                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold flex-shrink-0 shadow-lg ${
                  isEbrajer
                    ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-900'
                    : isSecondary
                    ? 'bg-gradient-to-br from-blue-400 to-indigo-500 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}>
                  {initials}
                </div>

                {/* Identity badge beneath avatar */}
                <div className="flex flex-col items-center gap-1">
                  <IdentityBadge 
                    user={user} 
                    className="shadow px-4 py-1.5" 
                  />
                  {isEbrajer ? (
                    <span className="text-[10px] text-yellow-400/70 font-medium tracking-wider mt-1 uppercase">Verified Identity</span>
                  ) : isSecondary ? (
                    <span className="text-[10px] text-blue-400 font-medium tracking-wider mt-1 uppercase">Managed Account</span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-semibold tracking-widest mt-1 uppercase">
                      {user?.verificationStatus === 'PENDING_REVIEW' ? 'Reviewing' : 'None-Ebrajer'}
                    </span>
                  )}
                </div>

                {/* Verification Request Action */}
                {!isEbrajer && !isSecondary && user?.verificationStatus === 'UNVERIFIED' && (
                  <button
                    onClick={handleRequestVerification}
                    disabled={isRequesting}
                    className="mt-2 text-[10px] font-bold text-blue-400 hover:text-blue-300 underline underline-offset-4 tracking-widest uppercase transition-colors disabled:opacity-50"
                  >
                    {isRequesting ? 'Sending...' : 'Request Verification'}
                  </button>
                )}

                {user?.verificationStatus === 'PENDING_REVIEW' && (
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-amber-500 tracking-widest uppercase animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Pending Approval
                  </div>
                )}
              </div>

              {/* Right — Info */}
              <div className="flex-1 space-y-6">

                {/* Name row */}
                <div>
                  <h2 className="text-2xl font-bold text-white leading-tight">{user?.fullName || user?.username}</h2>
                  {user?.username && user?.fullName && (
                    <p className="text-slate-400 text-sm mt-0.5">@{user.username}</p>
                  )}
                </div>

                {/* Fields grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-0.5">Email</p>
                    <p className="text-sm text-slate-300">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-0.5">Phone</p>
                    <p className="text-sm text-slate-300">{user?.phone || '—'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-0.5">Role</p>
                    <p className="text-sm text-slate-300">{user?.role}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-0.5">Member Since</p>
                    <p className="text-sm text-slate-300">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                    </p>
                  </div>

                  {/* Activation date — only shown when approved */}
                  {activationDate && (
                    <div className="col-span-2 pt-1 border-t border-slate-700/60">
                      <p className="text-[10px] font-semibold text-yellow-500/80 uppercase tracking-widest mb-0.5">Ebraj Activation Date</p>
                      <p className="text-sm text-yellow-400 font-semibold">{activationDate}</p>
                    </div>
                  )}
                </div>

                {/* Trust Score */}
                <div className="pt-2 border-t border-slate-700/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                      {isSecondary ? 'Identity Trust' : 'Trust Score'}
                    </span>
                    <span className={`text-xs font-bold ${isEbrajer ? 'text-yellow-400' : isSecondary ? 'text-blue-400' : 'text-slate-400'}`}>
                      {identity.score}/100 — {isSecondary ? `Managed by ${user?.parent?.fullName || 'Ebrajer'}` : identity.name}
                    </span>
                  </div>
                  <TrustBar score={identity.score} />
                </div>
              </div>
            </div>

            {/* Card footer — ID */}
            <div className="mt-8 pt-4 border-t border-slate-700/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Ebraj" className="h-5 opacity-60" />
                <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">Ebraj Digital Identity</span>
              </div>
              <span className="text-[10px] text-slate-600 font-mono">ID-{String(user?.id).padStart(6, '0')}</span>
            </div>
          </div>
        </div>

        {/* ── Profile details card ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-5">Profile Details</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <ProfileField label="Username"      value={user?.username} />
            <ProfileField label="Full Name"     value={user?.fullName} />
            <ProfileField label="Preferred Name" value={user?.preferredName} />
            <ProfileField label="Email"         value={user?.email} />
            <ProfileField label="Phone"         value={user?.phone} />
            <ProfileField label="Role"          value={user?.role} />
            <ProfileField label="Identity Level" value={`Level ${identity.level} — ${identity.name}`} />
            <ProfileField
              label="Last Login"
              value={user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString('en-GB') : 'N/A'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

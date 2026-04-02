import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLawResponse, useLogout } from '../hooks/useAuth';

const PUBLIC_LAW_CONTENT = `The white paper of Ebraj Company is an official document that serves as a comprehensive guide to our Unified Identity and Financial System.

It details the technical specifications, organizational structure, and legal framework that govern the operations of Ebraj. By participating in this ecosystem, every user and entity agrees to adhere to the core principles of transparency, security, and mutual trust.`;

const LAW_SECTIONS = [
  {
    title: 'SECTION 1 — RULES',
    body: 'The fundamental code of conduct for all Ebraj members. Every user must maintain the integrity of their digital identity and may not attempt to impersonate, duplicate, or misrepresent their account status within the platform.',
  },
  {
    title: 'SECTION 2 — POLICIES',
    body: 'Operational guidelines for all financial and data interactions within the Ebraj ecosystem. All transactions are immutable and subject to platform-level auditing. Users consent to data processing necessary for identity verification.',
  },
  {
    title: 'SECTION 3 — CONDITIONS',
    body: 'Specific criteria for account eligibility and verification. A verified "Ebrajer" is a user whose identity has been reviewed and approved by an authorized Ebraj administrator. Secondary accounts operate under the guarantee of their parent Ebrajer.',
  },
  {
    title: 'SECTION 4 — RECOMMENDATIONS',
    body: 'Best practices for platform security and system optimization. Users are strongly encouraged to enable multi-factor authentication, use secure passphrases, and review their account activity regularly.',
  },
  {
    title: 'ARTICLE 5 — ACCEPTANCE & ENFORCEMENT',
    body: 'Acceptance of this Public Law is mandatory for all users wishing to access Ebraj platform features. Failure to comply with these terms may result in account suspension or permanent deactivation at the discretion of Ebraj administrators.',
  },
];

const PublicLaw = () => {
  const navigate = useNavigate();
  const { mutate: lawResponse, isPending } = useLawResponse();
  const { mutate: logout } = useLogout();
  const [activeAction, setActiveAction] = useState(null); // 'AGREE' | 'REJECT'
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);

  const handleAgree = () => {
    setActiveAction('AGREE');
    lawResponse('AGREE', {
      onSuccess: () => {
        navigate('/verify-account');
      },
    });
  };

  const handleConfirmReject = () => {
    setShowRejectConfirm(false);
    setActiveAction('REJECT');
    lawResponse('REJECT', {
      onSuccess: () => {
        logout(null, {
          onSuccess: () => {
            navigate('/login?rejected=true', { replace: true });
          },
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center justify-center font-sans">
      
      <div className="w-full max-w-3xl bg-white p-8 sm:p-12 shadow-sm border border-gray-200">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Public Law</h1>
        </div>

        {/* Intro */}
        <div className="mb-10 text-gray-800 text-sm sm:text-base leading-relaxed space-y-4">
          <p>The white paper of Ebraj Company is an official document that serves as a comprehensive guide to our Unified Identity and Financial System.</p>
          <p>It details the technical specifications, organizational structure, and legal framework that govern the operations of Ebraj. By participating in this ecosystem, every user and entity agrees to adhere to the core principles of transparency, security, and mutual trust.</p>
        </div>

        {/* Document Sections */}
        <div className="space-y-8 mb-12">
          {LAW_SECTIONS.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-base font-bold text-gray-900 uppercase tracking-widest">{section.title}</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>

        {/* Selection / Action Buttons */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            
            {/* Agree Button */}
            <button
              id="btn-agree-public-law"
              onClick={handleAgree}
              disabled={isPending}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-900 text-white text-sm font-semibold hover:bg-blue-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2 rounded-sm"
            >
              {isPending && activeAction === 'AGREE' && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              I Agree and Accept the Public Law
            </button>

            {/* Decline Button */}
            <button
              id="btn-reject-public-law"
              onClick={() => setShowRejectConfirm(true)}
              disabled={isPending}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-gray-900 text-sm font-semibold border-2 border-gray-900 hover:bg-gray-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2 rounded-sm"
            >
              {isPending && activeAction === 'REJECT' && (
                <span className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              )}
              I Do Not Agree
            </button>

          </div>
        </div>
      </div>

      {/* Rejection Confirmation Modal (kept minimalist) */}
      {showRejectConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-8 text-center border border-gray-200 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Decline Public Law?</h2>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              Acceptance of the Ebraj Public Law is mandatory to use our services. Declining will sign you out immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowRejectConfirm(false)}
                className="flex-1 px-5 py-3 bg-gray-100 text-gray-900 text-sm font-bold hover:bg-gray-200 transition-colors cursor-pointer rounded-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                disabled={isPending}
                className="flex-1 px-5 py-3 bg-rose-700 text-white text-sm font-bold hover:bg-rose-800 transition-colors disabled:opacity-60 cursor-pointer rounded-sm"
              >
                {isPending && activeAction === 'REJECT' ? 'Signing out...' : 'Decline & Sign Out'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicLaw;

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminService from '../../services/adminService';

// ── Status badge colours ────────────────────────────────────────────────────
const STATUS_STYLES = {
  APPROVED:      'bg-emerald-100 text-emerald-700 border border-emerald-200',
  REJECTED:      'bg-red-100    text-red-700     border border-red-200',
  PENDING_REVIEW:'bg-amber-100  text-amber-700   border border-amber-200',
  UNVERIFIED:    'bg-gray-100   text-gray-600    border border-gray-200',
};

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${STATUS_STYLES[status] ?? STATUS_STYLES.UNVERIFIED}`}>
    {status.replace('_', ' ')}
  </span>
);

// ── Role badge ───────────────────────────────────────────────────────────────
const ROLE_STYLES = {
  ADMIN:             'bg-purple-100 text-purple-700',
  INVESTOR:          'bg-blue-100   text-blue-700',
  PROJECT_PRESENTER: 'bg-cyan-100   text-cyan-700',
  USER:              'bg-slate-100  text-slate-600',
};

const RoleBadge = ({ role }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${ROLE_STYLES[role] ?? ROLE_STYLES.USER}`}>
    {role}
  </span>
);

// ── Law status badge ─────────────────────────────────────────────────────────
const LawBadge = ({ agreedToLaw, rejectionNote }) => {
  if (agreedToLaw) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Agreed
      </span>
    );
  }
  if (rejectionNote) {
    return (
      <span
        title={rejectionNote}
        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200 cursor-help"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
          <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        Rejected
      </span>
    );
  }
  return (
    <span className="text-xs text-slate-300 italic">Pending</span>
  );
};

// ── Main page ────────────────────────────────────────────────────────────────
const UserVerification = () => {
  const queryClient = useQueryClient();
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: adminService.getAllUsers,
  });

  const { mutate: updateStatus, isPending: isUpdating, variables } = useMutation({
    mutationFn: adminService.updateVerificationStatus,
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      if (vars.status === 'APPROVED') {
        showToast('✦ User is now an official Ebrajer!');
      } else {
        showToast('User has been rejected.', 'error');
      }
    },
  });

  const handleAction = (userId, status) => updateStatus({ userId, status });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
          <p className="text-slate-500 text-sm font-medium">Loading users…</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-red-500 font-semibold text-lg mb-1">Failed to load users</p>
          <p className="text-slate-400 text-sm">Ensure you are logged in as an Admin.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-8">
      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-sm font-semibold transition-all animate-bounce-once ${
          toast.type === 'error'
            ? 'bg-red-600 text-white'
            : 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900'
        }`}>
          {toast.type === 'error' ? '✕' : '✦'} {toast.message}
        </div>
      )}
      {/* ── Page header ── */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          User Verification
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Review and manage identity verification status for all registered users.
        </p>
      </div>

      {/* ── Stats strip ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Users',    value: users.length,                                        colour: 'text-slate-800' },
          { label: 'Approved',       value: users.filter(u => u.verificationStatus === 'APPROVED').length,       colour: 'text-emerald-600' },
          { label: 'Pending Review', value: users.filter(u => u.verificationStatus === 'PENDING_REVIEW').length, colour: 'text-amber-600' },
          { label: 'Unverified',     value: users.filter(u => u.verificationStatus === 'UNVERIFIED').length,     colour: 'text-slate-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 px-5 py-4 shadow-sm">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.colour}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ── Table card ── */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['ID', 'User', 'Email', 'Role', 'Identity Status', 'Law Status', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(user => {
                const isThisRowUpdating = isUpdating && variables?.userId === user.id;
                const canAct = user.verificationStatus !== 'APPROVED';

                return (
                  <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* ID */}
                    <td className="px-5 py-4 text-slate-400 font-mono text-xs">#{user.id}</td>

                    {/* User */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-blue-800 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {(user.username || user.fullName || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 leading-tight">
                            {user.username ?? '—'}
                            {user.parentId && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700 uppercase tracking-widest" title={`Created by Main Ebrajer #${user.parentId}`}>
                                Sub-account #{user.parentId}
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-slate-400">{user.fullName}</p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4 text-slate-600">{user.email}</td>

                    {/* Role */}
                    <td className="px-5 py-4"><RoleBadge role={user.role} /></td>

                    {/* Identity Status */}
                    <td className="px-5 py-4"><StatusBadge status={user.verificationStatus} /></td>

                    {/* Law Status */}
                    <td className="px-5 py-4">
                      <LawBadge agreedToLaw={user.agreedToLaw} rejectionNote={user.rejectionNote} />
                    </td>

                    {/* Joined */}
                    <td className="px-5 py-4 text-slate-400 text-xs whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      {canAct ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAction(user.id, 'APPROVED')}
                            disabled={isThisRowUpdating}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-50 transition-colors"
                          >
                            {isThisRowUpdating && variables?.status === 'APPROVED' ? (
                              <span className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            Approve
                          </button>

                          <button
                            onClick={() => handleAction(user.id, 'REJECTED')}
                            disabled={isThisRowUpdating}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {isThisRowUpdating && variables?.status === 'REJECTED' ? (
                              <span className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            )}
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-300 italic">No action needed</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {users.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center text-slate-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserVerification;

import React, { useState } from 'react';
import { useSubAccounts, useCreateSubAccount } from '../hooks/useAuth';
import IdentityBadge from '../components/ui/IdentityBadge';

const SubAccounts = () => {
  const { data: subAccounts = [], isLoading, isError } = useSubAccounts();
  const { mutate: createSubAccount, isPending: isCreating } = useCreateSubAccount();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const getStatusStyles = (status) => {
    switch (status) {
      case 'APPROVED':
        return {
          label: 'APPROVED',
          container: 'text-emerald-600 bg-emerald-50 border-emerald-100',
          dot: 'bg-emerald-500'
        };
      case 'REJECTED':
        return {
          label: 'REJECTED',
          container: 'text-rose-600 bg-rose-50 border-rose-100',
          dot: 'bg-rose-500'
        };
      case 'PENDING_REVIEW':
      case 'UNVERIFIED':
      default:
        return {
          label: 'PENDING',
          container: 'text-amber-600 bg-amber-50 border-amber-100',
          dot: 'bg-amber-500'
        };
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    createSubAccount(formData, {
      onSuccess: (data) => {
        setSuccess(data?.message || 'Sub-account created successfully');
        setFormData({ username: '', email: '', password: '', fullName: '' });
        // Close modal after a short delay to let user read the success state
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess('');
        }, 3000);
      },
      onError: (err) => {
        setError(err?.response?.data?.message || 'Failed to create sub-account');
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Success Toast */}
        {success && !isModalOpen && (
          <div className="mb-6 animate-fade-in-down">
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-md">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4.13-5.68z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium">{success}</p>
              <button onClick={() => setSuccess('')} className="ml-auto text-emerald-400 hover:text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Family & Team Accounts</h1>
            <p className="text-sm text-slate-500 mt-1">Manage and provision secondary accounts under your authority.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Add New Member
          </button>
        </div>

        {/* Stats card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 flex items-center gap-6 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xl">
            {subAccounts.length}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Managed Accounts</p>
            <p className="text-xs text-slate-400">Total sub-accounts currently under your Ebrajer identity.</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600 uppercase tracking-wider text-xs">Name</th>
                <th className="px-6 py-4 font-semibold text-slate-600 uppercase tracking-wider text-xs">Email</th>
                <th className="px-6 py-4 font-semibold text-slate-600 uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-600 uppercase tracking-wider text-xs">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subAccounts.map((account) => {
                const styles = getStatusStyles(account.verificationStatus);
                return (
                  <tr key={account.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm uppercase flex-shrink-0 shadow-sm border border-slate-200/50">
                          {account.fullName[0]}
                        </div>
                        {/* Name & Badge Stack */}
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-slate-800 tracking-tight">{account.fullName}</span>
                            <IdentityBadge user={account} className="transform scale-90 origin-left" />
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">@{account.username}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{account.email}</td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${styles.container} font-semibold text-[10px] tracking-wide`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                        {styles.label}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {new Date(account.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                );
              })}
              {subAccounts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic font-medium">
                    No secondary accounts created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative overflow-hidden animate-fade-in-up">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Create Sub-Account</h2>
            <p className="text-sm text-slate-400 mb-6">Create a verified member account managed by you.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1.5 ml-1">Full Name</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-sm"
                  placeholder="e.g. John Jr. Doe"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1.5 ml-1">Username</label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-sm font-mono"
                  placeholder="john_jr"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1.5 ml-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-sm"
                  placeholder="john.jr@example.com"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1.5 ml-1">Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-sm"
                  placeholder="Minimum 6 characters"
                />
              </div>

              {error && <p className="text-red-500 text-xs font-medium ml-1">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-slate-600 font-semibold text-sm hover:bg-slate-50 border border-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-slate-900/20"
                >
                  {isCreating ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubAccounts;

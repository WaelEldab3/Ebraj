import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useUser } from './hooks/useAuth';

import Agreement from './pages/Agreement';
import Home from './pages/Home';
import ThankYou from './pages/ThankYou';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicLaw from './pages/PublicLaw';
import Profile from './pages/Profile';
import UserVerification from './pages/admin/UserVerification';
import SubAccounts from './pages/SubAccounts';
import VerifyAccount from './pages/VerifyAccount';
import PendingApproval from './pages/PendingApproval';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import MainLayout from './layouts/MainLayout';
import Stats from './pages/Stats';
import Future from './pages/Future';

// ─────────────────────────────────────────────────────────────────────────────
// ProtectedRoute: Requires auth + Law Agreement
// ─────────────────────────────────────────────────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const { data: user, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Loading…</p>
        </div>
      </div>
    );
  }

  // 1. Not logged in → send to login
  if (!user) return <Navigate to="/login" replace />;

  // 2. Email Verification Gate:
  if (!user.isVerified && location.pathname !== '/verify-account') {
    return <Navigate to="/verify-account" replace />;
  }

  // If the user IS verified but tries to access /verify-account, rescue them (send to law or home)
  if (user.isVerified && location.pathname === '/verify-account') {
    return <Navigate to={user.agreedToLaw ? "/home" : "/public-law"} replace />;
  }

  // 3. Law Agreement Gate:
  if (!user.agreedToLaw && location.pathname !== '/public-law') {
    // Note: Don't redirect if we are already on /verify-account (handled above)
    if (location.pathname !== '/verify-account') {
      return <Navigate to="/public-law" replace />;
    }
  }

  // If the user HAS agreed and tries to access /public-law → send to /home
  if (user.agreedToLaw && location.pathname === '/public-law') {
    return <Navigate to="/home" replace />;
  }

  // 4. Pending Approval Gate (Strictly applied to Secondary Accounts for now)
  if (user.parentId && user.agreedToLaw && user.verificationStatus === 'PENDING_REVIEW') {
    if (location.pathname !== '/pending-approval') {
      return <Navigate to="/pending-approval" replace />;
    }
  }

  // If a secondary account IS approved but tries to access /pending-approval, rescue them
  if (user.parentId && user.agreedToLaw && user.verificationStatus === 'APPROVED' && location.pathname === '/pending-approval') {
    return <Navigate to="/home" replace />;
  }

  return children;
};

// ─────────────────────────────────────────────────────────────────────────────
// AdminRoute: Requires auth + ADMIN role
// ─────────────────────────────────────────────────────────────────────────────
const AdminRoute = ({ children }) => {
  const { data: user, isLoading } = useUser();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e]">
        <div className="w-8 h-8 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (!user.agreedToLaw) return <Navigate to="/public-law" replace />;
  if (user.role !== 'ADMIN') return <Navigate to="/home" replace />;
  return children;
};

// ─────────────────────────────────────────────────────────────────────────────
// EbrajerRoute: Requires auth + APPROVED main account
// ─────────────────────────────────────────────────────────────────────────────
const EbrajerRoute = ({ children }) => {
  const { data: user, isLoading } = useUser();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e]">
        <div className="w-8 h-8 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (!user.agreedToLaw) return <Navigate to="/public-law" replace />;
  if (user.verificationStatus !== 'APPROVED' || user.parentId) return <Navigate to="/profile" replace />;
  return children;
};

// ─────────────────────────────────────────────────────────────────────────────
// App Router
// ─────────────────────────────────────────────────────────────────────────────
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public routes — no auth required */}
          <Route path="/" element={<Agreement />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* The Law Gate — requires auth but NOT agreedToLaw */}
          <Route path="/public-law" element={
            <ProtectedRoute><PublicLaw /></ProtectedRoute>
          } />

          {/* Pending Approval Gate */}
          <Route path="/pending-approval" element={
            <ProtectedRoute><PendingApproval /></ProtectedRoute>
          } />

          {/* Protected routes — require auth + agreedToLaw */}
          <Route path="/home" element={
            <ProtectedRoute><Home /></ProtectedRoute>
          } />
          <Route path="/verify-account" element={
            <ProtectedRoute><VerifyAccount /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path="/stats" element={
            <ProtectedRoute><Stats /></ProtectedRoute>
          } />
          <Route path="/future" element={
            <ProtectedRoute><Future /></ProtectedRoute>
          } />

          {/* Admin only */}
          <Route path="/admin/users" element={
            <AdminRoute><UserVerification /></AdminRoute>
          } />

          {/* Ebrajer only */}
          <Route path="/sub-accounts" element={
            <EbrajerRoute><SubAccounts /></EbrajerRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVerifyAccount, useUser, useResendCode } from '../hooks/useAuth';

const VerifyAccount = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { mutate: verify, isPending } = useVerifyAccount();
  const { mutate: resend, isPending: isResending } = useResendCode();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const otp = code.join('');
    if (otp.length !== 6) return;

    verify(
      otp,
      {
        onSuccess: () => {
          // Success! Gates in ProtectedRoute will now allow transition to /public-law
          navigate('/public-law');
        },
        onError: (err) => {
          setError(err.response?.data?.message || 'Invalid verification code');
        },
      }
    );
  };

  const handleResend = () => {
    if (timer > 0 || isResending) return;
    setError('');
    setSuccess('');
    
    resend(user?.email || '', {
      onSuccess: () => {
        setTimer(60);
        setSuccess('A new code has been sent to your email');
        setTimeout(() => setSuccess(''), 5000);
      },
      onError: (err) => {
        setError(err.response?.data?.message || 'Failed to resend code');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 font-sans">
      <div className="w-full max-w-md">
        {/* Minimalist Card */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-10 md:p-12 text-center">
          
          <div className="mb-10">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl rotate-3 hover:rotate-0 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">Verify Email</h2>
            <p className="text-slate-500 mt-3 text-sm font-medium">
              We've sent a 6-digit code to <span className="text-slate-900 font-semibold">{user?.email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="flex justify-between gap-2 sm:gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  autoFocus={index === 0}
                  className="w-full h-14 sm:h-16 text-center text-2xl font-bold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all duration-200"
                  required
                />
              ))}
            </div>

            <div className="space-y-4">
              {error && (
                <div className="flex items-center justify-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl animate-shake">
                  <span className="text-xs font-bold text-red-600">{error}</span>
                </div>
              )}
              
              {success && (
                <div className="flex items-center justify-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <span className="text-xs font-bold text-emerald-600">{success}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={code.join('').length !== 6 || isPending}
                className="w-full py-4 bg-slate-900 text-white text-sm font-bold rounded-xl shadow-lg shadow-slate-200 hover:bg-slate-800 active:scale-[0.98] transition-all duration-200 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none uppercase tracking-widest"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying
                  </span>
                ) : 'Complete Verification'}
              </button>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-400 font-medium">
              Didn't receive the code?{' '}
              {timer > 0 ? (
                <span className="text-slate-900 font-bold ml-1">Resend in {timer}s</span>
              ) : (
                <button 
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-slate-900 font-bold hover:underline underline-offset-4 decoration-2 transition-all ml-1 disabled:opacity-50"
                >
                  {isResending ? 'Sending...' : 'Resend Code'}
                </button>
              )}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('/login')} 
              className="text-slate-400 text-xs font-semibold hover:text-slate-600 transition-colors uppercase tracking-widest"
            >
              Back to Sign In
            </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;


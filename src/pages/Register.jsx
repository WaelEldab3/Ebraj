import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [step, setStep] = useState('form');

  // Form states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  // Verify state
  const [code, setCode] = useState('');

  const navigate = useNavigate();

  const handleClearEmail = () => {
    setEmail('');
    setError('');
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Instead of navigating, move to verify step
    setStep('verify');
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    // Finish verification
    navigate('/login');
  };

  const isFormValid = username.trim() !== '' && email.trim() !== '' && phone.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-sans w-full">
      <div className="bg-gray-200 p-8 sm:p-10 rounded-2xl w-full max-w-xl flex justify-center items-center">
        
        <div className="w-full max-w-md bg-white rounded-lg border border-gray-300 shadow-sm p-8 relative">
          
          {step === 'form' ? (
            <>
              {/* Close (X) icon at top-right */}
              <button 
                type="button"
                onClick={() => navigate('/login')}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Card Header text-center */}
              <div className="text-center mb-3 mt-2">
                <h2 className="text-2xl font-bold text-gray-900 tracking-wide">Welcome</h2>
              </div>
              
              <div className="text-center mb-8">
                <p className="text-sm font-bold text-gray-900">Create an account</p>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateSubmit} className="space-y-4">

                {/* Username */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all placeholder:text-gray-500 text-gray-900"
                    required
                  />
                </div>
                
                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all placeholder:text-gray-500 text-gray-900"
                    required
                  />
                  {email && (
                    <button
                      type="button"
                      onClick={handleClearEmail}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Phone Number */}
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all placeholder:text-gray-500 text-gray-900"
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all placeholder:text-gray-500 text-gray-900"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all placeholder:text-gray-500 text-gray-900"
                    required
                  />
                </div>

                {/* Remember Me Checkbox */}
                <div className="pt-2 pb-4">
                  <label className="flex items-center space-x-2 cursor-pointer w-max pl-1">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded-sm border-gray-400 text-black focus:ring-black cursor-pointer"
                    />
                    <span className="text-xs text-gray-700">Remember me</span>
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="text-red-500 text-sm font-medium text-center pb-2">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`px-10 py-2 text-xs font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      isFormValid 
                        ? 'bg-black hover:bg-gray-800 text-white focus:ring-gray-900' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Create
                  </button>
                </div>
                
              </form>

              {/* Footer Text */}
              <div className="mt-8 flex flex-col items-center space-y-2">
                <Link to="/login" className="text-xs text-gray-800 hover:text-black transition-colors hover:underline">
                  Already have an account? Log in
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Verify Step UI */}
              
              {/* Header */}
              <div className="flex items-center justify-between mb-8 mt-2">
                <button 
                  type="button"
                  onClick={() => setStep('form')} 
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label="Back"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <h2 className="text-lg font-bold text-gray-900 tracking-wide text-center flex-1">Confirm email address</h2>
                <button 
                  type="button"
                  onClick={() => navigate('/login')} 
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Text */}
              <div className="text-center px-4 mb-6 text-sm text-gray-600 leading-relaxed">
                Choose reference we will send you a verification code to reset your password{' '}
                <button className="text-blue-600 hover:underline font-medium focus:outline-none mt-1">
                  Resend again
                </button>
              </div>

              <form onSubmit={handleVerifySubmit}>
                {/* Input */}
                <div className="mb-8">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-4 py-2.5 text-center text-sm border border-gray-300 rounded focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all placeholder:text-gray-500 text-gray-900 font-medium tracking-widest"
                    required
                  />
                </div>

                {/* Button */}
                <div className="flex justify-center mt-4 mb-2">
                  <button
                    type="submit"
                    disabled={code.trim() === ''}
                    className={`px-10 py-2 w-full max-w-xs text-xs font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      code.trim() !== ''
                        ? 'bg-black hover:bg-gray-800 text-white focus:ring-gray-900' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default Register;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';

const Register = () => {
  // Form states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { mutate: register, isPending, isError, error: registerError } = useRegister();

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

    register(
      { username, email, phone, password },
      {
        onSuccess: () => {
          if (rememberMe) {
            localStorage.setItem('ebraj_saved_identifier_MAIN', email);
          } else {
            localStorage.removeItem('ebraj_saved_identifier_MAIN');
          }
          navigate('/verify-account');
        },
      }
    );
  };

  const isFormValid = username.trim() !== '' && email.trim() !== '' && phone.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-sans w-full">
      <div className="bg-gray-200 p-8 sm:p-10 rounded-2xl w-full max-w-xl flex justify-center items-center">
        
        <div className="w-full max-w-md bg-white rounded-lg border border-gray-300 shadow-sm p-8 relative">
          
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
                autoComplete="username"
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
                autoComplete="email"
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
                autoComplete="tel"
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
                autoComplete="new-password"
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
                autoComplete="new-password"
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
            {(error || isError) && (
              <div className="text-red-500 text-sm font-medium text-center pb-2">
                {error || (registerError?.response?.data?.message || 'Registration failed')}
              </div>
            )}

            <div className="w-full flex justify-center mt-4">
              <button
                type="submit"
                disabled={!isFormValid || isPending}
                className={`px-10 py-2.5 text-xs font-semibold rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center min-w-[120px] ${
                  (isFormValid && !isPending)
                    ? 'bg-black hover:bg-gray-800 text-white focus:ring-gray-900 active:scale-95' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating...</span>
                  </div>
                ) : 'Create'}
              </button>
            </div>
            
          </form>

          {/* Footer Text */}
          <div className="mt-8 flex flex-col items-center space-y-2">
            <Link to="/login" className="text-xs text-gray-800 hover:text-black transition-colors hover:underline">
              Already have an account? Log in
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;

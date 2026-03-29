import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MOCK_USER } from '../constants/auth';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState('Main');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleClearIdentifier = () => {
    setIdentifier('');
    setError('');
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (identifier === MOCK_USER.phone && password === MOCK_USER.password) {
      setIsLoggedIn(true);
      navigate('/home');
    } else {
      setError('Invalid credentials');
    }
  };

  const isFormValid = identifier.trim() !== '' && password.trim() !== '';

  return (
    /* Outer container: Full height screen, Center content, Light background */
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-sans w-full">
      
      {/* Inner wrapper: Background: bg-gray-200, Padding: p-8 or p-10, Rounded corners */}
      <div className="bg-gray-200 p-8 sm:p-10 rounded-2xl w-full max-w-xl flex justify-center items-center">
        
        {/* Inside wrapper: The login form card */}
        <div className="w-full max-w-md bg-white rounded-lg border border-gray-300 shadow-sm p-8 relative">
          
          

          {/* Card Header text-center */}
          <div className="text-center mb-3 mt-2">
            <h2 className="text-2xl font-bold text-gray-900 tracking-wide">Welcome</h2>
          </div>
          
          <div className="text-center mb-4">
            <p className="text-sm font-bold text-gray-900">Log in</p>
          </div>

          {/* Tabs (Segmented Control) */}
          <div className="flex justify-center mb-8">
            <div className="flex border border-gray-300 rounded overflow-hidden">
              <button 
                type="button"
                onClick={() => setActiveTab('Main')}
                className={`px-8 py-1 text-xs font-semibold transition-colors ${
                  activeTab === 'Main' 
                    ? 'bg-gray-400 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Main
              </button>
              <div className="w-[1px] bg-gray-300"></div>
              <button 
                type="button"
                onClick={() => setActiveTab('Secondary')}
                className={`px-6 py-1 text-xs font-semibold transition-colors ${
                  activeTab === 'Secondary' 
                    ? 'bg-gray-400 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Secondary
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Conditional Username Input (Secondary Tab) */}
            {activeTab === 'Secondary' && (
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
            )}

            {/* Email / Phone */}
            <div className="relative">
              <input
                type="text"
                placeholder="Email, Phone number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all placeholder:text-gray-500 text-gray-900"
                required
              />
              {identifier && (
                <button
                  type="button"
                  onClick={handleClearIdentifier}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              )}
              {!identifier && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Second Input: Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all placeholder:text-gray-500 text-gray-900"
                required
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
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
                Login
              </button>
            </div>
            
          </form>

          {/* Footer Text */}
          <div className="mt-8 flex flex-col items-center space-y-2">
            <a href="#" className="text-xs text-gray-800 hover:text-black transition-colors">
              Trouble logging in?
            </a>
            <Link to="/register" className="text-xs text-gray-800 hover:text-black transition-colors hover:underline">
              Create account
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;

'use client'
import React, { useState } from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

const Login = () => {
  const [role, setRole] = useState<'client' | 'admin'>('client');
  const [showQuickOrderPrompt, setShowQuickOrderPrompt] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    adminCode: '',
    username: '',
    town: '',
    city: '',
    confirm: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focus, setFocus] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus({ ...focus, [e.target.name]: true });
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus({ ...focus, [e.target.name]: false });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/.test(password);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (authMode === 'login') {
      // Login logic
      if (role === 'admin') {
        if (authForm.adminCode !== '123487654') {
          setError('Invalid admin code');
          return;
        }
        if (authForm.email !== 'fonyuydiland@gmail.com' || authForm.password !== 'ElNgah@50') {
          setError('Invalid admin credentials');
          return;
        }
      } else {
        if (!validateEmail(authForm.email)) {
          setError('Invalid email format');
          return;
        }
        if (!validatePassword(authForm.password)) {
          setError('Password must be at least 6 characters, include a letter and a number');
          return;
        }
      }
      setLoading(true);
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: authForm.email,
            password: authForm.password,
            adminCode: authForm.adminCode
          })
        });
        const data = await res.json();
        if (data.success && data.redirect) {
          // Set user as active in localStorage
          localStorage.setItem('isLoggedIn', 'true');
          // Save user data for profile page
          if (role === 'client' && data.user) {
            localStorage.setItem('userData', JSON.stringify(data.user));
          } else if (role === 'admin') {
            localStorage.setItem('userData', JSON.stringify({
              email: authForm.email,
              username: 'dilandfonyuy',
              role: 'admin',
            }));
          }
          window.location.href = data.redirect;
        } else {
          setError(data.error || 'Login failed');
        }
      } catch {
        setError('Server error');
      } finally {
        setLoading(false);
      }
    } else {
      // Signup logic
      if (!validateEmail(authForm.email)) {
        setError('Invalid email format');
        return;
      }
      if (!validatePassword(authForm.password)) {
        setError('Password must be at least 6 characters, include a letter and a number');
        return;
      }
      if (authForm.password !== authForm.confirm) {
        setError('Passwords do not match');
        return;
      }
      if (!authForm.username) {
        setError('Username is required');
        return;
      }
      setLoading(true);
      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: authForm.email,
            username: authForm.username,
            password: authForm.password,
            confirm: authForm.confirm,
            town: authForm.town,
            city: authForm.city
          })
        });
        const data = await res.json();
        if (data.success && data.redirect) {
          window.location.href = data.redirect;
        } else {
          setError(data.error || 'Signup failed');
        }
      } catch {
        setError('Server error');
      } finally {
        setLoading(false);
      }
    }
  };
  const handleQuickOrder = () => {
    window.location.href = '/auth/quick-order';
  };

  return (
    <div className="min-h-screen flex bg-gray-50 fixed inset-0" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="flex-1 flex items-center justify-center sticky top-0 h-screen bg-white z-10">
        <div className="rounded-lg shadow-lg p-8 w-full max-w-md bg-white">
          <div className="flex justify-center mb-6">
            <h2 className="text-2xl font-bold text-[#ff2c2c]">{authMode === 'login' ? 'Sign In' : 'Sign Up'}</h2>
          </div>
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Role selection for login */}
            {authMode === 'login' && (
              <div className="flex justify-center gap-4 mb-4">
                <button
                  type="button"
                  className={`px-4 py-2 rounded font-semibold border transition ${role === 'client' ? 'bg-[#ff2c2c] text-white border-[#ff2c2c]' : 'bg-white text-[#ff2c2c] border-[#ff2c2c]'}`}
                  onClick={() => setRole('client')}
                >
                  Client
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded font-semibold border transition ${role === 'admin' ? 'bg-[#ff2c2c] text-white border-[#ff2c2c]' : 'bg-white text-[#ff2c2c] border-[#ff2c2c]'}`}
                  onClick={() => setRole('admin')}
                >
                  Admin
                </button>
              </div>
            )}
            {/* Login fields */}
            {authMode === 'login' && role === 'admin' && (
              <>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="admin-email"
                    className="w-full border rounded px-3 pt-5 pb-2 peer focus:outline-none focus:border-[#ff2c2c] transition"
                    value={authForm.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <label
                    htmlFor="admin-email"
                    className={`absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none ${focus.email || authForm.email ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}`}
                  >
                    Admin Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="admin-password"
                    className="w-full border rounded px-3 pt-5 pb-2 pr-10 peer focus:outline-none focus:border-[#ff2c2c] transition"
                    value={authForm.password}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <label
                    htmlFor="admin-password"
                    className={`absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none ${focus.password || authForm.password ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}`}
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-10.5-7.5a10.05 10.05 0 013.875-5.325m3.375-2.1A9.956 9.956 0 0112 5c5 0 9.27 3.11 10.5 7.5a9.956 9.956 0 01-4.5 5.325M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.857-.67 1.67-1.175 2.414M15.54 15.54A9.956 9.956 0 0112 19c-5 0-9.27-3.11-10.5-7.5a9.956 9.956 0 014.5-5.325" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="adminCode"
                    id="admin-code"
                    className="w-full border rounded px-3 pt-5 pb-2 peer focus:outline-none focus:border-[#ff2c2c] transition"
                    value={authForm.adminCode}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <label
                    htmlFor="admin-code"
                    className={`absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none ${focus.adminCode || authForm.adminCode ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}`}
                  >
                    Admin Code
                  </label>
                </div>
              </>
            )}
            {authMode === 'login' && role === 'client' && (
              <>
                <div className="relative">
                  <input
                    type="text"
                    name="email"
                    id="signin-email"
                    className="w-full border rounded px-3 pt-5 pb-2 peer focus:outline-none focus:border-[#ff2c2c] transition"
                    value={authForm.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <label
                    htmlFor="signin-email"
                    className={`absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none ${focus.email || authForm.email ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}`}
                  >
                    Username or Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    className="w-full border rounded px-3 pt-5 pb-2 pr-10 peer focus:outline-none focus:border-[#ff2c2c] transition"
                    value={authForm.password}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <label
                    htmlFor="password"
                    className={`absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none ${focus.password || authForm.password ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}`}
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-10.5-7.5a10.05 10.05 0 013.875-5.325m3.375-2.1A9.956 9.956 0 0112 5c5 0 9.27 3.11 10.5 7.5a9.956 9.956 0 01-4.5 5.325M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.857-.67 1.67-1.175 2.414M15.54 15.54A9.956 9.956 0 0112 19c-5 0-9.27-3.11-10.5-7.5a9.956 9.956 0 014.5-5.325" />
                      </svg>
                    )}
                  </button>
                </div>
              </>
            )}
            {/* Signup fields */}
            {authMode === 'signup' && (
              <>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="signup-email"
                    className="w-full border rounded px-3 pt-5 pb-2 peer focus:outline-none focus:border-[#ff2c2c] transition"
                    value={authForm.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <label
                    htmlFor="signup-email"
                    className={`absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none ${focus.email || authForm.email ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}`}
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    id="signup-username"
                    className="w-full border rounded px-3 pt-5 pb-2 peer focus:outline-none focus:border-[#ff2c2c] transition"
                    value={authForm.username}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <label
                    htmlFor="signup-username"
                    className={`absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none ${focus.username || authForm.username ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}`}
                  >
                    Username
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="town"
                    id="signup-town"
                    className="w-full border rounded px-3 pt-5 pb-2 peer focus:outline-none focus:border-[#ff2c2c] transition"
                    value={authForm.town}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <label
                    htmlFor="signup-town"
                    className={`absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none ${focus.town || authForm.town ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}`}
                  >
                    Town
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="city"
                    id="signup-city"
                    className="w-full border rounded px-3 pt-5 pb-2 peer focus:outline-none focus:border-[#ff2c2c] transition"
                    value={authForm.city}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <label
                    htmlFor="signup-city"
                    className={`absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none ${focus.city || authForm.city ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}`}
                  >
                    City
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="signup-password"
                    className="w-full border rounded px-3 pt-5 pb-2 pr-10 peer focus:outline-none focus:border-[#ff2c2c] transition"
                    value={authForm.password}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <label
                    htmlFor="signup-password"
                    className={`absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none ${focus.password || authForm.password ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}`}
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-10.5-7.5a10.05 10.05 0 013.875-5.325m3.375-2.1A9.956 9.956 0 0112 5c5 0 9.27 3.11 10.5 7.5a9.956 9.956 0 01-4.5 5.325M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.857-.67 1.67-1.175 2.414M15.54 15.54A9.956 9.956 0 0112 19c-5 0-9.27-3.11-10.5-7.5a9.956 9.956 0 014.5-5.325" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    name="confirm"
                    id="signup-confirm"
                    className="w-full border rounded px-3 pt-5 pb-2 pr-10 peer focus:outline-none focus:border-[#ff2c2c] transition"
                    value={authForm.confirm}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <label
                    htmlFor="signup-confirm"
                    className={`absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none ${focus.confirm || authForm.confirm ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}`}
                  >
                    Confirm Password
                  </label>
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    tabIndex={-1}
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-10.5-7.5a10.05 10.05 0 013.875-5.325m3.375-2.1A9.956 9.956 0 0112 5c5 0 9.27 3.11 10.5 7.5a9.956 9.956 0 01-4.5 5.325M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.857-.67 1.67-1.175 2.414M15.54 15.54A9.956 9.956 0 0112 19c-5 0-9.27-3.11-10.5-7.5a9.956 9.956 0 014.5-5.325" />
                      </svg>
                    )}
                  </button>
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full bg-[#ff2c2c] text-white rounded px-4 py-2 font-semibold hover:bg-[#e01b1b] transition"
              disabled={loading}
            >
              {loading ? (authMode === 'login' ? 'Signing In...' : 'Signing Up...') : (authMode === 'login' ? 'Sign In' : 'Sign Up')}
            </button>
            <div className="mt-4 text-center text-sm">
              {authMode === 'login' ? (
                <>Don&apos;t have an account?{' '}
                  <button type="button" className="text-[#ff2c2c] underline" onClick={() => setAuthMode('signup')}>Sign Up</button>
                </>
              ) : (
                <>Already have an account?{' '}
                  <button type="button" className="text-[#ff2c2c] underline" onClick={() => setAuthMode('login')}>Login</button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      {/* Right: Welcome Section */}
      <div className="flex-1 flex items-center justify-center sticky top-0 h-screen bg-[#fff6f6] z-0">
        <div className="max-w-md text-center px-8">
          <h1 className="text-4xl font-extrabold text-[#ff2c2c] mb-4">Welcome to Foodie</h1>
          <p className="text-lg text-gray-700 mb-6">
            Discover the best food in town! Foodie brings you a wide variety of delicious meals, snacks, and drinks from your favorite local restaurants. Order online, enjoy fast delivery, and experience the taste of happiness.
          </p>
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
              alt="Foodie Restaurant"
              className="rounded-xl shadow-lg w-64 h-40 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
'use client'
import React, { useState } from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({
    email: '',
    username: '',
    town: '',
    city: '',
    password: '',
    confirm: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Helper to check if a field has value or is focused
  const [focus, setFocus] = useState<{ [key: string]: boolean }>({});

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus({ ...focus, [e.target.name]: true });
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus({ ...focus, [e.target.name]: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your authentication logic here
    alert(isSignUp ? 'Sign Up submitted' : 'Sign In submitted');
  };

  return (
    <div className="min-h-screen flex bg-gray-50 fixed inset-0" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
      {/* Left: Auth Form */}
      <div className="flex-1 flex items-center justify-center sticky top-0 h-screen bg-white z-10">
        <div className="rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isSignUp ? 'Create an Account' : 'Sign In'}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="signup-email"
                    className="w-full border rounded px-3 pt-5 pb-2 peer focus:outline-none focus:border-[#ff2c2c] transition"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <label
                    htmlFor="signup-email"
                    className={`
                      absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none
                      ${focus.email || form.email ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}
                    `}
                  >
                    Email
                  </label>
                </div>
                {/* Username */}
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    id="signup-username"
                    className="w-full border rounded px-3 pt-5 pb-2 peer focus:outline-none focus:border-[#ff2c2c] transition"
                    value={form.username}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <label
                    htmlFor="signup-username"
                    className={`
                      absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none
                      ${focus.username || form.username ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}
                    `}
                  >
                    Username
                  </label>
                </div>
                {/* Town */}
                <div className="relative">
                  <input
                    type="text"
                    name="town"
                    id="signup-town"
                    className="w-full border rounded px-3 pt-5 pb-2 peer focus:outline-none focus:border-[#ff2c2c] transition"
                    value={form.town}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <label
                    htmlFor="signup-town"
                    className={`
                      absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none
                      ${focus.town || form.town ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}
                    `}
                  >
                    Town
                  </label>
                </div>
                {/* City */}
                <div className="relative">
                  <input
                    type="text"
                    name="city"
                    id="signup-city"
                    className="w-full border rounded px-3 pt-5 pb-2 peer focus:outline-none focus:border-[#ff2c2c] transition"
                    value={form.city}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <label
                    htmlFor="signup-city"
                    className={`
                      absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none
                      ${focus.city || form.city ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}
                    `}
                  >
                    City
                  </label>
                </div>
              </>
            )}
            {/* Email for Sign In */}
            {!isSignUp && (
              <div className="relative">
                <input
                  type="text"
                  name="email"
                  id="signin-email"
                  className="w-full border rounded px-3 pt-5 pb-2 peer focus:outline-none focus:border-[#ff2c2c] transition"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />
                <label
                  htmlFor="signin-email"
                  className={`
                    absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none
                    ${focus.email || form.email ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}
                  `}
                >
                  Email
                </label>
              </div>
            )}
            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="w-full border rounded px-3 pt-5 pb-2 pr-10 peer focus:outline-none focus:border-[#ff2c2c] transition"
                value={form.password}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
              />
              <label
                htmlFor="password"
                className={`
                  absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none
                  ${focus.password || form.password ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}
                `}
              >
                Password
              </label>
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
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
            {/* Confirm Password */}
            {isSignUp && (
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  id="confirm"
                  className="w-full border rounded px-3 pt-5 pb-2 pr-10 peer focus:outline-none focus:border-[#ff2c2c] transition"
                  value={form.confirm}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />
                <label
                  htmlFor="confirm"
                  className={`
                    absolute left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none
                    ${focus.confirm || form.confirm ? 'text-xs -top-2.5 left-2 text-[#ff2c2c] scale-90' : 'text-base top-4'}
                  `}
                >
                  Confirm Password
                </label>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  tabIndex={-1}
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
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
            )}
            <button
              type="submit"
              className="w-full bg-[#ff2c2c] text-white rounded px-4 py-2 font-semibold hover:bg-[#e01b1b] transition"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
          {/* Social login icons below submit */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              className="flex items-center justify-center bg-white border border-gray-300 rounded-full p-3 hover:bg-gray-100 transition"
              onClick={() => alert('Continue with Google')}
              aria-label="Continue with Google"
            >
              <FaGoogle className="text-[#ea4335] text-2xl" />
            </button>
            <button
              className="flex items-center justify-center bg-[#1877f2] text-white rounded-full p-3 hover:bg-[#145db2] transition"
              onClick={() => alert('Continue with Facebook')}
              aria-label="Continue with Facebook"
            >
              <FaFacebookF className="text-white text-2xl" />
            </button>
          </div>
          <div className="mt-4 text-center text-sm">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button className="text-[#ff2c2c] underline" onClick={() => setIsSignUp(false)}>
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button className="text-[#ff2c2c] underline" onClick={() => setIsSignUp(true)}>
                  Sign Up
                </button>
              </>
            )}
          </div>
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

export default SignIn;

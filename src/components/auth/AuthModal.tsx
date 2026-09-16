import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Mail, Lock, User as UserIcon, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
    openAuthModal,
    login,
    signup,
    loginWithGoogle
  } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [resetMsgSent, setResetMsgSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const isSignup = authModalMode === 'signup';

  const resetForm = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setResetMsgSent(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setResetMsgSent(false);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (isSignup) {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please verify.');
        return;
      }
      if (!agreeTerms) {
        setErrorMsg('Please accept the Terms of Service & Privacy Policy.');
        return;
      }

      setIsLoading(true);
      const res = await signup(fullName, email, password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMsg(res.error || 'Failed to create account');
      } else {
        setSuccessMsg('Account created successfully! Welcome to ResumeCraft.');
      }
    } else {
      if (!password) {
        setErrorMsg('Please enter your password.');
        return;
      }
      setIsLoading(true);
      const res = await login(email, password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMsg(res.error || 'Invalid credentials');
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="p-6 pb-4 text-center border-b border-slate-100">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 mb-3">
              <span className="font-bold text-xl">RC</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {isSignup ? 'Create your account' : 'Welcome back to ResumeCraft'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isSignup
                ? 'Join over 150,000+ job seekers crafting standout resumes'
                : 'Access your saved resumes and continue editing'}
            </p>

            {/* Tab switch */}
            <div className="flex p-1 mt-4 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  openAuthModal('login');
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  !isSignup ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  openAuthModal('signup');
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  isSignup ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 pt-5">
            {/* Google Sign-in with Firebase */}
            <button
              type="button"
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true);
                setErrorMsg(null);
                const res = await loginWithGoogle();
                setIsLoading(false);
                if (!res.success) {
                  setErrorMsg(res.error || 'Google sign-in could not be completed.');
                }
              }}
              className="w-full flex items-center justify-center gap-2.5 py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-all hover:border-slate-300 cursor-pointer disabled:opacity-60"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isLoading ? 'Connecting...' : 'Continue with Google'}</span>
            </button>

            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-[11px]">
                <span className="px-2 bg-white text-slate-400">or continue with email</span>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-3 p-2.5 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="mb-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-700">
                <Check className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Password Reset Notice */}
            {resetMsgSent && (
              <div className="mb-3 p-2.5 rounded-lg bg-blue-50 border border-blue-200 flex items-center gap-2 text-xs text-blue-700">
                <Check className="w-4 h-4 shrink-0" />
                <span>A password reset link has been dispatched to {email || 'your email'}.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {isSignup && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                  {isSignup && <span className="text-[10px] font-normal text-slate-400 ml-1.5">(1 account per email)</span>}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Password</label>
                  {!isSignup && (
                    <button
                      type="button"
                      onClick={() => setResetMsgSent(true)}
                      className="text-[11px] text-blue-600 hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {isSignup && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Checkboxes */}
              {isSignup ? (
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms-check"
                    checked={agreeTerms}
                    onChange={e => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="terms-check" className="text-[11px] text-slate-600 leading-tight">
                    I agree to the <span className="text-blue-600 hover:underline">Terms of Service</span> and{' '}
                    <span className="text-blue-600 hover:underline">Privacy Policy</span>.
                  </label>
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="remember-check"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="remember-check" className="text-[11px] text-slate-600">
                    Remember me on this browser
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? 'Processing...' : isSignup ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-slate-500">
              {isSignup ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      openAuthModal('login');
                    }}
                    className="text-blue-600 font-semibold hover:underline cursor-pointer"
                  >
                    Log In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      openAuthModal('signup');
                    }}
                    className="text-blue-600 font-semibold hover:underline cursor-pointer"
                  >
                    Create one free
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { FileText, Menu, X, Sparkles, ChevronDown, User, LogOut, LayoutDashboard, PlusCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const { currentView, setCurrentView, createNewResume } = useResume();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleNavClick = (view: 'landing' | 'templates' | 'dashboard' | 'builder' | 'public-gallery') => {
    if (view === 'dashboard' && !isAuthenticated) {
      openAuthModal('signin', 'Sign in to access your saved resumes in dashboard', () => {
        setCurrentView('dashboard');
      });
      setIsMobileMenuOpen(false);
      return;
    }
    if (view === 'templates' && !isAuthenticated) {
      openAuthModal('signup', 'Sign up or log in first to choose your template and build your resume', () => {
        setCurrentView('templates');
      });
      setIsMobileMenuOpen(false);
      return;
    }
    if (view === 'public-gallery' && !isAuthenticated) {
      openAuthModal('signin', 'Sign in or sign up first to view published resumes', () => {
        setCurrentView('public-gallery');
      });
      setIsMobileMenuOpen(false);
      return;
    }
    if (view === 'builder' && !isAuthenticated) {
      openAuthModal('signup', 'Sign up or log in first to build your resume', () => {
        setCurrentView('builder');
      });
      setIsMobileMenuOpen(false);
      return;
    }
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setCurrentView('templates');
    } else {
      openAuthModal('signup', 'Sign up or log in first to choose your template and build your resume', () => {
        setCurrentView('templates');
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1">
                ResumeCraft
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/60">
                  SaaS
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleNavClick('landing')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentView === 'landing' ? 'text-blue-600 bg-blue-50/70' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('templates')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentView === 'templates' ? 'text-blue-600 bg-blue-50/70' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => handleNavClick('public-gallery')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentView === 'public-gallery' ? 'text-blue-600 bg-blue-50/70' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Public Resumes
            </button>
            <button
              onClick={() => {
                handleNavClick('landing');
                setTimeout(() => {
                  document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Features
            </button>
            {isAuthenticated && (
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  currentView === 'dashboard' ? 'text-blue-600 bg-blue-50/70' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Dashboard
              </button>
            )}
            <button
              onClick={() => handleNavClick('builder')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentView === 'builder' ? 'text-blue-600 bg-blue-50/70' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Resume Builder
            </button>
          </nav>

          {/* Desktop CTA / Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-2 pr-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50 transition-all"
                >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        referrerPolicy="no-referrer"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <span className="font-semibold text-slate-800">{user.name.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {isUserDropdownOpen && (
                    <div
                      onMouseLeave={() => setIsUserDropdownOpen(false)}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="px-3.5 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          setCurrentView('dashboard');
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          createNewResume();
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <PlusCircle className="w-4 h-4 text-slate-400" />
                        Create New Resume
                      </button>
                      <div className="border-t border-slate-100 my-1"></div>
                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          logout();
                          setCurrentView('landing');
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
            ) : (
              <>
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={handleGetStarted}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs shadow-blue-500/20 transition-all hover:shadow-blue-500/30 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 pt-2 pb-4 space-y-1">
          <button
            onClick={() => handleNavClick('landing')}
            className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('templates')}
            className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Templates
          </button>
          <button
            onClick={() => handleNavClick('public-gallery')}
            className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Public Resumes
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (!isAuthenticated) {
                openAuthModal('signup', 'Please sign up or log in first to access the Resume Builder');
                return;
              }
              handleNavClick('builder');
            }}
            className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            Resume Builder
          </button>
          {isAuthenticated && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
            >
              Dashboard
            </button>
          )}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setCurrentView('landing');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-center cursor-pointer transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    openAuthModal('login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg text-center"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    openAuthModal('signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg text-center shadow-xs"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

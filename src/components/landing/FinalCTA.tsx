import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const { setCurrentView } = useResume();
  const { isAuthenticated, openAuthModal } = useAuth();

  const handleCreate = () => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign up or log in first to choose your template and build your resume', () => {
        setCurrentView('templates');
      });
      return;
    }
    setCurrentView('templates');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/15 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-blue-300" />
          <span>Fast, Free & Easy to Start</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight">
          Ready to Land Your Dream Interview?
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Join thousands of successful candidates who transformed their resumes with ResumeCraft and secured top offers.
        </p>

        <div className="pt-2">
          <button
            onClick={handleCreate}
            className="px-8 py-4 rounded-xl text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-xl shadow-black/20 hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            Create Your Resume Now
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, ArrowRight, ShieldCheck, Download, Star, Eye, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { TemplateId } from '../../types';

export const Hero: React.FC = () => {
  const { setCurrentView, createNewResume } = useResume();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [heroTemplate, setHeroTemplate] = useState<TemplateId>('modern');

  const handleCreateResume = () => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign up or log in first to choose your template and build your resume', () => {
        setCurrentView('templates');
      });
      return;
    }
    setCurrentView('templates');
  };

  const handleExploreTemplates = () => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign up or log in first to explore all recruiter-approved templates', () => {
        setCurrentView('templates');
      });
      return;
    }
    setCurrentView('templates');
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-18 md:pt-16 md:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50/60 border-b border-slate-100">
      {/* Background subtle radial wash */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-blue-500/5 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-semibold text-blue-700 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Over 150,000+ Resumes Crafted & Downloaded</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Build a Resume That{' '}
              <span className="text-blue-600">
                Lands Your Dream Job
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Create a professional, job-ready resume in minutes with beautiful templates and an easy-to-use resume builder.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={handleCreateResume}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                Create My Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={handleExploreTemplates}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-slate-500" />
                Explore Templates
              </button>
            </div>

            {/* Social Proof Brand Logotypes */}
            <div className="pt-6 border-t border-slate-100">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3 text-center lg:text-left">
                Trusted by job seekers hired at top companies
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-400 font-bold text-sm tracking-tight grayscale opacity-70 hover:opacity-90 transition-opacity">
                <span className="hover:text-slate-800 transition-colors">Google</span>
                <span className="hover:text-slate-800 transition-colors">Stripe</span>
                <span className="hover:text-slate-800 transition-colors">Amazon</span>
                <span className="hover:text-slate-800 transition-colors">Microsoft</span>
                <span className="hover:text-slate-800 transition-colors">Spotify</span>
                <span className="hover:text-slate-800 transition-colors">Airbnb</span>
              </div>
            </div>
          </div>

          {/* Right Hero Graphic: Interactive Live A4 Resume Mockup (5 cols) */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* Interactive Template Quick-Selector Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200/80 shadow-sm rounded-xl mb-4 z-10">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Style:</span>
              {(['modern', 'executive', 'minimal'] as TemplateId[]).map((tId) => (
                <button
                  key={tId}
                  onClick={() => setHeroTemplate(tId)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                    heroTemplate === tId
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tId}
                </button>
              ))}
            </div>

            {/* Floating Trust Metric Badges */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute -top-3 -left-3 sm:-left-5 z-20 bg-white rounded-xl p-3 shadow-xl border border-slate-100 flex items-center gap-2.5 text-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-extrabold text-xs">
                99%
              </div>
              <div>
                <p className="font-bold text-slate-800 text-xs">ATS Pass Rate</p>
                <p className="text-[10px] text-slate-500 font-medium">Algorithmic friendly</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="absolute -bottom-4 -right-2 sm:-right-4 z-20 bg-white rounded-xl p-3 shadow-xl border border-slate-100 flex items-center gap-2.5 text-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-xs">Recruiter Approved</p>
                <p className="text-[10px] text-slate-500 font-medium">Top candidate tier</p>
              </div>
            </motion.div>

            {/* High-Fidelity Resume Sheet Mockup */}
            <div
              onClick={() => {
                if (!isAuthenticated) {
                  openAuthModal('signup', 'Sign up or log in first to choose your template and build your resume', () => {
                    setCurrentView('templates');
                  });
                  return;
                }
                setCurrentView('templates');
              }}
              className="relative w-full max-w-[420px] bg-white rounded-xl shadow-2xl border border-slate-200/90 overflow-hidden cursor-pointer group hover:border-blue-400 transition-all duration-300"
            >
              {/* Dynamic Header based on selected style */}
              {heroTemplate === 'modern' && (
                <div className="h-2 w-full bg-blue-600" />
              )}
              {heroTemplate === 'executive' && (
                <div className="bg-slate-900 text-white px-5 py-4 border-b border-slate-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-extrabold text-sm tracking-wide">ALEX RIVERA</h3>
                      <p className="text-[11px] text-blue-300 font-medium">Senior Software Engineer</p>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      San Francisco, CA
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Candidate Header for Modern / Minimal */}
                {heroTemplate !== 'executive' && (
                  <div className="flex items-start justify-between border-b pb-4 mb-4 border-slate-100">
                    <div>
                      <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Alex Rivera</h2>
                      <p className="text-xs font-semibold text-blue-600">Senior Full Stack Software Engineer</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">alex.rivera@example.com • +1 (555) 382-9012 • San Francisco, CA</p>
                    </div>
                    <div className="w-10 h-10 rounded-full ring-2 ring-blue-500/20 overflow-hidden shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                        alt="Candidate avatar"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Professional Summary */}
                <div className="mb-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Professional Summary
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Results-driven Senior Full Stack Engineer with 7+ years scaling distributed systems. Reduced p99 query latency by 45% and accelerated deployment velocity for 2M+ active SaaS users.
                  </p>
                </div>

                {/* Experience Item */}
                <div className="mb-4 border-t border-slate-100 pt-3">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="text-xs font-bold text-slate-900">Lead Full Stack Engineer</span>
                    <span className="text-[10px] text-slate-400 font-medium">2022 — Present</span>
                  </div>
                  <div className="text-[11px] font-semibold text-blue-600 mb-1.5">Vanguard Cloud Technologies</div>
                  <ul className="text-[10px] text-slate-600 space-y-1 list-disc list-inside">
                    <li>Migrated monolith core services to event-driven microservices using React & Kafka.</li>
                    <li>Reduced CI/CD build deployment cycle times from 28 min to 4.5 minutes.</li>
                    <li>Mentored a high-performing engineering team of 9 software engineers.</li>
                  </ul>
                </div>

                {/* Skills Chips */}
                <div className="border-t border-slate-100 pt-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Core Technical Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['TypeScript', 'React & Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'System Design'].map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-medium text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Overlay Hint */}
              <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xl flex items-center gap-1.5">
                  Click to Customize in Builder <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

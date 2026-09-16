import React from 'react';
import { FileText, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

export const Footer: React.FC = () => {
  const { setCurrentView } = useResume();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs py-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand Info (2 cols on md) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-base font-bold tracking-tight">ResumeCraft</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              Modern, ATS-compliant resume builder empowering job seekers around the world to build recruiter-approved resumes and advance their careers.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white cursor-pointer transition-colors">
                <Twitter className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white cursor-pointer transition-colors">
                <Linkedin className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white cursor-pointer transition-colors">
                <Github className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Product</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCurrentView('builder')} className="hover:text-white transition-colors">
                  Resume Builder
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('templates')} className="hover:text-white transition-colors">
                  Resume Templates
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">ATS Score Optimizer</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Templates */}
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Templates</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCurrentView('templates')} className="hover:text-white transition-colors">
                  Modern Resume
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('templates')} className="hover:text-white transition-colors">
                  Executive Layout
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('templates')} className="hover:text-white transition-colors">
                  Minimal Tech
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('templates')} className="hover:text-white transition-colors">
                  Classic Traditional
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Legal */}
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Legal & Support</h4>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Security & Compliance</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Contact Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} ResumeCraft. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with modern precision for career acceleration.
          </p>
        </div>
      </div>
    </footer>
  );
};

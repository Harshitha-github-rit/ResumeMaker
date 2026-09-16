import React from 'react';
import { Palette, Edit3, DownloadCloud, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Pick a Recruiter-Approved Template',
      description: 'Choose from modern, creative, classic, or executive layouts crafted specifically to pass Applicant Tracking Systems (ATS).',
      icon: Palette,
      badge: 'Step 1'
    },
    {
      number: '02',
      title: 'Enter or Auto-Fill Your Experience',
      description: 'Quickly fill your work history, skills, and education with guided prompts, or load our tailored role presets in one click.',
      icon: Edit3,
      badge: 'Step 2'
    },
    {
      number: '03',
      title: 'Customize Styling & Download PDF',
      description: 'Fine-tune accent colors, typography, margins, and spacing. Then export a crisp, pixel-perfect A4 PDF ready to send to employers.',
      icon: DownloadCloud,
      badge: 'Step 3'
    }
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            How ResumeCraft Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            You don't need design skills or complex word processors. Build, format, and download your resume in less than 5 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50/70 hover:bg-white rounded-2xl p-8 border border-slate-200/80 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 group-hover:bg-blue-600 text-blue-600 group-hover:text-white transition-colors flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-300 group-hover:text-blue-600/30 transition-colors">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

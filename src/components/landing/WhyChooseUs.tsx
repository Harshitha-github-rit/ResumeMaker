import React from 'react';
import { Check, X, ShieldCheck, Zap, Award, Users } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const comparisonItems = [
    { feature: 'Instant Live A4 Preview', resumecraft: true, traditional: false },
    { feature: 'Real PDF Download (No watermark)', resumecraft: true, traditional: false },
    { feature: 'ATS Algorithm Optimized Structure', resumecraft: true, traditional: false },
    { feature: 'Switch Templates without losing content', resumecraft: true, traditional: false },
    { feature: 'Unlimited Editing & Section Customization', resumecraft: true, traditional: false },
    { feature: 'Automatic Cloud/Browser Auto-Save', resumecraft: true, traditional: false },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info & metrics (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
              The ResumeCraft Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why 150,000+ Job Seekers Choose ResumeCraft
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Most resume builders lure you with a flashy editor, only to ask for high recurring subscriptions or slap ugly watermarks when you click download. ResumeCraft gives you total transparency, professional ATS compliance, and high-resolution PDF exports.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2 text-blue-600 font-extrabold text-2xl">
                  3.8x
                </div>
                <p className="text-xs font-semibold text-slate-900 mt-1">More Interview Callbacks</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Compared to generic PDF templates</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-2xl">
                  99.2%
                </div>
                <p className="text-xs font-semibold text-slate-900 mt-1">ATS Parser Accuracy</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Green scores on Taleo & Greenhouse</p>
              </div>
            </div>
          </div>

          {/* Right Comparison Box (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-base">ResumeCraft vs. Other Builders</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Transparent comparison of key capabilities</p>
                </div>
                <div className="px-2.5 py-1 rounded bg-blue-600/30 text-blue-300 font-bold text-xs border border-blue-500/30">
                  Fair Comparison
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {comparisonItems.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-slate-800">{item.feature}</span>
                    <div className="flex items-center gap-8 pr-2">
                      <div className="flex items-center gap-1.5 font-bold text-blue-600">
                        <Check className="w-4 h-4 text-blue-600" />
                        <span className="text-xs">ResumeCraft</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <X className="w-4 h-4 text-slate-400" />
                        <span className="text-xs hidden sm:inline">Others</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

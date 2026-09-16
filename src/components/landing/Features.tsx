import React from 'react';
import { Eye, Zap, Sliders, FileDown, Shield, RefreshCw, Layers, CheckCircle } from 'lucide-react';

export const Features: React.FC = () => {
  const featuresList = [
    {
      icon: Eye,
      title: 'Instant Real-Time Preview',
      description: 'See every keystroke update your A4 resume sheet immediately on the right side. No waiting for re-renders or hidden delays.'
    },
    {
      icon: Shield,
      title: '99% ATS-Friendly Layouts',
      description: 'Our resumes are structured with clear semantic heading hierarchies, standard font encodings, and recruiter-friendly data tables.'
    },
    {
      icon: RefreshCw,
      title: 'Reliable Cloud & Local Auto-Save',
      description: 'Your changes are continuously stored in real time. Work comfortably without worrying about browser crashes or tab closures.'
    },
    {
      icon: FileDown,
      title: 'Direct A4 PDF & Print Export',
      description: 'Generate high-resolution vector PDFs with razor-sharp text suitable for online job portals, email attachments, or direct printing.'
    },
    {
      icon: Sliders,
      title: 'Deep Customization Controls',
      description: 'Switch typography fonts, adjust line spacing, tweak margin padding, and select tailored accent colors to match your brand.'
    },
    {
      icon: Layers,
      title: 'Flexible Modular Sections',
      description: 'Add, remove, and reorder work experience, education, skills, certifications, projects, languages, and honors in seconds.'
    }
  ];

  return (
    <section id="features-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
            Engineered for Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Everything You Need to Land Your Next Job
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Designed from the ground up for modern job seekers, career changers, and seasoned leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-5 font-bold">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

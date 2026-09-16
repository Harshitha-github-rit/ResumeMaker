import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import { TEMPLATES_LIST, TemplateMeta } from '../../data/sampleResumes';
import { TemplateId } from '../../types';
import { TemplateThumbnail } from '../templates/TemplateThumbnail';
import { TemplatePreviewModal } from '../templates/TemplatePreviewModal';
import { ArrowLeft, LayoutDashboard, Sparkles } from 'lucide-react';

export const TemplatesShowcase: React.FC = () => {
  const { currentResume, updateCustomization, setCurrentView, createNewResume } = useResume();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewModalTmpl, setPreviewModalTmpl] = useState<TemplateMeta | null>(null);

  const categories = ['All', 'Popular', 'Modern', 'Executive', 'Creative'];

  const filtered = selectedCategory === 'All'
    ? TEMPLATES_LIST
    : TEMPLATES_LIST.filter(t => t.category === selectedCategory || (selectedCategory === 'Popular' && t.badge));

  const handleUseTemplate = (templateId: TemplateId) => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign up or log in first to choose this template and build your resume', () => {
        const tmplMeta = TEMPLATES_LIST.find(t => t.id === templateId);
        const title = tmplMeta ? `My ${tmplMeta.name} Resume` : 'My Resume';
        createNewResume(templateId, title);
        setCurrentView('builder');
      });
      return;
    }
    const tmplMeta = TEMPLATES_LIST.find(t => t.id === templateId);
    const title = tmplMeta ? `My ${tmplMeta.name} Resume` : 'My Resume';
    createNewResume(templateId, title);
    setCurrentView('builder');
  };

  const handleQuickView = (t: TemplateMeta) => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign up or log in first to preview and use this template', () => {
        setPreviewModalTmpl(t);
      });
      return;
    }
    setPreviewModalTmpl(t);
  };

  return (
    <section id="templates-section" className="py-12 bg-slate-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Back / Dashboard Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/80">
          <button
            type="button"
            onClick={() => setCurrentView('landing')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          {isAuthenticated && (
            <button
              type="button"
              onClick={() => setCurrentView('dashboard')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl border border-blue-200 transition-colors cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              Go to My Resumes Dashboard
            </button>
          )}
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/80">
            Step 1: Pick Your Resume Layout
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Choose Your Resume Template
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5 max-w-xl mx-auto">
            Select any recruiter-approved design below. You can customize colors, fonts, sections, and content anytime inside the interactive builder.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* High-Fidelity Templates Thumbnail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(tmpl => {
            const activeTemplateId = currentResume?.customization?.template || 'modern';
            const isCurrentlyActive = activeTemplateId === tmpl.id;

            return (
              <TemplateThumbnail
                key={tmpl.id}
                template={tmpl}
                isActive={isCurrentlyActive}
                onSelect={handleUseTemplate}
                onQuickView={handleQuickView}
              />
            );
          })}
        </div>
      </div>

      {/* High-Resolution Full Size Inspection Modal */}
      {previewModalTmpl && (
        <TemplatePreviewModal
          template={previewModalTmpl}
          isActive={(currentResume?.customization?.template || 'modern') === previewModalTmpl.id}
          onClose={() => setPreviewModalTmpl(null)}
          onSelect={handleUseTemplate}
        />
      )}
    </section>
  );
};

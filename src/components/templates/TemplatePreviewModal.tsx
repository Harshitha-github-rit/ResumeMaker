import React from 'react';
import { TemplateMeta, TEMPLATES_LIST } from '../../data/sampleResumes';
import { TemplateId } from '../../types';
import { TemplateRenderer } from './TemplateRenderer';
import { getTemplateSampleData } from '../../data/templatePreviewData';
import { X, ChevronLeft, ChevronRight, Check, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  template: TemplateMeta | null;
  onClose: () => void;
  onSelect: (templateId: TemplateId) => void;
  isActive?: boolean;
}

export const TemplatePreviewModal: React.FC<Props> = ({
  template,
  onClose,
  onSelect,
  isActive = false
}) => {
  if (!template) return null;

  const currentIndex = TEMPLATES_LIST.findIndex(t => t.id === template.id);
  const sampleData = getTemplateSampleData(template.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (currentIndex - 1 + TEMPLATES_LIST.length) % TEMPLATES_LIST.length;
    // We can trigger select in parent if parent supports it, or just let user click
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl max-h-[92vh] bg-slate-100 rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">{template.name} Template</h2>
                  {template.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {template.badge}
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    99% ATS Score
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{template.tagline}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onSelect(template.id);
                  onClose();
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isActive ? (
                  <>
                    <Check className="w-4 h-4" />
                    Current Active Template
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Use This Template
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body: Full Scrollable Resume Sheet Preview */}
          <div className="p-4 sm:p-8 flex-1 overflow-y-auto flex justify-center items-start bg-slate-200/70">
            <div className="w-full max-w-[800px] bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden">
              <TemplateRenderer data={sampleData} />
            </div>
          </div>

          {/* Footer Bar */}
          <div className="bg-white px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
            <div>
              <strong className="text-slate-700">Recommended for:</strong> {template.recommendedFor}
            </div>
            <div className="text-[11px] text-slate-400">
              High-resolution printable A4 format • Fully ATS compliant
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

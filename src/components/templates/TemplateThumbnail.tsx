import React from 'react';
import { TemplateMeta } from '../../data/sampleResumes';
import { TemplateId } from '../../types';
import { TemplateRenderer } from './TemplateRenderer';
import { getTemplateSampleData } from '../../data/templatePreviewData';
import { Eye, Check, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface Props {
  template: TemplateMeta;
  isActive?: boolean;
  onSelect: (templateId: TemplateId) => void;
  onQuickView: (template: TemplateMeta) => void;
  compact?: boolean;
}

export const TemplateThumbnail: React.FC<Props> = ({
  template,
  isActive = false,
  onSelect,
  onQuickView,
  compact = false
}) => {
  const sampleData = getTemplateSampleData(template.id);

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
        isActive
          ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
          : 'border-slate-200/90 hover:border-blue-400 hover:shadow-xl'
      }`}
    >
      {/* Visual Resume Sheet Thumbnail Header */}
      <div
        onClick={() => onQuickView(template)}
        className="relative bg-gradient-to-b from-slate-100/90 via-slate-50 to-slate-100/70 p-4 border-b border-slate-200/80 flex items-center justify-center overflow-hidden cursor-pointer select-none"
        style={{ height: compact ? '260px' : '340px' }}
      >
        {/* Badge Pill */}
        {template.badge && (
          <span className="absolute top-3 left-3 z-10 text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-xs text-white shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            {template.badge}
          </span>
        )}

        <div className="absolute top-3 right-3 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 shadow-2xs">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          ATS 99%
        </div>

        {/* Scaled-down realistic resume page */}
        <div
          className={`bg-white rounded-md shadow-lg border border-slate-300/80 overflow-hidden relative transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-2xl ${
            compact ? 'w-[200px] h-[230px]' : 'w-[240px] h-[310px]'
          }`}
        >
          <div
            className="origin-top-left pointer-events-none select-none bg-white"
            style={{
              width: '780px',
              height: compact ? '900px' : '1010px',
              transform: compact ? 'scale(0.256)' : 'scale(0.308)'
            }}
          >
            <TemplateRenderer data={sampleData} />
          </div>

          {/* Interactive Hover Overlay with Quick View & Use buttons */}
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1.5px] opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center justify-center gap-2.5 p-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(template);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-bold shadow-md hover:bg-slate-50 flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              Quick View
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(template.id);
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              Use This Template
            </button>
          </div>
        </div>
      </div>

      {/* Template Details & Action */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {template.name}
            </h3>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
              {template.category}
            </span>
          </div>

          <p className="text-xs text-slate-600 mb-3 line-clamp-2 leading-relaxed">
            {template.tagline}
          </p>

          <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4">
            <strong className="text-slate-800 font-semibold">Best for:</strong> {template.recommendedFor}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => onQuickView(template)}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
            title="Inspect full-size preview"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onSelect(template.id)}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isActive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow-md'
            }`}
          >
            {isActive ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                Active Template
              </>
            ) : (
              <>
                Use This Template
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

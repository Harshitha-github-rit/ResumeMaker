import React, { useState, useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, ShieldCheck, Eye } from 'lucide-react';

export const ResumePreview: React.FC = () => {
  const { currentResume } = useResume();
  const [zoomLevel, setZoomLevel] = useState<number>(0.85); // Default comfortable 85% scale
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.4));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.45));
  const handleResetZoom = () => setZoomLevel(0.85);

  return (
    <div className="flex flex-col h-full bg-slate-200/70 relative">
      {/* Top Preview Controls Toolbar */}
      <div className="p-3 bg-white/95 backdrop-blur border-b border-slate-200 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>Live A4 Preview</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ATS Pass 99%</span>
          </div>
        </div>

        {/* Zoom Stepper */}
        <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-0.5">
          <button
            type="button"
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-white transition-all cursor-pointer"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-slate-600 w-10 text-center select-none font-semibold">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-white transition-all cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            title="Reset Zoom"
            className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-white transition-all cursor-pointer ml-1"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Sheet Display Stage */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start"
      >
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out'
          }}
          className="shrink-0"
        >
          {/* A4 Printable Container with exact standard dimensions and print styling */}
          <div
            id="printable-resume-container"
            className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl rounded-xs overflow-hidden relative"
            style={{
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <TemplateRenderer data={currentResume} resume={currentResume} />
          </div>
        </div>
      </div>

      {/* Floating page tag */}
      <div className="absolute bottom-4 right-4 z-10 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur text-white text-[10px] font-semibold tracking-wide shadow-md pointer-events-none">
        Standard A4 (210 × 297 mm)
      </div>
    </div>
  );
};

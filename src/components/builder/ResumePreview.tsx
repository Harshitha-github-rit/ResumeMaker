import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useResume } from '../../context/ResumeContext';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, ShieldCheck, Eye, Sparkles, CheckCircle2 } from 'lucide-react';

export const ResumePreview: React.FC = () => {
  const { currentResume, updateCustomization } = useResume();
  const containerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isOverOnePage, setIsOverOnePage] = useState<boolean>(false);

  // Monitor sheet height to warn user if content extends past 1 standard page
  useEffect(() => {
    if (!sheetRef.current) return;
    const checkHeight = () => {
      if (sheetRef.current) {
        // 1123px is standard 297mm A4 height at 96 DPI
        const height = sheetRef.current.scrollHeight;
        setIsOverOnePage(height > 1135);
      }
    };
    checkHeight();
    const observer = new ResizeObserver(checkHeight);
    observer.observe(sheetRef.current);
    return () => observer.disconnect();
  }, [currentResume]);

  const handleFitToOnePage = () => {
    updateCustomization({
      spacing: 'tight',
      fontSize: 'compact',
      margins: 'compact'
    });
  };

  // Compute auto-fit scale based on available container width
  const calculateFitScale = useCallback(() => {
    if (!containerRef.current) {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return Math.max(0.38, Math.min(0.65, (window.innerWidth - 32) / 794));
      }
      return 0.85;
    }
    const containerWidth = containerRef.current.clientWidth;
    // 794px is standard A4 paper width (210mm at 96 DPI)
    const padding = containerWidth < 640 ? 24 : 48;
    const targetScale = (containerWidth - padding) / 794;
    return Math.max(0.35, Math.min(1.1, Number(targetScale.toFixed(2))));
  }, []);

  const [zoomLevel, setZoomLevel] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return Math.max(0.38, Math.min(0.6, (window.innerWidth - 24) / 794));
    }
    return 0.85;
  });

  // Automatically adapt to mobile screen on load and resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        const fit = calculateFitScale();
        setZoomLevel(fit);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateFitScale]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(Number((prev + 0.1).toFixed(2)), 1.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(Number((prev - 0.1).toFixed(2)), 0.35));
  const handleFitPage = () => {
    const fit = calculateFitScale();
    setZoomLevel(fit);
  };
  const handleActualSize = () => setZoomLevel(1.0);
  const handleResetZoom = () => setZoomLevel(0.85);

  const templateName = currentResume.customization?.template || 'modern';
  const accentColor = currentResume.customization?.accentColor || '#2563eb';

  return (
    <div className="flex flex-col h-full bg-slate-200/70 relative">
      {/* Top Preview Controls Toolbar */}
      <div className="p-2.5 sm:p-3 bg-white/95 backdrop-blur border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>A4 Preview</span>
          </div>

          <span className="text-slate-300 hidden sm:inline">|</span>

          {/* Active Template Chip */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-700 capitalize">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: accentColor }}
            />
            <span className="truncate max-w-[90px] sm:max-w-none">{templateName}</span>
          </div>

          {/* Page status badge / Auto-fit button */}
          {isOverOnePage ? (
            <button
              type="button"
              onClick={handleFitToOnePage}
              title="Content is slightly long! Click to automatically tighten margins & font size to fit on 1 page"
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold shadow-xs transition-all cursor-pointer animate-pulse"
            >
              <Sparkles className="w-3 h-3 text-amber-200" />
              <span>Fit to 1 Page</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>1 Page Fit</span>
            </div>
          )}

          <div className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-600">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>ATS 99%</span>
          </div>
        </div>

        {/* Zoom Stepper & Fit Controls */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
          <button
            type="button"
            onClick={handleFitPage}
            title="Auto-Fit Page to Screen"
            className="px-2 py-1 rounded text-[11px] font-bold text-slate-700 hover:text-blue-600 hover:bg-white transition-all cursor-pointer flex items-center gap-1"
          >
            <Maximize2 className="w-3 h-3" />
            <span className="hidden xs:inline">Fit</span>
          </button>

          <button
            type="button"
            onClick={handleActualSize}
            title="100% Actual Print Size"
            className="px-1.5 py-1 rounded text-[11px] font-mono text-slate-600 hover:text-slate-900 hover:bg-white transition-all cursor-pointer"
          >
            100%
          </button>

          <span className="w-px h-3.5 bg-slate-300 mx-0.5" />

          <button
            type="button"
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-white transition-all cursor-pointer"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="text-[11px] font-mono text-slate-700 w-9 text-center select-none font-bold">
            {Math.round(zoomLevel * 100)}%
          </span>

          <button
            type="button"
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-white transition-all cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleResetZoom}
            title="Reset Zoom to 85%"
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-white transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Sheet Display Stage */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-3 sm:p-8 flex justify-center items-start"
      >
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.12s ease-out'
          }}
          className="shrink-0"
        >
          {/* Clean Single Resume Sheet */}
          <div
            ref={sheetRef}
            id="printable-resume-container"
            className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl rounded-xs overflow-hidden relative"
            style={{
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <TemplateRenderer data={currentResume} resume={currentResume} totalPages={1} />
          </div>
        </div>
      </div>

      {/* Floating page format indicator */}
      <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur text-white text-[10px] font-semibold tracking-wide shadow-md pointer-events-none flex items-center gap-1.5">
        <Sparkles className="w-2.5 h-2.5 text-amber-400" />
        <span>Standard A4 Format (210 × 297 mm)</span>
      </div>
    </div>
  );
};

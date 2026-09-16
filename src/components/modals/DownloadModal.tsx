import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, CheckCircle2, AlertCircle, Printer, LayoutTemplate } from 'lucide-react';
import { ResumeData } from '../../types';
import { downloadResumeAsPDF, triggerPrintResume } from '../../utils/pdfExport';
import { downloadResumeAsWord } from '../../utils/wordExport';
import confetti from 'canvas-confetti';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
}

export type ExportFormat = 'pdf' | 'word';

const TEMPLATE_NAMES: Record<string, string> = {
  modern: 'Modern (Two-Column Sidebar)',
  classic: 'Classic (Serif Formal)',
  minimal: 'Minimal (Clean Sans)',
  executive: 'Executive (Header Banner)',
  creative: 'Creative (Vibrant Sidebar)',
  professional: 'Professional (Structured Corporate)'
};

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  resume
}) => {
  const [format, setFormat] = useState<ExportFormat>('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const currentTemplate = resume?.customization?.template || 'modern';
  const templateDisplayName = TEMPLATE_NAMES[currentTemplate] || 'Modern';
  const accentColor = resume?.customization?.accentColor || '#2563eb';

  const defaultName = (resume?.personalInfo?.fullName || resume?.title || 'Resume')
    .replace(/[^a-zA-Z0-9_\-\s]/g, '')
    .trim()
    .replace(/\s+/g, '_');
  
  const [customFileName, setCustomFileName] = useState(defaultName);

  // Sync filename if resume changes
  React.useEffect(() => {
    if (resume) {
      const clean = (resume.personalInfo?.fullName || resume.title || 'Resume')
        .replace(/[^a-zA-Z0-9_\-\s]/g, '')
        .trim()
        .replace(/\s+/g, '_');
      setCustomFileName(clean);
      setIsSuccess(false);
      setErrorMessage('');
      setStatusMessage('');
    }
  }, [resume, isOpen]);

  if (!isOpen) return null;

  const handleExecuteDownload = async () => {
    try {
      setIsExporting(true);
      setErrorMessage('');
      setIsSuccess(false);

      const baseName = customFileName.trim() || 'Resume';

      if (format === 'pdf') {
        setStatusMessage(`Rendering ${templateDisplayName} PDF...`);
        const success = await downloadResumeAsPDF(
          resume,
          `${baseName}.pdf`,
          (msg) => setStatusMessage(msg)
        );

        if (success) {
          setIsSuccess(true);
          setStatusMessage('PDF downloaded successfully!');
          confetti({
            particleCount: 40,
            spread: 50,
            origin: { y: 0.6 }
          });
          setTimeout(() => {
            onClose();
          }, 500);
        } else {
          setErrorMessage('Could not complete PDF export. Please try again.');
        }
      } else {
        setStatusMessage(`Formatting ${templateDisplayName} Word document (.docx)...`);
        const success = await downloadResumeAsWord(
          resume,
          `${baseName}.docx`
        );

        if (success) {
          setIsSuccess(true);
          setStatusMessage('Word document downloaded!');
          confetti({
            particleCount: 40,
            spread: 50,
            origin: { y: 0.6 }
          });
          setTimeout(() => {
            onClose();
          }, 500);
        } else {
          setErrorMessage('Could not generate Word document. Please try again.');
        }
      }
    } catch (err: any) {
      console.error('Download execution error:', err);
      setErrorMessage(err.message || 'An error occurred while downloading.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleBrowserPrint = () => {
    triggerPrintResume();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={!isExporting ? onClose : undefined}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Download Resume</h3>
                <p className="text-xs text-slate-500">Exact template layout preserved in Word & PDF</p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isExporting}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-40"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Active Template Notice Pill */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-slate-600" />
                <span className="text-xs text-slate-600 font-medium">Active Template:</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-2xs" style={{ backgroundColor: accentColor }}>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>{templateDisplayName}</span>
              </div>
            </div>

            {/* Format Selection Cards */}
            <label className="text-xs font-bold text-slate-700 block">
              Save as Format:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1: PDF */}
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                disabled={isExporting}
                className={`p-4 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                  format === 'pdf'
                    ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-2 ring-blue-500/10'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shadow-2xs">
                    PDF
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      format === 'pdf' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                    }`}
                  >
                    {format === 'pdf' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-bold text-slate-900 text-sm">PDF Document</span>
                  </div>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-700 mb-1.5">
                    Exact Template Layout
                  </span>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Preserves colors, layout, fonts, and styling. Ideal for job applications.
                  </p>
                </div>
              </button>

              {/* Option 2: Word (.docx) */}
              <button
                type="button"
                onClick={() => setFormat('word')}
                disabled={isExporting}
                className={`p-4 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                  format === 'word'
                    ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-2 ring-blue-500/10'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shadow-2xs">
                    DOCX
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      format === 'word' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                    }`}
                  >
                    {format === 'word' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-bold text-slate-900 text-sm">Word Document</span>
                  </div>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 mb-1.5">
                    Template-Formatted (.docx)
                  </span>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Formatted in this template's exact layout for MS Word & Google Docs. Fully editable.
                  </p>
                </div>
              </button>
            </div>

            {/* File Name input */}
            <div className="pt-2">
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                File Name:
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={customFileName}
                  onChange={(e) => setCustomFileName(e.target.value)}
                  disabled={isExporting}
                  placeholder="Alex_Rivera_Resume"
                  className="w-full px-3 py-2 pr-16 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <span className="absolute right-3 text-xs font-bold text-slate-400 select-none">
                  .{format === 'pdf' ? 'pdf' : 'docx'}
                </span>
              </div>
            </div>

            {/* Browser Native Print Shortcut */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-3">
              <span>Need 100% vector printing or Save as PDF?</span>
              <button
                type="button"
                onClick={handleBrowserPrint}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Browser Print (Ctrl/Cmd+P)</span>
              </button>
            </div>

            {/* Feedback / Status */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs font-semibold text-emerald-800"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{statusMessage || 'File downloaded successfully!'}</span>
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs font-medium text-red-800"
              >
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleExecuteDownload}
              disabled={isExporting}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isExporting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{statusMessage || 'Downloading...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download as {format === 'pdf' ? 'PDF (.pdf)' : 'Word (.docx)'}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

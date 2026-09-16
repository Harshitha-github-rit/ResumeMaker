import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Globe,
  MessageSquare,
  Mail,
  Linkedin,
  Sparkles
} from 'lucide-react';
import { ResumeData } from '../../types';
import { generateResumeShareUrl } from '../../utils/shareUtils';
import confetti from 'canvas-confetti';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume?: ResumeData | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  resume
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = resume?.id ? generateResumeShareUrl(resume.id) : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOpenLink = () => {
    window.open(currentUrl, '_blank', 'noopener,noreferrer');
  };

  const shareTitle = resume?.title || 'Professional Resume';
  const shareText = `Check out ${resume?.personalInfo?.fullName ? `${resume.personalInfo.fullName}'s` : 'this'} resume on ResumeCraft: ${currentUrl}`;

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`${shareTitle} - Professional Resume`);
    const body = encodeURIComponent(`Hi,\n\nPlease check out the resume at the link below:\n\n${currentUrl}\n\nYou can view and download the high-resolution PDF or Word document directly.\n\nBest regards`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        {/* Modal Card */}
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
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Share Public Link</h3>
                <p className="text-xs text-slate-500">Anyone with this link can view and download this resume</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Target Details preview */}
            {resume && (
              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
                <div className="truncate mr-2">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {resume.title}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {resume.personalInfo?.fullName || 'Untitled'} • {resume.personalInfo?.professionalTitle || 'Professional'}
                  </div>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Public View Active
                </span>
              </div>
            )}

            {/* Public Link Box */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Public Share URL:
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 relative flex items-center">
                  <input
                    type="text"
                    readOnly
                    value={currentUrl}
                    onFocus={(e) => e.target.select()}
                    className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-800 select-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                <Globe className="w-3 h-3 text-emerald-600" />
                <span>Anyone opening this link can view the resume directly on phone or laptop without creating an account.</span>
              </p>
            </div>

            {/* Quick Share Buttons */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Quick Share via:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmailShare}
                  className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 text-blue-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Email</span>
                </button>

                <button
                  type="button"
                  onClick={handleLinkedInShare}
                  className="p-2.5 rounded-xl border border-sky-200 bg-sky-50/50 hover:bg-sky-100/60 text-sky-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-600" />
                  <span>LinkedIn</span>
                </button>
              </div>
            </div>

            {/* Test Link Button */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Want to preview what others see?</span>
              <button
                type="button"
                onClick={handleOpenLink}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              >
                <span>Test Link in New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/70 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

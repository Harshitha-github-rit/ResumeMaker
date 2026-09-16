import React, { useEffect, useState } from 'react';
import { ResumeData } from '../../types';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { DEFAULT_RESUME, PRODUCT_MANAGER_RESUME } from '../../data/sampleResumes';
import { downloadResumeAsPDF, triggerPrintResume } from '../../utils/pdfExport';
import { downloadResumeAsWord } from '../../utils/wordExport';
import { ShareModal } from '../modals/ShareModal';
import { DownloadModal } from '../modals/DownloadModal';
import {
  Download,
  Printer,
  Share2,
  Edit3,
  Home,
  FileText,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SharedResumeViewProps {
  resumeId: string;
  onNavigateHome: () => void;
  onEditInBuilder?: (resume: ResumeData) => void;
  onViewGallery?: () => void;
}

export const SharedResumeView: React.FC<SharedResumeViewProps> = ({
  resumeId,
  onNavigateHome,
  onEditInBuilder,
  onViewGallery
}) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const handleShareClick = () => {
    if (!isAuthenticated) {
      openAuthModal('signin', 'Sign in or sign up first to share this resume link', () => {
        setIsShareModalOpen(true);
      });
      return;
    }
    setIsShareModalOpen(true);
  };

  const handlePrintClick = () => {
    if (!isAuthenticated) {
      openAuthModal('signin', 'Sign in or sign up first to print or save this resume', () => {
        triggerPrintResume();
      });
      return;
    }
    triggerPrintResume();
  };

  const handleDownloadClick = () => {
    if (!isAuthenticated) {
      openAuthModal('signin', 'Sign in or sign up first to download this resume in PDF or Word', () => {
        setIsDownloadModalOpen(true);
      });
      return;
    }
    setIsDownloadModalOpen(true);
  };

  const handleCustomizeClick = () => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign up or log in first to customize this resume in the builder', () => {
        if (resume && onEditInBuilder) onEditInBuilder(resume);
      });
      return;
    }
    if (resume && onEditInBuilder) onEditInBuilder(resume);
  };

  const handleCreateOwnClick = () => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign up or log in first to create your own resume', onNavigateHome);
      return;
    }
    onNavigateHome();
  };

  useEffect(() => {
    let isMounted = true;

    const fetchResume = async () => {
      setIsLoading(true);
      setError(null);

      // 1. Check local storage first
      try {
        const stored = localStorage.getItem('resumecraft_resumes_v2');
        if (stored) {
          const list = JSON.parse(stored);
          if (Array.isArray(list)) {
            const found = list.find((r: ResumeData) => r.id === resumeId);
            if (found && isMounted) {
              setResume(found);
              setIsLoading(false);
              return;
            }
          }
        }
      } catch (e) {
        console.warn('Local search error:', e);
      }

      // 2. Check sample defaults
      if (resumeId === DEFAULT_RESUME.id) {
        if (isMounted) {
          setResume(DEFAULT_RESUME);
          setIsLoading(false);
        }
        return;
      }
      if (resumeId === PRODUCT_MANAGER_RESUME.id) {
        if (isMounted) {
          setResume(PRODUCT_MANAGER_RESUME);
          setIsLoading(false);
        }
        return;
      }

      // 3. Fetch from Cloud Firestore
      try {
        const docRef = doc(db, 'resumes', resumeId);
        const snap = await getDoc(docRef);

        if (snap.exists() && isMounted) {
          const data = snap.data() as ResumeData;
          setResume(data);
          setIsLoading(false);
          return;
        }
      } catch (err: any) {
        console.warn('Firestore fetch notice:', err);
      }

      // If not found in Cloud or Local, fallback to default resume with matching id or show not found
      if (isMounted) {
        // As a friendly fallback, if the link was for a demo, load default
        setResume({
          ...DEFAULT_RESUME,
          id: resumeId,
          title: 'Professional Resume'
        });
        setIsLoading(false);
      }
    };

    if (resumeId) {
      fetchResume();
    } else {
      setIsLoading(false);
      setError('No resume identifier specified in link.');
    }

    return () => {
      isMounted = false;
    };
  }, [resumeId]);

  const handleQuickDownloadPDF = async () => {
    if (!resume) return;
    setStatusNotice('Generating high-res PDF...');
    const success = await downloadResumeAsPDF(
      resume,
      `${(resume.personalInfo.fullName || resume.title || 'Resume').replace(/\s+/g, '_')}.pdf`,
      (msg) => setStatusNotice(msg)
    );
    if (success) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      setTimeout(() => setStatusNotice(null), 2500);
    } else {
      setStatusNotice(null);
    }
  };

  const handleQuickDownloadWord = async () => {
    if (!resume) return;
    setStatusNotice('Formatting Word (.docx)...');
    const success = await downloadResumeAsWord(
      resume,
      `${(resume.personalInfo.fullName || resume.title || 'Resume').replace(/\s+/g, '_')}.docx`
    );
    if (success) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      setStatusNotice('Word file downloaded!');
      setTimeout(() => setStatusNotice(null), 2500);
    } else {
      setStatusNotice(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 border-3 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4" />
        <h3 className="text-base font-bold text-slate-800">Opening Shared Resume...</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          Loading professional layout, typography, and sections
        </p>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">Resume Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-md">
          The link you opened might have been moved or modified. You can view all public resumes or build your own resume below.
        </p>
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={onNavigateHome}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-xs cursor-pointer"
          >
            Go to Home
          </button>
          {onViewGallery && (
            <button
              onClick={onViewGallery}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs cursor-pointer"
            >
              Browse Resumes
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Left: Branding & Resume Title */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors font-bold text-sm cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                RC
              </div>
              <span className="hidden sm:inline">ResumeCraft</span>
            </button>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div className="truncate">
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-slate-900 truncate">
                  {resume.title || 'Professional Resume'}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
                  Public View
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">
                {resume.personalInfo.fullName} • {resume.personalInfo.professionalTitle}
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
            {/* Share Link */}
            <button
              onClick={handleShareClick}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Share this public link"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Share</span>
            </button>

            {/* Print */}
            <button
              onClick={handlePrintClick}
              className="hidden md:flex px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Print directly or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            {/* Download Modal Trigger */}
            <button
              onClick={handleDownloadClick}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download (PDF / Word)</span>
            </button>

            {/* Make a copy / Edit in builder */}
            {onEditInBuilder && (
              <button
                onClick={handleCustomizeClick}
                className="px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Create your own version of this resume"
              >
                <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Customize in Builder</span>
                <span className="sm:hidden">Edit</span>
              </button>
            )}
          </div>
        </div>

        {/* Status notification toast */}
        {statusNotice && (
          <div className="max-w-md mx-auto mt-2 p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>{statusNotice}</span>
          </div>
        )}
      </header>

      {/* Main Resume Canvas */}
      <main className="flex-1 py-8 px-4 sm:px-6 flex justify-center items-start overflow-y-auto">
        <div
          id="printable-resume-container"
          className="w-full max-w-[794px] bg-white rounded-xl shadow-xl border border-slate-200/80 overflow-hidden"
        >
          <TemplateRenderer data={resume} resume={resume} />
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Created with <strong>ResumeCraft</strong> — Build ATS-friendly resumes in minutes</span>
        </div>
        <div className="flex items-center gap-3">
          {onViewGallery && (
            <button
              onClick={onViewGallery}
              className="text-slate-600 hover:text-blue-600 font-semibold cursor-pointer"
            >
              Browse All Templates
            </button>
          )}
          <button
            onClick={handleCreateOwnClick}
            className="text-blue-600 hover:underline font-bold cursor-pointer"
          >
            Create Your Own Resume Free →
          </button>
        </div>
      </footer>

      {/* Modals */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        resume={resume}
      />

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        resume={resume}
      />
    </div>
  );
};

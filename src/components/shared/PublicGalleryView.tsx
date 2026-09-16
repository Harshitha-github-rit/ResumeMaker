import React, { useState } from 'react';
import { ResumeData } from '../../types';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import { TEMPLATES_LIST } from '../../data/sampleResumes';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { DownloadModal } from '../modals/DownloadModal';
import { ShareModal } from '../modals/ShareModal';
import {
  FileText,
  Search,
  Eye,
  Download,
  Share2,
  Plus,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  User as UserIcon
} from 'lucide-react';

interface PublicGalleryViewProps {
  onSelectResume: (resumeId: string) => void;
  onNavigateHome: () => void;
  onCreateNew: () => void;
}

export const PublicGalleryView: React.FC<PublicGalleryViewProps> = ({
  onSelectResume,
  onNavigateHome,
  onCreateNew
}) => {
  const { resumes } = useResume();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadTarget, setDownloadTarget] = useState<ResumeData | null>(null);
  const [shareTarget, setShareTarget] = useState<ResumeData | null>(null);

  const filtered = resumes.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.personalInfo?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.personalInfo?.professionalTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResumeClick = (resumeId: string) => {
    if (!isAuthenticated) {
      openAuthModal('signin', 'Sign in or sign up first to view and interact with this resume', () => {
        onSelectResume(resumeId);
      });
      return;
    }
    onSelectResume(resumeId);
  };

  const handleShareClick = (resume: ResumeData) => {
    if (!isAuthenticated) {
      openAuthModal('signin', 'Sign in or sign up first to share this resume link', () => {
        setShareTarget(resume);
      });
      return;
    }
    setShareTarget(resume);
  };

  const handleDownloadClick = (resume: ResumeData) => {
    if (!isAuthenticated) {
      openAuthModal('signin', 'Sign in or sign up first to download this resume in PDF or Word', () => {
        setDownloadTarget(resume);
      });
      return;
    }
    setDownloadTarget(resume);
  };

  const handleCreateNew = () => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign up or log in first to choose your template and build your resume', onCreateNew);
      return;
    }
    onCreateNew();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
              RC
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm">ResumeCraft</span>
              <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                Public Resumes
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCreateNew}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Build a Resume</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-blue-50/70 to-slate-50 py-10 px-6 border-b border-slate-200/60 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recruiter-Approved Showcase</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Published Resumes & Profiles
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Explore authentic resume designs. Sign in to view full documents, download in PDF/Word, or customize in the builder.
          </p>

          {/* Search bar */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by name, role, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-xl border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Resumes Grid */}
      <main className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-700">No resumes match your search</h3>
            <p className="text-xs text-slate-500 mt-1">Try a different keyword or create a new resume.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(resume => {
              const templateMeta = TEMPLATES_LIST.find(t => t.id === resume.customization?.template) || TEMPLATES_LIST[0];

              return (
                <div
                  key={resume.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  {/* High-Fidelity Realistic Resume Document Picture Thumbnail */}
                  <div
                    onClick={() => handleResumeClick(resume.id)}
                    className="relative bg-gradient-to-b from-slate-100/90 via-slate-50 to-slate-100/80 p-3 h-64 border-b border-slate-200 flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden group-hover:bg-blue-50/30 transition-colors"
                  >
                    {/* Header Candidate Info Pill */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
                      {resume.personalInfo.avatarUrl ? (
                        <img
                          src={resume.personalInfo.avatarUrl}
                          alt={resume.personalInfo.fullName}
                          className="w-5 h-5 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                          {(resume.personalInfo.fullName || 'U').charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-[11px] font-bold text-slate-800">
                        {templateMeta.name}
                      </span>
                    </div>

                    <span className="absolute top-3 right-3 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ATS 99%
                    </span>

                    {/* Scaled-down realistic resume document */}
                    <div className="w-[200px] h-[200px] bg-white rounded-md shadow-md border border-slate-300/80 overflow-hidden relative transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                      <div
                        className="origin-top-left pointer-events-none select-none bg-white"
                        style={{
                          width: '780px',
                          height: '780px',
                          transform: 'scale(0.256)'
                        }}
                      >
                        <TemplateRenderer data={resume} resume={resume} />
                      </div>

                      {/* Interactive Hover Overlay with View action */}
                      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResumeClick(resume.id);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-lg hover:bg-slate-50 flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-600" />
                          <span>View Resume</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => handleResumeClick(resume.id)}
                        className="font-bold text-sm text-slate-900 hover:text-blue-600 cursor-pointer truncate"
                      >
                        {resume.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">
                        {resume.personalInfo.fullName} • {resume.personalInfo.professionalTitle}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleResumeClick(resume.id)}
                        className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Resume</span>
                      </button>

                      <button
                        onClick={() => handleShareClick(resume)}
                        title="Share this link"
                        className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDownloadClick(resume)}
                        title="Download PDF or Word"
                        className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modals */}
      {downloadTarget && (
        <DownloadModal
          isOpen={!!downloadTarget}
          onClose={() => setDownloadTarget(null)}
          resume={downloadTarget}
        />
      )}

      {shareTarget && (
        <ShareModal
          isOpen={!!shareTarget}
          onClose={() => setShareTarget(null)}
          resume={shareTarget}
        />
      )}
    </div>
  );
};

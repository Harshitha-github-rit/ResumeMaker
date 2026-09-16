import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import { BuilderForm } from './BuilderForm';
import { ResumePreview } from './ResumePreview';
import { CustomizationPanel } from './CustomizationPanel';
import { TEMPLATES_LIST } from '../../data/sampleResumes';
import { printResume } from '../../utils/pdfExport';
import { DownloadModal } from '../modals/DownloadModal';
import { ShareModal } from '../modals/ShareModal';
import { TemplateId } from '../../types';
import {
  ArrowLeft,
  Sliders,
  Download,
  Printer,
  Save,
  CheckCircle2,
  Palette,
  ChevronDown,
  Edit3,
  Eye,
  FileEdit,
  Sparkles,
  FileCode,
  Upload,
  LogOut,
  Cloud,
  Check,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ResumeBuilder: React.FC = () => {
  const {
    currentResume,
    updateCurrentResume,
    updateCustomization,
    saveCurrentResume,
    setCurrentView,
    autoSaveStatus,
    isCloudSyncing
  } = useResume();
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isTemplateMenuOpen, setIsTemplateMenuOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');

  const activeTemplateId = currentResume?.customization?.template || 'modern';
  const currentTemplate = TEMPLATES_LIST.find(t => t.id === activeTemplateId) || TEMPLATES_LIST[0];

  const handleManualSave = () => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign up or log in first to save your resume to your account', () => {
        saveCurrentResume();
        confetti({ particleCount: 30, spread: 40, origin: { y: 0.7 } });
      });
      return;
    }
    saveCurrentResume();
    confetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.7 }
    });
  };

  const handleShareClick = () => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign up or log in first to generate a public share link', () => {
        setIsShareModalOpen(true);
      });
      return;
    }
    setIsShareModalOpen(true);
  };

  const handleDownloadClick = () => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign up or log in first to download your resume in PDF or Word', () => {
        setIsDownloadModalOpen(true);
      });
      return;
    }
    setIsDownloadModalOpen(true);
  };

  const handlePrintClick = () => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign up or log in first to print your resume', () => {
        printResume();
      });
      return;
    }
    printResume();
  };

  const handleJSONExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentResume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${currentResume.title.replace(/\s+/g, '_')}_backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleJSONImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.personalInfo) {
            updateCurrentResume(parsed);
            alert('Resume data imported successfully!');
          }
        } catch {
          alert('Invalid JSON file format.');
        }
      };
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      {/* Top Application Bar */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 z-30">
        
        {/* Left: Back button & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          {/* Editable Title */}
          <div className="flex items-center gap-2">
            {isEditingTitle ? (
              <input
                type="text"
                autoFocus
                value={currentResume.title}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={e => e.key === 'Enter' && setIsEditingTitle(false)}
                onChange={e => updateCurrentResume({ title: e.target.value })}
                className="text-xs sm:text-sm font-bold text-slate-900 border border-blue-500 rounded-lg px-2 py-1 focus:outline-none bg-blue-50/40"
              />
            ) : (
              <div
                onClick={() => setIsEditingTitle(true)}
                className="group flex items-center gap-1.5 cursor-pointer"
                title="Click to rename"
              >
                <h1 className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-[140px] sm:max-w-xs">
                  {currentResume.title}
                </h1>
                <Edit3 className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
            )}

            {/* Auto-save & Real Cloud Sync pill indicator */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[10px] text-slate-600 font-medium">
              {user ? (
                isCloudSyncing || autoSaveStatus === 'saving' ? (
                  <>
                    <Cloud className="w-3 h-3 text-blue-500 animate-pulse" />
                    <span className="text-blue-600 font-semibold">Saving to Cloud...</span>
                  </>
                ) : (
                  <>
                    <Cloud className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      Cloud Synced
                      <Check className="w-2.5 h-2.5 text-emerald-600" />
                    </span>
                  </>
                )
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Saved locally</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Center: Mobile Switcher Tabs */}
        <div className="md:hidden flex items-center p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setMobileTab('edit')}
            className={`px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1.5 ${
              mobileTab === 'edit' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5" />
            <span>Form</span>
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1.5 ${
              mobileTab === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>

        {/* Right: Actions Toolbar */}
        <div className="flex items-center gap-2">
          
          {/* Template Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsTemplateMenuOpen(!isTemplateMenuOpen)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Palette className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Template:</span>
              <span className="font-bold text-slate-900">{currentTemplate.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isTemplateMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  Select Template
                </p>
                <div className="space-y-1">
                  {TEMPLATES_LIST.map(tmpl => (
                    <button
                      key={tmpl.id}
                      onClick={() => {
                        updateCustomization({ template: tmpl.id });
                        setIsTemplateMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        activeTemplateId === tmpl.id
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{tmpl.name}</span>
                      {activeTemplateId === tmpl.id && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Customize Button */}
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Customize Fonts, Colors & Margins"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrintClick}
            className="hidden sm:flex p-2 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-colors items-center justify-center cursor-pointer shadow-2xs"
            title="Print Resume (Native Vector PDF)"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>

          {/* Save Button */}
          <button
            onClick={handleManualSave}
            className="hidden sm:flex p-2 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-colors items-center justify-center cursor-pointer shadow-2xs"
            title="Save Resume"
          >
            <Save className="w-3.5 h-3.5" />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShareClick}
            className="px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Get shareable public link"
          >
            <Share2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Primary Action: Download */}
          <button
            onClick={handleDownloadClick}
            className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>

          {/* Quick Sign Out button */}
          <button
            onClick={() => {
              logout();
              setCurrentView('landing');
            }}
            className="p-2 rounded-xl border border-slate-200 hover:border-red-200 text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Two-Column Body */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Column: Form Editor */}
        <div
          className={`w-full md:w-1/2 lg:w-5/12 bg-white border-r border-slate-200 overflow-y-auto p-4 sm:p-6 ${
            mobileTab === 'preview' ? 'hidden md:block' : 'block'
          }`}
        >
          <div className="max-w-2xl mx-auto">
            <BuilderForm />
          </div>
        </div>

        {/* Right Column: Live Sheet Preview */}
        <div
          className={`w-full md:w-1/2 lg:w-7/12 flex flex-col ${
            mobileTab === 'edit' ? 'hidden md:flex' : 'flex'
          }`}
        >
          <ResumePreview />
        </div>

      </div>

      {/* Customization Drawer / Panel */}
      <CustomizationPanel
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />

      {/* Download Modal with PDF & Word (.docx) formats */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        resume={currentResume}
      />

      {/* Share Public Link Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        resume={currentResume}
      />
    </div>
  );
};

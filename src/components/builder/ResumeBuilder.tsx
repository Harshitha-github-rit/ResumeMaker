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
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { AVAILABLE_FONTS, AVAILABLE_FONT_SIZES } from '../templates/templateStyles';
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
  Share2,
  Laptop,
  Type
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
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);
  const [isFontSizeMenuOpen, setIsFontSizeMenuOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'laptop' | 'edit' | 'preview'>('edit');

  const activeTemplateId = currentResume?.customization?.template || 'modern';
  const currentTemplate = TEMPLATES_LIST.find(t => t.id === activeTemplateId) || TEMPLATES_LIST[0];

  const activeFontId = currentResume?.customization?.fontFamily || 'font-jakarta';
  const currentFontDef = AVAILABLE_FONTS.find(
    f => f.id === activeFontId || (f.id === 'font-jakarta' && activeFontId === 'font-sans')
  ) || AVAILABLE_FONTS[2];

  const activeSizeId = currentResume?.customization?.fontSize || 'normal';
  const currentSizeDef = AVAILABLE_FONT_SIZES.find(s => s.id === activeSizeId) || AVAILABLE_FONT_SIZES[2];
  const currentSizeIndex = AVAILABLE_FONT_SIZES.findIndex(s => s.id === activeSizeId);
  const effectiveSizeIndex = currentSizeIndex >= 0 ? currentSizeIndex : 2;

  const handleStepFontSize = (delta: number) => {
    const nextIndex = Math.max(0, Math.min(AVAILABLE_FONT_SIZES.length - 1, effectiveSizeIndex + delta));
    updateCustomization({ fontSize: AVAILABLE_FONT_SIZES[nextIndex].id });
  };

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
            type="button"
            onClick={() => setMobileTab('laptop')}
            title="View exact laptop side-by-side format"
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg flex items-center gap-1 transition-all ${
              mobileTab === 'laptop' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Laptop className="w-3 h-3" />
            <span>Laptop</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('edit')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg flex items-center gap-1 transition-all ${
              mobileTab === 'edit' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileEdit className="w-3 h-3" />
            <span>Form</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg flex items-center gap-1 transition-all ${
              mobileTab === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
        </div>

        {/* Click outside backdrop for toolbar dropdowns */}
        {(isTemplateMenuOpen || isFontMenuOpen || isFontSizeMenuOpen) && (
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => {
              setIsTemplateMenuOpen(false);
              setIsFontMenuOpen(false);
              setIsFontSizeMenuOpen(false);
            }}
          />
        )}

        {/* Right: Actions Toolbar */}
        <div className="flex items-center gap-2">
          
          {/* Template Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsTemplateMenuOpen(!isTemplateMenuOpen);
                setIsFontMenuOpen(false);
                setIsFontSizeMenuOpen(false);
              }}
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

          {/* Font Name & Writing Style Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsFontMenuOpen(!isFontMenuOpen);
                setIsFontSizeMenuOpen(false);
                setIsTemplateMenuOpen(false);
              }}
              className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Select Font Name and Writing Style"
            >
              <Type className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden xl:inline text-slate-500">Font:</span>
              <span
                className="font-bold text-slate-900 max-w-[95px] sm:max-w-[115px] truncate"
                style={{ fontFamily: currentFontDef.fontFamilyCss }}
              >
                {currentFontDef.name.replace(/\s*\(.*\)/, '')}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isFontMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 max-h-96 overflow-y-auto">
                <div className="px-2 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Font & Writing Style
                  </p>
                  <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">
                    {AVAILABLE_FONTS.length} styles
                  </span>
                </div>
                <div className="space-y-1">
                  {AVAILABLE_FONTS.map(f => {
                    const isSelected = activeFontId === f.id ||
                      (f.id === 'font-jakarta' && (!activeFontId || activeFontId === 'font-sans'));
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => {
                          updateCustomization({ fontFamily: f.id });
                          setIsFontMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex flex-col gap-0.5 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200'
                            : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900">{f.name}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-normal">
                              {f.category}
                            </span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                          </div>
                        </div>
                        <div
                          className="text-[12px] text-slate-600 truncate mt-0.5"
                          style={{ fontFamily: f.fontFamilyCss }}
                        >
                          {f.previewText || 'Resume typography preview'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Font Size Quick Selector & Stepper */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => handleStepFontSize(-1)}
              disabled={effectiveSizeIndex === 0}
              className="px-2 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-xs font-bold cursor-pointer"
              title="Decrease Font Size (A-)"
            >
              A-
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsFontSizeMenuOpen(!isFontSizeMenuOpen);
                  setIsFontMenuOpen(false);
                  setIsTemplateMenuOpen(false);
                }}
                className="px-2 py-1 text-xs font-bold text-slate-800 hover:bg-slate-50 rounded-lg flex items-center gap-1 cursor-pointer"
                title="Select Resume Font Size"
              >
                <span>{currentSizeDef.pt}</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
              </button>

              {isFontSizeMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 border-b border-slate-100 mb-1">
                    Resume Font Size
                  </p>
                  <div className="space-y-1">
                    {AVAILABLE_FONT_SIZES.map(s => {
                      const isSelected = activeSizeId === s.id || (!activeSizeId && s.id === 'normal');
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            updateCustomization({ fontSize: s.id });
                            setIsFontSizeMenuOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 text-blue-700 font-bold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div>
                            <span className="block font-semibold">{s.label}</span>
                            <span className="text-[9.5px] text-slate-400 font-normal">{s.description}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleStepFontSize(1)}
              disabled={effectiveSizeIndex === AVAILABLE_FONT_SIZES.length - 1}
              className="px-2 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-xs font-bold cursor-pointer"
              title="Increase Font Size (A+)"
            >
              A+
            </button>
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
      <div className={`flex-1 flex relative ${mobileTab === 'laptop' ? 'overflow-x-auto' : 'overflow-hidden'}`}>
        
        {/* Left Column: Form Editor */}
        <div
          className={`bg-white border-r border-slate-200 overflow-y-auto p-4 sm:p-6 transition-all ${
            mobileTab === 'laptop'
              ? 'w-[420px] shrink-0 border-r-2 shadow-sm'
              : mobileTab === 'preview'
              ? 'hidden md:block md:w-1/2 lg:w-5/12'
              : 'w-full md:w-1/2 lg:w-5/12'
          }`}
        >
          <div className="max-w-2xl mx-auto">
            <BuilderForm />
          </div>
        </div>

        {/* Right Column: Live Sheet Preview */}
        <div
          className={`flex flex-col ${
            mobileTab === 'laptop'
              ? 'w-[794px] sm:w-auto flex-1 shrink-0'
              : mobileTab === 'edit'
              ? 'hidden md:flex md:w-1/2 lg:w-7/12'
              : 'w-full md:w-1/2 lg:w-7/12'
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

      {/* Off-screen Permanent Export Stage for Ultra-Fast Instant PDF Capture */}
      <div
        id="app-resume-export-stage"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: '-9999px',
          width: '794px',
          backgroundColor: '#ffffff',
          pointerEvents: 'none',
          zIndex: -50,
          opacity: 1
        }}
      >
        <div id="export-stage-single" style={{ width: '794px', minHeight: '1123px', backgroundColor: '#ffffff', color: '#0f172a' }}>
          <TemplateRenderer data={currentResume} resume={currentResume} totalPages={1} />
        </div>
      </div>
    </div>
  );
};

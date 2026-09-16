import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';
import { TemplateId, ResumeData } from '../../types';
import { TEMPLATES_LIST, TemplateMeta } from '../../data/sampleResumes';
import { DownloadModal } from '../modals/DownloadModal';
import { ShareModal } from '../modals/ShareModal';
import { TemplateThumbnail } from '../templates/TemplateThumbnail';
import { TemplatePreviewModal } from '../templates/TemplatePreviewModal';
import {
  LayoutDashboard,
  FileText,
  Palette,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Copy,
  Download,
  Trash2,
  Clock,
  Sparkles,
  ExternalLink,
  Search,
  CheckCircle2,
  Menu,
  X,
  Share2,
  Globe
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const {
    currentResume,
    resumes,
    selectResume,
    createNewResume,
    duplicateResume,
    deleteResume,
    setCurrentView
  } = useResume();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'my-resumes' | 'templates' | 'settings'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('modern');
  const [downloadTargetResume, setDownloadTargetResume] = useState<ResumeData | null>(null);
  const [shareTargetResume, setShareTargetResume] = useState<ResumeData | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [dashboardPreviewTmpl, setDashboardPreviewTmpl] = useState<TemplateMeta | null>(null);

  const filteredResumes = resumes.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.personalInfo.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatRelativeTime = (isoString: string): string => {
    try {
      const date = new Date(isoString);
      const diffMinutes = Math.floor((Date.now() - date.getTime()) / 60000);
      if (diffMinutes < 1) return 'Just now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return 'Recently';
    }
  };

  const handleCreateNew = () => {
    const title = newResumeTitle.trim() || 'My Professional Resume';
    createNewResume(selectedTemplate, title);
    setIsCreateModalOpen(false);
    setNewResumeTitle('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header for Sidebar */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            RC
          </div>
          <span className="font-bold text-slate-900 text-sm">Dashboard</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileSidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between shrink-0 z-30`}
      >
        <div className="space-y-6">
          {/* User Profile snippet */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user?.name || 'User'}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Alex Rivera'}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800">
                  {user?.plan || 'Pro'} Member
                </span>
              </div>
            </div>
          </div>

          {/* Nav items */}
          <nav className="space-y-1">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('my-resumes');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'my-resumes'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <div className="flex justify-between items-center w-full">
                <span>My Resumes</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
                  {resumes.length}
                </span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveTab('templates');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'templates'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Templates</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('settings');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Account Settings</span>
            </button>
          </nav>
        </div>

        {/* Logout button */}
        <div className="pt-6 border-t border-slate-100 space-y-2">
          <button
            onClick={() => setCurrentView('landing')}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Visit Landing Page</span>
          </button>

          <button
            onClick={() => {
              logout();
              setCurrentView('landing');
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {activeTab === 'dashboard' || activeTab === 'my-resumes' ? (
          <div>
            {/* Header & Welcome Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Welcome back, {user?.name?.split(' ')[0] || 'Professional'}! 👋
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Manage your tailored resumes, duplicate for specific job applications, and download instant PDFs.
                </p>
              </div>

              {/* Action: Create New Resume */}
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Create New Resume
              </button>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <p className="text-xs font-medium text-slate-500">Resumes Created</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{resumes.length}</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <p className="text-xs font-medium text-slate-500">Average ATS Score</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-black text-emerald-600">98%</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold">
                    Optimal
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <p className="text-xs font-medium text-slate-500">Active Plan</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-black text-blue-600">{user?.plan || 'Pro'}</span>
                  <span className="text-[10px] text-slate-400">Unlimited PDF Exports</span>
                </div>
              </div>
            </div>

            {/* Search and Filters Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <h2 className="text-lg font-bold text-slate-900 self-start">Saved Resumes</h2>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search resumes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>

            {/* Resumes Grid */}
            {filteredResumes.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-700">No resumes found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {searchQuery ? 'Try a different search term.' : 'Get started by creating your first resume with one of our professional templates.'}
                </p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="mt-4 px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Create Your First Resume
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResumes.map(resume => {
                  const templateMeta = TEMPLATES_LIST.find(t => t.id === resume.customization?.template) || TEMPLATES_LIST[0];

                  return (
                    <div
                      key={resume.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group"
                    >
                      {/* Card Thumbnail Preview */}
                      <div
                        onClick={() => selectResume(resume.id)}
                        className="h-44 bg-slate-50/80 border-b border-slate-100 p-4 flex flex-col items-center justify-center relative cursor-pointer group-hover:bg-blue-50/30 transition-colors"
                      >
                        <div className="w-32 h-36 bg-white rounded-md shadow-sm border border-slate-200 p-2.5 flex flex-col justify-between transform group-hover:scale-105 transition-transform duration-200">
                          <div>
                            <div className="h-1.5 w-14 rounded mb-1" style={{ backgroundColor: resume.customization?.accentColor || '#2563eb' }} />
                            <div className="h-1 w-20 bg-slate-200 rounded mb-2" />
                            <div className="space-y-1">
                              <div className="h-0.5 w-full bg-slate-100 rounded" />
                              <div className="h-0.5 w-5/6 bg-slate-100 rounded" />
                              <div className="h-0.5 w-4/6 bg-slate-100 rounded" />
                            </div>
                          </div>
                          <div className="pt-1 border-t border-slate-100 flex justify-between">
                            <span className="h-1 w-6 rounded-xs bg-slate-200" />
                            <span className="h-1 w-6 rounded-xs bg-blue-200" />
                          </div>
                        </div>

                        {/* Template pill */}
                        <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 border border-slate-200 text-slate-700 shadow-2xs">
                          {templateMeta.name} Template
                        </span>
                      </div>

                      {/* Card Details & Actions */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3
                            onClick={() => selectResume(resume.id)}
                            className="font-bold text-sm text-slate-900 hover:text-blue-600 cursor-pointer truncate"
                          >
                            {resume.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5 truncate">
                            {resume.personalInfo.fullName} • {resume.personalInfo.professionalTitle}
                          </p>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-2">
                            <Clock className="w-3 h-3" />
                            <span>Edited {formatRelativeTime(resume.updatedAt)}</span>
                          </div>
                        </div>

                        {/* Action buttons toolbar */}
                        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-1">
                          <button
                            onClick={() => selectResume(resume.id)}
                            className="flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            Edit
                          </button>

                          <button
                            onClick={() => setShareTargetResume(resume)}
                            title="Share Public Link"
                            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            <Share2 className="w-4 h-4 text-blue-600" />
                          </button>

                          <button
                            onClick={() => duplicateResume(resume.id)}
                            title="Duplicate Resume"
                            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDownloadTargetResume(resume)}
                            title="Download Resume (PDF / Word)"
                            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeleteTarget({ id: resume.id, title: resume.title })}
                            title="Delete Resume"
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : activeTab === 'templates' ? (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900">Explore Templates</h1>
              <p className="text-xs text-slate-500 mt-1">
                Choose a template to apply to your current resume or create a fresh draft.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEMPLATES_LIST.map(tmpl => (
                <TemplateThumbnail
                  key={tmpl.id}
                  template={tmpl}
                  isActive={currentResume?.customization?.template === tmpl.id}
                  onSelect={(tId) => createNewResume(tId, `My ${tmpl.name} Resume`)}
                  onQuickView={(t) => setDashboardPreviewTmpl(t)}
                  compact
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-xl bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Account Settings</h2>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  onBlur={e => updateUser({ name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  disabled
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Membership Plan</label>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="font-bold text-blue-900">{user?.plan || 'Pro'} Plan</span>
                    <p className="text-[11px] text-blue-700">Unlimited resumes & priority downloads</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-600 text-white">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal: Create New Resume */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 text-base">Create New Resume</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Resume Name</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Engineer - TechCorp"
                  value={newResumeTitle}
                  onChange={e => setNewResumeTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Choose Starting Template</label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {TEMPLATES_LIST.map(t => (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTemplate(t.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        selectedTemplate === t.id
                          ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{t.name}</span>
                        {selectedTemplate === t.id && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                      </div>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">{t.tagline}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateNew}
                  className="flex-1 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  Create Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Resume</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-700">"{deleteTarget.title}"</span>? This action cannot be undone.
            </p>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteResume(deleteTarget.id);
                  setDeleteTarget(null);
                }}
                className="flex-1 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Template Preview Modal */}
      {dashboardPreviewTmpl && (
        <TemplatePreviewModal
          template={dashboardPreviewTmpl}
          isActive={currentResume?.customization?.template === dashboardPreviewTmpl.id}
          onClose={() => setDashboardPreviewTmpl(null)}
          onSelect={(tId) => {
            createNewResume(tId, `My ${dashboardPreviewTmpl.name} Resume`);
            setDashboardPreviewTmpl(null);
          }}
        />
      )}

      {/* Format Selection & Download Modal */}
      {downloadTargetResume && (
        <DownloadModal
          isOpen={!!downloadTargetResume}
          onClose={() => setDownloadTargetResume(null)}
          resume={downloadTargetResume}
        />
      )}

      {/* Share Single Resume Modal */}
      {shareTargetResume && (
        <ShareModal
          isOpen={!!shareTargetResume}
          onClose={() => setShareTargetResume(null)}
          resume={shareTargetResume}
        />
      )}
    </div>
  );
};

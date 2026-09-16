import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Globe2,
  Trophy,
  Smile,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  RotateCcw
} from 'lucide-react';

export const BuilderForm: React.FC = () => {
  const { currentResume, updateCurrentResume, loadSampleProfile } = useResume();
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements, hobbies } = currentResume;

  // Track accordion expand state
  const [openSection, setOpenSection] = useState<string>('personal');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  // Helper for updating Personal Info
  const updatePersonal = (field: string, value: string) => {
    updateCurrentResume(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  // Work Experience Handlers
  const addExperience = () => {
    const newExp = {
      id: 'exp-' + Date.now(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '• Spearheaded initiatives resulting in increased operational velocity.\n• Collaborated with cross-functional teams to deliver key milestones.'
    };
    updateCurrentResume(prev => ({
      ...prev,
      experience: [newExp, ...(prev.experience || [])]
    }));
  };

  const updateExpItem = (id: string, field: string, value: any) => {
    updateCurrentResume(prev => ({
      ...prev,
      experience: prev.experience.map(e => (e.id === id ? { ...e, [field]: value } : e))
    }));
  };

  const removeExpItem = (id: string) => {
    updateCurrentResume(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu = {
      id: 'edu-' + Date.now(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpaOrHonors: '',
      description: ''
    };
    updateCurrentResume(prev => ({
      ...prev,
      education: [...(prev.education || []), newEdu]
    }));
  };

  const updateEduItem = (id: string, field: string, value: string) => {
    updateCurrentResume(prev => ({
      ...prev,
      education: prev.education.map(e => (e.id === id ? { ...e, [field]: value } : e))
    }));
  };

  const removeEduItem = (id: string) => {
    updateCurrentResume(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  // Skills Handlers
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Advanced');

  const addSkill = (nameToAdd?: string) => {
    const name = nameToAdd || newSkillName.trim();
    if (!name) return;
    const item = {
      id: 'sk-' + Date.now(),
      name,
      level: newSkillLevel
    };
    updateCurrentResume(prev => ({
      ...prev,
      skills: [...(prev.skills || []), item]
    }));
    setNewSkillName('');
  };

  const removeSkill = (id: string) => {
    updateCurrentResume(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  // Projects Handlers
  const addProject = () => {
    const newProj = {
      id: 'proj-' + Date.now(),
      name: '',
      role: '',
      link: '',
      technologies: '',
      description: 'Built and deployed scalable application serving target user persona.'
    };
    updateCurrentResume(prev => ({
      ...prev,
      projects: [...(prev.projects || []), newProj]
    }));
  };

  const updateProjItem = (id: string, field: string, value: string) => {
    updateCurrentResume(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, [field]: value } : p))
    }));
  };

  const removeProjItem = (id: string) => {
    updateCurrentResume(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Certifications Handlers
  const addCertification = () => {
    const newCert = {
      id: 'cert-' + Date.now(),
      name: '',
      issuer: '',
      issueDate: ''
    };
    updateCurrentResume(prev => ({
      ...prev,
      certifications: [...(prev.certifications || []), newCert]
    }));
  };

  const updateCertItem = (id: string, field: string, value: string) => {
    updateCurrentResume(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => (c.id === id ? { ...c, [field]: value } : c))
    }));
  };

  const removeCertItem = (id: string) => {
    updateCurrentResume(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
  };

  // Languages Handlers
  const addLanguage = () => {
    const newLang = {
      id: 'lang-' + Date.now(),
      name: '',
      proficiency: 'Fluent' as const
    };
    updateCurrentResume(prev => ({
      ...prev,
      languages: [...(prev.languages || []), newLang]
    }));
  };

  const updateLangItem = (id: string, field: string, value: any) => {
    updateCurrentResume(prev => ({
      ...prev,
      languages: prev.languages.map(l => (l.id === id ? { ...l, [field]: value } : l))
    }));
  };

  const removeLangItem = (id: string) => {
    updateCurrentResume(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l.id !== id)
    }));
  };

  // Achievements Handlers
  const addAchievement = () => {
    const newAch = {
      id: 'ach-' + Date.now(),
      title: '',
      organization: '',
      year: '',
      description: ''
    };
    updateCurrentResume(prev => ({
      ...prev,
      achievements: [...(prev.achievements || []), newAch]
    }));
  };

  const updateAchItem = (id: string, field: string, value: string) => {
    updateCurrentResume(prev => ({
      ...prev,
      achievements: prev.achievements.map(a => (a.id === id ? { ...a, [field]: value } : a))
    }));
  };

  const removeAchItem = (id: string) => {
    updateCurrentResume(prev => ({
      ...prev,
      achievements: prev.achievements.filter(a => a.id !== id)
    }));
  };

  // Hobbies / Interests Handlers
  const [hobbyInput, setHobbyInput] = useState('');
  const addHobby = () => {
    if (!hobbyInput.trim()) return;
    updateCurrentResume(prev => ({
      ...prev,
      hobbies: [...(prev.hobbies || []), hobbyInput.trim()]
    }));
    setHobbyInput('');
  };

  const removeHobby = (index: number) => {
    updateCurrentResume(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Quick Load Sample Data Toolbar */}
      <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="text-xs font-bold text-blue-900">Need instant inspiration?</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => loadSampleProfile('engineer')}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
          >
            Software Engineer
          </button>
          <button
            type="button"
            onClick={() => loadSampleProfile('pm')}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
          >
            Product Manager
          </button>
          {showClearConfirm ? (
            <div className="flex items-center gap-1.5 animate-in fade-in duration-150">
              <span className="text-[11px] text-red-600 font-medium">Reset all?</span>
              <button
                type="button"
                onClick={() => {
                  loadSampleProfile('blank');
                  setShowClearConfirm(false);
                }}
                className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Yes, Reset
              </button>
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="text-[11px] font-medium px-2 py-0.5 rounded text-slate-500 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="text-[11px] font-semibold px-2 py-1 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              Clear Form
            </button>
          )}
        </div>
      </div>

      {/* 1. PERSONAL INFORMATION */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('personal')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Personal Information</h3>
              <p className="text-[11px] text-slate-500">Name, title, contact details & portfolio</p>
            </div>
          </div>
          {openSection === 'personal' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'personal' && (
          <div className="p-4 pt-1 border-t border-slate-100 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={personalInfo.fullName}
                  onChange={e => updatePersonal('fullName', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Professional Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Software Engineer"
                  value={personalInfo.professionalTitle}
                  onChange={e => updatePersonal('professionalTitle', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="alex.rivera@example.com"
                  value={personalInfo.email}
                  onChange={e => updatePersonal('email', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Phone</label>
                <input
                  type="text"
                  placeholder="+1 (555) 382-9012"
                  value={personalInfo.phone}
                  onChange={e => updatePersonal('phone', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="San Francisco, CA"
                  value={personalInfo.location}
                  onChange={e => updatePersonal('location', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  placeholder="linkedin.com/in/alexrivera"
                  value={personalInfo.linkedin}
                  onChange={e => updatePersonal('linkedin', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Portfolio or Website</label>
                <input
                  type="text"
                  placeholder="alexrivera.dev"
                  value={personalInfo.portfolio}
                  onChange={e => updatePersonal('portfolio', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Profile Photo URL (Optional)</label>
              <input
                type="text"
                placeholder="https://... (Image link)"
                value={personalInfo.avatarUrl || ''}
                onChange={e => updatePersonal('avatarUrl', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. PROFESSIONAL SUMMARY */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('summary')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Professional Summary</h3>
              <p className="text-[11px] text-slate-500">Impactful 2-4 sentences highlighting core strengths</p>
            </div>
          </div>
          {openSection === 'summary' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'summary' && (
          <div className="p-4 pt-1 border-t border-slate-100 space-y-2">
            <textarea
              rows={4}
              placeholder="Results-driven Senior Engineer with 7+ years of experience..."
              value={summary}
              onChange={e => updateCurrentResume({ summary: e.target.value })}
              className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
          </div>
        )}
      </div>

      {/* 3. WORK EXPERIENCE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('experience')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Work Experience</h3>
              <p className="text-[11px] text-slate-500">{experience?.length || 0} position(s) added</p>
            </div>
          </div>
          {openSection === 'experience' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'experience' && (
          <div className="p-4 pt-1 border-t border-slate-100 space-y-4">
            {experience && experience.map((exp, idx) => (
              <div key={exp.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Position #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeExpItem(exp.id)}
                    className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                    title="Remove position"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5">Job Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Lead Full Stack Engineer"
                      value={exp.jobTitle}
                      onChange={e => updateExpItem(exp.id, 'jobTitle', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5">Company</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Tech"
                      value={exp.company}
                      onChange={e => updateExpItem(exp.id, 'company', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5">Location</label>
                    <input
                      type="text"
                      placeholder="San Francisco, CA"
                      value={exp.location}
                      onChange={e => updateExpItem(exp.id, 'location', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5">Start Date</label>
                    <input
                      type="text"
                      placeholder="e.g. 2022-03 or Mar 2022"
                      value={exp.startDate}
                      onChange={e => updateExpItem(exp.id, 'startDate', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="text-[10.5px] font-medium text-slate-600">End Date</label>
                      <label className="text-[10px] text-slate-500 flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exp.isCurrent}
                          onChange={e => updateExpItem(exp.id, 'isCurrent', e.target.checked)}
                          className="rounded text-blue-600 w-3 h-3"
                        />
                        Present
                      </label>
                    </div>
                    <input
                      type="text"
                      disabled={exp.isCurrent}
                      placeholder={exp.isCurrent ? 'Present' : 'e.g. 2024-05'}
                      value={exp.isCurrent ? 'Present' : exp.endDate}
                      onChange={e => updateExpItem(exp.id, 'endDate', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5">Responsibilities & Accomplishments</label>
                  <textarea
                    rows={3}
                    placeholder="• Spearheaded...&#10;• Increased latency by...&#10;• Mentored team..."
                    value={exp.description}
                    onChange={e => updateExpItem(exp.id, 'description', e.target.value)}
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-200 bg-white leading-relaxed font-sans"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addExperience}
              className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50/50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Experience
            </button>
          </div>
        )}
      </div>

      {/* 4. EDUCATION */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('education')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Education</h3>
              <p className="text-[11px] text-slate-500">{education?.length || 0} degree(s) added</p>
            </div>
          </div>
          {openSection === 'education' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'education' && (
          <div className="p-4 pt-1 border-t border-slate-100 space-y-4">
            {education && education.map((edu, idx) => (
              <div key={edu.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Education #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeEduItem(edu.id)}
                    className="text-slate-400 hover:text-red-600 p-1 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5">Degree & Major</label>
                    <input
                      type="text"
                      placeholder="e.g. B.S. in Computer Science"
                      value={edu.degree}
                      onChange={e => updateEduItem(edu.id, 'degree', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5">Institution / University</label>
                    <input
                      type="text"
                      placeholder="e.g. UC Berkeley"
                      value={edu.institution}
                      onChange={e => updateEduItem(edu.id, 'institution', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5">Location</label>
                    <input
                      type="text"
                      placeholder="Berkeley, CA"
                      value={edu.location}
                      onChange={e => updateEduItem(edu.id, 'location', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5">Start Date</label>
                    <input
                      type="text"
                      placeholder="2013"
                      value={edu.startDate}
                      onChange={e => updateEduItem(edu.id, 'startDate', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5">End Date</label>
                    <input
                      type="text"
                      placeholder="2017"
                      value={edu.endDate}
                      onChange={e => updateEduItem(edu.id, 'endDate', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5">GPA / Honors / Minor</label>
                  <input
                    type="text"
                    placeholder="e.g. GPA: 3.9/4.0, Magna Cum Laude"
                    value={edu.gpaOrHonors || ''}
                    onChange={e => updateEduItem(edu.id, 'gpaOrHonors', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addEducation}
              className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50/50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Education
            </button>
          </div>
        )}
      </div>

      {/* 5. SKILLS */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('skills')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Skills</h3>
              <p className="text-[11px] text-slate-500">{skills?.length || 0} skill(s) listed</p>
            </div>
          </div>
          {openSection === 'skills' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'skills' && (
          <div className="p-4 pt-1 border-t border-slate-100 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add skill (e.g. React, Python, Product Strategy)..."
                value={newSkillName}
                onChange={e => setNewSkillName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newSkillLevel}
                onChange={e => setNewSkillLevel(e.target.value as any)}
                className="px-2.5 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              <button
                type="button"
                onClick={() => addSkill()}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shrink-0"
              >
                Add Skill
              </button>
            </div>

            {/* Render Skill Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {skills && skills.map(skill => (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800"
                >
                  <span>{skill.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({skill.level})</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill.id)}
                    className="text-slate-400 hover:text-red-500 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 6. PROJECTS */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('projects')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Projects</h3>
              <p className="text-[11px] text-slate-500">{projects?.length || 0} project(s) showcased</p>
            </div>
          </div>
          {openSection === 'projects' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'projects' && (
          <div className="p-4 pt-1 border-t border-slate-100 space-y-4">
            {projects && projects.map((proj, idx) => (
              <div key={proj.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Project #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeProjItem(proj.id)}
                    className="text-slate-400 hover:text-red-600 p-1 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5">Project Name</label>
                    <input
                      type="text"
                      placeholder="e.g. PulseFlow Orchestrator"
                      value={proj.name}
                      onChange={e => updateProjItem(proj.id, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5">Role / Context</label>
                    <input
                      type="text"
                      placeholder="e.g. Lead Developer"
                      value={proj.role || ''}
                      onChange={e => updateProjItem(proj.id, 'role', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5">Technologies Used</label>
                    <input
                      type="text"
                      placeholder="e.g. React, Node.js, AWS"
                      value={proj.technologies || ''}
                      onChange={e => updateProjItem(proj.id, 'technologies', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5">Link / URL</label>
                    <input
                      type="text"
                      placeholder="e.g. github.com/user/project"
                      value={proj.link || ''}
                      onChange={e => updateProjItem(proj.id, 'link', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10.5px] font-medium text-slate-600 mb-0.5">Description & Highlights</label>
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={e => updateProjItem(proj.id, 'description', e.target.value)}
                    className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addProject}
              className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50/50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Project
            </button>
          </div>
        )}
      </div>

      {/* 7. CERTIFICATIONS */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('certifications')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Certifications</h3>
              <p className="text-[11px] text-slate-500">{certifications?.length || 0} certification(s)</p>
            </div>
          </div>
          {openSection === 'certifications' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'certifications' && (
          <div className="p-4 pt-1 border-t border-slate-100 space-y-3">
            {certifications && certifications.map((cert) => (
              <div key={cert.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Certification Name"
                  value={cert.name}
                  onChange={e => updateCertItem(cert.id, 'name', e.target.value)}
                  className="flex-2 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                />
                <input
                  type="text"
                  placeholder="Issuer (e.g. AWS)"
                  value={cert.issuer}
                  onChange={e => updateCertItem(cert.id, 'issuer', e.target.value)}
                  className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={cert.issueDate}
                  onChange={e => updateCertItem(cert.id, 'issueDate', e.target.value)}
                  className="w-20 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                />
                <button
                  type="button"
                  onClick={() => removeCertItem(cert.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addCertification}
              className="w-full py-2 border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50/50 transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Certification
            </button>
          </div>
        )}
      </div>

      {/* 8. LANGUAGES */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('languages')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Languages</h3>
              <p className="text-[11px] text-slate-500">{languages?.length || 0} language(s)</p>
            </div>
          </div>
          {openSection === 'languages' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'languages' && (
          <div className="p-4 pt-1 border-t border-slate-100 space-y-3">
            {languages && languages.map((lang) => (
              <div key={lang.id} className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Language (e.g. Spanish)"
                  value={lang.name}
                  onChange={e => updateLangItem(lang.id, 'name', e.target.value)}
                  className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                />
                <select
                  value={lang.proficiency}
                  onChange={e => updateLangItem(lang.id, 'proficiency', e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                >
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Professional">Professional</option>
                  <option value="Conversational">Conversational</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeLangItem(lang.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addLanguage}
              className="w-full py-2 border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50/50 transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Language
            </button>
          </div>
        )}
      </div>

      {/* 9. KEY ACHIEVEMENTS */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('achievements')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center font-bold">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Achievements & Awards</h3>
              <p className="text-[11px] text-slate-500">{achievements?.length || 0} achievement(s)</p>
            </div>
          </div>
          {openSection === 'achievements' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'achievements' && (
          <div className="p-4 pt-1 border-t border-slate-100 space-y-3">
            {achievements && achievements.map((ach) => (
              <div key={ach.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Award / Honor Title"
                    value={ach.title}
                    onChange={e => updateAchItem(ach.id, 'title', e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => removeAchItem(ach.id)}
                    className="ml-2 text-slate-400 hover:text-red-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Organization (e.g. IEEE)"
                    value={ach.organization || ''}
                    onChange={e => updateAchItem(ach.id, 'organization', e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={ach.year || ''}
                    onChange={e => updateAchItem(ach.id, 'year', e.target.value)}
                    className="w-20 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Brief description of impact or recognition..."
                  value={ach.description}
                  onChange={e => updateAchItem(ach.id, 'description', e.target.value)}
                  className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-white"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addAchievement}
              className="w-full py-2 border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50/50 transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Achievement
            </button>
          </div>
        )}
      </div>

      {/* 10. HOBBIES & INTERESTS */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('hobbies')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center font-bold">
              <Smile className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Hobbies & Interests</h3>
              <p className="text-[11px] text-slate-500">{hobbies?.length || 0} interest(s)</p>
            </div>
          </div>
          {openSection === 'hobbies' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSection === 'hobbies' && (
          <div className="p-4 pt-1 border-t border-slate-100 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Marathon Training, Landscape Photography..."
                value={hobbyInput}
                onChange={e => setHobbyInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addHobby();
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200"
              />
              <button
                type="button"
                onClick={addHobby}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {hobbies && hobbies.map((hobby, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-xs text-slate-700"
                >
                  <span>{hobby}</span>
                  <button
                    type="button"
                    onClick={() => removeHobby(idx)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

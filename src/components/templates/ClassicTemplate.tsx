import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { getFontFamilyClass, getFontSizeClass, getSpacingClass, getMarginPadding, formatDates } from './templateStyles';

interface Props {
  data: ResumeData;
  page?: 1 | 2;
  totalPages?: 1 | 2;
}

export const ClassicTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements, hobbies, customization } = data;
  const accent = customization.accentColor || '#1e3a8a';
  const fontClass = customization.fontFamily ? getFontFamilyClass(customization.fontFamily) : 'font-["Merriweather",serif]';
  const size = getFontSizeClass(customization.fontSize);
  const spacing = getSpacingClass(customization.spacing);
  const padding = getMarginPadding(customization.margins);

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} ${size.root} ${padding} shadow-sm box-border`}>
      {/* Header */}
      <div className="text-center pb-4 mb-4 border-b-2" style={{ borderColor: accent }}>
        {customization.showPhoto && personalInfo.avatarUrl && (
          <img
            src={personalInfo.avatarUrl}
            alt={personalInfo.fullName}
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-slate-300 shadow-2xs mb-3"
          />
        )}
        <h1 className={`${size.name} text-slate-900 tracking-tight font-serif uppercase tracking-wider`}>
          {personalInfo.fullName}
        </h1>
          <p className={`${size.title} font-medium tracking-wide mt-1 text-slate-700 italic`}>
            {personalInfo.professionalTitle}
          </p>

          {/* Contact Strip */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-600">
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.portfolio && (
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.portfolio}
              </span>
            )}
          </div>
        </div>

      <div className={spacing.sectionGap}>
        {/* Summary */}
        {summary && (
          <div>
            <h2
              className={`${size.sectionTitle} font-bold uppercase tracking-widest pb-1 mb-2 border-b text-slate-900`}
              style={{ borderColor: `${accent}40` }}
            >
              Professional Profile
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <h2
              className={`${size.sectionTitle} font-bold uppercase tracking-widest pb-1 mb-3 border-b text-slate-900`}
              style={{ borderColor: `${accent}40` }}
            >
              Professional Experience
            </h2>
            <div className={spacing.itemGap}>
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-sm">{exp.jobTitle}</h3>
                    <span className="text-xs text-slate-500 italic">
                      {formatDates(exp.startDate, exp.endDate, exp.isCurrent)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-700 font-medium mb-1.5">
                    <span style={{ color: accent }}>{exp.company}</span>
                    {exp.location && <span className="text-slate-500">{exp.location}</span>}
                  </div>
                  <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h2
              className={`${size.sectionTitle} font-bold uppercase tracking-widest pb-1 mb-2 border-b text-slate-900`}
              style={{ borderColor: `${accent}40` }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                      <p className="text-slate-700">{edu.institution} {edu.location && `— ${edu.location}`}</p>
                    </div>
                    <span className="text-slate-500 text-[11px] italic shrink-0">
                      {formatDates(edu.startDate, edu.endDate)}
                    </span>
                  </div>
                  {edu.gpaOrHonors && <p className="text-slate-600 italic mt-0.5">{edu.gpaOrHonors}</p>}
                  {edu.description && <p className="text-slate-600 mt-0.5 leading-relaxed">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h2
              className={`${size.sectionTitle} font-bold uppercase tracking-widest pb-1 mb-2 border-b text-slate-900`}
              style={{ borderColor: `${accent}40` }}
            >
              Areas of Expertise
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              {skills.map(s => `${s.name}${s.level ? ` (${s.level})` : ''}`).join(' • ')}
            </p>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div>
            <h2
              className={`${size.sectionTitle} font-bold uppercase tracking-widest pb-1 mb-2 border-b text-slate-900`}
              style={{ borderColor: `${accent}40` }}
            >
              Notable Projects
            </h2>
            <div className="space-y-3 text-xs">
              {projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <strong className="text-slate-900">{proj.name}</strong>
                    <div className="text-slate-500 italic space-x-1">
                      {proj.role && <span>{proj.role}</span>}
                      {proj.startDate && <span>({formatDates(proj.startDate, proj.endDate)})</span>}
                    </div>
                  </div>
                  {proj.link && <span className="text-blue-700 block text-[11px] font-mono">{proj.link}</span>}
                  {proj.technologies && <span className="text-slate-500 italic text-[11px] block">{proj.technologies}</span>}
                  <p className="text-slate-700 mt-0.5 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Honors & Key Achievements */}
        {achievements && achievements.length > 0 && (
          <div>
            <h2
              className={`${size.sectionTitle} font-bold uppercase tracking-widest pb-1 mb-2 border-b text-slate-900`}
              style={{ borderColor: `${accent}40` }}
            >
              Honors & Key Achievements
            </h2>
            <div className="space-y-1.5 text-xs">
              {achievements.map(ach => (
                <div key={ach.id} className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  <div>
                    <strong className="text-slate-900">{ach.title}</strong>
                    {ach.organization && <span className="text-slate-600"> — {ach.organization}</span>}
                    {ach.year && <span className="text-slate-500 italic"> ({ach.year})</span>}
                    {ach.description && <p className="text-slate-600 mt-0.5">{ach.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Languages & Hobbies Grid */}
        <div className="grid grid-cols-2 gap-6 pt-1">
          {certifications && certifications.length > 0 && (
            <div>
              <h2
                className={`${size.sectionTitle} font-bold uppercase tracking-widest pb-1 mb-2 border-b text-slate-900`}
                style={{ borderColor: `${accent}40` }}
              >
                Certifications
              </h2>
              <ul className="space-y-1 text-xs text-slate-700">
                {certifications.map(c => (
                  <li key={c.id}>
                    • <strong>{c.name}</strong> — {c.issuer} {c.issueDate && <span className="text-slate-500 italic">({c.issueDate})</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div>
              <h2
                className={`${size.sectionTitle} font-bold uppercase tracking-widest pb-1 mb-2 border-b text-slate-900`}
                style={{ borderColor: `${accent}40` }}
              >
                Languages
              </h2>
              <ul className="space-y-1 text-xs text-slate-700">
                {languages.map(l => (
                  <li key={l.id}>
                    • <strong>{l.name}</strong>: {l.proficiency}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hobbies && hobbies.length > 0 && (
            <div className="col-span-full">
              <h2
                className={`${size.sectionTitle} font-bold uppercase tracking-widest pb-1 mb-1 border-b text-slate-900`}
                style={{ borderColor: `${accent}40` }}
              >
                Interests & Activities
              </h2>
              <p className="text-xs text-slate-700 italic">
                {hobbies.join(' • ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

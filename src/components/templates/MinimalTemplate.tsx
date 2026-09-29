import React from 'react';
import { ResumeData } from '../../types';
import { getFontFamilyClass, getFontSizeClass, getSpacingClass, getMarginPadding, formatDates } from './templateStyles';

interface Props {
  data: ResumeData;
  page?: 1 | 2;
  totalPages?: 1 | 2;
}

export const MinimalTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements, hobbies, customization } = data;
  const accent = customization.accentColor || '#0f172a';
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClass(customization.fontSize);
  const spacing = getSpacingClass(customization.spacing);
  const padding = getMarginPadding(customization.margins);

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${size.root} ${padding} shadow-sm box-border`}>
      {/* Minimal Header */}
      <div className="mb-4 pb-3 border-b border-slate-100 flex items-start justify-between gap-4">
        <div>
          <h1 className={`${size.name} font-light text-slate-950 tracking-tight`}>
            {personalInfo.fullName}
          </h1>
          <p className="text-sm font-medium tracking-wide mt-1" style={{ color: accent }}>
            {personalInfo.professionalTitle}
          </p>

            {/* Clean Contact Line */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-xs text-slate-500 font-mono">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>/ {personalInfo.phone}</span>}
              {personalInfo.location && <span>/ {personalInfo.location}</span>}
              {personalInfo.linkedin && <span>/ {personalInfo.linkedin}</span>}
              {personalInfo.portfolio && <span>/ {personalInfo.portfolio}</span>}
            </div>
          </div>

          {customization.showPhoto && personalInfo.avatarUrl && (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className="w-16 h-16 rounded-full object-cover border border-slate-200 shrink-0"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

      <div className={spacing.sectionGap}>
        {/* Summary */}
        {summary && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">About</span>
            </div>
            <div className="col-span-9">
              <p className="text-slate-700 leading-relaxed text-xs">{summary}</p>
            </div>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="grid grid-cols-12 gap-4 pt-2">
            <div className="col-span-3">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                Experience
              </span>
            </div>
            <div className={`col-span-9 ${spacing.itemGap}`}>
              {experience.map(exp => (
                <div key={exp.id} className="group">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-900 text-xs">{exp.jobTitle}</h3>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {formatDates(exp.startDate, exp.endDate, exp.isCurrent)}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mb-1">
                    <span className="font-medium text-slate-800">{exp.company}</span>
                    {exp.location && ` • ${exp.location}`}
                  </div>
                  <div className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="grid grid-cols-12 gap-4 pt-2">
            <div className="col-span-3">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Education</span>
            </div>
            <div className="col-span-9 space-y-3">
              {education.map(edu => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                    <span className="text-[11px] font-mono text-slate-400 shrink-0">
                      {formatDates(edu.startDate, edu.endDate)}
                    </span>
                  </div>
                  <p className="text-slate-500">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                  {edu.gpaOrHonors && (
                    <p className="text-[11px] font-medium text-slate-700 mt-0.5">{edu.gpaOrHonors}</p>
                  )}
                  {edu.description && (
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="grid grid-cols-12 gap-4 pt-2">
            <div className="col-span-3">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Skills</span>
            </div>
            <div className="col-span-9">
              <div className="flex flex-wrap gap-1.5">
                {skills.map(s => (
                  <span
                    key={s.id}
                    className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[11px]"
                  >
                    {s.name}
                    {s.level && <span className="text-slate-400 ml-1">({s.level})</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="grid grid-cols-12 gap-4 pt-2">
            <div className="col-span-3">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Projects</span>
            </div>
            <div className={`col-span-9 ${spacing.itemGap}`}>
              {projects.map(proj => (
                <div key={proj.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-slate-900">{proj.name}</span>
                    <div className="text-[11px] text-slate-400 font-mono space-x-2">
                      {proj.role && <span>{proj.role}</span>}
                      {proj.startDate && <span>• {formatDates(proj.startDate, proj.endDate)}</span>}
                    </div>
                  </div>
                  {proj.link && (
                    <span className="text-[11px] text-blue-600 font-mono block">{proj.link}</span>
                  )}
                  {proj.technologies && (
                    <span className="text-[10.5px] font-mono text-slate-500 block mb-0.5">{proj.technologies}</span>
                  )}
                  <p className="text-slate-600 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Achievements */}
        {achievements && achievements.length > 0 && (
          <div className="grid grid-cols-12 gap-4 pt-2">
            <div className="col-span-3">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Honors & Awards</span>
            </div>
            <div className="col-span-9 space-y-1.5 text-xs">
              {achievements.map(ach => (
                <div key={ach.id} className="text-slate-700">
                  <span className="font-semibold text-slate-900">{ach.title}</span>
                  {ach.organization && ` — ${ach.organization}`}
                  {ach.year && ` (${ach.year})`}
                  {ach.description && <span className="text-slate-600">: {ach.description}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Languages */}
        {((certifications && certifications.length > 0) || (languages && languages.length > 0)) && (
          <div className="grid grid-cols-12 gap-4 pt-2">
            <div className="col-span-3">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Credentials</span>
            </div>
            <div className="col-span-9 grid grid-cols-2 gap-4 text-xs text-slate-600">
              {certifications && certifications.length > 0 && (
                <div>
                  <strong className="text-slate-800 block mb-1">Certifications</strong>
                  <div className="space-y-1">
                    {certifications.map(c => (
                      <div key={c.id} className="text-[11px] leading-normal">
                        <span className="font-medium text-slate-900">{c.name}</span>
                        <span className="text-slate-500"> — {c.issuer} {c.issueDate && `(${c.issueDate})`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {languages && languages.length > 0 && (
                <div>
                  <strong className="text-slate-800 block mb-1">Languages</strong>
                  <div className="space-y-1">
                    {languages.map(l => (
                      <p key={l.id} className="text-[11px] leading-normal">
                        <span className="font-medium text-slate-900">{l.name}</span>
                        <span className="text-slate-500"> — {l.proficiency}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hobbies / Interests */}
        {hobbies && hobbies.length > 0 && (
          <div className="grid grid-cols-12 gap-4 pt-2">
            <div className="col-span-3">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Interests</span>
            </div>
            <div className="col-span-9 text-xs text-slate-600">
              <p>{hobbies.join(' • ')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

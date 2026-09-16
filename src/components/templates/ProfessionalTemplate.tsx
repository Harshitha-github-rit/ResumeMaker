import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { getFontFamilyClass, getFontSizeClass, getSpacingClass, getMarginPadding, formatDates } from './templateStyles';

interface Props {
  data: ResumeData;
}

export const ProfessionalTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements, customization } = data;
  const accent = customization.accentColor || '#1e293b';
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClass(customization.fontSize);
  const spacing = getSpacingClass(customization.spacing);
  const padding = getMarginPadding(customization.margins);

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${size.root} ${padding} shadow-sm min-h-[1050px]`}>
      {/* Top Professional Header */}
      <div className="border-b-2 pb-4 mb-5" style={{ borderColor: accent }}>
        <div className="flex justify-between items-end">
          <div>
            <h1 className={`${size.name} font-bold text-slate-950 tracking-tight`}>
              {personalInfo.fullName}
            </h1>
            <p className="text-sm font-semibold tracking-wide mt-0.5" style={{ color: accent }}>
              {personalInfo.professionalTitle}
            </p>
          </div>
          <div className="text-right text-xs text-slate-600 space-y-0.5">
            {personalInfo.email && (
              <div className="flex items-center justify-end gap-1.5">
                <span>{personalInfo.email}</span>
                <Mail className="w-3 h-3 text-slate-400" />
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center justify-end gap-1.5">
                <span>{personalInfo.phone}</span>
                <Phone className="w-3 h-3 text-slate-400" />
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center justify-end gap-1.5">
                <span>{personalInfo.location}</span>
                <MapPin className="w-3 h-3 text-slate-400" />
              </div>
            )}
          </div>
        </div>

        {(personalInfo.linkedin || personalInfo.portfolio) && (
          <div className="flex gap-4 mt-2 pt-2 border-t border-slate-100 text-[11.5px] text-slate-500">
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-3 h-3" /> {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.portfolio && (
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3" /> {personalInfo.portfolio}
              </span>
            )}
          </div>
        )}
      </div>

      <div className={spacing.sectionGap}>
        {/* Professional Summary */}
        {summary && (
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: accent }} />
              <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-slate-900`}>
                Professional Summary
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-justify text-xs pl-4 border-l border-slate-200">
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: accent }} />
              <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-slate-900`}>
                Professional Experience
              </h2>
            </div>
            <div className={`${spacing.itemGap} pl-4 border-l border-slate-200`}>
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-xs">{exp.jobTitle}</h3>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {formatDates(exp.startDate, exp.endDate, exp.isCurrent)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span className="font-medium" style={{ color: accent }}>{exp.company}</span>
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

        {/* Skills Grid */}
        {skills && skills.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: accent }} />
              <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-slate-900`}>
                Technical & Core Competencies
              </h2>
            </div>
            <div className="pl-4 border-l border-slate-200 flex flex-wrap gap-1.5">
              {skills.map(skill => (
                <span
                  key={skill.id}
                  className="text-xs px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 font-medium border border-slate-200"
                >
                  {skill.name}
                  {skill.level && <span className="ml-1 text-[10px] text-slate-500">({skill.level})</span>}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education & Projects Grid */}
        <div className="grid grid-cols-2 gap-6">
          {education && education.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: accent }} />
                <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-slate-900`}>
                  Education
                </h2>
              </div>
              <div className="pl-4 border-l border-slate-200 space-y-2 text-xs">
                {education.map(edu => (
                  <div key={edu.id}>
                    <p className="font-bold text-slate-900">{edu.degree}</p>
                    <p className="text-slate-600">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {formatDates(edu.startDate, edu.endDate)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects && projects.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: accent }} />
                <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-slate-900`}>
                  Key Projects
                </h2>
              </div>
              <div className="pl-4 border-l border-slate-200 space-y-2 text-xs">
                {projects.map(proj => (
                  <div key={proj.id}>
                    <p className="font-bold text-slate-900">{proj.name}</p>
                    {proj.role && <p className="text-slate-500 text-[11px]">{proj.role}</p>}
                    <p className="text-slate-600 text-[11.5px] mt-0.5">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Certifications & Languages Bar */}
        {((certifications && certifications.length > 0) || (languages && languages.length > 0)) && (
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: accent }} />
              <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-slate-900`}>
                Certifications & Languages
              </h2>
            </div>
            <div className="pl-4 border-l border-slate-200 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-700">
              {certifications && certifications.map(c => (
                <span key={c.id}>
                  <strong>{c.name}</strong> ({c.issuer})
                </span>
              ))}
              {languages && languages.map(l => (
                <span key={l.id} className="text-slate-600">
                  {l.name} [{l.proficiency}]
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe, Award, Briefcase } from 'lucide-react';
import { getFontFamilyClass, getFontFamilyCss, getFontSizeClass, getSpacingClass, getMarginPadding, formatDates } from './templateStyles';

interface Props {
  data: ResumeData;
  page?: 1 | 2;
  totalPages?: 1 | 2;
}

export const ExecutiveTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements, hobbies, customization } = data;
  const accent = customization.accentColor || '#1e293b';
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const fontCss = getFontFamilyCss(customization.fontFamily);
  const size = getFontSizeClass(customization.fontSize);
  const spacing = getSpacingClass(customization.spacing);
  const padding = getMarginPadding(customization.margins);

  return (
    <div
      className={`w-full bg-white text-slate-800 ${fontClass} ${size.root} shadow-sm box-border`}
      style={{
        fontFamily: fontCss,
        ...size.cssStyle
      }}
    >
      {/* Executive Dark/Accent Header */}
      <div className="px-6 py-5 text-white" style={{ backgroundColor: accent }}>
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            {customization.showPhoto && personalInfo.avatarUrl && (
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-lg object-cover ring-2 ring-white/40 shadow shrink-0"
              />
            )}
            <div>
              <h1 className={`${size.name} tracking-tight font-bold text-white`}>
                {personalInfo.fullName}
              </h1>
              <p className={`${size.title} font-medium tracking-wider text-slate-200 uppercase mt-1`}>
                {personalInfo.professionalTitle}
              </p>
            </div>
          </div>

            <div className={`grid grid-cols-2 gap-x-4 gap-y-1 ${size.meta} text-slate-200 shrink-0`}>
              {personalInfo.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  <span className="truncate">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  <span className="truncate">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.portfolio && (
                <div className="flex items-center gap-1.5 col-span-2">
                  <Globe className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  <span className="truncate">{personalInfo.portfolio}</span>
                </div>
              )}
            </div>
          </div>
        </div>

      {/* Main Body */}
      <div className={`${padding} ${spacing.sectionGap}`}>
        {/* Executive Summary */}
        {summary && (
          <div className="bg-slate-50 p-4 rounded-lg border-l-4" style={{ borderColor: accent }}>
            <h2 className={`${size.sectionTitle} font-bold tracking-wider text-slate-900 mb-1 uppercase`}>
              Executive Summary
            </h2>
            <p className={`text-slate-700 leading-relaxed ${size.body}`}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <h2 className={`${size.sectionTitle} font-bold tracking-wider uppercase pb-1.5 mb-3 border-b-2 flex items-center gap-2`} style={{ borderColor: accent, color: accent }}>
              <Briefcase className="w-4 h-4" />
              Leadership & Professional Experience
            </h2>
            <div className={spacing.itemGap}>
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className={`font-bold text-slate-900 ${size.itemTitle}`}>{exp.jobTitle}</h3>
                    <span className={`${size.meta} font-semibold text-slate-600 font-mono`}>
                      {formatDates(exp.startDate, exp.endDate, exp.isCurrent)}
                    </span>
                  </div>
                  <div className={`flex justify-between ${size.meta} text-slate-600 mb-1 font-medium`}>
                    <span className="text-slate-900 font-semibold">{exp.company}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  <div className={`${size.body} text-slate-700 whitespace-pre-line leading-relaxed`}>
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Strategic Initiatives / Projects */}
        {projects && projects.length > 0 && (
          <div>
            <h2 className={`${size.sectionTitle} font-bold tracking-wider uppercase pb-1.5 mb-3 border-b-2 text-slate-900`} style={{ borderColor: accent }}>
              Strategic Initiatives & Flagship Projects
            </h2>
            <div className="space-y-3">
              {projects.map(proj => (
                <div key={proj.id} className={size.body}>
                  <div className="flex justify-between items-baseline">
                    <h3 className={`font-bold text-slate-900 ${size.itemTitle}`}>{proj.name}</h3>
                    <div className={`${size.meta} text-slate-500 font-mono space-x-2`}>
                      {proj.role && <span className="font-medium text-slate-700">{proj.role}</span>}
                      {proj.startDate && <span>• {formatDates(proj.startDate, proj.endDate)}</span>}
                    </div>
                  </div>
                  {proj.link && (
                    <span className={`${size.meta} text-blue-600 font-mono block`}>{proj.link}</span>
                  )}
                  {proj.technologies && (
                    <span className={`${size.meta} font-mono text-slate-500 block mb-0.5`}>{proj.technologies}</span>
                  )}
                  <p className="text-slate-700 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <div>
            <h2 className={`${size.sectionTitle} font-bold tracking-wider uppercase pb-1.5 mb-2 border-b-2 flex items-center gap-2`} style={{ borderColor: accent, color: accent }}>
              <Award className="w-4 h-4" />
              Key Executive Achievements & Honors
            </h2>
            <div className={`grid grid-cols-2 gap-3 ${size.body}`}>
              {achievements.map(ach => (
                <div key={ach.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                  <strong className={`text-slate-900 block ${size.itemTitle}`}>{ach.title}</strong>
                  {ach.organization && <span className={`text-slate-500 ${size.meta} block`}>{ach.organization} {ach.year && `(${ach.year})`}</span>}
                  <p className="text-slate-600 mt-1">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Competencies, Education & Credentials */}
        <div className="grid grid-cols-12 gap-6 pt-2">
          {/* Skills Column */}
          <div className="col-span-7 space-y-4">
            <div>
              <h2 className={`${size.sectionTitle} font-bold tracking-wider uppercase pb-1 mb-2 border-b text-slate-900`} style={{ borderColor: accent }}>
                Core Competencies
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(s => (
                  <span key={s.id} className={`${size.meta} px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 font-medium`}>
                    {s.name}
                    {s.level && <span className="text-[10px] text-slate-500 ml-1">({s.level})</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications if available */}
            {certifications && certifications.length > 0 && (
              <div>
                <h2 className={`${size.sectionTitle} font-bold tracking-wider uppercase pb-1 mb-2 border-b text-slate-900`} style={{ borderColor: accent }}>
                  Professional Certifications
                </h2>
                <div className={`space-y-1.5 ${size.body}`}>
                  {certifications.map(c => (
                    <div key={c.id}>
                      <span className="font-semibold text-slate-900">{c.name}</span>
                      <span className={`text-slate-500 ${size.meta}`}> — {c.issuer} {c.issueDate && `(${c.issueDate})`}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Education & Languages Column */}
          <div className="col-span-5 space-y-4">
            <div>
              <h2 className={`${size.sectionTitle} font-bold tracking-wider uppercase pb-1 mb-2 border-b text-slate-900`} style={{ borderColor: accent }}>
                Education
              </h2>
              <div className="space-y-2.5">
                {education.map(edu => (
                  <div key={edu.id} className={size.body}>
                    <p className={`font-bold text-slate-900 ${size.itemTitle}`}>{edu.degree}</p>
                    <p className="text-slate-700">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                    <span className={`${size.meta} text-slate-500 font-mono`}>{formatDates(edu.startDate, edu.endDate)}</span>
                    {edu.gpaOrHonors && (
                      <p className={`text-slate-700 font-medium mt-0.5 ${size.meta}`}>{edu.gpaOrHonors}</p>
                    )}
                    {edu.description && (
                      <p className={`text-slate-600 mt-0.5 leading-relaxed ${size.meta}`}>{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            {languages && languages.length > 0 && (
              <div>
                <h2 className={`${size.sectionTitle} font-bold tracking-wider uppercase pb-1 mb-2 border-b text-slate-900`} style={{ borderColor: accent }}>
                  Languages
                </h2>
                <div className={`space-y-1 ${size.body}`}>
                  {languages.map(l => (
                    <div key={l.id} className="flex justify-between text-slate-700">
                      <span className="font-medium text-slate-900">{l.name}</span>
                      <span className={`text-slate-500 ${size.meta}`}>{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hobbies / Interests */}
            {hobbies && hobbies.length > 0 && (
              <div>
                <h2 className={`${size.sectionTitle} font-bold tracking-wider uppercase pb-1 mb-1 border-b text-slate-900`} style={{ borderColor: accent }}>
                  Interests
                </h2>
                <p className={`${size.meta} text-slate-600 leading-normal`}>
                  {hobbies.join(' • ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

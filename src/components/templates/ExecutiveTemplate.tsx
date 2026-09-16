import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe, Award, Briefcase } from 'lucide-react';
import { getFontFamilyClass, getFontSizeClass, getSpacingClass, getMarginPadding, formatDates } from './templateStyles';

interface Props {
  data: ResumeData;
}

export const ExecutiveTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements, customization } = data;
  const accent = customization.accentColor || '#1e293b';
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClass(customization.fontSize);
  const spacing = getSpacingClass(customization.spacing);
  const padding = getMarginPadding(customization.margins);

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} ${size.root} shadow-sm min-h-[1050px]`}>
      {/* Executive Dark/Accent Header */}
      <div className="p-8 text-white" style={{ backgroundColor: accent }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            {customization.showPhoto && personalInfo.avatarUrl && (
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-lg object-cover ring-2 ring-white/40 shadow"
              />
            )}
            <div>
              <h1 className={`${size.name} tracking-tight font-bold text-white`}>
                {personalInfo.fullName}
              </h1>
              <p className="text-sm font-medium tracking-wider text-slate-200 uppercase mt-1">
                {personalInfo.professionalTitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-200">
            {personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-300" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-300" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-300" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-slate-300" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className={`${padding} ${spacing.sectionGap}`}>
        {/* Executive Summary */}
        {summary && (
          <div className="bg-slate-50 p-4 rounded border-l-4" style={{ borderColor: accent }}>
            <h2 className={`${size.sectionTitle} font-bold tracking-wider text-slate-900 mb-1 uppercase`}>
              Executive Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify text-xs">{summary}</p>
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
                    <h3 className="font-bold text-slate-900 text-sm">{exp.jobTitle}</h3>
                    <span className="text-xs font-semibold text-slate-600">
                      {formatDates(exp.startDate, exp.endDate, exp.isCurrent)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1 font-medium">
                    <span className="text-slate-900 font-semibold">{exp.company}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </div>
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
              Key Executive Achievements
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {achievements.map(ach => (
                <div key={ach.id} className="p-2.5 rounded bg-slate-50 border border-slate-200/80">
                  <strong className="text-slate-900 block">{ach.title}</strong>
                  {ach.organization && <span className="text-slate-500 text-[11px] block">{ach.organization} {ach.year && `(${ach.year})`}</span>}
                  <p className="text-slate-600 mt-1">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Competencies & Education */}
        <div className="grid grid-cols-12 gap-6 pt-2">
          <div className="col-span-7">
            <h2 className={`${size.sectionTitle} font-bold tracking-wider uppercase pb-1 mb-2 border-b text-slate-900`} style={{ borderColor: accent }}>
              Core Competencies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(s => (
                <span key={s.id} className="text-xs px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 font-medium">
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-5">
            <h2 className={`${size.sectionTitle} font-bold tracking-wider uppercase pb-1 mb-2 border-b text-slate-900`} style={{ borderColor: accent }}>
              Education & Credentials
            </h2>
            <div className="space-y-2 text-xs">
              {education.map(edu => (
                <div key={edu.id}>
                  <p className="font-bold text-slate-900">{edu.degree}</p>
                  <p className="text-slate-600">{edu.institution}</p>
                  <span className="text-[11px] text-slate-400">{formatDates(edu.startDate, edu.endDate)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

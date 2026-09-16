import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { getFontFamilyClass, getFontSizeClass, getSpacingClass, getMarginPadding, formatDates } from './templateStyles';

interface Props {
  data: ResumeData;
}

export const ClassicTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements, hobbies, customization } = data;
  const accent = customization.accentColor || '#1e3a8a';
  const fontClass = customization.fontFamily ? getFontFamilyClass(customization.fontFamily) : 'font-["Merriweather",serif]';
  const size = getFontSizeClass(customization.fontSize);
  const spacing = getSpacingClass(customization.spacing);
  const padding = getMarginPadding(customization.margins);

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} ${size.root} ${padding} shadow-sm min-h-[1050px]`}>
      {/* Centered Classic Header */}
      <div className="text-center pb-5 mb-5 border-b-2" style={{ borderColor: accent }}>
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
            <div className="space-y-2">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between items-start text-xs">
                  <div>
                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-slate-700">{edu.institution} {edu.location && `— ${edu.location}`}</p>
                    {edu.gpaOrHonors && <p className="text-slate-600 italic mt-0.5">{edu.gpaOrHonors}</p>}
                  </div>
                  <span className="text-slate-500 text-[11px] italic shrink-0">
                    {formatDates(edu.startDate, edu.endDate)}
                  </span>
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
              {skills.map(s => `${s.name} (${s.level})`).join(' • ')}
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
            <div className="space-y-2 text-xs">
              {projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between">
                    <strong className="text-slate-900">{proj.name}</strong>
                    {proj.role && <span className="text-slate-500 italic">{proj.role}</span>}
                  </div>
                  <p className="text-slate-700 mt-0.5">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Languages Grid */}
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
                    • <strong>{c.name}</strong> — {c.issuer}
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
        </div>
      </div>
    </div>
  );
};

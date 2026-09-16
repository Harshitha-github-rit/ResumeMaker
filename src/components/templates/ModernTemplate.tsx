import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, ExternalLink } from 'lucide-react';
import { getFontFamilyClass, getFontSizeClass, getSpacingClass, getMarginPadding, formatDates } from './templateStyles';

interface Props {
  data: ResumeData;
}

export const ModernTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements, hobbies, customization } = data;
  const accent = customization.accentColor || '#2563eb';
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClass(customization.fontSize);
  const spacing = getSpacingClass(customization.spacing);
  const padding = getMarginPadding(customization.margins);

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} ${size.root} ${padding} shadow-sm min-h-[1050px]`}>
      {/* Header Section */}
      <div className="border-b pb-6 mb-6" style={{ borderColor: `${accent}30` }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-5">
            {customization.showPhoto && personalInfo.avatarUrl && (
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full object-cover shadow-sm ring-2"
                style={{ ringColor: accent }}
              />
            )}
            <div>
              <h1 className={`${size.name} text-slate-900 tracking-tight`}>{personalInfo.fullName}</h1>
              <p className={`${size.title} font-medium tracking-wide mt-0.5`} style={{ color: accent }}>
                {personalInfo.professionalTitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-slate-600 text-xs md:text-right md:justify-end">
            {personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.portfolio && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" style={{ color: accent }} />
                <span>{personalInfo.portfolio}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Two Column Content Grid */}
      <div className="grid grid-cols-12 gap-7">
        {/* Main Column (8 cols) */}
        <div className={`col-span-8 ${spacing.sectionGap}`}>
          {/* Summary */}
          {summary && (
            <div>
              <h2
                className={`${size.sectionTitle} font-bold mb-2 pb-1 border-b flex items-center gap-2`}
                style={{ color: accent, borderColor: `${accent}35` }}
              >
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-slate-700 leading-relaxed text-justify">{summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <div>
              <h2
                className={`${size.sectionTitle} font-bold mb-3 pb-1 border-b`}
                style={{ color: accent, borderColor: `${accent}35` }}
              >
                WORK EXPERIENCE
              </h2>
              <div className={spacing.itemGap}>
                {experience.map(exp => (
                  <div key={exp.id} className="relative">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900">{exp.jobTitle}</h3>
                      <span className="text-xs text-slate-500 font-medium">
                        {formatDates(exp.startDate, exp.endDate, exp.isCurrent)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5">
                      <span className="font-semibold" style={{ color: accent }}>{exp.company}</span>
                      {exp.location && <span>{exp.location}</span>}
                    </div>
                    <div className="text-slate-700 whitespace-pre-line leading-relaxed text-xs">
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Projects */}
          {projects && projects.length > 0 && (
            <div>
              <h2
                className={`${size.sectionTitle} font-bold mb-3 pb-1 border-b`}
                style={{ color: accent, borderColor: `${accent}35` }}
              >
                FEATURED PROJECTS
              </h2>
              <div className={spacing.itemGap}>
                {projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        {proj.name}
                        {proj.link && <ExternalLink className="w-3 h-3 text-slate-400" />}
                      </span>
                      {proj.role && <span className="text-xs text-slate-500">{proj.role}</span>}
                    </div>
                    {proj.technologies && (
                      <p className="text-[11px] font-mono text-slate-500 mb-1">
                        Tech: {proj.technologies}
                      </p>
                    )}
                    <p className="text-slate-700 text-xs leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Achievements */}
          {achievements && achievements.length > 0 && (
            <div>
              <h2
                className={`${size.sectionTitle} font-bold mb-2 pb-1 border-b`}
                style={{ color: accent, borderColor: `${accent}35` }}
              >
                KEY ACHIEVEMENTS
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {achievements.map(ach => (
                  <li key={ach.id} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: accent }} />
                    <div>
                      <strong className="text-slate-900">{ach.title}</strong>
                      {ach.organization && ` — ${ach.organization}`}
                      {ach.year && ` (${ach.year})`}: {ach.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar Column (4 cols) */}
        <div className={`col-span-4 ${spacing.sectionGap} bg-slate-50/70 p-4 rounded-lg border border-slate-100`}>
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h2
                className={`${size.sectionTitle} font-bold mb-2 pb-1 border-b`}
                style={{ color: accent, borderColor: `${accent}35` }}
              >
                CORE SKILLS
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(skill => (
                  <span
                    key={skill.id}
                    className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-white text-slate-800 border border-slate-200 shadow-2xs"
                  >
                    {skill.name}
                    {skill.level && (
                      <span className="ml-1 text-[9.5px] opacity-70">
                        • {skill.level}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <h2
                className={`${size.sectionTitle} font-bold mb-2 pb-1 border-b`}
                style={{ color: accent, borderColor: `${accent}35` }}
              >
                EDUCATION
              </h2>
              <div className="space-y-2.5">
                {education.map(edu => (
                  <div key={edu.id} className="text-xs">
                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                    <p className="font-medium text-slate-700">{edu.institution}</p>
                    <p className="text-slate-500 text-[11px]">
                      {formatDates(edu.startDate, edu.endDate)} {edu.location && `| ${edu.location}`}
                    </p>
                    {edu.gpaOrHonors && (
                      <p className="text-[11px] text-slate-600 font-medium mt-0.5">{edu.gpaOrHonors}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <h2
                className={`${size.sectionTitle} font-bold mb-2 pb-1 border-b`}
                style={{ color: accent, borderColor: `${accent}35` }}
              >
                CERTIFICATIONS
              </h2>
              <div className="space-y-2 text-xs">
                {certifications.map(cert => (
                  <div key={cert.id}>
                    <p className="font-semibold text-slate-900">{cert.name}</p>
                    <p className="text-[11px] text-slate-600">
                      {cert.issuer} {cert.issueDate && `(${cert.issueDate})`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div>
              <h2
                className={`${size.sectionTitle} font-bold mb-2 pb-1 border-b`}
                style={{ color: accent, borderColor: `${accent}35` }}
              >
                LANGUAGES
              </h2>
              <div className="space-y-1 text-xs">
                {languages.map(lang => (
                  <div key={lang.id} className="flex justify-between text-slate-700">
                    <span className="font-medium text-slate-900">{lang.name}</span>
                    <span className="text-slate-500 text-[11px]">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {hobbies && hobbies.length > 0 && (
            <div>
              <h2
                className={`${size.sectionTitle} font-bold mb-2 pb-1 border-b`}
                style={{ color: accent, borderColor: `${accent}35` }}
              >
                INTERESTS
              </h2>
              <p className="text-xs text-slate-600 leading-normal">
                {hobbies.join(' • ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

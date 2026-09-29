import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { getFontFamilyClass, getFontFamilyCss, getFontSizeClass, getSpacingClass, getMarginPadding, formatDates } from './templateStyles';

interface Props {
  data: ResumeData;
  page?: 1 | 2;
  totalPages?: 1 | 2;
}

export const ProfessionalTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements, hobbies, customization } = data;
  const accent = customization.accentColor || '#1e293b';
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const fontCss = getFontFamilyCss(customization.fontFamily);
  const size = getFontSizeClass(customization.fontSize);
  const spacing = getSpacingClass(customization.spacing);
  const padding = getMarginPadding(customization.margins);

  return (
    <div
      className={`w-full bg-white text-slate-900 ${fontClass} ${size.root} ${padding} shadow-sm box-border`}
      style={{
        fontFamily: fontCss,
        ...size.cssStyle
      }}
    >
      {/* Top Header */}
      <div className="border-b-2 pb-3 mb-3.5" style={{ borderColor: accent }}>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            {customization.showPhoto && personalInfo.avatarUrl && (
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-md object-cover border border-slate-300 shadow-2xs shrink-0"
              />
            )}
            <div>
              <h1 className={`${size.name} font-bold text-slate-950 tracking-tight`}>
                {personalInfo.fullName}
              </h1>
              <p className={`${size.title} font-semibold tracking-wide mt-0.5`} style={{ color: accent }}>
                {personalInfo.professionalTitle}
              </p>
            </div>
          </div>

            <div className={`text-right ${size.meta} text-slate-600 space-y-0.5 shrink-0`}>
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
            <div className={`flex gap-4 mt-2 pt-2 border-t border-slate-100 ${size.meta} text-slate-500`}>
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
              <span className="w-2.5 h-2.5 rounded-2xs" style={{ backgroundColor: accent }} />
              <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-slate-900`}>
                Professional Summary
              </h2>
            </div>
            <p className={`text-slate-700 leading-relaxed text-justify ${size.body} pl-4 border-l border-slate-200`}>
              {summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-2xs" style={{ backgroundColor: accent }} />
              <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-slate-900`}>
                Professional Experience
              </h2>
            </div>
            <div className={`${spacing.itemGap} pl-4 border-l border-slate-200`}>
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className={`font-bold text-slate-900 ${size.itemTitle}`}>{exp.jobTitle}</h3>
                    <span className={`${size.meta} font-semibold text-slate-500 font-mono`}>
                      {formatDates(exp.startDate, exp.endDate, exp.isCurrent)}
                    </span>
                  </div>
                  <div className={`flex justify-between ${size.meta} text-slate-600 mb-1`}>
                    <span className="font-medium" style={{ color: accent }}>{exp.company}</span>
                    {exp.location && <span className="text-slate-500">{exp.location}</span>}
                  </div>
                  <div className={`${size.body} text-slate-700 whitespace-pre-line leading-relaxed`}>
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
              <span className="w-2.5 h-2.5 rounded-2xs" style={{ backgroundColor: accent }} />
              <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-slate-900`}>
                Technical & Core Competencies
              </h2>
            </div>
            <div className="pl-4 border-l border-slate-200 flex flex-wrap gap-1.5">
              {skills.map(skill => (
                <span
                  key={skill.id}
                  className={`${size.meta} px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 font-medium border border-slate-200`}
                >
                  {skill.name}
                  {skill.level && <span className="ml-1 opacity-70">({skill.level})</span>}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education & Projects */}
        {education && education.length > 0 && projects && projects.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-2xs" style={{ backgroundColor: accent }} />
                <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-slate-900`}>
                  Education
                </h2>
              </div>
              <div className={`pl-4 border-l border-slate-200 space-y-3 ${size.body}`}>
                {education.map(edu => (
                  <div key={edu.id}>
                    <p className={`font-bold text-slate-900 ${size.itemTitle}`}>{edu.degree}</p>
                    <p className="text-slate-600">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                    <span className={`${size.meta} text-slate-500 font-mono`}>
                      {formatDates(edu.startDate, edu.endDate)}
                    </span>
                    {edu.gpaOrHonors && (
                      <p className={`${size.meta} text-slate-700 font-medium mt-0.5`}>{edu.gpaOrHonors}</p>
                    )}
                    {edu.description && (
                      <p className={`${size.meta} text-slate-600 mt-0.5 leading-relaxed`}>{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-2xs" style={{ backgroundColor: accent }} />
                <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-slate-900`}>
                  Key Projects
                </h2>
              </div>
              <div className={`pl-4 border-l border-slate-200 space-y-2.5 ${size.body}`}>
                {projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span className={size.itemTitle}>{proj.name}</span>
                      <span className={`${size.meta} text-slate-500 font-normal font-mono`}>
                        {proj.role} {proj.startDate && `(${formatDates(proj.startDate, proj.endDate)})`}
                      </span>
                    </div>
                    {proj.link && (
                      <span className={`${size.meta} text-blue-600 font-mono block`}>{proj.link}</span>
                    )}
                    {proj.technologies && (
                      <span className={`${size.meta} font-mono text-slate-500 block`}>{proj.technologies}</span>
                    )}
                    <p className={`text-slate-600 ${size.body} mt-0.5 leading-relaxed`}>{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {education && education.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-2xs" style={{ backgroundColor: accent }} />
                  <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-slate-900`}>
                    Education
                  </h2>
                </div>
                <div className={`pl-4 border-l border-slate-200 space-y-3 ${size.body}`}>
                  {education.map(edu => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-baseline">
                        <p className={`font-bold text-slate-900 ${size.itemTitle}`}>{edu.degree}</p>
                        <span className={`${size.meta} text-slate-500 font-mono`}>
                          {formatDates(edu.startDate, edu.endDate)}
                        </span>
                      </div>
                      <p className="text-slate-600">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                      {edu.gpaOrHonors && (
                        <p className={`${size.meta} text-slate-700 font-medium mt-0.5`}>{edu.gpaOrHonors}</p>
                      )}
                      {edu.description && (
                        <p className={`${size.meta} text-slate-600 mt-0.5 leading-relaxed`}>{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projects && projects.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-2xs" style={{ backgroundColor: accent }} />
                  <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-slate-900`}>
                    Key Projects
                  </h2>
                </div>
                <div className={`pl-4 border-l border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 ${size.body}`}>
                  {projects.map(proj => (
                    <div key={proj.id} className="p-3 bg-slate-50/70 rounded border border-slate-150">
                      <div className="flex justify-between items-baseline font-bold text-slate-900 mb-0.5">
                        <span className={size.itemTitle}>{proj.name}</span>
                        <span className={`${size.meta} text-slate-500 font-normal font-mono`}>
                          {proj.role} {proj.startDate && `(${formatDates(proj.startDate, proj.endDate)})`}
                        </span>
                      </div>
                      {proj.link && (
                        <span className={`${size.meta} text-blue-600 font-mono block truncate mb-1`}>{proj.link}</span>
                      )}
                      {proj.technologies && (
                        <span className={`${size.meta} font-mono text-slate-500 block mb-1`}>{proj.technologies}</span>
                      )}
                      <p className={`text-slate-600 ${size.body} leading-relaxed`}>{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Key Achievements */}
        {achievements && achievements.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-2xs" style={{ backgroundColor: accent }} />
              <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-slate-900`}>
                Honors & Key Achievements
              </h2>
            </div>
            <div className={`pl-4 border-l border-slate-200 grid grid-cols-2 gap-2 ${size.body}`}>
              {achievements.map(ach => (
                <div key={ach.id} className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className={`font-semibold text-slate-900 block ${size.itemTitle}`}>{ach.title}</span>
                  {ach.organization && (
                    <span className={`text-slate-500 ${size.meta} block`}>{ach.organization} {ach.year && `(${ach.year})`}</span>
                  )}
                  {ach.description && <p className={`text-slate-600 ${size.meta} mt-0.5`}>{ach.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Languages & Hobbies Bar */}
        {((certifications && certifications.length > 0) || (languages && languages.length > 0) || (hobbies && hobbies.length > 0)) && (
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-2xs" style={{ backgroundColor: accent }} />
              <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-slate-900`}>
                Certifications, Languages & Interests
              </h2>
            </div>
            <div className={`pl-4 border-l border-slate-200 space-y-1.5 ${size.body} text-slate-700`}>
              {certifications && certifications.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <span className="font-semibold text-slate-900">Certifications:</span>
                  {certifications.map(c => (
                    <span key={c.id}>
                      <strong>{c.name}</strong> ({c.issuer} {c.issueDate && `• ${c.issueDate}`})
                    </span>
                  ))}
                </div>
              )}
              {languages && languages.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <span className="font-semibold text-slate-900">Languages:</span>
                  {languages.map(l => (
                    <span key={l.id} className="text-slate-600">
                      {l.name} [{l.proficiency}]
                    </span>
                  ))}
                </div>
              )}
              {hobbies && hobbies.length > 0 && (
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <span className="font-semibold text-slate-900">Interests:</span>
                  <span className="text-slate-600">{hobbies.join(' • ')}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

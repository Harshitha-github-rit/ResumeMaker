import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe, Sparkles } from 'lucide-react';
import { getFontFamilyClass, getFontFamilyCss, getFontSizeClass, getSpacingClass, getMarginPadding, formatDates } from './templateStyles';

interface Props {
  data: ResumeData;
  page?: 1 | 2;
  totalPages?: 1 | 2;
}

export const CreativeTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements, hobbies, customization } = data;
  const accent = customization.accentColor || '#7c3aed';
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const fontCss = getFontFamilyCss(customization.fontFamily);
  const size = getFontSizeClass(customization.fontSize);
  const spacing = getSpacingClass(customization.spacing);
  const padding = getMarginPadding(customization.margins);

  return (
    <div
      className={`w-full bg-white text-slate-800 ${fontClass} ${size.root} shadow-sm box-border flex`}
      style={{
        fontFamily: fontCss,
        ...size.cssStyle
      }}
    >
      {/* Creative Left Side Column */}
      <div
        className="w-[34%] text-white p-5 flex flex-col justify-between shrink-0"
        style={{
          background: `linear-gradient(180deg, ${accent} 0%, #1e1b4b 100%)`
        }}
      >
        <div className="space-y-6">
          {/* Avatar & Name */}
          <div className="text-center">
            {customization.showPhoto && personalInfo.avatarUrl ? (
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-2xl mx-auto object-cover ring-4 ring-white/30 shadow-lg mb-3"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl mx-auto bg-white/20 backdrop-blur flex items-center justify-center text-white text-2xl font-bold mb-3">
                {personalInfo.fullName.charAt(0)}
              </div>
            )}
            <h1 className={`${size.name} font-bold tracking-tight text-white`}>{personalInfo.fullName}</h1>
            <p className={`${size.title} text-purple-200 mt-0.5 font-medium`}>{personalInfo.professionalTitle}</p>
          </div>

          {/* Contact Details */}
          <div className={`space-y-2 ${size.meta} text-purple-100 border-t border-white/20 pt-4`}>
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span className="truncate">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span className="truncate">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.portfolio && (
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span className="truncate">{personalInfo.portfolio}</span>
              </div>
            )}
          </div>

          {/* Skills with Meter Badges */}
          {skills && skills.length > 0 && (
            <div className="border-t border-white/20 pt-4">
              <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-purple-200 mb-2.5`}>
                Skills & Talents
              </h2>
              <div className="space-y-2">
                {skills.map(skill => (
                  <div key={skill.id}>
                    <div className={`flex justify-between ${size.meta} mb-0.5`}>
                      <span>{skill.name}</span>
                      <span className="opacity-70 text-[9.5px]">{skill.level}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-white h-full rounded-full"
                        style={{
                          width:
                            skill.level === 'Expert'
                              ? '95%'
                              : skill.level === 'Advanced'
                              ? '80%'
                              : skill.level === 'Intermediate'
                              ? '60%'
                              : '40%'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="border-t border-white/20 pt-4">
              <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider text-purple-200 mb-2`}>
                Languages
              </h2>
              <div className={`space-y-1 ${size.meta}`}>
                {languages.map(l => (
                  <div key={l.id} className="flex justify-between">
                    <span>{l.name}</span>
                    <span className="text-purple-200">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Tag */}
        {hobbies && hobbies.length > 0 && (
          <div className={`border-t border-white/20 pt-3 ${size.meta} text-purple-200`}>
            <span className="block font-semibold mb-1">Passions</span>
            {hobbies.slice(0, 3).join(', ')}
          </div>
        )}
      </div>

      {/* Right Column: Experience, Projects, Education */}
      <div className={`w-[66%] ${padding} ${spacing.sectionGap}`}>
        {/* Summary */}
        {summary && (
          <div>
            <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider mb-1 text-slate-900 flex items-center gap-1.5`}>
              <Sparkles className="w-4 h-4" style={{ color: accent }} />
              Creative Profile
            </h2>
            <p className={`${size.body} text-slate-700 leading-relaxed text-justify`}>{summary}</p>
          </div>
        )}

        {/* Experience with Timeline */}
        {experience && experience.length > 0 && (
          <div>
            <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider mb-3 text-slate-900 pb-1 border-b`}>
              Experience
            </h2>
            <div className="relative pl-4 border-l-2 space-y-4" style={{ borderColor: `${accent}40` }}>
              {experience.map(exp => (
                <div key={exp.id} className="relative">
                  <div
                    className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 bg-white"
                    style={{ borderColor: accent }}
                  />
                  <div className="flex justify-between items-baseline">
                    <h3 className={`font-bold text-slate-900 ${size.itemTitle}`}>{exp.jobTitle}</h3>
                    <span className={`${size.meta} text-slate-500 font-medium`}>
                      {formatDates(exp.startDate, exp.endDate, exp.isCurrent)}
                    </span>
                  </div>
                  <p className={`${size.meta} font-semibold mb-1`} style={{ color: accent }}>{exp.company}</p>
                  <div className={`${size.body} text-slate-600 whitespace-pre-line leading-relaxed`}>
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div>
            <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider mb-2 text-slate-900 pb-1 border-b`}>
              Selected Work & Projects
            </h2>
            <div className={`space-y-2.5 ${size.body}`}>
              {projects.map(proj => (
                <div key={proj.id} className="p-2.5 rounded bg-slate-50 border border-slate-100">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span className={size.itemTitle}>{proj.name}</span>
                    <div className={`${size.meta} text-slate-500 font-normal space-x-1`}>
                      {proj.role && <span>{proj.role}</span>}
                      {proj.startDate && <span>• {formatDates(proj.startDate, proj.endDate)}</span>}
                    </div>
                  </div>
                  {proj.link && (
                    <span className={`${size.meta} text-purple-700 font-mono block`}>{proj.link}</span>
                  )}
                  {proj.technologies && (
                    <span className={`${size.meta} font-mono text-purple-600 block mb-0.5`}>{proj.technologies}</span>
                  )}
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider mb-2 text-slate-900 pb-1 border-b`}>
              Education
            </h2>
            <div className={`space-y-2.5 ${size.body}`}>
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-bold text-slate-900 ${size.itemTitle}`}>{edu.degree}</h3>
                      <p className="text-slate-600">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                    </div>
                    <span className={`${size.meta} text-slate-400 font-mono shrink-0`}>
                      {formatDates(edu.startDate, edu.endDate)}
                    </span>
                  </div>
                  {edu.gpaOrHonors && (
                    <p className={`${size.meta} font-medium text-purple-800 mt-0.5`}>{edu.gpaOrHonors}</p>
                  )}
                  {edu.description && (
                    <p className={`${size.meta} text-slate-600 mt-0.5 leading-relaxed`}>{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Achievements */}
        {achievements && achievements.length > 0 && (
          <div>
            <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider mb-2 text-slate-900 pb-1 border-b`}>
              Honors & Achievements
            </h2>
            <div className={`space-y-2 ${size.body}`}>
              {achievements.map(ach => (
                <div key={ach.id} className="p-2 rounded bg-purple-50/60 border border-purple-100">
                  <div className="flex justify-between items-baseline">
                    <strong className={`text-slate-900 ${size.itemTitle}`}>{ach.title}</strong>
                    {ach.year && <span className={`${size.meta} text-purple-700 font-medium`}>{ach.year}</span>}
                  </div>
                  {ach.organization && <span className={`${size.meta} text-slate-500 block`}>{ach.organization}</span>}
                  {ach.description && <p className="text-slate-600 mt-0.5">{ach.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <h2 className={`${size.sectionTitle} font-bold uppercase tracking-wider mb-2 text-slate-900 pb-1 border-b`}>
              Certifications & Badges
            </h2>
            <div className={`grid grid-cols-2 gap-2 ${size.body}`}>
              {certifications.map(c => (
                <div key={c.id} className="p-2 rounded bg-slate-50 border border-slate-100">
                  <p className={`font-semibold text-slate-900 ${size.itemTitle}`}>{c.name}</p>
                  <p className={`${size.meta} text-slate-500`}>
                    {c.issuer} {c.issueDate && `• ${c.issueDate}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

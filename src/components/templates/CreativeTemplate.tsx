import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe, Sparkles } from 'lucide-react';
import { getFontFamilyClass, getFontSizeClass, getSpacingClass, getMarginPadding, formatDates } from './templateStyles';

interface Props {
  data: ResumeData;
}

export const CreativeTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, hobbies, customization } = data;
  const accent = customization.accentColor || '#7c3aed';
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClass(customization.fontSize);
  const spacing = getSpacingClass(customization.spacing);
  const padding = getMarginPadding(customization.margins);

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} ${size.root} shadow-sm min-h-[1050px] flex`}>
      {/* Creative Left Side Column */}
      <div
        className="w-[34%] text-white p-6 flex flex-col justify-between"
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
            <h1 className="text-xl font-bold tracking-tight text-white">{personalInfo.fullName}</h1>
            <p className="text-xs text-purple-200 mt-0.5 font-medium">{personalInfo.professionalTitle}</p>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 text-xs text-purple-100 border-t border-white/20 pt-4">
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
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-200 mb-2.5">
                Skills & Talents
              </h2>
              <div className="space-y-2">
                {skills.map(skill => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-[11px] mb-0.5">
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
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-200 mb-2">
                Languages
              </h2>
              <div className="space-y-1 text-xs">
                {languages.map(l => (
                  <div key={l.id} className="flex justify-between">
                    <span>{l.name}</span>
                    <span className="text-purple-200 text-[11px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Tag */}
        {hobbies && hobbies.length > 0 && (
          <div className="border-t border-white/20 pt-3 text-[11px] text-purple-200">
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
            <p className="text-xs text-slate-700 leading-relaxed text-justify">{summary}</p>
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
                    <h3 className="font-bold text-slate-900 text-xs">{exp.jobTitle}</h3>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {formatDates(exp.startDate, exp.endDate, exp.isCurrent)}
                    </span>
                  </div>
                  <p className="text-xs font-semibold mb-1" style={{ color: accent }}>{exp.company}</p>
                  <div className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
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
            <div className="space-y-2.5 text-xs">
              {projects.map(proj => (
                <div key={proj.id} className="p-2 rounded bg-slate-50 border border-slate-100">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{proj.name}</span>
                    {proj.role && <span className="font-normal text-slate-500 text-[11px]">{proj.role}</span>}
                  </div>
                  {proj.technologies && (
                    <span className="text-[10.5px] font-mono text-purple-600 block">{proj.technologies}</span>
                  )}
                  <p className="text-slate-600 mt-0.5">{proj.description}</p>
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
            <div className="space-y-2 text-xs">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-slate-600">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {formatDates(edu.startDate, edu.endDate)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

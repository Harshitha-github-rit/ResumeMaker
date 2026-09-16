import React from 'react';
import { ResumeData } from '../../types';
import { DEFAULT_RESUME } from '../../data/sampleResumes';
import { ModernTemplate } from './ModernTemplate';
import { ClassicTemplate } from './ClassicTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { ProfessionalTemplate } from './ProfessionalTemplate';

interface Props {
  data?: ResumeData;
  resume?: ResumeData;
  className?: string;
}

export const TemplateRenderer: React.FC<Props> = ({ data, resume, className = '' }) => {
  const activeResume: ResumeData = data || resume || DEFAULT_RESUME;
  const safeCustomization = activeResume.customization || DEFAULT_RESUME.customization;
  const templateId = safeCustomization.template || 'modern';

  const renderTemplate = () => {
    switch (templateId) {
      case 'classic':
        return <ClassicTemplate data={activeResume} />;
      case 'minimal':
        return <MinimalTemplate data={activeResume} />;
      case 'executive':
        return <ExecutiveTemplate data={activeResume} />;
      case 'creative':
        return <CreativeTemplate data={activeResume} />;
      case 'professional':
        return <ProfessionalTemplate data={activeResume} />;
      case 'modern':
      default:
        return <ModernTemplate data={activeResume} />;
    }
  };

  return (
    <div className={`w-full overflow-hidden bg-white shadow-xl print:shadow-none print:w-full ${className}`}>
      {renderTemplate()}
    </div>
  );
};

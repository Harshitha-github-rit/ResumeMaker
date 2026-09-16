import { ResumeData, TemplateId } from '../types';
import { DEFAULT_RESUME, PRODUCT_MANAGER_RESUME } from './sampleResumes';

export const TEMPLATE_SAMPLE_RESUMES: Record<TemplateId, ResumeData> = {
  modern: {
    ...DEFAULT_RESUME,
    customization: {
      ...DEFAULT_RESUME.customization,
      template: 'modern',
      accentColor: '#2563eb',
      showPhoto: true,
      fontFamily: 'font-sans'
    }
  },
  executive: {
    ...PRODUCT_MANAGER_RESUME,
    personalInfo: {
      ...PRODUCT_MANAGER_RESUME.personalInfo,
      fullName: 'Marcus Vance',
      professionalTitle: 'VP of Global Operations & Strategy',
      email: 'm.vance@executive-leadership.com',
      phone: '+1 (555) 782-9910',
      location: 'New York, NY',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
    },
    customization: {
      ...PRODUCT_MANAGER_RESUME.customization,
      template: 'executive',
      accentColor: '#1e1b4b',
      showPhoto: true,
      fontFamily: 'font-inter'
    }
  },
  classic: {
    ...DEFAULT_RESUME,
    personalInfo: {
      ...DEFAULT_RESUME.personalInfo,
      fullName: 'Eleanor Vance, J.D.',
      professionalTitle: 'Senior Corporate Legal Counsel',
      email: 'eleanor.vance@lawpartners.com',
      phone: '+1 (555) 612-4401',
      location: 'Boston, MA',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'
    },
    summary: 'Distinguished Corporate Attorney with 10+ years advising Fortune 500 enterprises on complex mergers, intellectual property governance, and global regulatory compliance. Negotiated transactions valued at over $4.2B with zero compliance infractions.',
    customization: {
      ...DEFAULT_RESUME.customization,
      template: 'classic',
      accentColor: '#0f172a',
      showPhoto: false,
      fontFamily: 'font-serif'
    }
  },
  creative: {
    ...DEFAULT_RESUME,
    personalInfo: {
      ...DEFAULT_RESUME.personalInfo,
      fullName: 'Maya Lin',
      professionalTitle: 'Lead Product & Brand Designer',
      email: 'maya@designcraft.studio',
      phone: '+1 (555) 293-8822',
      location: 'San Francisco, CA',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80'
    },
    summary: 'Award-winning Product Designer with 6+ years delivering human-centered design systems, micro-interactions, and visual storytelling for hyper-growth consumer applications reaching 15M+ active users.',
    customization: {
      ...DEFAULT_RESUME.customization,
      template: 'creative',
      accentColor: '#7c3aed',
      showPhoto: true,
      fontFamily: 'font-sans'
    }
  },
  minimal: {
    ...DEFAULT_RESUME,
    personalInfo: {
      ...DEFAULT_RESUME.personalInfo,
      fullName: 'Liam Chen',
      professionalTitle: 'Lead Frontend Architect',
      email: 'liam.chen@devcore.io',
      phone: '+1 (555) 402-9931',
      location: 'Seattle, WA',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80'
    },
    summary: 'Frontend Architect prioritizing minimalist codebases, strict web performance standards, and sub-100ms render budgets. Pioneer of modular design tokens and accessible web components at enterprise scale.',
    customization: {
      ...DEFAULT_RESUME.customization,
      template: 'minimal',
      accentColor: '#18181b',
      showPhoto: true,
      fontFamily: 'font-mono'
    }
  },
  professional: {
    ...DEFAULT_RESUME,
    personalInfo: {
      ...DEFAULT_RESUME.personalInfo,
      fullName: 'Dr. David Miller',
      professionalTitle: 'Director of Healthcare Operations & Analytics',
      email: 'david.miller@healthanalytics.org',
      phone: '+1 (555) 334-1192',
      location: 'Chicago, IL',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80'
    },
    summary: 'Healthcare Operations Director with 9+ years optimizing clinical pathways, cross-facility supply chain logistics, and predictive patient analytics. Managed a $24M operational budget across 6 metropolitan health centers.',
    customization: {
      ...DEFAULT_RESUME.customization,
      template: 'professional',
      accentColor: '#0e7490',
      showPhoto: true,
      fontFamily: 'font-sans'
    }
  }
};

export const getTemplateSampleData = (templateId: TemplateId): ResumeData => {
  return TEMPLATE_SAMPLE_RESUMES[templateId] || TEMPLATE_SAMPLE_RESUMES.modern;
};

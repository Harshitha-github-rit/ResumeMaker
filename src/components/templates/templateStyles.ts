import React from 'react';
import { CustomizationSettings } from '../../types';

export interface FontDefinition {
  id: string;
  name: string;
  category: 'Handwriting' | 'Clean Sans' | 'Editorial Serif' | 'Monospace';
  fontFamilyCss: string;
  writingStyle: string;
  previewText?: string;
}

export const AVAILABLE_FONTS: FontDefinition[] = [
  // ✍️ Handwriting & Cursive Writing Styles
  {
    id: 'font-caveat',
    name: 'Caveat (Handwriting)',
    category: 'Handwriting',
    fontFamilyCss: "'Caveat', cursive",
    writingStyle: 'Authentic casual handwritten script',
    previewText: 'Innovative problem solver with passion'
  },
  {
    id: 'font-dancing',
    name: 'Dancing Script (Cursive)',
    category: 'Handwriting',
    fontFamilyCss: "'Dancing Script', cursive",
    writingStyle: 'Artistic flowing calligraphy script',
    previewText: 'Senior Creative Lead & Consultant'
  },

  // ✨ Modern Sans-Serif
  {
    id: 'font-jakarta',
    name: 'Plus Jakarta Sans',
    category: 'Clean Sans',
    fontFamilyCss: "'Plus Jakarta Sans', sans-serif",
    writingStyle: 'Modern geometric executive standard',
    previewText: 'Full Stack Engineer & Team Leader'
  },
  {
    id: 'font-inter',
    name: 'Inter',
    category: 'Clean Sans',
    fontFamilyCss: "'Inter', sans-serif",
    writingStyle: 'Clean, neutral & highly readable',
    previewText: 'Product Strategy & Operations Specialist'
  },
  {
    id: 'font-poppins',
    name: 'Poppins',
    category: 'Clean Sans',
    fontFamilyCss: "'Poppins', sans-serif",
    writingStyle: 'Geometric, friendly & high impact',
    previewText: 'Marketing Director & Growth Architect'
  },
  {
    id: 'font-outfit',
    name: 'Outfit',
    category: 'Clean Sans',
    fontFamilyCss: "'Outfit', sans-serif",
    writingStyle: 'Ultra-clean minimalist modern',
    previewText: 'Data Scientist & Quantitative Analyst'
  },
  {
    id: 'font-montserrat',
    name: 'Montserrat',
    category: 'Clean Sans',
    fontFamilyCss: "'Montserrat', sans-serif",
    writingStyle: 'Bold, structured & authoritative',
    previewText: 'Project Manager & Agile Scrum Master'
  },
  {
    id: 'font-dmsans',
    name: 'DM Sans',
    category: 'Clean Sans',
    fontFamilyCss: "'DM Sans', sans-serif",
    writingStyle: 'Refined contemporary sans',
    previewText: 'Financial Analyst & Investment Associate'
  },

  // 🏛️ Editorial & Classic Serif
  {
    id: 'font-playfair',
    name: 'Playfair Display',
    category: 'Editorial Serif',
    fontFamilyCss: "'Playfair Display', serif",
    writingStyle: 'High-end luxury & editorial prestige',
    previewText: 'Managing Director & Legal Counsel'
  },
  {
    id: 'font-merriweather',
    name: 'Merriweather',
    category: 'Editorial Serif',
    fontFamilyCss: "'Merriweather', serif",
    writingStyle: 'Formal, academic & traditional',
    previewText: 'Research Scientist & University Fellow'
  },
  {
    id: 'font-lora',
    name: 'Lora',
    category: 'Editorial Serif',
    fontFamilyCss: "'Lora', serif",
    writingStyle: 'Warm, elegant literary editorial',
    previewText: 'Senior Content Strategist & Writer'
  },
  {
    id: 'font-cormorant',
    name: 'Cormorant Garamond',
    category: 'Editorial Serif',
    fontFamilyCss: "'Cormorant Garamond', serif",
    writingStyle: 'Classic aristocratic Garamond serif',
    previewText: 'Chief Executive Officer & Board Member'
  },

  // 💻 Technical Monospace
  {
    id: 'font-mono',
    name: 'Roboto Mono',
    category: 'Monospace',
    fontFamilyCss: "'Roboto Mono', monospace",
    writingStyle: 'Technical code & developer styling',
    previewText: 'Cloud Architect & DevOps Engineer'
  }
];

export interface FontSizeDefinition {
  id: string;
  label: string;
  pt: string;
  description: string;
  scale: number;
}

export const AVAILABLE_FONT_SIZES: FontSizeDefinition[] = [
  { id: 'small', label: 'Small (10pt)', pt: '10pt', description: 'Maximum content on 1 page', scale: 0.85 },
  { id: 'compact', label: 'Compact (11pt)', pt: '11pt', description: 'Balanced single-page layout', scale: 0.92 },
  { id: 'normal', label: 'Standard (12pt)', pt: '12pt', description: 'Recommended industry standard', scale: 1.0 },
  { id: 'medium', label: 'Medium (13pt)', pt: '13pt', description: 'Comfortable reading flow', scale: 1.08 },
  { id: 'large', label: 'Large (14pt)', pt: '14pt', description: 'Prominent executive presence', scale: 1.18 },
  { id: 'xlarge', label: 'Extra Large (16pt)', pt: '16pt', description: 'Senior leadership & high visibility', scale: 1.30 }
];

export const getFontFamilyCss = (font?: string): string => {
  if (!font) return "'Plus Jakarta Sans', sans-serif";
  const found = AVAILABLE_FONTS.find(f => f.id === font);
  if (found) return found.fontFamilyCss;

  // Backward compatibility aliases
  switch (font) {
    case 'font-sans':
      return "'Plus Jakarta Sans', sans-serif";
    case 'font-serif':
      return "'Playfair Display', serif";
    case 'font-mono':
      return "'Roboto Mono', monospace";
    default:
      return "'Plus Jakarta Sans', sans-serif";
  }
};

export const getFontFamilyClass = (font?: string): string => {
  // Returns class fallback
  switch (font) {
    case 'font-caveat':
      return 'font-["Caveat",cursive]';
    case 'font-dancing':
      return 'font-["Dancing_Script",cursive]';
    case 'font-inter':
      return 'font-["Inter",sans-serif]';
    case 'font-poppins':
      return 'font-["Poppins",sans-serif]';
    case 'font-outfit':
      return 'font-["Outfit",sans-serif]';
    case 'font-montserrat':
      return 'font-["Montserrat",sans-serif]';
    case 'font-dmsans':
      return 'font-["DM_Sans",sans-serif]';
    case 'font-serif':
    case 'font-playfair':
      return 'font-["Playfair_Display",serif]';
    case 'font-merriweather':
      return 'font-["Merriweather",serif]';
    case 'font-lora':
      return 'font-["Lora",serif]';
    case 'font-cormorant':
      return 'font-["Cormorant_Garamond",serif]';
    case 'font-mono':
      return 'font-["Roboto_Mono",monospace]';
    case 'font-jakarta':
    case 'font-sans':
    default:
      return 'font-["Plus_Jakarta_Sans",sans-serif]';
  }
};

export interface FontSizeClasses {
  root: string;
  name: string;
  title: string;
  sectionTitle: string;
  itemTitle: string;
  body: string;
  meta: string;
  cssStyle: React.CSSProperties;
}

export const getFontSizeClass = (size?: string): FontSizeClasses => {
  switch (size) {
    case 'small':
      return {
        root: 'text-[11px] leading-[1.35]',
        name: 'text-[22px] font-extrabold tracking-tight',
        title: 'text-[12px] font-semibold',
        sectionTitle: 'text-[11px] font-bold tracking-wider uppercase',
        itemTitle: 'text-[11.5px] font-bold',
        body: 'text-[10.5px] leading-relaxed',
        meta: 'text-[9.5px]',
        cssStyle: {
          ['--resume-root-size' as any]: '11px',
          ['--resume-name-size' as any]: '22px',
          ['--resume-title-size' as any]: '12px',
          ['--resume-section-size' as any]: '11px',
          ['--resume-item-size' as any]: '11.5px',
          ['--resume-body-size' as any]: '10.5px',
          ['--resume-meta-size' as any]: '9.5px'
        }
      };

    case 'compact':
      return {
        root: 'text-[12px] leading-[1.4]',
        name: 'text-[24px] font-extrabold tracking-tight',
        title: 'text-[13px] font-semibold',
        sectionTitle: 'text-[12px] font-bold tracking-wider uppercase',
        itemTitle: 'text-[12.5px] font-bold',
        body: 'text-[11.5px] leading-relaxed',
        meta: 'text-[10.5px]',
        cssStyle: {
          ['--resume-root-size' as any]: '12px',
          ['--resume-name-size' as any]: '24px',
          ['--resume-title-size' as any]: '13px',
          ['--resume-section-size' as any]: '12px',
          ['--resume-item-size' as any]: '12.5px',
          ['--resume-body-size' as any]: '11.5px',
          ['--resume-meta-size' as any]: '10.5px'
        }
      };

    case 'medium':
      return {
        root: 'text-[14.5px] leading-[1.5]',
        name: 'text-[28px] font-extrabold tracking-tight',
        title: 'text-[15px] font-semibold',
        sectionTitle: 'text-[13.5px] font-bold tracking-wider uppercase',
        itemTitle: 'text-[14.5px] font-bold',
        body: 'text-[13.5px] leading-relaxed',
        meta: 'text-[12px]',
        cssStyle: {
          ['--resume-root-size' as any]: '14.5px',
          ['--resume-name-size' as any]: '28px',
          ['--resume-title-size' as any]: '15px',
          ['--resume-section-size' as any]: '13.5px',
          ['--resume-item-size' as any]: '14.5px',
          ['--resume-body-size' as any]: '13.5px',
          ['--resume-meta-size' as any]: '12px'
        }
      };

    case 'large':
      return {
        root: 'text-[16px] leading-[1.55]',
        name: 'text-[32px] font-extrabold tracking-tight',
        title: 'text-[16.5px] font-semibold',
        sectionTitle: 'text-[15px] font-bold tracking-wider uppercase',
        itemTitle: 'text-[15.5px] font-bold',
        body: 'text-[14.5px] leading-relaxed',
        meta: 'text-[13px]',
        cssStyle: {
          ['--resume-root-size' as any]: '16px',
          ['--resume-name-size' as any]: '32px',
          ['--resume-title-size' as any]: '16.5px',
          ['--resume-section-size' as any]: '15px',
          ['--resume-item-size' as any]: '15.5px',
          ['--resume-body-size' as any]: '14.5px',
          ['--resume-meta-size' as any]: '13px'
        }
      };

    case 'xlarge':
      return {
        root: 'text-[18px] leading-[1.6]',
        name: 'text-[36px] font-extrabold tracking-tight',
        title: 'text-[18px] font-semibold',
        sectionTitle: 'text-[16.5px] font-bold tracking-wider uppercase',
        itemTitle: 'text-[17px] font-bold',
        body: 'text-[16px] leading-relaxed',
        meta: 'text-[14px]',
        cssStyle: {
          ['--resume-root-size' as any]: '18px',
          ['--resume-name-size' as any]: '36px',
          ['--resume-title-size' as any]: '18px',
          ['--resume-section-size' as any]: '16.5px',
          ['--resume-item-size' as any]: '17px',
          ['--resume-body-size' as any]: '16px',
          ['--resume-meta-size' as any]: '14px'
        }
      };

    case 'normal':
    default:
      return {
        root: 'text-[13.5px] leading-[1.45]',
        name: 'text-[26px] font-extrabold tracking-tight',
        title: 'text-[14px] font-semibold',
        sectionTitle: 'text-[13px] font-bold tracking-wider uppercase',
        itemTitle: 'text-[13.5px] font-bold',
        body: 'text-[12.5px] leading-relaxed',
        meta: 'text-[11.5px]',
        cssStyle: {
          ['--resume-root-size' as any]: '13.5px',
          ['--resume-name-size' as any]: '26px',
          ['--resume-title-size' as any]: '14px',
          ['--resume-section-size' as any]: '13px',
          ['--resume-item-size' as any]: '13.5px',
          ['--resume-body-size' as any]: '12.5px',
          ['--resume-meta-size' as any]: '11.5px'
        }
      };
  }
};

export const getSpacingClass = (spacing: string): { sectionGap: string; itemGap: string } => {
  switch (spacing) {
    case 'tight':
      return { sectionGap: 'space-y-2.5', itemGap: 'space-y-1.5' };
    case 'relaxed':
      return { sectionGap: 'space-y-5', itemGap: 'space-y-3' };
    case 'normal':
    default:
      return { sectionGap: 'space-y-3.5', itemGap: 'space-y-2' };
  }
};

export const getMarginPadding = (margins: string): string => {
  switch (margins) {
    case 'compact':
      return 'p-5';
    case 'wide':
      return 'p-8';
    case 'normal':
    default:
      return 'p-6';
  }
};

export const formatDates = (start?: string, end?: string, isCurrent?: boolean): string => {
  if (!start && !end && !isCurrent) return '';
  const s = start || '';
  const e = isCurrent ? 'Present' : (end || '');
  if (s && e) return `${s} — ${e}`;
  return s || e;
};

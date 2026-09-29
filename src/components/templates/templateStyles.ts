import { CustomizationSettings } from '../../types';

export const getFontFamilyClass = (font: string): string => {
  switch (font) {
    case 'font-serif':
    case 'font-playfair':
      return 'font-["Playfair_Display",serif]';
    case 'font-merriweather':
      return 'font-["Merriweather",serif]';
    case 'font-mono':
      return 'font-["Roboto_Mono",monospace]';
    case 'font-inter':
      return 'font-["Inter",sans-serif]';
    case 'font-outfit':
      return 'font-["Outfit",sans-serif]';
    case 'font-sans':
    default:
      return 'font-["Plus_Jakarta_Sans",sans-serif]';
  }
};

export const getFontSizeClass = (size: string): { root: string; name: string; title: string; sectionTitle: string; body: string; meta: string } => {
  switch (size) {
    case 'compact':
      return {
        root: 'text-[12px] leading-snug',
        name: 'text-2xl font-extrabold tracking-tight',
        title: 'text-[13px] font-semibold',
        sectionTitle: 'text-[12px] font-bold tracking-wider uppercase',
        body: 'text-[12px] leading-normal',
        meta: 'text-[11px]'
      };
    case 'large':
      return {
        root: 'text-[15px] leading-relaxed',
        name: 'text-[30px] font-extrabold tracking-tight',
        title: 'text-base font-semibold',
        sectionTitle: 'text-[14px] font-bold tracking-wider uppercase',
        body: 'text-[14px] leading-relaxed',
        meta: 'text-[12.5px]'
      };
    case 'normal':
    default:
      return {
        root: 'text-[13.5px] leading-relaxed',
        name: 'text-[26px] font-extrabold tracking-tight',
        title: 'text-[14px] font-semibold',
        sectionTitle: 'text-[13px] font-bold tracking-wider uppercase',
        body: 'text-[13px] leading-relaxed',
        meta: 'text-[11.5px]'
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

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
        root: 'text-[13px] leading-relaxed',
        name: 'text-2xl font-bold tracking-tight',
        title: 'text-xs font-semibold',
        sectionTitle: 'text-xs font-bold tracking-wider',
        body: 'text-[12px] leading-normal',
        meta: 'text-[11px]'
      };
    case 'large':
      return {
        root: 'text-[15px] leading-relaxed',
        name: 'text-3xl font-extrabold tracking-tight',
        title: 'text-base font-semibold',
        sectionTitle: 'text-sm font-bold tracking-wider',
        body: 'text-[14px] leading-relaxed',
        meta: 'text-xs'
      };
    case 'normal':
    default:
      return {
        root: 'text-[13.5px] leading-relaxed',
        name: 'text-[26px] font-bold tracking-tight',
        title: 'text-sm font-semibold',
        sectionTitle: 'text-[13px] font-bold tracking-wider',
        body: 'text-[13px] leading-relaxed',
        meta: 'text-[11.5px]'
      };
  }
};

export const getSpacingClass = (spacing: string): { sectionGap: string; itemGap: string } => {
  switch (spacing) {
    case 'tight':
      return { sectionGap: 'space-y-3.5', itemGap: 'space-y-2' };
    case 'relaxed':
      return { sectionGap: 'space-y-6', itemGap: 'space-y-4' };
    case 'normal':
    default:
      return { sectionGap: 'space-y-5', itemGap: 'space-y-3' };
  }
};

export const getMarginPadding = (margins: string): string => {
  switch (margins) {
    case 'compact':
      return 'p-6';
    case 'wide':
      return 'p-12';
    case 'normal':
    default:
      return 'p-8';
  }
};

export const formatDates = (start?: string, end?: string, isCurrent?: boolean): string => {
  if (!start && !end && !isCurrent) return '';
  const s = start || '';
  const e = isCurrent ? 'Present' : (end || '');
  if (s && e) return `${s} — ${e}`;
  return s || e;
};

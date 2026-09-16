export type TemplateId = 'modern' | 'classic' | 'minimal' | 'executive' | 'creative' | 'professional';

export type FontOption = 'font-sans' | 'font-serif' | 'font-mono' | 'font-inter' | 'font-outfit' | 'font-merriweather' | 'font-playfair';

export type FontSizeOption = 'compact' | 'normal' | 'large';

export type SpacingOption = 'tight' | 'normal' | 'relaxed';

export type MarginOption = 'compact' | 'normal' | 'wide';

export type HeadingStyleOption = 'uppercase' | 'capitalize' | 'underline' | 'pill' | 'bar';

export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  avatarUrl?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpaOrHonors?: string;
  description?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  role?: string;
  link?: string;
  technologies?: string;
  startDate?: string;
  endDate?: string;
  description: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Conversational';
}

export interface AchievementItem {
  id: string;
  title: string;
  organization?: string;
  year?: string;
  description: string;
}

export interface CustomizationSettings {
  template: TemplateId;
  accentColor: string;
  fontFamily: string;
  fontSize: FontSizeOption;
  spacing: SpacingOption;
  margins: MarginOption;
  headingStyle: HeadingStyleOption;
  showPhoto: boolean;
  activeSections: string[]; // Order and visibility of sections
}

export interface ResumeData {
  id: string;
  userId?: string;
  isPublic?: boolean;
  title: string;
  updatedAt: string;
  createdAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  achievements: AchievementItem[];
  hobbies: string[];
  customization: CustomizationSettings;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'Free' | 'Pro';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

/**
 * Utilities for generating and resolving public shareable links for resumes
 */

/**
 * Gets the public URL for the app.
 * In AI Studio environments, dev URLs (ais-dev-*.run.app) are private and require
 * authorization, whereas pre URLs (ais-pre-*.run.app) are public and accessible to anyone.
 */
export const getPublicBaseUrl = (): string => {
  if (typeof window === 'undefined') return '';
  
  let origin = window.location.origin;

  // Convert private dev URL to public preview URL
  if (origin.includes('ais-dev-')) {
    origin = origin.replace('ais-dev-', 'ais-pre-');
  }

  // Remove trailing slashes and return base path
  const pathname = window.location.pathname.replace(/\/$/, '');
  return `${origin}${pathname}`;
};

/**
 * Generates a public link to view a specific resume
 */
export const generateResumeShareUrl = (resumeId: string): string => {
  const base = getPublicBaseUrl();
  return `${base}?share=${encodeURIComponent(resumeId)}`;
};

/**
 * Generates a public link to view all published resumes
 */
export const generateGalleryShareUrl = (): string => {
  const base = getPublicBaseUrl();
  return `${base}?gallery=all`;
};

/**
 * Reads share parameters from the current browser URL (query params and hash routes)
 */
export const getShareParamsFromUrl = (): {
  sharedResumeId: string | null;
  isGalleryView: boolean;
} => {
  if (typeof window === 'undefined') {
    return { sharedResumeId: null, isGalleryView: false };
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check query params: ?share=ID, ?resume=ID, ?id=ID, ?view=ID
    const queryShare = urlParams.get('share') || urlParams.get('resume') || urlParams.get('id');
    const isGallery = urlParams.get('gallery') === 'all' || urlParams.get('view') === 'gallery';

    if (queryShare) {
      return { sharedResumeId: queryShare, isGalleryView: false };
    }

    // Check hash routes: #/share/ID or #/view/ID or #share-ID
    const hash = window.location.hash;
    if (hash) {
      const match = hash.match(/#(?:(?:\/)?(?:share|view)\/|share-)([a-zA-Z0-9_\-]+)/);
      if (match && match[1]) {
        return { sharedResumeId: match[1], isGalleryView: false };
      }
      if (hash.includes('gallery')) {
        return { sharedResumeId: null, isGalleryView: true };
      }
    }

    return { sharedResumeId: null, isGalleryView: isGallery };
  } catch (e) {
    console.error('Error reading share URL params:', e);
    return { sharedResumeId: null, isGalleryView: false };
  }
};

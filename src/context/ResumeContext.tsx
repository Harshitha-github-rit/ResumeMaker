import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ResumeData, TemplateId, CustomizationSettings } from '../types';
import { DEFAULT_RESUME, PRODUCT_MANAGER_RESUME } from '../data/sampleResumes';
import { useAuth } from './AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, where } from 'firebase/firestore';
import { getShareParamsFromUrl } from '../utils/shareUtils';

export type AppView = 'landing' | 'dashboard' | 'builder' | 'templates' | 'account' | 'shared-resume' | 'public-gallery';

interface ResumeContextType {
  resumes: ResumeData[];
  currentResume: ResumeData;
  currentView: AppView;
  sharedResumeId: string | null;
  autoSaveStatus: 'saved' | 'saving' | 'unsaved';
  isCloudSyncing: boolean;
  lastSavedTime: Date;
  setCurrentView: (view: AppView) => void;
  setSharedResumeId: (id: string | null) => void;
  openSharedResume: (id: string) => void;
  selectResume: (id: string) => void;
  createNewResume: (template?: TemplateId, initialTitle?: string) => string;
  updateCurrentResume: (updater: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => void;
  updateCustomization: (settings: Partial<CustomizationSettings>) => void;
  duplicateResume: (id: string) => string;
  deleteResume: (id: string) => void;
  saveCurrentResume: () => void;
  loadSampleProfile: (type: 'engineer' | 'pm' | 'blank') => void;
  exportResumeJSON: () => void;
  importResumeJSON: (fileContent: string) => boolean;
}

const STORAGE_KEY = 'resumecraft_resumes_v2';
const ACTIVE_ID_KEY = 'resumecraft_active_id';

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const sanitizeResume = (raw: any): ResumeData => {
  if (!raw || typeof raw !== 'object') return DEFAULT_RESUME;
  return {
    ...DEFAULT_RESUME,
    ...raw,
    personalInfo: {
      ...DEFAULT_RESUME.personalInfo,
      ...(raw.personalInfo || {})
    },
    customization: {
      ...DEFAULT_RESUME.customization,
      ...(raw.customization || {})
    }
  };
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);

  const [resumes, setResumes] = useState<ResumeData[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sanitizedList = parsed.map(sanitizeResume);
          return sanitizedList;
        }
      }
    } catch (e) {
      console.error('Failed to parse stored resumes', e);
    }
    return [DEFAULT_RESUME, PRODUCT_MANAGER_RESUME];
  });

  const [currentResume, setCurrentResume] = useState<ResumeData>(() => {
    try {
      const activeId = localStorage.getItem(ACTIVE_ID_KEY);
      if (activeId) {
        const found = resumes.find(r => r && r.id === activeId);
        if (found) return sanitizeResume(found);
      }
    } catch {}
    return resumes[0] ? sanitizeResume(resumes[0]) : DEFAULT_RESUME;
  });

  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [sharedResumeId, setSharedResumeId] = useState<string | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [lastSavedTime, setLastSavedTime] = useState<Date>(new Date());
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const openSharedResume = (id: string) => {
    setSharedResumeId(id);
    setCurrentView('shared-resume');
  };

  // URL Deep-linking for public sharing
  useEffect(() => {
    const handleUrlChange = () => {
      const { sharedResumeId: targetId, isGalleryView } = getShareParamsFromUrl();
      if (targetId) {
        setSharedResumeId(targetId);
        setCurrentView('shared-resume');
      } else if (isGalleryView) {
        setCurrentView('public-gallery');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Firestore helper to save a resume (always public so shared link works immediately)
  const saveResumeToFirestore = async (resume: ResumeData, uid?: string) => {
    try {
      setIsCloudSyncing(true);
      const docRef = doc(db, 'resumes', resume.id);
      await setDoc(
        docRef,
        {
          ...resume,
          userId: uid || user?.id || 'public_author',
          isPublic: true,
          updatedAt: new Date().toISOString()
        },
        { merge: true }
      );
      setIsCloudSyncing(false);
    } catch (err) {
      setIsCloudSyncing(false);
      console.warn('Firestore resume sync warning:', err);
    }
  };

  // Ensure all local resumes are saved with public view permission in Firestore
  useEffect(() => {
    resumes.forEach(r => {
      saveResumeToFirestore(r, user?.id);
    });
  }, []);

  // Real-time Cloud Sync with Firestore
  useEffect(() => {
    if (!user?.id) return;

    const resumesCol = collection(db, 'resumes');
    const q = query(resumesCol, where('userId', '==', user.id));

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        if (!snapshot.empty) {
          const cloudResumes: ResumeData[] = [];
          snapshot.forEach(docSnap => {
            const item = docSnap.data() as ResumeData;
            if (item && item.id) {
              cloudResumes.push(sanitizeResume(item));
            }
          });
          if (cloudResumes.length > 0) {
            setResumes(cloudResumes);
            setCurrentResume(curr => {
              const exists = cloudResumes.find(r => r.id === curr.id);
              return exists ? curr : cloudResumes[0];
            });
          }
        } else {
          // If newly signed in and cloud has no records yet, sync current local resumes to cloud
          setResumes(localList => {
            localList.forEach(r => {
              saveResumeToFirestore(r, user.id);
            });
            return localList;
          });
        }
      },
      error => {
        console.warn('Firestore subscription notice:', error);
      }
    );

    return () => unsubscribe();
  }, [user?.id]);

  // Keep localStorage up to date with resumes list as offline backup
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
    } catch (e) {
      console.error('Failed to persist resumes to storage', e);
    }
  }, [resumes]);

  // Keep active ID in storage
  useEffect(() => {
    try {
      if (currentResume && currentResume.id) {
        localStorage.setItem(ACTIVE_ID_KEY, currentResume.id);
      }
    } catch {}
  }, [currentResume?.id]);

  // Auto-save logic with debounce
  const triggerAutoSave = (updated: ResumeData) => {
    setAutoSaveStatus('saving');
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setResumes(prev => {
        const index = prev.findIndex(r => r.id === updated.id);
        if (index >= 0) {
          const newArr = [...prev];
          newArr[index] = { ...updated, updatedAt: new Date().toISOString() };
          return newArr;
        } else {
          return [updated, ...prev];
        }
      });

      if (user?.id) {
        saveResumeToFirestore(updated, user.id);
      }

      setAutoSaveStatus('saved');
      setLastSavedTime(new Date());
    }, 600);
  };

  const updateCurrentResume = (updater: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => {
    setCurrentResume(prev => {
      const safePrev = sanitizeResume(prev);
      const next = typeof updater === 'function' ? updater(safePrev) : { ...safePrev, ...updater };
      const safeNext = sanitizeResume(next);
      triggerAutoSave(safeNext);
      return safeNext;
    });
  };

  const updateCustomization = (settings: Partial<CustomizationSettings>) => {
    updateCurrentResume(prev => {
      const safePrev = sanitizeResume(prev);
      return {
        ...safePrev,
        customization: {
          ...safePrev.customization,
          ...settings
        }
      };
    });
  };

  const selectResume = (id: string) => {
    const found = resumes.find(r => r.id === id);
    if (found) {
      setCurrentResume(found);
      setCurrentView('builder');
    }
  };

  const createNewResume = (template: TemplateId = 'modern', initialTitle?: string): string => {
    const newId = 'resume-' + Date.now();
    const newResume: ResumeData = {
      ...DEFAULT_RESUME,
      id: newId,
      title: initialTitle || 'Untitled Resume',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customization: {
        ...DEFAULT_RESUME.customization,
        template: template
      }
    };

    setResumes(prev => [newResume, ...prev]);
    setCurrentResume(newResume);
    setCurrentView('builder');

    if (user?.id) {
      saveResumeToFirestore(newResume, user.id);
    }

    return newId;
  };

  const duplicateResume = (id: string): string => {
    const target = resumes.find(r => r.id === id) || currentResume;
    const newId = 'resume-' + Date.now();
    const clone: ResumeData = {
      ...target,
      id: newId,
      title: `${target.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setResumes(prev => [clone, ...prev]);
    setCurrentResume(clone);

    if (user?.id) {
      saveResumeToFirestore(clone, user.id);
    }

    return newId;
  };

  const deleteResume = (id: string) => {
    setResumes(prev => {
      const filtered = prev.filter(r => r.id !== id);
      if (filtered.length === 0) {
        const fallback = { ...DEFAULT_RESUME, id: 'resume-' + Date.now(), title: 'My New Resume' };
        setCurrentResume(fallback);
        if (user?.id) {
          saveResumeToFirestore(fallback, user.id);
        }
        return [fallback];
      }
      if (currentResume.id === id) {
        setCurrentResume(filtered[0]);
      }
      return filtered;
    });

    if (user?.id) {
      deleteDoc(doc(db, 'resumes', id)).catch(e => console.warn('Firestore delete error:', e));
    }
  };

  const saveCurrentResume = () => {
    setAutoSaveStatus('saving');
    const now = new Date();
    const updated = {
      ...currentResume,
      updatedAt: now.toISOString()
    };
    setResumes(prev => {
      const idx = prev.findIndex(r => r.id === updated.id);
      if (idx >= 0) {
        const arr = [...prev];
        arr[idx] = updated;
        return arr;
      }
      return [updated, ...prev];
    });
    setCurrentResume(updated);

    if (user?.id) {
      saveResumeToFirestore(updated, user.id);
    }

    setAutoSaveStatus('saved');
    setLastSavedTime(now);
  };

  const loadSampleProfile = (type: 'engineer' | 'pm' | 'blank') => {
    if (type === 'engineer') {
      updateCurrentResume({
        personalInfo: { ...DEFAULT_RESUME.personalInfo },
        summary: DEFAULT_RESUME.summary,
        experience: [...DEFAULT_RESUME.experience],
        education: [...DEFAULT_RESUME.education],
        skills: [...DEFAULT_RESUME.skills],
        projects: [...DEFAULT_RESUME.projects],
        certifications: [...DEFAULT_RESUME.certifications],
        languages: [...DEFAULT_RESUME.languages],
        achievements: [...DEFAULT_RESUME.achievements],
        hobbies: [...DEFAULT_RESUME.hobbies]
      });
    } else if (type === 'pm') {
      updateCurrentResume({
        personalInfo: { ...PRODUCT_MANAGER_RESUME.personalInfo },
        summary: PRODUCT_MANAGER_RESUME.summary,
        experience: [...PRODUCT_MANAGER_RESUME.experience],
        education: [...PRODUCT_MANAGER_RESUME.education],
        skills: [...PRODUCT_MANAGER_RESUME.skills],
        projects: [...PRODUCT_MANAGER_RESUME.projects],
        certifications: [...PRODUCT_MANAGER_RESUME.certifications],
        languages: [...PRODUCT_MANAGER_RESUME.languages],
        achievements: [...PRODUCT_MANAGER_RESUME.achievements],
        hobbies: [...PRODUCT_MANAGER_RESUME.hobbies]
      });
    } else if (type === 'blank') {
      updateCurrentResume({
        personalInfo: {
          fullName: 'Your Name',
          professionalTitle: 'Your Professional Title',
          email: 'youremail@example.com',
          phone: '+1 (555) 000-0000',
          location: 'City, Country',
          linkedin: '',
          portfolio: ''
        },
        summary: 'Brief 2-3 sentences summarizing your core strengths, experience, and top professional achievements.',
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: [],
        achievements: [],
        hobbies: []
      });
    }
  };

  const exportResumeJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentResume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${currentResume.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importResumeJSON = (content: string): boolean => {
    try {
      const parsed = JSON.parse(content);
      if (parsed && parsed.personalInfo && Array.isArray(parsed.experience)) {
        const imported: ResumeData = {
          ...parsed,
          id: 'resume-' + Date.now(),
          updatedAt: new Date().toISOString()
        };
        setResumes(prev => [imported, ...prev]);
        setCurrentResume(imported);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        currentResume,
        currentView,
        sharedResumeId,
        autoSaveStatus,
        isCloudSyncing,
        lastSavedTime,
        setCurrentView,
        setSharedResumeId,
        openSharedResume,
        selectResume,
        createNewResume,
        updateCurrentResume,
        updateCustomization,
        duplicateResume,
        deleteResume,
        saveCurrentResume,
        loadSampleProfile,
        exportResumeJSON,
        importResumeJSON
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

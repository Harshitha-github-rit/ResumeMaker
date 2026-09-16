import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/landing/Hero';
import { HowItWorks } from './components/landing/HowItWorks';
import { TemplatesShowcase } from './components/landing/TemplatesShowcase';
import { Features } from './components/landing/Features';
import { WhyChooseUs } from './components/landing/WhyChooseUs';
import { Testimonials } from './components/landing/Testimonials';
import { FAQ } from './components/landing/FAQ';
import { FinalCTA } from './components/landing/FinalCTA';
import { Footer } from './components/Footer';
import { AuthModal } from './components/auth/AuthModal';
import { DashboardView } from './components/dashboard/DashboardView';
import { ResumeBuilder } from './components/builder/ResumeBuilder';
import { SharedResumeView } from './components/shared/SharedResumeView';
import { PublicGalleryView } from './components/shared/PublicGalleryView';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, sharedResumeId, openSharedResume, updateCurrentResume } = useResume();
  const { isAuthenticated } = useAuth();

  // Route guard: only the personal private dashboard strictly requires user sign-in.
  // The builder, templates, public gallery, and shared resume links are open for anyone!
  useEffect(() => {
    if (!isAuthenticated && currentView === 'dashboard') {
      setCurrentView('landing');
    }
  }, [isAuthenticated, currentView, setCurrentView]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Global Auth Modal */}
      <AuthModal />

      {/* Main View Router */}
      {currentView === 'shared-resume' && sharedResumeId ? (
        <SharedResumeView
          resumeId={sharedResumeId}
          onNavigateHome={() => {
            window.history.replaceState({}, document.title, window.location.pathname);
            setCurrentView('landing');
          }}
          onEditInBuilder={(res) => {
            updateCurrentResume(res);
            window.history.replaceState({}, document.title, window.location.pathname);
            setCurrentView('builder');
          }}
          onViewGallery={() => {
            window.history.replaceState({}, document.title, window.location.pathname + '?gallery=all');
            setCurrentView('public-gallery');
          }}
        />
      ) : currentView === 'public-gallery' ? (
        <PublicGalleryView
          onSelectResume={(id) => {
            openSharedResume(id);
            window.history.pushState({}, document.title, window.location.pathname + `?share=${id}`);
          }}
          onNavigateHome={() => {
            window.history.replaceState({}, document.title, window.location.pathname);
            setCurrentView('landing');
          }}
          onCreateNew={() => {
            window.history.replaceState({}, document.title, window.location.pathname);
            setCurrentView('builder');
          }}
        />
      ) : currentView === 'builder' ? (
        <ResumeBuilder />
      ) : currentView === 'dashboard' ? (
        <DashboardView />
      ) : (
        <>
          <Navbar />
          <main className="flex-1">
            {currentView === 'landing' && (
              <>
                <Hero />
                <HowItWorks />
                <Features />
                <WhyChooseUs />
                <Testimonials />
                <FAQ />
                <FinalCTA />
              </>
            )}

            {currentView === 'templates' && (
              <div className="pt-6">
                <TemplatesShowcase />
              </div>
            )}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <AppContent />
      </ResumeProvider>
    </AuthProvider>
  );
}

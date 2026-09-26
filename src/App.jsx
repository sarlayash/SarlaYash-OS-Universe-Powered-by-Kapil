// SarlaYash OS Universe — Powered by Kapil
// Mobile-First Virtual Computer Lab for Windows, Linux, macOS, and ChromeOS

import React, { useState } from 'react';
import { LearnerProvider, useLearner } from './context/LearnerContext';
import { OSProvider, useOS } from './context/OSContext';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { GlobalNavBar } from './components/navigation/GlobalNavBar';
import { LabHub } from './components/hub/LabHub';
import { WindowManager } from './components/window/WindowFrame';

// Guided Installers
import { WindowsInstaller } from './components/installer/WindowsInstaller';
import { LinuxInstaller } from './components/installer/LinuxInstaller';
import { MacInstaller } from './components/installer/MacInstaller';
import { ChromeInstaller } from './components/installer/ChromeInstaller';

// Desktops
import { WindowsDesktop } from './components/desktops/WindowsDesktop';
import { LinuxDesktop } from './components/desktops/LinuxDesktop';
import { MacDesktop } from './components/desktops/MacDesktop';
import { ChromeDesktop } from './components/desktops/ChromeDesktop';

// Drawers & Modals
import { ChallengeDrawer } from './components/challenges/ChallengeDrawer';
import { PracticalAssessmentModal } from './components/challenges/PracticalAssessmentModal';
import { CertificateModal } from './components/certification/CertificateModal';
import { FounderPanelModal } from './components/founder/FounderPanelModal';
import { SecurityLockoutScreen } from './components/security/SecurityLockoutScreen';

// Mobile Accessibility Tools
import { VirtualTrackpad } from './components/mobile/VirtualTrackpad';
import { VirtualKeyboard } from './components/mobile/VirtualKeyboard';

const MainLabContainer = () => {
  const { activeOS, mode } = useOS();
  const { isCurrentlyLocked } = useLearner();

  // Modal dialog states
  const [challengesOpen, setChallengesOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [assessmentType, setAssessmentType] = useState('standard'); // 'standard' | 'hard'
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [founderOpen, setFounderOpen] = useState(false);

  const handleOpenAssessment = (type = 'standard') => {
    setAssessmentType(type);
    setAssessmentOpen(true);
  };

  // Render OS Desktop
  const renderDesktop = () => {
    switch (activeOS) {
      case 'windows': return <WindowsDesktop />;
      case 'linux': return <LinuxDesktop />;
      case 'macos': return <MacDesktop />;
      case 'chrome': return <ChromeDesktop />;
      default: return <WindowsDesktop />;
    }
  };

  // Render Guided Installer
  const renderInstaller = () => {
    switch (activeOS) {
      case 'windows': return <WindowsInstaller />;
      case 'linux': return <LinuxInstaller />;
      case 'macos': return <MacInstaller />;
      case 'chrome': return <ChromeInstaller />;
      default: return <WindowsInstaller />;
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col bg-black text-white overflow-hidden select-none font-sans">
      {/* Top Universal Navbar & Quick Switcher */}
      <GlobalNavBar
        onOpenChallenges={() => setChallengesOpen(true)}
        onOpenAssessment={handleOpenAssessment}
        onOpenCertificate={() => setCertificateOpen(true)}
        onOpenFounder={() => setFounderOpen(true)}
      />

      {/* Main Interactive Stage */}
      <main className="relative flex-1 w-full h-[calc(100vh-44px)] overflow-hidden">
        {mode === 'hub' && (
          <LabHub
            onOpenChallenges={() => setChallengesOpen(true)}
            onOpenAssessment={handleOpenAssessment}
            onOpenCertificate={() => setCertificateOpen(true)}
            onOpenFounder={() => setFounderOpen(true)}
          />
        )}

        {mode === 'installer' && renderInstaller()}

        {mode === 'desktop' && (
          <div className="relative w-full h-full">
            {renderDesktop()}
            <WindowManager />
          </div>
        )}
      </main>

      {/* Mobile Accessibility Controls */}
      <VirtualTrackpad />
      <VirtualKeyboard />

      {/* Popups & Drawers */}
      <OnboardingModal />
      <ChallengeDrawer
        isOpen={challengesOpen}
        onClose={() => setChallengesOpen(false)}
      />
      <PracticalAssessmentModal
        isOpen={assessmentOpen}
        initialExamType={assessmentType}
        onClose={() => setAssessmentOpen(false)}
        onOpenCertificate={() => setCertificateOpen(true)}
      />
      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        onOpenAssessment={handleOpenAssessment}
      />
      <FounderPanelModal
        isOpen={founderOpen}
        onClose={() => setFounderOpen(false)}
      />

      {/* 24-Hour Academic Integrity Lockout Screen */}
      {isCurrentlyLocked && <SecurityLockoutScreen />}
    </div>
  );
};

export default function App() {
  return (
    <LearnerProvider>
      <OSProvider>
        <MainLabContainer />
      </OSProvider>
    </LearnerProvider>
  );
}

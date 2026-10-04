// Learner State Context for SarlaYash OS Universe
import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CHALLENGES, BADGE_DEFINITIONS } from '../services/challengeService';
import { emailService } from '../services/emailService';
import { certificateService } from '../services/certificateService';
import { audioService } from '../services/audioService';

const LEARNER_STORAGE_KEY = 'sarlayash_learner_state_v1';
const SECURITY_LOCKOUT_KEY = 'sarlayash_security_lockout_v1';

export const ALL_COURSE_MODULES = [
  // OS Installation Wizards
  { id: 'os_windows_install', category: 'Operating Systems', name: 'Windows 11 Setup & UEFI Partitioning', points: 100 },
  { id: 'os_linux_install', category: 'Operating Systems', name: 'Ubuntu Linux 24.04 ext4 Installation', points: 100 },
  { id: 'os_macos_install', category: 'Operating Systems', name: 'macOS Sonoma Setup Assistant', points: 100 },
  { id: 'os_chrome_install', category: 'Operating Systems', name: 'ChromeOS Cloud & Account Setup', points: 100 },

  // OS Desktop Explorations
  { id: 'os_windows_desktop', category: 'Operating Systems', name: 'Windows 11 Explorer & CMD Diagnostics', points: 100 },
  { id: 'os_linux_desktop', category: 'Operating Systems', name: 'Ubuntu GNOME Shell & Bash Scripting', points: 100 },
  { id: 'os_macos_desktop', category: 'Operating Systems', name: 'macOS Finder, Dock & Zsh Terminal', points: 100 },
  { id: 'os_chrome_desktop', category: 'Operating Systems', name: 'ChromeOS Crostini Linux Container', points: 100 },

  // Spreadsheet Data Analytics Suite
  { id: 'data_charts', category: 'Spreadsheet & Analytics', name: 'Interactive Data Charts Simulator', points: 150 },
  { id: 'data_pivottables', category: 'Spreadsheet & Analytics', name: 'Pivot Tables Multi-Dimensional Builder', points: 200 },
  { id: 'data_pivotcharts', category: 'Spreadsheet & Analytics', name: 'Pivot Charts & Dynamic Slicers', points: 150 },
  { id: 'data_macros', category: 'Spreadsheet & Analytics', name: 'VBA & Apps Script Macros Simulator', points: 200 },

  { id: 'kb_sheets_vs_excel', category: 'Knowledge Bytes', name: 'Master Summary: 50 Differences Overview', points: 150 },
  { id: 'kb_collaboration', category: 'Knowledge Bytes', name: '1. Collaboration & Cloud Architecture (Bytes 1-5)', points: 100 },
  { id: 'kb_scale', category: 'Knowledge Bytes', name: '2. Capacity, Scale Limits & Engine (Bytes 6-10)', points: 100 },
  { id: 'kb_formulas', category: 'Knowledge Bytes', name: '3. Unique Formulas & QUERY Architecture (Bytes 11-15)', points: 100 },
  { id: 'kb_dynamic_arrays', category: 'Knowledge Bytes', name: '4. Dynamic Arrays & Lambda Functions (Bytes 16-20)', points: 100 },
  { id: 'kb_scripting', category: 'Knowledge Bytes', name: '5. Apps Script vs VBA / Office Scripts (Bytes 21-25)', points: 100 },
  { id: 'kb_pivots', category: 'Knowledge Bytes', name: '6. Data Modeling, Pivots & Power Pivot (Bytes 26-30)', points: 100 },
  { id: 'kb_visualization', category: 'Knowledge Bytes', name: '7. Charting, Visualization & Slicers (Bytes 31-35)', points: 100 },
  { id: 'kb_architecture', category: 'Knowledge Bytes', name: '8. Desktop Native vs Web-First Architecture (Bytes 36-40)', points: 100 },
  { id: 'kb_extensibility', category: 'Knowledge Bytes', name: '9. Integrations, Python & Ecosystem (Bytes 41-45)', points: 100 },
  { id: 'kb_security', category: 'Knowledge Bytes', name: '10. Governance, Security & Pricing (Bytes 46-50)', points: 100 },

  // Practical Challenges & Exams
  { id: 'practical_challenges', category: 'Practical Labs', name: '20 Practical Multi-OS Terminal Challenges', points: 300 },
  { id: 'final_exam_500q', category: 'Certifications', name: '120-Minute 500Q Comprehensive Final Exam', points: 500 },
  { id: 'hard_exam_100q', category: 'Certifications', name: '2-Hour 100Q Proctored Hard Grandmaster Exam', points: 1000 },
  { id: 'official_certificate', category: 'Certifications', name: 'QR-Verified Master Certificate Generation', points: 250 }
];

const defaultState = {
  learnerName: '',
  hasOnboarded: false,
  selectedPrimaryOS: 'windows',
  installedOS: [], // 'windows', 'linux', 'macos', 'chrome'
  exploredOS: [],
  completedChallenges: [],
  earnedBadges: [],
  completedModules: [], // array of module IDs marked as complete
  acknowledgedKnowledgeBytes: [], // array of byte IDs (1..50) acknowledged
  totalCommandsRun: 0,
  assessmentScore: null,
  mockExamScore: null,
  mockExamPassed: false,
  mockExamStats: null,
  hardExamScore: null,
  hardExamPassed: false,
  hardExamStats: null,
  hardExamDisqualified: false,
  lockoutUntil: null, // timestamp in ms (e.g. Date.now() + 24 * 60 * 60 * 1000)
  lockoutReason: null,
  lockoutIncident: null,
  issuedCertificate: null,
  points: 0
};

const LearnerContext = createContext(null);

export const LearnerProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    let base = defaultState;
    try {
      const stored = localStorage.getItem(LEARNER_STORAGE_KEY);
      if (stored) {
        base = { ...defaultState, ...JSON.parse(stored) };
      }
    } catch {
      // fallback
    }

    // Anti-tamper persistent security lockout check
    try {
      const secLockout = localStorage.getItem(SECURITY_LOCKOUT_KEY);
      if (secLockout) {
        const parsed = JSON.parse(secLockout);
        if (parsed.lockoutUntil && Date.now() < parsed.lockoutUntil) {
          base = {
            ...base,
            lockoutUntil: parsed.lockoutUntil,
            lockoutReason: parsed.lockoutReason || 'Academic Integrity Violation Detected',
            lockoutIncident: parsed.lockoutIncident || null,
            hardExamDisqualified: true
          };
        } else if (parsed.lockoutUntil && Date.now() >= parsed.lockoutUntil) {
          // Lockout naturally expired after 24 hours
          localStorage.removeItem(SECURITY_LOCKOUT_KEY);
          base.lockoutUntil = null;
          base.lockoutReason = null;
        }
      }
    } catch {
      // fallback
    }

    return base;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LEARNER_STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save learner state:', e);
    }
  }, [state]);

  // Check and unlock badges
  const checkBadgeUnlocks = (newState) => {
    const updatedBadges = [...newState.earnedBadges];
    let newBadgeUnlocked = false;

    // 1. Installation Expert: Complete all 4 OS installations
    if (
      ['windows', 'linux', 'macos', 'chrome'].every(os => newState.installedOS.includes(os)) &&
      !updatedBadges.includes('installation_expert')
    ) {
      updatedBadges.push('installation_expert');
      newBadgeUnlocked = true;
    }

    // 2. Desktop Explorer: Explore all 4 desktop environments
    if (
      ['windows', 'linux', 'macos', 'chrome'].every(os => newState.exploredOS.includes(os)) &&
      !updatedBadges.includes('desktop_explorer')
    ) {
      updatedBadges.push('desktop_explorer');
      newBadgeUnlocked = true;
    }

    // 3. Command Master: Run 50+ commands or complete command challenges
    if (newState.totalCommandsRun >= 50 && !updatedBadges.includes('command_master')) {
      updatedBadges.push('command_master');
      newBadgeUnlocked = true;
    }

    // 4. OS Champion: 120-minute 500Q Assessment score >= 90% or Hard Exam >= 90%
    const isChampion = (newState.mockExamScore !== null && newState.mockExamScore >= 90) || 
                       (newState.hardExamScore !== null && newState.hardExamScore >= 90) || 
                       newState.mockExamPassed;
    if (isChampion && !updatedBadges.includes('os_champion')) {
      updatedBadges.push('os_champion');
      newBadgeUnlocked = true;
    }

    // 5. Proctor Grandmaster: Hard Exam passed without disqualification
    if (newState.hardExamPassed && !updatedBadges.includes('hard_champion')) {
      updatedBadges.push('hard_champion');
      newBadgeUnlocked = true;
    }

    if (newBadgeUnlocked) {
      audioService.playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      return { ...newState, earnedBadges: updatedBadges };
    }

    return newState;
  };

  // Complete onboarding
  const completeOnboarding = (name, initialOS) => {
    const learnerName = name.trim() || 'Learner';
    setState(prev => {
      const next = {
        ...prev,
        learnerName,
        selectedPrimaryOS: initialOS,
        hasOnboarded: true
      };
      // Send silent installation notification to kapilnarula27july@gmail.com
      emailService.recordAndNotifyInstall(learnerName, initialOS);
      return next;
    });
  };

  // Record an OS installation completion
  const markInstallationCompleted = (os) => {
    setState(prev => {
      const installedOS = prev.installedOS.includes(os) ? prev.installedOS : [...prev.installedOS, os];
      let completedChallenges = [...prev.completedChallenges];
      let addedPoints = 0;

      if (!completedChallenges.includes('first_install')) {
        completedChallenges.push('first_install');
        addedPoints += 50;
      }
      if (['windows', 'linux', 'macos', 'chrome'].every(s => installedOS.includes(s)) && !completedChallenges.includes('all_four_installs')) {
        completedChallenges.push('all_four_installs');
        addedPoints += 150;
      }

      const next = {
        ...prev,
        installedOS,
        completedChallenges,
        points: prev.points + addedPoints
      };
      return checkBadgeUnlocks(next);
    });
  };

  // Record desktop exploration
  const markOSExplored = (os) => {
    setState(prev => {
      const exploredOS = prev.exploredOS.includes(os) ? prev.exploredOS : [...prev.exploredOS, os];
      let completedChallenges = [...prev.completedChallenges];
      let addedPoints = 0;

      if (exploredOS.length >= 2 && !completedChallenges.includes('two_os_explorer')) {
        completedChallenges.push('two_os_explorer');
        addedPoints += 60;
      }
      if (['windows', 'linux', 'macos', 'chrome'].every(s => exploredOS.includes(s)) && !completedChallenges.includes('all_four_desktops')) {
        completedChallenges.push('all_four_desktops');
        addedPoints += 100;
      }

      const next = {
        ...prev,
        exploredOS,
        completedChallenges,
        points: prev.points + addedPoints
      };
      return checkBadgeUnlocks(next);
    });
  };

  // Record challenge completion
  const triggerChallengeEvent = (event) => {
    setState(prev => {
      let completed = [...prev.completedChallenges];
      let pointsGain = 0;

      const complete = (id) => {
        if (!completed.includes(id)) {
          completed.push(id);
          const ch = CHALLENGES.find(c => c.id === id);
          if (ch) pointsGain += ch.points;
          audioService.playClick();
        }
      };

      if (event.type === 'COMMAND_RUN') {
        const nextCommands = prev.totalCommandsRun + 1;
        complete('terminal_first_cmd');
        const nextState = {
          ...prev,
          totalCommandsRun: nextCommands,
          completedChallenges: completed,
          points: prev.points + pointsGain
        };
        return checkBadgeUnlocks(nextState);
      }

      if (event.type === 'CREATED_FOLDER') complete('create_folder');
      if (event.type === 'CREATED_FILE') complete('create_file');
      if (event.type === 'RAN_SYSTEM_DIAGNOSTIC') complete('system_diagnostic');
      if (event.type === 'INSPECTED_NETWORK') complete('check_network');
      if (event.type === 'PINGED_HOST') complete('ping_host');
      if (event.type === 'CHANGED_WALLPAPER') complete('change_wallpaper');
      if (event.type === 'REDIRECTED_OUTPUT') complete('redirect_output');
      if (event.type === 'LISTED_HIDDEN_FILES') complete('list_hidden_files');
      if (event.type === 'INSTALLED_PACKAGE') complete('install_package');
      if (event.type === 'INSPECTED_PROCESSES') complete('inspect_processes');
      if (event.type === 'CHECKED_ENV') complete('check_environment');
      if (event.type === 'CHMOD_APPLIED') complete('chmod_script');
      if (event.type === 'OPENED_EXPLORER') complete('explorer_launch');
      if (event.type === 'MULTIPLE_WINDOWS') complete('multitasker');

      const nextState = {
        ...prev,
        completedChallenges: completed,
        points: prev.points + pointsGain
      };
      return checkBadgeUnlocks(nextState);
    });
  };

  // Submit 120-minute 500Q Mock Assessment
  const submitMockExam = ({ score, correctCount, totalQuestions, timeSpentSec, domainScores }) => {
    setState(prev => {
      const passed = score >= 90;
      let completedChallenges = [...prev.completedChallenges];
      let addedPoints = 0;

      if (passed && !completedChallenges.includes('final_assessment')) {
        completedChallenges.push('final_assessment');
        addedPoints += 500;
      }

      const nextState = {
        ...prev,
        assessmentScore: score,
        mockExamScore: score,
        mockExamPassed: passed,
        mockExamStats: {
          total: totalQuestions || 500,
          correct: correctCount,
          timeSpentSec: timeSpentSec || 0,
          completedAt: new Date().toISOString(),
          domainScores: domainScores || {}
        },
        completedChallenges,
        points: prev.points + addedPoints
      };
      return checkBadgeUnlocks(nextState);
    });
  };

  // Submit 2-Hour 100 Hard-Level Proctored Assessment
  const submitHardMockExam = ({ score, correctCount, totalQuestions, timeSpentSec, domainScores, isDisqualified = false, violationReason = null, incidentData = null }) => {
    let computedLockoutUntil = null;
    if (isDisqualified) {
      computedLockoutUntil = Date.now() + (24 * 60 * 60 * 1000);
      try {
        localStorage.setItem(SECURITY_LOCKOUT_KEY, JSON.stringify({
          lockoutUntil: computedLockoutUntil,
          lockoutReason: violationReason,
          lockoutIncident: incidentData,
          lockedAt: new Date().toISOString()
        }));
      } catch (e) {
        console.warn('Failed to store security lockout:', e);
      }
    }

    setState(prev => {
      const passed = !isDisqualified && score >= 90;
      let completedChallenges = [...prev.completedChallenges];
      let addedPoints = 0;

      if (passed && !completedChallenges.includes('hard_assessment_champion')) {
        completedChallenges.push('hard_assessment_champion');
        addedPoints += 1000;
      }

      const nextState = {
        ...prev,
        hardExamScore: isDisqualified ? 0 : score,
        hardExamPassed: passed,
        hardExamDisqualified: isDisqualified,
        lockoutUntil: isDisqualified ? computedLockoutUntil : prev.lockoutUntil,
        lockoutReason: isDisqualified ? violationReason : prev.lockoutReason,
        lockoutIncident: isDisqualified ? incidentData : prev.lockoutIncident,
        hardExamStats: {
          total: totalQuestions || 100,
          correct: isDisqualified ? 0 : correctCount,
          timeSpentSec: timeSpentSec || 0,
          completedAt: new Date().toISOString(),
          domainScores: domainScores || {},
          isDisqualified,
          violationReason
        },
        mockExamScore: passed ? Math.max(prev.mockExamScore || 0, score) : prev.mockExamScore,
        mockExamPassed: prev.mockExamPassed || passed,
        completedChallenges,
        points: prev.points + addedPoints
      };
      return checkBadgeUnlocks(nextState);
    });
  };

  // Explicitly apply 24-Hour Account Lockout on Academic Dishonesty
  const applyCheatingLockout = ({ reason, incidentData }) => {
    const twentyFourHoursMs = 24 * 60 * 60 * 1000;
    const lockoutUntil = Date.now() + twentyFourHoursMs;

    const lockoutPayload = {
      lockoutUntil,
      lockoutReason: reason,
      lockoutIncident: incidentData,
      lockedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(SECURITY_LOCKOUT_KEY, JSON.stringify(lockoutPayload));
    } catch (e) {
      console.warn('Failed to persist security lockout:', e);
    }

    setState(prev => ({
      ...prev,
      lockoutUntil,
      lockoutReason: reason,
      lockoutIncident: incidentData,
      hardExamDisqualified: true,
      hardExamScore: 0
    }));
  };

  // Administrative / Founder Unlock Override
  const unlockCheatingLockout = () => {
    try {
      localStorage.removeItem(SECURITY_LOCKOUT_KEY);
    } catch (e) {
      console.warn('Failed to clear security lockout storage:', e);
    }

    setState(prev => ({
      ...prev,
      lockoutUntil: null,
      lockoutReason: null,
      lockoutIncident: null
    }));
  };

  // Check if account is currently locked
  const isCurrentlyLocked = Boolean(state.lockoutUntil && Date.now() < state.lockoutUntil);
  const lockoutRemainingMs = state.lockoutUntil ? Math.max(0, state.lockoutUntil - Date.now()) : 0;

  // Submit assessment (compatibility wrapper)
  const submitPracticalAssessment = (score) => {
    submitMockExam({
      score,
      correctCount: Math.round((score / 100) * 500),
      totalQuestions: 500,
      timeSpentSec: 0,
      domainScores: {}
    });
  };

  // Check section completion requirements
  const allOSInstalled = ['windows', 'linux', 'macos', 'chrome'].every(os => state.installedOS.includes(os));
  const allOSExplored = ['windows', 'linux', 'macos', 'chrome'].every(os => state.exploredOS.includes(os));
  const isMockExamPassed = Boolean(
    (state.mockExamPassed && state.mockExamScore !== null && state.mockExamScore >= 90) ||
    (state.hardExamPassed && state.hardExamScore !== null && state.hardExamScore >= 90)
  );
  const isCertificateUnlocked = Boolean(allOSInstalled && allOSExplored && isMockExamPassed);

  // Issue Certificate (Official or Demo Preview)
  const generateOfficialCertificate = async (isDemo = false) => {
    const cert = await certificateService.createCertificate({
      learnerName: state.learnerName || 'SarlaYash Student',
      completedOS: state.installedOS,
      score: state.mockExamScore || state.assessmentScore || 100,
      badges: state.earnedBadges,
      isDemo
    });

    if (!isDemo && isCertificateUnlocked) {
      setState(prev => ({
        ...prev,
        issuedCertificate: cert
      }));
      audioService.playSuccess();
      confetti({ particleCount: 100, spread: 80 });
    }
    return cert;
  };

  // Toggle Individual Module / Section Completion
  const toggleModuleComplete = (moduleId) => {
    setState(prev => {
      const currentList = prev.completedModules || [];
      const isAlready = currentList.includes(moduleId);
      let updated;
      let addedPoints = 0;
      if (isAlready) {
        updated = currentList.filter(m => m !== moduleId);
      } else {
        updated = [...currentList, moduleId];
        const modDef = ALL_COURSE_MODULES.find(m => m.id === moduleId);
        addedPoints = modDef ? modDef.points : 50;
        audioService.playSuccess();
      }
      return {
        ...prev,
        completedModules: updated,
        points: Math.max(0, prev.points + addedPoints)
      };
    });
  };

  // Mark ALL Modules and Sections Complete in Bulk
  const markAllModulesComplete = () => {
    const allIds = ALL_COURSE_MODULES.map(m => m.id);
    const allByteIds = Array.from({ length: 50 }, (_, i) => i + 1);
    audioService.playSuccess();
    confetti({ particleCount: 150, spread: 90 });
    setState(prev => ({
      ...prev,
      completedModules: allIds,
      acknowledgedKnowledgeBytes: allByteIds,
      installedOS: ['windows', 'linux', 'macos', 'chrome'],
      exploredOS: ['windows', 'linux', 'macos', 'chrome'],
      mockExamPassed: true,
      mockExamScore: Math.max(prev.mockExamScore || 0, 96),
      hardExamPassed: true,
      hardExamScore: Math.max(prev.hardExamScore || 0, 94),
      points: prev.points + 2500
    }));
  };

  // Toggle Single Knowledge Byte Acknowledgement
  const toggleKnowledgeByteAcknowledged = (byteId) => {
    setState(prev => {
      const current = prev.acknowledgedKnowledgeBytes || [];
      const isAck = current.includes(byteId);
      const updated = isAck ? current.filter(id => id !== byteId) : [...current, byteId];
      if (!isAck) {
        audioService.playClick();
      }
      return {
        ...prev,
        acknowledgedKnowledgeBytes: updated,
        points: isAck ? prev.points : prev.points + 20
      };
    });
  };

  // Acknowledge All 50 Knowledge Bytes
  const acknowledgeAllBytes = () => {
    const all50 = Array.from({ length: 50 }, (_, i) => i + 1);
    audioService.playSuccess();
    confetti({ particleCount: 100, spread: 70 });
    setState(prev => ({
      ...prev,
      acknowledgedKnowledgeBytes: all50,
      points: prev.points + 1000
    }));
  };

  // Reset Progress
  const resetAllProgress = () => {
    localStorage.removeItem(LEARNER_STORAGE_KEY);
    localStorage.removeItem(SECURITY_LOCKOUT_KEY);
    setState(defaultState);
  };

  return (
    <LearnerContext.Provider
      value={{
        ...state,
        allOSInstalled,
        allOSExplored,
        isMockExamPassed,
        isCertificateUnlocked,
        isCurrentlyLocked,
        lockoutRemainingMs,
        applyCheatingLockout,
        unlockCheatingLockout,
        completedModules: state.completedModules || [],
        acknowledgedKnowledgeBytes: state.acknowledgedKnowledgeBytes || [],
        toggleModuleComplete,
        isModuleComplete: (id) => (state.completedModules || []).includes(id),
        markAllModulesComplete,
        toggleKnowledgeByteAcknowledged,
        isByteAcknowledged: (id) => (state.acknowledgedKnowledgeBytes || []).includes(id),
        acknowledgeAllBytes,
        allCourseModules: ALL_COURSE_MODULES,
        completeOnboarding,
        markInstallationCompleted,
        markOSExplored,
        triggerChallengeEvent,
        submitMockExam,
        submitHardMockExam,
        submitPracticalAssessment,
        generateOfficialCertificate,
        resetAllProgress,
        badgesCatalog: BADGE_DEFINITIONS,
        challengesCatalog: CHALLENGES
      }}
    >
      {children}
    </LearnerContext.Provider>
  );
};

export const useLearner = () => {
  const context = useContext(LearnerContext);
  if (!context) throw new Error('useLearner must be used within LearnerProvider');
  return context;
};

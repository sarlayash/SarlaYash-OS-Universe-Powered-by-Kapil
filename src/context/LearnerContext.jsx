// Learner State Context for SarlaYash OS Universe
import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CHALLENGES, BADGE_DEFINITIONS } from '../services/challengeService';
import { emailService } from '../services/emailService';
import { certificateService } from '../services/certificateService';
import { audioService } from '../services/audioService';

const LEARNER_STORAGE_KEY = 'sarlayash_learner_state_v1';

const defaultState = {
  learnerName: '',
  hasOnboarded: false,
  selectedPrimaryOS: 'windows',
  installedOS: [], // 'windows', 'linux', 'macos', 'chrome'
  exploredOS: [],
  completedChallenges: [],
  earnedBadges: [],
  totalCommandsRun: 0,
  assessmentScore: null,
  mockExamScore: null,
  mockExamPassed: false,
  mockExamStats: null,
  hardExamScore: null,
  hardExamPassed: false,
  hardExamStats: null,
  hardExamDisqualified: false,
  issuedCertificate: null,
  points: 0
};

const LearnerContext = createContext(null);

export const LearnerProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(LEARNER_STORAGE_KEY);
      if (stored) {
        return { ...defaultState, ...JSON.parse(stored) };
      }
    } catch {
      // fallback
    }
    return defaultState;
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
  const submitHardMockExam = ({ score, correctCount, totalQuestions, timeSpentSec, domainScores, isDisqualified = false, violationReason = null }) => {
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

  // Reset Progress
  const resetAllProgress = () => {
    localStorage.removeItem(LEARNER_STORAGE_KEY);
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

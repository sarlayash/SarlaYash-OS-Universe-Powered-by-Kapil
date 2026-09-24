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

    // 4. OS Champion: Assessment score >= 80%
    if (newState.assessmentScore !== null && newState.assessmentScore >= 80 && !updatedBadges.includes('os_champion')) {
      updatedBadges.push('os_champion');
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

  // Submit assessment
  const submitPracticalAssessment = (score) => {
    setState(prev => {
      let completedChallenges = [...prev.completedChallenges];
      let points = prev.points;

      if (score >= 80 && !completedChallenges.includes('final_assessment')) {
        completedChallenges.push('final_assessment');
        points += 200;
      }

      const nextState = {
        ...prev,
        assessmentScore: score,
        completedChallenges,
        points
      };
      return checkBadgeUnlocks(nextState);
    });
  };

  // Issue Certificate
  const generateOfficialCertificate = async () => {
    const cert = await certificateService.createCertificate({
      learnerName: state.learnerName || 'SarlaYash Student',
      completedOS: state.installedOS,
      score: state.assessmentScore || 100,
      badges: state.earnedBadges
    });
    setState(prev => ({
      ...prev,
      issuedCertificate: cert
    }));
    audioService.playSuccess();
    confetti({ particleCount: 100, spread: 80 });
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
        completeOnboarding,
        markInstallationCompleted,
        markOSExplored,
        triggerChallengeEvent,
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

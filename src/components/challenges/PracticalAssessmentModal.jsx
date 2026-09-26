// 120-Minute Comprehensive Assessment & 2-Hour Hard-Level Proctored Assessment
// SarlaYash OS Universe — Powered by Kapil
// Anti-Cheat Surveillance: Tab Switch & Screenshot Detection -> Immediate Termination & Disqualification
// Hard Mode Rule: Learners CANNOT submit before 2 hours elapse

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Trophy, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCw, 
  Award, 
  ShieldCheck, 
  ShieldAlert,
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  Grid, 
  Check, 
  BarChart3, 
  Eye, 
  Lock, 
  Sparkles,
  Flame,
  AlertTriangle,
  Siren,
  Mail,
  Terminal,
  Laptop,
  Apple
} from 'lucide-react';
import { ChromeIcon } from '../icons/ChromeIcon';
import { ASSESSMENT_500_QUESTIONS } from '../../services/assessment500Engine';
import { HARD_ASSESSMENT_QUESTIONS } from '../../services/hardAssessmentEngine';
import { useLearner } from '../../context/LearnerContext';
import { audioService } from '../../services/audioService';
import { emailService } from '../../services/emailService';

const TOTAL_TIME_SECONDS = 120 * 60; // 120 minutes = 7200 seconds (2 Hours)
const PASSING_PERCENTAGE = 90; // 90% passing score strictly required

export const PracticalAssessmentModal = ({ 
  isOpen, 
  onClose, 
  onOpenCertificate, 
  initialExamType = 'standard' 
}) => {
  const { 
    learnerName,
    submitMockExam, 
    submitHardMockExam,
    applyCheatingLockout,
    mockExamScore, 
    hardExamScore,
    isCertificateUnlocked 
  } = useLearner();

  // Mode: 'standard' (500 Questions) | 'hard' (100 Hard MCQs with Anti-Cheat)
  const [examType, setExamType] = useState(initialExamType);
  const isHardMode = examType === 'hard';

  // Hard Mode Pre-Exam Agreement
  const [hasAgreedTerms, setHasAgreedTerms] = useState(false);
  const [agreedCheckbox, setAgreedCheckbox] = useState(false);

  // Active question index
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  
  // Timer state (2 Hours = 7200s)
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  
  // Modal & Drawer views
  const [showNavigator, setShowNavigator] = useState(false);
  const [navigatorFilter, setNavigatorFilter] = useState('all');
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showEarlySubmitBlocked, setShowEarlySubmitBlocked] = useState(false);
  
  // Anti-Cheat & Termination state
  const [isTerminated, setIsTerminated] = useState(false);
  const [terminationReason, setTerminationReason] = useState('');
  const [violationTimestamp, setViolationTimestamp] = useState(null);

  // Results & Review
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultsData, setResultsData] = useState(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('incorrect');

  // Synchronize initial mode prop when modal opens
  useEffect(() => {
    if (isOpen) {
      setExamType(initialExamType);
      if (initialExamType === 'hard') {
        setHasAgreedTerms(false);
        setAgreedCheckbox(false);
      } else {
        setHasAgreedTerms(true);
      }
      // Reset state for new session
      setSelectedAnswers({});
      setFlaggedQuestions(new Set());
      setTimeLeft(TOTAL_TIME_SECONDS);
      setIsTimerRunning(true);
      setIsSubmitted(false);
      setIsTerminated(false);
      setTerminationReason('');
      setResultsData(null);
      setCurrentIdx(0);
      setReviewMode(false);
    }
  }, [isOpen, initialExamType]);

  const activeQuestions = isHardMode ? HARD_ASSESSMENT_QUESTIONS : ASSESSMENT_500_QUESTIONS;
  const totalQuestions = activeQuestions.length;
  const currentQ = activeQuestions[currentIdx] || activeQuestions[0];

  // =========================================================================
  // ANTI-CHEAT SURVEILLANCE ENGINE (Active in Hard Mode)
  // =========================================================================
  const triggerTermination = (reason, violationType = 'SECURITY_PROCTOR_BREACH') => {
    if (isTerminated || isSubmitted) return;

    audioService.playSecurityAlarm();
    const now = new Date().toLocaleTimeString();
    setIsTerminated(true);
    setTerminationReason(reason);
    setViolationTimestamp(now);
    setIsTimerRunning(false);

    const answeredCount = Object.keys(selectedAnswers).length;
    const timeSpent = TOTAL_TIME_SECONDS - timeLeft;

    // 1. Dispatch disciplinary email alert to kapilnarula27july@gmail.com & namaste@sarlayash.com
    emailService.reportCheatingIncident({
      learnerName: learnerName || 'Student',
      violationReason: reason,
      violationType,
      examType: isHardMode ? 'Hard-Level Proctored Assessment (100 MCQs • 2 Hours)' : 'Standard 500Q Assessment',
      answeredCount,
      totalQuestions: 100,
      timeSpentSec: timeSpent
    }).then(res => {
      console.info('[PracticalAssessment] Anti-cheat email alert sent:', res);
    });

    // 2. Lock learner account for 24 hours
    applyCheatingLockout({
      reason,
      incidentData: {
        violationType,
        violationReason: reason,
        formattedTime: new Date().toLocaleString(),
        lockoutUntilFormatted: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()
      }
    });

    // 3. Record 0% disqualified score
    submitHardMockExam({
      score: 0,
      correctCount: 0,
      totalQuestions: 100,
      timeSpentSec: timeSpent,
      isDisqualified: true,
      violationReason: reason
    });
  };

  // 1. Tab Switching & Window Focus Loss Detection
  useEffect(() => {
    if (!isOpen || !isHardMode || isSubmitted || isTerminated || !hasAgreedTerms) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerTermination('Tab switch or browser window minimization detected. Leaving the examination screen is strictly prohibited.', 'TAB_SWITCH_OR_MINIMIZED');
      }
    };

    const handleWindowBlur = () => {
      // Allow minor internal focus shifts, but catch actual window blur
      setTimeout(() => {
        if (document.hidden || !document.hasFocus()) {
          triggerTermination('Window focus lost (user switched application or clicked outside the browser).', 'WINDOW_BLUR_LOST_FOCUS');
        }
      }, 350);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [isOpen, isHardMode, isSubmitted, isTerminated, hasAgreedTerms]);

  // 2. Screenshot & Screen Capture Keyboard Shortcut Interception
  useEffect(() => {
    if (!isOpen || !isHardMode || isSubmitted || isTerminated || !hasAgreedTerms) return;

    const handleKeyDown = (e) => {
      // PrintScreen Key
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        e.preventDefault();
        triggerTermination('Screenshot attempt detected (PrintScreen key pressed). Capturing examination questions is strictly prohibited.', 'SCREENSHOT_PRINTSCREEN');
        return;
      }

      // Windows Snipping Tool (Win + Shift + S) or Ctrl + Shift + S
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        triggerTermination('Screen capture shortcut detected (Win/Cmd + Shift + S).', 'SCREENSHOT_SNIPPING_TOOL');
        return;
      }

      // macOS Screen Capture shortcuts (Cmd + Shift + 3 / 4 / 5)
      if (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        triggerTermination('macOS Screen capture shortcut detected (Cmd + Shift + 3/4/5).', 'SCREENSHOT_MACOS_CAPTURE');
        return;
      }

      // Print dialog (Ctrl + P / Cmd + P)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        triggerTermination('Print dialog attempt detected (Ctrl/Cmd + P).', 'PRINT_DIALOG_ATTEMPT');
        return;
      }

      // DevTools Inspection (F12 or Ctrl + Shift + I)
      if (e.key === 'F12' || ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i'))) {
        e.preventDefault();
        triggerTermination('Developer Tools / Source code inspection shortcut detected.', 'DEVTOOLS_INSPECTION_ATTEMPT');
        return;
      }
    };

    // Prevent copy/cut of questions
    const handleCopyCut = (e) => {
      e.preventDefault();
      triggerTermination('Clipboard copy/cut detected. Copying questions to external search or AI tools is prohibited.', 'CLIPBOARD_COPY_ATTEMPT');
    };

    // Disable Right-Click Context Menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      triggerTermination('Right-click context menu attempt detected during proctored exam.', 'CONTEXT_MENU_BREACH');
    };

    window.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('copy', handleCopyCut);
    document.addEventListener('cut', handleCopyCut);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('copy', handleCopyCut);
      document.removeEventListener('cut', handleCopyCut);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [isOpen, isHardMode, isSubmitted, isTerminated, hasAgreedTerms]);

  // =========================================================================
  // TIMER COUNTDOWN HOOK
  // =========================================================================
  useEffect(() => {
    if (!isOpen || isSubmitted || isTerminated || !isTimerRunning || (!hasAgreedTerms && isHardMode)) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isSubmitted, isTerminated, isTimerRunning, hasAgreedTerms, isHardMode]);

  // Format seconds to HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || isSubmitted || isTerminated || showNavigator || showSubmitConfirm || (!hasAgreedTerms && isHardMode)) return;

    const handleKeyNav = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' && currentIdx < totalQuestions - 1) {
        setCurrentIdx(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIdx > 0) {
        setCurrentIdx(prev => prev - 1);
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const optIdx = parseInt(e.key, 10) - 1;
        handleSelectOption(optIdx);
      } else if (e.key.toLowerCase() === 'f') {
        toggleFlagCurrent();
      }
    };

    window.addEventListener('keydown', handleKeyNav);
    return () => window.removeEventListener('keydown', handleKeyNav);
  }, [isOpen, isSubmitted, isTerminated, currentIdx, showNavigator, showSubmitConfirm, hasAgreedTerms, isHardMode]);

  if (!isOpen) return null;

  // Option selection
  const handleSelectOption = (optIdx) => {
    if (isSubmitted || isTerminated) return;
    audioService.playClick();
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optIdx
    }));
  };

  const toggleFlagCurrent = () => {
    audioService.playClick();
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) {
        next.delete(currentQ.id);
      } else {
        next.add(currentQ.id);
      }
      return next;
    });
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const flaggedCount = flaggedQuestions.size;

  // Auto-submit when 2 hours timer expires
  const handleAutoSubmit = () => {
    calculateAndSubmit();
  };

  // Grade and Submit
  const calculateAndSubmit = () => {
    let correctCount = 0;
    const domainStats = {
      windows: { total: 0, correct: 0, label: 'Windows 11' },
      linux: { total: 0, correct: 0, label: 'Ubuntu Linux' },
      macos: { total: 0, correct: 0, label: 'macOS Sonoma' },
      chrome: { total: 0, correct: 0, label: 'Google ChromeOS' },
      storage: { total: 0, correct: 0, label: 'Storage & Systems' }
    };

    activeQuestions.forEach(q => {
      const domainKey = q.os || 'storage';
      if (domainStats[domainKey]) {
        domainStats[domainKey].total++;
      }

      if (selectedAnswers[q.id] === q.correct) {
        correctCount++;
        if (domainStats[domainKey]) {
          domainStats[domainKey].correct++;
        }
      }
    });

    const scorePct = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePct >= PASSING_PERCENTAGE;
    const timeSpent = TOTAL_TIME_SECONDS - timeLeft;

    const summary = {
      scorePct,
      correctCount,
      totalQuestions,
      passed,
      timeSpent,
      domainStats,
      isHardMode
    };

    setResultsData(summary);
    setIsSubmitted(true);
    setShowSubmitConfirm(false);
    setShowNavigator(false);

    if (isHardMode) {
      submitHardMockExam({
        score: scorePct,
        correctCount,
        totalQuestions: 100,
        timeSpentSec: timeSpent,
        domainScores: domainStats,
        isDisqualified: false
      });
    } else {
      submitMockExam({
        score: scorePct,
        correctCount,
        totalQuestions: 500,
        timeSpentSec: timeSpent,
        domainScores: domainStats
      });
    }

    if (passed) {
      audioService.playSuccess();
    }
  };

  // Reset & Retake
  const handleRetake = () => {
    setSelectedAnswers({});
    setFlaggedQuestions(new Set());
    setTimeLeft(TOTAL_TIME_SECONDS);
    setIsTimerRunning(true);
    setIsSubmitted(false);
    setIsTerminated(false);
    setResultsData(null);
    setCurrentIdx(0);
    setReviewMode(false);
    if (isHardMode) {
      setHasAgreedTerms(false);
      setAgreedCheckbox(false);
    }
  };

  // Jump to OS section
  const jumpToDomain = (startIndex) => {
    setCurrentIdx(startIndex);
    setShowNavigator(false);
  };

  const getOSBadge = (osKey) => {
    switch (osKey) {
      case 'windows':
        return { name: 'Windows 11', bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
      case 'linux':
        return { name: 'Ubuntu Linux', bg: 'bg-orange-500/10 text-orange-400 border-orange-500/30' };
      case 'macos':
        return { name: 'macOS Sonoma', bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30' };
      case 'chrome':
        return { name: 'Google ChromeOS', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
      default:
        return { name: 'Enterprise Storage & Net', bg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' };
    }
  };

  const activeBadge = getOSBadge(currentQ.os);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-hidden select-none">
      <div className={`relative w-full max-w-5xl h-[92vh] max-h-[850px] bg-slate-900 border rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100 animate-window ${
        isTerminated 
          ? 'border-red-600/90 ring-4 ring-red-600/30' 
          : isHardMode 
          ? 'border-red-500/40 shadow-red-950/20' 
          : 'border-slate-700/80'
      }`}>
        
        {/* ======================================================== */}
        {/* HEADER BAR                                               */}
        {/* ======================================================== */}
        <div className="p-3.5 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${
              isHardMode 
                ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse' 
                : 'bg-purple-600/20 text-purple-400 border-purple-500/30'
            }`}>
              {isHardMode ? <Flame className="w-5 h-5 text-red-400" /> : <Trophy className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {isHardMode ? 'Hard Level Proctored Assessment' : 'Final Mock Assessment'}
                </h2>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border flex items-center gap-1 ${
                  isHardMode
                    ? 'bg-red-500/20 text-red-300 border-red-500/40'
                    : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                }`}>
                  {isHardMode ? (
                    <>
                      <ShieldAlert className="w-3 h-3 text-red-400" />
                      100 Hard MCQs • 2 Hours (Anti-Cheat)
                    </>
                  ) : (
                    '500 Questions • 120 Mins'
                  )}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden xs:block">
                {isHardMode 
                  ? 'Zero-Tolerance Anti-Cheat: Tab Switch or Screenshot = Immediate Termination • No Early Submit'
                  : 'All 4 Operating Systems • Strict 90% Passing Score (≥450/500) to Unlock Official Certificate'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mode Switcher (only before submitting or terminating) */}
            {!isSubmitted && !isTerminated && (
              <div className="hidden md:flex bg-slate-900 p-0.5 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => {
                    setExamType('standard');
                    setHasAgreedTerms(true);
                    handleRetake();
                  }}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    examType === 'standard' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  500Q Standard
                </button>
                <button
                  onClick={() => {
                    setExamType('hard');
                    setHasAgreedTerms(false);
                    handleRetake();
                  }}
                  className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                    examType === 'hard' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Flame className="w-3 h-3" />
                  Hard 100Q Proctored
                </button>
              </div>
            )}

            {/* Live 2-Hour Countdown Timer */}
            {!isSubmitted && !isTerminated && (hasAgreedTerms || !isHardMode) && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs sm:text-sm ${
                isHardMode
                  ? 'bg-red-950/40 border-red-500/50 text-red-300'
                  : timeLeft < 600
                  ? 'bg-red-500/20 border-red-500/60 text-red-300 animate-pulse'
                  : 'bg-slate-800 border-slate-700 text-blue-300'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}

            {/* Question Navigator Toggle */}
            {!isSubmitted && !isTerminated && (hasAgreedTerms || !isHardMode) && (
              <button
                onClick={() => setShowNavigator(true)}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
                title="Open Question Matrix"
              >
                <Grid className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">Grid</span>
                <span className="text-[11px] text-slate-400">({answeredCount}/{totalQuestions})</span>
              </button>
            )}

            <button
              onClick={() => {
                if (isHardMode && !isSubmitted && !isTerminated && hasAgreedTerms) {
                  if (confirm('Warning: Closing the modal will terminate your proctored assessment attempt with a score of 0%. Are you sure?')) {
                    triggerTermination('Learner closed the examination modal.');
                    onClose();
                  }
                } else {
                  onClose();
                }
              }}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick OS Section Switcher */}
        {!isSubmitted && !isTerminated && (hasAgreedTerms || !isHardMode) && (
          <div className="px-3 sm:px-5 py-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs shrink-0 no-scrollbar">
            <span className="text-[10px] font-bold text-slate-500 uppercase shrink-0">Sections:</span>
            {isHardMode ? [
              { label: 'Windows Internals (1-25)', start: 0, os: 'windows' },
              { label: 'Linux Kernel & eBPF (26-50)', start: 25, os: 'linux' },
              { label: 'macOS Darwin & SIP (51-70)', start: 50, os: 'macos' },
              { label: 'ChromeOS dm-verity (71-85)', start: 70, os: 'chrome' },
              { label: 'Storage & Net (86-100)', start: 85, os: 'storage' }
            ].map(sec => {
              const isActive = currentIdx >= sec.start && currentIdx < (sec.start + (sec.os === 'macos' ? 20 : sec.os === 'chrome' ? 15 : sec.os === 'storage' ? 15 : 25));
              return (
                <button
                  key={sec.label}
                  onClick={() => jumpToDomain(sec.start)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                    isActive ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  {sec.label}
                </button>
              );
            }) : [
              { label: 'Windows (1-125)', start: 0, os: 'windows' },
              { label: 'Linux (126-250)', start: 125, os: 'linux' },
              { label: 'macOS (251-375)', start: 250, os: 'macos' },
              { label: 'ChromeOS (376-450)', start: 375, os: 'chrome' },
              { label: 'Storage & Net (451-500)', start: 450, os: 'storage' }
            ].map(sec => {
              const isActive = currentIdx >= sec.start && currentIdx < (sec.start + (sec.os === 'chrome' ? 75 : sec.os === 'storage' ? 50 : 125));
              return (
                <button
                  key={sec.label}
                  onClick={() => jumpToDomain(sec.start)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                    isActive ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>
        )}

        {/* ======================================================== */}
        {/* MAIN BODY AREA                                           */}
        {/* ======================================================== */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* SCREEN 1: HARD MODE PRE-EXAM SECURITY BRIEFING */}
          {isHardMode && !hasAgreedTerms && !isTerminated && !isSubmitted && (
            <div className="max-w-2xl mx-auto py-4 space-y-5 animate-window">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-red-600/20 text-red-400 border border-red-500/40 flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Hard Level Proctored Assessment Briefing
                </h3>
                <p className="text-xs text-slate-400">
                  2 Hours (120 Minutes) • 100 Hard-Level MCQs • Mandatory Anti-Cheat Surveillance
                </p>
              </div>

              {/* Security Policy Cards */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3.5 rounded-2xl bg-red-950/20 border border-red-500/40 text-red-200 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">1. Zero-Tolerance Tab Switching & Focus Rule:</strong>
                    Leaving this browser tab, minimizing the window, or switching to any external app will trigger <strong>immediate termination, cancellation, and a 0% score</strong>.
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-red-950/20 border border-red-500/40 text-red-200 flex items-start gap-3">
                  <Siren className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">2. Anti-Screenshot & Screen Capture Detection:</strong>
                    Pressing PrintScreen, Windows Snipping Tool (Win+Shift+S), or macOS Capture shortcuts (Cmd+Shift+3/4/5) will trigger <strong>immediate cancellation and disqualification</strong>. Right-click and copy operations are disabled.
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/40 text-amber-200 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">3. No Early Submission:</strong>
                    Learners <strong>cannot submit before the full 2 hours (120 minutes) elapse</strong>. The exam will automatically submit and grade when the timer reaches 00:00:00.
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80 text-slate-300 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">4. Passing Mark: 90% (≥90 / 100 correct):</strong>
                    Conquering this assessment awards the exclusive <strong>Proctor Grandmaster</strong> honors badge and satisfies the official certificate requirement.
                  </div>
                </div>
              </div>

              {/* Agreement Checkbox */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="proctor-agree"
                  checked={agreedCheckbox}
                  onChange={(e) => setAgreedCheckbox(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-500 focus:ring-offset-slate-900 border-slate-700 cursor-pointer"
                />
                <label htmlFor="proctor-agree" className="text-xs text-slate-300 cursor-pointer leading-relaxed">
                  I agree to the academic integrity rules. I understand that switching tabs or taking screenshots will immediately terminate and disqualify my exam, and early submission before 2 hours is disabled.
                </label>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    setExamType('standard');
                    setHasAgreedTerms(true);
                  }}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Switch to Standard 500Q Exam
                </button>
                <button
                  disabled={!agreedCheckbox}
                  onClick={() => {
                    audioService.playClick();
                    setHasAgreedTerms(true);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 font-bold text-xs text-white shadow-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Begin 2-Hour Proctored Assessment</span>
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 2: ACTIVE EXAM INTERFACE */}
          {!isSubmitted && !isTerminated && (hasAgreedTerms || !isHardMode) && (
            <div className="max-w-3xl mx-auto space-y-5">
              {/* Question Meta & Progress Header */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-1 rounded-lg border font-semibold text-[11px] ${activeBadge.bg}`}>
                    {activeBadge.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px]">
                    {currentQ.category}
                  </span>
                  {isHardMode && (
                    <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] font-bold">
                      Proctored Hard Level
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Flag Question Button */}
                  <button
                    onClick={toggleFlagCurrent}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                      flaggedQuestions.has(currentQ.id)
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-white'
                    }`}
                  >
                    {flaggedQuestions.has(currentQ.id) ? (
                      <>
                        <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Flagged</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Flag</span>
                      </>
                    )}
                  </button>

                  <div className="text-right text-slate-400 font-mono">
                    <span className="font-bold text-white text-sm">{currentIdx + 1}</span>
                    <span className="text-xs"> / {totalQuestions}</span>
                  </div>
                </div>
              </div>

              {/* Linear Progress Bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isHardMode 
                      ? 'bg-gradient-to-r from-red-500 to-amber-500' 
                      : 'bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-400'
                  }`}
                  style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
                />
              </div>

              {/* Question Text Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/40 border border-slate-700/80 text-sm sm:text-base font-semibold text-white leading-relaxed shadow-sm">
                <span className={`${isHardMode ? 'text-red-400' : 'text-purple-400'} font-bold mr-2`}>
                  Q{currentIdx + 1}.
                </span>
                {currentQ.question}
              </div>

              {/* 4 Answer Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentQ.id] === optIdx;
                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm cursor-pointer transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? isHardMode
                            ? 'bg-red-600/20 border-red-500 text-white font-medium ring-2 ring-red-500/50 shadow-md'
                            : 'bg-purple-600/20 border-purple-500 text-white font-medium ring-2 ring-purple-500/50 shadow-md'
                          : 'bg-slate-800/40 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-xl border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-all ${
                        isSelected
                          ? isHardMode
                            ? 'border-red-400 bg-red-600 text-white shadow-sm'
                            : 'border-purple-400 bg-purple-600 text-white shadow-sm'
                          : 'border-slate-700 bg-slate-800 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="leading-relaxed flex-1 select-text">{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* In-Exam Warning Banner for Hard Mode */}
              {isHardMode && (
                <div className="p-3 rounded-2xl bg-red-950/20 border border-red-500/30 text-[11px] text-red-300/90 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Anti-Cheat Active: Do NOT switch tabs or take screenshots. Early submit locked until 2 hours.</span>
                  </div>
                  <span className="font-mono font-bold text-red-400">{formatTime(timeLeft)}</span>
                </div>
              )}
            </div>
          )}

          {/* SCREEN 3: EXAM TERMINATED & CANCELLED TAKEOVER SCREEN */}
          {isTerminated && (
            <div className="max-w-2xl mx-auto py-8 space-y-6 text-center animate-window">
              <div className="w-24 h-24 rounded-full bg-red-600/20 border-4 border-red-600 flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                <Siren className="w-12 h-12 text-red-500" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/40">
                  <ShieldAlert className="w-4 h-4" /> Proctor Security Violation
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-red-500 tracking-tight">
                  EXAM TERMINATED & CANCELLED
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                  A fatal academic integrity violation was detected by the real-time proctor surveillance engine. Your examination session has been aborted immediately.
                </p>
              </div>

              {/* Specific Violation Details Box */}
              <div className="p-5 rounded-2xl bg-red-950/40 border border-red-600/60 text-left text-xs space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-red-800/60 pb-2">
                  <span className="font-bold text-red-300 uppercase tracking-wide">Disciplinary Breach Dossier</span>
                  <span className="font-mono text-red-400 text-[11px]">{violationTimestamp || 'Immediate'}</span>
                </div>

                <div className="space-y-1.5 text-slate-300">
                  <div><strong>Triggered Event:</strong> <span className="text-red-300 font-semibold">{terminationReason}</span></div>
                  <div><strong>Examination Status:</strong> <span className="text-red-400 font-bold uppercase">DISQUALIFIED (Score: 0%)</span></div>
                  <div><strong>Account Status:</strong> <span className="text-amber-300 font-bold uppercase">LOCKED FOR 24 HOURS</span></div>
                  <div><strong>Questions Answered:</strong> {answeredCount} / {totalQuestions} (Voided)</div>
                </div>

                {/* Email Dispatch Notice */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-red-500/30 text-slate-300 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Official Disciplinary Notice Dispatched To:</span>
                  </div>
                  <div className="text-[11px] text-slate-400 pl-5 font-mono space-y-0.5">
                    <div>1. kapilnarula27july@gmail.com (Founder)</div>
                    <div>2. namaste@sarlayash.com (Committee)</div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 pt-1 leading-relaxed border-t border-red-800/40">
                  Under the SarlaYash Academic Integrity Policy, tab switching, window blurring, and screen capture shortcuts result in immediate 0% disqualification and mandatory 24-hour lab suspension.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white shadow-xl flex items-center gap-2 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>Enter 24-Hour Account Lockout Screen</span>
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 4: RESULTS SCREEN (ON COMPLETION) */}
          {isSubmitted && resultsData && !reviewMode && (
            <div className="max-w-2xl mx-auto space-y-6 py-4 animate-window text-center">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-2xl border ${
                resultsData.passed
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
              }`}>
                {resultsData.passed ? (
                  <Trophy className="w-10 h-10 animate-bounce" />
                ) : (
                  <AlertCircle className="w-10 h-10" />
                )}
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-800 border border-slate-700">
                  {resultsData.passed ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Examination Passed (≥90%)
                    </span>
                  ) : (
                    <span className="text-amber-400 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> Needs Retry — 90% Pass Mark Required
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white pt-2">
                  {resultsData.passed
                    ? isHardMode ? 'Conquered! Proctor Grandmaster Unlocked!' : 'Congratulations! You Passed!'
                    : 'Great Effort! Review and Retry to Unlock Certificate'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {resultsData.passed
                    ? isHardMode 
                      ? 'You successfully endured the 2-Hour 100 Hard-Level Proctored Examination with zero security violations!'
                      : 'You conquered the 500-question curriculum with mastery!'
                    : `You answered ${resultsData.correctCount} of ${totalQuestions} questions correctly (${resultsData.scorePct}%). You need at least 90% to unlock the verified certificate.`}
                </p>
              </div>

              {/* Big Score Summary Banner */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Final Score</div>
                  <div className={`text-2xl font-black ${resultsData.passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {resultsData.scorePct}%
                  </div>
                  <div className="text-[10px] text-slate-500">Passing: 90%</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Correct Answers</div>
                  <div className="text-2xl font-black text-white">
                    {resultsData.correctCount} <span className="text-xs font-normal text-slate-500">/ {totalQuestions}</span>
                  </div>
                  <div className="text-[10px] text-slate-500">Target: ≥{Math.round(totalQuestions * 0.9)}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Time Spent</div>
                  <div className="text-2xl font-black text-blue-400">
                    {Math.floor(resultsData.timeSpent / 60)}m {resultsData.timeSpent % 60}s
                  </div>
                  <div className="text-[10px] text-slate-500">Limit: 120 mins</div>
                </div>
              </div>

              {/* OS Domain Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-purple-400" />
                    OS Domain Performance Breakdown
                  </span>
                  <span className="text-slate-500 text-[11px]">Individual sections</span>
                </div>

                <div className="space-y-2">
                  {Object.entries(resultsData.domainStats).map(([key, dom]) => {
                    const domPct = dom.total > 0 ? Math.round((dom.correct / dom.total) * 100) : 0;
                    return (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 font-medium">{dom.label}</span>
                          <span className="font-mono text-slate-400">
                            {dom.correct}/{dom.total} ({domPct}%)
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${domPct >= 90 ? 'bg-emerald-500' : domPct >= 75 ? 'bg-blue-500' : 'bg-amber-500'}`}
                            style={{ width: `${domPct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setReviewMode(true)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all"
                >
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>Review Explanations</span>
                </button>

                <button
                  onClick={handleRetake}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all"
                >
                  <RotateCw className="w-4 h-4 text-purple-400" />
                  <span>Retake Assessment</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    if (onOpenCertificate) onOpenCertificate();
                  }}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg flex items-center gap-2 transition-all ${
                    resultsData.passed
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{resultsData.passed ? 'View Official Certificate' : 'View Demo Preview'}</span>
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 5: REVIEW EXPLANATIONS MODE */}
          {isSubmitted && reviewMode && (
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setReviewMode(false)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 text-xs"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Summary</span>
                  </button>
                  <span className="text-xs font-bold text-white">Answer Key & Review</span>
                </div>

                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setReviewFilter('incorrect')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      reviewFilter === 'incorrect' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Wrong Answers Only
                  </button>
                  <button
                    onClick={() => setReviewFilter('all')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      reviewFilter === 'all' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All {totalQuestions} Questions
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {activeQuestions
                  .filter(q => {
                    const isCorrect = selectedAnswers[q.id] === q.correct;
                    if (reviewFilter === 'incorrect') return !isCorrect;
                    return true;
                  })
                  .map(q => {
                    const userSelected = selectedAnswers[q.id];
                    const isCorrect = userSelected === q.correct;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
                          isCorrect ? 'bg-slate-950/60 border-slate-800' : 'bg-red-950/10 border-red-500/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                            )}
                            <span className="font-bold text-white">Q{q.index}. {q.question}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 uppercase shrink-0 font-mono">
                            {q.os}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-semibold">Your Answer:</span>
                            <span className={userSelected === undefined ? 'text-amber-400 italic' : isCorrect ? 'text-emerald-400 font-medium' : 'text-red-400 font-medium'}>
                              {userSelected !== undefined ? q.options[userSelected] : 'Unanswered'}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-emerald-400 block font-semibold">Correct Answer:</span>
                            <span className="text-white font-medium">{q.options[q.correct]}</span>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300">
                          <strong className="text-purple-400">Explanation: </strong>
                          {q.explanation}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

        </div>

        {/* ======================================================== */}
        {/* FOOTER BAR: Previous, Next, Clear, Submit                */}
        {/* ======================================================== */}
        {!isSubmitted && !isTerminated && (hasAgreedTerms || !isHardMode) && (
          <div className="p-3.5 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                className="px-3.5 sm:px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Previous</span>
              </button>

              <button
                onClick={() => {
                  setSelectedAnswers(prev => {
                    const copy = { ...prev };
                    delete copy[currentQ.id];
                    return copy;
                  });
                }}
                disabled={selectedAnswers[currentQ.id] === undefined}
                className="px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Clear selected answer"
              >
                Clear
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* SUBMIT BUTTON */}
              {isHardMode ? (
                // HARD MODE: Strictly LOCKED until 2 hours expire!
                <button
                  onClick={() => setShowEarlySubmitBlocked(true)}
                  className="px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/40 border border-red-500/40 text-xs font-bold text-red-300 flex items-center gap-1.5 transition-all"
                  title="Early submission is locked"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Submit (Locked: {formatTime(timeLeft)})</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-all"
                >
                  Submit Exam
                </button>
              )}

              <button
                onClick={() => {
                  if (currentIdx < totalQuestions - 1) {
                    setCurrentIdx(prev => prev + 1);
                  } else if (!isHardMode) {
                    setShowSubmitConfirm(true);
                  } else {
                    setShowEarlySubmitBlocked(true);
                  }
                }}
                className={`px-5 sm:px-6 py-2 rounded-xl font-bold text-xs text-white shadow-md flex items-center gap-1.5 transition-all ${
                  isHardMode ? 'bg-red-600 hover:bg-red-500' : 'bg-purple-600 hover:bg-purple-500'
                }`}
              >
                <span>{currentIdx === totalQuestions - 1 ? 'Review Last' : 'Next'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 1: QUESTION MATRIX NAVIGATOR DRAWER                */}
        {/* ======================================================== */}
        {showNavigator && (
          <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col p-4 sm:p-6 animate-window">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Grid className="w-5 h-5 text-purple-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {totalQuestions} Questions Grid Navigator
                  </h3>
                  <p className="text-[11px] text-slate-400">Click any tile to jump to that question</p>
                </div>
              </div>
              <button
                onClick={() => setShowNavigator(false)}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-3 flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={() => setNavigatorFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  navigatorFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                All ({totalQuestions})
              </button>
              <button
                onClick={() => setNavigatorFilter('answered')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  navigatorFilter === 'answered' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Answered ({answeredCount})
              </button>
              <button
                onClick={() => setNavigatorFilter('unanswered')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  navigatorFilter === 'unanswered' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Unanswered ({unansweredCount})
              </button>
              <button
                onClick={() => setNavigatorFilter('flagged')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  navigatorFilter === 'flagged' ? 'bg-yellow-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Flagged ({flaggedCount})
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 bg-slate-900/60 rounded-2xl border border-slate-800 grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 lg:grid-cols-20 gap-1.5 text-center text-xs">
              {activeQuestions
                .filter(q => {
                  const isAns = selectedAnswers[q.id] !== undefined;
                  const isFlag = flaggedQuestions.has(q.id);
                  if (navigatorFilter === 'answered') return isAns;
                  if (navigatorFilter === 'unanswered') return !isAns;
                  if (navigatorFilter === 'flagged') return isFlag;
                  return true;
                })
                .map(q => {
                  const isAns = selectedAnswers[q.id] !== undefined;
                  const isFlag = flaggedQuestions.has(q.id);
                  const isCur = q.index - 1 === currentIdx;

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIdx(q.index - 1);
                        setShowNavigator(false);
                      }}
                      className={`h-9 rounded-lg font-mono text-[11px] font-bold flex items-center justify-center transition-all relative ${
                        isCur
                          ? isHardMode
                            ? 'ring-2 ring-red-400 bg-red-600 text-white shadow-lg'
                            : 'ring-2 ring-purple-400 bg-purple-600 text-white shadow-lg'
                          : isFlag
                          ? 'bg-amber-500/20 border border-amber-500/60 text-amber-300'
                          : isAns
                          ? 'bg-emerald-600/30 border border-emerald-500/50 text-emerald-300'
                          : 'bg-slate-800/80 border border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {q.index}
                      {isFlag && (
                        <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
                      )}
                    </button>
                  );
                })}
            </div>

            <div className="pt-3 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500/50 border border-emerald-500" /> Answered
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500/50 border border-amber-500" /> Flagged
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-slate-800 border border-slate-700" /> Unanswered
                </span>
              </div>
              <button
                onClick={() => setShowNavigator(false)}
                className="px-4 py-1.5 rounded-xl bg-purple-600 text-white font-bold"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 2: EARLY SUBMISSION BLOCKED MODAL (HARD MODE)      */}
        {/* ======================================================== */}
        {showEarlySubmitBlocked && (
          <div className="absolute inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-md w-full p-6 rounded-3xl bg-slate-900 border border-amber-500/50 shadow-2xl space-y-4 animate-window text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Early Submission is Disabled</h3>
                <p className="text-xs text-slate-400 mt-1">
                  In accordance with the Hard-Level Assessment rules, learners <strong>cannot submit before the full 2 hours (120 minutes)</strong> have elapsed.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 text-left space-y-1.5">
                <div className="font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Time Remaining: {formatTime(timeLeft)}</span>
                </div>
                <p className="text-[11px] text-amber-100/80 leading-relaxed">
                  Please use your remaining time to review flagged and unanswered questions. Once the 2 hours elapse, the system will automatically submit and score your assessment.
                </p>
              </div>

              <button
                onClick={() => setShowEarlySubmitBlocked(false)}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg"
              >
                Return to Assessment
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 3: STANDARD SUBMIT CONFIRMATION                    */}
        {/* ======================================================== */}
        {showSubmitConfirm && !isHardMode && (
          <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-md w-full p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4 animate-window text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Ready to Submit Examination?</h3>
                <p className="text-xs text-slate-400 mt-1">
                  You have answered <strong className="text-white">{answeredCount}</strong> of {totalQuestions} questions.
                </p>
              </div>

              {unansweredCount > 0 && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 text-left space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{unansweredCount} Questions Remaining Unanswered</span>
                  </div>
                  <p className="text-[11px] text-amber-200/80">
                    A minimum score of <strong>90% (450 correct)</strong> is strictly required to unlock the official certificate. Unanswered questions will be scored as incorrect.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Return to Exam
                </button>
                <button
                  onClick={calculateAndSubmit}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg"
                >
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

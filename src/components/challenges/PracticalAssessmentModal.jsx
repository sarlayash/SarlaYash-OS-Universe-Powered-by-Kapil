// 120-Minute 500-Question Final Mock Assessment Modal
// SarlaYash OS Universe — Powered by Kapil
// Strict Passing Threshold: 90% (≥450/500) to unlock Official Certificate

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
  Clock,
  Bookmark,
  BookmarkCheck,
  Grid,
  Filter,
  Check,
  HelpCircle,
  BarChart3,
  Eye,
  Lock,
  Sparkles
} from 'lucide-react';
import { ChromeIcon } from '../icons/ChromeIcon';
import { ASSESSMENT_500_QUESTIONS } from '../../services/assessment500Engine';
import { useLearner } from '../../context/LearnerContext';
import { audioService } from '../../services/audioService';

const TOTAL_TIME_SECONDS = 120 * 60; // 120 minutes = 7200 seconds
const PASSING_PERCENTAGE = 90; // 90% passing score strictly required
const PASSING_THRESHOLD_QUESTIONS = 450; // 450 / 500

export const PracticalAssessmentModal = ({ isOpen, onClose, onOpenCertificate }) => {
  const { 
    submitMockExam, 
    mockExamScore, 
    mockExamPassed, 
    isCertificateUnlocked 
  } = useLearner();

  // Active question index (0 to 499)
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  
  // Modal & Drawer views
  const [showNavigator, setShowNavigator] = useState(false);
  const [navigatorFilter, setNavigatorFilter] = useState('all'); // 'all' | 'unanswered' | 'answered' | 'flagged'
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  
  // Results & Review
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultsData, setResultsData] = useState(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('incorrect'); // 'all' | 'incorrect' | 'correct'

  const totalQuestions = ASSESSMENT_500_QUESTIONS.length;
  const currentQ = ASSESSMENT_500_QUESTIONS[currentIdx] || ASSESSMENT_500_QUESTIONS[0];

  // Timer countdown hook
  useEffect(() => {
    if (!isOpen || isSubmitted || !isTimerRunning) return;

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
  }, [isOpen, isSubmitted, isTimerRunning]);

  // Format seconds to HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Keyboard navigation & quick shortcuts
  useEffect(() => {
    if (!isOpen || isSubmitted || showNavigator || showSubmitConfirm) return;

    const handleKeyDown = (e) => {
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

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitted, currentIdx, showNavigator, showSubmitConfirm]);

  if (!isOpen) return null;

  // Question action handlers
  const handleSelectOption = (optIdx) => {
    if (isSubmitted) return;
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

  // Auto-submit when timer expires
  const handleAutoSubmit = () => {
    calculateAndSubmit();
  };

  // Calculate scores and submit
  const calculateAndSubmit = () => {
    let correctCount = 0;
    const domainStats = {
      windows: { total: 0, correct: 0, label: 'Windows 11' },
      linux: { total: 0, correct: 0, label: 'Ubuntu Linux' },
      macos: { total: 0, correct: 0, label: 'macOS Sonoma' },
      chrome: { total: 0, correct: 0, label: 'Google ChromeOS' },
      storage: { total: 0, correct: 0, label: 'Storage & Systems' }
    };

    ASSESSMENT_500_QUESTIONS.forEach(q => {
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
      domainStats
    };

    setResultsData(summary);
    setIsSubmitted(true);
    setShowSubmitConfirm(false);
    setShowNavigator(false);

    submitMockExam({
      score: scorePct,
      correctCount,
      totalQuestions,
      timeSpentSec: timeSpent,
      domainScores: domainStats
    });

    if (passed) {
      audioService.playSuccess();
    }
  };

  // Retake test reset
  const handleRetake = () => {
    setSelectedAnswers({});
    setFlaggedQuestions(new Set());
    setTimeLeft(TOTAL_TIME_SECONDS);
    setIsTimerRunning(true);
    setIsSubmitted(false);
    setResultsData(null);
    setCurrentIdx(0);
    setReviewMode(false);
  };

  // Jump to specific OS domain
  const jumpToDomain = (domainIndex) => {
    setCurrentIdx(domainIndex);
    setShowNavigator(false);
  };

  // Get OS color & badge
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
        return { name: 'Cross-Platform Systems', bg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' };
    }
  };

  const activeBadge = getOSBadge(currentQ.os);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-hidden select-none">
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[850px] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100 animate-window">
        
        {/* ======================================================== */}
        {/* HEADER BAR: Title, 120-min Countdown, Stats, Close       */}
        {/* ======================================================== */}
        <div className="p-3.5 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Final Mock Assessment
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  500 Questions • 120 Mins
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden xs:block">
                All 4 Operating Systems • Strict 90% Passing Score (≥450/500) to Unlock Official Certificate
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live 120-min Countdown Timer */}
            {!isSubmitted && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs sm:text-sm ${
                timeLeft < 600
                  ? 'bg-red-500/20 border-red-500/60 text-red-300 animate-pulse'
                  : timeLeft < 1800
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-blue-300'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}

            {/* Question Navigator Toggle */}
            {!isSubmitted && (
              <button
                onClick={() => setShowNavigator(true)}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
                title="Open 500 Question Matrix"
              >
                <Grid className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">Navigator</span>
                <span className="text-[11px] text-slate-400">({answeredCount}/500)</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick OS Domain Jumper Bar */}
        {!isSubmitted && (
          <div className="px-3 sm:px-5 py-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs shrink-0 no-scrollbar">
            <span className="text-[10px] font-bold text-slate-500 uppercase shrink-0">Jump To:</span>
            {[
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
                    isActive
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
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
          
          {/* 1. EXAM TAKING VIEW */}
          {!isSubmitted && (
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

                  <div className="text-right text-slate-400">
                    <span className="font-bold text-white text-sm">{currentIdx + 1}</span>
                    <span className="text-xs"> / {totalQuestions}</span>
                  </div>
                </div>
              </div>

              {/* Linear Progress Bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
                />
              </div>

              {/* Question Text Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/40 border border-slate-700/80 text-sm sm:text-base font-semibold text-white leading-relaxed shadow-sm">
                <span className="text-purple-400 font-bold mr-2">Q{currentIdx + 1}.</span>
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
                          ? 'bg-purple-600/20 border-purple-500 text-white font-medium ring-2 ring-purple-500/50 shadow-md'
                          : 'bg-slate-800/40 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-xl border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-all ${
                        isSelected
                          ? 'border-purple-400 bg-purple-600 text-white shadow-sm'
                          : 'border-slate-700 bg-slate-800 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="leading-relaxed flex-1 select-text">{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Shortcut Hint */}
              <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-3 pt-2">
                <span>Tip: Press keys <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px]">1-4</kbd> to select</span>
                <span>•</span>
                <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px]">← / →</kbd> to navigate</span>
                <span>•</span>
                <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px]">F</kbd> to flag</span>
              </div>
            </div>
          )}

          {/* 2. RESULTS & GRADING VIEW */}
          {isSubmitted && resultsData && !reviewMode && (
            <div className="max-w-2xl mx-auto space-y-6 py-4 animate-window text-center">
              {/* Badge Icon */}
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

              {/* Main Headline */}
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
                    ? 'Congratulations! You Passed the Final Mock Assessment!'
                    : 'Great Effort! Review and Retry to Unlock Certificate'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {resultsData.passed
                    ? 'You have conquered the 500-question curriculum across all 4 OS types with mastery!'
                    : `You answered ${resultsData.correctCount} of 500 questions correctly (${resultsData.scorePct}%). You need at least 450 (90%) to unlock the verified certificate.`}
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
                    {resultsData.correctCount} <span className="text-xs font-normal text-slate-500">/ 500</span>
                  </div>
                  <div className="text-[10px] text-slate-500">Target: ≥450</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Time Taken</div>
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

              {/* Certificate Unlock Notification */}
              {resultsData.passed ? (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-emerald-500/10 border border-amber-500/30 text-left space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Official QR-Verifiable Certificate Unlocked!</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    You have satisfied all academic and practical requirements. Your credential is signed by Kapil Narula, verified with an on-chain style QR ID, and ready for high-resolution PDF and PNG export.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 text-left space-y-2 text-xs text-slate-300">
                  <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                    <Lock className="w-4 h-4" />
                    <span>Official Certificate Remains Locked</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    To maintain high industry credibility, SarlaYash credentials require a 90% score on this comprehensive 500-question exam. You can view your <strong>Demo Preview Certificate</strong> right now or retake the assessment anytime!
                  </p>
                </div>
              )}

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

          {/* 3. DETAILED EXPLANATION REVIEW MODE */}
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

                {/* Filter buttons */}
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
                    All 500 Questions
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                {ASSESSMENT_500_QUESTIONS
                  .filter(q => {
                    const isCorrect = selectedAnswers[q.id] === q.correct;
                    if (reviewFilter === 'incorrect') return !isCorrect;
                    if (reviewFilter === 'correct') return isCorrect;
                    return true;
                  })
                  .map(q => {
                    const userSelected = selectedAnswers[q.id];
                    const isCorrect = userSelected === q.correct;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
                          isCorrect
                            ? 'bg-slate-950/60 border-slate-800'
                            : 'bg-red-950/10 border-red-500/30'
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

                        {/* Options comparison */}
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

                        {/* Explanation */}
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
        {/* FOOTER BAR: Previous, Next, Flag, Submit                 */}
        {/* ======================================================== */}
        {!isSubmitted && (
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
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-all"
              >
                Submit Exam
              </button>

              <button
                onClick={() => {
                  if (currentIdx < totalQuestions - 1) {
                    setCurrentIdx(prev => prev + 1);
                  } else {
                    setShowSubmitConfirm(true);
                  }
                }}
                className="px-5 sm:px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs text-white shadow-md flex items-center gap-1.5 transition-all"
              >
                <span>{currentIdx === totalQuestions - 1 ? 'Review & Submit' : 'Next'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL 1: 500-QUESTION MATRIX NAVIGATOR DRAWER            */}
        {/* ======================================================== */}
        {showNavigator && (
          <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col p-4 sm:p-6 animate-window">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Grid className="w-5 h-5 text-purple-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">500 Questions Grid Navigator</h3>
                  <p className="text-[11px] text-slate-400">Click any tile to jump to that question immediately</p>
                </div>
              </div>
              <button
                onClick={() => setShowNavigator(false)}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Pills */}
            <div className="py-3 flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={() => setNavigatorFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  navigatorFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                All (500)
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

            {/* 500 Questions Grid Container */}
            <div className="flex-1 overflow-y-auto p-2 bg-slate-900/60 rounded-2xl border border-slate-800 grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 lg:grid-cols-20 gap-1.5 text-center text-xs">
              {ASSESSMENT_500_QUESTIONS
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
                          ? 'ring-2 ring-purple-400 bg-purple-600 text-white shadow-lg'
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
        {/* MODAL 2: SUBMIT CONFIRMATION DIALOG                       */}
        {/* ======================================================== */}
        {showSubmitConfirm && (
          <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-md w-full p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4 animate-window text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Ready to Submit Examination?</h3>
                <p className="text-xs text-slate-400 mt-1">
                  You have answered <strong className="text-white">{answeredCount}</strong> of 500 questions.
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

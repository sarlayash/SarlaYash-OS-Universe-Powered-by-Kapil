// Practical Assessment & Certification Exam Modal
import React, { useState } from 'react';
import { 
  Trophy, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCw, 
  Award, 
  ShieldCheck 
} from 'lucide-react';
import { ASSESSMENT_QUESTIONS } from '../../services/challengeService';
import { useLearner } from '../../context/LearnerContext';
import { audioService } from '../../services/audioService';

export const PracticalAssessmentModal = ({ isOpen, onClose, onOpenCertificate }) => {
  const { submitPracticalAssessment, assessmentScore } = useLearner();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState(null);

  if (!isOpen) return null;

  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const currentQ = ASSESSMENT_QUESTIONS[currentIdx];

  const handleSelectOption = (optIdx) => {
    if (isSubmitted) return;
    audioService.playClick();
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const handleNext = () => {
    audioService.playClick();
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    ASSESSMENT_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / totalQuestions) * 100);
    setCalculatedScore(scorePct);
    setIsSubmitted(true);
    submitPracticalAssessment(scorePct);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCalculatedScore(null);
    setCurrentIdx(0);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto select-none">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100 my-auto animate-window">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">OS Universe Practical Assessment</h2>
              <p className="text-xs text-slate-400">
                Test your knowledge across Windows, Linux, macOS, and ChromeOS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[70vh] space-y-5">
          {!isSubmitted ? (
            <>
              {/* Stepper Progress */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Question {currentIdx + 1} of {totalQuestions}</span>
                  <span>Pass mark: 80%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="text-sm font-semibold text-white leading-relaxed">
                {currentQ.question}
              </div>

              {/* Options */}
              <div className="space-y-2">
                {currentQ.options.map((opt, i) => {
                  const isSelected = selectedAnswers[currentQ.id] === i;
                  return (
                    <div
                      key={i}
                      onClick={() => handleSelectOption(i)}
                      className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-purple-600/20 border-purple-500 text-white font-semibold ring-1 ring-purple-500'
                          : 'bg-slate-800/50 border-slate-700/70 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                        isSelected ? 'border-purple-400 bg-purple-600 text-white' : 'border-slate-600 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="leading-relaxed">{opt}</span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* Results Screen */
            <div className="text-center space-y-5 py-4 animate-window">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-xl ${
                calculatedScore >= 80 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {calculatedScore >= 80 ? <Trophy className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  {calculatedScore >= 80 ? 'Congratulations! You Passed!' : 'Good Effort! Keep Learning'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  You scored <strong className="text-white text-sm">{calculatedScore}%</strong> on the Practical Assessment.
                </p>
              </div>

              {calculatedScore >= 80 ? (
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/40 text-xs text-purple-200 space-y-2">
                  <div className="flex items-center justify-center gap-2 font-bold text-white">
                    <Award className="w-4 h-4 text-purple-400" />
                    <span>Unlocked: OS Universe Champion Badge</span>
                  </div>
                  <p className="text-[11px] text-purple-300">
                    Your QR-verifiable SarlaYash certificate is now fully certified and ready for download!
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
                  Score 80% or higher to unlock the OS Universe Champion badge and honors certificate.
                </div>
              )}

              {/* Review Question Explanations */}
              <div className="text-left space-y-3 pt-3 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-300">Answer Key & Review:</span>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {ASSESSMENT_QUESTIONS.map((q, idx) => {
                    const isUserCorrect = selectedAnswers[q.id] === q.correct;
                    return (
                      <div key={q.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] space-y-1">
                        <div className="flex items-center gap-1.5 font-medium">
                          {isUserCorrect ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          )}
                          <span className="text-slate-200">Q{idx + 1}: {q.question}</span>
                        </div>
                        <p className="text-slate-400 pl-5 text-[10px] leading-relaxed">
                          Correct: {q.options[q.correct]} — <em>{q.explanation}</em>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          {!isSubmitted ? (
            <>
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                disabled={selectedAnswers[currentQ.id] === undefined}
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <span>{currentIdx === totalQuestions - 1 ? 'Submit Exam' : 'Next Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="w-full flex items-center justify-between gap-3">
              <button
                onClick={handleRetake}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Retake Test</span>
              </button>
              <button
                onClick={() => { onClose(); if (onOpenCertificate) onOpenCertificate(); }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-xs font-bold text-white shadow-lg flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>View Official Certificate</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

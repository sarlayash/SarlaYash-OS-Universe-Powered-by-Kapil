import React, { useState, useMemo } from 'react';
import { 
  X, CheckCircle2, Circle, CheckCheck, Award, Zap, 
  Layers, BarChart2, Lightbulb, Terminal, Shield, RefreshCw, 
  Search, ArrowUpRight, Flame
} from 'lucide-react';
import { useLearner } from '../../context/LearnerContext';

export default function ModuleCompletionModal({ 
  isOpen, 
  onClose,
  onOpenSpreadsheetSuite,
  onOpenKnowledgeBytes,
  onOpenExam,
  onOpenHardExam,
  onOpenCertificate
}) {
  const { 
    completedModules = [], 
    toggleModuleComplete, 
    markAllModulesComplete,
    allCourseModules = [],
    points = 0
  } = useLearner();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(allCourseModules.map(m => m.category)));
    return ['all', ...cats];
  }, [allCourseModules]);

  // Statistics
  const totalCount = allCourseModules.length;
  const completedCount = allCourseModules.filter(m => completedModules.includes(m.id)).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const totalPossiblePoints = allCourseModules.reduce((acc, m) => acc + (m.points || 0), 0);
  const earnedModulePoints = allCourseModules
    .filter(m => completedModules.includes(m.id))
    .reduce((acc, m) => acc + (m.points || 0), 0);

  // Filtered modules
  const filteredModules = useMemo(() => {
    return allCourseModules.filter(m => {
      if (selectedCategory !== 'all' && m.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!m.name.toLowerCase().includes(q) && !m.category.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [allCourseModules, selectedCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-hidden animate-fade-in">
      <div className="relative w-full max-w-5xl h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/40 text-indigo-400">
              <CheckCheck className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-wide">
                  Course Modules & Section Tracker
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  Universal Completion
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Track and mark completion across every operating system, data simulator, knowledge byte, and lab
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={markAllModulesComplete}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 transition"
              title="Mark all 27 course modules as completed"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark All Completed</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Progress Metrics Bar */}
        <div className="px-6 py-3 bg-slate-950/50 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Progress bar */}
          <div className="flex items-center gap-3 flex-1 min-w-[280px]">
            <span className="text-slate-400 font-semibold whitespace-nowrap">Overall Completion:</span>
            <div className="flex-1 max-w-md h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/80">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-bold text-emerald-400 whitespace-nowrap">
              {completedCount} / {totalCount} ({progressPercent}%)
            </span>
          </div>

          {/* Points Counter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{earnedModulePoints} / {totalPossiblePoints} PTS</span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full text-xs">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat;
              const catModules = cat === 'all' 
                ? allCourseModules 
                : allCourseModules.filter(m => m.category === cat);
              const catCompleted = catModules.filter(m => completedModules.includes(m.id)).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border-slate-700/50'
                  }`}
                >
                  <span className="capitalize">{cat === 'all' ? 'All Sections' : cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    catCompleted === catModules.length && catModules.length > 0
                      ? 'bg-emerald-500/30 text-emerald-300'
                      : 'bg-slate-700 text-slate-300'
                  }`}>
                    {catCompleted}/{catModules.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter modules..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Modules List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5 bg-slate-900/40">
          {filteredModules.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p>No modules match your filter.</p>
            </div>
          ) : (
            filteredModules.map((mod, idx) => {
              const isCompleted = completedModules.includes(mod.id);

              return (
                <div
                  key={mod.id}
                  className={`flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
                    isCompleted
                      ? 'bg-slate-800/60 border-emerald-500/30 text-slate-200'
                      : 'bg-slate-800/30 border-slate-700/60 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  {/* Left: Number, Category Pill, Title */}
                  <div className="flex items-center gap-3 min-w-[260px] flex-1">
                    <button
                      onClick={() => toggleModuleComplete(mod.id)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-slate-800 text-slate-500 border-slate-700 hover:border-slate-500'
                      }`}
                      title={isCompleted ? 'Click to mark incomplete' : 'Click to mark complete'}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                          {mod.category}
                        </span>
                        <span className="text-[10px] text-amber-400 font-bold">
                          +{mod.points} PTS
                        </span>
                      </div>
                      <h4 className={`text-sm font-semibold transition ${isCompleted ? 'text-white' : 'text-slate-300'}`}>
                        {mod.name}
                      </h4>
                    </div>
                  </div>

                  {/* Right: Quick Launch / Action Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Launch Shortcuts */}
                    {mod.id.startsWith('data_') && onOpenSpreadsheetSuite && (
                      <button
                        onClick={() => { onClose(); onOpenSpreadsheetSuite(); }}
                        className="px-2.5 py-1 rounded-lg text-xs bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition flex items-center gap-1"
                      >
                        <span>Open Tool</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}

                    {mod.id.startsWith('kb_') && onOpenKnowledgeBytes && (
                      <button
                        onClick={() => { onClose(); onOpenKnowledgeBytes(); }}
                        className="px-2.5 py-1 rounded-lg text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition flex items-center gap-1"
                      >
                        <span>View Bytes</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}

                    {mod.id === 'final_exam_500q' && onOpenExam && (
                      <button
                        onClick={() => { onClose(); onOpenExam(); }}
                        className="px-2.5 py-1 rounded-lg text-xs bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition flex items-center gap-1"
                      >
                        <span>Launch Exam</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}

                    {mod.id === 'hard_exam_100q' && onOpenHardExam && (
                      <button
                        onClick={() => { onClose(); onOpenHardExam(); }}
                        className="px-2.5 py-1 rounded-lg text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition flex items-center gap-1"
                      >
                        <span>Launch Proctored</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}

                    {mod.id === 'official_certificate' && onOpenCertificate && (
                      <button
                        onClick={() => { onClose(); onOpenCertificate(); }}
                        className="px-2.5 py-1 rounded-lg text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition flex items-center gap-1"
                      >
                        <span>View Certificate</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}

                    {/* Mark as Complete Toggle Button */}
                    <button
                      onClick={() => toggleModuleComplete(mod.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border flex items-center gap-1.5 ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-emerald-500/40 hover:text-white'
                      }`}
                    >
                      {isCompleted ? <CheckCheck className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{isCompleted ? 'Completed ✓' : 'Mark Complete'}</span>
                    </button>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-400">
            Completing modules accumulates knowledge points and satisfies prerequisites for official certification.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllModulesComplete}
              className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 font-semibold transition"
            >
              Complete All ({totalCount})
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

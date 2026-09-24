// Practical Challenges & Badges Drawer
import React, { useState } from 'react';
import { 
  Award, 
  X, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Trophy, 
  HelpCircle,
  HardDrive,
  Terminal,
  Compass
} from 'lucide-react';
import { useLearner } from '../../context/LearnerContext';

export const ChallengeDrawer = ({ isOpen, onClose }) => {
  const { challengesCatalog, badgesCatalog, completedChallenges, earnedBadges, points, totalCommandsRun } = useLearner();
  const [filter, setFilter] = useState('all'); // 'all' | 'Beginner' | 'Intermediate' | 'Advanced'
  const [expandedHint, setExpandedHint] = useState(null);

  if (!isOpen) return null;

  const filteredChallenges = filter === 'all' 
    ? challengesCatalog 
    : challengesCatalog.filter(c => c.category === filter);

  const getBadgeIcon = (id) => {
    if (id === 'installation_expert') return HardDrive;
    if (id === 'command_master') return Terminal;
    if (id === 'desktop_explorer') return Compass;
    return Trophy;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end bg-black/60 backdrop-blur-sm select-none">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl text-slate-100 animate-window">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Challenges & Badges</h2>
              <p className="text-xs text-slate-400">
                {completedChallenges.length} of {challengesCatalog.length} Completed • {points} XP
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

        {/* Badges Carousel / Showcase */}
        <div className="p-4 bg-slate-950/40 border-b border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Official Badges</span>
            <span className="text-blue-400">{earnedBadges.length}/4 Unlocked</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {badgesCatalog.map((b) => {
              const isEarned = earnedBadges.includes(b.id);
              const Icon = getBadgeIcon(b.id);
              return (
                <div
                  key={b.id}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                    isEarned
                      ? 'bg-slate-800/90 border-blue-500/50 shadow-md ring-1 ring-blue-500/30'
                      : 'bg-slate-950/40 border-slate-800/80 opacity-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${b.color} text-white shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-white truncate">{b.title}</div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {isEarned ? 'Unlocked ✓' : 'In Progress'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="p-3 bg-slate-900 border-b border-slate-800 flex gap-1.5 text-xs overflow-x-auto scrollbar-none">
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl font-medium capitalize shrink-0 transition-colors ${
                filter === f ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Challenges Scroll List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2.5">
          {filteredChallenges.map((ch) => {
            const isDone = completedChallenges.includes(ch.id);
            const isHintOpen = expandedHint === ch.id;

            return (
              <div
                key={ch.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                    )}
                    <span className="font-bold text-xs text-white">{ch.title}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                    +{ch.points} XP
                  </span>
                </div>

                <p className="text-xs text-slate-400 pl-6 leading-relaxed">{ch.description}</p>

                <div className="pl-6 pt-2 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-medium">Category: {ch.category}</span>
                  <button
                    onClick={() => setExpandedHint(isHintOpen ? null : ch.id)}
                    className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>{isHintOpen ? 'Hide Hint' : 'Hint'}</span>
                  </button>
                </div>

                {isHintOpen && (
                  <div className="mt-2.5 ml-6 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 leading-relaxed font-mono">
                    💡 {ch.hint}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

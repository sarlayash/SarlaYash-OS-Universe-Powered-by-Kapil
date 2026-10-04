import React, { useState, useMemo } from 'react';
import { 
  X, Search, CheckCircle2, Circle, Sparkles, BookOpen, 
  Layers, ArrowRight, ShieldCheck, CheckCheck, Lightbulb, 
  HelpCircle, Scale, Database, Share2, Award, Zap
} from 'lucide-react';
import { KNOWLEDGE_CATEGORIES, KNOWLEDGE_BYTES } from '../../services/knowledgeBytesData';
import { useLearner } from '../../context/LearnerContext';

export default function KnowledgeBytesModal({ isOpen, onClose }) {
  const { 
    acknowledgedKnowledgeBytes = [], 
    toggleKnowledgeByteAcknowledged, 
    acknowledgeAllBytes,
    completedModules = [],
    toggleModuleComplete
  } = useLearner();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'acknowledged', 'pending'

  const isModuleCompleted = completedModules.includes('kb_sheets_vs_excel');
  const totalCount = KNOWLEDGE_BYTES.length;
  const ackCount = acknowledgedKnowledgeBytes.length;
  const ackPercent = Math.round((ackCount / totalCount) * 100);

  // Filtered knowledge bytes
  const filteredBytes = useMemo(() => {
    return KNOWLEDGE_BYTES.filter(byte => {
      // Category match
      if (selectedCategory !== 'all' && byte.categoryId !== selectedCategory) {
        return false;
      }

      // Status match
      const isAck = acknowledgedKnowledgeBytes.includes(byte.id);
      if (statusFilter === 'acknowledged' && !isAck) return false;
      if (statusFilter === 'pending' && isAck) return false;

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = byte.title.toLowerCase().includes(q);
        const matchesSheets = byte.sheetsBehavior.toLowerCase().includes(q);
        const matchesExcel = byte.excelBehavior.toLowerCase().includes(q);
        const matchesVerdict = byte.verdict.toLowerCase().includes(q);
        const matchesTip = byte.proTip.toLowerCase().includes(q);
        const matchesCat = byte.categoryName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSheets && !matchesExcel && !matchesVerdict && !matchesTip && !matchesCat) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, statusFilter, searchQuery, acknowledgedKnowledgeBytes]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-hidden animate-fade-in">
      <div className="relative w-full max-w-7xl h-[94vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-400">
              <Lightbulb className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-wide">
                  50 Differences: Google Sheets vs Microsoft Excel
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  Knowledge Bytes
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Authoritative architectural, functional & calculation comparison • Powered by Kapil
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => toggleModuleComplete('kb_sheets_vs_excel')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                isModuleCompleted 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-emerald-500/40 hover:text-white'
              }`}
            >
              {isModuleCompleted ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4" />}
              <span>{isModuleCompleted ? 'Module Completed' : 'Mark Module Complete'}</span>
            </button>

            <button
              onClick={acknowledgeAllBytes}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/40 transition"
              title="Acknowledge all 50 comparison points"
            >
              <Award className="w-4 h-4" />
              <span>Acknowledge All (50)</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Tracker Banner */}
        <div className="px-6 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-medium">Your Acknowledged Progress:</span>
            <div className="w-44 sm:w-60 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 transition-all duration-500 rounded-full"
                style={{ width: `${ackPercent}%` }}
              />
            </div>
            <span className="font-bold text-emerald-400">{ackCount} / {totalCount} ({ackPercent}%)</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Click <strong className="text-slate-200">"Acknowledge"</strong> on any card to confirm understanding</span>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[260px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulas, pivots, scale limits, VBA, real-time collaboration..."
                className="w-full pl-10 pr-4 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/80 text-xs font-medium">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  statusFilter === 'all' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All ({KNOWLEDGE_BYTES.length})
              </button>
              <button
                onClick={() => setStatusFilter('acknowledged')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  statusFilter === 'acknowledged' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Acknowledged ({ackCount})
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  statusFilter === 'pending' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pending ({totalCount - ackCount})
              </button>
            </div>
          </div>

          {/* Category Filter Pills (Horizontal scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-thin">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
                selectedCategory === 'all'
                  ? 'bg-slate-700 text-white border border-slate-600 shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/40'
              }`}
            >
              All Categories (10)
            </button>
            {KNOWLEDGE_CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat.id;
              const catBytes = KNOWLEDGE_BYTES.filter(b => b.categoryId === cat.id);
              const catAck = catBytes.filter(b => acknowledgedKnowledgeBytes.includes(b.id)).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition border flex items-center gap-1.5 ${
                    isSelected
                      ? `${cat.bg} ${cat.color} ${cat.border} ring-1 ring-white/10`
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border-slate-700/40'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    catAck === catBytes.length ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700/80 text-slate-300'
                  }`}>
                    {catAck}/{catBytes.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Body: Scrollable Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-900/50">
          {filteredBytes.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-30 text-amber-400" />
              <p className="text-base font-semibold text-slate-300">No Knowledge Bytes matched your filter</p>
              <p className="text-xs text-slate-500 mt-1">Try resetting your search query or category filters.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setStatusFilter('all'); }}
                className="mt-4 px-4 py-2 text-xs rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredBytes.map((byte) => {
              const isAcknowledged = acknowledgedKnowledgeBytes.includes(byte.id);
              const catMeta = KNOWLEDGE_CATEGORIES.find(c => c.id === byte.categoryId) || {};

              return (
                <div
                  key={byte.id}
                  className={`group relative rounded-xl border transition-all duration-200 p-4 sm:p-5 ${
                    isAcknowledged
                      ? 'bg-slate-800/50 border-emerald-500/30 hover:border-emerald-500/50'
                      : 'bg-slate-800/30 border-slate-700/70 hover:border-slate-600'
                  }`}
                >
                  {/* Card Top: Number, Category, Title, Acknowledge Toggle */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3 flex-1 min-w-[280px]">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-xs shrink-0 ${
                        isAcknowledged 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}>
                        #{byte.id}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${catMeta.bg || 'bg-slate-800'} ${catMeta.color || 'text-slate-300'} ${catMeta.border || 'border-slate-700'}`}>
                            {byte.categoryName}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                          {byte.title}
                        </h3>
                      </div>
                    </div>

                    {/* Acknowledge Button */}
                    <button
                      onClick={() => toggleKnowledgeByteAcknowledged(byte.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition border ${
                        isAcknowledged
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 hover:bg-emerald-500/30 shadow-sm shadow-emerald-500/10'
                          : 'bg-slate-800/90 text-slate-300 border-slate-600 hover:border-emerald-500/60 hover:text-white'
                      }`}
                    >
                      {isAcknowledged ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Acknowledged ✓</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4 text-slate-400" />
                          <span>Acknowledge</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Side-by-Side Comparison: Google Sheets vs Microsoft Excel */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-3.5">
                    {/* Google Sheets Column */}
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/20 relative">
                      <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-emerald-500/20 text-xs font-semibold text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Google Sheets Engine</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-sans">
                        {byte.sheetsBehavior}
                      </p>
                    </div>

                    {/* Microsoft Excel Column */}
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-teal-500/20 relative">
                      <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-teal-500/20 text-xs font-semibold text-teal-300">
                        <span className="w-2 h-2 rounded-full bg-teal-400" />
                        <span>Microsoft Excel Engine</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-sans">
                        {byte.excelBehavior}
                      </p>
                    </div>
                  </div>

                  {/* Verdict & Pro-Tip Banners */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
                    {/* Verdict */}
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 text-amber-200">
                      <Scale className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300 mr-1 font-semibold">Technical Verdict:</strong>
                        <span className="text-slate-300">{byte.verdict}</span>
                      </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-start gap-2 text-cyan-200">
                      <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-cyan-300 mr-1 font-semibold">Pro Tip:</strong>
                        <span className="text-slate-300">{byte.proTip}</span>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-400">
            Showing <strong className="text-slate-200">{filteredBytes.length}</strong> of <strong className="text-slate-200">{totalCount}</strong> items • 
            Status: <span className="text-emerald-400 font-semibold">{ackCount} Acknowledged</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleModuleComplete('kb_sheets_vs_excel')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition border flex items-center gap-2 ${
                isModuleCompleted 
                  ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50' 
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
              }`}
            >
              <CheckCheck className="w-4 h-4" />
              <span>{isModuleCompleted ? 'Knowledge Module Completed ✓' : 'Mark Module Completed'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700"
            >
              Close Window
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

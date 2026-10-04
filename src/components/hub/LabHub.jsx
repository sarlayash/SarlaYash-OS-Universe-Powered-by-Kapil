// Central Lab Hub: SarlaYash OS Universe
// The command center connecting all 4 OS environments, data analytics simulators, knowledge bytes, challenges, badges, and certificates

import React from 'react';
import { 
  Laptop, 
  Terminal, 
  Apple, 
  Trophy, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  RotateCw, 
  Play, 
  ShieldCheck, 
  ShieldAlert,
  Smartphone, 
  MousePointer, 
  Keyboard as KeyboardIcon, 
  Lock,
  Flame,
  BarChart2,
  Table2,
  Code2,
  Lightbulb,
  CheckCheck,
  Circle,
  Sliders,
  FileSpreadsheet,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { ChromeIcon } from '../icons/ChromeIcon';
import { useLearner } from '../../context/LearnerContext';
import { useOS } from '../../context/OSContext';

export const LabHub = ({ 
  onOpenChallenges, 
  onOpenAssessment, 
  onOpenCertificate, 
  onOpenFounder,
  onOpenSpreadsheetSuite,
  onOpenKnowledgeBytes,
  onOpenModuleTracker
}) => {
  const { 
    learnerName, 
    installedOS, 
    exploredOS, 
    earnedBadges, 
    completedChallenges, 
    totalCommandsRun, 
    points,
    isCertificateUnlocked,
    isMockExamPassed,
    mockExamPassed,
    mockExamScore,
    hardExamPassed,
    hardExamScore,
    hardExamDisqualified,
    completedModules = [],
    toggleModuleComplete,
    isModuleComplete,
    acknowledgedKnowledgeBytes = []
  } = useLearner();
  const { switchOS, toggleTrackpad, toggleKeyboard, mobileControls } = useOS();

  const OS_LABS = [
    {
      id: 'windows',
      name: 'Microsoft Windows 11',
      edition: 'Pro Education Lab',
      desc: 'Simulate BIOS setup, partition allocation, Start Menu, File Explorer, and Command Prompt (CMD).',
      icon: Laptop,
      color: 'from-blue-600 to-indigo-700',
      accent: 'border-blue-500/40 text-blue-400',
      installModId: 'os_windows_install',
      desktopModId: 'os_windows_desktop'
    },
    {
      id: 'linux',
      name: 'Ubuntu Linux 24.04 LTS',
      edition: 'Noble Numbat DevOps Lab',
      desc: 'Simulate GRUB boot, ext4 partitioning, GNOME desktop, file permissions (chmod), and Bash shell.',
      icon: Terminal,
      color: 'from-orange-600 to-amber-700',
      accent: 'border-orange-500/40 text-orange-400',
      installModId: 'os_linux_install',
      desktopModId: 'os_linux_desktop'
    },
    {
      id: 'macos',
      name: 'Apple macOS Sonoma',
      edition: 'Unix & Developer Lab',
      desc: 'Experience Apple Setup Assistant, Finder, the bottom Dock, System Settings, and Zsh terminal.',
      icon: Apple,
      color: 'from-purple-600 to-slate-800',
      accent: 'border-purple-500/40 text-purple-400',
      installModId: 'os_macos_install',
      desktopModId: 'os_macos_desktop'
    },
    {
      id: 'chrome',
      name: 'Google ChromeOS',
      edition: 'Cloud & Crostini Container Lab',
      desc: 'Explore Chromebook setup, Cloud Files, Chrome browser simulation, and Crostini Linux container.',
      icon: ChromeIcon,
      color: 'from-emerald-600 to-teal-700',
      accent: 'border-emerald-500/40 text-emerald-400',
      installModId: 'os_chrome_install',
      desktopModId: 'os_chrome_desktop'
    }
  ];

  const DATA_SIMULATORS = [
    {
      id: 'data_charts',
      name: 'Interactive Charts Simulator',
      desc: 'Render Column, Bar, Line, Pie & Area visual charts dynamically with custom color themes, labels, and SVG gridlines.',
      icon: BarChart2,
      color: 'from-cyan-600 to-blue-700',
      tag: 'Visualization',
      points: 150
    },
    {
      id: 'data_pivottables',
      name: 'Pivot Tables Multi-Dimensional Builder',
      desc: 'Interactive field lists, drag-and-drop Rows/Columns/Values/Filters, and dynamic aggregations (SUM, AVG, COUNT, MAX, MIN).',
      icon: Table2,
      color: 'from-indigo-600 to-purple-700',
      tag: 'Analytics Engine',
      points: 200
    },
    {
      id: 'data_pivotcharts',
      name: 'Pivot Charts & Dynamic Slicers',
      desc: 'Real-time interactive slicer filtering seamlessly synchronized with multi-series SVG chart visualizations.',
      icon: Sliders,
      color: 'from-teal-600 to-emerald-700',
      tag: 'BI & Slicers',
      points: 150
    },
    {
      id: 'data_macros',
      name: 'VBA & Apps Script Macros Simulator',
      desc: 'Automated macro runner with live animation + step recorder generating real VBA Sub and Google Apps Script functions.',
      icon: Code2,
      color: 'from-amber-600 to-rose-700',
      tag: 'Automation',
      points: 200
    }
  ];

  const isKbMasterComplete = isModuleComplete ? isModuleComplete('kb_sheets_vs_excel') : completedModules.includes('kb_sheets_vs_excel');
  const totalCompletedModules = completedModules.length;

  return (
    <div className="w-full h-full bg-slate-950 text-slate-100 overflow-y-auto select-none p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        
        {/* Hero Header */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Mobile-First Virtual Computer Lab & Data Suite</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              SarlaYash OS Universe
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              Powered by Kapil — Giving every student the opportunity to master Operating Systems, Spreadsheet Data Analytics, and Cloud Technologies on any device.
            </p>

            {/* Student Welcome Pill */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200">
                Learner: <strong className="text-white">{learnerName || 'Student'}</strong>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-emerald-400 font-semibold">
                Points: {points} XP
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-indigo-400 font-semibold">
                Modules Completed: {totalCompletedModules}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-purple-400 font-semibold">
                Commands Executed: {totalCommandsRun}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Curriculum Quick Access Control Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {/* Data Lab Suite */}
          <button
            onClick={onOpenSpreadsheetSuite}
            className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-500/60 flex flex-col justify-between transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">Data Suite</span>
              <BarChart2 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-cyan-300">Data Lab</div>
              <div className="text-[10px] text-slate-400">Charts, Pivots & Macros</div>
            </div>
          </button>

          {/* 50 Knowledge Bytes */}
          <button
            onClick={onOpenKnowledgeBytes}
            className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500/60 flex flex-col justify-between transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Bytes ({acknowledgedKnowledgeBytes.length}/50)</span>
              <Lightbulb className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-emerald-300">50 Differences</div>
              <div className="text-[10px] text-slate-400">Sheets vs Excel</div>
            </div>
          </button>

          {/* Universal Progress Tracker */}
          <button
            onClick={onOpenModuleTracker}
            className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 hover:border-indigo-500/60 flex flex-col justify-between transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">Checklist</span>
              <CheckCheck className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-indigo-300">Course Progress</div>
              <div className="text-[10px] text-slate-400">Mark as Complete</div>
            </div>
          </button>

          {/* Practical Challenges */}
          <button
            onClick={onOpenChallenges}
            className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 flex flex-col justify-between transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">Terminal</span>
              <Award className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-blue-400">Challenges</div>
              <div className="text-[10px] text-slate-400">{completedChallenges.length} / 20 Solved</div>
            </div>
          </button>

          {/* 500Q Assessment */}
          <button
            onClick={() => onOpenAssessment('standard')}
            className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 flex flex-col justify-between transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider">120-Min</span>
              <Trophy className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-purple-400">500Q Final Exam</div>
              <div className="text-[10px] text-slate-400">{mockExamPassed ? 'Passed ✓' : '90% Passing Bar'}</div>
            </div>
          </button>

          {/* Hard 100Q Exam */}
          <button
            onClick={() => onOpenAssessment('hard')}
            className="p-3.5 rounded-2xl bg-red-950/30 border border-red-500/30 hover:border-red-500/60 flex flex-col justify-between transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-3 h-3" />
                <span>Proctored</span>
              </span>
              <ShieldAlert className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-red-400">Hard 100Q Exam</div>
              <div className="text-[10px] text-slate-400">Anti-Cheat Active</div>
            </div>
          </button>

          {/* Certificate */}
          <button
            onClick={onOpenCertificate}
            className={`col-span-2 sm:col-span-1 p-3.5 rounded-2xl border flex flex-col justify-between transition-all group text-left ${
              isCertificateUnlocked
                ? 'bg-amber-500/10 border-amber-500/40 hover:border-amber-400'
                : 'bg-slate-900 border-slate-800 hover:border-amber-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${isCertificateUnlocked ? 'text-emerald-400' : 'text-slate-400'}`}>
                {isCertificateUnlocked ? 'Unlocked' : 'Locked'}
              </span>
              {isCertificateUnlocked ? <ShieldCheck className="w-4 h-4 text-amber-400" /> : <Lock className="w-4 h-4 text-amber-400/80" />}
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-400">
                {isCertificateUnlocked ? 'Master Certificate' : 'Preview Certificate'}
              </div>
              <div className="text-[10px] text-slate-400">PDF & PNG QR Export</div>
            </div>
          </button>
        </div>

        {/* ============================================================== */}
        {/* NEW SECTION: Spreadsheet & Data Analytics Suite (Simulators) */}
        {/* ============================================================== */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">
                  Spreadsheet & Data Analytics Suite
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Interactive Simulators
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Practice high-level data manipulation, multi-series charting, multidimensional pivot tables, and automated scripting
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenSpreadsheetSuite}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-950/50 transition"
              >
                <span>Launch Full Suite</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DATA_SIMULATORS.map((sim) => {
              const Icon = sim.icon;
              const isCompleted = isModuleComplete ? isModuleComplete(sim.id) : completedModules.includes(sim.id);

              return (
                <div
                  key={sim.id}
                  className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 shadow-xl space-y-3.5 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${sim.color} text-white shadow-lg`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-white">{sim.name}</h3>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                              {sim.tag}
                            </span>
                            <span className="text-[10px] text-amber-400 font-semibold">
                              +{sim.points} XP
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Completed</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-slate-400">
                            Incomplete
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {sim.desc}
                    </p>
                  </div>

                  {/* Actions: Launch + Mark as Complete */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
                    <button
                      onClick={onOpenSpreadsheetSuite}
                      className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current text-cyan-400" />
                      <span>Launch Simulator</span>
                    </button>

                    <button
                      onClick={() => toggleModuleComplete(sim.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-emerald-500/40 hover:text-white'
                      }`}
                    >
                      {isCompleted ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{isCompleted ? 'Completed ✓' : 'Mark Complete'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* NEW SECTION: 50 Differences Knowledge Bytes Showcase Banner */}
        {/* ============================================================== */}
        <div className="relative p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 border border-emerald-500/30 shadow-xl overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <Lightbulb className="w-5 h-5 animate-pulse" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Knowledge Bytes Curriculum
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  50 Differences
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">
                50 Differences: Google Sheets vs Microsoft Excel
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Comprehensive technical comparison covering real-time co-authoring, cloud scale limits, the QUERY formula, LAMBDA arrays, Apps Script vs VBA, Power Pivot data modeling, and enterprise governance.
              </p>

              {/* Progress Bar & Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Acknowledged:</span>
                  <div className="w-32 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all rounded-full"
                      style={{ width: `${Math.round((acknowledgedKnowledgeBytes.length / 50) * 100)}%` }}
                    />
                  </div>
                  <strong className="text-emerald-400">
                    {acknowledgedKnowledgeBytes.length} / 50
                  </strong>
                </div>

                <span className="text-slate-500">•</span>
                <span className="text-slate-300">10 Deep-Dive Categories</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
              <button
                onClick={onOpenKnowledgeBytes}
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Explore 50 Differences</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleModuleComplete('kb_sheets_vs_excel')}
                className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition border ${
                  isKbMasterComplete
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-emerald-500/40 hover:text-white'
                }`}
              >
                {isKbMasterComplete ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5" />}
                <span>{isKbMasterComplete ? 'Knowledge Completed ✓' : 'Mark as Complete'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Operating Systems Lab Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Interactive Operating System Labs</h2>
              <p className="text-xs text-slate-400">Complete both installation and desktop terminal laboratories for each system</p>
            </div>
            <span className="text-xs text-slate-400 font-semibold px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800">
              {installedOS.length} of 4 Installed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OS_LABS.map((lab) => {
              const Icon = lab.icon;
              const isInstalled = installedOS.includes(lab.id);
              const isInstallModDone = isModuleComplete ? isModuleComplete(lab.installModId) : completedModules.includes(lab.installModId);
              const isDesktopModDone = isModuleComplete ? isModuleComplete(lab.desktopModId) : completedModules.includes(lab.desktopModId);

              return (
                <div
                  key={lab.id}
                  className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 shadow-xl space-y-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${lab.color} text-white shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-white">{lab.name}</h3>
                        <p className="text-xs text-slate-400">{lab.edition}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isInstalled ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Installed</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-slate-400">
                          Ready to Install
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{lab.desc}</p>

                  {/* Primary OS Actions */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={() => switchOS(lab.id, 'installer')}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <RotateCw className="w-3.5 h-3.5 text-blue-400" />
                      <span>{isInstalled ? 'Re-install OS' : 'Install OS Wizard'}</span>
                    </button>
                    <button
                      onClick={() => switchOS(lab.id, 'desktop')}
                      className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-md transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Launch Desktop</span>
                    </button>
                  </div>

                  {/* Mark as Complete Toggles for both Install & Desktop modules */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/70 text-[11px]">
                    <button
                      onClick={() => toggleModuleComplete(lab.installModId)}
                      className={`py-1.5 px-2 rounded-lg font-medium transition flex items-center justify-center gap-1 border ${
                        isInstallModDone
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                      title="Mark OS installation wizard module completed"
                    >
                      {isInstallModDone ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Circle className="w-3 h-3 text-slate-500" />}
                      <span>Install: {isInstallModDone ? 'Done ✓' : 'Mark'}</span>
                    </button>

                    <button
                      onClick={() => toggleModuleComplete(lab.desktopModId)}
                      className={`py-1.5 px-2 rounded-lg font-medium transition flex items-center justify-center gap-1 border ${
                        isDesktopModDone
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                      title="Mark OS desktop exploration module completed"
                    >
                      {isDesktopModDone ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Circle className="w-3 h-3 text-slate-500" />}
                      <span>Lab: {isDesktopModDone ? 'Done ✓' : 'Mark'}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Official Examinations & Mock Assessments Showcase Arena */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>Certification Examinations Arena</span>
              </h2>
              <p className="text-xs text-slate-400">
                Qualify for the QR-verifiable SarlaYash OS Universe Master Certificate with strict evaluation standards.
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
              isCertificateUnlocked 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}>
              {isCertificateUnlocked ? 'Credential Unlocked' : 'Certificate Locked'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Standard 500Q Assessment Card */}
            <div className="relative p-6 rounded-3xl bg-slate-900/90 border border-purple-500/30 hover:border-purple-500/60 shadow-xl space-y-4 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-lg">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-white">500-Question Final Assessment</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Standard Mode
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">120 Minutes • Comprehensive Multi-OS Benchmark</p>
                    </div>
                  </div>

                  {mockExamPassed ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Passed ({mockExamScore}%)</span>
                    </span>
                  ) : mockExamScore !== null ? (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      Score: {mockExamScore}% (Need 90%)
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-slate-400">
                      Not Attempted
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Rigorous evaluation spanning Windows 11 Internals, Ubuntu Linux DevOps, macOS Unix/Zsh, and ChromeOS Cloud/Crostini architecture. Passing threshold: <strong>≥90% (450/500)</strong>.
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-[10px] text-slate-400">Total MCQs</div>
                    <div className="font-bold text-white font-mono">500 Questions</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-[10px] text-slate-400">Duration</div>
                    <div className="font-bold text-purple-400 font-mono">120 Minutes</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-[10px] text-slate-400">Passing Bar</div>
                    <div className="font-bold text-emerald-400 font-mono">90% Required</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => onOpenAssessment('standard')}
                  className="sm:col-span-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:from-purple-700 active:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Trophy className="w-4 h-4" />
                  <span>{mockExamPassed ? 'Retake 500Q Assessment' : 'Launch 500Q Final Assessment'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => toggleModuleComplete('final_exam_500q')}
                  className={`py-3 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition border ${
                    isModuleComplete && isModuleComplete('final_exam_500q')
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                  title="Mark 500-question final assessment as complete"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>{isModuleComplete && isModuleComplete('final_exam_500q') ? 'Passed ✓' : 'Mark Complete'}</span>
                </button>
              </div>
            </div>

            {/* Hard-Level Proctored Assessment Card */}
            <div className="relative p-6 rounded-3xl bg-gradient-to-br from-red-950/20 via-slate-900 to-slate-900 border border-red-500/40 hover:border-red-500/70 shadow-xl space-y-4 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-red-600 to-rose-800 text-white shadow-lg">
                      <Flame className="w-6 h-6 text-amber-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-white">Hard-Level Proctored Grandmaster</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                          Anti-Cheat
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">100 Hard MCQs • Strict 2-Hour Lockout • Live AI Watchdog</p>
                    </div>
                  </div>

                  {hardExamDisqualified ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Disqualified (0%)</span>
                    </span>
                  ) : hardExamPassed ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Grandmaster Passed ({hardExamScore}%)</span>
                    </span>
                  ) : hardExamScore !== null ? (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      Score: {hardExamScore}% (Need 90%)
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-red-950/40 text-red-300 border border-red-800/40">
                      Proctored Ready
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Elite scenarios covering kernel internals, eBPF tracing, dm-verity, Mach-O security, and enterprise SAN storage.
                </p>

                {/* Strict Rules Highlights */}
                <div className="p-3 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-red-300 font-bold">
                    <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Enforced Proctoring Policies:</span>
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                    <li><strong className="text-white">Strict 2 Hours:</strong> Cannot submit before 120 minutes expire.</li>
                    <li><strong className="text-white">Zero Tolerance Anti-Cheat:</strong> Tab switch or screenshot = <strong>Immediately Disqualified (0%)</strong>.</li>
                    <li><strong className="text-white">Badge Reward:</strong> Awards the exclusive <em>Proctor Grandmaster</em> champion badge.</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => onOpenAssessment('hard')}
                  className="sm:col-span-2 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:via-rose-500 hover:to-amber-500 active:from-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Flame className="w-4 h-4 text-amber-300" />
                  <span>{hardExamDisqualified ? 'Retry Proctored Assessment' : 'Enter 2-Hour Hard Proctored Exam'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => toggleModuleComplete('hard_exam_100q')}
                  className={`py-3 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition border ${
                    isModuleComplete && isModuleComplete('hard_exam_100q')
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                  title="Mark 100-question hard proctored exam as complete"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>{isModuleComplete && isModuleComplete('hard_exam_100q') ? 'Passed ✓' : 'Mark Complete'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Tools Quick Toggle Bar */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Smartphone className="w-6 h-6 text-emerald-400" />
            <div>
              <div className="text-sm font-bold text-white">Mobile Touch Optimization</div>
              <p className="text-xs text-slate-400">Enable on-screen precision mouse and terminal keyboard on smartphones</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTrackpad}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                mobileControls.showTrackpad ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              <MousePointer className="w-4 h-4" />
              <span>Virtual Mouse</span>
            </button>
            <button
              onClick={toggleKeyboard}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                mobileControls.showKeyboard ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              <KeyboardIcon className="w-4 h-4" />
              <span>Virtual Keyboard</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

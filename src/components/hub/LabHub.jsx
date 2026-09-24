// Central Lab Hub: SarlaYash OS Universe
// The command center connecting all 4 OS environments, challenges, badges, and certificates

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
  Smartphone, 
  MousePointer, 
  Keyboard as KeyboardIcon,
  HelpCircle
} from 'lucide-react';
import { ChromeIcon } from '../icons/ChromeIcon';
import { useLearner } from '../../context/LearnerContext';
import { useOS } from '../../context/OSContext';

export const LabHub = ({ onOpenChallenges, onOpenAssessment, onOpenCertificate, onOpenFounder }) => {
  const { learnerName, installedOS, exploredOS, earnedBadges, completedChallenges, totalCommandsRun, points } = useLearner();
  const { switchOS, toggleTrackpad, toggleKeyboard, mobileControls } = useOS();

  const OS_LABS = [
    {
      id: 'windows',
      name: 'Microsoft Windows 11',
      edition: 'Pro Education Lab',
      desc: 'Simulate BIOS setup, partition allocation, Start Menu, File Explorer, and Command Prompt (CMD).',
      icon: Laptop,
      color: 'from-blue-600 to-indigo-700',
      accent: 'border-blue-500/40 text-blue-400'
    },
    {
      id: 'linux',
      name: 'Ubuntu Linux 24.04 LTS',
      edition: 'Noble Numbat DevOps Lab',
      desc: 'Simulate GRUB boot, ext4 partitioning, GNOME desktop, file permissions (chmod), and Bash shell.',
      icon: Terminal,
      color: 'from-orange-600 to-amber-700',
      accent: 'border-orange-500/40 text-orange-400'
    },
    {
      id: 'macos',
      name: 'Apple macOS Sonoma',
      edition: 'Unix & Developer Lab',
      desc: 'Experience Apple Setup Assistant, Finder, the bottom Dock, System Settings, and Zsh terminal.',
      icon: Apple,
      color: 'from-purple-600 to-slate-800',
      accent: 'border-purple-500/40 text-purple-400'
    },
    {
      id: 'chrome',
      name: 'Google ChromeOS',
      edition: 'Cloud & Crostini Container Lab',
      desc: 'Explore Chromebook setup, Cloud Files, Chrome browser simulation, and Crostini Linux container.',
      icon: ChromeIcon,
      color: 'from-emerald-600 to-teal-700',
      accent: 'border-emerald-500/40 text-emerald-400'
    }
  ];

  return (
    <div className="w-full h-full bg-slate-950 text-slate-100 overflow-y-auto select-none p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        {/* Hero Header */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Mobile-First Virtual Computer Lab</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              SarlaYash OS Universe
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              Powered by Kapil — Giving every student the opportunity to learn practical computer skills, even when their only available device is a mobile phone.
            </p>

            {/* Student Welcome Pill */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200">
                Learner: <strong className="text-white">{learnerName || 'Student'}</strong>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-emerald-400 font-semibold">
                Points: {points} XP
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-purple-400 font-semibold">
                Commands Executed: {totalCommandsRun}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Access Control Bar for Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={onOpenChallenges}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 flex items-center justify-between transition-all group"
          >
            <div className="text-left">
              <div className="text-xs text-slate-400">Practical Lab</div>
              <div className="text-sm font-bold text-white group-hover:text-blue-400">Challenges ({completedChallenges.length}/20)</div>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <Award className="w-5 h-5" />
            </div>
          </button>

          <button
            onClick={onOpenAssessment}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 flex items-center justify-between transition-all group"
          >
            <div className="text-left">
              <div className="text-xs text-slate-400">Knowledge Exam</div>
              <div className="text-sm font-bold text-white group-hover:text-purple-400">Assessment</div>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
              <Trophy className="w-5 h-5" />
            </div>
          </button>

          <button
            onClick={onOpenCertificate}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 flex items-center justify-between transition-all group"
          >
            <div className="text-left">
              <div className="text-xs text-slate-400">Verified Credential</div>
              <div className="text-sm font-bold text-white group-hover:text-amber-400">QR Certificate</div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </button>

          <button
            onClick={onOpenFounder}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between transition-all group"
          >
            <div className="text-left">
              <div className="text-xs text-slate-400">Silent Alerts</div>
              <div className="text-sm font-bold text-white group-hover:text-emerald-400">Founder Portal</div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
          </button>
        </div>

        {/* Operating Systems Lab Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Interactive Operating System Labs</h2>
            <span className="text-xs text-slate-400">
              {installedOS.length} of 4 Systems Installed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OS_LABS.map((lab) => {
              const Icon = lab.icon;
              const isInstalled = installedOS.includes(lab.id);
              const isExplored = exploredOS.includes(lab.id);

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
                </div>
              );
            })}
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

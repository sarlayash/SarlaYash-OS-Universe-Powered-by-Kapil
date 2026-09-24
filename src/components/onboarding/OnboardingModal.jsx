// Onboarding & Privacy Notice Modal
// Collects student name, OS selection, and initiates silent founder telemetry

import React, { useState } from 'react';
import { 
  Laptop, 
  Terminal, 
  Apple, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  Smartphone
} from 'lucide-react';
import { ChromeIcon } from '../icons/ChromeIcon';
import { useLearner } from '../../context/LearnerContext';
import { useOS } from '../../context/OSContext';

const OS_OPTIONS = [
  {
    id: 'windows',
    name: 'Microsoft Windows 11',
    subtitle: 'Enterprise & Pro Lab',
    desc: 'Simulate BIOS setup, partition allocation, Start Menu, File Explorer, and Command Prompt (CMD).',
    icon: Laptop,
    badge: 'Most Popular',
    color: 'from-blue-600 to-indigo-700',
    accentBorder: 'border-blue-500/50'
  },
  {
    id: 'linux',
    name: 'Ubuntu Linux 24.04 LTS',
    subtitle: 'Open-Source & Cloud Lab',
    desc: 'Simulate GRUB boot, ext4 partitioning, GNOME desktop, file permissions (chmod), and Bash terminal.',
    icon: Terminal,
    badge: 'Essential for DevOps',
    color: 'from-orange-600 to-amber-700',
    accentBorder: 'border-orange-500/50'
  },
  {
    id: 'macos',
    name: 'Apple macOS Sonoma',
    subtitle: 'Unix Creative & Dev Lab',
    desc: 'Experience Apple Setup Assistant, Finder, the bottom Dock, System Settings, and Zsh terminal.',
    icon: Apple,
    badge: 'Creative & Pro',
    color: 'from-purple-600 to-slate-800',
    accentBorder: 'border-purple-500/50'
  },
  {
    id: 'chrome',
    name: 'Google ChromeOS',
    subtitle: 'Cloud-First Education Lab',
    desc: 'Explore Chromebook setup, Cloud Files, Chrome browser simulation, and Crostini Linux container.',
    icon: ChromeIcon,
    badge: 'Fast & Lightweight',
    color: 'from-emerald-600 to-teal-700',
    accentBorder: 'border-emerald-500/50'
  }
];

export const OnboardingModal = () => {
  const { hasOnboarded, completeOnboarding } = useLearner();
  const { switchOS } = useOS();

  const [name, setName] = useState('');
  const [selectedOS, setSelectedOS] = useState('windows');
  const [startAction, setStartAction] = useState('install'); // 'install' | 'desktop'
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);

  if (hasOnboarded) return null;

  const handleLaunch = () => {
    const studentName = name.trim() || 'Student Learner';
    completeOnboarding(studentName, selectedOS);
    switchOS(selectedOS, startAction === 'install' ? 'installer' : 'desktop');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 my-auto animate-window">
        {/* Header Banner */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-slate-900 border-b border-slate-800">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mobile-First Virtual Computer Lab</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mobile & Laptop Ready</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
            SarlaYash OS Universe
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-medium">
            Powered by Kapil — Practical computer skills for every student, everywhere.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Step 1: Learner Name */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300">
              Step 1: Your Name (For Certificates & Badges)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Kapil Sharma / Alex Chen"
              className="w-full px-4 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-all"
            />
          </div>

          {/* Step 2: Choose Operating System */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300">
              Step 2: Choose Your Starting Operating System
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {OS_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedOS === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedOS(opt.id)}
                    className={`relative p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? `bg-slate-800 ${opt.accentBorder} shadow-lg ring-1 ring-blue-500`
                        : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${opt.color} text-white shadow-sm`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                        {opt.badge}
                      </span>
                    </div>
                    <div className="font-semibold text-sm text-white mb-0.5">{opt.name}</div>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{opt.desc}</p>
                    {isSelected && (
                      <div className="absolute bottom-2 right-2 text-blue-400">
                        <CheckCircle2 className="w-4 h-4 fill-blue-500/20" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Experience Choice */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300">
              Step 3: Choose How You Want to Begin
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStartAction('install')}
                className={`py-3 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  startAction === 'install'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                🛠️ Experience Guided Installation
              </button>
              <button
                type="button"
                onClick={() => setStartAction('desktop')}
                className={`py-3 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  startAction === 'desktop'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                🖥️ Jump Directly to Desktop
              </button>
            </div>
          </div>

          {/* Privacy Notice Notice Bar */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Founder Telemetry & Privacy Notice</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
                className="text-blue-400 hover:text-blue-300 underline text-[11px]"
              >
                {showPrivacyDetails ? 'Hide' : 'Details'}
              </button>
            </div>
            <p className="mt-1 text-slate-400 text-[11px] leading-relaxed">
              When you launch this app, an anonymous installation event is recorded and transmitted to SarlaYash founder Kapil Narula (<code>kapilnarula27july@gmail.com</code>) to support student reach.
            </p>
            {showPrivacyDetails && (
              <div className="mt-2.5 pt-2 border-t border-slate-700/60 text-[11px] text-slate-400 space-y-1">
                <p>• Transmitted: Installation timestamp, app version (1.0.0), random installation ID, and your chosen student name.</p>
                <p>• Zero sensitive data: No device identifiers, passwords, or personal files are ever accessed.</p>
                <p>• Notifications dispatch silently in background without popups interrupting your study.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-400 hidden sm:block">
            <span>Free for students worldwide</span>
          </div>
          <button
            type="button"
            onClick={handleLaunch}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Begin Operating System Lab</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

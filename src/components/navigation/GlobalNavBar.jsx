// Global Navigation & Quick OS Switcher Bar
import React, { useState } from 'react';
import { 
  Laptop, 
  Terminal, 
  Apple, 
  Home, 
  Award, 
  Trophy, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  MousePointer, 
  Keyboard as KeyboardIcon,
  ChevronDown,
  RotateCw,
  Mail,
  Menu,
  X
} from 'lucide-react';
import { ChromeIcon } from '../icons/ChromeIcon';
import { useOS } from '../../context/OSContext';
import { useLearner } from '../../context/LearnerContext';

export const GlobalNavBar = ({ onOpenChallenges, onOpenAssessment, onOpenCertificate, onOpenFounder }) => {
  const { activeOS, mode, setMode, switchOS, soundMuted, toggleSound, toggleTrackpad, toggleKeyboard, mobileControls } = useOS();
  const { completedChallenges, earnedBadges } = useLearner();
  const [osDropdownOpen, setOsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const OS_LIST = [
    { id: 'windows', name: 'Windows 11', icon: Laptop, color: 'text-blue-400' },
    { id: 'linux', name: 'Ubuntu Linux', icon: Terminal, color: 'text-orange-400' },
    { id: 'macos', name: 'macOS Sonoma', icon: Apple, color: 'text-purple-400' },
    { id: 'chrome', name: 'ChromeOS', icon: ChromeIcon, color: 'text-emerald-400' }
  ];

  const currentOSInfo = OS_LIST.find(o => o.id === activeOS) || OS_LIST[0];
  const CurrentIcon = currentOSInfo.icon;

  return (
    <header className="relative z-[9970] h-11 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-3 flex items-center justify-between text-xs select-none">
      {/* Brand & Active OS Switcher */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setMode('hub')}
          className="flex items-center gap-1.5 font-bold text-white hover:text-blue-400 transition-colors"
          title="Return to Lab Hub"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="hidden xs:inline">SarlaYash</span>
          <span className="text-[10px] text-blue-400 font-semibold px-1.5 py-0.2 rounded bg-blue-500/10 border border-blue-500/20">
            OS Universe
          </span>
        </button>

        {/* OS Quick Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOsDropdownOpen(!osDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-white font-medium"
          >
            <CurrentIcon className={`w-3.5 h-3.5 ${currentOSInfo.color}`} />
            <span className="text-xs">{currentOSInfo.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {osDropdownOpen && (
            <div
              onClick={() => setOsDropdownOpen(false)}
              className="absolute left-0 top-9 w-44 bg-slate-900 border border-slate-700 rounded-xl p-1 shadow-2xl backdrop-blur-xl space-y-0.5 animate-window z-[9990]"
            >
              <div className="px-2 py-1 text-[10px] font-bold uppercase text-slate-400">Switch Lab</div>
              {OS_LIST.map((os) => {
                const Icon = os.icon;
                return (
                  <button
                    key={os.id}
                    onClick={() => switchOS(os.id, mode === 'installer' ? 'installer' : 'desktop')}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                      activeOS === os.id ? 'bg-blue-600/20 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${os.color}`} />
                    <span>{os.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Mode Toggle: Hub / Installer / Desktop */}
        <div className="hidden md:flex items-center bg-slate-900 p-0.5 rounded-xl border border-slate-800 text-[11px]">
          <button
            onClick={() => setMode('hub')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              mode === 'hub' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Hub
          </button>
          <button
            onClick={() => setMode('installer')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              mode === 'installer' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Installer
          </button>
          <button
            onClick={() => setMode('desktop')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              mode === 'desktop' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Desktop
          </button>
        </div>
      </div>

      {/* Action Controls & Modal Triggers */}
      <div className="flex items-center gap-1.5">
        {/* Challenges Pill */}
        <button
          onClick={onOpenChallenges}
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white"
        >
          <Award className="w-3.5 h-3.5 text-blue-400" />
          <span>Challenges ({completedChallenges.length}/20)</span>
        </button>

        {/* Assessment */}
        <button
          onClick={onOpenAssessment}
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white"
        >
          <Trophy className="w-3.5 h-3.5 text-purple-400" />
          <span>Exam</span>
        </button>

        {/* Certificate */}
        <button
          onClick={onOpenCertificate}
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Certificate</span>
        </button>

        {/* Virtual Mouse Toggle */}
        <button
          onClick={toggleTrackpad}
          className={`p-1.5 rounded-xl border transition-colors ${
            mobileControls.showTrackpad ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
          title="Toggle Mobile Virtual Mouse"
        >
          <MousePointer className="w-3.5 h-3.5" />
        </button>

        {/* Virtual Keyboard Toggle */}
        <button
          onClick={toggleKeyboard}
          className={`p-1.5 rounded-xl border transition-colors ${
            mobileControls.showKeyboard ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
          title="Toggle Terminal Keyboard"
        >
          <KeyboardIcon className="w-3.5 h-3.5" />
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          title={soundMuted ? 'Unmute Sounds' : 'Mute Sounds'}
        >
          {soundMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>

        {/* Founder Portal */}
        <button
          onClick={onOpenFounder}
          className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 hover:bg-emerald-500/10"
          title="Founder Telemetry Portal"
        >
          <Mail className="w-3.5 h-3.5" />
        </button>

        {/* Mobile Hamburger menu for small screens */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white sm:hidden"
        >
          {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-11 left-0 right-0 bg-slate-900/95 border-b border-slate-800 p-3 space-y-2 text-xs text-slate-200 z-[9990] animate-window sm:hidden"
        >
          <div className="grid grid-cols-3 gap-1.5 pb-2 border-b border-slate-800">
            <button
              onClick={() => setMode('hub')}
              className={`p-2 rounded-lg text-center font-medium ${mode === 'hub' ? 'bg-blue-600 text-white' : 'bg-slate-800'}`}
            >
              Lab Hub
            </button>
            <button
              onClick={() => setMode('installer')}
              className={`p-2 rounded-lg text-center font-medium ${mode === 'installer' ? 'bg-blue-600 text-white' : 'bg-slate-800'}`}
            >
              Installer
            </button>
            <button
              onClick={() => setMode('desktop')}
              className={`p-2 rounded-lg text-center font-medium ${mode === 'desktop' ? 'bg-blue-600 text-white' : 'bg-slate-800'}`}
            >
              Desktop
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={onOpenChallenges}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 flex flex-col items-center gap-1 font-semibold"
            >
              <Award className="w-4 h-4 text-blue-400" />
              <span>Challenges</span>
            </button>
            <button
              onClick={onOpenAssessment}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 flex flex-col items-center gap-1 font-semibold"
            >
              <Trophy className="w-4 h-4 text-purple-400" />
              <span>Exam</span>
            </button>
            <button
              onClick={onOpenCertificate}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 flex flex-col items-center gap-1 font-semibold"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Certificate</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

// System Settings App
// Personalize wallpapers, audio settings, system specs, and lab information

import React, { useState } from 'react';
import { 
  Palette, 
  Monitor, 
  Volume2, 
  VolumeX, 
  Info, 
  Cpu, 
  HardDrive, 
  ShieldCheck, 
  Smartphone,
  Sparkles,
  Check
} from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { useLearner } from '../../context/LearnerContext';
import { audioService } from '../../services/audioService';

const WALLPAPERS = [
  { id: 'win11-bloom', name: 'Windows 11 Bloom Dark', class: 'win11-gradient', os: 'windows' },
  { id: 'ubuntu-noble', name: 'Ubuntu Noble Aubergine', class: 'ubuntu-gradient', os: 'linux' },
  { id: 'mac-sonoma', name: 'macOS Sonoma Horizon', class: 'mac-gradient', os: 'macos' },
  { id: 'chrome-cloud', name: 'ChromeOS Material Sky', class: 'chrome-gradient', os: 'chrome' },
  { id: 'deep-space', name: 'Deep Space Nebula', class: 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900', os: 'all' },
  { id: 'cyber-matrix', name: 'Emerald Cyber Grid', class: 'bg-gradient-to-br from-black via-emerald-950 to-slate-950', os: 'all' }
];

export const SettingsApp = () => {
  const { activeOS, soundMuted, toggleSound, wallpapers, setWallpaperForOS, playOSBootChime } = useOS();
  const { learnerName, triggerChallengeEvent } = useLearner();
  const [activeTab, setActiveTab] = useState('personalization');

  const handleSelectWallpaper = (wp) => {
    setWallpaperForOS(activeOS, wp.class);
    audioService.playClick();
    triggerChallengeEvent({ type: 'CHANGED_WALLPAPER' });
  };

  return (
    <div className="h-full flex flex-col sm:flex-row bg-slate-900 text-slate-200 select-none">
      {/* Settings Navigation Tabs */}
      <div className="w-full sm:w-48 bg-slate-950/70 border-b sm:border-b-0 sm:border-r border-slate-800 p-2 sm:p-3 flex sm:flex-col gap-1 overflow-x-auto sm:overflow-x-visible shrink-0">
        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 py-1 hidden sm:block">
          Settings
        </div>
        <button
          onClick={() => setActiveTab('personalization')}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'personalization' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Palette className="w-4 h-4 shrink-0" />
          <span>Personalization</span>
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'system' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4 shrink-0" />
          <span>System & Specs</span>
        </button>
        <button
          onClick={() => setActiveTab('sound')}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'sound' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Volume2 className="w-4 h-4 shrink-0" />
          <span>Sound & Chimes</span>
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'about' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Info className="w-4 h-4 shrink-0" />
          <span>About SarlaYash</span>
        </button>
      </div>

      {/* Settings Detail Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
        {activeTab === 'personalization' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white">Desktop Wallpapers & Themes</h2>
              <p className="text-xs text-slate-400">Choose a high-resolution background for your {activeOS.toUpperCase()} desktop.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {WALLPAPERS.map((wp) => {
                const isSelected = wallpapers[activeOS] === wp.class;
                return (
                  <div
                    key={wp.id}
                    onClick={() => handleSelectWallpaper(wp)}
                    className={`group relative h-24 sm:h-28 rounded-xl border overflow-hidden cursor-pointer transition-all ${wp.class} ${
                      isSelected ? 'ring-2 ring-blue-500 border-white shadow-lg' : 'border-slate-700/80 hover:scale-[1.02]'
                    }`}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-[11px] font-semibold text-white truncate flex items-center justify-between">
                      <span className="truncate">{wp.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-white">Virtual Workstation Specifications</h2>
              <p className="text-xs text-slate-400">Emulated hardware allocated for mobile browser execution.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                  <Cpu className="w-4 h-4" />
                  <span>Virtual Processor</span>
                </div>
                <div className="text-sm font-bold text-white">Intel Core i7 Virtual Architecture (4 vCPUs @ 3.2GHz)</div>
                <div className="text-xs text-slate-400">Hardware virtualization layer active</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <HardDrive className="w-4 h-4" />
                  <span>Allocated Memory & Storage</span>
                </div>
                <div className="text-sm font-bold text-white">8,192 MB DDR4 RAM / 64 GB Virtual NVMe SSD</div>
                <div className="text-xs text-slate-400">Backed by persistent browser IndexedDB/LocalStorage</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
                  <Monitor className="w-4 h-4" />
                  <span>Display Resolution</span>
                </div>
                <div className="text-sm font-bold text-white">
                  {typeof window !== 'undefined' ? `${window.innerWidth} x ${window.innerHeight}` : '1920 x 1080'}
                </div>
                <div className="text-xs text-slate-400">Adaptive viewport scaling for mobile phones & tablets</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Active Learner Account</span>
                </div>
                <div className="text-sm font-bold text-white">{learnerName || 'Student Learner'}</div>
                <div className="text-xs text-slate-400">Administrator Privileges (sudo / wheel)</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sound' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white">System Sound & Boot Chimes</h2>
              <p className="text-xs text-slate-400">All chimes synthesized directly using Web Audio API.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-semibold text-white">Master Sound Effects</div>
                <div className="text-xs text-slate-400">Boot chimes, clicks, and challenge fanfare</div>
              </div>
              <button
                onClick={toggleSound}
                className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all ${
                  soundMuted ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                }`}
              >
                {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{soundMuted ? 'Muted' : 'Sound Enabled'}</span>
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300">Test OS Boot Chimes:</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => audioService.playWindowsBoot()}
                  className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 text-center"
                >
                  🔔 Windows 11 Chime
                </button>
                <button
                  onClick={() => audioService.playLinuxBoot()}
                  className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 text-center"
                >
                  🥁 Ubuntu Drum
                </button>
                <button
                  onClick={() => audioService.playMacBoot()}
                  className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 text-center"
                >
                  🎹 Mac Boot Chord
                </button>
                <button
                  onClick={() => audioService.playChromeBoot()}
                  className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 text-center"
                >
                  ⚡ Chrome Ping
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white">SarlaYash OS Universe</h2>
              <p className="text-xs text-blue-400 font-medium">Powered by Kapil — Mobile-First Virtual Computer Lab</p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 text-xs space-y-2.5 leading-relaxed text-slate-300">
              <p className="text-white font-semibold">
                "The mission: Give every student the opportunity to learn practical computer skills, even when their only available device is a mobile phone."
              </p>
              <p>
                Created with love to bridge the digital divide. Students who don't possess high-end laptops can simulate OS installations, master 50+ CLI commands, inspect file structures, and earn genuine QR-verifiable certificates on any mobile phone.
              </p>
              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Version: 1.0.0 Stable</span>
                <span>Founder Contact: <code className="text-blue-300">kapilnarula27july@gmail.com</code></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

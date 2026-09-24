// Authentic Google ChromeOS Desktop Simulator
// Built according to real ChromeOS Shelf, Everything Launcher, and Quick Settings patterns

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Wifi, 
  Volume2, 
  Battery, 
  RotateCw, 
  Compass, 
  Sliders, 
  Lock, 
  Power, 
  Sun, 
  Moon, 
  Bell, 
  Camera, 
  Sparkles 
} from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { useLearner } from '../../context/LearnerContext';
import { 
  GoogleChromeLogo, 
  ChromeFilesIcon, 
  ChromeTerminalIcon, 
  ChromeSettingsIcon, 
  WindowsNotepadIcon 
} from '../icons/OSIcons';

import { TerminalApp } from '../apps/TerminalApp';
import { FileExplorerApp } from '../apps/FileExplorerApp';
import { SettingsApp } from '../apps/SettingsApp';
import { TextEditorApp } from '../apps/TextEditorApp';
import { CalculatorApp } from '../apps/CalculatorApp';
import { BrowserApp } from '../apps/BrowserApp';
import { audioService } from '../../services/audioService';

export const ChromeDesktop = () => {
  const { openWindow, windows, wallpapers, setMode, switchOS } = useOS();
  const { markOSExplored, learnerName } = useLearner();

  const [launcherOpen, setLauncherOpen] = useState(false);
  const [quickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(80);
  const [brightnessLevel, setBrightnessLevel] = useState(90);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    markOSExplored('chrome');
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const launchApp = (appId) => {
    setLauncherOpen(false);
    setQuickSettingsOpen(false);
    audioService.playClick();

    if (appId === 'terminal') {
      openWindow({
        id: 'chrome-crostini',
        title: 'Terminal — Crostini Linux container (penguin)',
        icon: ChromeTerminalIcon,
        component: TerminalApp,
        defaultWidth: 680,
        defaultHeight: 440
      });
    } else if (appId === 'files') {
      openWindow({
        id: 'chrome-files',
        title: 'Files',
        icon: ChromeFilesIcon,
        component: FileExplorerApp,
        defaultWidth: 760,
        defaultHeight: 480
      });
    } else if (appId === 'settings') {
      openWindow({
        id: 'chrome-settings',
        title: 'Settings',
        icon: ChromeSettingsIcon,
        component: SettingsApp,
        defaultWidth: 720,
        defaultHeight: 480
      });
    } else if (appId === 'browser') {
      openWindow({
        id: 'chrome-browser',
        title: 'Google Chrome',
        icon: GoogleChromeLogo,
        component: BrowserApp,
        defaultWidth: 760,
        defaultHeight: 500
      });
    } else if (appId === 'calc') {
      openWindow({
        id: 'chrome-calc',
        title: 'Calculator',
        icon: CalculatorApp,
        component: CalculatorApp,
        defaultWidth: 320,
        defaultHeight: 460
      });
    } else if (appId === 'notes') {
      openWindow({
        id: 'chrome-notes',
        title: 'Text Notes',
        icon: WindowsNotepadIcon,
        component: TextEditorApp,
        defaultWidth: 560,
        defaultHeight: 400
      });
    }
  };

  const closeMenus = () => {
    if (launcherOpen) setLauncherOpen(false);
    if (quickSettingsOpen) setQuickSettingsOpen(false);
  };

  const SHELF_APPS = [
    { id: 'browser', name: 'Google Chrome', icon: GoogleChromeLogo },
    { id: 'files', name: 'Files', icon: ChromeFilesIcon },
    { id: 'terminal', name: 'Crostini Terminal', icon: ChromeTerminalIcon },
    { id: 'notes', name: 'Text Notes', icon: WindowsNotepadIcon },
    { id: 'settings', name: 'Settings', icon: ChromeSettingsIcon }
  ];

  return (
    <div
      onClick={closeMenus}
      className={`relative w-full h-full select-none overflow-hidden ${wallpapers.chrome || 'chrome-material-bg'}`}
    >
      {/* ChromeOS App Launcher Popover */}
      {launcherOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-14 left-4 z-[9900] w-full max-w-md bg-[#202124]/95 border border-[#3c4043] rounded-3xl p-5 shadow-2xl backdrop-blur-2xl text-white animate-window"
        >
          {/* Google Search Bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-[#303134] border border-[#5f6368]/40 rounded-full mb-5 text-xs shadow-inner">
            <Search className="w-4 h-4 text-[#8ab4f8]" />
            <input
              type="text"
              placeholder="Search your device, apps, and the web..."
              className="flex-1 bg-transparent border-none outline-none text-white text-xs placeholder-[#9aa0a6] font-normal"
            />
          </div>

          <div className="text-xs font-semibold text-[#9aa0a6] mb-3 px-1">All Apps</div>
          <div className="grid grid-cols-4 gap-4">
            {SHELF_APPS.map((app) => {
              const Icon = app.icon;
              return (
                <button
                  key={app.id}
                  onClick={() => launchApp(app.id)}
                  className="p-3 rounded-2xl hover:bg-white/10 flex flex-col items-center justify-center text-center transition-all group"
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <Icon className="w-10 h-10" />
                  </div>
                  <span className="text-[11px] font-medium text-[#e8eaed] truncate w-full">{app.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ChromeOS Quick Settings Popover */}
      {quickSettingsOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-14 right-4 z-[9900] w-72 bg-[#202124]/95 border border-[#3c4043] rounded-3xl p-4 shadow-2xl backdrop-blur-2xl text-white animate-window space-y-4 font-sans"
        >
          {/* User Account & Action Buttons */}
          <div className="flex items-center justify-between pb-2 border-b border-[#3c4043]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#1a73e8] text-white font-bold text-xs flex items-center justify-center">
                {(learnerName || 'S')[0]}
              </div>
              <span className="text-xs font-semibold text-[#e8eaed]">{learnerName || 'Student'}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setMode('hub')}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-300"
                title="Lab Hub"
              >
                <Compass className="w-4 h-4 text-[#8ab4f8]" />
              </button>
              <button
                onClick={() => switchOS('chrome', 'installer')}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-300"
                title="Re-run Setup"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Toggle Cards */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-2xl bg-[#1a73e8]/30 border border-[#1a73e8]/50 flex items-center gap-2 font-medium">
              <Wifi className="w-4 h-4 text-[#8ab4f8]" />
              <span>Campus Wi-Fi</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#303134] border border-[#5f6368]/30 flex items-center gap-2 text-[#e8eaed]">
              <Bell className="w-4 h-4 text-[#8ab4f8]" />
              <span>Notifications</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#303134] border border-[#5f6368]/30 flex items-center gap-2 text-[#e8eaed]">
              <Moon className="w-4 h-4 text-[#8ab4f8]" />
              <span>Night Light</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#303134] border border-[#5f6368]/30 flex items-center gap-2 text-[#e8eaed]">
              <Camera className="w-4 h-4 text-[#8ab4f8]" />
              <span>Screen capture</span>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-[#8ab4f8]" />
              <input
                type="range"
                min="0"
                max="100"
                value={volumeLevel}
                onChange={(e) => setVolumeLevel(Number(e.target.value))}
                className="flex-1 accent-[#8ab4f8] h-1.5 bg-[#303134] rounded-lg cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <Sun className="w-4 h-4 text-[#8ab4f8]" />
              <input
                type="range"
                min="0"
                max="100"
                value={brightnessLevel}
                onChange={(e) => setBrightnessLevel(Number(e.target.value))}
                className="flex-1 accent-[#8ab4f8] h-1.5 bg-[#303134] rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* ChromeOS Bottom Shelf */}
      <div className="absolute bottom-0 left-0 right-0 h-12 chrome-shelf flex items-center justify-between px-3 z-[9800]">
        {/* Everything Button (Launcher) */}
        <button
          onClick={(e) => { e.stopPropagation(); setLauncherOpen(!launcherOpen); audioService.playClick(); }}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            launcherOpen ? 'bg-white/20' : 'hover:bg-white/10 active:scale-95'
          }`}
          title="Launcher"
        >
          <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </button>

        {/* Pinned Shelf Apps */}
        <div className="flex items-center gap-2">
          {SHELF_APPS.map((app) => {
            const Icon = app.icon;
            const isOpen = windows.some(w => w.id === `chrome-${app.id}` || (app.id === 'terminal' && w.id === 'chrome-crostini'));

            return (
              <button
                key={app.id}
                onClick={() => launchApp(app.id)}
                className={`p-1.5 rounded-full transition-all relative group ${
                  isOpen ? 'bg-white/15' : 'hover:bg-white/10'
                }`}
                title={app.name}
              >
                <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                {isOpen && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-[#8ab4f8] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Quick Settings Pill */}
        <button
          onClick={(e) => { e.stopPropagation(); setQuickSettingsOpen(!quickSettingsOpen); audioService.playClick(); }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs text-white transition-colors ${
            quickSettingsOpen ? 'bg-[#303134] border-[#8ab4f8]' : 'bg-[#202124]/80 hover:bg-[#303134] border-[#3c4043]'
          }`}
        >
          <Wifi className="w-3.5 h-3.5" />
          <Volume2 className="w-3.5 h-3.5" />
          <Battery className="w-3.5 h-3.5" />
          <span className="font-medium text-[11px]">{currentTime}</span>
        </button>
      </div>
    </div>
  );
};

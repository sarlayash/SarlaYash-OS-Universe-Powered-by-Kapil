// Google ChromeOS Desktop Environment Simulator
import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Folder, 
  Settings, 
  FileText, 
  Calculator, 
  Search, 
  Wifi, 
  Volume2, 
  Battery, 
  RotateCw,
  Compass,
  Play
} from 'lucide-react';
import { ChromeIcon } from '../icons/ChromeIcon';
import { useOS } from '../../context/OSContext';
import { useLearner } from '../../context/LearnerContext';
import { TerminalApp } from '../apps/TerminalApp';
import { FileExplorerApp } from '../apps/FileExplorerApp';
import { SettingsApp } from '../apps/SettingsApp';
import { TextEditorApp } from '../apps/TextEditorApp';
import { CalculatorApp } from '../apps/CalculatorApp';
import { BrowserApp } from '../apps/BrowserApp';
import { audioService } from '../../services/audioService';

export const ChromeDesktop = () => {
  const { openWindow, windows, wallpapers, setMode, switchOS } = useOS();
  const { markOSExplored } = useLearner();

  const [launcherOpen, setLauncherOpen] = useState(false);
  const [quickSettingsOpen, setQuickSettingsOpen] = useState(false);
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
        title: 'Terminal — Crostini Linux (penguin)',
        icon: Terminal,
        component: TerminalApp,
        defaultWidth: 640,
        defaultHeight: 420
      });
    } else if (appId === 'files') {
      openWindow({
        id: 'chrome-files',
        title: 'Files',
        icon: Folder,
        component: FileExplorerApp,
        defaultWidth: 720,
        defaultHeight: 460
      });
    } else if (appId === 'settings') {
      openWindow({
        id: 'chrome-settings',
        title: 'ChromeOS Settings',
        icon: Settings,
        component: SettingsApp,
        defaultWidth: 680,
        defaultHeight: 460
      });
    } else if (appId === 'browser') {
      openWindow({
        id: 'chrome-browser',
        title: 'Google Chrome',
        icon: ChromeIcon,
        component: BrowserApp,
        defaultWidth: 740,
        defaultHeight: 480
      });
    } else if (appId === 'calc') {
      openWindow({
        id: 'chrome-calc',
        title: 'Calculator',
        icon: Calculator,
        component: CalculatorApp,
        defaultWidth: 320,
        defaultHeight: 440
      });
    } else if (appId === 'notes') {
      openWindow({
        id: 'chrome-notes',
        title: 'Text Notes',
        icon: FileText,
        component: TextEditorApp,
        defaultWidth: 540,
        defaultHeight: 380
      });
    }
  };

  const closeMenus = () => {
    if (launcherOpen) setLauncherOpen(false);
    if (quickSettingsOpen) setQuickSettingsOpen(false);
  };

  const SHELF_APPS = [
    { id: 'browser', name: 'Chrome', icon: ChromeIcon, color: 'text-blue-400' },
    { id: 'files', name: 'Files', icon: Folder, color: 'text-teal-400' },
    { id: 'terminal', name: 'Terminal', icon: Terminal, color: 'text-emerald-400' },
    { id: 'notes', name: 'Notes', icon: FileText, color: 'text-amber-400' },
    { id: 'calc', name: 'Calculator', icon: Calculator, color: 'text-purple-400' },
    { id: 'settings', name: 'Settings', icon: Settings, color: 'text-slate-300' }
  ];

  return (
    <div
      onClick={closeMenus}
      className={`relative w-full h-full select-none overflow-hidden ${wallpapers.chrome || 'chrome-gradient'}`}
    >
      {/* ChromeOS App Launcher Popover */}
      {launcherOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-14 left-4 z-[9900] w-full max-w-sm sm:max-w-md bg-slate-900/95 border border-slate-700/80 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl text-white animate-window"
        >
          {/* Search everything */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-950/80 border border-slate-700 rounded-full mb-4 text-xs">
            <Search className="w-4 h-4 text-blue-400" />
            <input
              type="text"
              placeholder="Search your device, apps and the web..."
              className="flex-1 bg-transparent border-none outline-none text-white text-xs placeholder-slate-500"
            />
          </div>

          <div className="text-xs font-semibold text-slate-400 mb-3">All Applications</div>
          <div className="grid grid-cols-4 gap-3">
            {SHELF_APPS.map((app) => {
              const Icon = app.icon;
              return (
                <button
                  key={app.id}
                  onClick={() => launchApp(app.id)}
                  className="p-3 rounded-2xl hover:bg-white/10 flex flex-col items-center justify-center text-center transition-colors"
                >
                  <Icon className={`w-7 h-7 mb-1.5 ${app.color}`} />
                  <span className="text-[11px] font-medium truncate w-full">{app.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Settings Menu */}
      {quickSettingsOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-14 right-4 z-[9900] w-64 bg-slate-900/95 border border-slate-700/80 rounded-3xl p-4 shadow-2xl backdrop-blur-2xl text-white animate-window space-y-3"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold">Quick Settings</span>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('hub')}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300"
                title="Return to Lab Hub"
              >
                <Compass className="w-4 h-4" />
              </button>
              <button
                onClick={() => switchOS('chrome', 'installer')}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300"
                title="Re-run Setup"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-2xl bg-blue-600/30 border border-blue-500/40 flex items-center gap-2">
              <Wifi className="w-4 h-4 text-blue-400" />
              <span>Campus Wi-Fi</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center gap-2">
              <Battery className="w-4 h-4 text-emerald-400" />
              <span>94% Battery</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Shelf */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-slate-950/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-3 z-[9800]">
        {/* Left: Everything / Launcher Button */}
        <button
          onClick={(e) => { e.stopPropagation(); setLauncherOpen(!launcherOpen); audioService.playClick(); }}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            launcherOpen ? 'bg-white/30 text-white' : 'hover:bg-white/10 text-white'
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
            const isOpen = windows.some(w => w.id === `chrome-${app.id}`);
            return (
              <button
                key={app.id}
                onClick={() => launchApp(app.id)}
                className={`p-2 rounded-2xl transition-all relative ${
                  isOpen ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
                title={app.name}
              >
                <Icon className={`w-5 h-5 ${app.color}`} />
                {isOpen && (
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Quick Settings Pill */}
        <button
          onClick={(e) => { e.stopPropagation(); setQuickSettingsOpen(!quickSettingsOpen); audioService.playClick(); }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-xs text-white"
        >
          <Wifi className="w-3.5 h-3.5" />
          <Volume2 className="w-3.5 h-3.5" />
          <Battery className="w-3.5 h-3.5" />
          <span className="font-semibold text-[11px]">{currentTime}</span>
        </button>
      </div>
    </div>
  );
};

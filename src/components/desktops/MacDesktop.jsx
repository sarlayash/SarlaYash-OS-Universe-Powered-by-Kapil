// Apple macOS Sonoma Desktop Simulator
import React, { useState, useEffect } from 'react';
import { 
  Apple, 
  Terminal, 
  Folder, 
  Settings, 
  FileText, 
  Calculator, 
  Globe, 
  Search, 
  Wifi, 
  Battery, 
  HardDrive, 
  Sliders, 
  RotateCw,
  Compass,
  Trash2
} from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { useLearner } from '../../context/LearnerContext';
import { TerminalApp } from '../apps/TerminalApp';
import { FileExplorerApp } from '../apps/FileExplorerApp';
import { SettingsApp } from '../apps/SettingsApp';
import { TextEditorApp } from '../apps/TextEditorApp';
import { CalculatorApp } from '../apps/CalculatorApp';
import { BrowserApp } from '../apps/BrowserApp';
import { audioService } from '../../services/audioService';

export const MacDesktop = () => {
  const { openWindow, windows, wallpapers, setMode, switchOS } = useOS();
  const { markOSExplored } = useLearner();

  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    markOSExplored('macos');
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const launchApp = (appId) => {
    setSpotlightOpen(false);
    setAppleMenuOpen(false);
    audioService.playClick();

    if (appId === 'terminal') {
      openWindow({
        id: 'mac-terminal',
        title: 'Terminal — zsh — 80x24',
        icon: Terminal,
        component: TerminalApp,
        defaultWidth: 640,
        defaultHeight: 420
      });
    } else if (appId === 'finder') {
      openWindow({
        id: 'mac-finder',
        title: 'Finder',
        icon: Folder,
        component: FileExplorerApp,
        defaultWidth: 720,
        defaultHeight: 460
      });
    } else if (appId === 'settings') {
      openWindow({
        id: 'mac-settings',
        title: 'System Settings',
        icon: Settings,
        component: SettingsApp,
        defaultWidth: 680,
        defaultHeight: 460
      });
    } else if (appId === 'notes') {
      openWindow({
        id: 'mac-notes',
        title: 'Notes',
        icon: FileText,
        component: TextEditorApp,
        defaultWidth: 540,
        defaultHeight: 380
      });
    } else if (appId === 'calc') {
      openWindow({
        id: 'mac-calc',
        title: 'Calculator',
        icon: Calculator,
        component: CalculatorApp,
        defaultWidth: 320,
        defaultHeight: 440
      });
    } else if (appId === 'safari') {
      openWindow({
        id: 'mac-safari',
        title: 'Safari',
        icon: Globe,
        component: BrowserApp,
        defaultWidth: 740,
        defaultHeight: 480
      });
    }
  };

  const closeMenus = () => {
    if (appleMenuOpen) setAppleMenuOpen(false);
    if (spotlightOpen) setSpotlightOpen(false);
  };

  const DOCK_APPS = [
    { id: 'finder', name: 'Finder', icon: Folder, color: 'text-blue-400' },
    { id: 'safari', name: 'Safari', icon: Globe, color: 'text-cyan-400' },
    { id: 'terminal', name: 'Terminal', icon: Terminal, color: 'text-slate-200' },
    { id: 'notes', name: 'Notes', icon: FileText, color: 'text-amber-300' },
    { id: 'settings', name: 'System Settings', icon: Settings, color: 'text-slate-300' },
    { id: 'calc', name: 'Calculator', icon: Calculator, color: 'text-orange-400' }
  ];

  return (
    <div
      onClick={closeMenus}
      className={`relative w-full h-full select-none overflow-hidden ${wallpapers.macos || 'mac-gradient'}`}
    >
      {/* macOS Top Menu Bar */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-black/40 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-3 z-[9800] text-xs text-white">
        {/* Left Menu Items */}
        <div className="flex items-center gap-3.5 relative">
          <button
            onClick={(e) => { e.stopPropagation(); setAppleMenuOpen(!appleMenuOpen); }}
            className="hover:opacity-75 transition-opacity"
          >
            <Apple className="w-3.5 h-3.5 fill-current" />
          </button>
          <span className="font-bold text-[12px]">Finder</span>
          <span className="text-slate-300 hover:text-white cursor-pointer hidden sm:inline">File</span>
          <span className="text-slate-300 hover:text-white cursor-pointer hidden sm:inline">Edit</span>
          <span className="text-slate-300 hover:text-white cursor-pointer hidden sm:inline">View</span>
          <span className="text-slate-300 hover:text-white cursor-pointer hidden sm:inline">Window</span>
          <span className="text-slate-300 hover:text-white cursor-pointer hidden sm:inline">Help</span>

          {/* Apple Dropdown */}
          {appleMenuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-7 w-52 bg-slate-900/90 border border-white/15 rounded-xl p-1.5 shadow-2xl backdrop-blur-2xl space-y-0.5 text-xs text-slate-200 animate-window z-[9900]"
            >
              <button
                onClick={() => launchApp('settings')}
                className="w-full px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white text-left font-semibold"
              >
                About This Mac
              </button>
              <button
                onClick={() => launchApp('settings')}
                className="w-full px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white text-left"
              >
                System Settings...
              </button>
              <div className="border-t border-slate-700/60 my-1" />
              <button
                onClick={() => setMode('hub')}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white text-left"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Return to Lab Hub</span>
              </button>
              <button
                onClick={() => switchOS('macos', 'installer')}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white text-left"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Restart Setup Assistant</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Status Items */}
        <div className="flex items-center gap-3 text-slate-200 text-xs">
          <Battery className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <button
            onClick={(e) => { e.stopPropagation(); setSpotlightOpen(!spotlightOpen); }}
            className="hover:text-white"
            title="Spotlight Search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
          <Sliders className="w-3.5 h-3.5" />
          <span className="font-medium text-[11px]">{new Date().toLocaleDateString([], { weekday: 'short' })} {currentTime}</span>
        </div>
      </div>

      {/* Spotlight Search Overlay */}
      {spotlightOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-20 left-1/2 -translate-x-1/2 z-[9900] w-full max-w-lg bg-slate-900/90 border border-white/20 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl text-white animate-window"
        >
          <div className="flex items-center gap-3 px-2 py-1.5">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={spotlightQuery}
              onChange={(e) => setSpotlightQuery(e.target.value)}
              placeholder="Spotlight Search (Terminal, Safari, Notes...)"
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-slate-500"
            />
          </div>
          <div className="border-t border-slate-700/60 mt-2 pt-2 grid grid-cols-3 gap-2">
            {DOCK_APPS.filter(a => a.name.toLowerCase().includes(spotlightQuery.toLowerCase())).map(app => (
              <button
                key={app.id}
                onClick={() => launchApp(app.id)}
                className="p-2 rounded-xl hover:bg-blue-600/30 flex items-center gap-2 text-xs text-left"
              >
                <app.icon className={`w-4 h-4 ${app.color}`} />
                <span className="truncate">{app.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Macintosh HD icon */}
      <div className="absolute top-12 right-6 space-y-3 z-10">
        <div
          onClick={() => launchApp('finder')}
          className="w-20 p-2 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/10 transition-colors group"
        >
          <HardDrive className="w-10 h-10 text-slate-200 drop-shadow-md group-hover:scale-105 transition-transform" />
          <span className="text-[11px] font-semibold text-white drop-shadow mt-1">Macintosh HD</span>
        </div>
      </div>

      {/* Floating Bottom macOS Glass Dock */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[9800]">
        <div className="glass-dock px-3 py-2 rounded-2xl flex items-end gap-2.5">
          {DOCK_APPS.map((app) => {
            const Icon = app.icon;
            const isOpen = windows.some(w => w.id === `mac-${app.id}`);
            return (
              <div key={app.id} className="relative flex flex-col items-center">
                <button
                  onClick={() => launchApp(app.id)}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-900/80 border border-white/20 flex items-center justify-center shadow-lg hover:-translate-y-2 hover:scale-110 active:scale-95 transition-all group"
                  title={app.name}
                >
                  <Icon className={`w-6 h-6 ${app.color}`} />
                </button>
                {/* Indicator dot */}
                {isOpen && (
                  <div className="w-1 h-1 rounded-full bg-white mt-1 shadow-glow" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Authentic Apple macOS Sonoma Desktop Simulator
// Built with real frosted glass Menu Bar, Sonoma Horizon wallpaper, Spotlight, and 3D Dock

import React, { useState, useEffect } from 'react';
import { 
  Apple, 
  Search, 
  Wifi, 
  Battery, 
  Sliders, 
  RotateCw, 
  Compass, 
  HardDrive, 
  Trash2,
  Sparkles
} from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { useLearner } from '../../context/LearnerContext';
import { 
  MacFinderIcon, 
  MacSafariIcon, 
  MacTerminalIcon, 
  MacSettingsIcon, 
  MacNotesIcon 
} from '../icons/OSIcons';

import { TerminalApp } from '../apps/TerminalApp';
import { FileExplorerApp } from '../apps/FileExplorerApp';
import { SettingsApp } from '../apps/SettingsApp';
import { TextEditorApp } from '../apps/TextEditorApp';
import { CalculatorApp } from '../apps/CalculatorApp';
import { BrowserApp } from '../apps/BrowserApp';
import { audioService } from '../../services/audioService';

export const MacDesktop = () => {
  const { openWindow, windows, wallpapers, setMode, switchOS } = useOS();
  const { markOSExplored, learnerName } = useLearner();

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
        title: `${(learnerName || 'student').toLowerCase()}@MacBook-Pro: ~ (zsh)`,
        icon: MacTerminalIcon,
        component: TerminalApp,
        defaultWidth: 680,
        defaultHeight: 440
      });
    } else if (appId === 'finder') {
      openWindow({
        id: 'mac-finder',
        title: 'Finder',
        icon: MacFinderIcon,
        component: FileExplorerApp,
        defaultWidth: 760,
        defaultHeight: 480
      });
    } else if (appId === 'settings') {
      openWindow({
        id: 'mac-settings',
        title: 'System Settings',
        icon: MacSettingsIcon,
        component: SettingsApp,
        defaultWidth: 720,
        defaultHeight: 480
      });
    } else if (appId === 'notes') {
      openWindow({
        id: 'mac-notes',
        title: 'Notes',
        icon: MacNotesIcon,
        component: TextEditorApp,
        defaultWidth: 560,
        defaultHeight: 400
      });
    } else if (appId === 'calc') {
      openWindow({
        id: 'mac-calc',
        title: 'Calculator',
        icon: CalculatorApp,
        component: CalculatorApp,
        defaultWidth: 320,
        defaultHeight: 460
      });
    } else if (appId === 'safari') {
      openWindow({
        id: 'mac-safari',
        title: 'Safari',
        icon: MacSafariIcon,
        component: BrowserApp,
        defaultWidth: 760,
        defaultHeight: 500
      });
    }
  };

  const closeMenus = () => {
    if (appleMenuOpen) setAppleMenuOpen(false);
    if (spotlightOpen) setSpotlightOpen(false);
  };

  const DOCK_APPS = [
    { id: 'finder', name: 'Finder', icon: MacFinderIcon },
    { id: 'safari', name: 'Safari', icon: MacSafariIcon },
    { id: 'terminal', name: 'Terminal', icon: MacTerminalIcon },
    { id: 'notes', name: 'Notes', icon: MacNotesIcon },
    { id: 'settings', name: 'System Settings', icon: MacSettingsIcon }
  ];

  return (
    <div
      onClick={closeMenus}
      className={`relative w-full h-full select-none overflow-hidden ${wallpapers.macos || 'mac-sonoma-bg'}`}
    >
      {/* macOS Top Menu Bar */}
      <div className="absolute top-0 left-0 right-0 h-6 mac-menubar flex items-center justify-between px-3 z-[9800] text-xs text-white font-sans">
        {/* Left: Apple Logo & App Menus */}
        <div className="flex items-center gap-3.5 relative">
          <button
            onClick={(e) => { e.stopPropagation(); setAppleMenuOpen(!appleMenuOpen); }}
            className="hover:opacity-75 transition-opacity"
            title="Apple Menu"
          >
            <Apple className="w-3.5 h-3.5 fill-current" />
          </button>

          <span className="font-bold text-[12px] text-white">Finder</span>
          <span className="text-white/80 hover:text-white cursor-pointer hidden sm:inline">File</span>
          <span className="text-white/80 hover:text-white cursor-pointer hidden sm:inline">Edit</span>
          <span className="text-white/80 hover:text-white cursor-pointer hidden sm:inline">View</span>
          <span className="text-white/80 hover:text-white cursor-pointer hidden sm:inline">Go</span>
          <span className="text-white/80 hover:text-white cursor-pointer hidden sm:inline">Window</span>
          <span className="text-white/80 hover:text-white cursor-pointer hidden sm:inline">Help</span>

          {/* Apple Menu Dropdown */}
          {appleMenuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-6 w-56 mac-glass-window rounded-xl p-1.5 shadow-2xl space-y-0.5 text-xs text-white animate-window z-[9900]"
            >
              <button
                onClick={() => launchApp('settings')}
                className="w-full px-3 py-1.5 rounded-lg hover:bg-blue-600 text-left font-semibold"
              >
                About This Mac
              </button>
              <button
                onClick={() => launchApp('settings')}
                className="w-full px-3 py-1.5 rounded-lg hover:bg-blue-600 text-left"
              >
                System Settings...
              </button>
              <div className="border-t border-white/10 my-1" />
              <button
                onClick={() => setMode('hub')}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-blue-600 text-left"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Return to Lab Hub</span>
              </button>
              <button
                onClick={() => switchOS('macos', 'installer')}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-blue-600 text-left"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Restart Setup Assistant</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Status Items */}
        <div className="flex items-center gap-3 text-white text-xs">
          <Battery className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <button
            onClick={(e) => { e.stopPropagation(); setSpotlightOpen(!spotlightOpen); }}
            className="hover:opacity-75"
            title="Spotlight Search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
          <Sliders className="w-3.5 h-3.5" />
          <span className="font-semibold text-[11px]">{new Date().toLocaleDateString([], { weekday: 'short' })} {currentTime}</span>
        </div>
      </div>

      {/* Spotlight Search Overlay */}
      {spotlightOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-24 left-1/2 -translate-x-1/2 z-[9900] w-full max-w-lg mac-glass-window rounded-2xl p-4 shadow-2xl text-white animate-window"
        >
          <div className="flex items-center gap-3 px-2 py-1">
            <Search className="w-5 h-5 text-white/60" />
            <input
              type="text"
              value={spotlightQuery}
              onChange={(e) => setSpotlightQuery(e.target.value)}
              placeholder="Spotlight Search"
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-base text-white placeholder-white/40 font-light"
            />
          </div>
          <div className="border-t border-white/10 mt-3 pt-3 grid grid-cols-5 gap-2">
            {DOCK_APPS.filter(a => a.name.toLowerCase().includes(spotlightQuery.toLowerCase())).map(app => (
              <button
                key={app.id}
                onClick={() => launchApp(app.id)}
                className="p-2 rounded-xl hover:bg-white/10 flex flex-col items-center gap-1.5 text-center transition-colors"
              >
                <app.icon className="w-8 h-8" />
                <span className="text-[10px] text-white/90 truncate w-full">{app.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Macintosh HD icon */}
      <div className="absolute top-10 right-6 space-y-3 z-10">
        <div
          onClick={() => launchApp('finder')}
          className="w-20 p-2 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/10 transition-colors group"
        >
          <HardDrive className="w-12 h-12 text-slate-200 drop-shadow-lg group-hover:scale-105 transition-transform" />
          <span className="text-[11px] font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] mt-1">
            Macintosh HD
          </span>
        </div>
      </div>

      {/* Floating 3D Frosted Glass Dock */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[9800]">
        <div className="mac-dock-bar px-3 py-1.5 rounded-2xl flex items-end gap-2.5">
          {DOCK_APPS.map((app) => {
            const Icon = app.icon;
            const isOpen = windows.some(w => w.id === `mac-${app.id}`);

            return (
              <div key={app.id} className="relative flex flex-col items-center">
                <button
                  onClick={() => launchApp(app.id)}
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center hover:-translate-y-2.5 hover:scale-115 active:scale-95 transition-all group duration-150"
                  title={app.name}
                >
                  <Icon className="w-11 h-11 sm:w-12 sm:h-12 drop-shadow-md" />
                </button>
                {/* Active App Indicator Dot */}
                {isOpen && (
                  <div className="w-1 h-1 rounded-full bg-white mb-0.5 shadow-glow" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

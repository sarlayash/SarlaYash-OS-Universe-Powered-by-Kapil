// Authentic Ubuntu Linux 24.04 LTS Desktop Environment Simulator (GNOME 46)
// Built with real Yaru theme, Noble Numbat colors, and GNOME dock patterns

import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Volume2, 
  Battery, 
  Power, 
  Home, 
  Trash2, 
  LayoutGrid, 
  RotateCw, 
  Compass, 
  Search, 
  Sliders, 
  Lock, 
  LogOut 
} from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { useLearner } from '../../context/LearnerContext';
import { 
  UbuntuLogo, 
  UbuntuFilesIcon, 
  UbuntuTerminalIcon, 
  UbuntuSoftwareIcon, 
  WindowsSettingsIcon, 
  WindowsNotepadIcon,
  GoogleChromeLogo 
} from '../icons/OSIcons';

import { TerminalApp } from '../apps/TerminalApp';
import { FileExplorerApp } from '../apps/FileExplorerApp';
import { SettingsApp } from '../apps/SettingsApp';
import { TextEditorApp } from '../apps/TextEditorApp';
import { CalculatorApp } from '../apps/CalculatorApp';
import { BrowserApp } from '../apps/BrowserApp';
import { audioService } from '../../services/audioService';

export const LinuxDesktop = () => {
  const { openWindow, windows, wallpapers, setMode, switchOS } = useOS();
  const { markOSExplored, learnerName } = useLearner();

  const [dashOpen, setDashOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [powerMenuOpen, setPowerMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    markOSExplored('linux');
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const launchApp = (appId) => {
    setDashOpen(false);
    setPowerMenuOpen(false);
    audioService.playClick();

    if (appId === 'terminal') {
      openWindow({
        id: 'ubuntu-term',
        title: `${(learnerName || 'student').toLowerCase()}@sarlayash-ubuntu: ~`,
        icon: UbuntuTerminalIcon,
        component: TerminalApp,
        defaultWidth: 680,
        defaultHeight: 440
      });
    } else if (appId === 'files') {
      openWindow({
        id: 'ubuntu-files',
        title: 'Files (Nautilus)',
        icon: UbuntuFilesIcon,
        component: FileExplorerApp,
        defaultWidth: 760,
        defaultHeight: 480
      });
    } else if (appId === 'settings') {
      openWindow({
        id: 'ubuntu-settings',
        title: 'Settings',
        icon: WindowsSettingsIcon,
        component: SettingsApp,
        defaultWidth: 720,
        defaultHeight: 480
      });
    } else if (appId === 'gedit') {
      openWindow({
        id: 'ubuntu-gedit',
        title: 'Text Editor',
        icon: WindowsNotepadIcon,
        component: TextEditorApp,
        defaultWidth: 560,
        defaultHeight: 400
      });
    } else if (appId === 'calc') {
      openWindow({
        id: 'ubuntu-calc',
        title: 'Calculator',
        icon: CalculatorApp,
        component: CalculatorApp,
        defaultWidth: 320,
        defaultHeight: 460
      });
    } else if (appId === 'browser') {
      openWindow({
        id: 'ubuntu-firefox',
        title: 'Firefox Web Browser',
        icon: GoogleChromeLogo,
        component: BrowserApp,
        defaultWidth: 760,
        defaultHeight: 500
      });
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    const x = Math.min(e.clientX, window.innerWidth - 200);
    const y = Math.min(e.clientY, window.innerHeight - 200);
    setContextMenu({ x, y });
  };

  const closeMenus = () => {
    if (dashOpen) setDashOpen(false);
    if (powerMenuOpen) setPowerMenuOpen(false);
    if (contextMenu) setContextMenu(null);
  };

  const DOCK_APPS = [
    { id: 'files', name: 'Files', icon: UbuntuFilesIcon },
    { id: 'terminal', name: 'Terminal', icon: UbuntuTerminalIcon },
    { id: 'browser', name: 'Firefox Web Browser', icon: GoogleChromeLogo },
    { id: 'gedit', name: 'Text Editor', icon: WindowsNotepadIcon },
    { id: 'software', name: 'Ubuntu Software', icon: UbuntuSoftwareIcon },
    { id: 'settings', name: 'Settings', icon: WindowsSettingsIcon }
  ];

  return (
    <div
      onClick={closeMenus}
      onContextMenu={handleContextMenu}
      className={`relative w-full h-full select-none overflow-hidden ${wallpapers.linux || 'ubuntu-noble-bg'}`}
    >
      {/* Ubuntu Center Mascot Stamp */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <UbuntuLogo className="w-80 h-80" />
      </div>

      {/* GNOME 46 Black Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-black/90 backdrop-blur-md flex items-center justify-between px-3 z-[9800] text-xs text-[#dfdbd2] font-sans">
        {/* Left: Activities button */}
        <button
          onClick={(e) => { e.stopPropagation(); setDashOpen(!dashOpen); }}
          className={`px-3 py-0.5 rounded-full font-semibold transition-all ${
            dashOpen ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white'
          }`}
        >
          Activities
        </button>

        {/* Center: Live Date & Clock */}
        <div className="font-semibold text-white cursor-pointer hover:bg-white/10 px-3 py-0.5 rounded-full text-xs">
          {new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })} &nbsp; {currentTime}
        </div>

        {/* Right: Quick Settings Pill */}
        <div className="relative">
          <div
            onClick={(e) => { e.stopPropagation(); setPowerMenuOpen(!powerMenuOpen); }}
            className={`flex items-center gap-2 px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
              powerMenuOpen ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <Wifi className="w-3.5 h-3.5 text-white" />
            <Volume2 className="w-3.5 h-3.5 text-white" />
            <Battery className="w-3.5 h-3.5 text-white" />
            <span className="text-[11px] font-medium text-white">98%</span>
          </div>

          {/* Quick Settings Dropdown */}
          {powerMenuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-8 w-64 bg-[#242424] border border-[#3c3c3c] rounded-2xl p-3 shadow-2xl text-xs text-white space-y-3 animate-window z-[9900]"
            >
              {/* Sliders */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-orange-400" />
                  <div className="flex-1 h-1.5 bg-[#3c3c3c] rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-3/4" />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-orange-600/20 border border-orange-500/40 font-semibold text-orange-400 flex items-center gap-2">
                  <Wifi className="w-3.5 h-3.5" />
                  <span>Wi-Fi On</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#2e2e2e] border border-[#444] font-medium text-slate-300 flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-orange-400" />
                  <span>Balanced</span>
                </div>
              </div>

              <div className="border-t border-[#3c3c3c] pt-2 flex items-center justify-between">
                <button
                  onClick={() => setMode('hub')}
                  className="px-2.5 py-1.5 rounded-lg bg-[#303030] hover:bg-[#3c3c3c] text-[11px] flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-orange-400" />
                  <span>Lab Hub</span>
                </button>
                <button
                  onClick={() => switchOS('linux', 'installer')}
                  className="p-2 rounded-lg bg-[#303030] hover:bg-orange-600 text-slate-300 hover:text-white"
                  title="Re-run Installer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Left Ubuntu Yaru Dock */}
      <div className="absolute top-7 left-0 bottom-0 w-14 ubuntu-dock flex flex-col items-center py-3 gap-2 z-[9700]">
        {DOCK_APPS.map((app) => {
          const Icon = app.icon;
          const isOpen = windows.some(w => w.id === `ubuntu-${app.id}` || (app.id === 'terminal' && w.id === 'ubuntu-term'));

          return (
            <button
              key={app.id}
              onClick={() => launchApp(app.id)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all relative group ${
                isOpen ? 'bg-white/10' : 'hover:bg-white/10'
              }`}
              title={app.name}
            >
              <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon className="w-7 h-7" />
              </div>
              {/* Ubuntu Orange Pill Indicator */}
              {isOpen && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-[#E95420] rounded-r-full shadow-sm" />
              )}
            </button>
          );
        })}

        {/* Bottom App Grid */}
        <div className="mt-auto">
          <button
            onClick={() => setDashOpen(!dashOpen)}
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            title="Show Applications"
          >
            <LayoutGrid className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-11 left-18 space-y-3 z-10">
        <div
          onClick={() => launchApp('files')}
          className="w-20 p-2 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/10 transition-colors group"
        >
          <Home className="w-10 h-10 text-orange-400 drop-shadow-md group-hover:scale-105 transition-transform" />
          <span className="text-[11px] font-medium text-white drop-shadow mt-1">Home</span>
        </div>
        <div
          onClick={() => launchApp('files')}
          className="w-20 p-2 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/10 transition-colors group"
        >
          <Trash2 className="w-10 h-10 text-slate-400 drop-shadow-md group-hover:scale-105 transition-transform" />
          <span className="text-[11px] font-medium text-white drop-shadow mt-1">Trash</span>
        </div>
      </div>

      {/* GNOME App Dash Overlay */}
      {dashOpen && (
        <div
          onClick={() => setDashOpen(false)}
          className="absolute inset-0 top-7 z-[9850] bg-black/80 backdrop-blur-2xl flex flex-col items-center p-6 text-white animate-window"
        >
          <div className="w-full max-w-md flex items-center gap-3 px-4 py-2.5 bg-[#282828] border border-[#3c3c3c] rounded-full mb-8 text-xs">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Type to search..."
              className="flex-1 bg-transparent border-none outline-none text-white text-xs placeholder-slate-400 font-normal"
            />
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-6 max-w-2xl">
            {DOCK_APPS.map(app => (
              <button
                key={app.id}
                onClick={() => launchApp(app.id)}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/10 transition-all group"
              >
                <div className="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <app.icon className="w-12 h-12" />
                </div>
                <span className="text-xs font-medium text-slate-200">{app.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          className="absolute z-[9950] w-52 bg-[#282828] border border-[#3c3c3c] rounded-xl p-1.5 shadow-2xl text-xs text-white space-y-0.5 animate-window"
        >
          <button
            onClick={() => { launchApp('terminal'); setContextMenu(null); }}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#E95420] text-left"
          >
            <UbuntuTerminalIcon className="w-4 h-4" />
            <span>Open in Terminal</span>
          </button>
          <button
            onClick={() => { launchApp('files'); setContextMenu(null); }}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#E95420] text-left"
          >
            <UbuntuFilesIcon className="w-4 h-4" />
            <span>Open Files</span>
          </button>
          <button
            onClick={() => { launchApp('settings'); setContextMenu(null); }}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#E95420] text-left"
          >
            <WindowsSettingsIcon className="w-4 h-4" />
            <span>Change Background...</span>
          </button>
        </div>
      )}
    </div>
  );
};

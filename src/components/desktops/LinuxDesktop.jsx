// Ubuntu Linux 24.04 Desktop Environment Simulator (GNOME)
import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Folder, 
  Settings, 
  FileText, 
  Calculator, 
  Globe, 
  Wifi, 
  Volume2, 
  Power, 
  Home, 
  Trash2, 
  LayoutGrid,
  RotateCw,
  Compass,
  Plus
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

export const LinuxDesktop = () => {
  const { openWindow, windows, wallpapers, setMode, switchOS } = useOS();
  const { markOSExplored } = useLearner();

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
    audioService.playClick();
    if (appId === 'terminal') {
      openWindow({
        id: 'ubuntu-term',
        title: 'student@sarlayash-ubuntu:~ (bash)',
        icon: Terminal,
        component: TerminalApp,
        defaultWidth: 640,
        defaultHeight: 420
      });
    } else if (appId === 'files') {
      openWindow({
        id: 'ubuntu-files',
        title: 'Files (Nautilus)',
        icon: Folder,
        component: FileExplorerApp,
        defaultWidth: 720,
        defaultHeight: 460
      });
    } else if (appId === 'settings') {
      openWindow({
        id: 'ubuntu-settings',
        title: 'Settings (GNOME Control Center)',
        icon: Settings,
        component: SettingsApp,
        defaultWidth: 680,
        defaultHeight: 460
      });
    } else if (appId === 'gedit') {
      openWindow({
        id: 'ubuntu-gedit',
        title: 'Text Editor (Gedit)',
        icon: FileText,
        component: TextEditorApp,
        defaultWidth: 540,
        defaultHeight: 380
      });
    } else if (appId === 'calc') {
      openWindow({
        id: 'ubuntu-calc',
        title: 'Calculator',
        icon: Calculator,
        component: CalculatorApp,
        defaultWidth: 320,
        defaultHeight: 440
      });
    } else if (appId === 'browser') {
      openWindow({
        id: 'ubuntu-firefox',
        title: 'Firefox Web Browser',
        icon: Globe,
        component: BrowserApp,
        defaultWidth: 740,
        defaultHeight: 480
      });
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    const x = Math.min(e.clientX, window.innerWidth - 180);
    const y = Math.min(e.clientY, window.innerHeight - 200);
    setContextMenu({ x, y });
  };

  const closeMenus = () => {
    if (dashOpen) setDashOpen(false);
    if (powerMenuOpen) setPowerMenuOpen(false);
    if (contextMenu) setContextMenu(null);
  };

  return (
    <div
      onClick={closeMenus}
      onContextMenu={handleContextMenu}
      className={`relative w-full h-full select-none overflow-hidden ${wallpapers.linux || 'ubuntu-gradient'}`}
    >
      {/* GNOME Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-black/80 backdrop-blur-xl border-b border-black/40 flex items-center justify-between px-3 z-[9800] text-xs text-slate-200">
        {/* Left: Activities button */}
        <button
          onClick={(e) => { e.stopPropagation(); setDashOpen(!dashOpen); }}
          className="px-2.5 py-0.5 rounded-full hover:bg-white/10 font-medium transition-colors"
        >
          Activities
        </button>

        {/* Center: Clock */}
        <div className="font-semibold text-white cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded-full">
          {new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })} {currentTime}
        </div>

        {/* Right: Status Pill & Power Dropdown */}
        <div className="relative">
          <div
            onClick={(e) => { e.stopPropagation(); setPowerMenuOpen(!powerMenuOpen); }}
            className="flex items-center gap-2 px-2.5 py-0.5 rounded-full hover:bg-white/10 cursor-pointer font-medium"
          >
            <Wifi className="w-3.5 h-3.5" />
            <Volume2 className="w-3.5 h-3.5" />
            <Power className="w-3.5 h-3.5 text-orange-400" />
          </div>

          {powerMenuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-8 w-52 bg-slate-900/95 border border-slate-700/80 rounded-2xl p-2 shadow-2xl backdrop-blur-xl space-y-1 text-xs text-slate-200 animate-window z-[9900]"
            >
              <div className="px-3 py-2 border-b border-slate-800 font-semibold text-white">
                SarlaYash Ubuntu Lab
              </div>
              <button
                onClick={() => setMode('hub')}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-orange-600/30 text-left text-slate-300 hover:text-white"
              >
                <Compass className="w-4 h-4 text-orange-400" />
                <span>Return to Lab Hub</span>
              </button>
              <button
                onClick={() => switchOS('linux', 'installer')}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-orange-600/30 text-left text-slate-300 hover:text-white"
              >
                <RotateCw className="w-4 h-4 text-orange-400" />
                <span>Re-install Ubuntu</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Ubuntu Left Dock */}
      <div className="absolute top-8 left-0 bottom-0 w-14 bg-black/60 backdrop-blur-xl border-r border-white/5 flex flex-col items-center py-3 gap-2.5 z-[9700]">
        <button
          onClick={() => launchApp('files')}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative ${
            windows.some(w => w.id === 'ubuntu-files') ? 'bg-orange-600/30 ring-1 ring-orange-500' : 'hover:bg-white/10'
          }`}
          title="Files"
        >
          <Folder className="w-5 h-5 text-amber-400" />
          {windows.some(w => w.id === 'ubuntu-files') && (
            <div className="absolute left-0.5 top-1/2 -translate-y-1/2 w-1 h-2 bg-orange-400 rounded-r" />
          )}
        </button>

        <button
          onClick={() => launchApp('terminal')}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative ${
            windows.some(w => w.id === 'ubuntu-term') ? 'bg-orange-600/30 ring-1 ring-orange-500' : 'hover:bg-white/10'
          }`}
          title="Terminal (bash)"
        >
          <Terminal className="w-5 h-5 text-emerald-400" />
          {windows.some(w => w.id === 'ubuntu-term') && (
            <div className="absolute left-0.5 top-1/2 -translate-y-1/2 w-1 h-2 bg-orange-400 rounded-r" />
          )}
        </button>

        <button
          onClick={() => launchApp('browser')}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative ${
            windows.some(w => w.id === 'ubuntu-firefox') ? 'bg-orange-600/30 ring-1 ring-orange-500' : 'hover:bg-white/10'
          }`}
          title="Firefox"
        >
          <Globe className="w-5 h-5 text-orange-400" />
          {windows.some(w => w.id === 'ubuntu-firefox') && (
            <div className="absolute left-0.5 top-1/2 -translate-y-1/2 w-1 h-2 bg-orange-400 rounded-r" />
          )}
        </button>

        <button
          onClick={() => launchApp('gedit')}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative ${
            windows.some(w => w.id === 'ubuntu-gedit') ? 'bg-orange-600/30 ring-1 ring-orange-500' : 'hover:bg-white/10'
          }`}
          title="Text Editor"
        >
          <FileText className="w-5 h-5 text-blue-400" />
          {windows.some(w => w.id === 'ubuntu-gedit') && (
            <div className="absolute left-0.5 top-1/2 -translate-y-1/2 w-1 h-2 bg-orange-400 rounded-r" />
          )}
        </button>

        <button
          onClick={() => launchApp('settings')}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative ${
            windows.some(w => w.id === 'ubuntu-settings') ? 'bg-orange-600/30 ring-1 ring-orange-500' : 'hover:bg-white/10'
          }`}
          title="Settings"
        >
          <Settings className="w-5 h-5 text-slate-300" />
          {windows.some(w => w.id === 'ubuntu-settings') && (
            <div className="absolute left-0.5 top-1/2 -translate-y-1/2 w-1 h-2 bg-orange-400 rounded-r" />
          )}
        </button>

        {/* Bottom App Grid */}
        <div className="mt-auto">
          <button
            onClick={() => setDashOpen(!dashOpen)}
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white"
            title="Show Applications"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-12 left-18 space-y-3 z-10">
        <div
          onClick={() => launchApp('files')}
          className="w-20 p-2 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/10 transition-colors group"
        >
          <Home className="w-10 h-10 text-orange-400 drop-shadow-md group-hover:scale-105 transition-transform" />
          <span className="text-[11px] font-semibold text-white drop-shadow mt-1">Home</span>
        </div>
        <div
          onClick={() => launchApp('files')}
          className="w-20 p-2 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/10 transition-colors group"
        >
          <Trash2 className="w-10 h-10 text-slate-400 drop-shadow-md group-hover:scale-105 transition-transform" />
          <span className="text-[11px] font-semibold text-white drop-shadow mt-1">Trash</span>
        </div>
      </div>

      {/* GNOME Activities / App Dash Overlay */}
      {dashOpen && (
        <div
          onClick={() => setDashOpen(false)}
          className="absolute inset-0 top-8 z-[9850] bg-slate-950/85 backdrop-blur-2xl flex flex-col items-center p-6 text-white animate-window"
        >
          <h2 className="text-xl font-bold mb-6">Ubuntu Applications</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 max-w-2xl">
            <button onClick={() => launchApp('terminal')} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/10">
              <Terminal className="w-12 h-12 text-emerald-400" />
              <span className="text-xs">Terminal</span>
            </button>
            <button onClick={() => launchApp('files')} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/10">
              <Folder className="w-12 h-12 text-amber-400" />
              <span className="text-xs">Files</span>
            </button>
            <button onClick={() => launchApp('browser')} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/10">
              <Globe className="w-12 h-12 text-orange-400" />
              <span className="text-xs">Firefox</span>
            </button>
            <button onClick={() => launchApp('gedit')} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/10">
              <FileText className="w-12 h-12 text-blue-400" />
              <span className="text-xs">Text Editor</span>
            </button>
            <button onClick={() => launchApp('calc')} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/10">
              <Calculator className="w-12 h-12 text-teal-400" />
              <span className="text-xs">Calculator</span>
            </button>
            <button onClick={() => launchApp('settings')} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/10">
              <Settings className="w-12 h-12 text-slate-300" />
              <span className="text-xs">Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Right-click Context Menu */}
      {contextMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          className="absolute z-[9950] w-48 bg-slate-900/95 border border-slate-700/80 rounded-xl p-1.5 shadow-2xl backdrop-blur-xl text-xs text-slate-200 space-y-0.5 animate-window"
        >
          <button
            onClick={() => { launchApp('terminal'); setContextMenu(null); }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-orange-600 hover:text-white text-left"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Open in Terminal</span>
          </button>
          <button
            onClick={() => { launchApp('files'); setContextMenu(null); }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-orange-600 hover:text-white text-left"
          >
            <Folder className="w-3.5 h-3.5" />
            <span>Open Files</span>
          </button>
          <button
            onClick={() => { launchApp('settings'); setContextMenu(null); }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-orange-600 hover:text-white text-left"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Change Background</span>
          </button>
        </div>
      )}
    </div>
  );
};

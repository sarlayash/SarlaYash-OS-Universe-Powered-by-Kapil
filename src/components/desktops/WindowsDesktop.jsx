// Windows 11 Desktop Environment Simulator
import React, { useState, useEffect } from 'react';
import { 
  Laptop, 
  Terminal, 
  Folder, 
  Settings, 
  FileText, 
  Calculator, 
  Globe, 
  Search, 
  Power, 
  RotateCw, 
  Wifi, 
  Volume2, 
  Battery, 
  Check, 
  User,
  Plus,
  Compass
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

export const WindowsDesktop = () => {
  const { openWindow, windows, activeWindowId, wallpapers, setMode, switchOS } = useOS();
  const { learnerName, markOSExplored, triggerChallengeEvent } = useLearner();

  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null); // { x, y }
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    markOSExplored('windows');
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const launchApp = (appId) => {
    setStartMenuOpen(false);
    audioService.playClick();
    if (appId === 'terminal') {
      openWindow({
        id: 'win-cmd',
        title: 'Command Prompt (Administrator)',
        icon: Terminal,
        component: TerminalApp,
        defaultWidth: 640,
        defaultHeight: 420
      });
    } else if (appId === 'explorer') {
      openWindow({
        id: 'win-explorer',
        title: 'File Explorer',
        icon: Folder,
        component: FileExplorerApp,
        defaultWidth: 720,
        defaultHeight: 460
      });
    } else if (appId === 'settings') {
      openWindow({
        id: 'win-settings',
        title: 'Settings',
        icon: Settings,
        component: SettingsApp,
        defaultWidth: 680,
        defaultHeight: 460
      });
    } else if (appId === 'notepad') {
      openWindow({
        id: 'win-notepad',
        title: 'Notepad',
        icon: FileText,
        component: TextEditorApp,
        defaultWidth: 540,
        defaultHeight: 380
      });
    } else if (appId === 'calc') {
      openWindow({
        id: 'win-calc',
        title: 'Calculator',
        icon: Calculator,
        component: CalculatorApp,
        defaultWidth: 320,
        defaultHeight: 440
      });
    } else if (appId === 'browser') {
      openWindow({
        id: 'win-edge',
        title: 'Microsoft Edge',
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
    if (startMenuOpen) setStartMenuOpen(false);
    if (contextMenu) setContextMenu(null);
  };

  const DESKTOP_ICONS = [
    { id: 'explorer', name: 'This PC', icon: Laptop },
    { id: 'terminal', name: 'CMD Prompt', icon: Terminal },
    { id: 'browser', name: 'Microsoft Edge', icon: Globe },
    { id: 'notepad', name: 'Notepad', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'calc', name: 'Calculator', icon: Calculator }
  ];

  return (
    <div
      onClick={closeMenus}
      onContextMenu={handleContextMenu}
      className={`relative w-full h-full select-none overflow-hidden ${wallpapers.windows || 'win11-gradient'}`}
    >
      {/* Desktop Icons Grid */}
      <div className="absolute top-4 left-4 grid grid-flow-col grid-rows-6 gap-3 z-10">
        {DESKTOP_ICONS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={(e) => { e.stopPropagation(); launchApp(item.id); }}
              className="w-20 p-2 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/10 active:bg-blue-500/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Icon className="w-6 h-6 text-blue-400 group-hover:text-white" />
              </div>
              <span className="text-[11px] font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] truncate w-full mt-1.5">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Windows 11 Start Menu Popover */}
      {startMenuOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-14 left-1/2 -translate-x-1/2 z-[9900] w-full max-w-md bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-2xl backdrop-blur-2xl text-white animate-window"
        >
          {/* Search Bar */}
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-950/70 border border-slate-700/70 rounded-xl mb-4 text-xs">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Type here to search apps, files and settings..."
              className="flex-1 bg-transparent border-none outline-none text-white text-xs placeholder-slate-500"
            />
          </div>

          {/* Pinned Apps Grid */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2.5">
              <span>Pinned</span>
              <span className="text-blue-400 cursor-pointer">All apps &gt;</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {DESKTOP_ICONS.map((app) => {
                const Icon = app.icon;
                return (
                  <button
                    key={app.id}
                    onClick={() => launchApp(app.id)}
                    className="p-2.5 rounded-xl hover:bg-white/10 flex flex-col items-center justify-center text-center transition-colors"
                  >
                    <Icon className="w-6 h-6 text-blue-400 mb-1" />
                    <span className="text-[11px] truncate w-full">{app.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recommended Section */}
          <div className="border-t border-slate-800 pt-3 mb-4">
            <div className="text-xs font-bold text-slate-400 mb-2">Recommended for Student</div>
            <div
              onClick={() => launchApp('explorer')}
              className="p-2 rounded-xl hover:bg-white/10 flex items-center gap-3 cursor-pointer text-xs"
            >
              <Folder className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="truncate">
                <div className="font-semibold text-slate-200">Welcome_Windows.txt</div>
                <div className="text-[10px] text-slate-500">Desktop • Just now</div>
              </div>
            </div>
          </div>

          {/* User Account & Power Bar */}
          <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                {(learnerName || 'S')[0]}
              </div>
              <span className="font-semibold text-white truncate max-w-[150px]">{learnerName || 'Student'}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMode('hub')}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
                title="Return to Lab Hub"
              >
                <Compass className="w-4 h-4" />
              </button>
              <button
                onClick={() => switchOS('windows', 'installer')}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
                title="Re-run Installation Wizard"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Right-Click Desktop Context Menu */}
      {contextMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          className="absolute z-[9950] w-48 bg-slate-900/95 border border-slate-700/80 rounded-xl p-1.5 shadow-2xl backdrop-blur-xl text-xs text-slate-200 space-y-0.5 animate-window"
        >
          <button
            onClick={() => { launchApp('explorer'); setContextMenu(null); }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white text-left"
          >
            <Folder className="w-3.5 h-3.5" />
            <span>Open File Explorer</span>
          </button>
          <button
            onClick={() => { launchApp('terminal'); setContextMenu(null); }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white text-left"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Open in Terminal</span>
          </button>
          <button
            onClick={() => { launchApp('notepad'); setContextMenu(null); }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white text-left"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Text Document</span>
          </button>
          <div className="border-t border-slate-800 my-1" />
          <button
            onClick={() => { launchApp('settings'); setContextMenu(null); }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white text-left"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Personalize</span>
          </button>
        </div>
      )}

      {/* Windows 11 Centered Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-slate-950/80 backdrop-blur-2xl border-t border-white/10 flex items-center justify-between px-3 z-[9800]">
        {/* Left spacer for symmetry */}
        <div className="w-16 hidden sm:block">
          <span className="text-[11px] font-mono text-slate-500">Windows 11</span>
        </div>

        {/* Centered Taskbar Icons */}
        <div className="flex items-center gap-1.5 mx-auto">
          {/* Start Button */}
          <button
            onClick={(e) => { e.stopPropagation(); setStartMenuOpen(!startMenuOpen); audioService.playClick(); }}
            className={`p-2 rounded-xl transition-all ${
              startMenuOpen ? 'bg-blue-600/30 text-blue-400' : 'hover:bg-white/10 text-blue-400'
            }`}
            title="Start"
          >
            <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
              <div className="bg-blue-400 rounded-[1px]" />
              <div className="bg-blue-400 rounded-[1px]" />
              <div className="bg-blue-400 rounded-[1px]" />
              <div className="bg-blue-400 rounded-[1px]" />
            </div>
          </button>

          {/* Quick Search */}
          <button
            onClick={() => setStartMenuOpen(true)}
            className="p-2 rounded-xl hover:bg-white/10 text-slate-300"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Pinned / Open Apps */}
          <button
            onClick={() => launchApp('explorer')}
            className={`p-2 rounded-xl transition-all relative ${
              windows.some(w => w.id === 'win-explorer') ? 'bg-white/15' : 'hover:bg-white/10'
            }`}
            title="File Explorer"
          >
            <Folder className="w-4 h-4 text-amber-400" />
            {windows.some(w => w.id === 'win-explorer') && (
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-blue-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => launchApp('terminal')}
            className={`p-2 rounded-xl transition-all relative ${
              windows.some(w => w.id === 'win-cmd') ? 'bg-white/15' : 'hover:bg-white/10'
            }`}
            title="Command Prompt"
          >
            <Terminal className="w-4 h-4 text-blue-400" />
            {windows.some(w => w.id === 'win-cmd') && (
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-blue-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => launchApp('browser')}
            className={`p-2 rounded-xl transition-all relative ${
              windows.some(w => w.id === 'win-edge') ? 'bg-white/15' : 'hover:bg-white/10'
            }`}
            title="Microsoft Edge"
          >
            <Globe className="w-4 h-4 text-teal-400" />
            {windows.some(w => w.id === 'win-edge') && (
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-blue-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => launchApp('settings')}
            className={`p-2 rounded-xl transition-all relative ${
              windows.some(w => w.id === 'win-settings') ? 'bg-white/15' : 'hover:bg-white/10'
            }`}
            title="Settings"
          >
            <Settings className="w-4 h-4 text-slate-300" />
            {windows.some(w => w.id === 'win-settings') && (
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-blue-400 rounded-full" />
            )}
          </button>
        </div>

        {/* System Tray (Right) */}
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-white/10 cursor-pointer">
            <Wifi className="w-3.5 h-3.5" />
            <Volume2 className="w-3.5 h-3.5" />
            <Battery className="w-3.5 h-3.5" />
          </div>
          <div className="text-right px-2 py-0.5 rounded-lg hover:bg-white/10 cursor-pointer font-medium text-[11px]">
            <div>{currentTime}</div>
            <div className="text-[10px] text-slate-400">{new Date().toLocaleDateString([], { month: 'numeric', day: 'numeric', year: '2-digit' })}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

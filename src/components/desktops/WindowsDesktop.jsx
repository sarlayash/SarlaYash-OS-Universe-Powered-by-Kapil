// Authentic Windows 11 Desktop Environment Simulator
// Built according to real Windows 11 visual patterns, Mica acrylic, and UI layout

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Power, 
  RotateCw, 
  Wifi, 
  Volume2, 
  Battery, 
  ChevronUp, 
  Compass, 
  Plus, 
  Grid, 
  Check, 
  Moon, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { useLearner } from '../../context/LearnerContext';
import { 
  Windows11Logo, 
  WindowsExplorerIcon, 
  WindowsEdgeIcon, 
  WindowsCmdIcon, 
  WindowsSettingsIcon, 
  WindowsNotepadIcon, 
  WindowsStoreIcon 
} from '../icons/OSIcons';

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
  const [powerMenuOpen, setPowerMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
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
    setPowerMenuOpen(false);
    audioService.playClick();

    if (appId === 'cmd') {
      openWindow({
        id: 'win-cmd',
        title: 'Command Prompt (Administrator: C:\\Windows\\System32\\cmd.exe)',
        icon: WindowsCmdIcon,
        component: TerminalApp,
        defaultWidth: 680,
        defaultHeight: 440
      });
    } else if (appId === 'explorer') {
      openWindow({
        id: 'win-explorer',
        title: 'File Explorer',
        icon: WindowsExplorerIcon,
        component: FileExplorerApp,
        defaultWidth: 760,
        defaultHeight: 480
      });
    } else if (appId === 'settings') {
      openWindow({
        id: 'win-settings',
        title: 'Settings',
        icon: WindowsSettingsIcon,
        component: SettingsApp,
        defaultWidth: 720,
        defaultHeight: 480
      });
    } else if (appId === 'notepad') {
      openWindow({
        id: 'win-notepad',
        title: 'Notepad',
        icon: WindowsNotepadIcon,
        component: TextEditorApp,
        defaultWidth: 560,
        defaultHeight: 400
      });
    } else if (appId === 'calc') {
      openWindow({
        id: 'win-calc',
        title: 'Calculator',
        icon: CalculatorApp,
        component: CalculatorApp,
        defaultWidth: 320,
        defaultHeight: 460
      });
    } else if (appId === 'edge') {
      openWindow({
        id: 'win-edge',
        title: 'Microsoft Edge',
        icon: WindowsEdgeIcon,
        component: BrowserApp,
        defaultWidth: 760,
        defaultHeight: 500
      });
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    const x = Math.min(e.clientX, window.innerWidth - 200);
    const y = Math.min(e.clientY, window.innerHeight - 220);
    setContextMenu({ x, y });
  };

  const closeMenus = () => {
    if (startMenuOpen) setStartMenuOpen(false);
    if (powerMenuOpen) setPowerMenuOpen(false);
    if (contextMenu) setContextMenu(null);
  };

  // Real Windows 11 Pinned Apps
  const PINNED_APPS = [
    { id: 'edge', name: 'Microsoft Edge', icon: WindowsEdgeIcon },
    { id: 'explorer', name: 'File Explorer', icon: WindowsExplorerIcon },
    { id: 'cmd', name: 'Command Prompt', icon: WindowsCmdIcon },
    { id: 'settings', name: 'Settings', icon: WindowsSettingsIcon },
    { id: 'notepad', name: 'Notepad', icon: WindowsNotepadIcon },
    { id: 'calc', name: 'Calculator', icon: WindowsCmdIcon },
    { id: 'store', name: 'Microsoft Store', icon: WindowsStoreIcon }
  ];

  const DESKTOP_ICONS = [
    { id: 'explorer', name: 'This PC', icon: WindowsExplorerIcon },
    { id: 'cmd', name: 'CMD Prompt', icon: WindowsCmdIcon },
    { id: 'edge', name: 'Microsoft Edge', icon: WindowsEdgeIcon },
    { id: 'notepad', name: 'Notepad', icon: WindowsNotepadIcon },
    { id: 'settings', name: 'Settings', icon: WindowsSettingsIcon }
  ];

  return (
    <div
      onClick={closeMenus}
      onContextMenu={handleContextMenu}
      className={`relative w-full h-full select-none overflow-hidden ${wallpapers.windows || 'win11-bloom-dark'}`}
    >
      {/* Desktop Icons Grid */}
      <div className="absolute top-4 left-4 grid grid-flow-col grid-rows-6 gap-3 z-10">
        {DESKTOP_ICONS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={(e) => { e.stopPropagation(); launchApp(item.id); }}
              className="w-20 p-2 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/10 active:bg-blue-600/30 transition-all group"
            >
              <div className="w-12 h-12 flex items-center justify-center drop-shadow-md group-hover:scale-105 transition-transform">
                <Icon className="w-10 h-10" />
              </div>
              <span className="text-[11px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] truncate w-full mt-1">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Windows 11 Authentic Start Menu Popover */}
      {startMenuOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-14 left-1/2 -translate-x-1/2 z-[9900] w-full max-w-[560px] win11-mica rounded-2xl p-6 shadow-2xl text-white animate-window"
        >
          {/* Top Search Bar */}
          <div className="flex items-center gap-2.5 px-3.5 py-2 bg-[#1b1c20] border border-white/10 rounded-full mb-6 text-xs shadow-inner">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Type here to search"
              className="flex-1 bg-transparent border-none outline-none text-white text-xs placeholder-slate-400 font-normal"
            />
          </div>

          {/* Pinned Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-3 px-1">
              <span>Pinned</span>
              <button className="text-[11px] px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center gap-1">
                <span>All apps</span>
                <span>&gt;</span>
              </button>
            </div>

            <div className="grid grid-cols-6 gap-3">
              {PINNED_APPS.map((app) => {
                const Icon = app.icon;
                return (
                  <button
                    key={app.id}
                    onClick={() => launchApp(app.id)}
                    className="p-2 rounded-xl hover:bg-white/10 flex flex-col items-center justify-center text-center transition-all group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8" />
                    </div>
                    <span className="text-[11px] text-slate-200 truncate w-full">{app.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recommended Section */}
          <div className="border-t border-white/10 pt-4 mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-3 px-1">
              <span>Recommended</span>
              <button className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1">
                <span>More &gt;</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div
                onClick={() => launchApp('explorer')}
                className="p-2 rounded-xl hover:bg-white/10 flex items-center gap-3 cursor-pointer text-xs transition-colors"
              >
                <WindowsExplorerIcon className="w-6 h-6 shrink-0" />
                <div className="truncate">
                  <div className="font-medium text-slate-200 truncate">Welcome_Windows.txt</div>
                  <div className="text-[10px] text-slate-400">Desktop • Just now</div>
                </div>
              </div>

              <div
                onClick={() => launchApp('cmd')}
                className="p-2 rounded-xl hover:bg-white/10 flex items-center gap-3 cursor-pointer text-xs transition-colors"
              >
                <WindowsCmdIcon className="w-6 h-6 shrink-0" />
                <div className="truncate">
                  <div className="font-medium text-slate-200 truncate">Command Prompt</div>
                  <div className="text-[10px] text-slate-400">Recently used</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Account & Power Bar */}
          <div className="border-t border-white/10 pt-3 flex items-center justify-between text-xs relative">
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-white/10 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                {(learnerName || 'S')[0]}
              </div>
              <div className="text-left">
                <div className="font-semibold text-white truncate max-w-[160px]">{learnerName || 'Student'}</div>
                <div className="text-[10px] text-slate-400">Administrator</div>
              </div>
            </div>

            {/* Power Button & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPowerMenuOpen(!powerMenuOpen)}
                className="p-2.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="Power"
              >
                <Power className="w-4 h-4" />
              </button>

              {powerMenuOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 bottom-12 w-44 win11-mica rounded-xl p-1.5 shadow-2xl text-xs space-y-1 z-[9950] animate-window"
                >
                  <button
                    onClick={() => { setMode('hub'); setPowerMenuOpen(false); setStartMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 text-left text-slate-200"
                  >
                    <Compass className="w-3.5 h-3.5 text-blue-400" />
                    <span>Return to Hub</span>
                  </button>
                  <button
                    onClick={() => { switchOS('windows', 'installer'); setPowerMenuOpen(false); setStartMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 text-left text-slate-200"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-blue-400" />
                    <span>Restart Installer</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Context Menu */}
      {contextMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          className="absolute z-[9950] w-52 win11-mica rounded-xl p-1.5 shadow-2xl text-xs text-slate-200 space-y-0.5 animate-window"
        >
          <button
            onClick={() => { launchApp('explorer'); setContextMenu(null); }}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white text-left"
          >
            <WindowsExplorerIcon className="w-4 h-4" />
            <span>Open File Explorer</span>
          </button>
          <button
            onClick={() => { launchApp('cmd'); setContextMenu(null); }}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white text-left"
          >
            <WindowsCmdIcon className="w-4 h-4" />
            <span>Open in Terminal</span>
          </button>
          <button
            onClick={() => { launchApp('notepad'); setContextMenu(null); }}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white text-left"
          >
            <Plus className="w-4 h-4" />
            <span>New Text Document</span>
          </button>
          <div className="border-t border-white/10 my-1" />
          <button
            onClick={() => { launchApp('settings'); setContextMenu(null); }}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white text-left"
          >
            <WindowsSettingsIcon className="w-4 h-4" />
            <span>Personalize</span>
          </button>
        </div>
      )}

      {/* Windows 11 Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 win11-taskbar flex items-center justify-between px-3 z-[9800]">
        {/* Left space for widgets */}
        <div className="w-16 hidden sm:flex items-center gap-2">
          <div className="px-2 py-1 rounded hover:bg-white/10 cursor-pointer text-[11px] font-medium text-slate-300">
            ☀️ 24°C
          </div>
        </div>

        {/* Centered App Icons */}
        <div className="flex items-center gap-1.5 mx-auto">
          {/* Windows Start Button */}
          <button
            onClick={(e) => { e.stopPropagation(); setStartMenuOpen(!startMenuOpen); audioService.playClick(); }}
            className={`p-2 rounded-lg transition-all ${
              startMenuOpen ? 'bg-white/15 shadow-inner' : 'hover:bg-white/10 active:scale-95'
            }`}
            title="Start"
          >
            <Windows11Logo className="w-5 h-5" />
          </button>

          {/* Search Icon */}
          <button
            onClick={() => setStartMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-white/10 text-slate-300"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Taskbar Icons */}
          <button
            onClick={() => launchApp('explorer')}
            className={`p-2 rounded-lg transition-all relative ${
              windows.some(w => w.id === 'win-explorer') ? 'bg-white/15' : 'hover:bg-white/10'
            }`}
            title="File Explorer"
          >
            <WindowsExplorerIcon className="w-5 h-5" />
            {windows.some(w => w.id === 'win-explorer') && (
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-blue-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => launchApp('edge')}
            className={`p-2 rounded-lg transition-all relative ${
              windows.some(w => w.id === 'win-edge') ? 'bg-white/15' : 'hover:bg-white/10'
            }`}
            title="Microsoft Edge"
          >
            <WindowsEdgeIcon className="w-5 h-5" />
            {windows.some(w => w.id === 'win-edge') && (
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-blue-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => launchApp('cmd')}
            className={`p-2 rounded-lg transition-all relative ${
              windows.some(w => w.id === 'win-cmd') ? 'bg-white/15' : 'hover:bg-white/10'
            }`}
            title="Command Prompt"
          >
            <WindowsCmdIcon className="w-5 h-5" />
            {windows.some(w => w.id === 'win-cmd') && (
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-blue-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => launchApp('settings')}
            className={`p-2 rounded-lg transition-all relative ${
              windows.some(w => w.id === 'win-settings') ? 'bg-white/15' : 'hover:bg-white/10'
            }`}
            title="Settings"
          >
            <WindowsSettingsIcon className="w-5 h-5" />
            {windows.some(w => w.id === 'win-settings') && (
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-blue-400 rounded-full" />
            )}
          </button>
        </div>

        {/* Right System Tray */}
        <div className="flex items-center gap-1 text-xs text-slate-300">
          <div className="p-1 rounded hover:bg-white/10 cursor-pointer">
            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/10 cursor-pointer">
            <Wifi className="w-3.5 h-3.5" />
            <Volume2 className="w-3.5 h-3.5" />
            <Battery className="w-3.5 h-3.5" />
          </div>

          <div className="text-right px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer font-normal text-[11px] leading-tight">
            <div>{currentTime}</div>
            <div className="text-[10px] text-slate-400">{new Date().toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

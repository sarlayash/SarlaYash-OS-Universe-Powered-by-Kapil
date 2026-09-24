// OS Environment & Window Management Context
import React, { createContext, useContext, useState, useEffect } from 'react';
import { audioService } from '../services/audioService';

const OSContext = createContext(null);

export const OSProvider = ({ children }) => {
  const [activeOS, setActiveOS] = useState('windows'); // 'windows' | 'linux' | 'macos' | 'chrome'
  const [mode, setMode] = useState('hub'); // 'hub' | 'installer' | 'desktop'
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [soundMuted, setSoundMuted] = useState(false);

  // Mobile accessibility controls
  const [mobileControls, setMobileControls] = useState({
    showTrackpad: false,
    showKeyboard: false,
    pointerPos: { x: window.innerWidth ? Math.floor(window.innerWidth / 2) : 200, y: 300 }
  });

  // System wallpapers & themes
  const [wallpapers, setWallpapers] = useState({
    windows: 'bloom-dark',
    linux: 'noble-canonical',
    macos: 'sonoma-horizon',
    chrome: 'chrome-material'
  });

  // Play startup sound on OS desktop launch
  const playOSBootChime = (os) => {
    if (soundMuted) return;
    if (os === 'windows') audioService.playWindowsBoot();
    else if (os === 'linux') audioService.playLinuxBoot();
    else if (os === 'macos') audioService.playMacBoot();
    else if (os === 'chrome') audioService.playChromeBoot();
  };

  const switchOS = (os, newMode = 'desktop') => {
    setActiveOS(os);
    setMode(newMode);
    setWindows([]);
    setActiveWindowId(null);
    if (newMode === 'desktop') {
      setTimeout(() => playOSBootChime(os), 300);
    }
  };

  const toggleSound = () => {
    const isMuted = audioService.toggleMute();
    setSoundMuted(isMuted);
  };

  const toggleTrackpad = () => {
    setMobileControls(prev => ({ ...prev, showTrackpad: !prev.showTrackpad }));
    audioService.playClick();
  };

  const toggleKeyboard = () => {
    setMobileControls(prev => ({ ...prev, showKeyboard: !prev.showKeyboard }));
    audioService.playClick();
  };

  const updatePointerPos = (dx, dy) => {
    setMobileControls(prev => ({
      ...prev,
      pointerPos: {
        x: Math.max(10, Math.min(window.innerWidth - 10, prev.pointerPos.x + dx)),
        y: Math.max(10, Math.min(window.innerHeight - 10, prev.pointerPos.y + dy))
      }
    }));
  };

  // Window Manager Actions
  const openWindow = ({ id, title, icon, component, defaultWidth, defaultHeight, props = {} }) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === id);
      if (existing) {
        // Bring to front and un-minimize
        setActiveWindowId(id);
        return prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: Math.max(...prev.map(p => p.zIndex || 1), 1) + 1 } : w);
      }

      // Responsive positioning for mobile & desktop
      const isMobile = window.innerWidth <= 640;
      const isTablet = window.innerWidth > 640 && window.innerWidth <= 1024;

      const wWidth = isMobile ? window.innerWidth - 16 : (isTablet ? Math.min(680, window.innerWidth - 40) : (defaultWidth || 640));
      const wHeight = isMobile ? window.innerHeight - 120 : (isTablet ? Math.min(500, window.innerHeight - 120) : (defaultHeight || 440));
      const startX = isMobile ? 8 : Math.max(20, Math.min(window.innerWidth - wWidth - 20, 50 + prev.length * 28));
      const startY = isMobile ? 12 : Math.max(40, Math.min(window.innerHeight - wHeight - 60, 50 + prev.length * 28));

      const highestZ = prev.length > 0 ? Math.max(...prev.map(w => w.zIndex || 1)) : 10;
      const newWin = {
        id,
        title,
        icon,
        component,
        props,
        x: startX,
        y: startY,
        width: wWidth,
        height: wHeight,
        isMinimized: false,
        isMaximized: isMobile, // default maximized on small phone screens for optimal touch UX
        zIndex: highestZ + 1
      };

      setActiveWindowId(id);
      audioService.playClick();
      return [...prev, newWin];
    });
  };

  const closeWindow = (id) => {
    audioService.playClick();
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) {
      const remaining = windows.filter(w => w.id !== id);
      setActiveWindowId(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
    }
  };

  const minimizeWindow = (id) => {
    audioService.playClick();
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeWindowId === id) {
      const visible = windows.filter(w => w.id !== id && !w.isMinimized);
      setActiveWindowId(visible.length > 0 ? visible[visible.length - 1].id : null);
    }
  };

  const maximizeWindow = (id) => {
    audioService.playClick();
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
    bringToFront(id);
  };

  const bringToFront = (id) => {
    setActiveWindowId(id);
    setWindows(prev => {
      const maxZ = prev.length > 0 ? Math.max(...prev.map(w => w.zIndex || 1)) : 10;
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w);
    });
  };

  const updateWindowPos = (id, pos) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, ...pos } : w));
  };

  const setWallpaperForOS = (os, wp) => {
    setWallpapers(prev => ({ ...prev, [os]: wp }));
  };

  return (
    <OSContext.Provider
      value={{
        activeOS,
        mode,
        windows,
        activeWindowId,
        soundMuted,
        mobileControls,
        wallpapers,
        setMode,
        switchOS,
        toggleSound,
        toggleTrackpad,
        toggleKeyboard,
        updatePointerPos,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        bringToFront,
        updateWindowPos,
        setWallpaperForOS,
        playOSBootChime
      }}
    >
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) throw new Error('useOS must be used within OSProvider');
  return context;
};

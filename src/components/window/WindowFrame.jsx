// Universal OS Window Frame Component
// Dynamically styles title bar and window controls according to the active OS

import React, { useRef, useState, useEffect } from 'react';
import { Minus, Square, Copy, X } from 'lucide-react';
import { useOS } from '../../context/OSContext';

export const WindowFrame = ({ window: win }) => {
  const { activeOS, activeWindowId, bringToFront, closeWindow, minimizeWindow, maximizeWindow, updateWindowPos } = useOS();
  const isFocused = activeWindowId === win.id;

  const dragRef = useRef(null);
  const [dragState, setDragState] = useState(null);

  // Dragging support for both mouse and touch
  const handlePointerDown = (e) => {
    if (win.isMaximized) return;
    bringToFront(win.id);
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    setDragState({
      startX: clientX,
      startY: clientY,
      origX: win.x,
      origY: win.y
    });
  };

  useEffect(() => {
    if (!dragState) return;

    const handlePointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (!clientX || !clientY) return;

      const dx = clientX - dragState.startX;
      const dy = clientY - dragState.startY;

      const newX = Math.max(0, Math.min(window.innerWidth - 80, dragState.origX + dx));
      const newY = Math.max(0, Math.min(window.innerHeight - 80, dragState.origY + dy));

      updateWindowPos(win.id, { x: newX, y: newY });
    };

    const handlePointerUp = () => {
      setDragState(null);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [dragState, win.id, updateWindowPos]);

  if (win.isMinimized) return null;

  // Window frame styles per OS
  const getWindowStyling = () => {
    switch (activeOS) {
      case 'windows':
        return 'glass-win rounded-lg border border-slate-700/80 shadow-[0_12px_40px_rgba(0,0,0,0.6)] text-slate-100';
      case 'macos':
        return 'glass-mac rounded-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-slate-100';
      case 'chrome':
        return 'bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl text-slate-100';
      default:
        // Ubuntu Linux
        return 'bg-slate-900 border border-[#444] rounded-xl shadow-[0_15px_45px_rgba(0,0,0,0.7)] text-slate-100';
    }
  };

  const getTitlebarStyling = () => {
    switch (activeOS) {
      case 'windows':
        return 'h-9 px-3 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between select-none cursor-move';
      case 'macos':
        return 'h-10 px-4 bg-slate-900/70 border-b border-white/10 flex items-center justify-between select-none cursor-move';
      case 'chrome':
        return 'h-10 px-3 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between select-none cursor-move';
      default:
        // Ubuntu
        return 'h-9 px-3 bg-[#2c001e]/90 border-b border-slate-800 flex items-center justify-between select-none cursor-move';
    }
  };

  const Component = win.component;

  return (
    <div
      onMouseDown={() => bringToFront(win.id)}
      onTouchStart={() => bringToFront(win.id)}
      style={{
        zIndex: win.zIndex,
        ...(win.isMaximized
          ? {
              position: 'fixed',
              top: activeOS === 'linux' || activeOS === 'macos' ? '36px' : '0px',
              left: activeOS === 'linux' ? '56px' : '0px',
              right: '0px',
              bottom: activeOS === 'windows' || activeOS === 'chrome' ? '48px' : '0px',
              width: 'auto',
              height: 'auto',
              borderRadius: activeOS === 'macos' ? '12px' : '0px'
            }
          : {
              position: 'absolute',
              left: `${win.x}px`,
              top: `${win.y}px`,
              width: `${win.width}px`,
              height: `${win.height}px`
            })
      }}
      className={`flex flex-col overflow-hidden transition-shadow ${getWindowStyling()} ${
        isFocused ? 'ring-1 ring-blue-500/40 shadow-2xl' : 'opacity-95'
      }`}
    >
      {/* Title Bar */}
      <div
        ref={dragRef}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        onDoubleClick={() => maximizeWindow(win.id)}
        className={getTitlebarStyling()}
      >
        {/* macOS Traffic Lights on Left */}
        {activeOS === 'macos' && (
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
              className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 active:brightness-90 flex items-center justify-center group"
            >
              <X className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
              className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 active:brightness-90 flex items-center justify-center group"
            >
              <Minus className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }}
              className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-110 active:brightness-90 flex items-center justify-center group"
            >
              <Square className="w-1.5 h-1.5 text-black/60 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        )}

        {/* Title & App Icon */}
        <div className={`flex items-center gap-2 min-w-0 ${activeOS === 'macos' ? 'mx-auto' : ''}`}>
          {win.icon && <win.icon className="w-4 h-4 text-blue-400 shrink-0" />}
          <span className="text-xs font-semibold truncate text-slate-200">{win.title}</span>
        </div>

        {/* Windows / Linux / Chrome Controls on Right */}
        {activeOS !== 'macos' && (
          <div className="flex items-center">
            <button
              onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors"
              title="Minimize"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors"
              title={win.isMaximized ? 'Restore' : 'Maximize'}
            >
              {win.isMaximized ? <Copy className="w-3 h-3" /> : <Square className="w-3 h-3" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-red-600 rounded transition-colors"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* macOS right placeholder for balance */}
        {activeOS === 'macos' && <div className="w-12" />}
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-auto bg-slate-950/80 relative text-slate-200">
        {Component ? <Component window={win} {...(win.props || {})} /> : null}
      </div>
    </div>
  );
};

export const WindowManager = () => {
  const { windows } = useOS();
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="relative w-full h-full pointer-events-auto">
        {windows.map((win) => (
          <WindowFrame key={win.id} window={win} />
        ))}
      </div>
    </div>
  );
};

// Virtual Trackpad & Mouse Pointer for Mobile Phones
// Gives students with smartphones the full precision mouse experience

import React, { useRef, useState } from 'react';
import { MousePointer, X, Move } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { audioService } from '../../services/audioService';

export const VirtualTrackpad = () => {
  const { mobileControls, toggleTrackpad, updatePointerPos } = useOS();
  const lastTouchRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!mobileControls.showTrackpad) return null;

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e) => {
    if (!lastTouchRef.current) return;
    const touch = e.touches[0];
    const dx = (touch.clientX - lastTouchRef.current.x) * 1.5;
    const dy = (touch.clientY - lastTouchRef.current.y) * 1.5;
    lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
    updatePointerPos(dx, dy);
  };

  const handleTouchEnd = () => {
    lastTouchRef.current = null;
  };

  const triggerClickAtPointer = (type = 'click') => {
    audioService.playClick();
    const { x, y } = mobileControls.pointerPos;
    const el = document.elementFromPoint(x, y);
    if (!el) return;

    if (type === 'contextmenu') {
      el.dispatchEvent(new MouseEvent('contextmenu', { clientX: x, clientY: y, bubbles: true }));
    } else if (type === 'dblclick') {
      el.dispatchEvent(new MouseEvent('dblclick', { clientX: x, clientY: y, bubbles: true }));
    } else {
      el.dispatchEvent(new MouseEvent('mousedown', { clientX: x, clientY: y, bubbles: true }));
      el.dispatchEvent(new MouseEvent('mouseup', { clientX: x, clientY: y, bubbles: true }));
      el.dispatchEvent(new MouseEvent('click', { clientX: x, clientY: y, bubbles: true }));
      if (el.focus) el.focus();
    }
  };

  return (
    <>
      {/* Precision On-Screen Mouse Pointer */}
      <div
        className="fixed pointer-events-none z-[9995] transition-transform duration-75"
        style={{
          left: `${mobileControls.pointerPos.x}px`,
          top: `${mobileControls.pointerPos.y}px`,
          transform: 'translate(-2px, -2px)'
        }}
      >
        <div className="relative">
          <svg className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.428z" stroke="#000" strokeWidth="1.5" />
          </svg>
          <div className="absolute top-5 left-3 px-1.5 py-0.5 rounded bg-slate-900/90 text-[10px] text-blue-400 font-mono border border-slate-700 whitespace-nowrap shadow-md">
            {mobileControls.pointerPos.x},{mobileControls.pointerPos.y}
          </div>
        </div>
      </div>

      {/* Floating Trackpad Control Unit */}
      <div className="fixed bottom-4 right-4 z-[9990] w-64 bg-slate-900/95 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl animate-window select-none">
        {/* Trackpad Header */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/80 border-b border-slate-700/80 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 font-medium">
            <MousePointer className="w-3.5 h-3.5 text-blue-400" />
            <span>Virtual Mobile Trackpad</span>
          </div>
          <button
            onClick={toggleTrackpad}
            className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Touch Surface */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="h-28 bg-gradient-to-b from-slate-950/60 to-slate-900/80 flex flex-col items-center justify-center p-2 cursor-crosshair active:bg-slate-800/50 transition-colors"
        >
          <Move className="w-6 h-6 text-slate-600 mb-1" />
          <span className="text-[11px] text-slate-500 font-medium">Slide finger here to move cursor</span>
        </div>

        {/* Mouse Buttons */}
        <div className="grid grid-cols-3 divide-x divide-slate-700 border-t border-slate-700 bg-slate-800/90 text-xs font-semibold">
          <button
            onClick={() => triggerClickAtPointer('click')}
            className="py-2.5 text-slate-200 active:bg-blue-600 active:text-white transition-colors"
          >
            Left Click
          </button>
          <button
            onClick={() => triggerClickAtPointer('dblclick')}
            className="py-2.5 text-slate-300 active:bg-indigo-600 active:text-white transition-colors"
          >
            Double Click
          </button>
          <button
            onClick={() => triggerClickAtPointer('contextmenu')}
            className="py-2.5 text-slate-300 active:bg-purple-600 active:text-white transition-colors"
          >
            Right Click
          </button>
        </div>
      </div>
    </>
  );
};

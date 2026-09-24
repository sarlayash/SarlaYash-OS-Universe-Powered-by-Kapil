// Mobile Virtual Terminal Keyboard for SarlaYash OS Universe
import React from 'react';
import { Delete, CornerDownLeft, X, ArrowUp, ArrowDown } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { audioService } from '../../services/audioService';

export const VirtualKeyboard = ({ onKeyPress }) => {
  const { mobileControls, toggleKeyboard } = useOS();

  if (!mobileControls.showKeyboard) return null;

  const handleKey = (char) => {
    audioService.playClick();
    if (onKeyPress) onKeyPress(char);
    // Also dispatch synthetic keyboard event to active element
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
      if (char === 'BACKSPACE') {
        const start = active.selectionStart;
        const val = active.value;
        if (start > 0) {
          active.value = val.substring(0, start - 1) + val.substring(start);
          active.selectionStart = active.selectionEnd = start - 1;
        }
      } else if (char === 'ENTER') {
        active.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
      } else {
        const start = active.selectionStart || 0;
        const val = active.value || '';
        active.value = val.substring(0, start) + char + val.substring(start);
        active.selectionStart = active.selectionEnd = start + char.length;
      }
      active.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  const SPECIAL_KEYS = ['Tab', 'Ctrl', 'Alt', 'Esc', '~', '/', '\\', '-', '_', '|', '$', '>', '<', '&', ';', '"', "'"];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9990] bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/80 p-2 shadow-2xl animate-window">
      {/* Header bar */}
      <div className="flex items-center justify-between px-2 pb-1.5 text-xs text-slate-400">
        <span className="font-semibold text-slate-300">Terminal & Code Virtual Keyboard</span>
        <button
          onClick={toggleKeyboard}
          className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Special Sys/Terminal Keys */}
      <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
        {SPECIAL_KEYS.map((k) => (
          <button
            key={k}
            onClick={() => handleKey(k === 'Tab' ? '\t' : k)}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 active:bg-blue-600 rounded-lg text-xs font-mono font-medium text-slate-200 border border-slate-700 shadow-sm shrink-0"
          >
            {k}
          </button>
        ))}
        <button
          onClick={() => handleKey('UP')}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 active:bg-blue-600 rounded-lg text-slate-200 border border-slate-700 shrink-0"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => handleKey('DOWN')}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 active:bg-blue-600 rounded-lg text-slate-200 border border-slate-700 shrink-0"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* QWERTY Row 1 */}
      <div className="grid grid-cols-10 gap-1 mb-1">
        {'1234567890'.split('').map(char => (
          <button
            key={char}
            onClick={() => handleKey(char)}
            className="py-2.5 bg-slate-800 hover:bg-slate-700 active:bg-blue-600 rounded-md text-xs font-semibold text-white shadow-sm"
          >
            {char}
          </button>
        ))}
      </div>

      {/* QWERTY Row 2 */}
      <div className="grid grid-cols-10 gap-1 mb-1">
        {'qwertyuiop'.split('').map(char => (
          <button
            key={char}
            onClick={() => handleKey(char)}
            className="py-2.5 bg-slate-800/90 hover:bg-slate-700 active:bg-blue-600 rounded-md text-xs font-semibold text-white shadow-sm uppercase"
          >
            {char}
          </button>
        ))}
      </div>

      {/* QWERTY Row 3 */}
      <div className="grid grid-cols-9 gap-1 mb-1 px-3">
        {'asdfghjkl'.split('').map(char => (
          <button
            key={char}
            onClick={() => handleKey(char)}
            className="py-2.5 bg-slate-800/90 hover:bg-slate-700 active:bg-blue-600 rounded-md text-xs font-semibold text-white shadow-sm uppercase"
          >
            {char}
          </button>
        ))}
      </div>

      {/* QWERTY Row 4 */}
      <div className="grid grid-cols-9 gap-1 mb-1">
        <button
          onClick={() => handleKey(' ')}
          className="col-span-2 py-2.5 bg-slate-700/80 hover:bg-slate-600 active:bg-blue-600 rounded-md text-[11px] font-semibold text-slate-200 shadow-sm"
        >
          Space
        </button>
        {'zxcvbnm'.split('').map(char => (
          <button
            key={char}
            onClick={() => handleKey(char)}
            className="py-2.5 bg-slate-800/90 hover:bg-slate-700 active:bg-blue-600 rounded-md text-xs font-semibold text-white shadow-sm uppercase"
          >
            {char}
          </button>
        ))}
        <button
          onClick={() => handleKey('BACKSPACE')}
          className="col-span-1 py-2.5 bg-red-900/40 hover:bg-red-800 active:bg-red-700 border border-red-700/50 rounded-md flex items-center justify-center text-red-200 shadow-sm"
        >
          <Delete className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => handleKey('ENTER')}
          className="col-span-1 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-md flex items-center justify-center text-white shadow-sm"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

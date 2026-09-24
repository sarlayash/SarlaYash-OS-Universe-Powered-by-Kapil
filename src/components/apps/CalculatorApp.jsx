// Calculator App
import React, { useState } from 'react';
import { audioService } from '../../services/audioService';

export const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNum = (n) => {
    audioService.playClick();
    setDisplay(prev => (prev === '0' ? String(n) : prev + n));
  };

  const handleOp = (op) => {
    audioService.playClick();
    setEquation(`${display} ${op} `);
    setDisplay('0');
  };

  const handleEquals = () => {
    audioService.playClick();
    try {
      const full = `${equation}${display}`.replace(/×/g, '*').replace(/÷/g, '/');
      // eslint-disable-next-line no-eval
      const result = Function(`'use strict'; return (${full})`)();
      setDisplay(String(result));
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    audioService.playClick();
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="h-full flex flex-col p-4 bg-slate-900 text-white select-none max-w-xs mx-auto">
      {/* Display Screen */}
      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-right mb-3">
        <div className="text-[11px] text-slate-500 font-mono h-4">{equation}</div>
        <div className="text-2xl font-bold font-mono text-white truncate">{display}</div>
      </div>

      {/* Button Pad */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        <button onClick={handleClear} className="p-3 rounded-lg bg-red-900/40 hover:bg-red-800/60 text-red-200 font-bold text-sm">C</button>
        <button onClick={() => handleOp('÷')} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold text-sm">÷</button>
        <button onClick={() => handleOp('×')} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold text-sm">×</button>
        <button onClick={() => handleOp('-')} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold text-sm">−</button>

        <button onClick={() => handleNum(7)} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-sm">7</button>
        <button onClick={() => handleNum(8)} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-sm">8</button>
        <button onClick={() => handleNum(9)} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-sm">9</button>
        <button onClick={() => handleOp('+')} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold text-sm">+</button>

        <button onClick={() => handleNum(4)} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-sm">4</button>
        <button onClick={() => handleNum(5)} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-sm">5</button>
        <button onClick={() => handleNum(6)} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-sm">6</button>
        <button onClick={handleEquals} className="row-span-2 p-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-sm flex items-center justify-center text-white">=</button>

        <button onClick={() => handleNum(1)} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-sm">1</button>
        <button onClick={() => handleNum(2)} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-sm">2</button>
        <button onClick={() => handleNum(3)} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-sm">3</button>

        <button onClick={() => handleNum(0)} className="col-span-2 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-sm">0</button>
        <button onClick={() => handleNum('.')} className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-sm">.</button>
      </div>
    </div>
  );
};

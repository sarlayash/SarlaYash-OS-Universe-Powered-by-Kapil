// Interactive Terminal / CMD / Zsh Shell App
// Powers hands-on CLI practice with real virtual filesystem integration

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles } from 'lucide-react';
import { CommandInterpreter } from '../../services/commandInterpreter';
import { useLearner } from '../../context/LearnerContext';
import { useOS } from '../../context/OSContext';

export const TerminalApp = () => {
  const { activeOS } = useOS();
  const { learnerName, triggerChallengeEvent } = useLearner();

  const [interpreter] = useState(() => {
    const user = learnerName.toLowerCase().replace(/\s+/g, '') || 'student';
    const initDir = activeOS === 'windows' ? 'C:/Users/Student' : (activeOS === 'macos' ? `/Users/${user}` : `/home/${user}`);
    return new CommandInterpreter(activeOS, initDir, user);
  });

  const [lines, setLines] = useState(() => [
    { type: 'output', text: activeOS === 'windows' 
        ? 'Microsoft Windows [Version 10.0.22631.3296]\n(c) Microsoft Corporation & SarlaYash. All rights reserved.\nType "help" for a list of supported commands.'
        : `Welcome to SarlaYash OS Universe (${activeOS.toUpperCase()})\nType "help" or "fastfetch" to explore commands.\n`
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new lines
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  // Keep focus on input
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleCommandSubmit = (e) => {
    if (e) e.preventDefault();
    const cmd = inputVal;
    if (!cmd.trim()) return;

    const currentPrompt = interpreter.getPrompt();
    const res = interpreter.execute(cmd, (event) => {
      triggerChallengeEvent(event);
    });

    if (res.clear) {
      setLines([]);
    } else {
      setLines(prev => [
        ...prev,
        { type: 'prompt', text: currentPrompt + cmd },
        ...(res.output ? [{ type: 'output', text: res.output }] : [])
      ]);
    }

    setInputVal('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const hist = interpreter.history;
      if (hist.length === 0) return;
      const nextIdx = historyIndex === -1 ? hist.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(hist[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const hist = interpreter.history;
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= hist.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(hist[nextIdx] || '');
      }
    }
  };

  const quickRun = (quickCmd) => {
    setInputVal(quickCmd);
    setTimeout(() => {
      const currentPrompt = interpreter.getPrompt();
      const res = interpreter.execute(quickCmd, (event) => {
        triggerChallengeEvent(event);
      });
      if (res.clear) {
        setLines([]);
      } else {
        setLines(prev => [
          ...prev,
          { type: 'prompt', text: currentPrompt + quickCmd },
          ...(res.output ? [{ type: 'output', text: res.output }] : [])
        ]);
      }
      setInputVal('');
    }, 50);
  };

  // Convert simple ANSI color codes to styled HTML
  const formatAnsi = (text) => {
    const parts = text.split(/(\x1b\[[0-9;]*m)/g);
    let currentColor = '';

    return parts.map((part, i) => {
      if (part === '\x1b[0m') {
        currentColor = '';
        return null;
      } else if (part === '\x1b[31m') {
        currentColor = 'text-red-400';
        return null;
      } else if (part === '\x1b[32m') {
        currentColor = 'text-emerald-400';
        return null;
      } else if (part === '\x1b[33m') {
        currentColor = 'text-amber-400';
        return null;
      } else if (part === '\x1b[34m') {
        currentColor = 'text-blue-400';
        return null;
      } else if (part === '\x1b[35m') {
        currentColor = 'text-purple-400';
        return null;
      } else if (part === '\x1b[36m') {
        currentColor = 'text-cyan-400';
        return null;
      } else if (part === '\x1b[37m') {
        currentColor = 'text-white';
        return null;
      }

      return (
        <span key={i} className={currentColor || undefined}>
          {part}
        </span>
      );
    });
  };

  const isWin = activeOS === 'windows';

  return (
    <div
      onClick={handleContainerClick}
      className={`h-full flex flex-col font-mono text-xs sm:text-sm select-text ${
        isWin ? 'bg-black text-slate-100' : 'bg-slate-950 text-emerald-400'
      }`}
    >
      {/* Quick Mobile Command Chips */}
      <div className="flex items-center gap-1.5 p-2 bg-slate-900/90 border-b border-slate-800 overflow-x-auto scrollbar-none shrink-0 select-none">
        <span className="text-[10px] text-slate-400 font-sans uppercase font-bold px-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Quick:</span>
        </span>
        {(isWin ? ['dir', 'ipconfig', 'systeminfo', 'mkdir Lab', 'cls', 'help'] : ['ls -la', 'fastfetch', 'pwd', 'mkdir Lab', 'chmod 755 start_here.sh', 'top', 'clear', 'help']).map((c) => (
          <button
            key={c}
            onClick={(e) => { e.stopPropagation(); quickRun(c); }}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 active:bg-blue-600 text-slate-300 hover:text-white border border-slate-700 text-[11px] whitespace-nowrap"
          >
            {c}
          </button>
        ))}
      </div>

      {/* Terminal Output Stream */}
      <div className="flex-1 p-3 overflow-y-auto space-y-1">
        {lines.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-relaxed break-all">
            {line.type === 'prompt' ? (
              <span className={isWin ? 'text-white font-bold' : 'text-blue-400 font-bold'}>
                {line.text}
              </span>
            ) : (
              <span className={isWin ? 'text-slate-200' : 'text-emerald-300/90'}>
                {formatAnsi(line.text)}
              </span>
            )}
          </div>
        ))}

        {/* Active Prompt Line */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-1 pt-1">
          <span className={isWin ? 'text-white font-bold shrink-0' : 'text-blue-400 font-bold shrink-0'}>
            {interpreter.getPrompt()}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs sm:text-sm p-0 m-0 caret-emerald-400"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

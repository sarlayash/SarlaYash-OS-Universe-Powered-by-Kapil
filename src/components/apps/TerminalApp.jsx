// Authentic Terminal / Command Prompt / Zsh Shell Application
// Tailored with exact color schemes, prompts, tabs, and font styling per OS

import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Sparkles, Terminal as TerminalIcon } from 'lucide-react';
import { CommandInterpreter } from '../../services/commandInterpreter';
import { useLearner } from '../../context/LearnerContext';
import { useOS } from '../../context/OSContext';

export const TerminalApp = () => {
  const { activeOS } = useOS();
  const { learnerName, triggerChallengeEvent } = useLearner();

  const [interpreter] = useState(() => {
    const user = (learnerName || 'student').toLowerCase().replace(/\s+/g, '');
    const initDir = activeOS === 'windows' ? 'C:/Users/Student' : (activeOS === 'macos' ? `/Users/${user}` : `/home/${user}`);
    return new CommandInterpreter(activeOS, initDir, user);
  });

  const getInitialBanner = () => {
    if (activeOS === 'windows') {
      return 'Microsoft Windows [Version 10.0.22631.3296]\n(c) Microsoft Corporation. All rights reserved.\nType "help" for a list of supported commands.\n';
    } else if (activeOS === 'macos') {
      return `Last login: ${new Date().toDateString()} on ttys000\nType "help" or "fastfetch" to inspect system.\n`;
    } else if (activeOS === 'chrome') {
      return 'ChromeOS Crostini Linux container (penguin)\nType "help" or "vmc" for virtual machine commands.\n';
    } else {
      // Ubuntu
      return `Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-40-generic x86_64)\n * Documentation:  https://help.ubuntu.com\n * Management:     https://landscape.canonical.com\n * Support:        https://ubuntu.com/pro\n\nType "help" or "fastfetch" to begin.\n`;
    }
  };

  const [lines, setLines] = useState(() => [{ type: 'output', text: getInitialBanner() }]);
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tabs, setTabs] = useState(['Tab 1']);
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

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
    }, 40);
  };

  const formatAnsi = (text) => {
    const parts = text.split(/(\x1b\[[0-9;]*m)/g);
    let currentColor = '';

    return parts.map((part, i) => {
      if (part === '\x1b[0m') { currentColor = ''; return null; }
      if (part === '\x1b[31m') { currentColor = 'text-red-400'; return null; }
      if (part === '\x1b[32m') { currentColor = 'text-emerald-400'; return null; }
      if (part === '\x1b[33m') { currentColor = 'text-amber-400'; return null; }
      if (part === '\x1b[34m') { currentColor = 'text-blue-400'; return null; }
      if (part === '\x1b[35m') { currentColor = 'text-purple-400'; return null; }
      if (part === '\x1b[36m') { currentColor = 'text-cyan-400'; return null; }
      if (part === '\x1b[37m') { currentColor = 'text-white'; return null; }

      return <span key={i} className={currentColor || undefined}>{part}</span>;
    });
  };

  // OS-specific Terminal Styles
  const getTerminalColors = () => {
    switch (activeOS) {
      case 'windows':
        return 'bg-[#0c0c0c] text-[#cccccc] font-mono';
      case 'macos':
        return 'bg-[#1e1e1e] text-[#f2f2f2] font-mono';
      case 'chrome':
        return 'bg-[#202124] text-[#e8eaed] font-mono';
      default:
        // Ubuntu
        return 'bg-[#300a24] text-[#ffffff] font-mono';
    }
  };

  const getPromptColor = () => {
    switch (activeOS) {
      case 'windows':
        return 'text-[#ffffff] font-bold';
      case 'macos':
        return 'text-[#48d1cc] font-bold';
      case 'chrome':
        return 'text-[#8ab4f8] font-bold';
      default:
        // Ubuntu: green user@host, blue path
        return 'text-[#4e9a06] font-bold';
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className={`h-full flex flex-col text-xs sm:text-sm select-text ${getTerminalColors()}`}
    >
      {/* Modern Terminal Tab Bar */}
      <div className="flex items-center justify-between px-2 bg-black/40 border-b border-white/5 select-none shrink-0 h-8">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {tabs.map((tab, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 px-3 py-1 rounded-t-lg text-xs transition-colors cursor-pointer ${
                activeTabIdx === idx
                  ? 'bg-white/10 text-white font-medium border-t-2 border-blue-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>{tab}</span>
            </div>
          ))}
          <button
            onClick={() => setTabs(prev => [...prev, `Tab ${prev.length + 1}`])}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Command Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {(activeOS === 'windows' 
            ? ['dir', 'ipconfig', 'systeminfo', 'mkdir Lab', 'cls', 'help'] 
            : ['ls -la', 'fastfetch', 'pwd', 'mkdir Lab', 'chmod 755 start_here.sh', 'top', 'clear', 'help']
          ).map((c) => (
            <button
              key={c}
              onClick={(e) => { e.stopPropagation(); quickRun(c); }}
              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 active:bg-blue-600 text-slate-200 border border-white/10 text-[10px] whitespace-nowrap font-mono"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Output Screen */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-1 font-mono leading-relaxed">
        {lines.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap break-all">
            {line.type === 'prompt' ? (
              <span className={getPromptColor()}>{line.text}</span>
            ) : (
              <span className="opacity-95">{formatAnsi(line.text)}</span>
            )}
          </div>
        ))}

        {/* Active Input Line */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-1 pt-0.5">
          <span className={`${getPromptColor()} shrink-0`}>
            {interpreter.getPrompt()}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs sm:text-sm p-0 m-0 caret-white"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

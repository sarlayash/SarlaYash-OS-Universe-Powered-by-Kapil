// Simulated Web Browser App (Edge / Chrome / Safari)
// Provides in-app documentation, cheat sheets, and practical lab tutorials

import React, { useState } from 'react';
import { 
  Globe, 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Search, 
  Bookmark, 
  ExternalLink,
  Code,
  Shield,
  Layers,
  Terminal
} from 'lucide-react';
import { useOS } from '../../context/OSContext';

const TUTORIAL_PAGES = {
  home: {
    title: 'SarlaYash Student Portal',
    url: 'https://learn.sarlayash.internal',
    content: (
      <div className="p-4 sm:p-6 space-y-5 text-slate-200">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/50 via-indigo-900/40 to-purple-900/50 border border-blue-500/30">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">
            Education Portal
          </span>
          <h2 className="text-xl font-bold text-white mt-2 mb-1">
            Welcome to the Computer Systems Masterclass
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
            Practical skills in Windows, Linux, macOS, and ChromeOS. Read cheat sheets, complete lab challenges, and earn your certificate!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
              <Terminal className="w-4 h-4" />
              <span>Linux File Permissions (chmod)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Understand read (4), write (2), and execute (1). Example: <code>chmod 755 script.sh</code> grants owner full access and others read/execute.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-400">
              <Layers className="w-4 h-4" />
              <span>Disk Partitioning Guide</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              GPT vs MBR, EFI system partition, swap space, and NTFS/ext4/APFS filesystem structures during installation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-purple-400">
              <Code className="w-4 h-4" />
              <span>Windows CMD vs PowerShell</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore essential utilities: <code>ipconfig</code>, <code>dir</code>, <code>systeminfo</code>, and batch operations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
              <Shield className="w-4 h-4" />
              <span>DevOps & Package Managers</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Package distribution across ecosystems: <code>apt</code> for Ubuntu/Debian, <code>winget</code> for Windows, and <code>brew</code> for macOS.
            </p>
          </div>
        </div>
      </div>
    )
  }
};

export const BrowserApp = () => {
  const { activeOS } = useOS();
  const [urlInput, setUrlInput] = useState('https://learn.sarlayash.internal');

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-200 select-none">
      {/* Browser Bar */}
      <div className="p-2 sm:p-2.5 bg-slate-800 border-b border-slate-700 flex items-center gap-2 text-xs">
        <div className="flex items-center gap-1 text-slate-400">
          <button className="p-1 rounded hover:bg-slate-700"><ArrowLeft className="w-3.5 h-3.5" /></button>
          <button className="p-1 rounded hover:bg-slate-700"><ArrowRight className="w-3.5 h-3.5" /></button>
          <button className="p-1 rounded hover:bg-slate-700"><RotateCw className="w-3.5 h-3.5" /></button>
        </div>

        {/* Address Bar */}
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-300 font-mono text-xs">
          <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white text-xs truncate"
          />
        </div>

        <button className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">
          <Search className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto bg-slate-950">
        {TUTORIAL_PAGES.home.content}
      </div>
    </div>
  );
};

// Windows 11 Guided Installation Simulator
// Full experience: BIOS Boot -> Language -> Key -> Partitioning -> Copying -> OOBE

import React, { useState, useEffect } from 'react';
import { 
  Laptop, 
  HardDrive, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  RotateCw,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useLearner } from '../../context/LearnerContext';
import { useOS } from '../../context/OSContext';
import { audioService } from '../../services/audioService';

export const WindowsInstaller = () => {
  const { learnerName, markInstallationCompleted } = useLearner();
  const { switchOS } = useOS();

  const [step, setStep] = useState(1); // 1: Boot, 2: Lang, 3: Key, 4: Partition, 5: Copying, 6: OOBE, 7: Done
  const [copyProgress, setCopyProgress] = useState(0);
  const [allocatedPartition, setAllocatedPartition] = useState(false);
  const [pin, setPin] = useState('1234');

  // Copying files simulation
  useEffect(() => {
    if (step === 5) {
      const interval = setInterval(() => {
        setCopyProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(6), 800);
            return 100;
          }
          return prev + 15;
        });
      }, 450);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleFinish = () => {
    markInstallationCompleted('windows');
    audioService.playWindowsBoot();
    switchOS('windows', 'desktop');
  };

  return (
    <div className="relative w-full h-full bg-[#0a101d] text-white flex flex-col items-center justify-center p-4 select-none overflow-y-auto">
      {/* Step 1: Booting Splash */}
      {step === 1 && (
        <div className="flex flex-col items-center space-y-8 animate-window">
          {/* Windows 11 Blue Logo */}
          <div className="grid grid-cols-2 gap-1.5 w-24 h-24">
            <div className="bg-[#0078d4] rounded-sm shadow-md" />
            <div className="bg-[#0078d4] rounded-sm shadow-md" />
            <div className="bg-[#0078d4] rounded-sm shadow-md" />
            <div className="bg-[#0078d4] rounded-sm shadow-md" />
          </div>
          {/* Rotating Spinner */}
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <RotateCw className="w-5 h-5 animate-spin text-blue-400" />
            <span>Starting Windows Setup...</span>
          </div>
          <button
            onClick={() => { audioService.playClick(); setStep(2); }}
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-xs shadow-lg transition-transform hover:scale-105"
          >
            Press Next to Configure
          </button>
        </div>
      )}

      {/* Step 2: Language & Region Setup */}
      {step === 2 && (
        <div className="w-full max-w-lg bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-5 animate-window">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="p-2 rounded-lg bg-blue-600 text-white">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Windows 11 Setup</h2>
              <p className="text-xs text-slate-400">Select language, time and keyboard preferences</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Language to install:</label>
              <select className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none">
                <option>English (United States)</option>
                <option>English (India)</option>
                <option>English (United Kingdom)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Time and currency format:</label>
              <select className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none">
                <option>English (International)</option>
                <option>English (India / 24-Hour)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Keyboard or input method:</label>
              <select className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none">
                <option>US QWERTY</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-[11px] text-slate-500">SarlaYash Virtual Lab ISO</span>
            <button
              onClick={() => { audioService.playClick(); setStep(3); }}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Product Key & Edition */}
      {step === 3 && (
        <div className="w-full max-w-lg bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-5 animate-window">
          <div>
            <h2 className="text-base font-bold">Activate Windows</h2>
            <p className="text-xs text-slate-400 mt-0.5">Enter a product key or use education license</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-2">
            <span className="text-slate-400">Virtual Lab Education Product Key:</span>
            <input
              type="text"
              readOnly
              value="SYOU-PRO-2026-KAPIL-LABS"
              className="w-full p-2 bg-slate-950 font-mono text-center text-blue-400 font-bold border border-slate-800 rounded tracking-widest text-xs"
            />
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>SarlaYash Educational Student License Pre-Activated</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-semibold text-slate-300">Select Edition:</span>
            <div className="p-3 rounded-xl border border-blue-500/50 bg-blue-600/10 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Windows 11 Pro Education</div>
                <div className="text-[11px] text-slate-400">Includes Remote Desktop, BitLocker & Sandbox</div>
              </div>
              <span className="px-2 py-0.5 bg-blue-600 rounded text-[10px] font-bold">Selected</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button onClick={() => setStep(2)} className="text-xs text-slate-400 hover:text-white">Back</button>
            <button
              onClick={() => { audioService.playClick(); setStep(4); }}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Disk Partitioning */}
      {step === 4 && (
        <div className="w-full max-w-lg bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-5 animate-window">
          <div>
            <h2 className="text-base font-bold">Where do you want to install Windows?</h2>
            <p className="text-xs text-slate-400 mt-0.5">Partition the virtual hard drive (GPT / NTFS)</p>
          </div>

          <div className="border border-slate-700 rounded-xl overflow-hidden text-xs">
            <div className="bg-slate-800 p-2 font-semibold text-slate-300 grid grid-cols-3">
              <span>Name</span>
              <span>Total Size</span>
              <span>Free Space</span>
            </div>
            {!allocatedPartition ? (
              <div
                onClick={() => setAllocatedPartition(true)}
                className="p-3 bg-slate-900/60 hover:bg-blue-600/20 cursor-pointer grid grid-cols-3 items-center border-t border-slate-800"
              >
                <span className="font-medium text-blue-400">Drive 0 Unallocated Space</span>
                <span className="text-slate-400">64.0 GB</span>
                <span className="text-slate-400">64.0 GB</span>
              </div>
            ) : (
              <div className="divide-y divide-slate-800">
                <div className="p-2.5 bg-slate-900/40 grid grid-cols-3 text-slate-400 text-[11px]">
                  <span>Drive 0 Partition 1: System (EFI)</span>
                  <span>100 MB</span>
                  <span>70 MB</span>
                </div>
                <div className="p-2.5 bg-blue-600/20 border-l-2 border-blue-500 grid grid-cols-3 font-semibold text-white">
                  <span>Drive 0 Partition 2: Primary (C:)</span>
                  <span>63.9 GB</span>
                  <span>63.9 GB</span>
                </div>
              </div>
            )}
          </div>

          {!allocatedPartition ? (
            <button
              onClick={() => { audioService.playClick(); setAllocatedPartition(true); }}
              className="w-full py-2.5 rounded-xl border border-dashed border-blue-500/50 bg-blue-500/10 text-blue-400 text-xs font-semibold hover:bg-blue-500/20 flex items-center justify-center gap-1.5"
            >
              <HardDrive className="w-4 h-4" />
              <span>Click to Allocate & Format Partition (64 GB NTFS)</span>
            </button>
          ) : (
            <div className="text-xs text-emerald-400 flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Drive partitioned successfully! Ready for installation.</span>
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <button onClick={() => setStep(3)} className="text-xs text-slate-400 hover:text-white">Back</button>
            <button
              disabled={!allocatedPartition}
              onClick={() => { audioService.playClick(); setStep(5); }}
              className={`px-5 py-2 font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-md ${
                allocatedPartition ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Install Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Copying Files & Installation Progress */}
      {step === 5 && (
        <div className="w-full max-w-lg bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-6 animate-window">
          <div className="space-y-1">
            <h2 className="text-base font-bold">Installing Windows</h2>
            <p className="text-xs text-slate-400">Your virtual computer will restart shortly.</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span>Copying Windows files</span>
              <Check className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-center justify-between text-white font-semibold">
              <span>Getting files ready for installation ({copyProgress}%)</span>
              <RotateCw className="w-4 h-4 animate-spin text-blue-400" />
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Installing features</span>
              <span>{copyProgress > 60 ? 'Done' : 'Pending'}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Installing updates</span>
              <span>{copyProgress > 85 ? 'Done' : 'Pending'}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-300"
              style={{ width: `${copyProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Step 6: OOBE First-Time User Setup */}
      {step === 6 && (
        <div className="w-full max-w-lg bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-5 animate-window">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Out of Box Experience (OOBE)</span>
          </div>

          <h2 className="text-lg font-bold text-white">Let's set up your student account</h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">User Name:</label>
              <input
                type="text"
                readOnly
                value={learnerName || 'Student'}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white font-semibold"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Create a PIN / Password for login:</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="e.g. 1234"
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300 space-y-1">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Privacy Settings</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Location, Diagnostic Data, and Tailored Experiences optimized for the mobile virtual lab.
            </p>
          </div>

          <button
            onClick={handleFinish}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-bold rounded-xl text-xs shadow-lg transition-transform hover:scale-[1.02]"
          >
            Finish & Launch Windows 11 Desktop
          </button>
        </div>
      )}
    </div>
  );
};

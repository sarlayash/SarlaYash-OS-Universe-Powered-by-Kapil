// Ubuntu Linux 24.04 LTS Guided Installer Simulator
// Authentic: GRUB Menu -> Welcome -> Disk Type -> Timezone -> User Account -> Squashfs Copy -> Reboot

import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  HardDrive, 
  MapPin, 
  Check, 
  ArrowRight, 
  RotateCw,
  Sparkles,
  Globe
} from 'lucide-react';
import { useLearner } from '../../context/LearnerContext';
import { useOS } from '../../context/OSContext';
import { audioService } from '../../services/audioService';

export const LinuxInstaller = () => {
  const { learnerName, markInstallationCompleted } = useLearner();
  const { switchOS } = useOS();

  const [step, setStep] = useState(1); // 1: GRUB, 2: Welcome, 3: Disk, 4: Timezone, 5: Identity, 6: Copying, 7: Ready
  const [copyProgress, setCopyProgress] = useState(0);
  const [selectedCity, setSelectedCity] = useState('New Delhi (UTC+5:30)');

  // Copying files simulation
  useEffect(() => {
    if (step === 6) {
      const interval = setInterval(() => {
        setCopyProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(7), 800);
            return 100;
          }
          return prev + 20;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleFinish = () => {
    markInstallationCompleted('linux');
    audioService.playLinuxBoot();
    switchOS('linux', 'desktop');
  };

  return (
    <div className="relative w-full h-full bg-[#2c001e] text-white flex flex-col items-center justify-center p-4 select-none overflow-y-auto font-sans">
      {/* Step 1: GNU GRUB Bootloader */}
      {step === 1 && (
        <div className="w-full max-w-lg bg-black border border-slate-700 p-6 rounded-lg font-mono text-xs shadow-2xl space-y-4 animate-window">
          <div className="text-center font-bold text-slate-300 border-b border-slate-800 pb-2">
            GNU GRUB version 2.12 (SarlaYash Ubuntu Live)
          </div>
          <div className="space-y-1.5 py-2">
            <div className="p-2 bg-white text-black font-bold flex items-center justify-between rounded">
              <span>*Try or Install Ubuntu</span>
              <span>[DEFAULT]</span>
            </div>
            <div className="p-2 text-slate-400 hover:text-white">Ubuntu (safe graphics)</div>
            <div className="p-2 text-slate-400 hover:text-white">OEM install (for manufacturers)</div>
            <div className="p-2 text-slate-400 hover:text-white">Boot from next volume</div>
          </div>
          <p className="text-[11px] text-slate-500 text-center">
            Use the buttons or click below to boot into Ubuntu Live Installer.
          </p>
          <button
            onClick={() => { audioService.playClick(); setStep(2); }}
            className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded text-xs shadow-md transition-all"
          >
            Boot Live Installer Now
          </button>
        </div>
      )}

      {/* Step 2: Welcome Screen */}
      {step === 2 && (
        <div className="w-full max-w-lg bg-slate-900/95 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-5 animate-window">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-md">
              <div className="w-5 h-5 rounded-full border-2 border-white" />
            </div>
            <div>
              <h2 className="text-base font-bold">Welcome to Ubuntu 24.04 LTS</h2>
              <p className="text-xs text-slate-400">Noble Numbat - SarlaYash Computer Lab</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <label className="text-slate-300 font-semibold">Select language:</label>
            <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-1 border border-slate-800 rounded-lg">
              {['English', 'Hindi (हिन्दी)', 'Spanish (Español)', 'French (Français)', 'German (Deutsch)', 'Japanese (日本語)'].map((l, i) => (
                <div key={l} className={`p-2 rounded cursor-pointer ${i === 0 ? 'bg-orange-600/30 text-orange-400 font-bold border border-orange-500/40' : 'text-slate-400 hover:bg-slate-800'}`}>
                  {l}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-[11px] text-slate-500">Free open-source operating system</span>
            <button
              onClick={() => { audioService.playClick(); setStep(3); }}
              className="px-5 py-2 bg-orange-600 hover:bg-orange-500 font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
            >
              <span>Install Ubuntu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Disk Partitioning (ext4) */}
      {step === 3 && (
        <div className="w-full max-w-lg bg-slate-900/95 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-5 animate-window">
          <div>
            <h2 className="text-base font-bold">Installation Type</h2>
            <p className="text-xs text-slate-400 mt-0.5">Partitioning the virtual drive with ext4 filesystem</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl border border-orange-500/50 bg-orange-600/10 space-y-1">
              <div className="flex items-center justify-between font-bold text-white">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-orange-400" />
                  <span>Erase disk and install Ubuntu (Guided ext4)</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-orange-600">Recommended</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Sets up <code>/boot/efi</code> (512MB FAT32), swap volume, and primary root <code>/</code> (ext4 journaling filesystem).
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/40 opacity-70">
              <div className="font-semibold text-slate-300">Something else (Manual GParted Partitioning)</div>
              <p className="text-[10px] text-slate-500">Create or resize partitions yourself.</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button onClick={() => setStep(2)} className="text-xs text-slate-400 hover:text-white">Back</button>
            <button
              onClick={() => { audioService.playClick(); setStep(4); }}
              className="px-5 py-2 bg-orange-600 hover:bg-orange-500 font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Where are you? (Timezone) */}
      {step === 4 && (
        <div className="w-full max-w-lg bg-slate-900/95 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-5 animate-window">
          <div>
            <h2 className="text-base font-bold">Where are you?</h2>
            <p className="text-xs text-slate-400 mt-0.5">Select your timezone region</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
            <Globe className="w-16 h-16 text-orange-400/40 mb-2" />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-400">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>{selectedCity}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {['New Delhi (UTC+5:30)', 'London (UTC+0)', 'New York (UTC-5)', 'Tokyo (UTC+9)'].map(c => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`p-2 rounded-lg border text-left ${selectedCity === c ? 'bg-orange-600/30 border-orange-500 text-white font-bold' : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800'}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button onClick={() => setStep(3)} className="text-xs text-slate-400 hover:text-white">Back</button>
            <button
              onClick={() => { audioService.playClick(); setStep(5); }}
              className="px-5 py-2 bg-orange-600 hover:bg-orange-500 font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Who are you? (User Account) */}
      {step === 5 && (
        <div className="w-full max-w-lg bg-slate-900/95 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4 animate-window">
          <div>
            <h2 className="text-base font-bold">Who are you?</h2>
            <p className="text-xs text-slate-400 mt-0.5">Create your primary user account with sudo rights</p>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Your name:</label>
              <input
                type="text"
                readOnly
                value={learnerName || 'Student'}
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-semibold"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Your computer's name (hostname):</label>
              <input
                type="text"
                readOnly
                value="sarlayash-universe"
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-orange-400 font-mono font-semibold"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Pick a username:</label>
              <input
                type="text"
                readOnly
                value={(learnerName || 'student').toLowerCase().replace(/\s+/g, '')}
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button onClick={() => setStep(4)} className="text-xs text-slate-400 hover:text-white">Back</button>
            <button
              onClick={() => { audioService.playClick(); setStep(6); }}
              className="px-5 py-2 bg-orange-600 hover:bg-orange-500 font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
            >
              <span>Install Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Copying Files & Squashfs */}
      {step === 6 && (
        <div className="w-full max-w-lg bg-slate-900/95 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-6 animate-window">
          <div className="space-y-1">
            <h2 className="text-base font-bold">Installing Ubuntu 24.04 LTS</h2>
            <p className="text-xs text-slate-400">Extracting Linux kernel and core utilities...</p>
          </div>

          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="flex items-center justify-between">
              <span>Unpacking filesystem.squashfs</span>
              <span>{copyProgress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-300"
                style={{ width: `${copyProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 7: Installation Complete */}
      {step === 7 && (
        <div className="w-full max-w-lg bg-slate-900/95 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-5 animate-window text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <Check className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Installation Complete</h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
            Ubuntu 24.04 LTS has been successfully installed on your virtual disk. Restart into the GNOME desktop to begin hands-on bash commands!
          </p>
          <button
            onClick={handleFinish}
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 font-bold rounded-xl text-xs shadow-lg transition-transform hover:scale-[1.02]"
          >
            Restart Now & Launch Ubuntu Desktop
          </button>
        </div>
      )}
    </div>
  );
};

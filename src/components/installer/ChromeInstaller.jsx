// Google ChromeOS Guided Setup Simulator
import React, { useState } from 'react';
import { 
  Wifi, 
  User, 
  ArrowRight, 
  Check, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ChromeIcon } from '../icons/ChromeIcon';
import { useLearner } from '../../context/LearnerContext';
import { useOS } from '../../context/OSContext';
import { audioService } from '../../services/audioService';

export const ChromeInstaller = () => {
  const { learnerName, markInstallationCompleted } = useLearner();
  const { switchOS } = useOS();

  const [step, setStep] = useState(1); // 1: Welcome, 2: Wifi, 3: Account, 4: AllSet

  const handleFinish = () => {
    markInstallationCompleted('chrome');
    audioService.playChromeBoot();
    switchOS('chrome', 'desktop');
  };

  return (
    <div className="relative w-full h-full bg-[#1e293b] text-white flex flex-col items-center justify-center p-4 select-none overflow-y-auto font-sans">
      {/* Step 1: Welcome */}
      {step === 1 && (
        <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-7 shadow-2xl space-y-6 text-center animate-window">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 via-emerald-500 to-amber-500 p-0.5 mx-auto shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
              <ChromeIcon className="w-9 h-9 text-blue-400" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">Welcome to your Chromebook</h2>
            <p className="text-xs text-slate-400 mt-1">Fast, secure and cloud-ready for students</p>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-2xl text-xs text-slate-300">
            SarlaYash Mobile Virtual Lab — ChromeOS Edition
          </div>

          <button
            onClick={() => { audioService.playClick(); setStep(2); }}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 font-bold rounded-2xl text-xs shadow-lg flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Connect to Network */}
      {step === 2 && (
        <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-7 shadow-2xl space-y-5 animate-window">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <Wifi className="w-6 h-6 text-blue-400" />
            <div>
              <h2 className="text-base font-bold">Connect to network</h2>
              <p className="text-xs text-slate-400">Select virtual student campus Wi-Fi</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-2xl bg-blue-600/20 border border-blue-500 flex items-center justify-between font-semibold text-white">
              <span>SarlaYash-Fast-Campus (Virtual)</span>
              <span className="text-[10px] text-blue-400">Connected</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between text-slate-400">
              <span>Student_Hostel_5G</span>
              <Wifi className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button onClick={() => setStep(1)} className="text-xs text-slate-400 hover:text-white">Back</button>
            <button
              onClick={() => { audioService.playClick(); setStep(3); }}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 font-bold rounded-2xl text-xs shadow-md"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Google Account Sign-In */}
      {step === 3 && (
        <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-7 shadow-2xl space-y-5 animate-window">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <User className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold">Sign in to your Chromebook</h2>
              <p className="text-xs text-slate-400">Enter your student education credentials</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Email or phone:</label>
              <input
                type="text"
                readOnly
                value={`${(learnerName || 'student').toLowerCase().replace(/\s+/g, '')}@sarlayash.edu`}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono"
              />
            </div>
            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700 text-[11px] text-slate-400 space-y-1">
              <span className="font-semibold text-slate-200">Pre-configured Student Cloud Drive</span>
              <p>Includes Google Drive integration, Chrome Browser sync, and Crostini Linux container.</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button onClick={() => setStep(2)} className="text-xs text-slate-400 hover:text-white">Back</button>
            <button
              onClick={() => { audioService.playClick(); setStep(4); }}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 font-bold rounded-2xl text-xs shadow-md"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 4: You're all set */}
      {step === 4 && (
        <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-7 shadow-2xl space-y-5 text-center animate-window">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <Check className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">You're all set!</h2>
            <p className="text-xs text-slate-400 mt-1">Your Chromebook is ready to use.</p>
          </div>

          <div className="p-3 bg-slate-800/60 rounded-2xl text-xs text-slate-300">
            Enjoy cloud apps, the Chrome Launcher, and Crostini Linux terminal on your smartphone.
          </div>

          <button
            onClick={handleFinish}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 font-bold rounded-2xl text-xs shadow-xl transition-transform hover:scale-[1.02]"
          >
            Get Started with ChromeOS
          </button>
        </div>
      )}
    </div>
  );
};

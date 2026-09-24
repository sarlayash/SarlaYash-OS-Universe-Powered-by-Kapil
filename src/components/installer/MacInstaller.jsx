// Apple macOS Setup Assistant Simulator
// Experience: Apple Boot Logo -> "Hello" Animation -> Region -> Apple ID -> Computer Account -> Look -> Desktop

import React, { useState, useEffect } from 'react';
import { 
  Apple, 
  ArrowRight, 
  Check, 
  Moon, 
  Sun, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useLearner } from '../../context/LearnerContext';
import { useOS } from '../../context/OSContext';
import { audioService } from '../../services/audioService';

const HELLO_WORDS = ['Hello', 'नमस्ते', 'Bonjour', 'Hola', 'Ciao', 'こんにちは', 'Guten Tag'];

export const MacInstaller = () => {
  const { learnerName, markInstallationCompleted } = useLearner();
  const { switchOS } = useOS();

  const [step, setStep] = useState(1); // 1: Boot, 2: Hello, 3: Region, 4: Account, 5: Look, 6: SettingUp
  const [helloIndex, setHelloIndex] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState('dark');

  // Cycle Hello languages
  useEffect(() => {
    if (step === 2) {
      const timer = setInterval(() => {
        setHelloIndex(prev => (prev + 1) % HELLO_WORDS.length);
      }, 1200);
      return () => clearInterval(timer);
    }
  }, [step]);

  const handleFinish = () => {
    markInstallationCompleted('macos');
    audioService.playMacBoot();
    switchOS('macos', 'desktop');
  };

  return (
    <div className="relative w-full h-full bg-slate-950 text-white flex flex-col items-center justify-center p-4 select-none overflow-y-auto font-sans">
      {/* Step 1: Apple Boot Screen */}
      {step === 1 && (
        <div className="flex flex-col items-center space-y-10 animate-window">
          <Apple className="w-20 h-20 text-white" />
          <div className="w-56 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full animate-[pulseGlow_1.5s_infinite] w-3/4" />
          </div>
          <button
            onClick={() => { audioService.playClick(); setStep(2); }}
            className="px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-semibold"
          >
            Launch Setup Assistant
          </button>
        </div>
      )}

      {/* Step 2: "Hello" Typography Animation */}
      {step === 2 && (
        <div className="flex flex-col items-center space-y-8 animate-window text-center">
          <div className="text-5xl sm:text-6xl font-serif font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 min-h-[80px] flex items-center">
            {HELLO_WORDS[helloIndex]}
          </div>
          <p className="text-xs text-slate-400">Welcome to macOS Sonoma Lab</p>
          <button
            onClick={() => { audioService.playClick(); setStep(3); }}
            className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-400 flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Step 3: Select Country or Region */}
      {step === 3 && (
        <div className="w-full max-w-md bg-slate-900/80 border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5 backdrop-blur-xl animate-window">
          <div className="text-center space-y-1">
            <Apple className="w-8 h-8 mx-auto text-white mb-2" />
            <h2 className="text-base font-bold">Select Your Country or Region</h2>
            <p className="text-xs text-slate-400">Sets your system time, units and formats</p>
          </div>

          <div className="max-h-48 overflow-y-auto border border-slate-800 rounded-xl divide-y divide-slate-800 text-xs">
            {['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'Singapore'].map((r, i) => (
              <div key={r} className={`p-2.5 cursor-pointer flex items-center justify-between ${i === 0 ? 'bg-blue-600/30 text-blue-400 font-bold' : 'hover:bg-slate-800 text-slate-300'}`}>
                <span>{r}</span>
                {i === 0 && <Check className="w-3.5 h-3.5 text-blue-400" />}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button onClick={() => setStep(2)} className="text-xs text-slate-400 hover:text-white">Back</button>
            <button
              onClick={() => { audioService.playClick(); setStep(4); }}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 font-semibold rounded-full text-xs shadow-md"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Create Computer Account */}
      {step === 4 && (
        <div className="w-full max-w-md bg-slate-900/80 border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 backdrop-blur-xl animate-window">
          <div className="text-center space-y-1">
            <h2 className="text-base font-bold">Create a Computer Account</h2>
            <p className="text-xs text-slate-400">Your account will be an administrator</p>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Full Name:</label>
              <input
                type="text"
                readOnly
                value={learnerName || 'Student'}
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-semibold"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Account Name:</label>
              <input
                type="text"
                readOnly
                value={(learnerName || 'student').toLowerCase().replace(/\s+/g, '')}
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Password:</label>
              <input
                type="password"
                readOnly
                value="••••••••"
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button onClick={() => setStep(3)} className="text-xs text-slate-400 hover:text-white">Back</button>
            <button
              onClick={() => { audioService.playClick(); setStep(5); }}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 font-semibold rounded-full text-xs shadow-md"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Choose Your Look */}
      {step === 5 && (
        <div className="w-full max-w-md bg-slate-900/80 border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5 backdrop-blur-xl animate-window">
          <div className="text-center space-y-1">
            <h2 className="text-base font-bold">Choose Your Look</h2>
            <p className="text-xs text-slate-400">Select a light or dark appearance for macOS</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div
              onClick={() => setSelectedTheme('light')}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                selectedTheme === 'light' ? 'bg-white/15 border-blue-500 ring-2 ring-blue-500' : 'bg-slate-800/60 border-slate-700'
              }`}
            >
              <Sun className="w-6 h-6 text-amber-400 mb-2" />
              <span className="font-semibold text-white">Light Mode</span>
            </div>
            <div
              onClick={() => setSelectedTheme('dark')}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                selectedTheme === 'dark' ? 'bg-white/15 border-blue-500 ring-2 ring-blue-500' : 'bg-slate-800/60 border-slate-700'
              }`}
            >
              <Moon className="w-6 h-6 text-indigo-400 mb-2" />
              <span className="font-semibold text-white">Dark Mode</span>
            </div>
          </div>

          <button
            onClick={handleFinish}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-bold rounded-full text-xs shadow-xl transition-transform hover:scale-[1.02]"
          >
            Finish & Launch macOS Desktop
          </button>
        </div>
      )}
    </div>
  );
};

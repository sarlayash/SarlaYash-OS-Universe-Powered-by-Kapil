// 24-Hour Academic Integrity Lockout Screen
// SarlaYash OS Universe — Powered by Kapil
// Displays unbypassable lockout banner when cheating violation occurs, with real-time countdown,
// incident dossier, dispatched email confirmations to kapilnarula27july@gmail.com & namaste@sarlayash.com,
// and Founder PIN override for administrative review and testing.

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Siren, 
  Lock, 
  Clock, 
  Mail, 
  CheckCircle2, 
  AlertTriangle, 
  Key, 
  Check, 
  X,
  FileText
} from 'lucide-react';
import { useLearner } from '../../context/LearnerContext';
import { audioService } from '../../services/audioService';

export const SecurityLockoutScreen = () => {
  const { 
    learnerName, 
    lockoutUntil, 
    lockoutReason, 
    lockoutIncident, 
    unlockCheatingLockout 
  } = useLearner();

  const [remainingSec, setRemainingSec] = useState(() => {
    if (!lockoutUntil) return 0;
    return Math.max(0, Math.floor((lockoutUntil - Date.now()) / 1000));
  });

  // Admin PIN Unlock state
  const [showAdminPinModal, setShowAdminPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [copiedIncident, setCopiedIncident] = useState(false);

  // Live 1-second countdown ticker
  useEffect(() => {
    if (!lockoutUntil) return;

    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((lockoutUntil - Date.now()) / 1000));
      setRemainingSec(diff);
      if (diff <= 0) {
        clearInterval(interval);
        unlockCheatingLockout();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutUntil, unlockCheatingLockout]);

  const hours = Math.floor(remainingSec / 3600);
  const minutes = Math.floor((remainingSec % 3600) / 60);
  const seconds = remainingSec % 60;

  const handleAdminUnlock = (e) => {
    e.preventDefault();
    const cleanPin = pinInput.trim().toLowerCase();
    // Authorized PINs: 2707 (Kapil Narula 27 July), sarlayash, kapil
    if (cleanPin === '2707' || cleanPin === 'sarlayash' || cleanPin === 'kapil') {
      audioService.playSuccess();
      unlockCheatingLockout();
    } else {
      audioService.playError();
      setPinError(true);
      setTimeout(() => setPinError(false), 3000);
    }
  };

  const handleCopyIncidentDossier = () => {
    const text = `SARLAYASH OS UNIVERSE - SECURITY INCIDENT REPORT
--------------------------------------------------
Incident ID: ${lockoutIncident?.incidentId || 'SEC-INC-PROCTOR'}
Learner Name: ${learnerName || 'Student'}
Violation: ${lockoutReason || 'Proctoring Security Breach'}
Incident Time: ${lockoutIncident?.formattedTime || new Date().toLocaleString()}
Account Locked Until: ${lockoutIncident?.lockoutUntilFormatted || new Date(lockoutUntil).toLocaleString()}
Dispatched To: kapilnarula27july@gmail.com, namaste@sarlayash.com
Status: ACCOUNT ACCESS SUSPENDED (24 HOURS)
--------------------------------------------------`;
    navigator.clipboard?.writeText(text);
    setCopiedIncident(true);
    setTimeout(() => setCopiedIncident(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-slate-950 text-white flex flex-col items-center justify-center p-4 sm:p-8 select-none overflow-y-auto">
      {/* Background Pulsing Red Glow */}
      <div className="absolute inset-0 bg-radial from-red-950/40 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl bg-slate-900/95 border-2 border-red-600/70 rounded-3xl shadow-[0_0_50px_rgba(220,38,38,0.35)] overflow-hidden my-auto animate-window flex flex-col">
        {/* Top Emergency Siren Banner */}
        <div className="p-4 bg-gradient-to-r from-red-700 via-rose-700 to-red-800 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2.5">
            <Siren className="w-5 h-5 text-white animate-bounce" />
            <span className="font-extrabold text-white text-xs sm:text-sm uppercase tracking-wider">
              Academic Integrity Enforcement System
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-black/40 border border-white/20 text-[11px] font-mono font-bold text-amber-200">
            24-HOUR LOCKOUT ACTIVE
          </span>
        </div>

        {/* Modal Core Content */}
        <div className="p-5 sm:p-8 space-y-6 text-center">
          {/* Pulsing Lock Icon */}
          <div className="relative w-20 h-20 rounded-3xl bg-red-600/20 border-2 border-red-500/60 flex items-center justify-center mx-auto shadow-2xl">
            <ShieldAlert className="w-10 h-10 text-red-400" />
            <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-red-600 text-white shadow">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ACCOUNT LOCKED FOR 24 HOURS
            </h1>
            <p className="text-xs sm:text-sm text-red-300 font-medium max-w-lg mx-auto">
              A serious proctoring violation was detected during your examination. Access to all OS labs, simulators, challenges, and certifications is completely restricted.
            </p>
          </div>

          {/* Live Remaining Time Countdown */}
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/50 space-y-2">
            <div className="text-[11px] font-bold text-red-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Clock className="w-4 h-4 text-red-400 animate-spin" />
              <span>Lockout Countdown Timer</span>
            </div>
            <div className="font-mono text-2xl sm:text-4xl font-black text-white tracking-wider flex items-center justify-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950 border border-red-500/40 min-w-[64px]">
                <span>{String(hours).padStart(2, '0')}</span>
                <span className="block text-[9px] text-slate-400 font-sans uppercase">Hours</span>
              </div>
              <span className="text-red-500">:</span>
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950 border border-red-500/40 min-w-[64px]">
                <span>{String(minutes).padStart(2, '0')}</span>
                <span className="block text-[9px] text-slate-400 font-sans uppercase">Mins</span>
              </div>
              <span className="text-red-500">:</span>
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950 border border-red-500/40 min-w-[64px]">
                <span>{String(seconds).padStart(2, '0')}</span>
                <span className="block text-[9px] text-slate-400 font-sans uppercase">Secs</span>
              </div>
            </div>
          </div>

          {/* Email Notification Confirmation Card */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Automated Disciplinary Notifications Dispatched To:</span>
            </div>
            <div className="space-y-1.5 pl-6">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Founder & Director: <strong className="text-white font-mono">kapilnarula27july@gmail.com</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Disciplinary Committee: <strong className="text-white font-mono">namaste@sarlayash.com</strong></span>
              </div>
            </div>
          </div>

          {/* Incident Dossier Table */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 text-left text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
              <span className="font-bold text-slate-300 uppercase tracking-wide">Incident Dossier</span>
              <span className="font-mono text-blue-400 font-semibold">{lockoutIncident?.incidentId || 'SEC-PROCTOR-ACTIVE'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
              <div>
                <span className="text-slate-500 block">Learner Name:</span>
                <strong className="text-white">{learnerName || 'Student'}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Status:</span>
                <strong className="text-red-400 font-bold">DISQUALIFIED (Score: 0%)</strong>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block">Violation Reason:</span>
                <span className="text-red-300 font-medium">{lockoutReason || 'Tab switch / unauthorized application focus shift detected.'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Lockout Start:</span>
                <span>{lockoutIncident?.formattedTime || new Date().toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Lockout Release:</span>
                <span className="text-emerald-400 font-semibold">{lockoutIncident?.lockoutUntilFormatted || new Date(lockoutUntil).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons & Founder Override */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handleCopyIncidentDossier}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>{copiedIncident ? 'Dossier Copied!' : 'Copy Incident Report'}</span>
            </button>

            {/* Founder Emergency Admin Unlock Button */}
            <button
              onClick={() => setShowAdminPinModal(true)}
              className="px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 border border-red-600/50 text-xs font-semibold text-red-300 flex items-center gap-1.5 transition-all"
            >
              <Key className="w-3.5 h-3.5 text-red-400" />
              <span>Founder Admin Unlock</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin PIN Unlock Modal */}
      {showAdminPinModal && (
        <div className="fixed inset-0 z-[10001] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 shadow-2xl text-center animate-window">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
              <Key className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Founder Emergency Override</h3>
              <p className="text-xs text-slate-400">
                Enter Kapil Narula's administrative PIN to immediately lift the 24-hour lockout for testing or review.
              </p>
            </div>

            <form onSubmit={handleAdminUnlock} className="space-y-3">
              <input
                type="password"
                placeholder="Enter PIN (e.g. 2707)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                autoFocus
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-center text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />

              {pinError && (
                <div className="text-xs text-red-400 font-semibold animate-shake">
                  Invalid PIN. Access denied.
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAdminPinModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white shadow-lg"
                >
                  Unlock Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

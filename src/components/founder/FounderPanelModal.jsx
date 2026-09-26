// Founder Dashboard, Anti-Cheat Disciplinary Auditing & Telemetry Panel
// Recipient 1: kapilnarula27july@gmail.com
// Recipient 2: namaste@sarlayash.com
// Provides Kapil Narula with real-time audit logs of all cheating violations,
// 24-hour lockout status management, and manual dispatch test tools.

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert,
  Siren,
  X, 
  Send, 
  Mail, 
  Smartphone, 
  Laptop, 
  CheckCircle2, 
  RotateCw, 
  FileText,
  Clock,
  Sparkles,
  Lock,
  Unlock,
  AlertTriangle
} from 'lucide-react';
import { emailService } from '../../services/emailService';
import { useLearner } from '../../context/LearnerContext';
import { audioService } from '../../services/audioService';

export const FounderPanelModal = ({ isOpen, onClose }) => {
  const { 
    isCurrentlyLocked, 
    lockoutUntil, 
    lockoutReason, 
    lockoutIncident,
    unlockCheatingLockout,
    applyCheatingLockout,
    learnerName 
  } = useLearner();

  const [logs, setLogs] = useState(() => emailService.getAllTelemetryLogs());
  const [cheatingLogs, setCheatingLogs] = useState(() => emailService.getCheatingLogs());
  const [installInfo, setInstallInfo] = useState(() => emailService.getInstallTelemetry());
  
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const [isSendingCheatingTest, setIsSendingCheatingTest] = useState(false);
  const [cheatingTestResult, setCheatingTestResult] = useState(null);

  if (!isOpen) return null;

  // Send general telemetry test ping
  const handleSendTestPing = async () => {
    setIsSendingTest(true);
    setTestResult(null);
    const res = await emailService.sendTestNotification('Admin verification from Founder Panel');
    setIsSendingTest(false);
    setTestResult(res);
    setLogs(emailService.getAllTelemetryLogs());
  };

  // Send test cheating breach alert to both kapilnarula27july@gmail.com & namaste@sarlayash.com
  const handleSendCheatingTestAlert = async () => {
    setIsSendingCheatingTest(true);
    setCheatingTestResult(null);
    const res = await emailService.sendTestCheatingAlert(learnerName || 'Kapil Narula (Test Learner)');
    setIsSendingCheatingTest(false);
    setCheatingTestResult(res);
    setCheatingLogs(emailService.getCheatingLogs());
    setLogs(emailService.getAllTelemetryLogs());
  };

  // Trigger test 24-hour lockout
  const handleSimulateLockout = () => {
    applyCheatingLockout({
      reason: 'Administrator simulated test breach (Tab switch violation test)',
      incidentData: {
        violationType: 'SIMULATED_ADMIN_TEST',
        violationReason: 'Administrator simulated test breach',
        formattedTime: new Date().toLocaleString(),
        lockoutUntilFormatted: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()
      }
    });
    audioService.playSecurityAlarm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto select-none">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100 my-auto animate-window">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 text-emerald-400 border border-emerald-500/30">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Founder Telemetry & Security Oversight Portal</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Kapil Narula
                </span>
              </h2>
              <p className="text-xs text-slate-400">Silent installations, anti-cheat notifications & 24-hour lockout controls</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[75vh] space-y-6">
          
          {/* Notification Target Card */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="text-xs text-slate-400 uppercase font-bold tracking-wider flex items-center justify-between">
              <span>Dual Notification Recipients (Active & Linked)</span>
              <span className="text-emerald-400 text-[11px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 2 Target Endpoints
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-500 font-semibold">1. Founder Direct Inbox</div>
                <div className="font-mono text-emerald-400 font-bold">{emailService.getFounderEmail()}</div>
                <div className="text-[10px] text-slate-400">Receives silent installs and high-priority cheating reports.</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-500 font-semibold">2. Disciplinary Committee</div>
                <div className="font-mono text-emerald-400 font-bold">{emailService.getCommitteeEmail()}</div>
                <div className="text-[10px] text-slate-400">Receives academic integrity breach dossiers and violation logs.</div>
              </div>
            </div>
          </div>

          {/* 24-Hour Security Lockout Manager */}
          <div className={`p-4 rounded-2xl border space-y-3 transition-all ${
            isCurrentlyLocked 
              ? 'bg-red-950/40 border-red-500/60 text-red-200' 
              : 'bg-slate-950/70 border-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isCurrentlyLocked ? (
                  <Siren className="w-5 h-5 text-red-400 animate-bounce" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                )}
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Current Learner 24-Hour Lockout Status
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {isCurrentlyLocked 
                      ? 'Account is actively locked due to academic dishonesty.' 
                      : 'Account is clean and authorized for all labs.'}
                  </div>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono border ${
                isCurrentlyLocked 
                  ? 'bg-red-500/20 text-red-300 border-red-500/40' 
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              }`}>
                {isCurrentlyLocked ? 'LOCKED (24H ACTIVE)' : 'ACCESS PERMITTED'}
              </span>
            </div>

            {isCurrentlyLocked && (
              <div className="p-3 rounded-xl bg-slate-950 border border-red-500/30 space-y-1 text-xs">
                <div><strong>Reason:</strong> <span className="text-red-300">{lockoutReason}</span></div>
                <div><strong>Locked Until:</strong> <span className="text-white font-mono">{new Date(lockoutUntil).toLocaleString()}</span></div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {isCurrentlyLocked ? (
                <button
                  onClick={() => {
                    unlockCheatingLockout();
                    audioService.playSuccess();
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Lift 24-Hour Lockout Now (Admin Unlock)</span>
                </button>
              ) : (
                <button
                  onClick={handleSimulateLockout}
                  className="px-4 py-2 rounded-xl bg-red-950 hover:bg-red-900 border border-red-600/50 text-red-300 font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Simulate 24-Hour Lockout (Test Lockout Screen)</span>
                </button>
              )}
            </div>
          </div>

          {/* Cheating Alert Trigger & Live Test */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/30 via-slate-900 to-slate-900 border border-red-500/40 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>Test Cheating Notification Dispatch</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Sends an immediate incident email to both <strong className="text-slate-300">kapilnarula27july@gmail.com</strong> and <strong className="text-slate-300">namaste@sarlayash.com</strong>.
                </div>
              </div>

              <button
                disabled={isSendingCheatingTest}
                onClick={handleSendCheatingTestAlert}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 disabled:opacity-50 shrink-0"
              >
                {isSendingCheatingTest ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>{isSendingCheatingTest ? 'Dispatching...' : 'Dispatch Cheating Alert Email'}</span>
              </button>
            </div>

            {cheatingTestResult && (
              <div className="p-3 rounded-xl bg-slate-950 border border-red-500/40 text-[11px] text-emerald-400 flex items-center gap-2 animate-window">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{cheatingTestResult.message}</span>
              </div>
            )}
          </div>

          {/* Cheating Audit Trail (Academic Integrity Log) */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                <span>Anti-Cheat Disciplinary Audit Trail</span>
              </span>
              <span className="text-slate-500 text-[11px]">{cheatingLogs.length} incidents logged</span>
            </div>

            <div className="max-h-48 overflow-y-auto space-y-2 border border-slate-800 rounded-xl p-2.5 bg-slate-950/60 text-xs">
              {cheatingLogs.length === 0 ? (
                <div className="text-center text-slate-500 py-3 text-[11px]">
                  No cheating violations recorded yet. All sessions clean.
                </div>
              ) : (
                cheatingLogs.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-red-950/30 border border-red-500/30 text-slate-300 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{item.learnerName} ({item.violationType})</span>
                      <span className="font-mono text-red-400 text-[10px]">{item.incidentId}</span>
                    </div>
                    <div className="text-[11px] text-red-300">{item.violationReason}</div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-red-900/40 pt-1 mt-1">
                      <span>{item.formattedTime || new Date(item.timestamp).toLocaleString()}</span>
                      <span className="text-emerald-400 font-semibold">Dispatched to 2 Emails</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Standard Installation Telemetry Audit Trail */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Installation & First-Launch Audit Trail</span>
              <span className="text-slate-500 text-[11px]">{logs.length} logged</span>
            </div>
            <div className="max-h-36 overflow-y-auto space-y-1.5 border border-slate-800 rounded-xl p-2 bg-slate-950/50">
              {logs.length === 0 ? (
                <div className="text-center text-xs text-slate-500 py-3">No telemetry logged yet</div>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-200">{log.event}</span>
                      <span className="text-slate-500 ml-2">({log.deviceType})</span>
                    </div>
                    <span className="font-mono text-emerald-400 text-[10px]">{log.installationId}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
};

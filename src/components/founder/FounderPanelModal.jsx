// Founder Dashboard & Telemetry Alert Panel
// For Kapil Narula (kapilnarula27july@gmail.com)

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  Send, 
  Mail, 
  Smartphone, 
  Laptop, 
  CheckCircle2, 
  RotateCw, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { emailService } from '../../services/emailService';

export const FounderPanelModal = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState(() => emailService.getAllTelemetryLogs());
  const [installInfo, setInstallInfo] = useState(() => emailService.getInstallTelemetry());
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const handleSendTestPing = async () => {
    setIsSendingTest(true);
    setTestResult(null);
    const res = await emailService.sendTestNotification('Admin verification from Founder Panel');
    setIsSendingTest(false);
    setTestResult(res);
    setLogs(emailService.getAllTelemetryLogs());
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto select-none">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100 my-auto animate-window">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Founder Telemetry & Alert Portal</h2>
              <p className="text-xs text-slate-400">Silent installation notifications for Kapil Narula</p>
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
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[70vh] space-y-5">
          {/* Notification Target Card */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">
              Notification Recipient
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-semibold text-emerald-400">
                {emailService.getFounderEmail()}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Active & Configured</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Every time a student opens or installs SarlaYash OS Universe, an alert is silently recorded and pushed in the background without disturbing the learner.
            </p>
          </div>

          {/* Current Install Telemetry */}
          {installInfo && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Current Device First-Launch Telemetry
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Installation ID:</span>
                  <span className="font-mono font-semibold text-blue-400">{installInfo.installationId}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Device Type:</span>
                  <span className="font-semibold text-white">{installInfo.deviceType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Learner Name:</span>
                  <span className="font-semibold text-white">{installInfo.learnerName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">App Version:</span>
                  <span className="font-mono text-slate-300">{installInfo.appVersion}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Timestamp:</span>
                  <span className="text-slate-300">{installInfo.deliveredAt || new Date(installInfo.timestamp).toLocaleTimeString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Delivery Status:</span>
                  <span className="text-emerald-400 font-semibold">{installInfo.deliveryMethod}</span>
                </div>
              </div>
            </div>
          )}

          {/* Test Send Trigger */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Test Founder Alert Push</div>
                <div className="text-[11px] text-slate-400">Trigger a live test email alert to {emailService.getFounderEmail()}</div>
              </div>
              <button
                disabled={isSendingTest}
                onClick={handleSendTestPing}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSendingTest ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>{isSendingTest ? 'Sending...' : 'Send Test Alert'}</span>
              </button>
            </div>

            {testResult && (
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-[11px] text-emerald-400 flex items-center gap-1.5 animate-window">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{testResult.message}</span>
              </div>
            )}
          </div>

          {/* Telemetry Logs Audit Trail */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Audit Trail (Recent Telemetry)</span>
              <span className="text-slate-500 text-[11px]">{logs.length} logged</span>
            </div>
            <div className="max-h-40 overflow-y-auto space-y-1.5 border border-slate-800 rounded-xl p-2 bg-slate-950/50">
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

// QR-Verifiable Certificate Generator, Demo Preview & Verification Portal
// SarlaYash OS Universe — Powered by Kapil
// Strict Lock Enforcement: 4 OS Installs + 4 Desktops Explored + 120-min 500Q Exam Passed (≥90%)

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  X, 
  Sparkles, 
  Award, 
  Search, 
  CheckCircle2, 
  QrCode, 
  Check,
  Lock,
  AlertCircle,
  FileText,
  Image,
  ArrowRight,
  Laptop,
  Terminal,
  Apple
} from 'lucide-react';
import { ChromeIcon } from '../icons/ChromeIcon';
import { useLearner } from '../../context/LearnerContext';
import { certificateService } from '../../services/certificateService';

export const CertificateModal = ({ isOpen, onClose, onOpenAssessment }) => {
  const { 
    learnerName, 
    installedOS, 
    exploredOS, 
    allOSInstalled,
    allOSExplored,
    mockExamScore, 
    isMockExamPassed,
    isCertificateUnlocked, 
    issuedCertificate, 
    generateOfficialCertificate 
  } = useLearner();

  const [activeTab, setActiveTab] = useState('certificate'); // 'certificate' | 'requirements' | 'verify'
  const [certData, setCertData] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingPNG, setIsGeneratingPNG] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  // Verification lookup state
  const [lookupId, setLookupId] = useState('');
  const [lookupResult, setLookupResult] = useState(null);
  const [searched, setSearched] = useState(false);

  // Fetch or generate certificate on open
  useEffect(() => {
    if (!isOpen) return;

    if (isCertificateUnlocked) {
      if (issuedCertificate) {
        setCertData(issuedCertificate);
      } else {
        generateOfficialCertificate(false).then(c => setCertData(c));
      }
    } else {
      // Generate Demo Preview Certificate data
      generateOfficialCertificate(true).then(c => setCertData(c));
    }
  }, [isOpen, isCertificateUnlocked, issuedCertificate]);

  if (!isOpen) return null;

  const fileNamePrefix = `SarlaYash_${isCertificateUnlocked ? 'Official' : 'DemoPreview'}_Certificate_${(learnerName || 'Student').replace(/\s+/g, '_')}`;

  // Download PDF
  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    setDownloadSuccess(null);
    const success = await certificateService.downloadCertificatePDF(
      'sarlayash-certificate-canvas',
      `${fileNamePrefix}.pdf`
    );
    setIsGeneratingPDF(false);
    if (success) {
      setDownloadSuccess('PDF Certificate Downloaded Successfully!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    }
  };

  // Download PNG
  const handleDownloadPNG = async () => {
    setIsGeneratingPNG(true);
    setDownloadSuccess(null);
    const success = await certificateService.downloadCertificatePNG(
      'sarlayash-certificate-canvas',
      `${fileNamePrefix}.png`
    );
    setIsGeneratingPNG(false);
    if (success) {
      setDownloadSuccess('PNG Certificate Downloaded Successfully!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    }
  };

  // Verification Lookup
  const handleVerifyLookup = (e) => {
    e.preventDefault();
    if (!lookupId.trim()) return;
    const cleanId = lookupId.trim().toUpperCase();
    const res = certificateService.getCertificateById(cleanId);
    setLookupResult(res);
    setSearched(true);
  };

  const allFourOS = [
    { id: 'windows', name: 'Windows 11', icon: Laptop, color: 'text-blue-400' },
    { id: 'linux', name: 'Ubuntu Linux', icon: Terminal, color: 'text-orange-400' },
    { id: 'macos', name: 'macOS Sonoma', icon: Apple, color: 'text-purple-400' },
    { id: 'chrome', name: 'ChromeOS', icon: ChromeIcon, color: 'text-emerald-400' }
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-5 bg-slate-950/90 backdrop-blur-md overflow-y-auto select-none">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100 my-auto animate-window">
        
        {/* ======================================================== */}
        {/* MODAL HEADER                                             */}
        {/* ======================================================== */}
        <div className="p-3.5 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${
              isCertificateUnlocked
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}>
              {isCertificateUnlocked ? <Award className="w-5 h-5" /> : <Lock className="w-5 h-5 text-amber-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white">
                  SarlaYash Certificate Portal
                </h2>
                {isCertificateUnlocked ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Unlocked & Verified
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Locked • Demo Preview
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 hidden xs:block">
                QR-Verifiable Practical Computer Systems Credential • Powered by Kapil
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tabs */}
            <div className="flex bg-slate-800 p-0.5 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => setActiveTab('certificate')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  activeTab === 'certificate' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isCertificateUnlocked ? 'Certificate' : 'Demo Preview'}
              </button>
              <button
                onClick={() => setActiveTab('requirements')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  activeTab === 'requirements' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Criteria
              </button>
              <button
                onClick={() => setActiveTab('verify')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  activeTab === 'verify' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Verify ID
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MODAL BODY CONTENT                                       */}
        {/* ======================================================== */}
        <div className="p-3.5 sm:p-6 overflow-y-auto max-h-[78vh] space-y-4">
          
          {/* TAB 1: CERTIFICATE CANVAS (OFFICIAL OR DEMO PREVIEW) */}
          {activeTab === 'certificate' && certData && (
            <div className="space-y-4">
              
              {/* Status Banner when locked */}
              {!isCertificateUnlocked && (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-300">Official Certificate is Locked: </span>
                      <span className="text-slate-300">
                        Showing <strong>Demo Preview</strong>. To unlock the authentic credential, complete all 4 OS labs and score ≥ 90% on the 120-min 500Q assessment.
                      </span>
                    </div>
                  </div>
                  {onOpenAssessment && (
                    <button
                      onClick={onOpenAssessment}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0 shadow-md flex items-center gap-1.5"
                    >
                      <span>Take 120-Min Exam</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* Status Banner when unlocked */}
              {isCertificateUnlocked && (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold">Credential Authenticated & Unlocked: </span>
                    <span className="text-slate-300">
                      All criteria satisfied with a distinction score of {certData.score}%. Your certificate is official and registered in the verification system.
                    </span>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* CERTIFICATE RENDERABLE CANVAS                            */}
              {/* ======================================================== */}
              <div
                id="sarlayash-certificate-canvas"
                style={{
                  backgroundColor: '#ffffff',
                  backgroundImage: 'radial-gradient(circle at 50% 50%, #fffdf7 0%, #fefcf3 100%)',
                  color: '#0f172a',
                  borderColor: '#d97706'
                }}
                className="relative border-8 p-5 sm:p-10 rounded-2xl shadow-2xl space-y-5 text-center select-text overflow-hidden"
              >
                {/* Guilloche / Elegant Corner Decor */}
                <div style={{ borderColor: '#d97706' }} className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2" />
                <div style={{ borderColor: '#d97706' }} className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2" />
                <div style={{ borderColor: '#d97706' }} className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2" />
                <div style={{ borderColor: '#d97706' }} className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2" />

                {/* DEMO PREVIEW DIAGONAL WATERMARK OVERLAY */}
                {!isCertificateUnlocked && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20 overflow-hidden">
                    <div
                      style={{
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(254, 242, 242, 0.85)',
                        color: '#b91c1c'
                      }}
                      className="transform -rotate-25 border-4 border-dashed px-8 py-3 rounded-2xl shadow-xl"
                    >
                      <div style={{ color: '#dc2626' }} className="text-2xl sm:text-4xl font-black tracking-widest uppercase font-mono">
                        DEMO PREVIEW • SAMPLE ONLY
                      </div>
                      <div style={{ color: '#991b1b' }} className="text-[10px] sm:text-xs font-bold tracking-wider uppercase mt-0.5">
                        PASS 120-MIN 500Q EXAM (≥90%) + COMPLETE ALL 4 OS TO UNLOCK OFFICIAL CREDENTIAL
                      </div>
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="space-y-1 relative z-10">
                  <div
                    style={{ backgroundColor: '#fef3c7', color: '#92400e', borderColor: '#fcd34d' }}
                    className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border"
                  >
                    {isCertificateUnlocked ? 'OFFICIAL CERTIFICATE OF PRACTICAL MASTERY' : 'DEMO PREVIEW • CERTIFICATE OF PRACTICAL MASTERY'}
                  </div>
                  <h1 style={{ color: '#0f172a' }} className="text-2xl sm:text-4xl font-serif font-black tracking-tight mt-1">
                    SarlaYash OS Universe
                  </h1>
                  <p style={{ color: '#92400e' }} className="text-xs sm:text-sm font-semibold tracking-wide uppercase">
                    Mobile-First Virtual Computer Lab • Powered by Kapil
                  </p>
                </div>

                {/* Recipient */}
                <div className="space-y-1 py-1 relative z-10">
                  <p style={{ color: '#64748b' }} className="text-xs italic">This credential is conferred upon</p>
                  <div
                    style={{ color: '#020617', borderColor: '#d97706' }}
                    className="text-2xl sm:text-3xl font-serif font-bold border-b-2 pb-1 max-w-md mx-auto"
                  >
                    {certData.learnerName || learnerName || 'Student Learner'}
                  </div>
                </div>

                {/* Achievement Description */}
                <p style={{ color: '#334155' }} className="text-xs sm:text-sm max-w-xl mx-auto leading-relaxed relative z-10">
                  For completing hands-on practical simulations across major operating systems including setup, disk partitioning, file system navigation, permissions administration, and successfully achieving distinction on the 120-minute 500-question Final Mock Assessment.
                </p>

                {/* Operating Systems Completed */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1 relative z-10">
                  {['Microsoft Windows 11', 'Ubuntu Linux 24.04', 'Apple macOS Sonoma', 'Google ChromeOS'].map((os) => (
                    <span
                      key={os}
                      style={{ backgroundColor: '#fffbeb', borderColor: '#fcd34d', color: '#78350f' }}
                      className="px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1 shadow-sm"
                    >
                      <CheckCircle2 style={{ color: '#d97706' }} className="w-3.5 h-3.5" />
                      <span>{os}</span>
                    </span>
                  ))}
                </div>

                {/* Footer Credentials & QR Code */}
                <div style={{ borderColor: '#cbd5e1' }} className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-left text-xs relative z-10">
                  {/* Left: Certificate Details */}
                  <div className="space-y-1">
                    <div style={{ color: '#334155' }} className="font-mono text-[11px]">
                      <strong>Certificate ID:</strong> {certData.id}
                    </div>
                    <div style={{ color: '#475569' }} className="text-[11px]">
                      <strong>500Q Final Score:</strong> {certData.score || mockExamScore || 100}% (Passing: 90%)
                    </div>
                    <div style={{ color: '#475569' }} className="text-[11px]">
                      <strong>Issued On:</strong> {certData.issueDate}
                    </div>
                    <div style={{ color: '#64748b' }} className="text-[10px] font-mono">
                      <strong>Status:</strong> {isCertificateUnlocked ? 'VERIFIED AUTHENTIC' : 'DEMO PREVIEW SAMPLE'}
                    </div>
                  </div>

                  {/* Center: Real Scannable QR Code */}
                  {certData.qrDataUrl && (
                    <div className="flex flex-col items-center">
                      <div style={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1' }} className="p-1 border rounded-lg shadow-sm">
                        <img
                          src={certData.qrDataUrl}
                          alt="Verification QR"
                          className="w-20 h-20 sm:w-24 sm:h-24"
                        />
                      </div>
                      <span style={{ color: '#64748b' }} className="text-[9px] font-mono mt-1">Scan to Verify</span>
                    </div>
                  )}

                  {/* Right: Signature Line */}
                  <div className="text-center sm:text-right space-y-1">
                    <div style={{ color: '#1e293b', borderColor: '#94a3b8' }} className="font-serif italic text-base border-b pb-0.5 font-bold">
                      Kapil Narula
                    </div>
                    <div style={{ color: '#334155' }} className="text-[11px] font-bold">Kapil Narula</div>
                    <div style={{ color: '#64748b' }} className="text-[10px]">Founder & Educator • SarlaYash</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Download PDF and Download PNG */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-400">
                  {downloadSuccess ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5 animate-pulse">
                      <Check className="w-4 h-4" /> {downloadSuccess}
                    </span>
                  ) : (
                    <span>Downloadable high-resolution format for portfolios, resumes, and LinkedIn.</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Download PDF Button */}
                  <button
                    disabled={isGeneratingPDF || isGeneratingPNG}
                    onClick={handleDownloadPDF}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs shadow-lg flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    <FileText className="w-4 h-4" />
                    <span>
                      {isGeneratingPDF
                        ? 'Generating PDF...'
                        : isCertificateUnlocked
                        ? 'Download Official PDF'
                        : 'Download Preview PDF'}
                    </span>
                  </button>

                  {/* Download PNG Button */}
                  <button
                    disabled={isGeneratingPDF || isGeneratingPNG}
                    onClick={handleDownloadPNG}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Image className="w-4 h-4 text-amber-400" />
                    <span>
                      {isGeneratingPNG
                        ? 'Generating PNG...'
                        : isCertificateUnlocked
                        ? 'Download Official PNG'
                        : 'Download Preview PNG'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REQUIREMENTS & CRITERIA CHECKLIST */}
          {activeTab === 'requirements' && (
            <div className="max-w-2xl mx-auto space-y-5 py-2">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  Official Certificate Completion Checklist
                </h3>
                <p className="text-xs text-slate-400">
                  All three requirements must be 100% completed to unlock the official authenticated certificate.
                </p>
              </div>

              <div className="space-y-3">
                {/* Requirement 1: 4 OS Installations */}
                <div className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
                  allOSInstalled ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-slate-800/40 border-slate-700/80'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {allOSInstalled ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                      )}
                      <div>
                        <div className="font-bold text-white text-sm">1. Install All 4 Operating Systems</div>
                        <div className="text-[11px] text-slate-400">Complete the guided installation wizard for each OS</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-300">
                      {installedOS.length} / 4
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {allFourOS.map(os => {
                      const isDone = installedOS.includes(os.id);
                      return (
                        <div
                          key={os.id}
                          className={`p-2 rounded-xl border flex items-center gap-2 ${
                            isDone ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <div className="w-3.5 h-3.5 rounded-full border border-slate-600" />}
                          <span className="text-[11px] font-medium">{os.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Requirement 2: 4 Desktop Explorations */}
                <div className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
                  allOSExplored ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-slate-800/40 border-slate-700/80'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {allOSExplored ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                      )}
                      <div>
                        <div className="font-bold text-white text-sm">2. Explore All 4 Desktop Environments</div>
                        <div className="text-[11px] text-slate-400">Open file explorer, terminal, and system settings in each OS</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-300">
                      {exploredOS.length} / 4
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {allFourOS.map(os => {
                      const isDone = exploredOS.includes(os.id);
                      return (
                        <div
                          key={os.id}
                          className={`p-2 rounded-xl border flex items-center gap-2 ${
                            isDone ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <div className="w-3.5 h-3.5 rounded-full border border-slate-600" />}
                          <span className="text-[11px] font-medium">{os.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Requirement 3: 120-min 500Q Assessment Passed (>= 90%) */}
                <div className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
                  isMockExamPassed ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-slate-800/40 border-slate-700/80'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isMockExamPassed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <Lock className="w-5 h-5 text-amber-400 shrink-0" />
                      )}
                      <div>
                        <div className="font-bold text-white text-sm">3. Pass 120-Min 500Q Final Mock Assessment</div>
                        <div className="text-[11px] text-slate-400">
                          Strict passing threshold: <strong>90% (≥450 / 500 correct)</strong>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-mono text-xs font-bold ${isMockExamPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {mockExamScore !== null ? `${mockExamScore}%` : 'Not Attempted'}
                      </div>
                      <div className="text-[10px] text-slate-500">Need ≥ 90%</div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <p className="text-[11px] text-slate-400">
                      Covers Windows 11, Ubuntu Linux, macOS Sonoma, ChromeOS, and Cross-Platform Storage/Networking.
                    </p>
                    {onOpenAssessment && (
                      <button
                        onClick={onOpenAssessment}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 shrink-0"
                      >
                        <span>Launch 120-Min Exam</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CERTIFICATE VERIFICATION REGISTRY */}
          {activeTab === 'verify' && (
            <div className="max-w-md mx-auto space-y-5 py-4">
              <div className="text-center space-y-1">
                <QrCode className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-white">Certificate Verification Registry</h3>
                <p className="text-xs text-slate-400">
                  Enter any Certificate ID to confirm student authenticity, score, and issuance timestamp.
                </p>
              </div>

              <form onSubmit={handleVerifyLookup} className="flex gap-2">
                <input
                  type="text"
                  value={lookupId}
                  onChange={(e) => setLookupId(e.target.value)}
                  placeholder="e.g. SYOU-2026-XXXX"
                  className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-xs outline-none uppercase"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Verify</span>
                </button>
              </form>

              {searched && (
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs space-y-3 animate-window">
                  {lookupResult ? (
                    <>
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Valid SarlaYash Certificate Found!</span>
                      </div>
                      <div className="space-y-1.5 text-slate-300">
                        <div><strong>Student:</strong> {lookupResult.learnerName}</div>
                        <div><strong>Certificate ID:</strong> <span className="font-mono text-blue-400">{lookupResult.id}</span></div>
                        <div><strong>Assessment Score:</strong> {lookupResult.score}% (Passing: ≥90%)</div>
                        <div><strong>Issue Date:</strong> {lookupResult.issueDate}</div>
                        <div><strong>Issuer:</strong> SarlaYash OS Universe — Powered by Kapil</div>
                        <div className="pt-1">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            Verified Official Record
                          </span>
                        </div>
                      </div>
                    </>
                  ) : lookupId.toUpperCase().includes('DEMO') ? (
                    <div className="text-amber-400 text-center py-2 space-y-1">
                      <div className="font-bold flex items-center justify-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>Demo Preview Code Detected</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        This ID belongs to a demo preview sample. The learner must complete all sections and achieve ≥ 90% on the 120-minute exam to unlock an official record.
                      </p>
                    </div>
                  ) : (
                    <div className="text-amber-400 text-center py-2">
                      No certificate found matching ID "<strong>{lookupId}</strong>". Please verify the code and try again.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

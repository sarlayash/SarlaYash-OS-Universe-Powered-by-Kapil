// QR-Verifiable Certificate Generator & Verification Portal
// SarlaYash OS Universe — Powered by Kapil

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  X, 
  Download, 
  Sparkles, 
  Award, 
  Search, 
  CheckCircle2, 
  QrCode, 
  Printer,
  Check
} from 'lucide-react';
import { useLearner } from '../../context/LearnerContext';
import { certificateService } from '../../services/certificateService';

export const CertificateModal = ({ isOpen, onClose }) => {
  const { learnerName, installedOS, assessmentScore, earnedBadges, issuedCertificate, generateOfficialCertificate } = useLearner();

  const [activeTab, setActiveTab] = useState('certificate'); // 'certificate' | 'verify'
  const [certData, setCertData] = useState(issuedCertificate);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Verification lookup state
  const [lookupId, setLookupId] = useState('');
  const [lookupResult, setLookupResult] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (isOpen && !certData) {
      generateOfficialCertificate().then(c => setCertData(c));
    } else if (isOpen && issuedCertificate) {
      setCertData(issuedCertificate);
    }
  }, [isOpen, issuedCertificate]);

  if (!isOpen) return null;

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    setDownloadSuccess(false);
    const success = await certificateService.downloadCertificatePDF('sarlayash-certificate-canvas', `SarlaYash_Certificate_${(learnerName || 'Student').replace(/\s+/g, '_')}.pdf`);
    setIsGeneratingPDF(false);
    if (success) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }
  };

  const handleVerifyLookup = (e) => {
    e.preventDefault();
    if (!lookupId.trim()) return;
    const res = certificateService.getCertificateById(lookupId.trim());
    setLookupResult(res);
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto select-none">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100 my-auto animate-window">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">SarlaYash Official Certificate</h2>
              <p className="text-xs text-slate-400">QR-Verifiable Practical Computer Systems Credential</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-800 p-0.5 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => setActiveTab('certificate')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  activeTab === 'certificate' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Certificate
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
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[75vh]">
          {activeTab === 'certificate' && certData && (
            <div className="space-y-4">
              {/* Certificate Canvas / Renderable Template */}
              <div
                id="sarlayash-certificate-canvas"
                className="relative bg-gradient-to-br from-slate-50 via-amber-50/20 to-slate-100 text-slate-900 border-8 border-amber-600/30 p-6 sm:p-10 rounded-2xl shadow-xl space-y-6 text-center select-text"
              >
                {/* Guilloche / Elegant Corner Decor */}
                <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-amber-600" />
                <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-amber-600" />
                <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-amber-600" />
                <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-amber-600" />

                {/* Header */}
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-amber-100 text-amber-800 border border-amber-300">
                    CERTIFICATE OF PRACTICAL ACHIEVEMENT
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight mt-2">
                    SarlaYash OS Universe
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold tracking-wide text-amber-800 uppercase">
                    Mobile-First Virtual Computer Lab • Powered by Kapil
                  </p>
                </div>

                {/* Recipient */}
                <div className="space-y-1 py-1">
                  <p className="text-xs text-slate-500 italic">This is proudly awarded to</p>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 border-b-2 border-amber-500/60 pb-1 max-w-md mx-auto">
                    {certData.learnerName || learnerName || 'Student Learner'}
                  </div>
                </div>

                {/* Achievement Description */}
                <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
                  For completing hands-on practical simulations across major operating systems including setup, disk partitioning, file system navigation, permissions administration, and command line mastery.
                </p>

                {/* Operating Systems Completed */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  {['Microsoft Windows 11', 'Ubuntu Linux 24.04', 'Apple macOS Sonoma', 'Google ChromeOS'].map((os) => (
                    <span
                      key={os}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-600/30 text-[11px] font-semibold text-slate-800 flex items-center gap-1 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>{os}</span>
                    </span>
                  ))}
                </div>

                {/* Footer Credentials & QR Code */}
                <div className="pt-4 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-left text-xs">
                  {/* Left: Certificate Details */}
                  <div className="space-y-1">
                    <div className="font-mono text-[11px] text-slate-700">
                      <strong>Certificate ID:</strong> {certData.id}
                    </div>
                    <div className="text-[11px] text-slate-600">
                      <strong>Practical Score:</strong> {certData.score || assessmentScore || 100}%
                    </div>
                    <div className="text-[11px] text-slate-600">
                      <strong>Issued On:</strong> {certData.issueDate}
                    </div>
                  </div>

                  {/* Center: Real Scannable QR Code */}
                  {certData.qrDataUrl && (
                    <div className="flex flex-col items-center">
                      <div className="p-1 bg-white border border-slate-300 rounded-lg shadow-sm">
                        <img
                          src={certData.qrDataUrl}
                          alt="Verification QR"
                          className="w-20 h-20 sm:w-24 sm:h-24"
                        />
                      </div>
                      <span className="text-[9px] text-slate-500 font-mono mt-1">Scan to Verify</span>
                    </div>
                  )}

                  {/* Right: Signature Line */}
                  <div className="text-center sm:text-right space-y-1">
                    <div className="font-serif italic text-base text-slate-800 border-b border-slate-400 pb-0.5 font-bold">
                      Kapil Narula
                    </div>
                    <div className="text-[11px] font-bold text-slate-700">Kapil Narula</div>
                    <div className="text-[10px] text-slate-500">Founder & Educator • SarlaYash</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-400">
                  {downloadSuccess ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" /> Download Complete!
                    </span>
                  ) : (
                    <span>Downloadable high-resolution PDF for portfolio and resumes.</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={isGeneratingPDF}
                    onClick={handleDownloadPDF}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs shadow-lg flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isGeneratingPDF ? 'Generating PDF...' : 'Download Official PDF'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'verify' && (
            <div className="max-w-md mx-auto space-y-5 py-4">
              <div className="text-center space-y-1">
                <QrCode className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-white">Certificate Verification Registry</h3>
                <p className="text-xs text-slate-400">
                  Enter any Certificate ID to confirm learner authenticity and scores.
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
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
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
                      <div className="space-y-1 text-slate-300">
                        <div><strong>Student:</strong> {lookupResult.learnerName}</div>
                        <div><strong>Certificate ID:</strong> <span className="font-mono text-blue-400">{lookupResult.id}</span></div>
                        <div><strong>Practical Score:</strong> {lookupResult.score}%</div>
                        <div><strong>Issue Date:</strong> {lookupResult.issueDate}</div>
                        <div><strong>Issuer:</strong> SarlaYash OS Universe — Powered by Kapil</div>
                      </div>
                    </>
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

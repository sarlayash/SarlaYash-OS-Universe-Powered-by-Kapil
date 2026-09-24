// SarlaYash OS Universe - Certificate Generation & Verification Engine
// Powered by Kapil Narula

import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CERT_STORE_KEY = 'sarlayash_issued_certificates';

export const certificateService = {
  generateCertificateId() {
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const year = new Date().getFullYear();
    return `SYOU-${year}-${randomHex}`;
  },

  getAllCertificates() {
    try {
      const stored = localStorage.getItem(CERT_STORE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  },

  getCertificateById(certId) {
    const certs = this.getAllCertificates();
    return certs[certId.trim().toUpperCase()] || null;
  },

  async createCertificate({ learnerName, completedOS, score = 100, badges = [], isDemo = false }) {
    const rawId = this.generateCertificateId();
    const certId = isDemo ? `DEMO-PREVIEW-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}` : rawId;
    const issueDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Verification data embedded in QR
    const verifyPayload = {
      id: certId,
      name: learnerName,
      score: `${score}%`,
      issuer: 'SarlaYash OS Universe - Powered by Kapil',
      issuedOn: issueDate,
      systems: completedOS,
      criteria: isDemo
        ? 'DEMO PREVIEW ONLY - Complete all 4 OS and pass 120-min 500Q exam (≥90%) to unlock official credential'
        : '120-Min 500Q Assessment Passed (≥90%) + All 4 OS Labs Completed',
      status: isDemo ? 'PREVIEW_LOCKED' : 'VERIFIED_OFFICIAL'
    };

    // Generate real scannable QR Code
    let qrDataUrl = '';
    try {
      qrDataUrl = await QRCode.toDataURL(JSON.stringify(verifyPayload), {
        width: 220,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      });
    } catch (e) {
      console.error('QR code generation error:', e);
    }

    const certificate = {
      id: certId,
      learnerName,
      completedOS: completedOS.length ? completedOS : ['Windows 11', 'Ubuntu Linux', 'macOS Sonoma', 'Google ChromeOS'],
      score,
      badges,
      issueDate,
      qrDataUrl,
      isDemo,
      verified: !isDemo
    };

    // Only store official verified certificates in verified registry
    if (!isDemo) {
      const all = this.getAllCertificates();
      all[certId] = certificate;
      try {
        localStorage.setItem(CERT_STORE_KEY, JSON.stringify(all));
      } catch (e) {
        console.warn('Could not save certificate:', e);
      }
    }

    return certificate;
  },

  // Export as High-Resolution PDF
  async downloadCertificatePDF(elementId, filename = 'SarlaYash_OS_Certificate.pdf') {
    const element = document.getElementById(elementId);
    if (!element) return false;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(filename);
      return true;
    } catch (err) {
      console.error('PDF export error:', err);
      return false;
    }
  },

  // Export as High-Resolution PNG Image
  async downloadCertificatePNG(elementId, filename = 'SarlaYash_OS_Certificate.png') {
    const element = document.getElementById(elementId);
    if (!element) return false;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (err) {
      console.error('PNG export error:', err);
      return false;
    }
  }
};

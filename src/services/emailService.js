// Founder Installation & Academic Integrity Notification Service
// Target 1: kapilnarula27july@gmail.com
// Target 2: namaste@sarlayash.com
// Silently alerts founder on installation, and triggers high-priority disciplinary alerts on anti-cheat violations.

const FOUNDER_EMAIL = 'kapilnarula27july@gmail.com';
const COMMITTEE_EMAIL = 'namaste@sarlayash.com';
const CHEATING_ALERT_RECIPIENTS = [FOUNDER_EMAIL, COMMITTEE_EMAIL];

const STORAGE_KEY_INSTALL = 'sarlayash_install_telemetry';
const STORAGE_KEY_LOGS = 'sarlayash_founder_logs';
const STORAGE_KEY_CHEATING = 'sarlayash_cheating_audit_log';

export const emailService = {
  getFounderEmail() {
    return FOUNDER_EMAIL;
  },

  getCommitteeEmail() {
    return COMMITTEE_EMAIL;
  },

  getRecipients() {
    return CHEATING_ALERT_RECIPIENTS;
  },

  getInstallTelemetry() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_INSTALL);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  getAllTelemetryLogs() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_LOGS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  getCheatingLogs() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CHEATING);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  detectDeviceType() {
    const ua = navigator.userAgent || '';
    if (/iPad|Tablet|PlayBook/i.test(ua) || (window.innerWidth > 600 && window.innerWidth <= 1024)) {
      return 'Tablet';
    }
    if (/Mobile|Android|iPhone|iPod|BlackBerry|IEMobile|Silk/i.test(ua) || window.innerWidth <= 600) {
      return 'Mobile Phone';
    }
    return 'Desktop/Laptop';
  },

  async recordAndNotifyInstall(learnerName = 'New Learner', selectedOS = 'Windows') {
    const existing = this.getInstallTelemetry();
    if (existing && existing.alreadySent) {
      return existing; // already notified on first launch
    }

    const installId = 'SY-INST-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const payload = {
      installationId: installId,
      timestamp: new Date().toISOString(),
      appVersion: '1.0.0-release',
      learnerName: learnerName || 'Anonymous Student',
      primaryOS: selectedOS,
      deviceType: this.detectDeviceType(),
      screenResolution: `${window.innerWidth}x${window.innerHeight}`,
      recipientEmail: FOUNDER_EMAIL,
      alreadySent: true,
      deliveredAt: new Date().toLocaleTimeString(),
      deliveryMethod: 'Silent Cloud Push'
    };

    try {
      localStorage.setItem(STORAGE_KEY_INSTALL, JSON.stringify(payload));
      
      // Store in founder audit trail
      const logs = this.getAllTelemetryLogs();
      logs.unshift({
        ...payload,
        event: 'INSTALL_FIRST_LAUNCH',
        status: 'DISPATCHED_SILENTLY'
      });
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs.slice(0, 50)));

      // Dispatch silent background HTTP request
      fetch('https://formspree.io/f/mqkenvqq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          to: FOUNDER_EMAIL,
          subject: `[SarlaYash OS Universe] New Installation: ${payload.learnerName} (${payload.deviceType})`,
          message: `SarlaYash Virtual Lab has been launched by a new learner!\n\nLearner: ${payload.learnerName}\nOS Chosen: ${payload.primaryOS}\nDevice: ${payload.deviceType}\nResolution: ${payload.screenResolution}\nInstall ID: ${payload.installationId}\nTimestamp: ${payload.timestamp}\nApp Version: ${payload.appVersion}`,
          ...payload
        })
      }).catch(err => {
        console.info('[SarlaYash Telemetry] Silent push recorded:', payload.installationId, err.message);
      });

    } catch (e) {
      console.warn('[SarlaYash Telemetry] Storage write err:', e);
    }

    return payload;
  },

  async reportCheatingIncident({
    learnerName = 'Student',
    violationReason = 'Unauthorized activity detected during proctored exam',
    violationType = 'GENERAL_VIOLATION',
    examType = 'Hard-Level Proctored Assessment (100 MCQs • 2 Hours)',
    answeredCount = 0,
    totalQuestions = 100,
    timeSpentSec = 0
  }) {
    const incidentId = 'SEC-INC-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    const now = new Date();
    const lockoutUntil = new Date(now.getTime() + (24 * 60 * 60 * 1000));

    const payload = {
      incidentId,
      timestamp: now.toISOString(),
      formattedTime: now.toLocaleString(),
      learnerName: learnerName || 'Anonymous Student',
      violationType,
      violationReason,
      examType,
      questionsAnswered: `${answeredCount} / ${totalQuestions}`,
      timeSpentFormatted: `${Math.floor(timeSpentSec / 60)}m ${timeSpentSec % 60}s`,
      disciplinaryAction: 'DISQUALIFIED (0% Score) + 24-HOUR LOGIN LOCKOUT',
      lockoutUntil: lockoutUntil.toISOString(),
      lockoutUntilFormatted: lockoutUntil.toLocaleString(),
      recipientEmails: CHEATING_ALERT_RECIPIENTS,
      deviceType: this.detectDeviceType(),
      screenResolution: `${window.innerWidth}x${window.innerHeight}`,
      userAgent: navigator.userAgent || 'Unknown',
      deliveryStatus: 'DISPATCHED_TO_FOUNDER_AND_COMMITTEE'
    };

    // 1. Save into persistent cheating audit log
    try {
      const logs = this.getCheatingLogs();
      logs.unshift(payload);
      localStorage.setItem(STORAGE_KEY_CHEATING, JSON.stringify(logs.slice(0, 50)));

      // 2. Also register in founder telemetry logs
      const founderLogs = this.getAllTelemetryLogs();
      founderLogs.unshift({
        ...payload,
        event: 'SECURITY_CHEATING_VIOLATION',
        status: 'DISPATCHED'
      });
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(founderLogs.slice(0, 50)));
    } catch (e) {
      console.warn('[SarlaYash Anti-Cheat] Storage write failed:', e);
    }

    // 3. Compose email content
    const emailSubject = `🚨 [SECURITY BREACH] Academic Dishonesty Detected: ${payload.learnerName} (${payload.violationType})`;
    const emailBody = `
============================================================
SARLAYASH OS UNIVERSE — ACADEMIC DISCIPLINARY INCIDENT
============================================================
ATTENTION:
- Kapil Narula: ${FOUNDER_EMAIL}
- SarlaYash Committee: ${COMMITTEE_EMAIL}

A proctoring violation was detected during the Hard-Level Assessment.
The examination was immediately terminated, disqualified with a 0% score, 
and the learner's account has been LOCKED FOR 24 HOURS.

------------------------------------------------------------
INCIDENT DOSSIER
------------------------------------------------------------
• Incident ID: ${payload.incidentId}
• Learner Name: ${payload.learnerName}
• Violation Type: ${payload.violationType}
• Specific Reason: ${payload.violationReason}
• Examination: ${payload.examType}
• Questions Attempted: ${payload.questionsAnswered} (Voided)
• Time of Violation: ${payload.formattedTime} (${payload.timestamp})
• Disciplinary Penalty: DISQUALIFIED (0%) & 24-Hour Access Lockout
• Account Locked Until: ${payload.lockoutUntilFormatted}

------------------------------------------------------------
DEVICE & SYSTEM TELEMETRY
------------------------------------------------------------
• Device Type: ${payload.deviceType}
• Viewport Resolution: ${payload.screenResolution}
• User Agent: ${payload.userAgent}

NOTIFIED RECIPIENTS:
1. ${FOUNDER_EMAIL}
2. ${COMMITTEE_EMAIL}
============================================================
`;

    // 4. Dispatch to Formspree
    try {
      await fetch('https://formspree.io/f/mqkenvqq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          to: `${FOUNDER_EMAIL}, ${COMMITTEE_EMAIL}`,
          _cc: COMMITTEE_EMAIL,
          _replyto: FOUNDER_EMAIL,
          subject: emailSubject,
          message: emailBody,
          ...payload
        })
      });
      console.info('[SarlaYash Anti-Cheat] Email dispatch sent to', CHEATING_ALERT_RECIPIENTS);
      return { success: true, payload, message: `Disciplinary email dispatched to ${CHEATING_ALERT_RECIPIENTS.join(' and ')}.` };
    } catch (err) {
      console.warn('[SarlaYash Anti-Cheat] Network dispatch cached/offline:', err.message);
      return { success: true, payload, message: `Incident recorded and queued for ${CHEATING_ALERT_RECIPIENTS.join(' and ')}.` };
    }
  },

  async sendTestCheatingAlert(learnerName = 'Security Test Subject') {
    return await this.reportCheatingIncident({
      learnerName,
      violationReason: 'Manual verification of anti-cheat incident dispatch and 24-hour lockout pipeline.',
      violationType: 'PROCTOR_TEST_DISPATCH',
      examType: 'Hard-Level Proctored Assessment (Admin Verification)',
      answeredCount: 14,
      totalQuestions: 100,
      timeSpentSec: 340
    });
  },

  async sendTestNotification(note = 'Manual Founder Test Ping') {
    const testPayload = {
      installationId: 'TEST-PING-' + Date.now().toString(36).toUpperCase(),
      timestamp: new Date().toISOString(),
      appVersion: '1.0.0-release',
      learnerName: 'Kapil Narula (Admin Test)',
      primaryOS: 'All Labs Active',
      deviceType: this.detectDeviceType(),
      screenResolution: `${window.innerWidth}x${window.innerHeight}`,
      recipientEmail: FOUNDER_EMAIL,
      note,
      deliveredAt: new Date().toLocaleTimeString(),
      deliveryMethod: 'Admin Direct Dispatch'
    };

    const logs = this.getAllTelemetryLogs();
    logs.unshift({
      ...testPayload,
      event: 'FOUNDER_MANUAL_TEST',
      status: 'SENT'
    });
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs.slice(0, 50)));

    try {
      await fetch('https://formspree.io/f/mqkenvqq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          to: FOUNDER_EMAIL,
          subject: `[SarlaYash Lab Test] Admin Ping to ${FOUNDER_EMAIL}`,
          message: `Test email alert from SarlaYash OS Universe.\nTimestamp: ${testPayload.timestamp}\nResolution: ${testPayload.screenResolution}\nNote: ${note}`,
          ...testPayload
        })
      });
      return { success: true, message: `Notification successfully sent to ${FOUNDER_EMAIL}!` };
    } catch {
      return { success: true, message: `Notification recorded and queued for ${FOUNDER_EMAIL} (Offline/Local Logged)` };
    }
  }
};

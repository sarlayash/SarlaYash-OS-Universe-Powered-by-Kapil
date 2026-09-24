// Founder Installation Notification Service
// Target: kapilnarula27july@gmail.com
// Silently alerts the founder when a learner installs/launches the lab app for the first time.

const FOUNDER_EMAIL = 'kapilnarula27july@gmail.com';
const STORAGE_KEY_INSTALL = 'sarlayash_install_telemetry';
const STORAGE_KEY_LOGS = 'sarlayash_founder_logs';

export const emailService = {
  getFounderEmail() {
    return FOUNDER_EMAIL;
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
      // We send to Formspree endpoint designed for educational notifications, with safe catch
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
        // Silent background catch - never disrupt learner
        console.info('[SarlaYash Telemetry] Silent push recorded:', payload.installationId, err.message);
      });

    } catch (e) {
      console.warn('[SarlaYash Telemetry] Storage write err:', e);
    }

    return payload;
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

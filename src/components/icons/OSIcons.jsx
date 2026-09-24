// Authentic OS System & Application Icons for Windows 11, Ubuntu, macOS, and ChromeOS
import React from 'react';

// ==========================================
// WINDOWS 11 ICONS
// ==========================================

export const Windows11Logo = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path d="M2 3.5L10.5 2.2V11.2H2V3.5Z" fill="#0078D4" />
    <path d="M12 2L22 0.5V11.2H12V2Z" fill="#0078D4" />
    <path d="M2 12.8H10.5V21.8L2 20.5V12.8Z" fill="#0078D4" />
    <path d="M12 12.8H22V23.5L12 22V12.8Z" fill="#0078D4" />
  </svg>
);

export const WindowsExplorerIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <path d="M6 10C6 7.79 7.79 6 10 6H20L25 12H38C40.21 12 42 13.79 42 16V18H6V10Z" fill="#0078D4" />
    <rect x="4" y="16" width="40" height="26" rx="3" fill="#FFC83B" />
    <path d="M4 22H44V39C44 40.66 42.66 42 41 42H7C5.34 42 4 40.66 4 39V22Z" fill="#FFA000" />
    <rect x="10" y="24" width="12" height="2" rx="1" fill="#FFFFFF" fillOpacity="0.6" />
  </svg>
);

export const WindowsEdgeIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <defs>
      <linearGradient id="edgeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0C59A4" />
        <stop offset="100%" stopColor="#119BE7" />
      </linearGradient>
      <linearGradient id="edgeGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0B98E4" />
        <stop offset="100%" stopColor="#25D2B8" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="20" fill="url(#edgeGrad1)" />
    <path d="M24 8C15.16 8 8 15.16 8 24C8 28.5 9.86 32.58 12.87 35.5C14.15 32.5 17.5 28 23 28C29.5 28 32 32.5 32 36C32 37.5 31.5 38.8 30.7 40C37.5 38 40 31.5 40 24C40 15.16 32.84 8 24 8Z" fill="url(#edgeGrad2)" />
    <circle cx="27" cy="23" r="7" fill="#FFFFFF" fillOpacity="0.9" />
  </svg>
);

export const WindowsCmdIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <rect x="4" y="6" width="40" height="36" rx="4" fill="#1E1E1E" stroke="#3C3C3C" strokeWidth="2" />
    <rect x="4" y="6" width="40" height="8" rx="4" fill="#2D2D2D" />
    <circle cx="9" cy="10" r="1.5" fill="#FF5F56" />
    <circle cx="14" cy="10" r="1.5" fill="#FFBD2E" />
    <circle cx="19" cy="10" r="1.5" fill="#27C93F" />
    <path d="M12 20L18 25L12 30" stroke="#CCCCCC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="22" y1="30" x2="30" y2="30" stroke="#CCCCCC" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const WindowsSettingsIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <circle cx="24" cy="24" r="20" fill="#0078D4" />
    <circle cx="24" cy="24" r="7" fill="none" stroke="#FFFFFF" strokeWidth="4" />
    <path d="M24 8V12 M24 36V40 M8 24H12 M36 24H40 M12.7 12.7L15.5 15.5 M32.5 32.5L35.3 35.3 M12.7 35.3L15.5 32.5 M32.5 15.5L35.3 12.7" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const WindowsNotepadIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <rect x="8" y="4" width="32" height="40" rx="3" fill="#0078D4" />
    <rect x="10" y="6" width="28" height="36" rx="2" fill="#FFFFFF" />
    <line x1="15" y1="14" x2="33" y2="14" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" />
    <line x1="15" y1="20" x2="33" y2="20" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" />
    <line x1="15" y1="26" x2="28" y2="26" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" />
    <line x1="15" y1="32" x2="25" y2="32" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const WindowsStoreIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <rect x="8" y="14" width="32" height="28" rx="4" fill="#0078D4" />
    <path d="M16 14V11C16 7.69 18.69 5 22 5H26C29.31 5 32 7.69 32 11V14" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    <rect x="19" y="24" width="4" height="4" fill="#FFFFFF" />
    <rect x="25" y="24" width="4" height="4" fill="#FFFFFF" />
    <rect x="19" y="30" width="4" height="4" fill="#FFFFFF" />
    <rect x="25" y="30" width="4" height="4" fill="#FFFFFF" />
  </svg>
);

// ==========================================
// UBUNTU LINUX YARU ICONS
// ==========================================

export const UbuntuLogo = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <circle cx="24" cy="24" r="22" fill="#E95420" />
    <circle cx="24" cy="24" r="14" fill="none" stroke="#FFFFFF" strokeWidth="3.5" />
    <circle cx="10" cy="24" r="3.5" fill="#FFA726" stroke="#E95420" strokeWidth="1.5" />
    <circle cx="31" cy="11.8" r="3.5" fill="#FFA726" stroke="#E95420" strokeWidth="1.5" />
    <circle cx="31" cy="36.2" r="3.5" fill="#FFA726" stroke="#E95420" strokeWidth="1.5" />
    <path d="M12 24H16 M28 14L25 17 M28 34L25 31" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const UbuntuFilesIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <rect x="4" y="10" width="22" height="12" rx="3" fill="#E95420" />
    <rect x="4" y="14" width="40" height="28" rx="4" fill="#77216F" />
    <rect x="6" y="18" width="36" height="22" rx="3" fill="#E95420" />
    <path d="M14 26H34 M14 31H26" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const UbuntuTerminalIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <rect x="4" y="6" width="40" height="36" rx="5" fill="#300A24" stroke="#77216F" strokeWidth="2" />
    <path d="M12 18L20 24L12 30" stroke="#4E9A06" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="22" y1="30" x2="32" y2="30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const UbuntuSoftwareIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <rect x="6" y="12" width="36" height="30" rx="4" fill="#E95420" />
    <path d="M16 12V8C16 5.79 17.79 4 20 4H28C30.21 4 32 5.79 32 8V12" fill="none" stroke="#FFA726" strokeWidth="3" />
    <path d="M24 18L17 34H21L22.5 30H25.5L27 34H31L24 18ZM23 27L24 23L25 27H23Z" fill="#FFFFFF" />
  </svg>
);

// ==========================================
// APPLE MACOS SONOMA ICONS
// ==========================================

export const MacFinderIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <rect x="2" y="2" width="44" height="44" rx="10" fill="#1B87F7" />
    <path d="M2 24C2 35.05 10.95 44 22 44V4C10.95 4 2 12.95 2 24Z" fill="#72BAFF" />
    {/* Eyes */}
    <circle cx="16" cy="18" r="3" fill="#1C355E" />
    <circle cx="32" cy="18" r="3" fill="#1C355E" />
    {/* Nose Line */}
    <path d="M24 16V26" stroke="#1C355E" strokeWidth="2.5" strokeLinecap="round" />
    {/* Iconic smile */}
    <path d="M14 27C17 33 31 33 34 27" fill="none" stroke="#1C355E" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const MacSafariIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <rect x="2" y="2" width="44" height="44" rx="10" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1" />
    <circle cx="24" cy="24" r="18" fill="#1B87F7" />
    {/* Compass ticks */}
    <circle cx="24" cy="24" r="14" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 4" />
    {/* Compass Needle */}
    <polygon points="24,8 28,24 24,24" fill="#FF3B30" />
    <polygon points="24,8 20,24 24,24" fill="#FF6961" />
    <polygon points="24,40 28,24 24,24" fill="#FFFFFF" />
    <polygon points="24,40 20,24 24,24" fill="#D1D1D6" />
    <circle cx="24" cy="24" r="2.5" fill="#FFFFFF" />
  </svg>
);

export const MacTerminalIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <rect x="2" y="2" width="44" height="44" rx="10" fill="#282828" stroke="#3A3A3C" strokeWidth="1.5" />
    <path d="M12 16L22 24L12 32" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="24" y1="32" x2="34" y2="32" stroke="#48D1CC" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const MacSettingsIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <rect x="2" y="2" width="44" height="44" rx="10" fill="#8E8E93" />
    <circle cx="24" cy="24" r="14" fill="#AEAEB2" />
    <circle cx="24" cy="24" r="6" fill="#636366" />
    <path d="M24 4V10 M24 38V44 M4 24H10 M38 24H44" stroke="#D1D1D6" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const MacNotesIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <rect x="2" y="2" width="44" height="44" rx="10" fill="#FFFFFF" stroke="#E5E5EA" strokeWidth="1" />
    <rect x="2" y="2" width="44" height="12" rx="4" fill="#FFCC00" />
    <line x1="8" y1="20" x2="38" y2="20" stroke="#C7C7CC" strokeWidth="1.5" />
    <line x1="8" y1="26" x2="38" y2="26" stroke="#C7C7CC" strokeWidth="1.5" />
    <line x1="8" y1="32" x2="38" y2="32" stroke="#C7C7CC" strokeWidth="1.5" />
    <line x1="8" y1="38" x2="28" y2="38" stroke="#C7C7CC" strokeWidth="1.5" />
  </svg>
);

// ==========================================
// GOOGLE CHROMEOS ICONS
// ==========================================

export const GoogleChromeLogo = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <circle cx="24" cy="24" r="20" fill="#EA4335" />
    <path d="M24 24L34 6.7C31 5 27.6 4 24 4C14.7 4 7 10.4 4.8 19L15.3 25L24 24Z" fill="#EA4335" />
    <path d="M24 24L15.3 25L4.8 19C4.3 20.6 4 22.3 4 24C4 33.3 10.4 41 19 43.2L29.5 37.2L24 24Z" fill="#34A853" />
    <path d="M24 24L29.5 37.2L19 43.2C20.6 43.7 22.3 44 24 44C35 44 44 35 44 24C44 20.4 43 17 41.3 14L24 24Z" fill="#FBBC05" />
    <circle cx="24" cy="24" r="9" fill="#FFFFFF" />
    <circle cx="24" cy="24" r="7" fill="#4285F4" />
  </svg>
);

export const ChromeFilesIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <circle cx="24" cy="24" r="20" fill="#1A73E8" />
    <path d="M14 16C14 14.9 14.9 14 16 14H22L25 17H32C33.1 17 34 17.9 34 19V31C34 32.1 33.1 33 32 33H16C14.9 33 14 32.1 14 31V16Z" fill="#FFFFFF" />
  </svg>
);

export const ChromeTerminalIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <circle cx="24" cy="24" r="20" fill="#202124" stroke="#5F6368" strokeWidth="1" />
    {/* Penguin eye/beak or code symbol */}
    <path d="M16 20L22 24L16 28" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="24" y1="28" x2="30" y2="28" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const ChromeSettingsIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <circle cx="24" cy="24" r="20" fill="#5F6368" />
    <circle cx="24" cy="24" r="7" fill="none" stroke="#FFFFFF" strokeWidth="3" />
    <path d="M24 10V14 M24 34V38 M10 24H14 M34 24H38" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

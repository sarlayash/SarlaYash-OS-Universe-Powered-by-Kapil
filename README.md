# SarlaYash OS Universe — Powered by Kapil
### *Mobile-First Virtual Computer Lab*

> **Mission**: Give every student the opportunity to learn practical computer skills, even when their only available device is a mobile phone.

---

## 🌟 Overview

**SarlaYash OS Universe** is an educational, browser-native operating system simulator designed to bridge the digital divide. While modern computer science and IT training typically assumes students own expensive laptops, millions of aspiring learners only have access to mobile smartphones.

This app delivers full hands-on simulations of **four major operating systems**, allowing students to practice everything from raw disk partitioning and OS installation to advanced terminal scripting and GUI administration on any screen size.

---

## 🖥️ The Four Operating System Labs

### 1. Microsoft Windows 11 Lab
* **Guided Installation Journey**: ISO boot sequence, Language/Keyboard selection, Product Key setup, custom drive partitioning (GPT & NTFS formatting), Windows file copying, and Out-of-Box Experience (OOBE) user setup.
* **Interactive Desktop**: Centered Windows 11 taskbar, Start Menu with pinned apps and power controls, system tray with live clock and network indicators.
* **Integrated Apps**:
  * **Command Prompt (CMD)**: `dir`, `cd`, `mkdir`, `type`, `echo`, `ipconfig`, `systeminfo`, `whoami`, `ping`, `cls`, `help`, `tree`, and output redirection (`>`).
  * **File Explorer**: Ribbon toolbar, Quick Access navigation (`Desktop`, `Documents`, `Downloads`, `Pictures`, `C: Drive`), file creation, and integrated text viewer/editor.
  * **Settings**: Display specs, audio chimes, wallpaper personalization, and virtual hardware telemetry.
  * **Notepad & Calculator**: Real file saving to virtual disk and arithmetic computing.
  * **Microsoft Edge**: Interactive documentation, cheat sheets, and tutorial portal.

### 2. Ubuntu Linux 24.04 LTS (Noble Numbat)
* **Guided Installation Journey**: GNU GRUB bootloader menu, language chooser, ext4 guided disk partitioning (`/boot/efi`, swap, `/`), interactive timezone selection, user creation with sudo rights, squashfs unpacking progress, and live reboot.
* **Interactive Desktop**: GNOME top bar with Activities button, calendar/clock, left Ubuntu Dock with app indicators, and custom wallpapers.
* **Integrated Apps**:
  * **Bash Shell**: `ls -la`, `pwd`, `cd`, `mkdir`, `touch`, `cat`, `rm`, `chmod 755`, `chown`, `sudo`, `apt update`, `apt install git`, `fastfetch`/`neofetch`, `uname -a`, `top`, `ps aux`, `df -h`, `history`.
  * **Nautilus Files**: Unix folder hierarchy (`/home/student`, `/etc`, `/var/log`, `/bin`), file permissions view.
  * **Gedit**: Linux text editor with virtual disk persistence.
  * **Firefox Web Browser**: Curated developer tutorials and Linux manual reference.

### 3. Apple macOS Sonoma Lab
* **Guided Setup Assistant**: Apple boot logo with progress bar, multi-lingual "Hello" typography animation, Country/Region selector, Apple ID educational setup, computer account creation, and Dark/Light mode appearance selector.
* **Interactive Desktop**: macOS top menu bar (Apple menu, File, Edit, View, Window, Help, Clock), interactive **Spotlight Search** (`Cmd+Space` / click), and floating bottom glass **Dock** with bouncing animation and running indicators.
* **Integrated Apps**:
  * **Zsh Terminal**: Realistic prompt (`student@MacBook-Pro ~ %`), `sw_vers`, `brew install`, `top`, `say`, `clear`.
  * **Finder**: Sidebar favorites (`Desktop`, `Documents`, `Downloads`, `Macintosh HD`).
  * **Notes & Safari**: Text editing and student resources.

### 4. Google ChromeOS Lab
* **Guided Chromebook Setup**: ChromeOS splash screen, student Wi-Fi connection, Google education account sign-in, Google Play terms agreement, and initial shelf launch.
* **Interactive Desktop**: Bottom Shelf with Everything Button / Launcher, Quick Settings pill (Battery, Wi-Fi, Volume, Clock), and slide-up Application Launcher grid.
* **Integrated Apps**:
  * **Crostini Linux Container**: `crosh` and Linux terminal environment.
  * **Files App**: My Files, Downloads, and cloud drive simulation.
  * **Google Chrome**: Web tutorial browser.

---

## 📱 Mobile-First Accessibility Controls

Engineered specifically for smartphone screens:
* **Virtual Touch Trackpad & Mouse Pointer**: An on-screen precision mouse with cursor coordinates, left-click, right-click, and double-click buttons.
* **Mobile Terminal Keyboard**: Dockable on-screen keyboard featuring essential terminal keys: `Tab`, `Ctrl`, `Alt`, `Esc`, `~`, `/`, `\`, `-`, `_`, `|`, `$`, `>`, and arrow keys.
* **Touch-Friendly Window Management**: Tap to maximize, swipe to reposition, and touch-optimized action menus.

---

## 🏆 Badges, Practical Challenges & Certification

### Four Official Badges:
1. 💽 **Installation Expert**: Complete all four guided OS installations.
2. 💻 **Command Master**: Execute 50+ commands or complete CLI missions across labs.
3. 🧭 **Desktop Explorer**: Explore all four desktop environments and file managers.
4. 🏆 **OS Universe Champion**: Pass the final practical assessment with 80%+ score.

### Practical Challenges:
* **20 Guided Hands-On Challenges** categorized into Beginner, Intermediate, and Advanced tiers with real-time automated verification upon file creation, directory change, command execution, or wallpaper customization.

### Official QR-Verifiable Certificate:
* Displays Learner Name, Completed Operating Systems, Practical Exam Score, Issue Date, and a unique Certificate ID (`SYOU-2026-XXXX`).
* Features a real, scannable **QR code** generated via `qrcode` that links to the in-app verification ledger.
* **Exportable PDF**: Generates a high-resolution, printable PDF via `jspdf` and `html2canvas` complete with guilloche borders, official seal, and Kapil's signature line.
* Built-in **Certificate Verification Registry** allowing anyone to verify issued credentials.

---

## 📬 Founder Silent Installation Telemetry

As specified in the architecture:
* Target recipient: `kapilnarula27july@gmail.com`
* Dispatched silently in the background upon first launch.
* Records: Installation timestamp, app version (`1.0.0-release`), random installation ID (`SY-INST-XXXXX`), device form factor, screen dimensions, and student name.
* Includes a **Founder Telemetry Portal** to inspect the local audit trail, review payloads, and trigger test alerts.

---

## 🚀 Running Locally

```bash
# Clone or navigate to the project directory
cd sarlayash-os-universe

# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build
```

---

*Designed & Built with ❤️ by Kapil Narula to bring computing education to every student.*

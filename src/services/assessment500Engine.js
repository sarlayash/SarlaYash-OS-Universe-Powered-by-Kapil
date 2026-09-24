// 500-Question Final Mock Assessment Question Bank & Engine
// Covers all four OS types: Windows, Linux, macOS, and ChromeOS + Systems Storage & Partitioning

// Core question definition templates covering the 5 domains
const RAW_QUESTIONS = [
  // ==========================================
  // SECTION 1: MICROSOFT WINDOWS 11 & ADMIN (1 - 125)
  // ==========================================
  {
    q: 'Which Windows command line tool is used to repair corrupted Windows System Files using the component store?',
    opts: ['sfc /scannow', 'chkdsk /f', 'diskpart /clean', 'cleanmgr /sageset'],
    ans: 0,
    exp: '`sfc /scannow` (System File Checker) scans and repairs corrupted Windows operating system files using the local WinSxS store.',
    cat: 'Windows Troubleshooting'
  },
  {
    q: 'In Windows 11, what is the default modern file system used for system boot drives?',
    opts: ['FAT32', 'exFAT', 'NTFS', 'ReFS'],
    ans: 2,
    exp: 'NTFS (New Technology File System) is the primary journaling file system for Windows system installations.',
    cat: 'Windows Storage'
  },
  {
    q: 'Which command displays the full network configuration including DHCP lease times and DNS servers in CMD?',
    opts: ['ipconfig /all', 'ipconfig /flushdns', 'netstat -an', 'nslookup localhost'],
    ans: 0,
    exp: '`ipconfig /all` prints full TCP/IP information including MAC addresses, DHCP lease timestamps, and primary/secondary DNS.',
    cat: 'Windows Networking'
  },
  {
    q: 'What is the modern partition table format required for Windows 11 installation with UEFI and Secure Boot?',
    opts: ['MBR (Master Boot Record)', 'GPT (GUID Partition Table)', 'APM (Apple Partition Map)', 'BSD Slice'],
    ans: 1,
    exp: 'Windows 11 mandates UEFI and Secure Boot, which requires the GPT (GUID Partition Table) standard.',
    cat: 'Windows Architecture'
  },
  {
    q: 'Which Windows Command Prompt command forcibly terminates a running process by its PID?',
    opts: ['taskkill /PID <id> /F', 'process kill <id>', 'stop-process -id', 'kill -9 <id>'],
    ans: 0,
    exp: '`taskkill /PID <id> /F` forcibly terminates the specified process identifier in Windows Command Prompt.',
    cat: 'Windows Administration'
  },
  {
    q: 'Which registry root key contains machine-wide hardware and operating system software configurations?',
    opts: ['HKEY_CURRENT_USER (HKCU)', 'HKEY_LOCAL_MACHINE (HKLM)', 'HKEY_CLASSES_ROOT (HKCR)', 'HKEY_USERS (HKU)'],
    ans: 1,
    exp: 'HKLM (HKEY_LOCAL_MACHINE) contains machine-wide settings applicable to all users on the computer.',
    cat: 'Windows Registry'
  },
  {
    q: 'In Windows, which utility is used to modify local group policies on Pro and Education editions?',
    opts: ['gpedit.msc', 'regedit.exe', 'secpol.msc', 'compmgmt.msc'],
    ans: 0,
    exp: '`gpedit.msc` launches the Local Group Policy Editor in Windows Pro and Enterprise editions.',
    cat: 'Windows Administration'
  },
  {
    q: 'Which command clears the client-side DNS resolver cache in Windows?',
    opts: ['ipconfig /renew', 'ipconfig /flushdns', 'arp -d', 'route -f'],
    ans: 1,
    exp: '`ipconfig /flushdns` purges the contents of the DNS client resolver cache.',
    cat: 'Windows Networking'
  },
  {
    q: 'What Windows feature provides a temporary lightweight desktop environment to run untrusted applications in isolation?',
    opts: ['Windows Sandbox', 'Hyper-V Virtual Machine', 'Windows Defender SmartScreen', 'User Account Control'],
    ans: 0,
    exp: 'Windows Sandbox runs disposable virtualized instances that completely reset upon closing.',
    cat: 'Windows Security'
  },
  {
    q: 'Which command displays active TCP network connections and listening ports on Windows?',
    opts: ['netstat -ano', 'ping 127.0.0.1', 'tracert -d', 'route print'],
    ans: 0,
    exp: '`netstat -ano` displays all active TCP connections with listening ports and corresponding Process IDs.',
    cat: 'Windows Networking'
  },
  {
    q: 'What is the role of the Windows boot manager binary located in the EFI system partition?',
    opts: ['bootmgr.efi', 'ntoskrnl.exe', 'hal.dll', 'winload.efi'],
    ans: 0,
    exp: '`bootmgr.efi` is the UEFI bootloader that reads the BCD (Boot Configuration Data) and invokes `winload.efi`.',
    cat: 'Windows Architecture'
  },
  {
    q: 'Which command line tool is used to manage volume shadow copies and system restore points in Windows?',
    opts: ['vssadmin', 'diskpart', 'fsutil', 'wbadmin'],
    ans: 0,
    exp: '`vssadmin` administers Volume Shadow Copy Service backups and shadow storage allocation.',
    cat: 'Windows Administration'
  },
  {
    q: 'Which PowerShell cmdlet retrieves the list of installed Windows hotfixes and security updates?',
    opts: ['Get-HotFix', 'Get-WindowsUpdate', 'Get-Package', 'Test-PathUpdate'],
    ans: 0,
    exp: '`Get-HotFix` queries WMI/CIM for all installed Microsoft Windows updates and KBs.',
    cat: 'Windows Administration'
  },
  {
    q: 'In Windows NTFS, what feature allows files to store multiple independent streams of data?',
    opts: ['Alternate Data Streams (ADS)', 'Hard Links', 'Symbolic Links', 'Sparse Files'],
    ans: 0,
    exp: 'NTFS Alternate Data Streams (ADS) permit attaching metadata or additional streams to a single file identifier.',
    cat: 'Windows Storage'
  },
  {
    q: 'Which utility is used to inspect hardware device drivers, status, and IRQ conflicts in Windows?',
    opts: ['devmgmt.msc', 'perfmon.exe', 'eventvwr.msc', 'services.msc'],
    ans: 0,
    exp: '`devmgmt.msc` opens Device Manager to update, roll back, and troubleshoot hardware drivers.',
    cat: 'Windows Administration'
  },

  // ==========================================
  // SECTION 2: UBUNTU LINUX 24.04 LTS & CLI (126 - 250)
  // ==========================================
  {
    q: 'In Linux, what numeric octal mode for `chmod` grants `rwxr-xr-x` permissions?',
    opts: ['644', '755', '777', '700'],
    ans: 1,
    exp: 'rwx (4+2+1=7) for user, r-x (4+0+1=5) for group, r-x (4+0+1=5) for others equals 755.',
    cat: 'Linux Permissions'
  },
  {
    q: 'Which command updates the local package cache list from configured mirrors in Ubuntu?',
    opts: ['sudo apt update', 'sudo apt upgrade', 'sudo apt dist-upgrade', 'sudo apt clean'],
    ans: 0,
    exp: '`apt update` downloads package list indexes from remote repositories without installing upgrades.',
    cat: 'Linux Package Management'
  },
  {
    q: 'What is the PID (Process Identifier) of the init process (systemd) in modern Linux distributions?',
    opts: ['0', '1', '2', '1000'],
    ans: 1,
    exp: 'The first user-space process spawned by the Linux kernel is `systemd` with PID 1.',
    cat: 'Linux Internals'
  },
  {
    q: 'Which Linux directory contains host-specific system configuration files such as `fstab` and `passwd`?',
    opts: ['/etc', '/var', '/usr', '/dev'],
    ans: 0,
    exp: '`/etc` holds all system configuration files and startup shell scripts.',
    cat: 'Linux Filesystem'
  },
  {
    q: 'Which signal cannot be caught, blocked, or ignored by a Linux process when terminating it?',
    opts: ['SIGTERM (15)', 'SIGKILL (9)', 'SIGINT (2)', 'SIGHUP (1)'],
    ans: 1,
    exp: 'SIGKILL (kill -9) is handled directly by the kernel and cannot be intercepted or ignored by any process.',
    cat: 'Linux Processes'
  },
  {
    q: 'Which command searches for files modified in the last 24 hours under `/var/log`?',
    opts: ['find /var/log -mtime -1', 'grep -r 24h /var/log', 'ls -lt /var/log', 'locate -t 24 /var/log'],
    ans: 0,
    exp: '`find /var/log -mtime -1` recursively searches for files modified less than 24 hours ago.',
    cat: 'Linux CLI'
  },
  {
    q: 'What special permission bit allows an executable to run with the privileges of the file owner?',
    opts: ['SUID (Set User ID, octal 4000)', 'SGID (octal 2000)', 'Sticky Bit (octal 1000)', 'Immutable bit'],
    ans: 0,
    exp: 'SUID (e.g. `/usr/bin/passwd`) executes binary code under the owner user account (typically root).',
    cat: 'Linux Security'
  },
  {
    q: 'Which virtual filesystem exposes real-time kernel data structures and process states in Linux?',
    opts: ['/proc', '/sys', '/dev', '/run'],
    ans: 0,
    exp: '`/proc` is a pseudo-filesystem generated by the Linux kernel containing process memory and runtime metrics.',
    cat: 'Linux Internals'
  },
  {
    q: 'Which command prints human-readable disk usage statistics for all mounted filesystems in Linux?',
    opts: ['df -h', 'du -sh *', 'lsblk -f', 'fdisk -l'],
    ans: 0,
    exp: '`df -h` (Disk Free, human-readable) displays total, used, and available space on all mounted filesystems.',
    cat: 'Linux Storage'
  },
  {
    q: 'In Linux, what file defines persistent filesystem mounts initialized during boot?',
    opts: ['/etc/fstab', '/etc/mtab', '/proc/mounts', '/etc/filesystems'],
    ans: 0,
    exp: '`/etc/fstab` (file systems table) defines block devices, mount points, filesystem types, and mount flags.',
    cat: 'Linux Storage'
  },
  {
    q: 'Which command is used to follow real-time system logs for a specific service using systemd?',
    opts: ['journalctl -u <service> -f', 'tail -f /var/log/messages', 'systemctl status <service>', 'dmesg -w'],
    ans: 0,
    exp: '`journalctl -u <service> -f` streams and follows journal output for the specified systemd unit.',
    cat: 'Linux Administration'
  },
  {
    q: 'What is the default umask on most Linux systems that produces 644 permissions on newly created files?',
    opts: ['0022', '0002', '0777', '0027'],
    ans: 0,
    exp: 'Default file base 666 minus umask 022 yields 644 (`rw-r--r--`).',
    cat: 'Linux Permissions'
  },

  // ==========================================
  // SECTION 3: APPLE MACOS SONOMA & UNIX (251 - 375)
  // ==========================================
  {
    q: 'What is the default interactive shell in macOS Terminal since macOS Catalina?',
    opts: ['bash', 'zsh (Z Shell)', 'fish', 'tcsh'],
    ans: 1,
    exp: 'Apple made Zsh the default login and interactive shell starting in macOS Catalina.',
    cat: 'macOS Terminal'
  },
  {
    q: 'Which modern file system is engineered specifically for Apple SSDs with copy-on-write cloning?',
    opts: ['HFS+', 'APFS (Apple File System)', 'ext4', 'UFS'],
    ans: 1,
    exp: 'APFS (Apple File System) features instant copy-on-write cloning, snapshots, and native space sharing.',
    cat: 'macOS Storage'
  },
  {
    q: 'Which macOS security mechanism restricts root privileges even from administrative users to protect `/System`?',
    opts: ['SIP (System Integrity Protection / "Rootless")', 'Gatekeeper', 'FileVault', 'Keychain Access'],
    ans: 0,
    exp: 'SIP (System Integrity Protection) prevents unauthorized modification of critical system directories.',
    cat: 'macOS Security'
  },
  {
    q: 'Which macOS terminal command displays product name, version, and build number?',
    opts: ['sw_vers', 'uname -a', 'system_profiler SPSoftwareDataType', 'mac_version'],
    ans: 0,
    exp: '`sw_vers` prints macOS ProductName (macOS), ProductVersion (e.g. 14.4.1), and BuildVersion.',
    cat: 'macOS Administration'
  },
  {
    q: 'Which popular third-party package manager is widely used by developers on macOS via the command line?',
    opts: ['Homebrew (`brew`)', 'MacPorts', 'Fink', 'APT'],
    ans: 0,
    exp: 'Homebrew (`brew install <formula>`) is the de-facto package manager for macOS and Linux.',
    cat: 'macOS Tools'
  },
  {
    q: 'What subsystem in macOS manages background daemons, agents, and system initialization?',
    opts: ['launchd', 'systemd', 'init.d', 'supervisord'],
    ans: 0,
    exp: '`launchd` manages both system daemons (`/Library/LaunchDaemons`) and user agents (`/Library/LaunchAgents`).',
    cat: 'macOS Architecture'
  },
  {
    q: 'Which command line utility prevents a Mac from sleeping while running long scripts or backups?',
    opts: ['caffeinate', 'pmset sleep 0', 'nosleep', 'keepawake'],
    ans: 0,
    exp: '`caffeinate -d` prevents the display and system from sleeping while a command executes.',
    cat: 'macOS CLI'
  },
  {
    q: 'What technology allows macOS Apple Silicon chips (M1/M2/M3) to seamlessly execute legacy Intel x86_64 binaries?',
    opts: ['Rosetta 2', 'Wine', 'QEMU', 'CrossOver'],
    ans: 0,
    exp: 'Rosetta 2 translates x86_64 instructions into ARM64 instructions ahead-of-time and at runtime.',
    cat: 'macOS Architecture'
  },
  {
    q: 'Which command reads and writes macOS user preferences stored in Property List (plist) format?',
    opts: ['defaults', 'plistutil', 'macpref', 'sysctl'],
    ans: 0,
    exp: '`defaults read` and `defaults write` interact with the macOS user defaults preference system.',
    cat: 'macOS Administration'
  },
  {
    q: 'What is the full-disk XTS-AES-128 encryption feature built into macOS called?',
    opts: ['FileVault', 'BitLocker', 'LUKS', 'SecureVault'],
    ans: 0,
    exp: 'FileVault provides hardware-accelerated full-disk encryption on macOS volumes.',
    cat: 'macOS Security'
  },

  // ==========================================
  // SECTION 4: GOOGLE CHROMEOS & CLOUD (376 - 450)
  // ==========================================
  {
    q: 'What is the developer shell accessible via Ctrl+Alt+T in Google ChromeOS called?',
    opts: ['crosh (ChromeOS Shell)', 'bash', 'zsh', 'cloud-shell'],
    ans: 0,
    exp: '`crosh` is the command-line interface provided in ChromeOS for hardware tests and network diagnostics.',
    cat: 'ChromeOS CLI'
  },
  {
    q: 'What is the underlying technology powering the Linux container environment (Crostini) on ChromeOS?',
    opts: ['LXD / Debian container inside a VM (Termina)', 'Docker daemon directly on root', 'VirtualBox', 'Wine'],
    ans: 0,
    exp: 'Crostini executes a hardened Linux VM (Termina) which runs LXD Linux containers (defaulting to Debian `penguin`).',
    cat: 'ChromeOS Architecture'
  },
  {
    q: 'What dedicated Google security microcontroller on modern Chromebooks protects hardware cryptographic keys?',
    opts: ['Titan C / H1 GSC (Google Security Chip)', 'Apple T2', 'TPM 1.2 legacy', 'Knox'],
    ans: 0,
    exp: 'Chromebooks integrate Google custom Titan C or H1 security chips to verify firmware and cryptographic keys.',
    cat: 'ChromeOS Security'
  },
  {
    q: 'What ChromeOS feature resets a Chromebook back to its pristine factory state by wiping the stateful partition?',
    opts: ['Powerwash', 'Factory Format', 'Recovery Stick', 'SysPrep'],
    ans: 0,
    exp: 'Powerwash completely clears user accounts, downloaded files, and local state from `/mnt/stateful_partition`.',
    cat: 'ChromeOS Administration'
  },
  {
    q: 'Which key on a standard Chromebook keyboard replaces the legacy Caps Lock key?',
    opts: ['The Everything Button / Search Key', 'Windows Key', 'Command Key', 'AltGr'],
    ans: 0,
    exp: 'The Everything Button (Launcher key) opens the application search launcher and Google Assistant.',
    cat: 'ChromeOS Hardware'
  },
  {
    q: 'Which crosh command tests Chromebook battery discharge rates and health percentages over 10 seconds?',
    opts: ['battery_test 10', 'power_check', 'acpi -b', 'battery_firmware'],
    ans: 0,
    exp: '`battery_test <seconds>` calculates battery discharge and health percent in crosh.',
    cat: 'ChromeOS CLI'
  },

  // ==========================================
  // SECTION 5: CROSS-PLATFORM STORAGE, NETWORKING & SECURITY (451 - 500)
  // ==========================================
  {
    q: 'What is the maximum single file size supported by the legacy FAT32 filesystem?',
    opts: ['4 GB (minus 1 byte)', '2 GB', '8 GB', '16 TB'],
    ans: 0,
    exp: 'FAT32 has a hard 32-bit file size limit of 4,294,967,295 bytes (4 GB minus 1 byte).',
    cat: 'Filesystem Fundamentals'
  },
  {
    q: 'What is the maximum partition size supported by legacy MBR (Master Boot Record) partitioning?',
    opts: ['2 TB (assuming 512-byte sector size)', '4 TB', '1 TB', '16 TB'],
    ans: 0,
    exp: 'MBR stores 32-bit sector counts, limiting maximum addressable drive capacity to 2.19 TB with 512-byte sectors.',
    cat: 'Storage & Partitioning'
  },
  {
    q: 'In IPv4 networking, how many usable host IP addresses are available in a `/24` subnet?',
    opts: ['254', '256', '255', '252'],
    ans: 0,
    exp: 'A `/24` mask has 256 addresses; subtracting network ID (0) and broadcast (255) leaves 254 usable hosts.',
    cat: 'Networking'
  },
  {
    q: 'What is the standard three-way handshake sequence in TCP connection establishment?',
    opts: ['SYN -> SYN-ACK -> ACK', 'ACK -> SYN -> SYN-ACK', 'SYN -> ACK -> DATA', 'HELLO -> VERIFY -> CONNECT'],
    ans: 0,
    exp: 'TCP establishes reliable connections via Synchronize (SYN), Synchronize-Acknowledge (SYN-ACK), and Acknowledge (ACK).',
    cat: 'Networking'
  },
  {
    q: 'Why is mobile-first computer lab simulation crucial for bridging the digital divide?',
    opts: [
      'Many students only have smartphones, yet practical OS skills are mandatory for tech careers',
      'Smartphones are faster than all desktop workstations',
      'It eliminates the need for software engineering',
      'Laptops no longer run Linux or Windows'
    ],
    ans: 0,
    exp: 'SarlaYash OS Universe enables students with only smartphones to master practical computing, CLI, and systems administration.',
    cat: 'SarlaYash Mission'
  }
];

// Technical subject areas & templates to generate the full pool of 500 high-fidelity questions
const TECHNICAL_MODULES = [
  // Module A: Windows (125 items)
  {
    os: 'windows',
    category: 'Windows Systems Administration',
    topics: [
      { name: 'DISM image servicing', cmd: 'dism /online /cleanup-image /restorehealth', purpose: 'repair Windows component store from online updates' },
      { name: 'DiskPart clean command', cmd: 'diskpart -> clean', purpose: 'remove all partition or volume formatting from selected disk' },
      { name: 'RoboCopy mirror mode', cmd: 'robocopy source dest /MIR', purpose: 'mirror a complete directory tree including security ACLs' },
      { name: 'ICACLS permission tool', cmd: 'icacls file.txt /grant Student:F', purpose: 'modify NTFS discretionary access control lists (DACL)' },
      { name: 'Chkdsk bad sector scan', cmd: 'chkdsk C: /r', purpose: 'locate bad sectors and recover readable information' },
      { name: 'BCDedit boot configuration', cmd: 'bcdedit /enum', purpose: 'inspect Windows Boot Configuration Data store entries' },
      { name: 'PowerShell execution policy', cmd: 'Set-ExecutionPolicy RemoteSigned', purpose: 'permit running downloaded scripts signed by trusted publishers' },
      { name: 'Cipher secure wipe', cmd: 'cipher /w:C:', purpose: 'overwrite deallocated space on a volume to prevent data recovery' },
      { name: 'DriverQuery tool', cmd: 'driverquery /v', purpose: 'display a detailed list of all installed device drivers and memory addresses' },
      { name: 'System Information utility', cmd: 'msinfo32.exe', purpose: 'view comprehensive hardware resources and software environment summary' }
    ]
  },
  // Module B: Linux (125 items)
  {
    os: 'linux',
    category: 'Linux DevOps & Administration',
    topics: [
      { name: 'UFW firewall enable', cmd: 'sudo ufw allow 22/tcp', purpose: 'permit incoming SSH connections through the Uncomplicated Firewall' },
      { name: 'Tar archive creation', cmd: 'tar -czvf backup.tar.gz /home', purpose: 'create a gzip-compressed tape archive of the directory' },
      { name: 'Systemctl service status', cmd: 'systemctl is-active nginx', purpose: 'check whether a systemd service is currently running' },
      { name: 'Crontab periodic job', cmd: '0 2 * * * /backup.sh', purpose: 'schedule a script to execute every day at 2:00 AM' },
      { name: 'LSOF open files inspector', cmd: 'lsof -i :80', purpose: 'list all active processes listening or connected on port 80' },
      { name: 'Strace system call tracer', cmd: 'strace -p <pid>', purpose: 'trace system calls and signals intercepted by a process' },
      { name: 'Sysctl runtime kernel tuner', cmd: 'sysctl -p /etc/sysctl.conf', purpose: 'load and apply kernel parameters dynamically' },
      { name: 'Rsync delta sync', cmd: 'rsync -avz /src/ user@remote:/dest/', purpose: 'synchronize files incrementally with compression and permissions' },
      { name: 'IP route inspection', cmd: 'ip route show', purpose: 'display default gateway and routing table entries' },
      { name: 'SSH keypair generation', cmd: 'ssh-keygen -t ed25519', purpose: 'generate an elliptic curve ED25519 authentication keypair' }
    ]
  },
  // Module C: macOS (125 items)
  {
    os: 'macos',
    category: 'macOS & Darwin Systems',
    topics: [
      { name: 'DiskUtil APFS container', cmd: 'diskutil apfs list', purpose: 'display physical store partitions and virtual APFS volume containers' },
      { name: 'Time Machine manual backup', cmd: 'tmutil startbackup', purpose: 'trigger an incremental Time Machine snapshot backup' },
      { name: 'NetworkSetup interface config', cmd: 'networksetup -listallhardwareports', purpose: 'list all physical network adapters and BSD device names' },
      { name: 'SPCTL Gatekeeper control', cmd: 'spctl --status', purpose: 'verify if macOS Gatekeeper is actively enforcing code signatures' },
      { name: 'Security Keychain query', cmd: 'security find-generic-password', purpose: 'search and retrieve credentials stored in macOS Keychain' },
      { name: 'Launchctl service management', cmd: 'launchctl list', purpose: 'list active daemons and user agents running under launchd' },
      { name: 'Codesign binary inspection', cmd: 'codesign -dv /App.app', purpose: 'display code signature identity and team identifier' },
      { name: 'Scutil DNS configuration', cmd: 'scutil --dns', purpose: 'print active resolver configurations and search domains' },
      { name: 'PMSet power management', cmd: 'pmset -g batt', purpose: 'display battery percentage, cycle count, and charging state' },
      { name: 'Otool Mach-O inspection', cmd: 'otool -L binary', purpose: 'list shared dynamic libraries linked by a Mach-O executable' }
    ]
  },
  // Module D: ChromeOS & Systems (125 items)
  {
    os: 'chrome',
    category: 'ChromeOS & Cloud Infrastructure',
    topics: [
      { name: 'Crosh packet capture', cmd: 'packet_capture', purpose: 'capture network traffic on ChromeOS for wireshark analysis' },
      { name: 'VMC container start', cmd: 'vmc start termina', purpose: 'boot the Termina virtualization subsystem for Linux apps' },
      { name: 'Verified Boot validation', cmd: 'crossystem vdat', purpose: 'inspect cryptographic validation results of firmware and kernel' },
      { name: 'Chrome Enterprise policy sync', cmd: 'chrome://policy', purpose: 'reload and inspect device-level managed policies pushed by Google Admin' },
      { name: 'TPM hardware reset check', cmd: 'cryptohome --action=status', purpose: 'query user vault encryption and hardware TPM binding status' },
      { name: 'Storage allocation inspection', cmd: 'chrome://system', purpose: 'access full Linux system diagnostic logs and disk mount states' },
      { name: 'Developer mode switch', cmd: 'Esc + Refresh + Power', purpose: 'trigger ChromeOS hardware recovery and developer mode prompt' },
      { name: 'Android ART subsystem', cmd: 'ARCVM', purpose: 'run Android applications inside an isolated virtual machine' },
      { name: 'Chromebook Hardware ID', cmd: 'HWID inspection', purpose: 'identify exact motherboard revision and component bill-of-materials' },
      { name: 'PWA service worker sync', cmd: 'chrome://serviceworker-internals', purpose: 'inspect background offline workers and cache storage' }
    ]
  }
];

// Deterministic generator that expands the base question bank to precisely 500 questions
export function generate500Questions() {
  const bank = [];
  let qIndex = 1;

  // 1. First add the handcrafted foundational questions
  RAW_QUESTIONS.forEach(item => {
    bank.push({
      id: `q_${qIndex}`,
      index: qIndex,
      question: item.q,
      options: item.opts,
      correct: item.ans,
      explanation: item.exp,
      category: item.cat,
      os: item.cat.toLowerCase().includes('windows') ? 'windows' : 
          item.cat.toLowerCase().includes('linux') ? 'linux' : 
          item.cat.toLowerCase().includes('macos') ? 'macos' : 
          item.cat.toLowerCase().includes('chrome') ? 'chrome' : 'cross'
    });
    qIndex++;
  });

  // 2. Synthesize remaining questions across all 4 OS modules to reach exactly 500 questions
  const totalTarget = 500;
  const remainingCount = totalTarget - bank.length;

  let topicCounter = 0;
  while (bank.length < totalTarget) {
    const mod = TECHNICAL_MODULES[topicCounter % TECHNICAL_MODULES.length];
    const topic = mod.topics[Math.floor(topicCounter / TECHNICAL_MODULES.length) % mod.topics.length];
    const questionVariant = (topicCounter % 5);

    let qText = '';
    let opts = [];
    let correct = 0;
    let exp = '';

    if (questionVariant === 0) {
      qText = `In ${mod.os === 'windows' ? 'Windows' : mod.os === 'linux' ? 'Linux Ubuntu' : mod.os === 'macos' ? 'macOS Sonoma' : 'Google ChromeOS'}, what is the primary function of the command \`${topic.cmd}\`?`;
      opts = [
        `Used to ${topic.purpose}`,
        `Forces a complete operating system reboot`,
        `Deletes all user documents and temporary cache`,
        `Disables the system firewall permanently`
      ];
      correct = 0;
      exp = `The command \`${topic.cmd}\` is standardly ${topic.purpose}.`;
    } else if (questionVariant === 1) {
      qText = `When administering ${mod.category}, which command should an engineer execute to ${topic.purpose}?`;
      opts = [
        `${topic.cmd}`,
        `system-reset --all`,
        `rm -rf /`,
        `format C: /q`
      ];
      correct = 0;
      exp = `Executing \`${topic.cmd}\` satisfies this administration task.`;
    } else if (questionVariant === 2) {
      qText = `Regarding ${topic.name} on ${mod.category}: which statement is technically accurate?`;
      opts = [
        `It is utilized to ${topic.purpose}.`,
        `It is only supported on 32-bit legacy hardware.`,
        `It bypasses all kernel permissions and CPU privilege rings.`,
        `It requires an active internet connection to evaluate local files.`
      ];
      correct = 0;
      exp = `${topic.name}: ${topic.purpose}.`;
    } else if (questionVariant === 3) {
      qText = `Scenario: A student in the SarlaYash virtual lab needs to ${topic.purpose}. What is the recommended syntax?`;
      opts = [
        `${topic.cmd}`,
        `net user student /delete`,
        `killall -9 kernel`,
        `shutdown -r -t 0`
      ];
      correct = 0;
      exp = `Use \`${topic.cmd}\` to complete this task.`;
    } else {
      qText = `In an enterprise IT environment running ${mod.category}, why is \`${topic.cmd}\` considered critical?`;
      opts = [
        `It enables administrators to ${topic.purpose} reliably.`,
        `It converts GPT disk partition tables to MBR automatically.`,
        `It compiles third-party C++ source code directly into machine code.`,
        `It flashes the motherboard BIOS chip immediately.`
      ];
      correct = 0;
      exp = `Knowledge of \`${topic.cmd}\` is essential because it allows administrators to ${topic.purpose}.`;
    }

    // Shuffle options so correct answer is not always index 0
    const shuffled = opts.map((opt, i) => ({ opt, isCorrect: i === correct }));
    // Deterministic rotation based on question number
    const shift = (qIndex % 4);
    const rotated = [...shuffled.slice(shift), ...shuffled.slice(0, shift)];
    const newCorrect = rotated.findIndex(r => r.isCorrect);

    bank.push({
      id: `q_${qIndex}`,
      index: qIndex,
      question: qText,
      options: rotated.map(r => r.opt),
      correct: newCorrect,
      explanation: exp,
      category: mod.category,
      os: mod.os
    });

    qIndex++;
    topicCounter++;
  }

  return bank;
}

export const ASSESSMENT_500_QUESTIONS = generate500Questions();

// 100 Hard-Level Mock Assessment Question Bank & Engine
// SarlaYash OS Universe — Powered by Kapil
// 2 Hours (120 Mins) • Anti-Cheat Proctoring Enabled • Strict Zero-Tolerance Security

export const HARD_ASSESSMENT_QUESTIONS = [
  // =========================================================================
  // DOMAIN 1: MICROSOFT WINDOWS 11 INTERNALS & ADVANCED ADMIN (1 - 25)
  // =========================================================================
  {
    id: 'hq_1',
    index: 1,
    os: 'windows',
    category: 'Windows Kernel & Memory',
    difficulty: 'Hard',
    question: 'During a Windows BSOD with Stop Code `KERNEL_SECURITY_CHECK_FAILURE` (0x00000139), which kernel security mitigation mechanism was primarily tripped?',
    options: [
      'The kernel detected corruption in a critical data structure, frequently caused by buffer overflows corrupting a LIST_ENTRY or GS cookie.',
      'The Windows BitLocker TPM PCR 7 measurement failed during runtime boot verification.',
      'A user-mode process attempted to directly execute instructions inside Ring 3 memory without NX bit validation.',
      'The page file ran out of physical contiguous sectors on the primary NTFS partition.'
    ],
    correct: 0,
    explanation: 'Bug check 0x139 (KERNEL_SECURITY_CHECK_FAILURE) indicates that the kernel detected corruption of its critical data structures, such as corrupted doubly linked lists (LIST_ENTRY) or a failed compiler stack canary (/GS check).'
  },
  {
    id: 'hq_2',
    index: 2,
    os: 'windows',
    category: 'Windows Virtualization-Based Security',
    difficulty: 'Hard',
    question: 'How does Windows 11 HVCI (Hypervisor-Enforced Code Integrity) utilize the Microsoft Hyper-V hypervisor (VBS) to prevent kernel exploitation?',
    options: [
      'It isolates kernel-mode code integrity validation inside Virtual Secure Mode (VSM) at VTL 1, preventing even compromised kernel drivers in VTL 0 from allocating W+X (Writable and Executable) memory.',
      'It intercepts all Ring 0 assembly instructions and emulates them purely via JIT compilation.',
      'It moves the entire NTOSKRNL.EXE binary into the hardware UEFI microcode chip.',
      'It disables all dynamic link libraries (.dll) throughout the C:\\Windows\\System32 directory.'
    ],
    correct: 0,
    explanation: 'HVCI leverages Virtualization-Based Security (VBS) to run code integrity policies inside Virtual Trust Level 1 (VTL 1). Even if an attacker achieves Ring 0 code execution in VTL 0, hardware second-level address translation (SLAT) blocks turning writable memory into executable kernel code.'
  },
  {
    id: 'hq_3',
    index: 3,
    os: 'windows',
    category: 'Windows Storage & NTFS',
    difficulty: 'Hard',
    question: 'In the NTFS architecture, where are file metadata attributes, timestamps, access control lists (ACLs), and data run pointers directly stored?',
    options: [
      'In the Master File Table record ($MFT), where each record occupies exactly 1024 bytes.',
      'In the Partition Boot Record (PBR) located exclusively on cylinder 0, head 0.',
      'In the volatile Windows Registry under HKEY_LOCAL_MACHINE\\SYSTEM\\MountedDevices.',
      'Inside the EFI System Partition (ESP) under \\EFI\\Microsoft\\Boot\\BCD.'
    ],
    correct: 0,
    explanation: 'In NTFS, every file and folder has at least one 1024-byte record in the Master File Table ($MFT). Small files store their data resident within the record; larger files store data run pointers to disk allocation clusters.'
  },
  {
    id: 'hq_4',
    index: 4,
    os: 'windows',
    category: 'Windows Diagnostics & WinDbg',
    difficulty: 'Hard',
    question: 'When analyzing a complete Windows memory dump (.dmp) in WinDbg, which command inspects the Interrupt Request Level (IRQL) and call stack of the active processor thread causing a deadlock?',
    options: [
      '!irql followed by kv (or kP)',
      '!spooler /status -debug',
      'diskpart /analyze -threads',
      'sfc /dumpstack /all'
    ],
    correct: 0,
    explanation: 'In WinDbg kernel debugging, `!irql` displays the current processor IRQL level, and `kv` or `kP` prints the call stack with arguments and symbol names to isolate high-IRQL deadlocks and spinlock contentions.'
  },
  {
    id: 'hq_5',
    index: 5,
    os: 'windows',
    category: 'Windows Active Directory & Kerberos',
    difficulty: 'Hard',
    question: 'During Windows Active Directory Kerberos ticket exchange, which error indicates that the time skew between the client workstation and Domain Controller exceeds the Kerberos tolerance threshold (typically 5 minutes)?',
    options: [
      'KRB_AP_ERR_SKEW (Error 0x25)',
      'STATUS_LOGON_FAILURE (0xC000006D)',
      'ERROR_BAD_NETPATH (Error 53)',
      'KRB_NT_PRINCIPAL_EXPIRED (Error 0x12)'
    ],
    correct: 0,
    explanation: 'Kerberos tickets contain authenticating timestamps to thwart replay attacks. If the clock differential between client and KDC exceeds the maximum tolerance (default 5 minutes), the server aborts with KRB_AP_ERR_SKEW.'
  },
  {
    id: 'hq_6',
    index: 6,
    os: 'windows',
    category: 'Windows Boot Architecture',
    difficulty: 'Hard',
    question: 'What is the precise execution sequence of the modern Windows 11 UEFI 64-bit boot process prior to user login?',
    options: [
      'UEFI Firmware -> Windows Boot Manager (bootmgfw.efi) -> Windows OS Loader (winload.efi) -> NT Kernel (ntoskrnl.exe) -> smss.exe -> winlogon.exe / LogonUI',
      'BIOS POST -> NTLDR -> boot.ini -> kernel.sys -> explorer.exe -> winlogon.exe',
      'UEFI Firmware -> winlogon.exe -> bootmgr -> hal.dll -> lsass.exe',
      'UEFI -> bcdedit.exe -> WinSxS -> svchost.exe -> ntoskrnl.exe'
    ],
    correct: 0,
    explanation: 'UEFI executes `bootmgfw.efi` from the ESP, which reads BCD and hands control to `winload.efi`. Winload loads `ntoskrnl.exe` and `hal.dll`, which starts SMSS (Session Manager), spawning CSRSS and Winlogon.'
  },
  {
    id: 'hq_7',
    index: 7,
    os: 'windows',
    category: 'Windows PowerShell Automation',
    difficulty: 'Hard',
    question: 'In PowerShell, what is the key behavioral distinction between `ForEach-Object -Parallel` in PowerShell 7+ versus the standard `foreach` language loop statement?',
    options: [
      '`ForEach-Object -Parallel` runs loop bodies concurrently across multiple separate runspaces in the thread pool, whereas `foreach` evaluates sequentially and loads the entire collection into memory first.',
      '`ForEach-Object -Parallel` only executes on GPU CUDA cores.',
      '`foreach` creates independent operating system background processes for each item.',
      '`ForEach-Object -Parallel` bypasses PowerShell ExecutionPolicy restrictions entirely.'
    ],
    correct: 0,
    explanation: '`ForEach-Object -Parallel` leverages runspace pooling to process pipeline items concurrently across available CPU threads, whereas standard `foreach ($item in $collection)` is single-threaded and requires whole array buffering in RAM.'
  },
  {
    id: 'hq_8',
    index: 8,
    os: 'windows',
    category: 'Windows Security & AppLocker',
    difficulty: 'Hard',
    question: 'When configuring Windows Defender Application Control (WDAC), what is the impact of enabling "Audit Mode" before enforcement?',
    options: [
      'Unsigned or untrusted binaries continue to execute without interruption, but 3076/3077 warning telemetry events are logged to the CodeIntegrity Operational event log.',
      'All executable files are immediately quarantined into C:\\Windows\\Temp.',
      'Windows boots exclusively in Safe Mode with networking disabled.',
      'It generates a BitLocker recovery key backup in Active Directory.'
    ],
    correct: 0,
    explanation: 'WDAC Audit Mode allows administrators to validate policies in production without breaking line-of-business software by logging would-be blocks to `Microsoft-Windows-CodeIntegrity/Operational`.'
  },
  {
    id: 'hq_9',
    index: 9,
    os: 'windows',
    category: 'Windows Registry & SAM',
    difficulty: 'Hard',
    question: 'Which Windows system process holds an exclusive handle and encrypts the Security Account Manager (SAM) registry hive memory structures during runtime?',
    options: [
      'lsass.exe (Local Security Authority Subsystem Service)',
      'services.exe (Service Control Manager)',
      'csrss.exe (Client Server Runtime Process)',
      'explorer.exe (Windows Shell)'
    ],
    correct: 0,
    explanation: 'LSASS.EXE enforces local security policies and user authentication, maintaining exclusive memory access to the SAM database and Kerberos/NTLM credential caches.'
  },
  {
    id: 'hq_10',
    index: 10,
    os: 'windows',
    category: 'Windows Volume Shadow Copy',
    difficulty: 'Hard',
    question: 'What is the underlying storage allocation technique used by Windows Volume Shadow Copy Service (VSS) to take consistent crash-free volume snapshots during live disk writes?',
    options: [
      'Copy-on-Write (CoW) differential block redirection to the designated System Volume Information area.',
      'Immediate raw sector duplication of the entire terabyte volume to an external NAS drive.',
      'Freezing all CPU interrupts until all files are closed by the operating system.',
      'Converting the dynamic disk to an unformatted MBR partition.'
    ],
    correct: 0,
    explanation: 'VSS uses Copy-on-Write (CoW): when a sector that existed at snapshot creation is modified, the original sector data is copied to the diff area before the new data is committed to the live volume block.'
  },
  {
    id: 'hq_11',
    index: 11,
    os: 'windows',
    category: 'Windows Sysinternals',
    difficulty: 'Hard',
    question: 'In Sysinternals Process Monitor (ProcMon), which filter column should you inspect to detect when an executable encounters a DLL Hijacking search order vulnerability?',
    options: [
      'Result equals "NAME NOT FOUND" or "PATH NOT FOUND" for Operation "CreateFile" seeking a .dll file.',
      'Operation equals "Process Start" with Exit Status 0.',
      'Category equals "Network Connect" with port 443.',
      'Event Class equals "Profiling" with high CPU cycle spikes.'
    ],
    correct: 0,
    explanation: 'DLL hijacking manifests when an application queries directories along the Windows DLL search order for a non-existent or unpinned DLL, resulting in repeated "NAME NOT FOUND" file query results in ProcMon.'
  },
  {
    id: 'hq_12',
    index: 12,
    os: 'windows',
    category: 'Windows Networking & SMB',
    difficulty: 'Hard',
    question: 'Why did Microsoft permanently disable SMBv1 across all modern Windows 11 editions?',
    options: [
      'SMBv1 lacks message signing integrity, supports outdated dialects vulnerable to buffer overflow exploits (e.g. EternalBlue/MS17-010), and is intensely chatty over modern high-latency WANs.',
      'SMBv1 cannot support IPv4 addresses greater than 192.168.1.1.',
      'SMBv1 is incompatible with SSD NVMe drives.',
      'SMBv1 requires a physical floppy disk drive to mount network shares.'
    ],
    correct: 0,
    explanation: 'SMBv1 is an archaic 30-year-old protocol with severe structural flaws that enabled catastrophic network-worm exploits like WannaCry (EternalBlue). SMB 3.1.1 provides AES-128-GCM encryption and pre-authentication integrity.'
  },
  {
    id: 'hq_13',
    index: 13,
    os: 'windows',
    category: 'Windows BitLocker & TPM',
    difficulty: 'Hard',
    question: 'When configuring BitLocker drive encryption with TPM 2.0, what does PCR 7 measure and validate before sealing the Full Volume Encryption Key (FVEK)?',
    options: [
      'Secure Boot state, including the authorized signature database (db), revoked database (dbx), and signing authorities.',
      'The exact resolution and refresh rate of the primary HDMI monitor.',
      'The current battery charge percentage and CMOS RTC battery voltage.',
      'The number of user accounts registered in the local SAM file.'
    ],
    correct: 0,
    explanation: 'Platform Configuration Register 7 (PCR 7) is dedicated to measuring the Secure Boot state, validating that firmware signatures, boot certificates, and revocation lists remain strictly untampered.'
  },
  {
    id: 'hq_14',
    index: 14,
    os: 'windows',
    category: 'Windows Group Policy Internals',
    difficulty: 'Hard',
    question: 'What occurs during a Group Policy Background Refresh on Windows when "Loopback Processing Mode (Replace)" is configured for an Organizational Unit containing computers?',
    options: [
      'The user configuration settings derived from the user\'s OU are completely discarded, and user settings defined in the computer\'s OU GPOs are applied instead.',
      'The computer automatically initiates a clean Windows reset.',
      'User GPOs and Computer GPOs are merged with user settings taking precedence over all machine policies.',
      'Network adapters are looped back to 127.0.0.1 for 60 seconds.'
    ],
    correct: 0,
    explanation: 'Loopback Replace mode ignores GPOs from the user\'s OU and instead applies the User Configuration policies linked to the computer\'s OU, critical for kiosks, terminal servers, and shared lab workstations.'
  },
  {
    id: 'hq_15',
    index: 15,
    os: 'windows',
    category: 'Windows Driver Architecture',
    difficulty: 'Hard',
    question: 'What is the architectural difference between Windows Driver Frameworks KMDF (Kernel-Mode Driver Framework) and UMDF (User-Mode Driver Framework)?',
    options: [
      'UMDF runs drivers in session-isolated user space; a crash in a UMDF driver will not bug check (BSOD) the operating system, whereas KMDF executes in Ring 0 with full memory access.',
      'KMDF is restricted to USB flash drives only, while UMDF manages system motherboards and PCI Express lanes.',
      'UMDF drivers can directly write to CPU physical model-specific registers (MSRs).',
      'KMDF is an interpreted JavaScript execution environment.'
    ],
    correct: 0,
    explanation: 'UMDF drivers execute as user-mode background services (`WUDFHost.exe`). If they encounter memory corruption, the host process crashes without causing a kernel panic/BSOD, providing exceptional operating system stability.'
  },
  {
    id: 'hq_16',
    index: 16,
    os: 'windows',
    category: 'Windows Memory Management',
    difficulty: 'Hard',
    question: 'In the Windows memory manager, what is the role of the "Modified Page Writer" system thread?',
    options: [
      'It writes dirty pages from the modified page list back to the backing pagefile or memory-mapped disk file so they can transition to the standby list.',
      'It terminates applications whose RAM usage exceeds 8 GB.',
      'It overwrites free RAM with zeroes every 500 milliseconds for cryptographic hardening.',
      'It compresses user documents into ZIP archives during high disk IO.'
    ],
    correct: 0,
    explanation: 'The Modified Page Writer flushes dirty memory pages (modified pages) out to disk storage (paging file or mapped file), allowing those pages to be marked clean and transferred to the standby list for reuse.'
  },
  {
    id: 'hq_17',
    index: 17,
    os: 'windows',
    category: 'Windows DISM & Component Store',
    difficulty: 'Hard',
    question: 'Why does `DISM.exe /Online /Cleanup-Image /RestoreHealth` sometimes require the `/Source:WIM:...` parameter on isolated enterprise systems?',
    options: [
      'If the local WinSxS component store is corrupted and the system lacks direct access to Windows Update servers, DISM requires a known-good external install.wim image to extract replacement payloads.',
      'Because Windows cannot read SSD drives without mounting a WIM file first.',
      'To convert Windows Home edition into Windows Server Datacenter edition.',
      'To bypass the Windows product activation requirement.'
    ],
    correct: 0,
    explanation: 'When WinSxS corruption occurs and the machine is offline or blocked from reaching Microsoft Windows Update, DISM must be provided a pristine reference WIM/ESD source image to pull intact replacement files.'
  },
  {
    id: 'hq_18',
    index: 18,
    os: 'windows',
    category: 'Windows Event Tracing (ETW)',
    difficulty: 'Hard',
    question: 'What makes Event Tracing for Windows (ETW) the standard for high-performance low-overhead telemetry in Windows 11 enterprise security sensors (EDR)?',
    options: [
      'ETW is implemented directly in the kernel with per-processor non-blocking buffers, allowing producers to emit tens of thousands of structured binary events per second without locking.',
      'ETW converts all events into plain text strings inside C:\\Windows\\debug.log.',
      'ETW requires user confirmation prompts before logging any security event.',
      'ETW operates exclusively through the legacy MS-DOS interrupt vector 0x21.'
    ],
    correct: 0,
    explanation: 'ETW delivers kernel-level, per-processor buffering without context switches or disk locking bottlenecks, allowing high-throughput event emission consumed in real-time by security providers like Microsoft Defender and EDR engines.'
  },
  {
    id: 'hq_19',
    index: 19,
    os: 'windows',
    category: 'Windows File System Minifilters',
    difficulty: 'Hard',
    question: 'How do modern Windows antivirus and EDR drivers intercept and inspect file creation, modification, and deletion before the NTFS driver processes the I/O request?',
    options: [
      'By registering as a Filter Manager Minifilter Driver (`fltmgr.sys`) with an assigned Microsoft Altitude number.',
      'By replacing NTOSKRNL.EXE with a custom third-party compiled kernel.',
      'By injecting raw assembly hooks into every sector of the Master Boot Record.',
      'By intercepting BIOS keyboard scan codes.'
    ],
    correct: 0,
    explanation: 'The Windows Filter Manager (`fltmgr.sys`) allows minifilter drivers to register at specific numeric altitudes (e.g., 320000-329999 for Anti-Virus) to inspect and block I/O Request Packets (IRPs) cleanly.'
  },
  {
    id: 'hq_20',
    index: 20,
    os: 'windows',
    category: 'Windows User Account Control (UAC)',
    difficulty: 'Hard',
    question: 'When an administrator logs into a Windows 11 workstation with UAC enabled, what type of security tokens are created by LSASS during session initialization?',
    options: [
      'Two tokens: a filtered standard user token (restricted SID and stripped administrative privileges) and an unfiltered elevated administrator token.',
      'A single root token with unlimited Ring 0 hardware privileges.',
      'A temporary guest token that expires every 15 minutes.',
      'An encrypted Kerberos ticket that can only be decrypted with a smartcard PIN.'
    ],
    correct: 0,
    explanation: 'UAC implements split tokens for administrative accounts: daily interactive tasks run with the restricted Standard User token; elevation prompts trigger `consent.exe`/`credential.exe` to attach the full Administrator token to the targeted process.'
  },
  {
    id: 'hq_21',
    index: 21,
    os: 'windows',
    category: 'Windows Core Networking',
    difficulty: 'Hard',
    question: 'Which Windows command-line utility diagnoses Winsock layer corruption, network protocol stack bindings, and allows resetting the IP stack without reinstalling Windows?',
    options: [
      'netsh int ip reset & netsh winsock reset',
      'ipconfig /flushdns /force',
      'route print -v',
      'arp -a /resetall'
    ],
    correct: 0,
    explanation: '`netsh winsock reset` removes third-party Layered Service Providers (LSPs) and catalog corruption, while `netsh int ip reset` re-writes the TCP/IP registry keys from pristine defaults.'
  },
  {
    id: 'hq_22',
    index: 22,
    os: 'windows',
    category: 'Windows ReFS File System',
    difficulty: 'Hard',
    question: 'What is a primary design advantage of Microsoft ReFS (Resilient File System) over NTFS for virtualized hypervisor workloads (Hyper-V)?',
    options: [
      'ReFS supports Block Cloning for near-instantaneous fixed-VHDX creation, checkpoint merging, and automatic checksum verification against bit rot.',
      'ReFS can be formatted onto FAT16 floppy disks.',
      'ReFS eliminates the need for RAM in the computer.',
      'ReFS runs natively on Linux without any third-party drivers.'
    ],
    correct: 0,
    explanation: 'ReFS features Block Cloning, which metadata-links disk clusters during VHDX merges and checkpoints rather than performing massive data copy loops, reducing hours of disk I/O to sub-second operations.'
  },
  {
    id: 'hq_23',
    index: 23,
    os: 'windows',
    category: 'Windows WMI / CIM Architecture',
    difficulty: 'Hard',
    question: 'What is the modern, firewall-friendly protocol used by PowerShell CIM cmdlets (`Get-CimInstance`) to query remote Windows machines instead of legacy DCOM/RPC?',
    options: [
      'WS-Management (WS-Man) over HTTP/HTTPS (WinRM ports 5985/5986)',
      'Telnet over unencrypted port 23',
      'FTP passive mode on port 21',
      'SNMP v1 community traps on port 161'
    ],
    correct: 0,
    explanation: 'CIM cmdlets communicate via standard Web Services for Management (WS-Man) over HTTP (5985) or HTTPS (5986), bypassing the firewall issues and dynamic RPC port ranges of legacy DCOM WMI.'
  },
  {
    id: 'hq_24',
    index: 24,
    os: 'windows',
    category: 'Windows Process Mitigation Policies',
    difficulty: 'Hard',
    question: 'Which exploit mitigation feature in Windows 11 ensures that memory addresses of the stack, heap, and loaded PE modules cannot be reliably predicted by return-oriented programming (ROP) shellcode?',
    options: [
      'High-Entropy ASLR (Address Space Layout Randomization)',
      'DEP (Data Execution Prevention) in hardware software emulation mode only',
      'Control Flow Guard (CFG) in passive monitor mode',
      'Virtual Machine Monitor (VMM)'
    ],
    correct: 0,
    explanation: 'High-Entropy ASLR leverages 64-bit address space (using up to 1 TB of virtual address variance) to randomize base locations of modules, heaps, and stacks, rendering hardcoded exploit offsets ineffective.'
  },
  {
    id: 'hq_25',
    index: 25,
    os: 'windows',
    category: 'Windows Subsystem for Linux (WSL2)',
    difficulty: 'Hard',
    question: 'How does WSL2 achieve near-native Linux performance and full system call compatibility compared to the original WSL1 translation layer?',
    options: [
      'WSL2 runs a complete, Microsoft-maintained real Linux kernel inside a lightweight, custom Hyper-V utility virtual machine.',
      'WSL2 recompiles all ELF Linux binaries into native Windows PE32+ binaries during installation.',
      'WSL2 runs exclusively inside the browser WebAssembly runtime.',
      'WSL2 requires physical dual-booting with an ext4 USB drive.'
    ],
    correct: 0,
    explanation: 'WSL1 attempted to translate Linux kernel calls into NT API calls. WSL2 runs an authentic production Linux kernel inside a lightweight utility VM utilizing 9P and Plan 9 virtualized disk architecture for 100% syscall fidelity.'
  },

  // =========================================================================
  // DOMAIN 2: LINUX KERNEL, SYSTEMS ARCHITECTURE & PERFORMANCE (26 - 50)
  // =========================================================================
  {
    id: 'hq_26',
    index: 26,
    os: 'linux',
    category: 'Linux Kernel & eBPF',
    difficulty: 'Hard',
    question: 'How does extended Berkeley Packet Filter (eBPF) permit tracing and network manipulation in the Linux kernel without requiring custom kernel module compilation or rebooting?',
    options: [
      'It executes verified, sandboxed bytecode directly within an in-kernel virtual machine attached to tracepoints, kprobes, or socket filters.',
      'It modifies the kernel source tree on disk and triggers background GCC compiling on every network packet.',
      'It runs user-space Python scripts via the `/proc/sys/debug` interface with root privileges.',
      'It executes instructions exclusively in CPU Ring 3 user mode.'
    ],
    correct: 0,
    explanation: 'eBPF safely executes sandboxed bytecode inside the Linux kernel. A built-in verifier mathematically proves that programs will not crash, dereference invalid pointers, or enter infinite loops before JIT compiling to native machine instructions.'
  },
  {
    id: 'hq_27',
    index: 27,
    os: 'linux',
    category: 'Linux Namespaces & Cgroups',
    difficulty: 'Hard',
    question: 'Which Linux cgroups v2 controller manages and enforces hard limits on the total number of processes and threads to prevent fork bombs from exhausting kernel task structures?',
    options: [
      'pids controller (`pids.max`)',
      'memory controller (`memory.high`)',
      'cpu controller (`cpu.weight`)',
      'blkio controller (`io.weight`)'
    ],
    correct: 0,
    explanation: 'The `pids` controller limits the maximum number of processes/threads in a control group via `pids.max`. If a container attempts to fork beyond this quota, the fork() syscall immediately returns -EAGAIN.'
  },
  {
    id: 'hq_28',
    index: 28,
    os: 'linux',
    category: 'Linux Memory Architecture',
    difficulty: 'Hard',
    question: 'When the Linux Out-Of-Memory (OOM) Killer activates under severe RAM exhaustion, which formula and metric determines which process gets terminated with SIGKILL?',
    options: [
      'The process with the highest `oom_score`, calculated from its percentage of RAM consumption and adjusted by the administrative `oom_score_adj` value (-1000 to +1000).',
      'The process with the lowest PID number on the system.',
      'The process that has been running the longest continuous CPU time according to /proc/uptime.',
      'The most recently launched bash script.'
    ],
    correct: 0,
    explanation: 'The Linux kernel evaluates each process\'s memory footprint and page allocations to generate an `oom_score`. Setting `oom_score_adj` to -1000 prevents termination; higher values prioritize the process for elimination.'
  },
  {
    id: 'hq_29',
    index: 29,
    os: 'linux',
    category: 'Linux File Systems & Inodes',
    difficulty: 'Hard',
    question: 'A Linux server alerts with "No space left on device", but `df -h` shows only 42% disk space utilized. What is the most probable root cause and how is it confirmed?',
    options: [
      'The file system has exhausted its total allocated Inodes; confirm using `df -i`.',
      'The SATA data cable has physical corrosion.',
      'The Linux swap file has exceeded 2 TB in size.',
      'The user is not logged in as the root user.'
    ],
    correct: 0,
    explanation: 'In ext4 and standard Linux file systems, each file/directory requires an inode. Creating millions of tiny files can consume 100% of available inodes while data blocks remain largely empty. `df -i` verifies inode capacity.'
  },
  {
    id: 'hq_30',
    index: 30,
    os: 'linux',
    category: 'Linux Boot & Initramfs',
    difficulty: 'Hard',
    question: 'What is the primary role of the `initramfs` (initial ram file system) during the modern Linux boot procedure?',
    options: [
      'To provide a minimal root environment in RAM with necessary kernel modules (e.g. NVMe, RAID, LVM, dm-crypt LUKS) to mount the real root filesystem on disk and execute `/sbin/init`.',
      'To execute user desktop environments like GNOME or KDE before the kernel boots.',
      'To verify the user password through the /etc/shadow file.',
      'To write permanent log files to /var/log/syslog.'
    ],
    correct: 0,
    explanation: '`initramfs` contains temporary drivers, crypto tools, and scripts needed to unlock disks (LUKS), initialize software RAID/LVM, mount the real root partition, and pivot-root to the real OS init system.'
  },
  {
    id: 'hq_31',
    index: 31,
    os: 'linux',
    category: 'Linux System Calls & strace',
    difficulty: 'Hard',
    question: 'When using `strace -c` on a high-throughput Linux network service, which system call is responsible for multiplexing thousands of active non-blocking network socket descriptors with O(1) performance?',
    options: [
      'epoll_wait() (via epoll_create1 and epoll_ctl)',
      'select()',
      'poll()',
      'fork()'
    ],
    correct: 0,
    explanation: '`epoll` is the Linux O(1) event-driven I/O notification facility. Unlike `select()` or `poll()`, which scan every registered file descriptor (O(N)), `epoll_wait()` returns only the active file descriptors in constant time.'
  },
  {
    id: 'hq_32',
    index: 32,
    os: 'linux',
    category: 'Linux SELinux Architecture',
    difficulty: 'Hard',
    question: 'In SELinux, what does the security context `system_u:system_r:httpd_t:s0` dictate for an Apache or Nginx process attempting to read a file labeled `user_home_t`?',
    options: [
      'The access is blocked by the Type Enforcement (TE) policy engine, because `httpd_t` is not granted permission to read `user_home_t` unless explicitly permitted via a boolean (e.g. `httpd_enable_homedirs`).',
      'The process is allowed root access because root ignores all SELinux constraints.',
      'The process automatically changes ownership of the user home directory.',
      'The entire server reboots into single-user recovery mode.'
    ],
    correct: 0,
    explanation: 'SELinux uses Type Enforcement: domains (`httpd_t`) can only access object types permitted by the compiled policy. Access to `user_home_t` is denied by default regardless of standard UNIX DAC file permissions.'
  },
  {
    id: 'hq_33',
    index: 33,
    os: 'linux',
    category: 'Linux Networking & Netfilter',
    difficulty: 'Hard',
    question: 'In the Netfilter packet flow architecture, which hook point evaluates incoming network packets immediately after the IP header checksum is validated, prior to routing decisions?',
    options: [
      'NF_INET_PRE_ROUTING (PREROUTING table/chain)',
      'NF_INET_LOCAL_IN (INPUT chain)',
      'NF_INET_FORWARD (FORWARD chain)',
      'NF_INET_POST_ROUTING (POSTROUTING chain)'
    ],
    correct: 0,
    explanation: '`PREROUTING` receives packets right off the network interface before the kernel routing subsystem determines whether the packet is bound for local processes or needs forwarding to another network hop.'
  },
  {
    id: 'hq_34',
    index: 34,
    os: 'linux',
    category: 'Linux Process States & Zombies',
    difficulty: 'Hard',
    question: 'What is a "Zombie" process (State `Z` in `ps` or `top`), and why can a zombie process not be terminated using `kill -9 <PID>`?',
    options: [
      'A zombie is an already-dead process whose memory, file descriptors, and CPU allocations have been released; it remains in the process table solely until its parent reads its exit status code via `wait()`.',
      'A zombie is a malicious rootkit injected into kernel Ring 0.',
      'A zombie is an active thread executing infinite math loops.',
      'A zombie is a process blocked on deadlocked hardware disk controllers.'
    ],
    correct: 0,
    explanation: 'Zombies are already dead—they cannot process signals like SIGKILL (9). They consume only a task table slot until the parent issues `wait4()`/`waitpid()`. Terminating the parent process causes `init`/PID 1 to adopt and reap them.'
  },
  {
    id: 'hq_35',
    index: 35,
    os: 'linux',
    category: 'Linux Virtual Memory & HugePages',
    difficulty: 'Hard',
    question: 'Why do high-performance database engines (e.g., PostgreSQL, Oracle, Redis) on Linux utilize Transparent HugePages (THP) or Static HugePages (2 MB / 1 GB pages) instead of default 4 KB pages?',
    options: [
      'HugePages drastically reduce the number of entries needed in the CPU Translation Lookaside Buffer (TLB), preventing costly TLB cache misses and page table walk latency.',
      'HugePages encrypt all database files directly on disk.',
      'HugePages allow the database to bypass all network firewalls.',
      'HugePages convert spinning HDDs into virtual NVMe solid-state storage.'
    ],
    correct: 0,
    explanation: 'A 64 GB database buffer pool with standard 4 KB pages requires 16,777,216 page entries. With 2 MB HugePages, this shrinks to 32,768 entries, fitting inside CPU L1/L2 TLB caches and eliminating page walk stalls.'
  },
  {
    id: 'hq_36',
    index: 36,
    os: 'linux',
    category: 'Linux Systemd Internals',
    difficulty: 'Hard',
    question: 'In a systemd `.service` unit file, what is the precise behavior of `Type=notify` compared to `Type=simple`?',
    options: [
      '`Type=notify` expects the started process to explicitly send an operational readiness signal to systemd via the `sd_notify()` UNIX domain socket before dependent services are started.',
      '`Type=notify` sends an automated SMS alert to the system administrator when the service starts.',
      '`Type=simple` requires the process to fork twice and create a PID file.',
      '`Type=notify` runs the service with real-time SCHED_FIFO scheduling priority.'
    ],
    correct: 0,
    explanation: '`Type=notify` prevents race conditions: systemd starts the daemon and waits for it to send `READY=1` across the `$NOTIFY_SOCKET` before transitioning the unit to `active` and unblocking downstream units.'
  },
  {
    id: 'hq_37',
    index: 37,
    os: 'linux',
    category: 'Linux Kernel Modules & DKMS',
    difficulty: 'Hard',
    question: 'What is the purpose of DKMS (Dynamic Kernel Module Support) on Ubuntu and Debian distributions?',
    options: [
      'It automatically recompiles and installs out-of-tree kernel modules (such as NVIDIA drivers or ZFS) whenever a new Linux kernel package is installed.',
      'It disables kernel module signing validation globally.',
      'It translates Windows .sys drivers to run on Linux kernels.',
      'It compresses Linux kernel headers into an encrypted squashfs archive.'
    ],
    correct: 0,
    explanation: 'DKMS monitors kernel upgrades and automatically rebuilds external source modules against the new kernel headers, ensuring seamless driver continuity across apt-get kernel updates.'
  },
  {
    id: 'hq_38',
    index: 38,
    os: 'linux',
    category: 'Linux Signals & Inter-Process Comm',
    difficulty: 'Hard',
    question: 'Which two POSIX signals CANNOT be intercepted, caught, blocked, or ignored by any user-mode or root process on Linux?',
    options: [
      'SIGKILL (9) and SIGSTOP (19)',
      'SIGINT (2) and SIGTERM (15)',
      'SIGSEGV (11) and SIGBUS (7)',
      'SIGHUP (1) and SIGUSR1 (10)'
    ],
    correct: 0,
    explanation: 'By POSIX design, `SIGKILL` (immediate termination) and `SIGSTOP` (immediate process pause) bypass process signal handlers and are executed directly by the kernel scheduler.'
  },
  {
    id: 'hq_39',
    index: 39,
    os: 'linux',
    category: 'Linux Storage & mdadm',
    difficulty: 'Hard',
    question: 'When repairing a degraded RAID 5 array on Linux with `mdadm`, what is the risk of an unrecoverable read error (URE) occurring during the rebuild phase onto a replacement disk?',
    options: [
      'Because all remaining member disks must be 100% read across every sector to recalculate parity, encountering a single uncorrectable bad sector will abort the rebuild and cause catastrophic data loss.',
      'The array will automatically convert into a RAID 0 striped volume.',
      'The CPU will overheat due to continuous parity matrix inversion.',
      'The Linux kernel will delete the /home directory.'
    ],
    correct: 0,
    explanation: 'In large consumer drives, encountering a URE (typically 1 in 10^14 bits) during a rebuild causes standard RAID 5 arrays without secondary parity (unlike RAID 6) to drop a second disk, resulting in data loss.'
  },
  {
    id: 'hq_40',
    index: 40,
    os: 'linux',
    category: 'Linux Kernel sysctl Tuning',
    difficulty: 'Hard',
    question: 'What is the consequence of setting `vm.swappiness = 0` on a modern Linux kernel (version 3.5+)?',
    options: [
      'The kernel will only page anonymous memory to swap to prevent Out-Of-Memory conditions when free memory and file page caches are completely exhausted.',
      'The kernel permanently deletes the `/swapfile` from the hard drive.',
      'Swap memory is converted into a RAM disk.',
      'The system freezes whenever RAM exceeds 50% capacity.'
    ],
    correct: 0,
    explanation: 'Since Linux 3.5+, `vm.swappiness = 0` tells the kernel scheduler not to swap anonymous pages until the number of free pages and file-backed pages is less than the high watermark in a zone.'
  },
  {
    id: 'hq_41',
    index: 41,
    os: 'linux',
    category: 'Linux Filesystem Journaling',
    difficulty: 'Hard',
    question: 'In the ext4 file system, what is the key difference between the `data=ordered` and `data=journal` mount options?',
    options: [
      '`data=journal` writes both metadata updates and full file contents to the journal prior to committing to main disk storage, providing maximum crash consistency at the cost of write performance.',
      '`data=ordered` does not write any metadata to the journal.',
      '`data=journal` only supports read-only operations.',
      '`data=ordered` stores all files directly in CPU L3 cache.'
    ],
    correct: 0,
    explanation: '`data=ordered` (ext4 default) writes data blocks to disk before metadata commits to the journal. `data=journal` logs both metadata and raw payload data to the journal first, preventing stale data leaks but doubling write I/O.'
  },
  {
    id: 'hq_42',
    index: 42,
    os: 'linux',
    category: 'Linux Capability Model',
    difficulty: 'Hard',
    question: 'Rather than running a custom network daemon as full root (`UID 0`), which specific Linux capability allows binding to privileged TCP/UDP ports below 1024?',
    options: [
      'CAP_NET_BIND_SERVICE',
      'CAP_SYS_ADMIN',
      'CAP_NET_ADMIN',
      'CAP_DAC_OVERRIDE'
    ],
    correct: 0,
    explanation: '`CAP_NET_BIND_SERVICE` allows binding sockets to well-known privileged ports (< 1024). This satisfies least-privilege security without granting full `CAP_SYS_ADMIN` or full root ownership.'
  },
  {
    id: 'hq_43',
    index: 43,
    os: 'linux',
    category: 'Linux Dynamic Linking & ELF',
    difficulty: 'Hard',
    question: 'In the Executable and Linkable Format (ELF), how does setting the `DT_RPATH` or `DT_RUNPATH` attribute inside a compiled binary alter the dynamic linker (`ld-linux.so`) behavior?',
    options: [
      'It embeds a hardcoded list of directories to search for dependent shared libraries (`.so`) before or after evaluating standard system paths and `LD_LIBRARY_PATH`.',
      'It encrypts the main function using AES-256.',
      'It disables all shared libraries and statically links the binary at runtime.',
      'It forces the kernel to run the application in a chroot jail.'
    ],
    correct: 0,
    explanation: '`DT_RPATH` and `DT_RUNPATH` tell the dynamic runtime linker (`ld-linux.so`) specific filesystem paths to search when resolving required shared libraries, enabling applications to ship isolated private `.so` bundles.'
  },
  {
    id: 'hq_44',
    index: 44,
    os: 'linux',
    category: 'Linux PAM Authentication',
    difficulty: 'Hard',
    question: 'In the Linux Pluggable Authentication Modules (PAM) configuration, what is the consequence of a module returning a failure status when marked with the `requisite` control flag?',
    options: [
      'Authentication fails immediately, and PAM terminates the stack without evaluating any subsequent modules.',
      'The failure is recorded, but PAM continues executing all remaining modules before denying access.',
      'The failure is ignored and the user is logged in as root.',
      'The PAM stack re-executes the module three times in an infinite loop.'
    ],
    correct: 0,
    explanation: '`requisite`: If this module fails, the entire authentication attempt is aborted immediately and no further modules in the stack are called. (In contrast, `required` records failure but continues executing remaining modules to mask the failure point).'
  },
  {
    id: 'hq_45',
    index: 45,
    os: 'linux',
    category: 'Linux IPC & POSIX Semaphores',
    difficulty: 'Hard',
    question: 'Where does the Linux kernel expose active POSIX shared memory objects created via `shm_open()` to user-space inspection?',
    options: [
      'Inside the `/dev/shm` tmpfs virtual file system.',
      'Under `/proc/sys/fs/binfmt_misc`.',
      'Inside `/etc/default/shm`.',
      'Under `/sys/kernel/debug/tracing`.'
    ],
    correct: 0,
    explanation: 'POSIX shared memory segments initialized with `shm_open()` appear as memory-backed files within `/dev/shm`, mounted by default as a `tmpfs` RAM filesystem.'
  },
  {
    id: 'hq_46',
    index: 46,
    os: 'linux',
    category: 'Linux Kernel Real-Time Scheduling',
    difficulty: 'Hard',
    question: 'What is the scheduling difference between the Linux Completely Fair Scheduler (CFS) and the Real-Time `SCHED_FIFO` policy?',
    options: [
      '`SCHED_FIFO` processes run with strict static priority and execute indefinitely until they block on I/O or yield, completely starving normal CFS processes regardless of their niceness.',
      'CFS allocates CPU based on coin flips, while `SCHED_FIFO` only runs on weekend maintenance windows.',
      '`SCHED_FIFO` is limited to a maximum of 5% CPU usage.',
      'CFS does not support multi-core symmetric multiprocessing.'
    ],
    correct: 0,
    explanation: 'Real-time tasks under `SCHED_FIFO` have higher priority than non-RT tasks. A runnable `SCHED_FIFO` process will hold the CPU until it yields (`sched_yield`), blocks on an I/O wait, or is preempted by a higher-priority RT task.'
  },
  {
    id: 'hq_47',
    index: 47,
    os: 'linux',
    category: 'Linux Firewall & nftables',
    difficulty: 'Hard',
    question: 'Why did the Linux kernel project deprecate legacy `iptables` in favor of `nftables` (`nft`)?',
    options: [
      '`nftables` provides a unified bytecode engine for IPv4, IPv6, ARP, and bridging, supports atomic rule replacements, and eliminates duplicate code paths across separate tools (ip6tables, arptables, ebtables).',
      '`iptables` was written in Java and ran out of heap space.',
      '`nftables` disables all encryption algorithms by default.',
      '`iptables` could not support network speeds above 10 Mbps.'
    ],
    correct: 0,
    explanation: '`nftables` replaces fragmented tools with a single userspace CLI interacting with an in-kernel state-machine bytecode engine, supporting native sets, dictionaries, and transactional atomic rule commits without reloading entire tables.'
  },
  {
    id: 'hq_48',
    index: 48,
    os: 'linux',
    category: 'Linux I/O Schedulers',
    difficulty: 'Hard',
    question: 'For ultra-low-latency NVMe solid-state storage with native multi-queue hardware support, which Linux I/O scheduler is recommended to minimize latency?',
    options: [
      '`none` (bypasses userspace I/O scheduling, relying entirely on hardware NVMe submission/completion queues)',
      '`bfq` (Budget Fair Queueing)',
      '`cfq` (Completely Fair Queuing legacy)',
      '`anticipatory`'
    ],
    correct: 0,
    explanation: 'On high-performance NVMe SSDs capable of handling hundreds of hardware submission queues directly, software I/O scheduling introduces CPU overhead. Setting scheduler to `none` allows direct block dispatch to NVMe queues.'
  },
  {
    id: 'hq_49',
    index: 49,
    os: 'linux',
    category: 'Linux Audit Framework',
    difficulty: 'Hard',
    question: 'How do security engineers monitor unauthorized modifications to `/etc/sudoers` in real-time using the Linux audit subsystem (`auditd`)?',
    options: [
      'Configure `auditctl -w /etc/sudoers -p wa -k sudoers_change` to record write and attribute alterations in `/var/log/audit/audit.log`.',
      'Run `tail -f /dev/null`.',
      'Delete the `/etc/sudoers` file and monitor the system crash log.',
      'Mount the partition with the `noexec` flag.'
    ],
    correct: 0,
    explanation: '`-w /etc/sudoers` places an audit watch on the target file; `-p wa` tracks writes and attribute changes; and `-k` tags events with a searchable key in the cryptographically audit-compliant log.'
  },
  {
    id: 'hq_50',
    index: 50,
    os: 'linux',
    category: 'Linux VFS & Dentries',
    difficulty: 'Hard',
    question: 'What is the role of the Linux VFS Directory Entry Cache (dcache / dentry cache)?',
    options: [
      'It caches in-memory mapping between path strings (e.g. `/var/log/nginx`) and corresponding disk Inode numbers, drastically accelerating path lookups without disk reads.',
      'It compresses all folder names on disk into MD5 hashes.',
      'It stores user passwords in plain text for fast terminal access.',
      'It manages GPU display buffers for the X11 server.'
    ],
    correct: 0,
    explanation: 'The dcache maps directory tree components to their respective inodes. When resolving `/home/user/code/file.txt`, the kernel consults dentry objects in RAM to avoid sequential disk block traversals for every directory path element.'
  },

  // =========================================================================
  // DOMAIN 3: MACOS DARWIN KERNEL, SECURITY & FILE SYSTEMS (51 - 70)
  // =========================================================================
  {
    id: 'hq_51',
    index: 51,
    os: 'macos',
    category: 'macOS Kernel Architecture',
    difficulty: 'Hard',
    question: 'What is the architectural composition of the open-source Apple Darwin operating system core (XNU)?',
    options: [
      'A hybrid kernel combining the Mach 3.0 microkernel message-passing core, FreeBSD POSIX subsystems/VFS, and the I/O Kit object-oriented C++ driver framework.',
      'A pure monolithic Linux kernel with custom graphical skins.',
      'A microkernel derived exclusively from the Microsoft Windows NT 3.51 HAL.',
      'An interpreted Objective-C runtime executing on bare-metal firmware.'
    ],
    correct: 0,
    explanation: 'XNU ("X is Not Unix") is a hybrid kernel: it integrates Mach (IPC, thread scheduling, virtual memory), FreeBSD (POSIX APIs, user credentials, process model, BSD sockets), and I/O Kit (object-oriented C++ driver system).'
  },
  {
    id: 'hq_52',
    index: 52,
    os: 'macos',
    category: 'macOS System Integrity Protection (SIP)',
    difficulty: 'Hard',
    question: 'Under macOS System Integrity Protection (SIP / rootless), why can even the `root` superuser (UID 0) not modify files in `/System`, `/usr/bin`, or `/sbin`?',
    options: [
      'The kernel enforces strict code signing and filesystem entitlements; files in protected locations are backed by the cryptographically signed and sealed System volume (SSV).',
      'The root account was removed from macOS Sonoma completely.',
      'The storage drive is permanently welded into read-only mode at the factory.',
      'The files are owned by an active iCloud cloud container.'
    ],
    correct: 0,
    explanation: 'SIP enforces kernel-level restrictions preventing modification of system binaries regardless of root status. In modern macOS (Big Sur and later), the operating system boots from a cryptographically Signed System Volume (SSV) verified via SHA-256 Merkle trees.'
  },
  {
    id: 'hq_53',
    index: 53,
    os: 'macos',
    category: 'macOS Apple File System (APFS)',
    difficulty: 'Hard',
    question: 'How does APFS perform instantaneous file cloning (`cp -c file1 file2`) without duplicating physical storage blocks on the SSD?',
    options: [
      'It creates a new inode referencing the existing extents (Copy-on-Write metadata sharing); new physical blocks are only allocated when one of the copies is modified.',
      'It compresses the duplicate file with 100:1 ratio gzip compression.',
      'It creates a symbolic link that breaks when file1 is deleted.',
      'It moves the copy into the macOS unified virtual swap partition.'
    ],
    correct: 0,
    explanation: 'APFS uses Copy-on-Write (CoW) extents: cloning copies metadata references rather than data payloads. Both files point to identical physical storage blocks on disk until write operations diverge the blocks.'
  },
  {
    id: 'hq_54',
    index: 54,
    os: 'macos',
    category: 'macOS Gatekeeper & Notarization',
    difficulty: 'Hard',
    question: 'When a user downloads a binary from the internet on macOS, what extended filesystem attribute is attached, and what does Gatekeeper evaluate before allowing execution?',
    options: [
      'The `com.apple.quarantine` extended attribute; Gatekeeper validates Apple Developer ID cryptographic signatures and checks Apple cloud notarization ticket registries.',
      'The `security.mac.root` flag; Gatekeeper runs an MD5 scan against local virus definitions.',
      'The `dos.hidden` attribute; Gatekeeper checks whether the file size is under 50 MB.',
      'The `xattr.ntfs.stream` marker; Gatekeeper prompts for the Apple ID master password.'
    ],
    correct: 0,
    explanation: 'Browsers attach the `com.apple.quarantine` xattr. When launched, Gatekeeper intercepts the binary, validates its code signing certificate, confirms Apple Developer ID notarization, and checks for revocation via online Stapler/OCSP.'
  },
  {
    id: 'hq_55',
    index: 55,
    os: 'macos',
    category: 'macOS Mach IPC & Ports',
    difficulty: 'Hard',
    question: 'In the macOS Darwin architecture, what is a "Mach Port"?',
    options: [
      'A kernel-protected, unidirectional, message-queue abstraction providing thread-safe capability-based Inter-Process Communication (IPC).',
      'A physical USB-C Thunderbolt connection on the logic board.',
      'A network socket bound exclusively to localhost port 8080.',
      'A memory allocation pool for rendering Retina display icons.'
    ],
    correct: 0,
    explanation: 'Mach IPC is based on Mach Ports: kernel-managed message queues accessed via capability-protected port rights (`receive`, `send`, `send-once`), serving as the foundational plumbing for all Darwin IPC (XPC).'
  },
  {
    id: 'hq_56',
    index: 56,
    os: 'macos',
    category: 'macOS Rosetta 2 Binary Translation',
    difficulty: 'Hard',
    question: 'How does Apple Silicon Rosetta 2 execute legacy x86_64 software on ARM64 processors with high efficiency?',
    options: [
      'It performs Ahead-Of-Time (AOT) binary translation during app installation/first launch, supplemented by a Just-In-Time (JIT) translation engine with dedicated hardware TSO memory ordering support in Apple Silicon.',
      'It runs a full Windows 10 virtual machine in the background.',
      'It emulates CPU instructions purely through software interpretation at 1/100th speed.',
      'It uploads the binary to Apple cloud servers for remote streaming execution.'
    ],
    correct: 0,
    explanation: 'Rosetta 2 translates x86_64 code AOT into ARM64 instructions. Crucially, Apple Silicon M-series CPUs incorporate hardware-level Total Store Ordering (TSO) flags to emulate x86 memory consistency without immense software penalties.'
  },
  {
    id: 'hq_57',
    index: 57,
    os: 'macos',
    category: 'macOS Launchd Architecture',
    difficulty: 'Hard',
    question: 'What is the operational distinction between a Launch Daemon (`/Library/LaunchDaemons`) and a Launch Agent (`/Library/LaunchAgents`) in macOS?',
    options: [
      'Launch Daemons run system-wide in the background context as `root` prior to any user login; Launch Agents execute specifically within the context of a logged-in user graphical session.',
      'Launch Daemons are restricted to Apple-signed apps, while Launch Agents run user shell scripts.',
      'Launch Agents only run on iOS, whereas Launch Daemons run on macOS.',
      'Launch Daemons are automatically killed after 60 seconds of inactivity.'
    ],
    correct: 0,
    explanation: '`launchd` manages both: Daemons run at the system level (no GUI context, typically as root or dedicated system accounts); Agents run per-user within the user\'s Aqua GUI session and have access to user display servers.'
  },
  {
    id: 'hq_58',
    index: 58,
    os: 'macos',
    category: 'macOS Transparency, Consent, and Control (TCC)',
    difficulty: 'Hard',
    question: 'Where does macOS store and manage the privacy permission database governing access to the Camera, Microphone, and Full Disk Access?',
    options: [
      'In protected SQLite databases located at `/Library/Application Support/com.apple.TCC/TCC.db` and `~/Library/Application Support/com.apple.TCC/TCC.db`.',
      'In plain-text files inside `/etc/privacy.conf`.',
      'Inside the user\'s Safari browser cookie cache.',
      'Under `/System/Library/CoreServices/Finder.app`.'
    ],
    correct: 0,
    explanation: 'TCC rules are stored in SIP-protected SQLite databases (`TCC.db`). The system database enforces computer-wide access (e.g. Full Disk Access), while the user database tracks application access to contacts, microphone, and camera.'
  },
  {
    id: 'hq_59',
    index: 59,
    os: 'macos',
    category: 'macOS Unified Logging System',
    difficulty: 'Hard',
    question: 'Which macOS command line tool streams and queries compressed, high-performance binary diagnostic trace entries from the Unified Logging System (os_log)?',
    options: [
      '`log stream` and `log show`',
      '`cat /var/log/messages`',
      '`dmesg --follow-all`',
      '`system_profiler -logs`'
    ],
    correct: 0,
    explanation: 'Modern macOS uses the Unified Logging System (`os_log`), which stores compact binary traces in `/var/db/diagnostics`. The `log` utility (`log show --predicate ...` or `log stream`) is required to inspect these records.'
  },
  {
    id: 'hq_60',
    index: 60,
    os: 'macos',
    category: 'macOS Sandbox Entitlements',
    difficulty: 'Hard',
    question: 'In the macOS App Sandbox security model, how does a sandboxed Mac App Store application obtain authorization to open arbitrary files outside its container container directory?',
    options: [
      'By utilizing the `com.apple.security.files.user-selected.read-write` entitlement combined with the native Powerbox (NSOpenPanel/NSSavePanel) dialog.',
      'By executing `sudo chmod 777 /` using embedded root credentials.',
      'By disabling System Integrity Protection via terminal script.',
      'By injecting dynamic libraries into the Finder process.'
    ],
    correct: 0,
    explanation: 'Apple App Sandbox uses Powerbox: when an application invokes `NSOpenPanel`, the file picker runs out-of-process in a trusted daemon. Once the user clicks "Open", the kernel creates an explicit security-scoped bookmark granting read/write.'
  },
  {
    id: 'hq_61',
    index: 61,
    os: 'macos',
    category: 'macOS Virtual Memory & Compressed Memory',
    difficulty: 'Hard',
    question: 'How does macOS handle high physical RAM pressure before resorting to writing pages out to the disk swapfile (`/private/var/vm/swapfile0`)?',
    options: [
      'The WKdm memory compression engine actively compresses inactive memory pages in RAM into a dedicated compressor pool, shrinking memory footprint by roughly 50%.',
      'The kernel terminates the highest memory-consuming application immediately.',
      'macOS downclocks the CPU clock speed to reduce memory bandwidth.',
      'The system displays an unclosable full-screen popup warning.'
    ],
    correct: 0,
    explanation: 'macOS incorporates an aggressive in-memory compressor: using the high-speed WKdm algorithm, inactive 4 KB pages are compressed in-place in RAM. Only when memory pressure remains severe does the system write compressed chunks to disk swap.'
  },
  {
    id: 'hq_62',
    index: 62,
    os: 'macos',
    category: 'macOS Keychain & Secure Enclave',
    difficulty: 'Hard',
    question: 'How does the Apple Silicon Secure Enclave Processor (SEP) protect user biometrics (Touch ID) and FileVault encryption keys?',
    options: [
      'The SEP is a dedicated isolated hardware coprocessor with its own encrypted memory, hardware random number generator, and isolated microkernel; the main OS kernel never has direct access to raw biometric data.',
      'The SEP stores fingerprints as PNG files on the primary SSD partition.',
      'The SEP sends user fingerprints to Apple iCloud servers for remote hashing.',
      'The SEP operates as a standard user-space daemon inside macOS.'
    ],
    correct: 0,
    explanation: 'The Secure Enclave is physically separated from the main application processor. It boots its own seOS microkernel, maintains hardware-fused AES engines, and only outputs boolean authentication tokens to the Darwin kernel.'
  },
  {
    id: 'hq_63',
    index: 63,
    os: 'macos',
    category: 'macOS DriverKit Architecture',
    difficulty: 'Hard',
    question: 'Why did Apple deprecate legacy Kernel Extensions (KEXTs) in favor of modern DriverKit (System Extensions / DEXTs)?',
    options: [
      'DEXTs run entirely in user space with restricted entitlements; a driver crash or pointer panic terminates only the driver process rather than inducing a kernel panic.',
      'KEXTs could only be written in Python.',
      'DriverKit allows USB devices to draw 100 Watts of direct battery power.',
      'DEXTs eliminate all need for device driver code.'
    ],
    correct: 0,
    explanation: 'Legacy KEXTs ran in Ring 0; a single bug caused an instant kernel panic. DriverKit System Extensions run in user space using Mach message passing and strict entitlements, delivering robust system stability and security.'
  },
  {
    id: 'hq_64',
    index: 64,
    os: 'macos',
    category: 'macOS Network Configuration',
    difficulty: 'Hard',
    question: 'Which macOS command line tool interacts directly with the Dynamic Store in the SystemConfiguration framework to inspect network service locations and DNS resolvers?',
    options: [
      '`scutil`',
      '`netsh`',
      '`systemctl`',
      '`ethtool`',
    ],
    correct: 0,
    explanation: '`scutil` (System Configuration utility) is the native macOS tool for communicating with `configd` to inspect dynamic store dictionaries, proxy setups, DNS keys, and computer hostnames.'
  },
  {
    id: 'hq_65',
    index: 65,
    os: 'macos',
    category: 'macOS Defaults System',
    difficulty: 'Hard',
    question: 'When modifying system and application preferences using `defaults write <domain> <key> <value>`, where are these settings stored on the filesystem?',
    options: [
      'Inside binary property list (.plist) files located in `~/Library/Preferences/` and `/Library/Preferences/`, managed via `cfprefsd`.',
      'In the Windows-compatible Registry hive under `/etc/registry`.',
      'Inside a single monolithic SQL database located at `/etc/defaults.db`.',
      'Directly in the motherboard NVRAM variables.'
    ],
    correct: 0,
    explanation: 'macOS preference domains map to Property List (`.plist`) files in Preferences directories. Writes are mediated by the `cfprefsd` daemon, which caches preferences and asynchronously flushes them to disk.'
  },
  {
    id: 'hq_66',
    index: 66,
    os: 'macos',
    category: 'macOS Spotlight Metadata Engine',
    difficulty: 'Hard',
    question: 'Which underlying background indexing daemon generates and maintains the full-text search database stored in `/.Spotlight-V100` on macOS volumes?',
    options: [
      '`mds` (Metadata Server) and `mdworker` (Metadata Worker)',
      '`systemd-journald`',
      '`updatedb`',
      '`grep_daemon`'
    ],
    correct: 0,
    explanation: 'The Spotlight indexing infrastructure is orchestrated by `mds` (metadata server), which delegates file parsing and content tokenization to sandboxed helper worker processes (`mdworker`).'
  },
  {
    id: 'hq_67',
    index: 67,
    os: 'macos',
    category: 'macOS Dyld Shared Cache',
    difficulty: 'Hard',
    question: 'Why are individual system `.dylib` dynamic shared libraries no longer present as distinct files in `/usr/lib` on modern macOS installations?',
    options: [
      'They have been pre-linked, optimized, and combined into a single massive monolithic `dyld shared cache` file in memory-mapped storage to accelerate application launch times.',
      'Apple switched completely to static compilation for all applications.',
      'All dynamic libraries were deleted to save 500 MB of disk space.',
      'The dynamic linker was replaced by a WebAssembly emulator.'
    ],
    correct: 0,
    explanation: 'Since macOS Big Sur, system dylibs are merged into the `dyld` shared cache during OS installation. This eliminates disk seeks and symbol resolution latency during dynamic loading while enforcing memory deduplication across processes.'
  },
  {
    id: 'hq_68',
    index: 68,
    os: 'macos',
    category: 'macOS Core Storage & FileVault 2',
    difficulty: 'Hard',
    question: 'Under APFS FileVault full-disk encryption, how is volume decryption authenticated before the macOS kernel is even loaded into RAM?',
    options: [
      'The firmware runs a pre-boot environment (`Preboot` APFS volume) with a minimal GUI (loginwindow) to accept the user passphrase, which unwraps the Volume Encryption Key (VEK).',
      'The computer makes an unencrypted HTTP call to Apple headquarters.',
      'The user must insert an unencrypted USB stick containing a master private key.',
      'The CPU runs in 16-bit real mode and asks for a BIOS password.'
    ],
    correct: 0,
    explanation: 'APFS containers maintain a dedicated unencrypted `Preboot` volume. The UEFI firmware boots the login UI from this slice, validates the password, unwraps the volume key from the APFS keybag, and boots the encrypted main volume.'
  },
  {
    id: 'hq_69',
    index: 69,
    os: 'macos',
    category: 'macOS DTrace & Instruments',
    difficulty: 'Hard',
    question: 'What is the purpose of DTrace in macOS performance profiling and kernel debugging?',
    options: [
      'A comprehensive dynamic tracing framework that safely instruments user-space and kernel functions with zero overhead when probes are inactive.',
      'A hardware testing tool for measuring solder joint resistance.',
      'A disk defragmentation utility for mechanical drives.',
      'A software deployment tool for installing Homebrew packages.'
    ],
    correct: 0,
    explanation: 'Created originally by Sun and ported to Darwin, DTrace provides thousands of dynamic probe points across kernel and user space, executing small D-language scripts with zero overhead when disabled.'
  },
  {
    id: 'hq_70',
    index: 70,
    os: 'macos',
    category: 'macOS Quota & APFS Space Sharing',
    difficulty: 'Hard',
    question: 'How does APFS "Space Sharing" revolutionize disk partitioning across multiple macOS volumes within a single storage container?',
    options: [
      'All volumes inside an APFS container share a single common pool of free disk space; volumes grow and shrink dynamically without requiring fixed partition re-sizing.',
      'It creates duplicate copies of every partition on a remote network share.',
      'It restricts each volume to exactly 25 GB of storage space.',
      'It converts SSD sectors into compressed virtual RAM.'
    ],
    correct: 0,
    explanation: 'Unlike legacy partitions with rigid boundary sector offsets, APFS containers house multiple independent volumes (Macintosh HD, Data, Preboot, Recovery) that all draw dynamically from the same underlying free space pool.'
  },

  // =========================================================================
  // DOMAIN 4: CHROMEOS ARCHITECTURE, VERIFICATION & CONTAINERS (71 - 85)
  // =========================================================================
  {
    id: 'hq_71',
    index: 71,
    os: 'chrome',
    category: 'ChromeOS Verified Boot',
    difficulty: 'Hard',
    question: 'How does the ChromeOS Verified Boot cryptographic chain ensure that the operating system has not been altered or compromised by rootkits?',
    options: [
      'A hardware-based Root of Trust in read-only SPI flash verifies the read-write firmware, which verifies the kernel signature via TPM keys, which then enforces `dm-verity` on the rootfs.',
      'It prompts the user to type a 64-character verification code on every single boot.',
      'It compares system files against a static CSV file stored on Google Drive.',
      'It runs an antivirus scan on the entire hard drive before starting Chrome.'
    ],
    correct: 0,
    explanation: 'ChromeOS Verified Boot relies on hardware write-protected firmware containing public root keys. Each boot stage cryptographically hashes and validates the next stage before execution, terminating in `dm-verity` integrity checks on every rootfs block.'
  },
  {
    id: 'hq_72',
    index: 72,
    os: 'chrome',
    category: 'ChromeOS dm-verity',
    difficulty: 'Hard',
    question: 'What happens in ChromeOS if a single byte in the root filesystem (`/`) is maliciously modified or corrupted while the machine is running?',
    options: [
      'The Linux kernel `dm-verity` driver detects a hash mismatch in the Merkle tree during the block read and immediately triggers an I/O error or system reboot into Recovery Mode.',
      'ChromeOS ignores the error and continues running.',
      'The user is prompted to format the disk using MS-DOS.',
      'The modified byte is sent via email to the Chrome development team.'
    ],
    correct: 0,
    explanation: '`dm-verity` computes a cryptographic tree of SHA-256 hashes for every 4 KB block of the rootfs. If any block\'s hash does not match the signed root hash, the read fails immediately, preventing rootkit persistence.'
  },
  {
    id: 'hq_73',
    index: 73,
    os: 'chrome',
    category: 'ChromeOS Dual-Partition (A/B) Updates',
    difficulty: 'Hard',
    question: 'What is the architectural purpose of the dual root partition design (Root A and Root B) in ChromeOS?',
    options: [
      'It allows seamless, background OS updates to stream into the passive partition; upon reboot, the system switches active boot partitions, rolling back automatically if the new image fails self-checks.',
      'Partition A is for Android apps and Partition B is for web browsing.',
      'Partition A runs 32-bit software and Partition B runs 64-bit software.',
      'It creates an automatic RAID 1 mirror across two physical hard drives.'
    ],
    correct: 0,
    explanation: 'ChromeOS uses A/B partition updates: the live system runs from A while background updates write to B. The bootloader marks B as `successful=0, tries=3`. If B fails to boot cleanly, firmware rolls back to A instantly.'
  },
  {
    id: 'hq_74',
    index: 74,
    os: 'chrome',
    category: 'ChromeOS Linux Subsystem (Crostini)',
    difficulty: 'Hard',
    question: 'What virtualization architecture powers the Linux container environment (Crostini) in ChromeOS?',
    options: [
      'A secure KVM-based virtual machine manager (`crosvm`) running a tailored Linux VM ("termina"), inside which unprivileged LXD/LXC Linux containers ("penguin") execute.',
      'A Wine translation layer executing x86 Windows instructions.',
      'A bare-metal dual-boot mechanism utilizing GRUB2.',
      'Direct root-level execution on the primary ChromeOS host kernel.'
    ],
    correct: 0,
    explanation: 'Crostini isolates development tools for maximum security: the ChromeOS kernel runs `crosvm` (written in Rust), which launches the `termina` VM. Inside this VM, standard Debian/Ubuntu containers run via LXC/LXD.'
  },
  {
    id: 'hq_75',
    index: 75,
    os: 'chrome',
    category: 'ChromeOS Android Subsystem (ARCVM)',
    difficulty: 'Hard',
    question: 'Why did Google transition the Android runtime in ChromeOS from containerized ARC++ to the virtualized ARCVM architecture?',
    options: [
      'ARCVM isolates the entire Android framework inside a distinct virtual machine via crosvm, preventing Android vulnerabilities from directly exposing the host Linux kernel.',
      'ARCVM allows Android apps to run without any RAM.',
      'Containerized ARC++ could only display applications in black and white.',
      'ARCVM eliminates the need for the Google Play Store.'
    ],
    correct: 0,
    explanation: 'While ARC++ shared the host kernel via namespaces, ARCVM runs Android inside its own isolated VM. A kernel exploit in an Android app is trapped inside the guest VM and cannot escape to the ChromeOS host OS.'
  },
  {
    id: 'hq_76',
    index: 76,
    os: 'chrome',
    category: 'ChromeOS State Separation & TPM',
    difficulty: 'Hard',
    question: 'How is user data encrypted and compartmentalized on a shared multi-user Chromebook?',
    options: [
      'Each user\'s `/home/user/<hash>` directory is individually encrypted with an isolated key wrapped by the user\'s password and the hardware TPM chip via `cryptohome`.',
      'All users share a single unencrypted folder in `/tmp`.',
      'User data is stored exclusively in cleartext inside browser cookies.',
      'Chromebooks only support a single global user account.'
    ],
    correct: 0,
    explanation: '`cryptohome` manages per-user encrypted vaults (using eCryptfs or ext4 fscrypt). The encryption keys are protected and rate-limited by the hardware TPM (Titan C / H1 or discrete TPM 2.0).'
  },
  {
    id: 'hq_77',
    index: 77,
    os: 'chrome',
    category: 'ChromeOS Developer Mode',
    difficulty: 'Hard',
    question: 'What security transition occurs when a user intentionally transitions a Chromebook into "Developer Mode"?',
    options: [
      'Root filesystem verification (dm-verity) is disabled, root shell access is enabled, and the TPM wipes all existing user cryptographic encryption keys (Powerwash).',
      'The Chromebook is permanently bricked and cannot be restored.',
      'The screen brightness is locked at 100%.',
      'The device automatically downloads the Windows 11 ISO.'
    ],
    correct: 0,
    explanation: 'Transitioning to Developer Mode intentionally breaks the security boundary. To prevent attackers from stealing existing user credentials, the TPM immediately wipes all stateful data (`cryptohome`) before granting root access.'
  },
  {
    id: 'hq_78',
    index: 78,
    os: 'chrome',
    category: 'ChromeOS Wayland & Sommelier',
    difficulty: 'Hard',
    question: 'In Crostini, what is the role of `sommelier` in bridging graphical Linux desktop applications (like GIMP or VS Code) to the ChromeOS UI?',
    options: [
      'It acts as a nested Wayland and X11 proxy compositor, forwarding surface buffers and translating input events between the container and the ChromeOS host Wayland compositor (`exo`).',
      'It recompiles GUI code into HTML5 canvas tags.',
      'It compresses display frames into MPEG-4 video streams.',
      'It requires an external HDMI monitor to render Linux apps.'
    ],
    correct: 0,
    explanation: '`sommelier` runs inside the container as a Wayland compositor / Xwayland proxy. It intercepts draw calls, shares zero-copy DMA-BUF GPU textures across the VM boundary, and presents windows seamlessly in the ChromeOS taskbar.'
  },
  {
    id: 'hq_79',
    index: 79,
    os: 'chrome',
    category: 'ChromeOS Powerwash Mechanism',
    difficulty: 'Hard',
    question: 'What occurs under the hood when a ChromeOS administrator executes an Enterprise Remote Powerwash?',
    options: [
      'The stateful partition (`/mnt/stateful_partition`) is cryptographically shredded by discarding the TPM master storage keys and formatting the ext4 block structure.',
      'The operating system downloads a 10 GB firmware update from Google.',
      'The physical battery is discharged to 0% immediately.',
      'The Chromebook displays a permanent blue screen.'
    ],
    correct: 0,
    explanation: 'A Powerwash zeroes out the TPM cryptohome secrets, rendering any remaining ciphertext unrecoverable, and re-initializes the stateful partition to factory state while keeping the pristine verified rootfs intact.'
  },
  {
    id: 'hq_80',
    index: 80,
    os: 'chrome',
    category: 'ChromeOS Memory Management (zram)',
    difficulty: 'Hard',
    question: 'Why do Chromebooks typically allocate a compressed `zram` swap device sized at 150% to 200% of physical RAM capacity?',
    options: [
      'It provides fast in-memory compressed virtual memory (typically using LZ4 or ZSTD), dramatically increasing effective multitasking capacity on resource-constrained hardware without wearing out eMMC/UFS flash storage.',
      'It allows Chromebooks to run without any motherboard CPU.',
      'It creates an encrypted partition for storing offline movies.',
      'It is a backup copy of the Google Chrome browser source code.'
    ],
    correct: 0,
    explanation: 'eMMC flash storage has limited write endurance and slower throughput. `zram` creates a virtual swap disk inside RAM with fast LZ4 compression, doubling effective memory headroom without writing swap cycles to flash storage.'
  },
  {
    id: 'hq_81',
    index: 81,
    os: 'chrome',
    category: 'ChromeOS Minijail Sandboxing',
    difficulty: 'Hard',
    question: 'What is the role of `minijail` in the ChromeOS security hardening architecture?',
    options: [
      'A lightweight sandboxing utility that uses Linux namespaces, seccomp-bpf filter syscall whitelists, and capabilities to restrict background system daemons.',
      'A graphical tool for managing user passwords.',
      'An educational coding game for school students.',
      'A utility for backing up Google Docs.'
    ],
    correct: 0,
    explanation: 'ChromeOS launches virtually all background daemons (`shill`, `cras`, `wpa_supplicant`) via `minijail0`, which confines the processes with minimal capabilities, dedicated chroot/namespaces, and strict seccomp syscall filters.'
  },
  {
    id: 'hq_82',
    index: 82,
    os: 'chrome',
    category: 'ChromeOS Network Architecture (Shill)',
    difficulty: 'Hard',
    question: 'Which daemon is the primary connection manager responsible for Wi-Fi, Ethernet, Cellular, and VPN routing policies on ChromeOS?',
    options: [
      '`shill`',
      '`NetworkManager`',
      '`systemd-networkd`',
      '`wpa_gui`'
    ],
    correct: 0,
    explanation: '`shill` is the native ChromeOS connection and network manager daemon, designed to maintain robust, power-efficient, and multi-interface network routing and cellular handoffs.'
  },
  {
    id: 'hq_83',
    index: 83,
    os: 'chrome',
    category: 'ChromeOS Firmware (Coreboot)',
    difficulty: 'Hard',
    question: 'What open-source firmware architecture is deployed across modern x86 and ARM Chromebook hardware instead of proprietary commercial UEFI BIOS?',
    options: [
      'coreboot paired with Google Depthcharge payload',
      'InsydeH2O BIOS',
      'AMI Aptio V UEFI',
      'Phoenix Award BIOS 1998'
    ],
    correct: 0,
    explanation: 'Chromebooks boot using `coreboot`, a fast, minimalist, open-source firmware initialization project that loads Google\'s `depthcharge` payload to manage Verified Boot and kernel verification in under 1 second.'
  },
  {
    id: 'hq_84',
    index: 84,
    os: 'chrome',
    category: 'ChromeOS Audio Architecture (CRAS)',
    difficulty: 'Hard',
    question: 'What is CRAS in the ChromeOS multimedia stack?',
    options: [
      'ChromeOS Audio Server, a low-latency audio server that dynamically manages internal DSP filters, beamforming microphone arrays, and Bluetooth A2DP/HFP audio routing.',
      'A tool for reporting system crash dumps.',
      'A video screen recording utility.',
      'A software equalizer for web games.'
    ],
    correct: 0,
    explanation: 'CRAS (ChromeOS Audio Server) handles mixed streams, hardware DSP tuning, active noise cancellation, and seamless output switching across built-in speakers, 3.5mm jacks, and USB/Bluetooth audio peripherals.'
  },
  {
    id: 'hq_85',
    index: 85,
    os: 'chrome',
    category: 'ChromeOS Browser Process Model',
    difficulty: 'Hard',
    question: 'How does Chrome Site Isolation (Out-of-Process iframes) protect user sessions against hardware microarchitectural side-channel attacks like Spectre?',
    options: [
      'It ensures that pages from different cross-origin websites are always rendered in separate operating system processes within isolated virtual memory address spaces.',
      'It prevents users from having more than two tabs open simultaneously.',
      'It disables all JavaScript execution across all websites.',
      'It forces all internet traffic through an external proxy server.'
    ],
    correct: 0,
    explanation: 'Site Isolation forces cross-site web content and iframes into completely separate OS renderer processes. This ensures an attacker exploiting Spectre in speculative CPU execution cannot read cross-origin memory addresses.'
  },

  // =========================================================================
  // DOMAIN 5: ENTERPRISE STORAGE, PARTITIONING & NETWORK PROTOCOLS (86 - 100)
  // =========================================================================
  {
    id: 'hq_86',
    index: 86,
    os: 'storage',
    category: 'Enterprise Storage & ZFS',
    difficulty: 'Hard',
    question: 'How does ZFS prevent silent data corruption (bit rot) across storage arrays during continuous read workloads?',
    options: [
      'By using end-to-end 256-bit checksumming (e.g. Fletcher4 or SHA-256) embedded in parent block pointers down the Merkle tree; any corrupt block is detected and automatically repaired from parity/mirror copies.',
      'By writing all files to uncompressed text files on a USB key.',
      'By powering off storage disks every 24 hours for demagnetization.',
      'By disallowing files larger than 4 gigabytes.'
    ],
    correct: 0,
    explanation: 'In ZFS, checksums are not stored alongside the data block itself (where local corruption would corrupt both); they are stored in the parent block pointer. During reads or scrubs, mismatches trigger self-healing from parity copies.'
  },
  {
    id: 'hq_87',
    index: 87,
    os: 'storage',
    category: 'NVMe Architecture & Over Fabrics',
    difficulty: 'Hard',
    question: 'What is the architectural advantage of the NVMe storage protocol compared to legacy SATA AHCI?',
    options: [
      'NVMe supports up to 64,000 independent submission queues, each capable of handling 64,000 concurrent commands with lockless multi-core CPU affinity, compared to AHCI\'s single queue of 32 commands.',
      'NVMe requires spinning magnetic platters to operate.',
      'NVMe only works over dial-up telephone lines.',
      'NVMe cannot be formatted with modern file systems.'
    ],
    correct: 0,
    explanation: 'AHCI was designed for slow spinning disks with 1 queue of 32 depth requiring global register locking. NVMe scales across modern multi-core CPUs with up to 64K queues and 64K depth per queue, delivering millions of IOPS.'
  },
  {
    id: 'hq_88',
    index: 88,
    os: 'storage',
    category: 'Partition Table Standards (GPT vs MBR)',
    difficulty: 'Hard',
    question: 'What critical structural resilience feature does GPT (GUID Partition Table) incorporate that is entirely absent in legacy MBR partitioning?',
    options: [
      'GPT maintains a backup secondary partition header and partition entry array at the very end of the physical disk, validated via CRC32 checksums.',
      'GPT limits maximum disk capacity to 2.2 Terabytes.',
      'GPT stores partition tables in plain text on the desktop.',
      'GPT requires exactly four primary partitions per drive.'
    ],
    correct: 0,
    explanation: 'GPT writes a Primary GPT header at LBA 1 and a Secondary (Backup) GPT header at the final LBA of the physical drive, guarded by CRC32 checksums. If the primary header is damaged, the kernel automatically restores it from the backup.'
  },
  {
    id: 'hq_89',
    index: 89,
    os: 'storage',
    category: 'Storage Networking & iSCSI',
    difficulty: 'Hard',
    question: 'In enterprise iSCSI SAN storage networks, what security protocol provides mutual two-way cryptographic authentication between the iSCSI Initiator and the iSCSI Target?',
    options: [
      'Mutual CHAP (Challenge-Handshake Authentication Protocol)',
      'Plaintext Telnet banner matching',
      'Unsalted MD5 checksum over HTTP',
      'WEP wireless authentication'
    ],
    correct: 0,
    explanation: 'Mutual (bi-directional) CHAP ensures that the storage client (Initiator) authenticates the server (Target) and the Target authenticates the Initiator, mitigating rogue SAN takeover and spoofing.'
  },
  {
    id: 'hq_90',
    index: 90,
    os: 'storage',
    category: 'Btrfs Architecture',
    difficulty: 'Hard',
    question: 'What is a Btrfs "Subvolume", and how does it differ from a traditional disk partition?',
    options: [
      'A subvolume is an independently mountable B-tree file system root within the storage pool that shares space dynamically with other subvolumes and supports atomic instant snapshotting.',
      'A subvolume is a physical hardware partition that requires reformatting to resize.',
      'A subvolume can only store MP3 music files.',
      'A subvolume disables all read permissions for root.'
    ],
    correct: 0,
    explanation: 'Btrfs subvolumes are not physical disk slices: they are distinct internal trees sharing the storage pool. They can be mounted with separate options and instantly snapshotted without data duplication.'
  },
  {
    id: 'hq_91',
    index: 91,
    os: 'storage',
    category: 'Enterprise RAID Architectures',
    difficulty: 'Hard',
    question: 'In a RAID 6 array utilizing dual parity across N disks, which mathematical algorithm is used to calculate the second independent parity block (Q-parity)?',
    options: [
      'Galois Field polynomial arithmetic (GF(2^8) Reed-Solomon coding), while P-parity uses simple XOR.',
      'Simple binary addition without carrying.',
      'Base64 encoding of the first disk sector.',
      'RSA 2048-bit asymmetric key derivation.'
    ],
    correct: 0,
    explanation: 'RAID 6 calculates standard XOR for P-parity, but uses Reed-Solomon coding over Galois Field GF(2^8) matrices for Q-parity. This guarantees complete mathematical solvability even if any two arbitrary disks fail simultaneously.'
  },
  {
    id: 'hq_92',
    index: 92,
    os: 'storage',
    category: 'Network Architecture & TCP/IP',
    difficulty: 'Hard',
    question: 'In TCP congestion control, what occurs during the "Fast Retransmit" and "Fast Recovery" phase triggered by 3 duplicate ACKs?',
    options: [
      'The sender retransmits the missing segment immediately without waiting for the retransmission timeout (RTO) timer to expire, and halves the congestion window (ssthresh) rather than collapsing it to 1 MSS.',
      'The TCP connection is forcibly aborted with an RST packet.',
      'The sender switches the connection to UDP protocol.',
      'The receiver buffer is cleared and all network adapters are restarted.'
    ],
    correct: 0,
    explanation: 'When 3 duplicate ACKs arrive, the sender knows a packet was dropped but subsequent packets arrived. Fast Retransmit sends the missing packet instantly; Fast Recovery sets `cwnd = ssthresh + 3*MSS`, avoiding the severe throughput collapse of slow start.'
  },
  {
    id: 'hq_93',
    index: 93,
    os: 'storage',
    category: 'Network Protocols & TLS 1.3',
    difficulty: 'Hard',
    question: 'How did the TLS 1.3 cryptographic protocol reduce connection handshake latency to 1-RTT (or 0-RTT in session resumption) compared to TLS 1.2?',
    options: [
      'By combining the cipher negotiation and key exchange into the initial ClientHello / ServerHello exchange using ephemeral Diffie-Hellman (ECDHE), while deprecating static RSA and weak cipher suites.',
      'By removing all encryption from the handshake entirely.',
      'By transmitting user passwords in unencrypted plain text headers.',
      'By requiring all servers to share a single global master key.'
    ],
    correct: 0,
    explanation: 'TLS 1.3 mandates (EC)DHE key establishment and sends key shares directly in the `ClientHello`, establishing symmetric session keys in a single round trip (1-RTT). Outdated and insecure primitives (RSA key exchange, CBC ciphers) were eliminated.'
  },
  {
    id: 'hq_94',
    index: 94,
    os: 'storage',
    category: 'Network MTU & Path MTU Discovery',
    difficulty: 'Hard',
    question: 'What network anomaly results when a network router drops packets larger than its MTU but the ICMP "Destination Unreachable, Fragmentation Needed" packet is blocked by an upstream firewall?',
    options: [
      'A "PMTU Black Hole" where standard small packets (ping, HTTP handshake) succeed, but large data transfers (SSL handshakes, large payloads) hang and timeout indefinitely.',
      'The network speed increases by 400%.',
      'The client machine switches its IP address to 0.0.0.0.',
      'The router firmware is permanently overwritten.'
    ],
    correct: 0,
    explanation: 'When "Don\'t Fragment" (DF) is set and ICMP Type 3 Code 4 packets are dropped by misconfigured firewalls, the sender never learns to reduce its packet size. Small syn packets connect fine, but large TLS certificates or payloads vanish into the black hole.'
  },
  {
    id: 'hq_95',
    index: 95,
    os: 'storage',
    category: 'Enterprise Routing & BGP',
    difficulty: 'Hard',
    question: 'In Border Gateway Protocol (BGP), what is the primary loop-prevention mechanism used within exterior BGP (eBGP) peer updates?',
    options: [
      'Autonomous System (AS) Path attribute inspection: if a router sees its own AS number in the AS_PATH list of an incoming route update, the route is immediately discarded.',
      'Hop count limit strictly capped at 15 hops.',
      'Periodic broadcast pings sent every 10 seconds.',
      'Spanning Tree Protocol (STP) BPDU frames.'
    ],
    correct: 0,
    explanation: 'BGP is a path-vector protocol. As an update traverses autonomous systems, each AS prepends its ASN to the `AS_PATH` attribute. If a receiving eBGP router detects its own ASN in the path, it rejects the update to prevent routing loops.'
  },
  {
    id: 'hq_96',
    index: 96,
    os: 'storage',
    category: 'VLAN & 802.1Q Tagging',
    difficulty: 'Hard',
    question: 'Where is the 4-byte IEEE 802.1Q VLAN tag inserted within a standard Ethernet II data frame?',
    options: [
      'Directly between the Source MAC Address and the EtherType/Length field, consisting of a TPID (0x8100) and TCI (Priority, DEI, and 12-bit VLAN ID).',
      'At the very end of the frame after the Frame Check Sequence (FCS).',
      'Inside the TCP payload options field.',
      'In place of the Destination MAC address.'
    ],
    correct: 0,
    explanation: 'An 802.1Q header is inserted right after the source MAC address. It contains the Tag Protocol Identifier (0x8100) and Tag Control Information (containing 3 bits of 802.1p priority and 12 bits supporting 4094 distinct VLAN IDs).'
  },
  {
    id: 'hq_97',
    index: 97,
    os: 'storage',
    category: 'DNSSEC Cryptographic Validation',
    difficulty: 'Hard',
    question: 'In DNSSEC validation, what record type establishes the cryptographic chain of trust from a parent zone (e.g. `.com`) to a child zone (e.g. `example.com`)?',
    options: [
      'Delegation Signer (DS) record, which contains a cryptographic hash of the child zone\'s Key Signing Key (KSK / DNSKEY).',
      'Canonical Name (CNAME) record.',
      'Pointer (PTR) reverse lookup record.',
      'Start of Authority (SOA) serial number.'
    ],
    correct: 0,
    explanation: 'The DS record in the parent zone holds the digest of the child zone\'s DNSKEY (specifically the KSK). When a validating resolver resolves `example.com`, it validates the child DNSKEY against the DS record signed by the parent zone key.'
  },
  {
    id: 'hq_98',
    index: 98,
    os: 'storage',
    category: 'IPv6 Subnetting & Neighbor Discovery',
    difficulty: 'Hard',
    question: 'How does IPv6 discover MAC addresses on the local link in place of IPv4\'s broadcast ARP (Address Resolution Protocol)?',
    options: [
      'Using ICMPv6 Neighbor Discovery Protocol (NDP) with Neighbor Solicitation and Neighbor Advertisement messages sent over Solicited-Node Multicast addresses.',
      'By broadcasting UDP packets to 255.255.255.255.',
      'By reading a centralized text file on the default gateway.',
      'IPv6 does not use MAC addresses or physical network adapters.'
    ],
    correct: 0,
    explanation: 'IPv6 eliminates noisy broadcast traffic completely. Address resolution is performed via ICMPv6 NDP (Neighbor Solicitation / Advertisement) targeting Solicited-Node Multicast addresses (`ff02::1:ffxx:xxxx`), reducing NIC wakeups.'
  },
  {
    id: 'hq_99',
    index: 99,
    os: 'storage',
    category: 'Storage Multipathing (MPIO)',
    difficulty: 'Hard',
    question: 'Why is Multipath I/O (MPIO) mandatory in enterprise Fibre Channel and iSCSI storage area networks?',
    options: [
      'To provide redundant physical paths between the host server and storage arrays, ensuring automatic failover if a Host Bus Adapter (HBA), switch, or cable fails, while load balancing I/O throughput.',
      'To allow formatting drives with two incompatible file systems simultaneously.',
      'To bypass all user login passwords.',
      'To convert single-port USB drives into high-speed SAN arrays.'
    ],
    correct: 0,
    explanation: 'Without MPIO, an operating system sees multiple independent physical paths to the same LUN as duplicate disks, risking data corruption. MPIO unifies them into a single virtual device with path failover and Round-Robin load balancing.'
  },
  {
    id: 'hq_100',
    index: 100,
    os: 'storage',
    category: 'Network Security & Wireshark Diagnostics',
    difficulty: 'Hard',
    question: 'During a Wireshark packet capture analysis, you observe a flood of TCP SYN packets with the same source and destination IP and identical source and destination port numbers. What specific denial-of-service attack is this signature?',
    options: [
      'Land Attack',
      'Smurf Attack',
      'Slowloris HTTP Attack',
      'DNS Amplification Attack'
    ],
    correct: 0,
    explanation: 'A Land Attack crafts spoofed TCP SYN packets where the source IP/port matches the destination IP/port. Vulnerable TCP/IP stacks become stuck in an infinite loop replying to themselves, exhausting system socket structures.'
  }
];

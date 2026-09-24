// Practical Challenges, Badges, and Assessment System
// Aligned with the SarlaYash OS Universe Syllabus

export const CHALLENGES = [
  {
    id: 'first_install',
    title: 'First OS Installation',
    category: 'Beginner',
    os: 'any',
    points: 50,
    description: 'Complete any guided OS installation journey from boot setup to the desktop.',
    hint: 'Select Windows, Linux, macOS, or ChromeOS and finish the wizard.'
  },
  {
    id: 'terminal_first_cmd',
    title: 'Hello Terminal & CMD',
    category: 'Beginner',
    os: 'any',
    points: 25,
    description: 'Launch Command Prompt or Terminal and execute `help` or `whoami`.',
    hint: 'Open CMD in Windows or Terminal in Linux/macOS.'
  },
  {
    id: 'create_folder',
    title: 'Folder Architect',
    category: 'Beginner',
    os: 'any',
    points: 30,
    description: 'Create a new folder named `Projects` or `Lab` using `mkdir` or File Explorer.',
    hint: 'Type `mkdir Projects` in the terminal, or right-click the desktop.'
  },
  {
    id: 'create_file',
    title: 'File Creator',
    category: 'Beginner',
    os: 'any',
    points: 30,
    description: 'Create a file named `notes.txt` or `script.sh` in your active folder.',
    hint: 'Use `touch notes.txt` or save a file in Notepad/Text Editor.'
  },
  {
    id: 'system_diagnostic',
    title: 'Hardware Detective',
    category: 'Beginner',
    os: 'any',
    points: 35,
    description: 'Run `fastfetch`, `neofetch`, `systeminfo`, or `sw_vers` to inspect system specs.',
    hint: 'Type `fastfetch` in the terminal for a full visual hardware report.'
  },
  {
    id: 'check_network',
    title: 'Network Inspector',
    category: 'Beginner',
    os: 'any',
    points: 35,
    description: 'Inspect virtual IP addresses using `ipconfig` (Windows) or `ifconfig` / `ip` (Linux).',
    hint: 'Type `ipconfig` in CMD or `ifconfig` in Bash.'
  },
  {
    id: 'explorer_launch',
    title: 'GUI Navigator',
    category: 'Beginner',
    os: 'any',
    points: 25,
    description: 'Open File Explorer (Windows), Finder (macOS), or Files (Ubuntu/ChromeOS).',
    hint: 'Click the folder icon in the taskbar or dock.'
  },
  {
    id: 'ping_host',
    title: 'Connectivity Test',
    category: 'Intermediate',
    os: 'any',
    points: 40,
    description: 'Test virtual network connectivity by pinging an IP or hostname with `ping 8.8.8.8`.',
    hint: 'Execute `ping 8.8.8.8` in any terminal.'
  },
  {
    id: 'change_wallpaper',
    title: 'Desktop Personalization',
    category: 'Intermediate',
    os: 'any',
    points: 35,
    description: 'Open Settings / System Preferences and change your desktop wallpaper or theme.',
    hint: 'Open Settings -> Personalization / Appearance and choose a background.'
  },
  {
    id: 'redirect_output',
    title: 'Stream Redirection',
    category: 'Intermediate',
    os: 'any',
    points: 45,
    description: 'Redirect command output to a file using `>` (e.g. `echo "Hello" > output.txt`).',
    hint: 'Run `echo "SarlaYash Student" > info.txt` in the terminal.'
  },
  {
    id: 'list_hidden_files',
    title: 'Uncover Hidden Files',
    category: 'Intermediate',
    os: 'linux',
    points: 40,
    description: 'List all files including hidden dotfiles in Linux/macOS using `ls -la` or `ls -a`.',
    hint: 'Type `ls -la` to inspect `.bashrc` and hidden configuration files.'
  },
  {
    id: 'install_package',
    title: 'Package Manager Pro',
    category: 'Intermediate',
    os: 'any',
    points: 50,
    description: 'Install a simulated software package with `apt install git`, `winget install`, or `brew`.',
    hint: 'Type `apt install git` in Linux or `winget install python` in Windows.'
  },
  {
    id: 'inspect_processes',
    title: 'Process Watcher',
    category: 'Intermediate',
    os: 'any',
    points: 40,
    description: 'Inspect CPU tasks and active system processes using `ps`, `top`, or `htop`.',
    hint: 'Execute `top` or `ps` in Linux/macOS, or open Task Manager.'
  },
  {
    id: 'check_environment',
    title: 'Environment Inspector',
    category: 'Intermediate',
    os: 'any',
    points: 40,
    description: 'Display active environment variables using `env` (Linux/macOS) or `set` (Windows).',
    hint: 'Type `env` to see $USER, $HOME, $PATH and more.'
  },
  {
    id: 'chmod_script',
    title: 'Permission Master (chmod)',
    category: 'Advanced',
    os: 'linux',
    points: 60,
    description: 'Modify file permissions to make a script executable using `chmod 755` or `chmod +x`.',
    hint: 'Run `chmod 755 start_here.sh` or `chmod +x start_here.sh`.'
  },
  {
    id: 'multitasker',
    title: 'Window Multitasker',
    category: 'Advanced',
    os: 'any',
    points: 45,
    description: 'Keep at least 3 desktop app windows open at the same time.',
    hint: 'Launch Terminal, File Explorer, and Notepad or Settings simultaneously.'
  },
  {
    id: 'two_os_explorer',
    title: 'Dual-OS Pioneer',
    category: 'Advanced',
    os: 'any',
    points: 60,
    description: 'Launch and explore at least 2 distinct operating systems.',
    hint: 'Use the OS Switcher to try Windows and Linux or macOS.'
  },
  {
    id: 'all_four_desktops',
    title: 'Desktop Explorer (All 4 OS)',
    category: 'Advanced',
    os: 'any',
    points: 100,
    description: 'Explore all four desktop environments: Windows 11, Ubuntu Linux, macOS, and ChromeOS.',
    hint: 'Visit all 4 labs to earn the Desktop Explorer badge!'
  },
  {
    id: 'all_four_installs',
    title: 'Installation Expert',
    category: 'Advanced',
    os: 'any',
    points: 150,
    description: 'Complete all four guided installation journeys (Windows, Linux, macOS, ChromeOS).',
    hint: 'Run the setup wizard for all 4 operating systems to unlock this master badge.'
  },
  {
    id: 'final_assessment',
    title: 'OS Universe Champion',
    category: 'Advanced',
    os: 'any',
    points: 200,
    description: 'Pass the comprehensive practical assessment exam with a score of 80% or higher.',
    hint: 'Take the Practical Assessment in the Certification tab.'
  }
];

export const ASSESSMENT_QUESTIONS = [
  {
    id: 'q1',
    question: 'In Linux, what numeric value represents the permissions `rwxr-xr-x` for chmod?',
    options: [
      '644 (Read/Write owner, read others)',
      '755 (Read/Write/Execute owner, Read/Execute others)',
      '777 (Full permissions for everyone)',
      '700 (Private to owner only)'
    ],
    correct: 1,
    explanation: 'rwx = 4+2+1=7 (owner), r-x = 4+0+1=5 (group), r-x = 4+0+1=5 (others). Hence 755.'
  },
  {
    id: 'q2',
    question: 'Which Windows Command Prompt utility displays IP addresses, subnet masks, and default gateways?',
    options: [
      'ping -t',
      'ipconfig',
      'netstat -a',
      'tracert'
    ],
    correct: 1,
    explanation: '`ipconfig` is the standard Windows command to display all current TCP/IP network configuration values.'
  },
  {
    id: 'q3',
    question: 'In the macOS interface, what is the floating shelf of application icons at the bottom of the screen called?',
    options: [
      'Taskbar',
      'The Dock',
      'Shelf',
      'System Tray'
    ],
    correct: 1,
    explanation: 'macOS uses "The Dock" for quick access to apps, documents, and minimized windows.'
  },
  {
    id: 'q4',
    question: 'Which command updates the local package index lists from Ubuntu repositories?',
    options: [
      'apt install all',
      'apt update',
      'apt upgrade -y',
      'apt clean'
    ],
    correct: 1,
    explanation: '`apt update` fetches the latest package list metadata from configured mirrors.'
  },
  {
    id: 'q5',
    question: 'On Google ChromeOS, what is the specialized key replacing Caps Lock used to launch apps and search?',
    options: [
      'Windows Key',
      'Option Key',
      'The Everything Button / Launcher Key',
      'Function Lock'
    ],
    correct: 2,
    explanation: 'ChromeOS devices feature the "Everything Button" (Search/Launcher) on keyboards.'
  },
  {
    id: 'q6',
    question: 'When partitioning a hard drive for modern UEFI systems, what partition table format is standard?',
    options: [
      'FAT16',
      'MBR (Master Boot Record with 2TB limit)',
      'GPT (GUID Partition Table)',
      'NTFS'
    ],
    correct: 2,
    explanation: 'GPT (GUID Partition Table) is the modern standard for UEFI systems supporting drives > 2TB.'
  },
  {
    id: 'q7',
    question: 'What character is used in command line shells to redirect and overwrite output to a file?',
    options: [
      '| (Pipe)',
      '> (Greater-than redirection)',
      '< (Input redirection)',
      '& (Background execution)'
    ],
    correct: 1,
    explanation: '`>` redirects standard output to a file, creating or overwriting it.'
  },
  {
    id: 'q8',
    question: 'In macOS and modern Unix-like systems, which shell is the default in Terminal since macOS Catalina?',
    options: [
      'cmd.exe',
      'PowerShell',
      'zsh (Z Shell)',
      'csh'
    ],
    correct: 2,
    explanation: 'Apple made Zsh the default login and interactive shell starting with macOS Catalina.'
  },
  {
    id: 'q9',
    question: 'Which command displays active system processes, CPU consumption, and memory usage dynamically?',
    options: [
      'dir /p',
      'top or htop',
      'whoami',
      'pwd'
    ],
    correct: 1,
    explanation: '`top` and `htop` provide real-time interactive process monitoring.'
  },
  {
    id: 'q10',
    question: 'Why is mobile-first computer simulation vital for students according to the SarlaYash mission?',
    options: [
      'Laptops are completely obsolete',
      'Many students only have smartphones, yet practical OS skills are essential for IT careers',
      'Smartphones run faster x86 processors than servers',
      'It replaces all software development tools'
    ],
    correct: 1,
    explanation: 'The SarlaYash mission delivers realistic computer labs on mobile phones so every student can gain hands-on skills.'
  }
];

export const BADGE_DEFINITIONS = [
  {
    id: 'installation_expert',
    title: 'Installation Expert',
    icon: 'HardDrive',
    color: 'from-amber-400 to-yellow-600',
    requirement: 'Complete all four guided OS installations (Windows, Linux, macOS, ChromeOS).'
  },
  {
    id: 'command_master',
    title: 'Command Master',
    icon: 'Terminal',
    color: 'from-emerald-400 to-green-600',
    requirement: 'Execute 50+ total commands or finish all CLI challenges across labs.'
  },
  {
    id: 'desktop_explorer',
    title: 'Desktop Explorer',
    icon: 'Compass',
    color: 'from-blue-400 to-indigo-600',
    requirement: 'Explore all four desktop environments and interact with their file managers.'
  },
  {
    id: 'os_champion',
    title: 'OS Universe Champion',
    icon: 'Trophy',
    color: 'from-purple-500 to-pink-600',
    requirement: 'Pass the final practical assessment exam with a score of 80% or higher.'
  }
];

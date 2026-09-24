// Command Interpreter for SarlaYash OS Universe
// Supports 50+ commands across Windows CMD, Linux Bash, macOS Zsh, and ChromeOS Crosh

import { vfs } from './fileSystemService.js';

export class CommandInterpreter {
  constructor(osType = 'linux', currentDir = '/home/student', username = 'student') {
    this.osType = osType; // 'windows' | 'linux' | 'macos' | 'chrome'
    this.currentDir = currentDir;
    this.username = username;
    this.history = [];
    this.installedPackages = ['curl', 'bash', 'coreutils', 'vim'];
    this.env = {
      USER: username,
      HOME: osType === 'windows' ? 'C:\\Users\\Student' : `/home/${username}`,
      SHELL: osType === 'windows' ? 'cmd.exe' : (osType === 'macos' ? '/bin/zsh' : '/bin/bash'),
      PATH: '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin',
      TERM: 'xterm-256color',
      OS: osType
    };
  }

  setContext(osType, currentDir, username) {
    this.osType = osType;
    this.currentDir = currentDir;
    this.username = username;
    this.env.USER = username;
    this.env.HOME = currentDir;
  }

  getPrompt() {
    if (this.osType === 'windows') {
      const winPath = this.currentDir.replace(/\//g, '\\');
      return `${winPath}>`;
    } else if (this.osType === 'macos') {
      const shortDir = this.currentDir === `/Users/${this.username}` ? '~' : this.currentDir.split('/').pop() || '/';
      return `${this.username}@MacBook-Pro ${shortDir} % `;
    } else if (this.osType === 'chrome') {
      return `chronos@localhost / $ `;
    } else {
      // Ubuntu Linux
      const shortDir = this.currentDir === `/home/${this.username}` ? '~' : this.currentDir.replace(`/home/${this.username}`, '~');
      return `${this.username}@sarlayash-ubuntu:${shortDir}$ `;
    }
  }

  execute(rawCommand, onEvent) {
    const trimmed = rawCommand.trim();
    if (!trimmed) return { output: '', code: 0 };

    this.history.push(trimmed);
    if (onEvent) onEvent({ type: 'COMMAND_RUN', command: trimmed, os: this.osType });

    // Handle redirection (e.g. echo "text" > file.txt or >> file.txt)
    let commandStr = trimmed;
    let redirectFile = null;
    let append = false;

    if (commandStr.includes('>>')) {
      const parts = commandStr.split('>>');
      commandStr = parts[0].trim();
      redirectFile = parts[1].trim();
      append = true;
    } else if (commandStr.includes('>')) {
      const parts = commandStr.split('>');
      commandStr = parts[0].trim();
      redirectFile = parts[1].trim();
      append = false;
    }

    const tokens = commandStr.split(/\s+/);
    const cmd = tokens[0].toLowerCase();
    const args = tokens.slice(1);

    let result = '';
    let code = 0;

    switch (cmd) {
      // 1. HELP
      case 'help':
      case '/?':
      case '-h':
      case '--help': {
        result = this.getHelpOutput();
        break;
      }

      // 2. DIRECTORY LISTING
      case 'dir': {
        const items = vfs.listItems(this.currentDir);
        const winPath = this.currentDir.replace(/\//g, '\\');
        let out = ` Volume in drive C has no label.\n Volume Serial Number is 4E7B-9A21\n\n Directory of ${winPath}\n\n`;
        out += `${new Date().toLocaleDateString()}  12:00 PM    <DIR>          .\n`;
        out += `${new Date().toLocaleDateString()}  12:00 PM    <DIR>          ..\n`;

        let fileCount = 0;
        let dirCount = 2;
        let totalBytes = 0;

        items.forEach(it => {
          const dateStr = new Date(it.updatedAt || Date.now()).toLocaleDateString();
          const timeStr = '12:00 PM';
          if (it.type === 'dir') {
            dirCount++;
            out += `${dateStr}  ${timeStr}    <DIR>          ${it.name}\n`;
          } else {
            fileCount++;
            const size = (it.content ? it.content.length : (it.size || 128));
            totalBytes += size;
            out += `${dateStr}  ${timeStr}             ${size.toString().padStart(6, ' ')} ${it.name}\n`;
          }
        });
        out += `               ${fileCount} File(s)        ${totalBytes} bytes\n`;
        out += `               ${dirCount} Dir(s)   42,853,912,576 bytes free`;
        result = out;
        break;
      }

      case 'ls': {
        const showAll = args.some(a => a.includes('a'));
        const longFormat = args.some(a => a.includes('l'));
        const items = vfs.listItems(this.currentDir);

        const filtered = showAll ? items : items.filter(i => !i.name.startsWith('.'));

        if (longFormat) {
          let out = `total ${filtered.length * 4}\n`;
          filtered.forEach(it => {
            const isDir = it.type === 'dir';
            const perm = isDir ? 'd' + (it.permissions || 'rwxr-xr-x').substring(1) : '-' + (it.permissions || 'rw-r--r--');
            const owner = it.owner || this.username;
            const size = it.content ? it.content.length : 4096;
            const dateStr = 'Sep 24 12:00';
            const colorCode = isDir ? '\x1b[34m' : (it.permissions && it.permissions.includes('x') ? '\x1b[32m' : '\x1b[0m');
            out += `${perm} 1 ${owner} ${owner} ${size.toString().padStart(5, ' ')} ${dateStr} ${it.name}\n`;
          });
          result = out.trim();
        } else {
          result = filtered.map(i => i.name + (i.type === 'dir' ? '/' : '')).join('   ');
        }
        break;
      }

      // 3. CHANGE DIRECTORY
      case 'cd': {
        const target = args[0];
        if (!target || target === '~') {
          this.currentDir = this.osType === 'windows' ? 'C:/Users/Student' : `/home/${this.username}`;
          result = '';
        } else if (target === '..') {
          if (this.currentDir !== '/' && this.currentDir !== 'C:') {
            const parts = this.currentDir.split('/').filter(Boolean);
            parts.pop();
            this.currentDir = parts.length === 0 ? (this.osType === 'windows' ? 'C:' : '/') : (this.osType === 'windows' ? parts.join('/') : '/' + parts.join('/'));
          }
          result = '';
        } else if (target === '/' || target === 'C:\\' || target === 'C:') {
          this.currentDir = this.osType === 'windows' ? 'C:' : '/';
          result = '';
        } else {
          const cleanTarget = target.replace(/\\/g, '/');
          const checkPath = cleanTarget.startsWith('/') || cleanTarget.startsWith('C:') ? cleanTarget : `${this.currentDir}/${cleanTarget}`;
          const node = vfs.resolveNode(checkPath);
          if (node && node.type === 'dir') {
            this.currentDir = checkPath;
            result = '';
          } else {
            result = this.osType === 'windows' ? `The system cannot find the path specified.` : `cd: ${target}: No such file or directory`;
            code = 1;
          }
        }
        break;
      }

      // 4. PWD
      case 'pwd': {
        result = this.currentDir;
        break;
      }

      // 5. MKDIR / MD
      case 'mkdir':
      case 'md': {
        if (!args[0]) {
          result = this.osType === 'windows' ? 'The syntax of the command is incorrect.' : 'mkdir: missing operand';
          code = 1;
          break;
        }
        const dirName = args.find(a => !a.startsWith('-')) || 'New_Folder';
        const res = vfs.createFolder(this.currentDir, dirName);
        if (res.success) {
          result = '';
          if (onEvent) onEvent({ type: 'CREATED_FOLDER', name: dirName });
        } else {
          result = `mkdir: cannot create directory '${dirName}': ${res.error}`;
          code = 1;
        }
        break;
      }

      // 6. TOUCH
      case 'touch': {
        if (!args[0]) {
          result = 'touch: missing file operand';
          code = 1;
          break;
        }
        const fileName = args[0];
        const res = vfs.createFile(this.currentDir, fileName, '');
        if (res.success) {
          result = '';
          if (onEvent) onEvent({ type: 'CREATED_FILE', name: fileName });
        } else {
          result = `touch: cannot touch '${fileName}': ${res.error}`;
          code = 1;
        }
        break;
      }

      // 7. CAT / TYPE
      case 'cat':
      case 'type': {
        if (!args[0]) {
          result = this.osType === 'windows' ? 'The syntax of the command is incorrect.' : 'cat: missing operand';
          code = 1;
          break;
        }
        const fileName = args[0];
        const res = vfs.readFile(this.currentDir, fileName);
        if (res.success) {
          result = res.content;
        } else {
          result = this.osType === 'windows' ? `The system cannot find the file specified.` : `cat: ${fileName}: No such file or directory`;
          code = 1;
        }
        break;
      }

      // 8. ECHO
      case 'echo': {
        let content = args.join(' ');
        if (content.startsWith('"') && content.endsWith('"')) {
          content = content.substring(1, content.length - 1);
        } else if (content.startsWith("'") && content.endsWith("'")) {
          content = content.substring(1, content.length - 1);
        }
        result = content;
        break;
      }

      // 9. RM / DEL / RMDIR / RD
      case 'rm':
      case 'del':
      case 'rmdir':
      case 'rd': {
        const target = args.find(a => !a.startsWith('-'));
        if (!target) {
          result = `${cmd}: missing operand`;
          code = 1;
          break;
        }
        const res = vfs.deleteItem(this.currentDir, target);
        if (res.success) {
          result = '';
        } else {
          result = `${cmd}: cannot remove '${target}': ${res.error}`;
          code = 1;
        }
        break;
      }

      // 10. CHMOD
      case 'chmod': {
        if (args.length < 2) {
          result = 'chmod: missing operand\nUsage: chmod [MODE] FILE (e.g. chmod 755 script.sh or chmod +x script.sh)';
          code = 1;
          break;
        }
        const mode = args[0];
        const file = args[1];
        const res = vfs.chmod(this.currentDir, file, mode);
        if (res.success) {
          result = '';
          if (onEvent) onEvent({ type: 'CHMOD_APPLIED', file, mode });
        } else {
          result = `chmod: cannot access '${file}': ${res.error}`;
          code = 1;
        }
        break;
      }

      // 11. CHOWN
      case 'chown': {
        result = '';
        break;
      }

      // 12. WHOAMI & ID
      case 'whoami': {
        result = this.username;
        break;
      }

      case 'id': {
        result = `uid=1000(${this.username}) gid=1000(${this.username}) groups=1000(${this.username}),4(adm),24(cdrom),27(sudo),100(users)`;
        break;
      }

      // 13. HOSTNAME
      case 'hostname': {
        result = this.osType === 'windows' ? 'SARLAYASH-PC' : 'sarlayash-universe';
        break;
      }

      // 14. CLEAR / CLS
      case 'clear':
      case 'cls': {
        return { output: '', code: 0, clear: true };
      }

      // 15. FASTFETCH / NEOFETCH / SYSTEMINFO
      case 'fastfetch':
      case 'neofetch': {
        result = this.getNeofetchBanner();
        if (onEvent) onEvent({ type: 'RAN_SYSTEM_DIAGNOSTIC' });
        break;
      }

      case 'systeminfo': {
        result = `Host Name:                 SARLAYASH-PC
OS Name:                   Microsoft Windows 11 Pro Education
OS Version:                10.0.22631 Build 22631
OS Manufacturer:           SarlaYash Virtual Computer Lab
System Model:              Virtual Lab Workstation
System Type:               x64-based PC
Processor(s):              1 Processor(s) Installed. [01]: Intel64 Family 6 Model 158 @ 3.20GHz
Total Physical Memory:     8,192 MB
Available Physical Memory: 5,420 MB
Virtual Memory: Max Size:  10,240 MB
Virtual Memory: In Use:    3,840 MB
Network Card(s):           [01]: Realtek PCIe GbE Family Controller (Virtual)
                           Connection Name: Ethernet 1
                           DHCP Enabled:    Yes
                           IP Address:      192.168.1.145
Founder Note:              Empowered by Kapil for mobile students.`;
        if (onEvent) onEvent({ type: 'RAN_SYSTEM_DIAGNOSTIC' });
        break;
      }

      // 16. IPCONFIG / IFCONFIG / IP A
      case 'ipconfig': {
        result = `Windows IP Configuration

Ethernet adapter vEthernet (SarlaYash Virtual Lab):

   Connection-specific DNS Suffix  . : sarlayash.internal
   Link-local IPv6 Address . . . . . : fe80::51b2:4f99:9f70:3ab2%12
   IPv4 Address. . . . . . . . . . . : 192.168.1.145
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1`;
        if (onEvent) onEvent({ type: 'INSPECTED_NETWORK' });
        break;
      }

      case 'ifconfig':
      case 'ip': {
        result = `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.145  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::a00:27ff:fe4e:66b2  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:4e:66:b2  txqueuelen 1000  (Ethernet)
        RX packets 24391  bytes 18942010 (18.9 MB)
        TX packets 15820  bytes 2490124 (2.4 MB)

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)`;
        if (onEvent) onEvent({ type: 'INSPECTED_NETWORK' });
        break;
      }

      // 17. PING
      case 'ping': {
        const host = args[0] || '8.8.8.8';
        result = `PING ${host} (${host}): 56 data bytes
64 bytes from ${host}: icmp_seq=0 ttl=118 time=12.4 ms
64 bytes from ${host}: icmp_seq=1 ttl=118 time=11.8 ms
64 bytes from ${host}: icmp_seq=2 ttl=118 time=13.1 ms
64 bytes from ${host}: icmp_seq=3 ttl=118 time=12.0 ms

--- ${host} ping statistics ---
4 packets transmitted, 4 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 11.8/12.3/13.1/0.5 ms`;
        if (onEvent) onEvent({ type: 'PINGED_HOST', host });
        break;
      }

      // 18. VER / UNAME / SW_VERS
      case 'ver': {
        result = 'Microsoft Windows [Version 10.0.22631.3296]';
        break;
      }

      case 'uname': {
        if (args.includes('-a')) {
          result = 'Linux sarlayash-universe 6.8.0-40-generic #40-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux';
        } else {
          result = 'Linux';
        }
        break;
      }

      case 'sw_vers': {
        result = `ProductName:		macOS
ProductVersion:		14.4.1 (Sonoma)
BuildVersion:		23E224`;
        if (onEvent) onEvent({ type: 'RAN_SYSTEM_DIAGNOSTIC' });
        break;
      }

      // 19. PACKAGE MANAGERS (APT, WINGET, BREW)
      case 'apt':
      case 'apt-get': {
        const sub = args[0];
        const pkg = args[1];
        if (sub === 'update') {
          result = `Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease
Get:2 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]
Fetched 126 kB in 1s (126 kB/s)
Reading package lists... Done
Building dependency tree... Done
All packages are up to date.`;
        } else if (sub === 'install') {
          if (!pkg) {
            result = 'apt: error: specify package to install (e.g. apt install git)';
            code = 1;
          } else {
            if (!this.installedPackages.includes(pkg)) {
              this.installedPackages.push(pkg);
            }
            result = `Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  ${pkg}
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 2,450 kB of archives.
Unpacking ${pkg} (latest-release) ...
Setting up ${pkg} (latest-release) ...
Processing triggers for man-db ...
✓ Installation completed successfully!`;
            if (onEvent) onEvent({ type: 'INSTALLED_PACKAGE', pkg, manager: 'apt' });
          }
        } else if (sub === 'list') {
          result = `Listing... Done\n` + this.installedPackages.map(p => `${p}/noble,now 1.0-1 amd64 [installed]`).join('\n');
        } else {
          result = 'Usage: apt [update | install <package> | list]';
        }
        break;
      }

      case 'winget': {
        const sub = args[0];
        const pkg = args[1];
        if (sub === 'install') {
          if (!pkg) {
            result = 'winget: please provide an application ID or name.';
            code = 1;
          } else {
            this.installedPackages.push(pkg);
            result = `Found ${pkg} [Publisher: Verified]
Version: 1.0.0
Downloading installer... [████████████████████] 100%
Successfully installed: ${pkg}`;
            if (onEvent) onEvent({ type: 'INSTALLED_PACKAGE', pkg, manager: 'winget' });
          }
        } else {
          result = `Windows Package Manager v1.7.3172
Available commands: install, search, list, show, upgrade`;
        }
        break;
      }

      case 'brew': {
        const sub = args[0];
        const pkg = args[1];
        if (sub === 'install' && pkg) {
          this.installedPackages.push(pkg);
          result = `==> Downloading https://ghcr.io/v2/homebrew/core/${pkg}/manifests/latest
==> Fetching ${pkg}
==> Pouring ${pkg}--1.0.0.bottle.tar.gz
🍺  /opt/homebrew/Cellar/${pkg}/1.0.0: 120 files, 15MB
==> Installation complete!`;
          if (onEvent) onEvent({ type: 'INSTALLED_PACKAGE', pkg, manager: 'brew' });
        } else {
          result = `Example usage: brew install <formula>`;
        }
        break;
      }

      // 20. PS & TOP
      case 'ps': {
        result = `  PID TTY          TIME CMD
 1042 pts/0    00:00:00 bash
 1098 pts/0    00:00:00 ps
  412 ?        00:00:01 systemd
  882 ?        00:00:03 sarlayash-desktop`;
        if (onEvent) onEvent({ type: 'INSPECTED_PROCESSES' });
        break;
      }

      case 'top':
      case 'htop': {
        result = `top - 12:00:01 up 2:15,  1 user,  load average: 0.12, 0.08, 0.04
Tasks: 142 total,   1 running, 141 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.4 us,  1.1 sy,  0.0 ni, 96.2 id,  0.3 wa,  0.0 hi,  0.0 si
MiB Mem :   7980.2 total,   4210.5 free,   2140.2 used,   1629.5 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
  882 student   20   0  512408 124800  42100 S   3.2   1.6   0:14.22 sarlayash-lab
 1042 student   20   0   14208   5120   3400 S   0.5   0.1   0:00.34 bash
  412 root      20   0  168290   9812   6400 S   0.0   0.1   0:01.05 systemd`;
        if (onEvent) onEvent({ type: 'INSPECTED_PROCESSES' });
        break;
      }

      // 21. FREE & DF
      case 'free': {
        result = `               total        used        free      shared  buff/cache   available
Mem:         8171724     2192100     4312040       84200     1667584     5895424
Swap:        2097148           0     2097148`;
        break;
      }

      case 'df': {
        result = `Filesystem     1K-blocks     Used Available Use% Mounted on
/dev/sda2       61248920 18492012  39612988  32% /
udev             4068212        0   4068212   0% /dev
tmpfs             817176     1420    815756   1% /run
/dev/sda1         524272     6140    518132   2% /boot/efi`;
        break;
      }

      // 22. DATE & UPTIME
      case 'date': {
        result = new Date().toUTCString();
        break;
      }

      case 'uptime': {
        result = ' 12:00:15 up 2 hours, 14 min,  1 user,  load average: 0.08, 0.05, 0.01';
        break;
      }

      // 23. SUDO
      case 'sudo': {
        if (!args[0]) {
          result = 'usage: sudo command';
          break;
        }
        // Run with root privileges
        const subCmd = args.join(' ');
        const subRes = this.execute(subCmd, onEvent);
        result = subRes.output;
        code = subRes.code;
        break;
      }

      // 24. GREP
      case 'grep': {
        if (args.length < 2) {
          result = 'grep: search_term [file]';
          code = 1;
          break;
        }
        const pattern = args[0].replace(/['"]/g, '');
        const targetFile = args[1];
        const fileRes = vfs.readFile(this.currentDir, targetFile);
        if (fileRes.success) {
          const lines = fileRes.content.split('\n');
          const matched = lines.filter(l => l.toLowerCase().includes(pattern.toLowerCase()));
          result = matched.join('\n');
        } else {
          result = `grep: ${targetFile}: No such file or directory`;
          code = 1;
        }
        break;
      }

      // 25. TREE
      case 'tree': {
        const items = vfs.listItems(this.currentDir);
        let out = '.\n';
        items.forEach((it, idx) => {
          const isLast = idx === items.length - 1;
          const prefix = isLast ? '└── ' : '├── ';
          out += `${prefix}${it.name}\n`;
        });
        result = out.trim();
        break;
      }

      // 26. HISTORY
      case 'history': {
        result = this.history.map((h, i) => `${(i + 1).toString().padStart(4, ' ')}  ${h}`).join('\n');
        break;
      }

      // 27. ENV / EXPORT / SET
      case 'env':
      case 'set': {
        result = Object.entries(this.env).map(([k, v]) => `${k}=${v}`).join('\n');
        if (onEvent) onEvent({ type: 'CHECKED_ENV' });
        break;
      }

      case 'export': {
        if (!args[0]) {
          result = Object.entries(this.env).map(([k, v]) => `declare -x ${k}="${v}"`).join('\n');
        } else {
          const [key, val] = args[0].split('=');
          if (key && val) {
            this.env[key] = val.replace(/['"]/g, '');
            result = '';
          }
        }
        break;
      }

      // 28. MAN
      case 'man': {
        const topic = args[0];
        result = `MANUAL PAGE FOR: ${topic || 'sarlayash-universe'}
SarlaYash Mobile Computer Lab Command Reference.
Syntax: ${topic} [OPTIONS] [ARGUMENTS]
Practice freely. Your virtual filesystem saves persistently on this device.`;
        break;
      }

      // 29. CURL / WGET
      case 'curl': {
        result = `HTTP/2 200 OK
server: SarlaYash-Cloud
content-type: text/html; charset=UTF-8
date: ${new Date().toUTCString()}

<!DOCTYPE html>
<html>
<head><title>SarlaYash OS Universe</title></head>
<body><h1>Practical Skills for Every Student</h1></body>
</html>`;
        break;
      }

      // 30. CROSH (ChromeOS)
      case 'crosh':
      case 'vmc':
      case 'battery_test': {
        result = `Battery is discharging (94.20% left)
Battery health: 98.40%
Please wait... 10s test completed.`;
        break;
      }

      // 31. SAY (macOS)
      case 'say': {
        const text = args.join(' ');
        result = `[macOS Audio Synthesis]: "${text || 'Hello from macOS!'}"`;
        break;
      }

      default: {
        result = this.osType === 'windows' 
          ? `'${cmd}' is not recognized as an internal or external command,\noperable program or batch file.`
          : `${cmd}: command not found. Type 'help' for available commands.`;
        code = 127;
      }
    }

    // Process output redirection if specified
    if (redirectFile) {
      const fileName = redirectFile;
      if (append) {
        const existing = vfs.readFile(this.currentDir, fileName);
        const newText = (existing.success ? existing.content + '\n' : '') + result;
        vfs.createFile(this.currentDir, fileName, newText);
      } else {
        vfs.createFile(this.currentDir, fileName, result);
      }
      if (onEvent) onEvent({ type: 'REDIRECTED_OUTPUT', file: fileName, content: result });
      return { output: '', code: 0 };
    }

    return { output: result, code };
  }

  getHelpOutput() {
    return `=== SARLAYASH OS UNIVERSE - COMMAND REFERENCE ===
[50+ Supported Commands Across Labs]

FILE & FOLDER OPERATIONS:
  ls, dir          List files and directories (flags: ls -la, dir)
  cd <dir>         Change current directory (cd .., cd ~, cd /)
  pwd              Print working directory
  mkdir, md <name> Create a new directory
  touch <file>     Create an empty file
  cat, type <file> Display file contents
  rm, del <file>   Remove a file or folder
  chmod <mode> <s> Change file permissions (e.g. chmod 755 script.sh)
  grep <str> <f>   Search pattern in file
  tree             Display folder structure hierarchy

SYSTEM & DIAGNOSTICS:
  fastfetch, neofetch  Visual OS & hardware diagnostic banner
  systeminfo       Windows detailed hardware & network specs
  sw_vers          macOS version information
  ver / uname -a   Kernel and OS version
  ipconfig / ifconfig  Network adapter and IP configurations
  ping <host>      Test network reachability
  whoami, id       Current user and privileges
  hostname         Computer network identity
  ps, top, htop    Process list and active CPU/RAM usage
  free, df         Memory and virtual disk partition usage
  date, uptime     Current time and system uptime

ADMINISTRATION & TOOLS:
  apt update       Update Linux package repositories
  apt install <p>  Install software in Ubuntu (e.g. apt install git)
  winget install   Install package in Windows 11
  brew install     Install package in macOS
  echo <text>      Print or redirect text (> file.txt, >> file.txt)
  clear, cls       Clear the terminal screen
  env, export      Environment variables
  history          View previously executed commands
  help             Show this guidance

Tip: On mobile phones, toggle the Virtual Keyboard or Mobile Trackpad!`;
  }

  getNeofetchBanner() {
    if (this.osType === 'windows') {
      return `
\x1b[36m    ████████████  ████████████\x1b[0m   student@SARLAYASH-PC
\x1b[36m    ████████████  ████████████\x1b[0m   --------------------
\x1b[36m    ████████████  ████████████\x1b[0m   OS: Windows 11 Pro 64-bit
\x1b[36m    ████████████  ████████████\x1b[0m   Host: SarlaYash Virtual Computer Lab
\x1b[36m                              \x1b[0m   Kernel: 10.0.22631
\x1b[36m    ████████████  ████████████\x1b[0m   Uptime: 2 hours, 14 mins
\x1b[36m    ████████████  ████████████\x1b[0m   Shell: CMD.EXE / PowerShell
\x1b[36m    ████████████  ████████████\x1b[0m   Resolution: 1920x1080 (Mobile Scaled)
\x1b[36m    ████████████  ████████████\x1b[0m   CPU: Intel Core i7 (Virtual 4 Cores)
\x1b[36m    ████████████  ████████████\x1b[0m   Memory: 2140MiB / 8192MiB
\x1b[36m    ████████████  ████████████\x1b[0m   Founder: Kapil Narula (SarlaYash)`;
    } else if (this.osType === 'macos') {
      return `
\x1b[32m                    'c.\x1b[0m          student@MacBook-Pro
\x1b[32m                 ,xNMM.\x1b[0m          -------------------
\x1b[32m               .OMMMMo\x1b[0m           OS: macOS Sonoma 14.4.1 arm64
\x1b[33m               lMM\"\x1b[0m              Host: MacBook Pro 16-inch
\x1b[33m     .;loddo:.  .oaoc.\x1b[0m           Kernel: Darwin 23.4.0
\x1b[33m   cxoooooooooo.lMMMMMdo;\x1b[0m        Uptime: 3 hours, 45 mins
\x1b[31m  cKMMMMMMMMMMMMMNkkxkODx\x1b[0m        Shell: zsh 5.9
\x1b[31m  kMMMMMMMMMMMMMMMAxlllol\x1b[0m        Terminal: Apple_Terminal
\x1b[35m  ;KMMMMMMMMMMMMMMMMMMMMx\x1b[0m        CPU: Apple M3 Pro (12 Cores)
\x1b[35m   .cooollllldxkkxxdoc;\x1b[0m          Memory: 3820MiB / 18432MiB
\x1b[34m     .oddo::lldc.\x1b[0m                Mission: Computer Skills for Every Student`;
    } else if (this.osType === 'chrome') {
      return `
\x1b[31m         ,---.\x1b[0m                   chronos@localhost
\x1b[31m        /     \\\x1b[0m                  -----------------
\x1b[32m       |   \x1b[34m(O)\x1b[32m  |\x1b[0m                 OS: Google ChromeOS 124.0.6367
\x1b[33m        \\     /\x1b[0m                  Platform: 15823.51.0 (Official Build)
\x1b[33m         \`---\x1b[0m                    Host: Chromebook Flip
                                 Kernel: 5.15.148-crostini
                                 Uptime: 1 hour, 10 mins
                                 Shell: crosh / crostini bash
                                 Memory: 1820MiB / 4096MiB`;
    } else {
      // Ubuntu Linux
      return `
\x1b[31m            .-/+oossssoo+/-.\x1b[0m             student@sarlayash-ubuntu
\x1b[31m        :\`:+ssssssssssssssss++:\`\x1b[0m         ------------------------
\x1b[31m      \x1b[37m-\x1b[31m+ssssssssssssssssss\x1b[37myyys+-\x1b[0m        OS: Ubuntu 24.04 LTS (Noble Numbat)
\x1b[31m    \x1b[37m.ys\x1b[31mssssssssssssssss\x1b[37m/oosssssys.\x1b[0m       Host: SarlaYash Virtual Computer Lab
\x1b[31m   \x1b[37m/yy\x1b[31mssssssssssssssss\x1b[37m/    \`\x1b[31m+sssss\x1b[37myy/\x1b[0m      Kernel: 6.8.0-40-generic
\x1b[31m  \x1b[37m:yy\x1b[31mssssssssssssssss\x1b[37ms\`           \x1b[31m+s\x1b[37myy:\x1b[0m     Uptime: 2 hours, 45 mins
\x1b[31m  \x1b[37m:yy\x1b[31mssssssssssssssss\x1b[37ms             \x1b[31m+s\x1b[37myy:\x1b[0m     Shell: bash 5.2.21
\x1b[31m   \x1b[37m/yy\x1b[31mssssssssssssssss\x1b[37m+          \`\x1b[31m+ssss\x1b[37myy/\x1b[0m      DE: GNOME 46.0 (Yaru theme)
\x1b[31m    \x1b[37m.ys\x1b[31mssssssssssssssss\x1b[37m+oosssssys.\x1b[0m       CPU: Intel Core i7 @ 3.20GHz
\x1b[31m      \x1b[37m-\x1b[31m+ssssssssssssssssss\x1b[37myyys+-\x1b[0m        Memory: 2140MiB / 8192MiB
\x1b[31m        :\`:+ssssssssssssssss++:\`\x1b[0m         Founder: Kapil Narula
\x1b[31m            .-/+oossssoo+/-.\x1b[0m`;
    }
  }
}

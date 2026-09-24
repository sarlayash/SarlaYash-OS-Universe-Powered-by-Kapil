// Virtual File System for SarlaYash OS Universe
// Realistic, persistent directory and file hierarchy for Windows, Linux, macOS, and ChromeOS

const FS_STORAGE_KEY = 'sarlayash_vfs_v1';

export const INITIAL_FILESYSTEM = {
  // Common root mounts
  '/': {
    type: 'dir',
    name: '/',
    permissions: 'rwxr-xr-x',
    owner: 'root',
    children: {
      home: {
        type: 'dir',
        name: 'home',
        permissions: 'rwxr-xr-x',
        owner: 'root',
        children: {
          student: {
            type: 'dir',
            name: 'student',
            permissions: 'rwxr-xr-x',
            owner: 'student',
            children: {
              Desktop: {
                type: 'dir',
                name: 'Desktop',
                permissions: 'rwxr-xr-x',
                owner: 'student',
                children: {
                  'welcome.txt': {
                    type: 'file',
                    name: 'welcome.txt',
                    permissions: 'rw-r--r--',
                    owner: 'student',
                    content: 'Welcome to SarlaYash OS Universe!\nEmpowering students with hands-on computer skills directly on your phone.\nExplore Windows, Linux, macOS and ChromeOS labs!'
                  },
                  'start_here.sh': {
                    type: 'file',
                    name: 'start_here.sh',
                    permissions: 'rw-r--r--',
                    owner: 'student',
                    content: '#!/bin/bash\necho "Hello future engineer!"\necho "Current date: $(date)"\necho "Happy Learning with Kapil!"'
                  }
                }
              },
              Documents: {
                type: 'dir',
                name: 'Documents',
                permissions: 'rwxr-xr-x',
                owner: 'student',
                children: {
                  'course_syllabus.txt': {
                    type: 'file',
                    name: 'course_syllabus.txt',
                    permissions: 'rw-r--r--',
                    owner: 'student',
                    content: 'SARLAYASH OS UNIVERSE SYLLABUS\n\n1. OS Installation & Partitioning\n2. GUI Desktop Navigation\n3. Command Line Mastery (50+ commands)\n4. File System Permissions & Security\n5. Package Management & Administration\n6. Certification Assessment'
                  },
                  'notes.md': {
                    type: 'file',
                    name: 'notes.md',
                    permissions: 'rw-r--r--',
                    owner: 'student',
                    content: '# Student Notes\nToday I practiced Linux chmod and Windows ipconfig!\nPractical computer skills on my mobile screen.'
                  }
                }
              },
              Downloads: {
                type: 'dir',
                name: 'Downloads',
                permissions: 'rwxr-xr-x',
                owner: 'student',
                children: {
                  'sample_data.csv': {
                    type: 'file',
                    name: 'sample_data.csv',
                    permissions: 'rw-r--r--',
                    owner: 'student',
                    content: 'id,name,role,score\n1,Kapil,Founder,100\n2,Yash,Student,95\n3,Sarla,Mentor,99'
                  }
                }
              },
              Pictures: {
                type: 'dir',
                name: 'Pictures',
                permissions: 'rwxr-xr-x',
                owner: 'student',
                children: {
                  'avatar.svg': {
                    type: 'file',
                    name: 'avatar.svg',
                    permissions: 'rw-r--r--',
                    owner: 'student',
                    content: '<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="#3b82f6"/></svg>'
                  }
                }
              },
              '.bashrc': {
                type: 'file',
                name: '.bashrc',
                permissions: 'rw-r--r--',
                owner: 'student',
                content: '# ~/.bashrc\nexport PS1="\\u@sarlayash-lab:\\w\\$ "\nalias ll="ls -la"\nalias cls="clear"'
              }
            }
          }
        }
      },
      etc: {
        type: 'dir',
        name: 'etc',
        permissions: 'rwxr-xr-x',
        owner: 'root',
        children: {
          'hostname': {
            type: 'file',
            name: 'hostname',
            permissions: 'rw-r--r--',
            owner: 'root',
            content: 'sarlayash-universe'
          },
          'os-release': {
            type: 'file',
            name: 'os-release',
            permissions: 'rw-r--r--',
            owner: 'root',
            content: 'NAME="SarlaYash Ubuntu Lab"\nVERSION="24.04 LTS (Noble Numbat)"\nID=ubuntu\nHOME_URL="https://sarlayash.edu"'
          }
        }
      },
      var: {
        type: 'dir',
        name: 'var',
        permissions: 'rwxr-xr-x',
        owner: 'root',
        children: {
          log: {
            type: 'dir',
            name: 'log',
            permissions: 'rwxr-xr-x',
            owner: 'root',
            children: {
              'syslog': {
                type: 'file',
                name: 'syslog',
                permissions: 'rw-r-----',
                owner: 'syslog',
                content: 'systemd[1]: Started SarlaYash Virtual Computer Lab.\nkernel: [0.000000] Virtual CPU initialized.\nNetworkManager: Network connection established.'
              }
            }
          }
        }
      },
      bin: {
        type: 'dir',
        name: 'bin',
        permissions: 'rwxr-xr-x',
        owner: 'root',
        children: {
          'bash': { type: 'file', name: 'bash', permissions: 'rwxr-xr-x', owner: 'root', content: '[ELF executable]' },
          'ls': { type: 'file', name: 'ls', permissions: 'rwxr-xr-x', owner: 'root', content: '[ELF executable]' },
          'cat': { type: 'file', name: 'cat', permissions: 'rwxr-xr-x', owner: 'root', content: '[ELF executable]' },
          'chmod': { type: 'file', name: 'chmod', permissions: 'rwxr-xr-x', owner: 'root', content: '[ELF executable]' }
        }
      }
    }
  },

  // Windows Drive Layout
  'C:': {
    type: 'dir',
    name: 'C:',
    children: {
      Windows: {
        type: 'dir',
        name: 'Windows',
        children: {
          System32: {
            type: 'dir',
            name: 'System32',
            children: {
              'cmd.exe': { type: 'file', name: 'cmd.exe', content: '[PE binary]' },
              'ipconfig.exe': { type: 'file', name: 'ipconfig.exe', content: '[PE binary]' },
              'systeminfo.exe': { type: 'file', name: 'systeminfo.exe', content: '[PE binary]' }
            }
          }
        }
      },
      'Program Files': {
        type: 'dir',
        name: 'Program Files',
        children: {
          'SarlaYash': {
            type: 'dir',
            name: 'SarlaYash',
            children: {
              'README.txt': {
                type: 'file',
                name: 'README.txt',
                content: 'SarlaYash OS Universe - Windows Edition\nEmpowering every learner with modern IT & Operating System skills.'
              }
            }
          }
        }
      },
      Users: {
        type: 'dir',
        name: 'Users',
        children: {
          Student: {
            type: 'dir',
            name: 'Student',
            children: {
              Desktop: {
                type: 'dir',
                name: 'Desktop',
                children: {
                  'Welcome_Windows.txt': {
                    type: 'file',
                    name: 'Welcome_Windows.txt',
                    content: 'Welcome to Windows 11 Virtual Lab!\nExplore the Start Menu, File Explorer, Command Prompt, and Settings.'
                  },
                  'Project_Notes.txt': {
                    type: 'file',
                    name: 'Project_Notes.txt',
                    content: 'My Lab Checklist:\n[X] Installed Windows\n[X] Explored Taskbar & Start Menu\n[ ] Run CMD commands (ipconfig, dir, systeminfo)'
                  }
                }
              },
              Documents: {
                type: 'dir',
                name: 'Documents',
                children: {
                  'Resume.txt': {
                    type: 'file',
                    name: 'Resume.txt',
                    content: 'Student Resume\nSkills: Windows Administration, Linux Terminal, File Management, Diagnostics.'
                  }
                }
              },
              Downloads: {
                type: 'dir',
                name: 'Downloads',
                children: {
                  'setup_tool.exe': { type: 'file', name: 'setup_tool.exe', content: '[Simulator Installer]' }
                }
              },
              Pictures: {
                type: 'dir',
                name: 'Pictures',
                children: {}
              }
            }
          }
        }
      }
    }
  }
};

export class FileSystemManager {
  constructor() {
    this.fs = this.loadFileSystem();
  }

  loadFileSystem() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(FS_STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      }
    } catch {
      // fallback
    }
    this.saveFileSystem(INITIAL_FILESYSTEM);
    return JSON.parse(JSON.stringify(INITIAL_FILESYSTEM));
  }

  saveFileSystem(fsToSave = this.fs) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(FS_STORAGE_KEY, JSON.stringify(fsToSave));
      }
    } catch (e) {
      console.warn('Could not save VFS:', e);
    }
  }

  resetFileSystem() {
    this.fs = JSON.parse(JSON.stringify(INITIAL_FILESYSTEM));
    this.saveFileSystem();
    return this.fs;
  }

  // Resolve directory node given path (e.g. "/home/student" or "C:/Users/Student")
  resolveNode(rawPath) {
    let p = rawPath.replace(/\\/g, '/');
    if (p.startsWith('C:') || p.startsWith('c:')) {
      const parts = p.split('/').filter(Boolean);
      let curr = this.fs['C:'];
      for (let i = 1; i < parts.length; i++) {
        if (!curr.children || !curr.children[parts[i]]) return null;
        curr = curr.children[parts[i]];
      }
      return curr;
    } else {
      if (!p.startsWith('/')) p = '/' + p;
      if (p === '/') return this.fs['/'];
      const parts = p.split('/').filter(Boolean);
      let curr = this.fs['/'];
      for (const part of parts) {
        if (!curr.children || !curr.children[part]) return null;
        curr = curr.children[part];
      }
      return curr;
    }
  }

  // Get items in path
  listItems(path) {
    const node = this.resolveNode(path);
    if (!node || node.type !== 'dir') return [];
    return Object.values(node.children || {});
  }

  // Create file
  createFile(parentPath, name, content = '', permissions = 'rw-r--r--', owner = 'student') {
    const parent = this.resolveNode(parentPath);
    if (!parent || parent.type !== 'dir') return { success: false, error: 'Directory not found' };
    if (!parent.children) parent.children = {};

    parent.children[name] = {
      type: 'file',
      name,
      content,
      permissions,
      owner,
      size: content.length,
      updatedAt: new Date().toISOString()
    };
    this.saveFileSystem();
    return { success: true, item: parent.children[name] };
  }

  // Create folder
  createFolder(parentPath, name, permissions = 'rwxr-xr-x', owner = 'student') {
    const parent = this.resolveNode(parentPath);
    if (!parent || parent.type !== 'dir') return { success: false, error: 'Directory not found' };
    if (!parent.children) parent.children = {};
    if (parent.children[name]) return { success: false, error: 'Directory already exists' };

    parent.children[name] = {
      type: 'dir',
      name,
      permissions,
      owner,
      children: {},
      updatedAt: new Date().toISOString()
    };
    this.saveFileSystem();
    return { success: true, item: parent.children[name] };
  }

  // Read file
  readFile(parentPath, name) {
    const parent = this.resolveNode(parentPath);
    if (!parent || !parent.children || !parent.children[name]) {
      return { success: false, error: 'File not found' };
    }
    const item = parent.children[name];
    if (item.type !== 'file') {
      return { success: false, error: 'Is a directory' };
    }
    return { success: true, content: item.content || '' };
  }

  // Update file
  updateFile(parentPath, name, content) {
    const parent = this.resolveNode(parentPath);
    if (!parent || !parent.children || !parent.children[name]) {
      return { success: false, error: 'File not found' };
    }
    parent.children[name].content = content;
    parent.children[name].updatedAt = new Date().toISOString();
    this.saveFileSystem();
    return { success: true };
  }

  // Delete item
  deleteItem(parentPath, name) {
    const parent = this.resolveNode(parentPath);
    if (!parent || !parent.children || !parent.children[name]) {
      return { success: false, error: 'Item not found' };
    }
    delete parent.children[name];
    this.saveFileSystem();
    return { success: true };
  }

  // Rename item
  renameItem(parentPath, oldName, newName) {
    const parent = this.resolveNode(parentPath);
    if (!parent || !parent.children || !parent.children[oldName]) {
      return { success: false, error: 'Item not found' };
    }
    if (parent.children[newName]) {
      return { success: false, error: 'Target name already exists' };
    }
    const item = parent.children[oldName];
    item.name = newName;
    parent.children[newName] = item;
    delete parent.children[oldName];
    this.saveFileSystem();
    return { success: true };
  }

  // Change permissions
  chmod(parentPath, name, mode) {
    const parent = this.resolveNode(parentPath);
    if (!parent || !parent.children || !parent.children[name]) {
      return { success: false, error: 'Item not found' };
    }
    let formattedMode = mode;
    if (mode === '755' || mode === '+x') formattedMode = 'rwxr-xr-x';
    if (mode === '644') formattedMode = 'rw-r--r--';
    if (mode === '777') formattedMode = 'rwxrwxrwx';
    if (mode === '600') formattedMode = 'rw-------';

    parent.children[name].permissions = formattedMode;
    this.saveFileSystem();
    return { success: true, permissions: formattedMode };
  }
}

export const vfs = new FileSystemManager();

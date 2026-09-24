// File Explorer / Finder / Files App
// Seamlessly connects GUI navigation with the persistent Virtual File System

import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  FileText, 
  FolderPlus, 
  FilePlus, 
  Trash2, 
  ArrowLeft, 
  HardDrive, 
  Home, 
  Monitor, 
  Download, 
  Image, 
  ChevronRight,
  Shield,
  Save,
  X
} from 'lucide-react';
import { vfs } from '../../services/fileSystemService';
import { useLearner } from '../../context/LearnerContext';
import { useOS } from '../../context/OSContext';

export const FileExplorerApp = () => {
  const { activeOS } = useOS();
  const { triggerChallengeEvent } = useLearner();

  const getDefaultPath = () => {
    if (activeOS === 'windows') return 'C:/Users/Student';
    if (activeOS === 'macos') return '/home/student';
    return '/home/student';
  };

  const [currentPath, setCurrentPath] = useState(getDefaultPath);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingFile, setEditingFile] = useState(null); // { name, content }
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  // Reload current folder items
  const reload = () => {
    const list = vfs.listItems(currentPath);
    setItems(list);
  };

  useEffect(() => {
    reload();
    triggerChallengeEvent({ type: 'OPENED_EXPLORER' });
  }, [currentPath]);

  const handleOpenItem = (item) => {
    if (item.type === 'dir') {
      const next = currentPath === '/' ? `/${item.name}` : `${currentPath}/${item.name}`;
      setCurrentPath(next);
      setSelectedItem(null);
    } else {
      // Open file for viewing & editing
      const res = vfs.readFile(currentPath, item.name);
      if (res.success) {
        setEditingFile({ name: item.name, content: res.content });
      }
    }
  };

  const handleGoBack = () => {
    if (currentPath === '/' || currentPath === 'C:' || currentPath === 'C:/') return;
    const parts = currentPath.split('/').filter(Boolean);
    parts.pop();
    if (parts.length === 0) {
      setCurrentPath(activeOS === 'windows' ? 'C:' : '/');
    } else {
      setCurrentPath(activeOS === 'windows' ? parts.join('/') : '/' + parts.join('/'));
    }
    setSelectedItem(null);
  };

  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    const res = vfs.createFolder(currentPath, newFolderName.trim());
    if (res.success) {
      triggerChallengeEvent({ type: 'CREATED_FOLDER', name: newFolderName.trim() });
      setShowNewFolderModal(false);
      setNewFolderName('');
      reload();
    }
  };

  const handleCreateFile = (e) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    const res = vfs.createFile(currentPath, newFileName.trim(), 'Created in SarlaYash OS Universe Lab');
    if (res.success) {
      triggerChallengeEvent({ type: 'CREATED_FILE', name: newFileName.trim() });
      setShowNewFileModal(false);
      setNewFileName('');
      reload();
    }
  };

  const handleDeleteItem = (item) => {
    if (confirm(`Delete '${item.name}'?`)) {
      vfs.deleteItem(currentPath, item.name);
      setSelectedItem(null);
      reload();
    }
  };

  const handleSaveFileContent = () => {
    if (!editingFile) return;
    vfs.updateFile(currentPath, editingFile.name, editingFile.content);
    setEditingFile(null);
    reload();
  };

  const SIDEBAR_PLACES = activeOS === 'windows' ? [
    { label: 'Desktop', path: 'C:/Users/Student/Desktop', icon: Monitor },
    { label: 'Documents', path: 'C:/Users/Student/Documents', icon: FileText },
    { label: 'Downloads', path: 'C:/Users/Student/Downloads', icon: Download },
    { label: 'Pictures', path: 'C:/Users/Student/Pictures', icon: Image },
    { label: 'Local Disk (C:)', path: 'C:', icon: HardDrive }
  ] : [
    { label: 'Home', path: '/home/student', icon: Home },
    { label: 'Desktop', path: '/home/student/Desktop', icon: Monitor },
    { label: 'Documents', path: '/home/student/Documents', icon: FileText },
    { label: 'Downloads', path: '/home/student/Downloads', icon: Download },
    { label: 'Root Filesystem', path: '/', icon: HardDrive }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-200 select-none">
      {/* Top Toolbar & Address Bar */}
      <div className="p-2 sm:p-2.5 bg-slate-800/90 border-b border-slate-700/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
          <button
            onClick={handleGoBack}
            className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white"
            title="Go Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          {/* Breadcrumb Path Bar */}
          <div className="flex-1 flex items-center gap-1 px-3 py-1.5 bg-slate-950/70 border border-slate-700/70 rounded-lg text-slate-300 font-mono text-[11px] truncate">
            <HardDrive className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="truncate">{currentPath}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowNewFolderModal(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-600 active:bg-blue-700 text-white font-medium text-xs shadow-sm"
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Folder</span>
          </button>
          <button
            onClick={() => setShowNewFileModal(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-slate-200 font-medium text-xs shadow-sm"
          >
            <FilePlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New File</span>
          </button>
        </div>
      </div>

      {/* Main Container: Sidebar + Item Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <div className="w-36 sm:w-44 bg-slate-950/60 border-r border-slate-800 p-2 space-y-1 overflow-y-auto hidden xs:block">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 py-1">
            {activeOS === 'macos' ? 'Favorites' : 'Quick Access'}
          </div>
          {SIDEBAR_PLACES.map((p) => {
            const Icon = p.icon;
            const isCurr = currentPath === p.path;
            return (
              <button
                key={p.path}
                onClick={() => setCurrentPath(p.path)}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                  isCurr ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Items Grid & Detail Area */}
        <div className="flex-1 p-3 overflow-y-auto">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs">
              <Folder className="w-10 h-10 mb-2 stroke-1 text-slate-600" />
              <span>This folder is empty</span>
              <span className="text-[10px] mt-1 text-slate-600">Create a folder or run commands in terminal</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
              {items.map((it) => {
                const isSelected = selectedItem?.name === it.name;
                const isDir = it.type === 'dir';
                return (
                  <div
                    key={it.name}
                    onClick={() => setSelectedItem(it)}
                    onDoubleClick={() => handleOpenItem(it)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-500/20 border-blue-500/50 shadow-md ring-1 ring-blue-500/40'
                        : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600'
                    }`}
                  >
                    {isDir ? (
                      <Folder className="w-10 h-10 text-amber-400 fill-amber-400/20 mb-1.5" />
                    ) : (
                      <FileText className="w-10 h-10 text-blue-400 fill-blue-400/20 mb-1.5" />
                    )}
                    <span className="text-xs font-medium text-slate-200 truncate w-full px-1">
                      {it.name}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      {isDir ? 'Folder' : `${it.content?.length || 0} bytes`}
                    </span>
                    {it.permissions && (
                      <span className="text-[9px] text-emerald-400 font-mono mt-0.5">
                        {it.permissions}
                      </span>
                    )}

                    {/* Mobile double-tap shortcut button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleOpenItem(it); }}
                      className="mt-2 text-[10px] text-blue-400 font-semibold px-2 py-0.5 rounded bg-blue-500/10 hover:bg-blue-500/20 sm:hidden"
                    >
                      {isDir ? 'Open' : 'View'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Item Properties & Delete Status Footer */}
      {selectedItem && (
        <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold text-slate-200">{selectedItem.name}</span>
            <span className="font-mono text-[11px] text-slate-500">({selectedItem.permissions || 'default'})</span>
          </div>
          <button
            onClick={() => handleDeleteItem(selectedItem)}
            className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded bg-red-900/20 hover:bg-red-900/40"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      )}

      {/* Modal: New Folder */}
      {showNewFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleCreateFolder} className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-2xl space-y-3">
            <div className="font-semibold text-sm text-white">Create New Folder</div>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name (e.g. Lab, Projects)"
              autoFocus
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNewFolderModal(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: New File */}
      {showNewFileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleCreateFile} className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-2xl space-y-3">
            <div className="font-semibold text-sm text-white">Create New File</div>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="File name (e.g. notes.txt, script.sh)"
              autoFocus
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNewFileModal(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Integrated File Content Viewer & Editor */}
      {editingFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-3 bg-slate-800 border-b border-slate-700 flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="font-semibold font-mono">{editingFile.name}</span>
              </div>
              <button
                onClick={() => setEditingFile(null)}
                className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 flex-1 flex flex-col">
              <textarea
                value={editingFile.content}
                onChange={(e) => setEditingFile(prev => ({ ...prev, content: e.target.value }))}
                className="w-full flex-1 min-h-[220px] bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed resize-none"
              />
            </div>
            <div className="p-3 bg-slate-800 border-t border-slate-700 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                {editingFile.content.length} characters
              </span>
              <button
                onClick={handleSaveFileContent}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

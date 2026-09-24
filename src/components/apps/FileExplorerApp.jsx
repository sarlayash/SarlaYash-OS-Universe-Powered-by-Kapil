// Authentic File Explorer / Finder / Nautilus Application
// Features real ribbon toolbars, tabs, breadcrumbs, and virtual filesystem synchronization

import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  FileText, 
  FolderPlus, 
  FilePlus, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp, 
  HardDrive, 
  Home, 
  Monitor, 
  Download, 
  Image, 
  Search, 
  ChevronRight, 
  Scissors, 
  Copy, 
  Edit3, 
  Share2, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  Save, 
  X,
  Plus
} from 'lucide-react';
import { vfs } from '../../services/fileSystemService';
import { useLearner } from '../../context/LearnerContext';
import { useOS } from '../../context/OSContext';
import { WindowsExplorerIcon, UbuntuFilesIcon, MacFinderIcon, ChromeFilesIcon } from '../icons/OSIcons';

export const FileExplorerApp = () => {
  const { activeOS } = useOS();
  const { triggerChallengeEvent } = useLearner();

  const getDefaultPath = () => {
    if (activeOS === 'windows') return 'C:/Users/Student';
    return '/home/student';
  };

  const [currentPath, setCurrentPath] = useState(getDefaultPath);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [editingFile, setEditingFile] = useState(null);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');

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
      const res = vfs.readFile(currentPath, item.name);
      if (res.success) {
        setEditingFile({ name: item.name, content: res.content });
      }
    }
  };

  const handleGoUp = () => {
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

  const SIDEBAR_ITEMS = activeOS === 'windows' ? [
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
    { label: 'Root (/)', path: '/', icon: HardDrive }
  ];

  const filteredItems = searchQuery
    ? items.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : items;

  // Format breadcrumb path pills
  const pathSegments = currentPath.split('/').filter(Boolean);

  return (
    <div className="h-full flex flex-col bg-[#191919] text-slate-200 select-none font-sans text-xs">
      {/* Top Tab Strip (Windows 11 style) */}
      {activeOS === 'windows' && (
        <div className="h-8 bg-[#1f1f1f] border-b border-white/5 flex items-center px-2 gap-1 select-none">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#2b2b2b] text-white rounded-t-lg font-medium text-xs shadow-sm">
            <WindowsExplorerIcon className="w-3.5 h-3.5" />
            <span>{currentPath.split('/').pop() || 'This PC'}</span>
          </div>
          <button className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/10">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Ribbon Command Bar */}
      <div className="p-1.5 bg-[#202020] border-b border-white/5 flex flex-wrap items-center justify-between gap-2">
        {/* Actions: New, Cut, Copy, Delete */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowNewFolderModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded hover:bg-white/10 text-white font-medium transition-colors"
          >
            <FolderPlus className="w-4 h-4 text-blue-400" />
            <span>New</span>
          </button>
          <div className="w-[1px] h-4 bg-white/10 mx-1" />
          <button
            onClick={() => setShowNewFileModal(true)}
            className="p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-white"
            title="New File"
          >
            <FilePlus className="w-4 h-4" />
          </button>
          <button
            disabled={!selectedItem}
            onClick={() => selectedItem && handleDeleteItem(selectedItem)}
            className="p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-red-400 disabled:opacity-30 disabled:hover:text-slate-300"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'}`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Address Bar & Search Strip */}
      <div className="p-2 bg-[#252525] border-b border-white/5 flex items-center gap-2">
        <div className="flex items-center gap-1 text-slate-400">
          <button onClick={handleGoUp} className="p-1 rounded hover:bg-white/10 hover:text-white" title="Up">
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Breadcrumb Path Box */}
        <div className="flex-1 flex items-center gap-1 px-3 py-1 bg-[#1a1a1a] border border-white/10 rounded-lg text-slate-200 overflow-x-auto scrollbar-none font-mono text-[11px]">
          <HardDrive className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="truncate">{currentPath}</span>
        </div>

        {/* Search Box */}
        <div className="w-36 sm:w-48 flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] border border-white/10 rounded-lg text-slate-300">
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent border-none outline-none text-white text-xs placeholder-slate-500 font-normal"
          />
        </div>
      </div>

      {/* Main Area: Navigation Tree + Files Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Pane */}
        <div className="w-36 sm:w-48 bg-[#1e1e1e] border-r border-white/5 p-2 space-y-1 overflow-y-auto hidden xs:block">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
            {activeOS === 'windows' ? 'This PC' : (activeOS === 'macos' ? 'Favorites' : 'Places')}
          </div>
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isCurr = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => setCurrentPath(item.path)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                  isCurr ? 'bg-blue-600/30 text-white font-semibold border border-blue-500/30' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-3 overflow-y-auto bg-[#181818]">
          {filteredItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs">
              <Folder className="w-12 h-12 mb-2 stroke-1 text-slate-600" />
              <span>This folder is empty</span>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {filteredItems.map((it) => {
                const isSelected = selectedItem?.name === it.name;
                const isDir = it.type === 'dir';

                return (
                  <div
                    key={it.name}
                    onClick={() => setSelectedItem(it)}
                    onDoubleClick={() => handleOpenItem(it)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-500/20 border-blue-500/60 ring-1 ring-blue-500 shadow-md'
                        : 'bg-[#202020]/60 border-white/5 hover:bg-[#282828] hover:border-white/10'
                    }`}
                  >
                    {isDir ? (
                      <Folder className="w-10 h-10 text-amber-400 fill-amber-400/20 mb-1" />
                    ) : (
                      <FileText className="w-10 h-10 text-blue-400 fill-blue-400/20 mb-1" />
                    )}
                    <span className="text-xs font-medium text-slate-100 truncate w-full px-1">
                      {it.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {isDir ? 'Folder' : `${it.content?.length || 0} bytes`}
                    </span>
                    {it.permissions && (
                      <span className="text-[9px] text-emerald-400 font-mono">
                        {it.permissions}
                      </span>
                    )}

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
          ) : (
            /* List View */
            <div className="border border-white/5 rounded-xl overflow-hidden divide-y divide-white/5">
              <div className="bg-[#202020] px-3 py-2 grid grid-cols-4 text-[11px] font-semibold text-slate-400">
                <span className="col-span-2">Name</span>
                <span>Type</span>
                <span>Size</span>
              </div>
              {filteredItems.map(it => (
                <div
                  key={it.name}
                  onClick={() => setSelectedItem(it)}
                  onDoubleClick={() => handleOpenItem(it)}
                  className={`px-3 py-2 grid grid-cols-4 items-center text-xs cursor-pointer transition-colors ${
                    selectedItem?.name === it.name ? 'bg-blue-600/20 text-white' : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <div className="col-span-2 flex items-center gap-2 truncate">
                    {it.type === 'dir' ? <Folder className="w-4 h-4 text-amber-400 shrink-0" /> : <FileText className="w-4 h-4 text-blue-400 shrink-0" />}
                    <span className="truncate">{it.name}</span>
                  </div>
                  <span className="text-slate-400">{it.type === 'dir' ? 'File folder' : 'Text Document'}</span>
                  <span className="font-mono text-slate-400">{it.type === 'dir' ? '-' : `${it.content?.length || 0} B`}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="h-6 bg-[#202020] border-t border-white/5 px-3 flex items-center justify-between text-[11px] text-slate-400 select-none">
        <span>{items.length} items</span>
        {selectedItem && (
          <span className="text-slate-300 font-medium">Selected: {selectedItem.name}</span>
        )}
      </div>

      {/* Modals for Folder & File creation */}
      {showNewFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleCreateFolder} className="w-full max-w-sm bg-[#242424] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="font-semibold text-sm text-white">Create New Folder</div>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="e.g. Projects, Workspace"
              autoFocus
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-xl text-white text-xs outline-none focus:border-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowNewFolderModal(false)} className="px-3 py-1.5 text-xs text-slate-400">Cancel</button>
              <button type="submit" className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold">Create</button>
            </div>
          </form>
        </div>
      )}

      {showNewFileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleCreateFile} className="w-full max-w-sm bg-[#242424] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="font-semibold text-sm text-white">Create New File</div>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="e.g. notes.txt, script.sh"
              autoFocus
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-xl text-white text-xs outline-none focus:border-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowNewFileModal(false)} className="px-3 py-1.5 text-xs text-slate-400">Cancel</button>
              <button type="submit" className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold">Create</button>
            </div>
          </form>
        </div>
      )}

      {/* File Editor Modal */}
      {editingFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#202020] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-3 bg-[#282828] border-b border-white/5 flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="font-semibold font-mono">{editingFile.name}</span>
              </div>
              <button onClick={() => setEditingFile(null)} className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 flex-1 flex flex-col">
              <textarea
                value={editingFile.content}
                onChange={(e) => setEditingFile(prev => ({ ...prev, content: e.target.value }))}
                className="w-full flex-1 min-h-[240px] bg-[#141414] border border-white/5 rounded-xl p-3 font-mono text-xs text-slate-200 outline-none leading-relaxed resize-none"
              />
            </div>
            <div className="p-3 bg-[#282828] border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">{editingFile.content.length} characters</span>
              <button
                onClick={handleSaveFileContent}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save to Disk</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

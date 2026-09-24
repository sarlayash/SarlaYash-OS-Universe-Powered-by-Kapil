// Text Editor App (Notepad / Gedit / TextEdit)
import React, { useState } from 'react';
import { Save, FileText, Check } from 'lucide-react';
import { vfs } from '../../services/fileSystemService';
import { useOS } from '../../context/OSContext';
import { useLearner } from '../../context/LearnerContext';
import { audioService } from '../../services/audioService';

export const TextEditorApp = () => {
  const { activeOS } = useOS();
  const { triggerChallengeEvent } = useLearner();

  const getDefaultPath = () => {
    return activeOS === 'windows' ? 'C:/Users/Student/Desktop' : '/home/student/Desktop';
  };

  const [filename, setFilename] = useState('notes.txt');
  const [content, setContent] = useState('Welcome to SarlaYash OS Universe!\nPractice text editing and save directly to your virtual disk.\n');
  const [savedStatus, setSavedStatus] = useState(false);

  const handleSave = () => {
    audioService.playClick();
    const path = getDefaultPath();
    vfs.createFile(path, filename, content);
    setSavedStatus(true);
    triggerChallengeEvent({ type: 'CREATED_FILE', name: filename });
    setTimeout(() => setSavedStatus(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 select-none">
      {/* Action Bar */}
      <div className="p-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-400" />
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white font-mono outline-none"
          />
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-sm transition-all"
        >
          {savedStatus ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Save className="w-3.5 h-3.5" />}
          <span>{savedStatus ? 'Saved to Disk!' : 'Save'}</span>
        </button>
      </div>

      {/* Editor Surface */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type notes or code here..."
        className="flex-1 w-full p-4 bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm outline-none resize-none leading-relaxed"
      />
    </div>
  );
};

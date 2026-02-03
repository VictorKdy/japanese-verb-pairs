// SettingsPanel - Main settings container with dropdown
import React, { useState, useCallback } from 'react';
import { Settings } from '../ui/icons.js';
import { useClickOutside } from '../../hooks/useClickOutside.js';
import { LevelSelector } from './LevelSelector.jsx';
import { TypeSelector } from './TypeSelector.jsx';
import { FormSelector } from './FormSelector.jsx';
import { DisplayOptions } from './DisplayOptions.jsx';
import { QuizModeSelector } from './QuizModeSelector.jsx';

export function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  const ref = useClickOutside(handleClose);
  
  return (
    <div className="absolute top-4 left-3 z-50" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#333] text-gray-200 px-4 py-2 rounded-lg border border-[#333] shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <Settings size={18} className="text-gray-300" />
        <span className="font-medium text-sm tracking-wide">設定</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-[#2a2a2a] p-2 rounded-lg border border-[#333] shadow-xl w-[22rem] animate-in fade-in slide-in-from-top-2 z-50 max-h-[100vh] overflow-y-auto">
          <LevelSelector />
          <TypeSelector />
          <FormSelector />
          <DisplayOptions />
          <QuizModeSelector />
        </div>
      )}
    </div>
  );
}

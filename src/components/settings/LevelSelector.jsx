// LevelSelector - Level selection checkboxes
import React from 'react';
import { useSettings } from '../../context/SettingsContext.jsx';
import { Checkbox } from '../ui/Checkbox.jsx';
import { AVAILABLE_LEVELS } from '../../constants/quizDefaults.js';

export function LevelSelector() {
  const { selectedLevels, toggleLevel } = useSettings();
  
  return (
    <>
      <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 border-b border-gray-600 pb-1">
        Select Levels
      </div>
      <div className="grid grid-cols-2 gap-0 mb-2">
        {AVAILABLE_LEVELS.map(level => (
          <Checkbox
            key={level}
            checked={selectedLevels.includes(level)}
            onChange={() => toggleLevel(level)}
            label={`レベル ${level}`}
            colorClass="bg-green-500 border-green-500"
            labelColorClass="text-white"
          />
        ))}
      </div>
    </>
  );
}

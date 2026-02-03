// DisplayOptions - Toggle display options (English, Furigana, Dictionary, Pairs)
import React from 'react';
import { useSettings } from '../../context/SettingsContext.jsx';
import { Checkbox } from '../ui/Checkbox.jsx';

export function DisplayOptions() {
  const { 
    showEnglish, setShowEnglish,
    showFurigana, setShowFurigana,
    showDictionary, setShowDictionary,
    showPairs, setShowPairs
  } = useSettings();
  
  return (
    <>
      <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 border-b border-gray-600 pb-1">
        Display Options
      </div>
      <div className="grid grid-cols-2 gap-0 mb-2">
        <Checkbox
          checked={showEnglish}
          onChange={() => setShowEnglish(!showEnglish)}
          label="英語表記"
          sublabel="English Labels"
          colorClass="bg-green-500 border-green-500"
          labelColorClass="text-white"
        />
        <Checkbox
          checked={showFurigana}
          onChange={() => setShowFurigana(!showFurigana)}
          label="振仮名"
          sublabel="Furigana"
          colorClass="bg-green-500 border-green-500"
          labelColorClass="text-white"
        />
        <Checkbox
          checked={showDictionary}
          onChange={() => setShowDictionary(!showDictionary)}
          label="辞書形"
          sublabel="Dictionary Form"
          colorClass="bg-green-500 border-green-500"
          labelColorClass="text-white"
        />
        <Checkbox
          checked={showPairs}
          onChange={() => setShowPairs(!showPairs)}
          label="ペアヒント表示"
          sublabel="Display Pairs Hints"
          colorClass="bg-green-500 border-green-500"
          labelColorClass="text-white"
        />
      </div>
    </>
  );
}

// TypeSelector - Verb type (Transitive/Intransitive) selection
import React from 'react';
import { useSettings } from '../../context/SettingsContext.jsx';
import { Checkbox } from '../ui/Checkbox.jsx';

export function TypeSelector() {
  const { selectedTypes, toggleType } = useSettings();
  
  return (
    <>
      <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 border-b border-gray-600 pb-1">
        Verb Type
      </div>
      <div className="grid grid-cols-2 gap-0 mb-2">
        <Checkbox
          checked={selectedTypes.includes('Intransitive')}
          onChange={() => toggleType('Intransitive')}
          label="自動詞"
          sublabel="Intransitive"
          colorClass="bg-purple-500 border-purple-500"
          labelColorClass="text-purple-400"
        />
        <Checkbox
          checked={selectedTypes.includes('Transitive')}
          onChange={() => toggleType('Transitive')}
          label="他動詞"
          sublabel="Transitive"
          colorClass="bg-yellow-500 border-yellow-500"
          labelColorClass="text-yellow-400"
        />
      </div>
    </>
  );
}

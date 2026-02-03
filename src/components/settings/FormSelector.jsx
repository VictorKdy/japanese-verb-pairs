// FormSelector - Verb form (Polite/Plain) selection
import React from 'react';
import { useSettings } from '../../context/SettingsContext.jsx';
import { Checkbox } from '../ui/Checkbox.jsx';

export function FormSelector() {
  const { selectedForms, toggleForm } = useSettings();
  
  return (
    <>
      <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 border-b border-gray-600 pb-1">
        Verb Form
      </div>
      <div className="grid grid-cols-2 gap-0 mb-2">
        <Checkbox
          checked={selectedForms.includes('Polite')}
          onChange={() => toggleForm('Polite')}
          label="丁寧形"
          sublabel="Polite Form"
          colorClass="bg-[#5F9EA0] border-[#5F9EA0]"
          labelColorClass="text-[#5F9EA0]"
        />
        <Checkbox
          checked={selectedForms.includes('Plain')}
          onChange={() => toggleForm('Plain')}
          label="普通形"
          sublabel="Plain Form"
          colorClass="bg-[#D1AD8C] border-[#D1AD8C]"
          labelColorClass="text-[#D1AD8C]"
        />
      </div>
    </>
  );
}

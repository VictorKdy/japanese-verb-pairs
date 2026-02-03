// Checkbox - styled checkbox component
import React from 'react';
import { CheckCheck } from './icons.js';

export function Checkbox({ 
  checked, 
  onChange, 
  label, 
  sublabel, 
  colorClass = 'bg-green-500 border-green-500',
  labelColorClass = 'text-white'
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-0.5 px-2 rounded transition-colors">
      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${checked ? colorClass : 'border-gray-500'}`}>
        {checked && <CheckCheck size={12} className="text-white" />}
      </div>
      <input 
        type="checkbox" 
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <div className="flex flex-col">
        <span className={`text-base ${checked ? `${labelColorClass} font-bold` : 'text-gray-400'}`}>
          {label}
        </span>
        {sublabel && (
          <span className={`text-[10px] ${checked ? 'text-gray-400 font-bold' : 'text-gray-400'}`}>
            {sublabel}
          </span>
        )}
      </div>
    </label>
  );
}
